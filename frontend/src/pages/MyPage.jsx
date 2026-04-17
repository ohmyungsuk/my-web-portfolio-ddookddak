import { useEffect, useMemo, useState } from "react";
import { supabase } from "../supabaseClient.js";

function MyPage({
  loginUser,
  onGoHome,
  onGoMyRequests,
  onGoAllRequests,
  onGoAssignedRequests,
  onLogout,
}) {
  const BRAND_COLOR = "#2F80ED";
  const BRAND_HOVER = "#1F6FD6";
  const BUTTON_BORDER = "#D7E2F0";
  const CARD_BORDER = "#E5EDF6";
  const TEXT_DARK = "#0F172A";
  const TEXT_MUTED = "#64748B";

  const [activeTab, setActiveTab] = useState("profile");

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(
    loginUser?.name || loginUser?.username || ""
  );
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const [passwordOpen, setPasswordOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [authProvider, setAuthProvider] = useState("email");

  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [withdrawConfirmText, setWithdrawConfirmText] = useState("");
  const [withdrawMessage, setWithdrawMessage] = useState("");

  const [myRequestCount, setMyRequestCount] = useState(0);
  const [assignedCount, setAssignedCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [statsLoading, setStatsLoading] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const displayName =
    loginUser?.username || loginUser?.name || loginUser?.email || "사용자";

  const emailText = loginUser?.email || "이메일 정보 없음";
  const initial = String(displayName).slice(0, 1).toUpperCase();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadProvider = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("로그인 방식 확인 실패:", error);
        return;
      }

      if (!isMounted) return;

      const provider =
        data?.user?.app_metadata?.provider ||
        data?.user?.app_metadata?.providers?.[0] ||
        "email";

      setAuthProvider(provider);
    };

    loadProvider();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadStats = async () => {
      if (!loginUser?.id) return;

      try {
        setStatsLoading(true);

        const [
          { count: myCount, error: myError },
          { count: assignedCnt, error: assignedError },
          { count: progressCnt, error: progressError },
          { count: completedCnt, error: completedError },
        ] = await Promise.all([
          supabase
            .from("requests")
            .select("*", { count: "exact", head: true })
            .eq("user_id", loginUser.id),

          supabase
            .from("requests")
            .select("*", { count: "exact", head: true })
            .eq("assigned_user_id", loginUser.id),

          supabase
            .from("requests")
            .select("*", { count: "exact", head: true })
            .eq("assigned_user_id", loginUser.id)
            .in("status", ["진행중", "작업 예정", "협의중"]),

          supabase
            .from("requests")
            .select("*", { count: "exact", head: true })
            .eq("assigned_user_id", loginUser.id)
            .in("status", ["완료", "작업완료", "처리완료"]),
        ]);

        if (myError) throw myError;
        if (assignedError) throw assignedError;
        if (progressError) throw progressError;
        if (completedError) throw completedError;

        if (!isMounted) return;

        setMyRequestCount(myCount || 0);
        setAssignedCount(assignedCnt || 0);
        setInProgressCount(progressCnt || 0);
        setCompletedCount(completedCnt || 0);
      } catch (error) {
        console.error("마이페이지 통계 불러오기 실패:", error);
      } finally {
        if (isMounted) {
          setStatsLoading(false);
        }
      }
    };

    loadStats();

    return () => {
      isMounted = false;
    };
  }, [loginUser?.id]);

  const handleStartEdit = () => {
    setSaveMessage("");
    setEditName(loginUser?.name || loginUser?.username || "");
    setActiveTab("profile");
    setIsEditingProfile(true);
  };

  const handleCancelEdit = () => {
    setSaveMessage("");
    setEditName(loginUser?.name || loginUser?.username || "");
    setIsEditingProfile(false);
  };

  const handleSaveProfile = async () => {
    const trimmedName = editName.trim();

    if (!trimmedName) {
      setSaveMessage("이름을 입력해주세요.");
      return;
    }

    if (!loginUser?.id) {
      setSaveMessage("로그인 정보를 찾을 수 없습니다.");
      return;
    }

    try {
      setSaveLoading(true);
      setSaveMessage("");

      const { data, error } = await supabase.auth.updateUser({
        data: {
          name: trimmedName,
        },
      });

      if (error) throw error;

      const updatedUser = data?.user;

      const nextLoginUser = {
        id: updatedUser?.id || loginUser.id,
        supabaseUserId:
          updatedUser?.id || loginUser.supabaseUserId || loginUser.id,
        email: updatedUser?.email || loginUser.email,
        name: trimmedName,
        username: trimmedName,
      };

      localStorage.setItem("loginUser", JSON.stringify(nextLoginUser));

      setSaveMessage("내 정보가 수정되었습니다.");
      setIsEditingProfile(false);

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("내 정보 수정 실패:", error);
      setSaveMessage(error.message || "내 정보 수정 중 문제가 발생했습니다.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword || !newPasswordConfirm) {
      setPasswordMessage("새 비밀번호를 입력해주세요.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage("비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      setPasswordMessage("비밀번호가 서로 일치하지 않습니다.");
      return;
    }

    try {
      setSaveLoading(true);
      setPasswordMessage("");

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      setPasswordMessage("비밀번호가 변경되었습니다.");
      setNewPassword("");
      setNewPasswordConfirm("");
      setPasswordOpen(false);
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
      setPasswordMessage(
        error.message || "비밀번호 변경 중 문제가 발생했습니다."
      );
    } finally {
      setSaveLoading(false);
    }
  };

  const handleWithdrawClick = () => {
    if (withdrawConfirmText.trim() !== "탈퇴") {
      setWithdrawMessage("'탈퇴'를 정확히 입력해주세요.");
      return;
    }

    setWithdrawMessage(
      "회원탈퇴 실제 기능은 마지막 단계에서 연결할 예정입니다. 지금은 확인 절차까지만 준비했습니다."
    );
  };

  const activityCards = useMemo(
    () => [
      {
        title: "내 요청 목록",
        desc: "내가 등록한 요청을 모아서 확인합니다.",
        buttonText: "바로가기",
        onClick: onGoMyRequests,
      },
      {
        title: "맡은 작업",
        desc: "수락한 작업과 진행 상태를 확인합니다.",
        buttonText: "바로가기",
        onClick: onGoAssignedRequests,
      },
      {
        title: "전체 요청 보기",
        desc: "전체 요청을 보고 필요한 작업을 확인합니다.",
        buttonText: "바로가기",
        onClick: onGoAllRequests,
      },
      {
        title: "완료 요청",
        desc: "완료 처리된 작업 흐름을 다시 확인합니다.",
        buttonText: "맡은 작업 보기",
        onClick: onGoAssignedRequests,
      },
    ],
    [onGoMyRequests, onGoAssignedRequests, onGoAllRequests]
  );

  const pageStyle = {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #f8fbff 0%, #f4f7fb 52%, #f8fafc 100%)",
    color: "#111827",
    fontFamily:
      '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const wrapStyle = {
    maxWidth: "1240px",
    margin: "0 auto",
    padding: isMobile ? "20px 14px 72px" : "28px 24px 88px",
  };

  const topbarStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "stretch" : "center",
    justifyContent: "space-between",
    gap: isMobile ? "14px" : "20px",
    marginBottom: "18px",
  };

  const brandStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
  };

  const brandMarkStyle = {
    width: isMobile ? "36px" : "40px",
    height: isMobile ? "36px" : "40px",
    borderRadius: "14px",
    background: BRAND_COLOR,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontWeight: "900",
    fontSize: isMobile ? "13px" : "14px",
    boxShadow: "0 12px 24px rgba(47, 128, 237, 0.18)",
  };

  const brandTextStyle = {
    fontSize: isMobile ? "22px" : "24px",
    fontWeight: "900",
    color: BRAND_COLOR,
    letterSpacing: "-0.5px",
  };

  const homeBtnStyle = {
    border: `1px solid ${BUTTON_BORDER}`,
    backgroundColor: "#ffffff",
    color: "#1e293b",
    borderRadius: "14px",
    padding: isMobile ? "12px 14px" : "13px 18px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(15, 23, 42, 0.03)",
    width: isMobile ? "100%" : "auto",
    outline: "none",
    WebkitTapHighlightColor: "transparent",
  };

  const tabWrapStyle = {
    display: "flex",
    alignItems: "center",
    gap: isMobile ? "14px" : "28px",
    borderBottom: "1px solid #e7edf5",
    marginBottom: "20px",
    padding: "0 4px",
    overflowX: "auto",
  };

  const getTabStyle = (key) => ({
    border: "none",
    background: "none",
    padding: "0 0 14px 0",
    fontSize: isMobile ? "14px" : "16px",
    whiteSpace: "nowrap",
    fontWeight: activeTab === key ? "800" : "700",
    color: activeTab === key ? BRAND_COLOR : "#1f2937",
    cursor: "pointer",
    outline: "none",
    borderBottom:
      activeTab === key ? `3px solid ${BRAND_COLOR}` : "3px solid transparent",
  });

  const contentGridStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "320px 1fr",
    gap: "24px",
    alignItems: "start",
  };

  const cardStyle = {
    backgroundColor: "#ffffff",
    border: `1px solid ${CARD_BORDER}`,
    borderRadius: isMobile ? "20px" : "26px",
    boxShadow: "0 16px 34px rgba(15, 23, 42, 0.04)",
  };

  const leftCardStyle = {
    ...cardStyle,
    padding: isMobile ? "22px 18px" : "30px 24px",
    position: isMobile ? "static" : "sticky",
    top: isMobile ? "auto" : "96px",
  };

  const avatarStyle = {
    width: isMobile ? "84px" : "100px",
    height: isMobile ? "84px" : "100px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #5B9DFF 0%, #2F80ED 100%)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: isMobile ? "28px" : "34px",
    fontWeight: "900",
    margin: "0 auto 18px",
    boxShadow: "0 18px 34px rgba(53, 162, 255, 0.18)",
  };

  const profileNameStyle = {
    textAlign: "center",
    fontSize: isMobile ? "22px" : "28px",
    fontWeight: "900",
    color: TEXT_DARK,
    letterSpacing: "-0.8px",
    marginBottom: "8px",
    wordBreak: "break-word",
  };

  const profileMailStyle = {
    textAlign: "center",
    fontSize: "14px",
    color: TEXT_MUTED,
    lineHeight: "1.7",
    marginBottom: "18px",
    wordBreak: "break-all",
  };

  const outlineBtnStyle = {
    width: "100%",
    border: `1px solid ${BUTTON_BORDER}`,
    backgroundColor: "#ffffff",
    color: "#334155",
    borderRadius: "12px",
    padding: "12px 14px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    outline: "none",
    WebkitTapHighlightColor: "transparent",
  };

  const statRowStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
    gap: "10px",
    marginTop: "24px",
    paddingTop: "18px",
    borderTop: "1px solid #edf2f7",
  };

  const statBoxStyle = {
    textAlign: "center",
    background: "#fbfdff",
    border: "1px solid #edf2f7",
    borderRadius: "16px",
    padding: "14px 8px",
  };

  const statNumStyle = {
    fontSize: isMobile ? "18px" : "20px",
    fontWeight: "900",
    color: TEXT_DARK,
    marginBottom: "4px",
  };

  const statLabelStyle = {
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: "700",
  };

  const sectionStyle = {
    ...cardStyle,
    padding: isMobile ? "22px 16px" : "30px",
    marginBottom: "18px",
  };

  const sectionTitleStyle = {
    fontSize: isMobile ? "22px" : "28px",
    fontWeight: "900",
    color: TEXT_DARK,
    letterSpacing: "-0.8px",
    margin: "0 0 8px 0",
  };

  const sectionDescStyle = {
    fontSize: "14px",
    color: TEXT_MUTED,
    lineHeight: "1.8",
    margin: "0 0 22px 0",
  };

  const menuGridStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
    gap: "16px",
  };

  const menuCardStyle = {
    border: "1px solid #e7edf5",
    borderRadius: "20px",
    padding: isMobile ? "18px" : "22px",
    backgroundColor: "#fbfdff",
    minHeight: isMobile ? "auto" : "170px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "14px",
  };

  const menuTitleStyle = {
    fontSize: isMobile ? "18px" : "20px",
    fontWeight: "900",
    color: TEXT_DARK,
    marginBottom: "8px",
    letterSpacing: "-0.5px",
  };

  const menuDescStyle = {
    fontSize: "14px",
    lineHeight: "1.8",
    color: TEXT_MUTED,
    marginBottom: "16px",
  };

  const primaryBtnStyle = {
    border: "none",
    background: BRAND_COLOR,
    color: "#ffffff",
    borderRadius: "12px",
    padding: "12px 16px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    outline: "none",
    WebkitTapHighlightColor: "transparent",
    boxShadow: "0 10px 24px rgba(47, 128, 237, 0.18)",
  };

  const settingListStyle = {
    display: "grid",
    gap: "14px",
  };

  const settingItemStyle = {
    border: "1px solid #e7edf5",
    borderRadius: "18px",
    padding: isMobile ? "16px" : "18px 20px",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "stretch" : "flex-start",
    justifyContent: "space-between",
    gap: "16px",
  };

  const settingTitleStyle = {
    fontSize: isMobile ? "16px" : "17px",
    fontWeight: "800",
    color: TEXT_DARK,
    marginBottom: "4px",
  };

  const settingTextStyle = {
    fontSize: "14px",
    color: TEXT_MUTED,
    lineHeight: "1.7",
  };

  const dangerBtnStyle = {
    border: "none",
    background: "#fff1f1",
    color: "#ef4444",
    borderRadius: "12px",
    padding: "12px 16px",
    fontSize: "14px",
    fontWeight: "800",
    cursor: "pointer",
    minWidth: isMobile ? "100%" : "110px",
    outline: "none",
    WebkitTapHighlightColor: "transparent",
  };

  const inputStyle = {
    width: "100%",
    height: "52px",
    borderRadius: "14px",
    border: "1px solid #dbe4f2",
    backgroundColor: "#ffffff",
    padding: "0 16px",
    fontSize: "15px",
    color: TEXT_DARK,
    boxSizing: "border-box",
    outline: "none",
  };

  const labelStyle = {
    fontSize: "13px",
    color: "#94a3b8",
    fontWeight: "700",
    marginBottom: "8px",
  };

  const rowStyle = {
    marginBottom: "16px",
  };

  const saveRowStyle = {
    display: "flex",
    gap: "10px",
    marginTop: "18px",
    flexWrap: "wrap",
  };

  const passwordInputWrapStyle = {
    display: "grid",
    gap: "12px",
    marginTop: "16px",
  };

  const withdrawBoxStyle = {
    marginTop: "16px",
    padding: "16px",
    borderRadius: "16px",
    backgroundColor: "#fff7f7",
    border: "1px solid #ffe1e1",
  };

  const withdrawInputStyle = {
    ...inputStyle,
    marginTop: "12px",
  };

  const withdrawGuideStyle = {
    fontSize: "13px",
    color: "#b91c1c",
    lineHeight: "1.7",
  };

  const softBtnStyle = {
    border: `1px solid ${BUTTON_BORDER}`,
    background: "#ffffff",
    color: "#334155",
    borderRadius: "12px",
    padding: "12px 16px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    outline: "none",
    WebkitTapHighlightColor: "transparent",
  };

  const messageStyle = {
    marginTop: "12px",
    fontSize: "14px",
    fontWeight: "700",
    color: saveMessage.includes("수정") ? "#15803d" : "#ef4444",
  };

  return (
    <div style={pageStyle}>
      <div style={wrapStyle}>
        <div style={topbarStyle}>
          <div style={brandStyle} onClick={onGoHome}>
            <div style={brandMarkStyle}>ㄸ</div>
            <div style={brandTextStyle}>뚝딱</div>
          </div>

          <HoverButton
            onClick={onGoHome}
            style={homeBtnStyle}
            hoverStyle={{
              borderColor: "#BFD7FF",
              color: BRAND_COLOR,
              backgroundColor: "#F8FBFF",
            }}
          >
            메인으로 돌아가기
          </HoverButton>
        </div>

        <div style={tabWrapStyle}>
          <button
            type="button"
            style={getTabStyle("profile")}
            onClick={() => setActiveTab("profile")}
            onMouseDown={(e) => e.currentTarget.blur()}
          >
            프로필
          </button>
          <button
            type="button"
            style={getTabStyle("activity")}
            onClick={() => setActiveTab("activity")}
            onMouseDown={(e) => e.currentTarget.blur()}
          >
            내 활동
          </button>
          <button
            type="button"
            style={getTabStyle("setting")}
            onClick={() => setActiveTab("setting")}
            onMouseDown={(e) => e.currentTarget.blur()}
          >
            설정
          </button>
        </div>

        <div style={contentGridStyle}>
          <div style={leftCardStyle}>
            <div style={avatarStyle}>{initial}</div>

            <div style={profileNameStyle}>{displayName}</div>
            <div style={profileMailStyle}>{emailText}</div>

            <HoverButton
              onClick={handleStartEdit}
              style={outlineBtnStyle}
              hoverStyle={{
                borderColor: "#BFD7FF",
                color: BRAND_COLOR,
                backgroundColor: "#F8FBFF",
              }}
            >
              정보 수정
            </HoverButton>

            <div style={statRowStyle}>
              <div style={statBoxStyle}>
                <div style={statNumStyle}>
                  {statsLoading ? "-" : myRequestCount}
                </div>
                <div style={statLabelStyle}>내 요청</div>
              </div>

              <div style={statBoxStyle}>
                <div style={statNumStyle}>
                  {statsLoading ? "-" : assignedCount}
                </div>
                <div style={statLabelStyle}>맡은 작업</div>
              </div>

              <div style={statBoxStyle}>
                <div style={statNumStyle}>
                  {statsLoading ? "-" : inProgressCount}
                </div>
                <div style={statLabelStyle}>진행중</div>
              </div>

              <div style={statBoxStyle}>
                <div style={statNumStyle}>
                  {statsLoading ? "-" : completedCount}
                </div>
                <div style={statLabelStyle}>완료됨</div>
              </div>
            </div>
          </div>

          <div>
            {activeTab === "profile" && (
              <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>프로필</h2>
                <p style={sectionDescStyle}>
                  이름은 바로 수정할 수 있고, 이메일은 현재 로그인 계정 정보로
                  보여줍니다.
                </p>

                {!isEditingProfile ? (
                  <div
                    style={{
                      border: "1px solid #e7edf5",
                      borderRadius: "22px",
                      backgroundColor: "#fbfdff",
                      padding: isMobile ? "18px" : "24px",
                    }}
                  >
                    <div style={{ ...labelStyle, marginBottom: "6px" }}>
                      이름
                    </div>
                    <div
                      style={{
                        fontSize: isMobile ? "18px" : "22px",
                        color: TEXT_DARK,
                        fontWeight: "900",
                        marginBottom: "18px",
                        letterSpacing: "-0.5px",
                        wordBreak: "break-word",
                      }}
                    >
                      {displayName}
                    </div>

                    <div style={{ ...labelStyle, marginBottom: "6px" }}>
                      이메일
                    </div>
                    <div
                      style={{
                        fontSize: isMobile ? "14px" : "16px",
                        color: TEXT_DARK,
                        fontWeight: "700",
                        lineHeight: "1.8",
                        wordBreak: "break-all",
                      }}
                    >
                      {emailText}
                    </div>

                    {saveMessage ? <div style={messageStyle}>{saveMessage}</div> : null}
                  </div>
                ) : (
                  <div
                    style={{
                      border: "1px solid #e7edf5",
                      borderRadius: "22px",
                      backgroundColor: "#fbfdff",
                      padding: isMobile ? "18px" : "24px",
                    }}
                  >
                    <div style={rowStyle}>
                      <div style={labelStyle}>이름</div>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="이름을 입력해주세요"
                        style={inputStyle}
                      />
                    </div>

                    <div style={rowStyle}>
                      <div style={labelStyle}>이메일</div>
                      <input
                        type="text"
                        value={emailText}
                        readOnly
                        style={{
                          ...inputStyle,
                          backgroundColor: "#f8fafc",
                          color: TEXT_MUTED,
                        }}
                      />
                    </div>

                    <div style={saveRowStyle}>
                      <HoverButton
                        onClick={handleSaveProfile}
                        disabled={saveLoading}
                        style={primaryBtnStyle}
                        hoverStyle={{
                          background: BRAND_HOVER,
                          transform: isMobile ? "none" : "translateY(-1px)",
                          boxShadow: "0 12px 26px rgba(31, 111, 214, 0.22)",
                        }}
                      >
                        {saveLoading ? "저장 중..." : "저장하기"}
                      </HoverButton>

                      <HoverButton
                        onClick={handleCancelEdit}
                        disabled={saveLoading}
                        style={softBtnStyle}
                        hoverStyle={{
                          borderColor: "#BFD7FF",
                          color: BRAND_COLOR,
                          backgroundColor: "#F8FBFF",
                        }}
                      >
                        취소
                      </HoverButton>
                    </div>

                    {saveMessage ? <div style={messageStyle}>{saveMessage}</div> : null}
                  </div>
                )}
              </div>
            )}

            {activeTab === "activity" && (
              <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>내 활동</h2>
                <p style={sectionDescStyle}>
                  요청 등록, 맡은 작업, 전체 요청 보기를 빠르게 이동할 수
                  있어요.
                </p>

                <div style={menuGridStyle}>
                  {activityCards.map((card) => (
                    <div key={card.title} style={menuCardStyle}>
                      <div>
                        <div style={menuTitleStyle}>{card.title}</div>
                        <div style={menuDescStyle}>{card.desc}</div>
                      </div>

                      <HoverButton
                        onClick={card.onClick}
                        style={{
                          ...primaryBtnStyle,
                          width: isMobile ? "100%" : "auto",
                        }}
                        hoverStyle={{
                          background: BRAND_HOVER,
                          transform: isMobile ? "none" : "translateY(-1px)",
                          boxShadow: "0 12px 26px rgba(31, 111, 214, 0.22)",
                        }}
                      >
                        {card.buttonText}
                      </HoverButton>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "setting" && (
              <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>설정</h2>
                <p style={sectionDescStyle}>
                  계정 관련 기능을 여기서 관리할 수 있게 확장할 예정이에요.
                </p>

                <div style={settingListStyle}>
                  <div style={settingItemStyle}>
                    <div>
                      <div style={settingTitleStyle}>내 정보 수정</div>
                      <div style={settingTextStyle}>
                        현재는 이름 수정부터 먼저 지원합니다.
                      </div>
                    </div>

                    <HoverButton
                      onClick={handleStartEdit}
                      style={outlineBtnStyle}
                      hoverStyle={{
                        borderColor: "#BFD7FF",
                        color: BRAND_COLOR,
                        backgroundColor: "#F8FBFF",
                      }}
                    >
                      수정하기
                    </HoverButton>
                  </div>

                  <div style={settingItemStyle}>
                    <div style={{ width: "100%" }}>
                      <div style={settingTitleStyle}>비밀번호 변경</div>

                      {authProvider === "email" ? (
                        <>
                          <div style={settingTextStyle}>
                            로그인에 사용하는 비밀번호를 새 비밀번호로 바꿉니다.
                          </div>

                          {passwordOpen && (
                            <div style={passwordInputWrapStyle}>
                              <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="새 비밀번호 입력"
                                style={inputStyle}
                              />

                              <input
                                type="password"
                                value={newPasswordConfirm}
                                onChange={(e) =>
                                  setNewPasswordConfirm(e.target.value)
                                }
                                placeholder="새 비밀번호 다시 입력"
                                style={inputStyle}
                              />

                              <div style={saveRowStyle}>
                                <HoverButton
                                  onClick={handleChangePassword}
                                  disabled={saveLoading}
                                  style={primaryBtnStyle}
                                  hoverStyle={{
                                    background: BRAND_HOVER,
                                    transform: isMobile ? "none" : "translateY(-1px)",
                                    boxShadow:
                                      "0 12px 26px rgba(31, 111, 214, 0.22)",
                                  }}
                                >
                                  {saveLoading ? "변경 중..." : "비밀번호 저장"}
                                </HoverButton>

                                <HoverButton
                                  onClick={() => {
                                    setPasswordOpen(false);
                                    setNewPassword("");
                                    setNewPasswordConfirm("");
                                    setPasswordMessage("");
                                  }}
                                  disabled={saveLoading}
                                  style={softBtnStyle}
                                  hoverStyle={{
                                    borderColor: "#BFD7FF",
                                    color: BRAND_COLOR,
                                    backgroundColor: "#F8FBFF",
                                  }}
                                >
                                  취소
                                </HoverButton>
                              </div>

                              {passwordMessage ? (
                                <div
                                  style={{
                                    ...messageStyle,
                                    marginTop: "4px",
                                  }}
                                >
                                  {passwordMessage}
                                </div>
                              ) : null}
                            </div>
                          )}
                        </>
                      ) : (
                        <div style={settingTextStyle}>
                          소셜 로그인 계정은 비밀번호를 여기서 변경하지
                          않습니다.
                          <br />
                          해당 서비스에서 계정 정보를 관리해주세요.
                        </div>
                      )}
                    </div>

                    {authProvider === "email" && !passwordOpen && (
                      <HoverButton
                        onClick={() => {
                          setPasswordOpen(true);
                          setPasswordMessage("");
                        }}
                        style={outlineBtnStyle}
                        hoverStyle={{
                          borderColor: "#BFD7FF",
                          color: BRAND_COLOR,
                          backgroundColor: "#F8FBFF",
                        }}
                      >
                        변경하기
                      </HoverButton>
                    )}
                  </div>

                  <div style={settingItemStyle}>
                    <div style={{ width: "100%" }}>
                      <div style={settingTitleStyle}>회원 탈퇴</div>

                      {authProvider === "email" ? (
                        <div style={settingTextStyle}>
                          이메일 로그인 계정은 탈퇴 전에 본인 확인 절차를 거친 뒤
                          삭제하도록 연결할 예정입니다.
                        </div>
                      ) : (
                        <div style={settingTextStyle}>
                          소셜 로그인 계정도 탈퇴는 가능하지만, 연결된 로그인
                          방식까지 같이 확인해서 처리해야 합니다.
                        </div>
                      )}

                      {withdrawOpen && (
                        <div style={withdrawBoxStyle}>
                          <div style={withdrawGuideStyle}>
                            정말 탈퇴하려면 아래 입력칸에 <strong>탈퇴</strong>를
                            그대로 입력해주세요.
                          </div>

                          <input
                            type="text"
                            value={withdrawConfirmText}
                            onChange={(e) =>
                              setWithdrawConfirmText(e.target.value)
                            }
                            placeholder="탈퇴 입력"
                            style={withdrawInputStyle}
                          />

                          <div style={saveRowStyle}>
                            <HoverButton
                              onClick={handleWithdrawClick}
                              style={dangerBtnStyle}
                              hoverStyle={{
                                background: "#FFECEC",
                                color: "#DC2626",
                              }}
                            >
                              탈퇴 진행
                            </HoverButton>

                            <HoverButton
                              onClick={() => {
                                setWithdrawOpen(false);
                                setWithdrawConfirmText("");
                                setWithdrawMessage("");
                              }}
                              style={softBtnStyle}
                              hoverStyle={{
                                borderColor: "#BFD7FF",
                                color: BRAND_COLOR,
                                backgroundColor: "#F8FBFF",
                              }}
                            >
                              취소
                            </HoverButton>
                          </div>

                          {withdrawMessage ? (
                            <div
                              style={{
                                ...messageStyle,
                                marginTop: "8px",
                                color: withdrawMessage.includes("마지막 단계")
                                  ? "#b45309"
                                  : "#ef4444",
                              }}
                            >
                              {withdrawMessage}
                            </div>
                          ) : null}
                        </div>
                      )}
                    </div>

                    {!withdrawOpen && (
                      <HoverButton
                        onClick={() => {
                          setWithdrawOpen(true);
                          setWithdrawConfirmText("");
                          setWithdrawMessage("");
                        }}
                        style={dangerBtnStyle}
                        hoverStyle={{
                          background: "#FFECEC",
                          color: "#DC2626",
                        }}
                      >
                        회원탈퇴
                      </HoverButton>
                    )}
                  </div>

                  <div style={settingItemStyle}>
                    <div>
                      <div style={settingTitleStyle}>로그아웃</div>
                      <div style={settingTextStyle}>
                        현재 로그인된 계정에서 안전하게 로그아웃합니다.
                      </div>
                    </div>

                    <HoverButton
                      onClick={onLogout}
                      style={dangerBtnStyle}
                      hoverStyle={{
                        background: "#FFECEC",
                        color: "#DC2626",
                      }}
                    >
                      로그아웃
                    </HoverButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function HoverButton({
  children,
  onClick,
  style,
  hoverStyle = {},
  disabled = false,
  type = "button",
}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onMouseDown={(e) => e.currentTarget.blur()}
      onMouseUp={(e) => e.currentTarget.blur()}
      onFocus={(e) => e.currentTarget.blur()}
      onBlur={() => setIsHover(false)}
      style={{
        outline: "none",
        boxShadow: "none",
        WebkitTapHighlightColor: "transparent",
        transition:
          "background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease",
        ...style,
        ...(isHover && !disabled ? hoverStyle : {}),
      }}
    >
      {children}
    </button>
  );
}

export default MyPage;