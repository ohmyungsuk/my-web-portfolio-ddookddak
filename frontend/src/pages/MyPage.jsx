import { useEffect, useMemo, useState } from "react";
import { supabase } from "../supabaseClient.js";

const BRAND = "#2F80ED";
const BRAND_HOVER = "#1F6FD6";
const TEXT = "#0F172A";
const SUB = "#64748B";
const BG = "#F4F7FB";
const CARD = "#FFFFFF";
const BORDER = "#D9E4F2";
const SOFT = "#F8FBFF";
const DANGER = "#EF4444";
const DANGER_HOVER = "#DC2626";

function getWindowWidth() {
  if (typeof window === "undefined") return 1024;
  return window.innerWidth;
}

function getProviderText(provider) {
  const value = String(provider || "").toLowerCase();

  if (value === "google") return "구글";
  if (value === "kakao") return "카카오";
  if (value === "email") return "이메일";

  return "이메일";
}

function getRoleText(role) {
  if (role === "admin") return "관리자";
  if (role === "worker") return "전문가";
  return "일반회원";
}

function HoverButton({
  children,
  onClick,
  baseStyle,
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
        ...baseStyle,
        ...(isHover && !disabled ? hoverStyle : {}),
        opacity: disabled ? 0.65 : 1,
        cursor: disabled ? "not-allowed" : baseStyle?.cursor || "pointer",
        outline: "none",
        outlineOffset: 0,
        WebkitTapHighlightColor: "transparent",
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
        userSelect: "none",
      }}
    >
      {children}
    </button>
  );
}

function StatBox({ label, value, styles }) {
  return (
    <div style={styles.statBox}>
      <div style={styles.statValue}>{value}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  );
}

function ActivityCard({ title, desc, buttonText, onClick, styles }) {
  return (
    <div style={styles.activityCard}>
      <div>
        <h3 style={styles.activityTitle}>{title}</h3>
        <p style={styles.activityDesc}>{desc}</p>
      </div>

      <HoverButton
        onClick={onClick}
        baseStyle={styles.primaryBtn}
        hoverStyle={{
          background: BRAND_HOVER,
          boxShadow: "0 12px 24px rgba(31, 111, 214, 0.22)",
        }}
      >
        {buttonText}
      </HoverButton>
    </div>
  );
}

function SettingItem({ title, desc, children, styles }) {
  return (
    <div style={styles.settingItem}>
      <div style={styles.settingTextArea}>
        <h3 style={styles.settingTitle}>{title}</h3>
        {desc && <p style={styles.settingDesc}>{desc}</p>}
      </div>

      {children}
    </div>
  );
}

