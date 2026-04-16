import { useMemo, useState } from "react";

function MyPage({
  loginUser,
  onGoHome,
  onGoMyRequests,
  onGoAllRequests,
  onGoAssignedRequests,
  onLogout,
}) {
  const [activeTab, setActiveTab] = useState("profile");

  const displayName =
    loginUser?.username || loginUser?.name || loginUser?.email || "사용자";

  const emailText = loginUser?.email || "이메일 정보 없음";
  const initial = String(displayName).slice(0, 1).toUpperCase();

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
    ],
    [onGoMyRequests, onGoAssignedRequests, onGoAllRequests]
  );

  const pageStyle = {
    minHeight: "100vh",
    background: "#f7f9fc",
    color: "#111827",
    fontFamily:
      '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const wrapStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "28px 24px 80px",
  };

  const topbarStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "20px",
  };

  const brandStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
  };

  const brandMarkStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "14px",
    background: "#4DA3FF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontWeight: "900",
    fontSize: "14px",
    boxShadow: "0 12px 24px rgba(77, 163, 255, 0.18)",
  };

  const brandTextStyle = {
    fontSize: "24px",
    fontWeight: "900",
    color: "#2F80ED",
    letterSpacing: "-0.5px",
  };

  const homeBtnStyle = {
    border: "1px solid #dbe4f2",
    backgroundColor: "#ffffff",
    color: "#1e293b",
    borderRadius: "14px",
    padding: "14px 20px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
  };

  const tabWrapStyle = {
    display: "flex",
    alignItems: "center",
    gap: "28px",
    borderBottom: "1px solid #e7edf5",
    marginBottom: "26px",
    padding: "0 4px",
  };

  const getTabStyle = (key) => ({
    border: "none",
    background: "none",
    padding: "0 0 14px 0",
    fontSize: "17px",
    fontWeight: activeTab === key ? "800" : "700",
    color: activeTab === key ? "#2F80ED" : "#1f2937",
    cursor: "pointer",
    borderBottom: activeTab === key ? "3px solid #35A2FF" : "3px solid transparent",
  });

  const contentGridStyle = {
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gap: "24px",
    alignItems: "start",
  };

  const cardStyle = {
    backgroundColor: "#ffffff",
    border: "1px solid #e5eaf0",
    borderRadius: "24px",
    boxShadow: "0 14px 30px rgba(15, 23, 42, 0.04)",
  };

  const leftCardStyle = {
    ...cardStyle,
    padding: "28px 24px",
    position: "sticky",
    top: "100px",
  };

  const avatarStyle = {
    width: "96px",
    height: "96px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6EC1FF 0%, #35A2FF 100%)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "34px",
    fontWeight: "900",
    margin: "0 auto 18px",
    boxShadow: "0 16px 30px rgba(53, 162, 255, 0.18)",
  };

  const profileNameStyle = {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "900",
    color: "#0f172a",
    letterSpacing: "-0.8px",
    marginBottom: "8px",
  };

  const profileMailStyle = {
    textAlign: "center",
    fontSize: "14px",
    color: "#64748b",
    lineHeight: "1.7",
    marginBottom: "18px",
    wordBreak: "break-all",
  };

  const outlineBtnStyle = {
    width: "100%",
    border: "1px solid #dbe4f2",
    backgroundColor: "#ffffff",
    color: "#334155",
    borderRadius: "12px",
    padding: "12px 14px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
  };

  const statRowStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    marginTop: "22px",
    paddingTop: "18px",
    borderTop: "1px solid #edf2f7",
  };

  const statBoxStyle = {
    textAlign: "center",
  };

  const statNumStyle = {
    fontSize: "20px",
    fontWeight: "900",
    color: "#0f172a",
    marginBottom: "4px",
  };

  const statLabelStyle = {
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: "700",
  };

  const sectionStyle = {
    ...cardStyle,
    padding: "28px",
    marginBottom: "18px",
  };

  const sectionTitleStyle = {
    fontSize: "28px",
    fontWeight: "900",
    color: "#0f172a",
    letterSpacing: "-0.8px",
    margin: "0 0 8px 0",
  };

  const sectionDescStyle = {
    fontSize: "14px",
    color: "#64748b",
    lineHeight: "1.8",
    margin: "0 0 22px 0",
  };

  const menuGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "16px",
  };

  const menuCardStyle = {
    border: "1px solid #e7edf5",
    borderRadius: "20px",
    padding: "22px",
    backgroundColor: "#fbfdff",
  };

  const menuTitleStyle = {
    fontSize: "20px",
    fontWeight: "900",
    color: "#0f172a",
    marginBottom: "8px",
    letterSpacing: "-0.5px",
  };

  const menuDescStyle = {
    fontSize: "14px",
    lineHeight: "1.8",
    color: "#64748b",
    marginBottom: "16px",
  };

  const primaryBtnStyle = {
    border: "none",
    background: "#35A2FF",
    color: "#ffffff",
    borderRadius: "12px",
    padding: "12px 16px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
  };

  const settingListStyle = {
    display: "grid",
    gap: "14px",
  };

  const settingItemStyle = {
    border: "1px solid #e7edf5",
    borderRadius: "18px",
    padding: "18px 20px",
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
  };

  const settingTitleStyle = {
    fontSize: "17px",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "4px",
  };

  const settingTextStyle = {
    fontSize: "14px",
    color: "#64748b",
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
    minWidth: "110px",
  };

  return (
    <div style={pageStyle}>
      <div style={wrapStyle}>
        <div style={topbarStyle}>
          <div style={brandStyle} onClick={onGoHome}>
            <div style={brandMarkStyle}>ㄸ</div>
            <div style={brandTextStyle}>뚝딱</div>
          </div>

          <button type="button" style={homeBtnStyle} onClick={onGoHome}>
            메인으로 돌아가기
          </button>
        </div>

        <div style={tabWrapStyle}>
          <button
            type="button"
            style={getTabStyle("profile")}
            onClick={() => setActiveTab("profile")}
          >
            프로필
          </button>
          <button
            type="button"
            style={getTabStyle("activity")}
            onClick={() => setActiveTab("activity")}
          >
            내 활동
          </button>
          <button
            type="button"
            style={getTabStyle("setting")}
            onClick={() => setActiveTab("setting")}
          >
            설정
          </button>
        </div>

        <div style={contentGridStyle}>
          <div style={leftCardStyle}>
            <div style={avatarStyle}>{initial}</div>

            <div style={profileNameStyle}>{displayName}</div>
            <div style={profileMailStyle}>{emailText}</div>

            <button
              type="button"
              style={outlineBtnStyle}
              onClick={() => alert("정보 수정 기능은 다음 단계에서 연결합니다.")}
            >
              정보 수정
            </button>

            <div style={statRowStyle}>
              <div style={statBoxStyle}>
                <div style={statNumStyle}>0</div>
                <div style={statLabelStyle}>내 요청</div>
              </div>
              <div style={statBoxStyle}>
                <div style={statNumStyle}>0</div>
                <div style={statLabelStyle}>맡은 작업</div>
              </div>
              <div style={statBoxStyle}>
                <div style={statNumStyle}>0</div>
                <div style={statLabelStyle}>설정</div>
              </div>
            </div>
          </div>

          <div>
            {activeTab === "profile" && (
              <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>프로필</h2>
                <p style={sectionDescStyle}>
                  내 계정 정보와 자주 쓰는 메뉴를 한곳에서 정리해봤어요.
                </p>

                <div
                  style={{
                    border: "1px solid #e7edf5",
                    borderRadius: "22px",
                    backgroundColor: "#fbfdff",
                    padding: "24px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#94a3b8",
                      fontWeight: "700",
                      marginBottom: "6px",
                    }}
                  >
                    이름
                  </div>
                  <div
                    style={{
                      fontSize: "22px",
                      color: "#0f172a",
                      fontWeight: "900",
                      marginBottom: "18px",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {displayName}
                  </div>

                  <div
                    style={{
                      fontSize: "13px",
                      color: "#94a3b8",
                      fontWeight: "700",
                      marginBottom: "6px",
                    }}
                  >
                    이메일
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      color: "#0f172a",
                      fontWeight: "700",
                      lineHeight: "1.8",
                    }}
                  >
                    {emailText}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>내 활동</h2>
                <p style={sectionDescStyle}>
                  요청 등록, 맡은 작업, 전체 요청 보기를 빠르게 이동할 수 있어요.
                </p>

                <div style={menuGridStyle}>
                  {activityCards.map((card) => (
                    <div key={card.title} style={menuCardStyle}>
                      <div style={menuTitleStyle}>{card.title}</div>
                      <div style={menuDescStyle}>{card.desc}</div>
                      <button
                        type="button"
                        style={primaryBtnStyle}
                        onClick={card.onClick}
                      >
                        {card.buttonText}
                      </button>
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
                        이름, 이메일, 비밀번호 변경 같은 기능을 여기에 연결할 수 있어요.
                      </div>
                    </div>

                    <button
                      type="button"
                      style={outlineBtnStyle}
                      onClick={() => alert("정보 수정 기능은 다음 단계에서 연결합니다.")}
                    >
                      준비중
                    </button>
                  </div>

                  <div style={settingItemStyle}>
                    <div>
                      <div style={settingTitleStyle}>회원 탈퇴</div>
                      <div style={settingTextStyle}>
                        탈퇴 기능은 신중하게 연결해야 해서 마지막 단계에서 붙이는 걸 추천해요.
                      </div>
                    </div>

                    <button
                      type="button"
                      style={dangerBtnStyle}
                      onClick={() => alert("회원 탈퇴 기능은 아직 연결 전입니다.")}
                    >
                      회원탈퇴
                    </button>
                  </div>

                  <div style={settingItemStyle}>
                    <div>
                      <div style={settingTitleStyle}>로그아웃</div>
                      <div style={settingTextStyle}>
                        현재 로그인된 계정에서 안전하게 로그아웃합니다.
                      </div>
                    </div>

                    <button type="button" style={dangerBtnStyle} onClick={onLogout}>
                      로그아웃
                    </button>
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

export default MyPage;