export default function MyPage({
  loginUser,
  onGoHome,
  onGoMyRequests,
  onGoAllRequests,
  onGoAssignedRequests,
  onLogout,
}) {
  const [activeTab, setActiveTab] = useState("profile");
  const [windowWidth, setWindowWidth] = useState(getWindowWidth);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(
    loginUser?.name || loginUser?.username || "",
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

  const isMobile = windowWidth <= 768;
  const isWorker = loginUser?.role === "worker" || loginUser?.role === "admin";

  const userId = loginUser?.supabaseUserId || loginUser?.id || "";
  const displayName =
    loginUser?.username || loginUser?.name || loginUser?.email || "사용자";
  const emailText = loginUser?.email || "이메일 정보 없음";
  const initial = String(displayName).slice(0, 1).toUpperCase();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowWidth());
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
        loginUser?.provider ||
        "email";

      setAuthProvider(provider);
    };

    loadProvider();

    return () => {
      isMounted = false;
    };
  }, [loginUser?.provider]);

  useEffect(() => {
    let isMounted = true;

    const loadStats = async () => {
      if (!userId) return;

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
            .eq("user_id", userId),

          supabase
            .from("requests")
            .select("*", { count: "exact", head: true })
            .eq("assigned_user_id", userId),

          supabase
            .from("requests")
            .select("*", { count: "exact", head: true })
            .eq("assigned_user_id", userId)
            .in("status", [
              "assigned",
              "quoted",
              "planned",
              "in_progress",
              "담당자 배정",
              "견적 협의중",
              "작업 예정",
              "진행중",
              "작업 진행중",
            ]),

          supabase
            .from("requests")
            .select("*", { count: "exact", head: true })
            .eq("assigned_user_id", userId)
            .in("status", ["completed", "완료", "완료됨", "작업완료", "처리완료"]),
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
  }, [userId]);

  const activityCards = useMemo(() => {
    const cards = [
      {
        title: "내 요청 목록",
        desc: "내가 등록한 요청을 모아서 확인할 수 있어요.",
        buttonText: "내 요청 보기",
        onClick: onGoMyRequests,
      },
      {
        title: "전체 요청 보기",
        desc: "등록된 전체 요청을 확인하고 진행 상태를 볼 수 있어요.",
        buttonText: "전체 요청 보기",
        onClick: onGoAllRequests,
      },
    ];

    if (isWorker) {
      cards.splice(1, 0, {
        title: "내가 맡은 작업",
        desc: "수락한 작업과 진행 상태를 확인할 수 있어요.",
        buttonText: "맡은 작업 보기",
        onClick: onGoAssignedRequests,
      });
    }

    return cards;
  }, [isWorker, onGoMyRequests, onGoAllRequests, onGoAssignedRequests]);

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

    if (!userId) {
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

      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          name: trimmedName,
          username: trimmedName,
        })
        .eq("id", userId);

      if (profileError) {
        console.error("profiles 이름 업데이트 실패:", profileError);
      }

      const nextLoginUser = {
        ...loginUser,
        id: updatedUser?.id || loginUser?.id || userId,
        supabaseUserId:
          updatedUser?.id || loginUser?.supabaseUserId || loginUser?.id || userId,
        email: updatedUser?.email || loginUser?.email,
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
      setPasswordMessage(error.message || "비밀번호 변경 중 문제가 발생했습니다.");
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
      "회원탈퇴 실제 기능은 마지막 단계에서 연결할 예정입니다. 지금은 확인 절차까지만 준비했습니다.",
    );
  };

  const styles = {
    page: {
      minHeight: "100dvh",
      background: BG,
      padding: isMobile ? "88px 16px 36px" : "104px 42px 56px",
      boxSizing: "border-box",
      color: TEXT,
      fontFamily:
        '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    container: {
      maxWidth: "1160px",
      margin: "0 auto",
    },
    topArea: {
      display: "flex",
      alignItems: isMobile ? "flex-start" : "center",
      justifyContent: "space-between",
      flexDirection: isMobile ? "column" : "row",
      gap: "14px",
      marginBottom: "20px",
    },
    title: {
      margin: 0,
      fontSize: isMobile ? "25px" : "30px",
      fontWeight: 900,
      color: TEXT,
      letterSpacing: "-0.7px",
      lineHeight: 1.25,
    },
    subTitle: {
      marginTop: "8px",
      fontSize: "14px",
      color: SUB,
      lineHeight: 1.6,
      wordBreak: "keep-all",
    },
    topBtnRow: {
      display: "flex",
      gap: "10px",
      width: isMobile ? "100%" : "auto",
    },
    whiteBtn: {
      minHeight: "44px",
      padding: "0 18px",
      borderRadius: "13px",
      border: `1px solid ${BORDER}`,
      background: "#FFFFFF",
      color: TEXT,
      fontSize: "14px",
      fontWeight: 850,
      cursor: "pointer",
      boxShadow: "none",
      boxSizing: "border-box",
      width: isMobile ? "100%" : "auto",
      outline: "none",
      outlineOffset: 0,
      transition: "background-color 0.18s ease, color 0.18s ease",
    },
    layout: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "320px minmax(0, 1fr)",
      gap: "18px",
      alignItems: "start",
    },
    sideCard: {
      background: CARD,
      border: `1px solid ${BORDER}`,
      borderRadius: isMobile ? "20px" : "24px",
      padding: isMobile ? "22px 18px" : "28px 24px",
      boxShadow: "0 14px 34px rgba(47, 128, 237, 0.08)",
      position: isMobile ? "static" : "sticky",
      top: "96px",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    avatar: {
      width: isMobile ? "84px" : "96px",
      height: isMobile ? "84px" : "96px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #5B9DFF 0%, #2F80ED 100%)",
      color: "#FFFFFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: isMobile ? "28px" : "34px",
      fontWeight: 900,
      margin: "0 auto 16px",
      boxShadow: "0 18px 34px rgba(47, 128, 237, 0.18)",
    },
    profileName: {
      textAlign: "center",
      fontSize: isMobile ? "22px" : "26px",
      fontWeight: 900,
      color: TEXT,
      letterSpacing: "-0.7px",
      marginBottom: "8px",
      wordBreak: "break-word",
    },
    profileEmail: {
      textAlign: "center",
      fontSize: "14px",
      color: SUB,
      lineHeight: 1.7,
      marginBottom: "14px",
      wordBreak: "break-all",
    },
    profileMeta: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "8px",
      marginBottom: "14px",
    },
    profileMetaBox: {
      background: SOFT,
      border: `1px solid ${BORDER}`,
      borderRadius: "14px",
      padding: "11px 10px",
      textAlign: "center",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    profileMetaLabel: {
      fontSize: "11px",
      color: SUB,
      fontWeight: 800,
      marginBottom: "5px",
    },
    profileMetaValue: {
      fontSize: "13px",
      color: TEXT,
      fontWeight: 850,
    },
    primaryBtn: {
      width: "100%",
      minHeight: "46px",
      border: "1px solid transparent",
      borderRadius: "13px",
      background: BRAND,
      color: "#FFFFFF",
      fontSize: "14px",
      fontWeight: 850,
      cursor: "pointer",
      boxShadow: "0 10px 22px rgba(47, 128, 237, 0.18)",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
      transition: "background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease",
    },
    softBtn: {
      width: "100%",
      minHeight: "46px",
      border: `1px solid ${BORDER}`,
      borderRadius: "13px",
      background: "#FFFFFF",
      color: TEXT,
      fontSize: "14px",
      fontWeight: 850,
      cursor: "pointer",
      boxShadow: "none",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
      transition: "background-color 0.18s ease, color 0.18s ease",
    },
    dangerBtn: {
      width: "100%",
      minHeight: "46px",
      border: "1px solid transparent",
      borderRadius: "13px",
      background: "#FFF1F1",
      color: DANGER,
      fontSize: "14px",
      fontWeight: 850,
      cursor: "pointer",
      boxShadow: "none",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
      transition: "background-color 0.18s ease, color 0.18s ease",
    },
    statGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "8px",
      marginTop: "16px",
      paddingTop: "16px",
      borderTop: `1px solid ${BORDER}`,
    },
    statBox: {
      background: SOFT,
      border: `1px solid ${BORDER}`,
      borderRadius: "15px",
      padding: "13px 8px",
      textAlign: "center",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    statValue: {
      fontSize: "20px",
      fontWeight: 900,
      color: TEXT,
      lineHeight: 1.15,
      marginBottom: "5px",
    },
    statLabel: {
      fontSize: "12px",
      color: SUB,
      fontWeight: 800,
    },
    mainArea: {
      minWidth: 0,
    },
    tabRow: {
      display: "flex",
      gap: isMobile ? "10px" : "14px",
      marginBottom: "14px",
      overflowX: "auto",
      paddingBottom: "4px",
    },
    tabBtn: (active) => ({
      minHeight: "42px",
      padding: "0 16px",
      borderRadius: "999px",
      border: active ? "1px solid transparent" : `1px solid ${BORDER}`,
      background: active ? BRAND : "#FFFFFF",
      color: active ? "#FFFFFF" : TEXT,
      fontSize: "14px",
      fontWeight: 850,
      cursor: "pointer",
      outline: "none",
      outlineOffset: 0,
      boxShadow: active ? "0 10px 18px rgba(47, 128, 237, 0.16)" : "none",
      whiteSpace: "nowrap",
      transition: "background-color 0.18s ease, color 0.18s ease",
      boxSizing: "border-box",
    }),
    section: {
      background: CARD,
      border: `1px solid ${BORDER}`,
      borderRadius: isMobile ? "20px" : "24px",
      padding: isMobile ? "20px 16px" : "26px",
      boxShadow: "0 14px 34px rgba(47, 128, 237, 0.08)",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    sectionTitle: {
      margin: "0 0 8px",
      fontSize: isMobile ? "22px" : "26px",
      fontWeight: 900,
      color: TEXT,
      letterSpacing: "-0.7px",
      lineHeight: 1.3,
    },
    sectionDesc: {
      margin: "0 0 20px",
      fontSize: "14px",
      color: SUB,
      lineHeight: 1.75,
      wordBreak: "keep-all",
    },
    infoPanel: {
      background: SOFT,
      border: `1px solid ${BORDER}`,
      borderRadius: "20px",
      padding: isMobile ? "18px" : "22px",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    label: {
      fontSize: "13px",
      color: SUB,
      fontWeight: 800,
      marginBottom: "8px",
    },
    valueText: {
      fontSize: isMobile ? "17px" : "20px",
      color: TEXT,
      fontWeight: 900,
      lineHeight: 1.5,
      marginBottom: "18px",
      wordBreak: "break-word",
    },
    valueEmail: {
      fontSize: "15px",
      color: TEXT,
      fontWeight: 750,
      lineHeight: 1.7,
      wordBreak: "break-all",
    },
    field: {
      marginBottom: "14px",
    },
    input: {
      width: "100%",
      height: "50px",
      borderRadius: "14px",
      border: `1px solid ${BORDER}`,
      background: "#FFFFFF",
      padding: "0 14px",
      fontSize: "14px",
      color: TEXT,
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
      WebkitAppearance: "none",
      appearance: "none",
    },
    readOnlyInput: {
      width: "100%",
      height: "50px",
      borderRadius: "14px",
      border: `1px solid ${BORDER}`,
      background: "#F8FAFC",
      padding: "0 14px",
      fontSize: "14px",
      color: SUB,
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
      WebkitAppearance: "none",
      appearance: "none",
    },
    actionRow: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
      gap: "10px",
      marginTop: "16px",
    },
    messageSuccess: {
      marginTop: "12px",
      padding: "12px 14px",
      borderRadius: "14px",
      background: "#ECFDF3",
      border: "1px solid #BBF7D0",
      color: "#15803D",
      fontSize: "13px",
      fontWeight: 800,
      lineHeight: 1.6,
      boxSizing: "border-box",
    },
    messageError: {
      marginTop: "12px",
      padding: "12px 14px",
      borderRadius: "14px",
      background: "#FFF5F5",
      border: "1px solid #FFD8D8",
      color: "#DC2626",
      fontSize: "13px",
      fontWeight: 800,
      lineHeight: 1.6,
      boxSizing: "border-box",
    },
    activityGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
      gap: "12px",
    },
    activityCard: {
      background: SOFT,
      border: `1px solid ${BORDER}`,
      borderRadius: "20px",
      padding: isMobile ? "18px" : "20px",
      minHeight: isMobile ? "auto" : "170px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      gap: "16px",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
      boxShadow: "0 8px 20px rgba(47, 128, 237, 0.04)",
    },
    activityTitle: {
      margin: "0 0 8px",
      fontSize: isMobile ? "18px" : "20px",
      fontWeight: 900,
      color: TEXT,
      letterSpacing: "-0.4px",
    },
    activityDesc: {
      margin: 0,
      fontSize: "14px",
      color: SUB,
      lineHeight: 1.75,
      wordBreak: "keep-all",
    },
    settingList: {
      display: "grid",
      gap: "12px",
    },
    settingItem: {
      background: SOFT,
      border: `1px solid ${BORDER}`,
      borderRadius: "20px",
      padding: isMobile ? "18px" : "20px",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      alignItems: isMobile ? "stretch" : "flex-start",
      gap: "14px",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    settingTextArea: {
      minWidth: 0,
      flex: 1,
    },
    settingTitle: {
      margin: "0 0 6px",
      fontSize: isMobile ? "17px" : "18px",
      fontWeight: 900,
      color: TEXT,
      letterSpacing: "-0.3px",
    },
    settingDesc: {
      margin: 0,
      fontSize: "14px",
      color: SUB,
      lineHeight: 1.75,
      wordBreak: "keep-all",
    },
    settingButtonWrap: {
      width: isMobile ? "100%" : "160px",
      flexShrink: 0,
    },
    passwordBox: {
      display: "grid",
      gap: "10px",
      marginTop: "14px",
    },
    withdrawBox: {
      marginTop: "14px",
      background: "#FFF7F7",
      border: "1px solid #FFE1E1",
      borderRadius: "16px",
      padding: "14px",
      boxSizing: "border-box",
    },
    withdrawGuide: {
      fontSize: "13px",
      color: "#B91C1C",
      lineHeight: 1.7,
      fontWeight: 700,
    },
  };

  const renderMessage = (message, successKeyword) => {
    if (!message) return null;

    const isSuccess = successKeyword && message.includes(successKeyword);

    return (
      <div style={isSuccess ? styles.messageSuccess : styles.messageError}>
        {message}
      </div>
    );
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.topArea}>
          <div>
            <h1 style={styles.title}>마이페이지</h1>
            <div style={styles.subTitle}>
              내 계정 정보와 요청 활동을 한곳에서 확인해요.
            </div>
          </div>

          <div style={styles.topBtnRow}>
            <HoverButton
              onClick={onGoHome}
              baseStyle={styles.whiteBtn}
              hoverStyle={{
                color: BRAND,
              }}
            >
              메인으로
            </HoverButton>
          </div>
        </div>

        <div style={styles.layout}>
          <div style={styles.sideCard}>
            <div style={styles.avatar}>{initial}</div>

            <div style={styles.profileName}>{displayName}</div>
            <div style={styles.profileEmail}>{emailText}</div>

            <div style={styles.profileMeta}>
              <div style={styles.profileMetaBox}>
                <div style={styles.profileMetaLabel}>역할</div>
                <div style={styles.profileMetaValue}>
                  {getRoleText(loginUser?.role)}
                </div>
              </div>

              <div style={styles.profileMetaBox}>
                <div style={styles.profileMetaLabel}>가입방식</div>
                <div style={styles.profileMetaValue}>
                  {getProviderText(authProvider)}
                </div>
              </div>
            </div>

            <HoverButton
              onClick={handleStartEdit}
              baseStyle={styles.softBtn}
              hoverStyle={{
                color: BRAND,
              }}
            >
              정보 수정
            </HoverButton>

            <div style={styles.statGrid}>
              <StatBox
                label="내 요청"
                value={statsLoading ? "-" : myRequestCount}
                styles={styles}
              />
              <StatBox
                label="맡은 작업"
                value={statsLoading ? "-" : assignedCount}
                styles={styles}
              />
              <StatBox
                label="진행중"
                value={statsLoading ? "-" : inProgressCount}
                styles={styles}
              />
              <StatBox
                label="완료됨"
                value={statsLoading ? "-" : completedCount}
                styles={styles}
              />
            </div>
          </div>

          <div style={styles.mainArea}>
            <div style={styles.tabRow}>
              <button
                type="button"
                onClick={() => setActiveTab("profile")}
                onMouseDown={(e) => e.currentTarget.blur()}
                onFocus={(e) => e.currentTarget.blur()}
                style={styles.tabBtn(activeTab === "profile")}
              >
                프로필
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("activity")}
                onMouseDown={(e) => e.currentTarget.blur()}
                onFocus={(e) => e.currentTarget.blur()}
                style={styles.tabBtn(activeTab === "activity")}
              >
                내 활동
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("setting")}
                onMouseDown={(e) => e.currentTarget.blur()}
                onFocus={(e) => e.currentTarget.blur()}
                style={styles.tabBtn(activeTab === "setting")}
              >
                설정
              </button>
            </div>

            {activeTab === "profile" && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>프로필</h2>
                <p style={styles.sectionDesc}>
                  이름은 바로 수정할 수 있고, 이메일은 현재 로그인 계정 정보로
                  표시돼요.
                </p>

                {!isEditingProfile ? (
                  <div style={styles.infoPanel}>
                    <div style={styles.label}>이름</div>
                    <div style={styles.valueText}>{displayName}</div>

                    <div style={styles.label}>이메일</div>
                    <div style={styles.valueEmail}>{emailText}</div>

                    {renderMessage(saveMessage, "수정")}
                  </div>
                ) : (
                  <div style={styles.infoPanel}>
                    <div style={styles.field}>
                      <div style={styles.label}>이름</div>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="이름을 입력해주세요"
                        style={styles.input}
                      />
                    </div>

                    <div style={styles.field}>
                      <div style={styles.label}>이메일</div>
                      <input
                        type="text"
                        value={emailText}
                        readOnly
                        style={styles.readOnlyInput}
                      />
                    </div>

                    <div style={styles.actionRow}>
                      <HoverButton
                        onClick={handleCancelEdit}
                        disabled={saveLoading}
                        baseStyle={styles.softBtn}
                        hoverStyle={{
                          color: BRAND,
                        }}
                      >
                        취소
                      </HoverButton>

                      <HoverButton
                        onClick={handleSaveProfile}
                        disabled={saveLoading}
                        baseStyle={styles.primaryBtn}
                        hoverStyle={{
                          background: BRAND_HOVER,
                          boxShadow: "0 12px 24px rgba(31, 111, 214, 0.22)",
                        }}
                      >
                        {saveLoading ? "저장 중..." : "저장하기"}
                      </HoverButton>
                    </div>

                    {renderMessage(saveMessage, "수정")}
                  </div>
                )}
              </div>
            )}

            {activeTab === "activity" && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>내 활동</h2>
                <p style={styles.sectionDesc}>
                  요청 목록과 작업 목록으로 빠르게 이동할 수 있어요.
                </p>

                <div style={styles.activityGrid}>
                  {activityCards.map((card) => (
                    <ActivityCard
                      key={card.title}
                      title={card.title}
                      desc={card.desc}
                      buttonText={card.buttonText}
                      onClick={card.onClick}
                      styles={styles}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "setting" && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>설정</h2>
                <p style={styles.sectionDesc}>
                  로그인 방식에 따라 가능한 계정 관리 기능이 달라져요.
                </p>

                <div style={styles.settingList}>
                  <SettingItem
                    title="내 정보 수정"
                    desc="현재는 이름 수정부터 지원합니다."
                    styles={styles}
                  >
                    <div style={styles.settingButtonWrap}>
                      <HoverButton
                        onClick={handleStartEdit}
                        baseStyle={styles.softBtn}
                        hoverStyle={{
                          color: BRAND,
                        }}
                      >
                        수정하기
                      </HoverButton>
                    </div>
                  </SettingItem>

                  <SettingItem
                    title="비밀번호 변경"
                    desc={
                      authProvider === "email"
                        ? "이메일 로그인에 사용하는 비밀번호를 변경할 수 있어요."
                        : "소셜 로그인 계정은 비밀번호를 여기서 변경하지 않아요."
                    }
                    styles={styles}
                  >
                    {authProvider === "email" && !passwordOpen && (
                      <div style={styles.settingButtonWrap}>
                        <HoverButton
                          onClick={() => {
                            setPasswordOpen(true);
                            setPasswordMessage("");
                          }}
                          baseStyle={styles.softBtn}
                          hoverStyle={{
                            color: BRAND,
                          }}
                        >
                          변경하기
                        </HoverButton>
                      </div>
                    )}

                    {authProvider !== "email" && (
                      <div style={styles.settingButtonWrap}>
                        <HoverButton
                          disabled
                          baseStyle={styles.softBtn}
                          hoverStyle={{}}
                        >
                          소셜 계정
                        </HoverButton>
                      </div>
                    )}
                  </SettingItem>

                  {authProvider === "email" && passwordOpen && (
                    <div style={styles.infoPanel}>
                      <div style={styles.passwordBox}>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="새 비밀번호 입력"
                          style={styles.input}
                        />

                        <input
                          type="password"
                          value={newPasswordConfirm}
                          onChange={(e) =>
                            setNewPasswordConfirm(e.target.value)
                          }
                          placeholder="새 비밀번호 다시 입력"
                          style={styles.input}
                        />

                        <div style={styles.actionRow}>
                          <HoverButton
                            onClick={() => {
                              setPasswordOpen(false);
                              setNewPassword("");
                              setNewPasswordConfirm("");
                              setPasswordMessage("");
                            }}
                            disabled={saveLoading}
                            baseStyle={styles.softBtn}
                            hoverStyle={{
                              color: BRAND,
                            }}
                          >
                            취소
                          </HoverButton>

                          <HoverButton
                            onClick={handleChangePassword}
                            disabled={saveLoading}
                            baseStyle={styles.primaryBtn}
                            hoverStyle={{
                              background: BRAND_HOVER,
                              boxShadow:
                                "0 12px 24px rgba(31, 111, 214, 0.22)",
                            }}
                          >
                            {saveLoading ? "변경 중..." : "비밀번호 저장"}
                          </HoverButton>
                        </div>

                        {renderMessage(passwordMessage, "변경")}
                      </div>
                    </div>
                  )}

                  <SettingItem
                    title="회원 탈퇴"
                    desc="탈퇴 전 확인 절차를 거친 뒤 계정을 삭제하도록 연결할 예정이에요."
                    styles={styles}
                  >
                    {!withdrawOpen && (
                      <div style={styles.settingButtonWrap}>
                        <HoverButton
                          onClick={() => {
                            setWithdrawOpen(true);
                            setWithdrawConfirmText("");
                            setWithdrawMessage("");
                          }}
                          baseStyle={styles.dangerBtn}
                          hoverStyle={{
                            background: "#FFECEC",
                            color: DANGER_HOVER,
                          }}
                        >
                          회원탈퇴
                        </HoverButton>
                      </div>
                    )}
                  </SettingItem>

                  {withdrawOpen && (
                    <div style={styles.withdrawBox}>
                      <div style={styles.withdrawGuide}>
                        정말 탈퇴하려면 아래 입력칸에 <strong>탈퇴</strong>를
                        그대로 입력해주세요.
                      </div>

                      <div style={{ marginTop: "12px" }}>
                        <input
                          type="text"
                          value={withdrawConfirmText}
                          onChange={(e) =>
                            setWithdrawConfirmText(e.target.value)
                          }
                          placeholder="탈퇴 입력"
                          style={styles.input}
                        />
                      </div>

                      <div style={styles.actionRow}>
                        <HoverButton
                          onClick={() => {
                            setWithdrawOpen(false);
                            setWithdrawConfirmText("");
                            setWithdrawMessage("");
                          }}
                          baseStyle={styles.softBtn}
                          hoverStyle={{
                            color: BRAND,
                          }}
                        >
                          취소
                        </HoverButton>

                        <HoverButton
                          onClick={handleWithdrawClick}
                          baseStyle={styles.dangerBtn}
                          hoverStyle={{
                            background: "#FFECEC",
                            color: DANGER_HOVER,
                          }}
                        >
                          탈퇴 진행
                        </HoverButton>
                      </div>

                      {renderMessage(withdrawMessage, "마지막 단계")}
                    </div>
                  )}

                  <SettingItem
                    title="로그아웃"
                    desc="현재 로그인된 계정에서 안전하게 로그아웃합니다."
                    styles={styles}
                  >
                    <div style={styles.settingButtonWrap}>
                      <HoverButton
                        onClick={onLogout}
                        baseStyle={styles.dangerBtn}
                        hoverStyle={{
                          background: "#FFECEC",
                          color: DANGER_HOVER,
                        }}
                      >
                        로그아웃
                      </HoverButton>
                    </div>
                  </SettingItem>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}