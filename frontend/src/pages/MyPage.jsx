import { useEffect, useMemo, useState } from "react";
import { supabase } from "../supabaseClient.js";
import { updateCommunityAuthorProfile } from "../data/communityPosts.js";

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

const WORKER_CATEGORY_OPTIONS = [
  { value: "전기/조명", label: "전기/조명", desc: "콘센트, 스위치, 조명, 누전" },
  { value: "설비/배관", label: "설비/배관", desc: "수도, 배관, 세면대, 변기" },
  { value: "누수/방수", label: "누수/방수", desc: "누수 점검, 방수, 곰팡이" },
  { value: "도어락/출입문", label: "도어락/출입문", desc: "도어락, 현관문, 출입문" },
  { value: "에어컨/환기", label: "에어컨/환기", desc: "에어컨, 환풍기, 실외기" },
  { value: "CCTV/네트워크", label: "CCTV/네트워크", desc: "CCTV, 공유기, 와이파이" },
  { value: "유리/창호", label: "유리/창호", desc: "창문, 방충망, 유리문" },
  { value: "가전/생활수리", label: "가전/생활수리", desc: "생활가전, 가구, 소형수리" },
  { value: "청소/철거", label: "청소/철거", desc: "입주청소, 폐기물, 부분철거" },
  { value: "기타 유지보수", label: "기타 유지보수", desc: "기타 현장 점검과 수리" },
];


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

function resizeProfileImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const size = 220;
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const minSide = Math.min(image.naturalWidth, image.naturalHeight);
        const sourceX = (image.naturalWidth - minSide) / 2;
        const sourceY = (image.naturalHeight - minSide) / 2;

        canvas.width = size;
        canvas.height = size;
        context.drawImage(
          image,
          sourceX,
          sourceY,
          minSide,
          minSide,
          0,
          0,
          size,
          size,
        );

        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };

      image.onerror = reject;
      image.src = String(reader.result || "");
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
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

function SettingToggle({ title, desc, checked, onChange, styles }) {
  return (
    <button
      type="button"
      onClick={onChange}
      onMouseDown={(e) => e.currentTarget.blur()}
      onFocus={(e) => e.currentTarget.blur()}
      style={styles.toggleRow}
    >
      <span style={styles.toggleTextBox}>
        <strong style={styles.toggleTitle}>{title}</strong>
        {desc && <span style={styles.toggleDesc}>{desc}</span>}
      </span>

      <span style={styles.toggleSwitch(checked)}>
        <span style={styles.toggleKnob(checked)} />
      </span>
    </button>
  );
}

export default function MyPage({
  loginUser,
  onGoHome,
  onGoMyRequests,
  onGoAllRequests,
  onGoAssignedRequests,
  onGoAdmin,
  onLogout,
}) {
  const [activeTab, setActiveTab] = useState("profile");
  const [windowWidth, setWindowWidth] = useState(getWindowWidth);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(
    loginUser?.name || loginUser?.username || "",
  );
  const [avatarUrl, setAvatarUrl] = useState(loginUser?.avatarUrl || "");
  const [editAvatarUrl, setEditAvatarUrl] = useState(loginUser?.avatarUrl || "");
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const [passwordOpen, setPasswordOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [authProvider, setAuthProvider] = useState("email");

  const [workerCategories, setWorkerCategories] = useState([]);
  const [workerCategoryLoading, setWorkerCategoryLoading] = useState(false);
  const [workerCategorySaving, setWorkerCategorySaving] = useState(false);
  const [workerCategoryMessage, setWorkerCategoryMessage] = useState("");

  const [notificationPrefs, setNotificationPrefs] = useState({
    new_request_alert: true,
    status_alert: true,
    chat_alert: true,
    admin_alert: true,
  });
  const [notificationPrefLoading, setNotificationPrefLoading] = useState(false);
  const [notificationPrefSaving, setNotificationPrefSaving] = useState(false);
  const [notificationPrefMessage, setNotificationPrefMessage] = useState("");

  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [withdrawConfirmText, setWithdrawConfirmText] = useState("");
  const [withdrawMessage, setWithdrawMessage] = useState("");

  const [myRequestCount, setMyRequestCount] = useState(0);
  const [assignedCount, setAssignedCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [statsLoading, setStatsLoading] = useState(false);

  const isTablet = windowWidth <= 980;
  const isMobile = windowWidth <= 768;
  const isSmallMobile = windowWidth <= 460;
  const isWorker = loginUser?.role === "worker" || loginUser?.role === "admin";
  const canManageWorkerCategories = loginUser?.role === "worker";
  const isAdmin = loginUser?.role === "admin";

  const userId = loginUser?.supabaseUserId || loginUser?.id || "";
  const displayName =
    loginUser?.username || loginUser?.name || loginUser?.email || "사용자";
  const emailText = loginUser?.email || "이메일 정보 없음";
  const initial = String(displayName).slice(0, 1).toUpperCase();
  const profileAvatarUrl = editAvatarUrl || avatarUrl || loginUser?.avatarUrl || "";

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
      const nextAvatarUrl =
        data?.user?.user_metadata?.avatar_url ||
        data?.user?.user_metadata?.picture ||
        data?.user?.user_metadata?.photo_url ||
        loginUser?.avatarUrl ||
        "";

      setAuthProvider(provider);
      setAvatarUrl(nextAvatarUrl);
      setEditAvatarUrl(nextAvatarUrl);
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

  useEffect(() => {
    let isMounted = true;

    const loadNotificationPreferences = async () => {
      if (!userId) return;

      try {
        setNotificationPrefLoading(true);

        const { data, error } = await supabase
          .from("notification_preferences")
          .select("new_request_alert, status_alert, chat_alert, admin_alert")
          .eq("user_id", userId)
          .maybeSingle();

        if (error) throw error;

        if (!isMounted) return;

        if (data) {
          setNotificationPrefs({
            new_request_alert: data.new_request_alert ?? true,
            status_alert: data.status_alert ?? true,
            chat_alert: data.chat_alert ?? true,
            admin_alert: data.admin_alert ?? true,
          });
        }
      } catch (error) {
        console.error("알림 설정 불러오기 실패:", error);
      } finally {
        if (isMounted) {
          setNotificationPrefLoading(false);
        }
      }
    };

    loadNotificationPreferences();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  useEffect(() => {
    let isMounted = true;

    const loadWorkerCategories = async () => {
      if (!userId || !canManageWorkerCategories) {
        setWorkerCategories([]);
        return;
      }

      try {
        setWorkerCategoryLoading(true);

        const { data, error } = await supabase
          .from("worker_categories")
          .select("category, is_enabled")
          .eq("worker_id", userId);

        if (error) throw error;

        if (!isMounted) return;

        const enabledCategories = (data || [])
          .filter((item) => item.is_enabled)
          .map((item) => item.category);

        setWorkerCategories(enabledCategories);
      } catch (error) {
        console.error("전문 분야 불러오기 실패:", error);
        if (isMounted) {
          setWorkerCategoryMessage("전문 분야를 불러오지 못했습니다.");
        }
      } finally {
        if (isMounted) {
          setWorkerCategoryLoading(false);
        }
      }
    };

    loadWorkerCategories();

    return () => {
      isMounted = false;
    };
  }, [userId, canManageWorkerCategories]);

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

    if (isAdmin) {
      cards.unshift({
        title: "관리자 대시보드",
        desc: "요청 현황과 회원 관리를 한 화면에서 확인해요.",
        buttonText: "관리자 페이지",
        onClick: onGoAdmin,
      });
    }

    return cards;
  }, [
    isAdmin,
    isWorker,
    onGoAdmin,
    onGoMyRequests,
    onGoAllRequests,
    onGoAssignedRequests,
  ]);

  const handleStartEdit = () => {
    setSaveMessage("");
    setEditName(loginUser?.name || loginUser?.username || "");
    setActiveTab("profile");
    setIsEditingProfile(true);
  };

  const handleCancelEdit = () => {
    setSaveMessage("");
    setEditName(loginUser?.name || loginUser?.username || "");
    setEditAvatarUrl(avatarUrl || loginUser?.avatarUrl || "");
    setIsEditingProfile(false);
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const nextAvatar = await resizeProfileImage(file);
      setEditAvatarUrl(nextAvatar);
      setSaveMessage("");
    } catch (error) {
      console.error("프로필 사진 처리 실패:", error);
      setSaveMessage("프로필 사진을 불러오지 못했습니다.");
    } finally {
      event.target.value = "";
    }
  };

  const handleRemoveAvatar = () => {
    setEditAvatarUrl("");
    setSaveMessage("");
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
          avatar_url: editAvatarUrl,
          picture: editAvatarUrl,
        },
      });

      if (error) throw error;

      const updatedUser = data?.user;

      let { error: profileError } = await supabase
        .from("profiles")
        .update({
          name: trimmedName,
          username: trimmedName,
          avatar_url: editAvatarUrl,
        })
        .eq("id", userId);

      if (profileError?.code === "PGRST204") {
        const fallback = await supabase
          .from("profiles")
          .update({
            name: trimmedName,
            username: trimmedName,
          })
          .eq("id", userId);
        profileError = fallback.error;
      }

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
        avatarUrl: editAvatarUrl,
        avatar_url: editAvatarUrl,
      };

      localStorage.setItem("loginUser", JSON.stringify(nextLoginUser));
      setAvatarUrl(editAvatarUrl);
      updateCommunityAuthorProfile({
        authorId: nextLoginUser.supabaseUserId || nextLoginUser.id,
        authorName: trimmedName,
        authorAvatar: editAvatarUrl,
      });

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

  const handleToggleWorkerCategory = (category) => {
    setWorkerCategoryMessage("");
    setWorkerCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      }

      return [...prev, category];
    });
  };

  const handleSaveWorkerCategories = async () => {
    if (!userId) {
      setWorkerCategoryMessage("로그인 정보를 찾을 수 없습니다.");
      return;
    }

    if (!canManageWorkerCategories) {
      setWorkerCategoryMessage("전문가 회원만 전문 분야를 설정할 수 있습니다.");
      return;
    }

    try {
      setWorkerCategorySaving(true);
      setWorkerCategoryMessage("");

      const rows = WORKER_CATEGORY_OPTIONS.map((option) => ({
        worker_id: userId,
        category: option.value,
        is_enabled: workerCategories.includes(option.value),
      }));

      const { error } = await supabase
        .from("worker_categories")
        .upsert(rows, { onConflict: "worker_id,category" });

      if (error) throw error;

      setWorkerCategoryMessage("전문 분야 설정이 저장되었습니다.");
    } catch (error) {
      console.error("전문 분야 저장 실패:", error);
      setWorkerCategoryMessage(
        error.message || "전문 분야 저장 중 문제가 발생했습니다.",
      );
    } finally {
      setWorkerCategorySaving(false);
    }
  };

  const handleToggleNotificationPref = (key) => {
    setNotificationPrefMessage("");
    setNotificationPrefs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSaveNotificationPrefs = async () => {
    if (!userId) {
      setNotificationPrefMessage("로그인 정보를 찾을 수 없습니다.");
      return;
    }

    try {
      setNotificationPrefSaving(true);
      setNotificationPrefMessage("");

      const { error } = await supabase.from("notification_preferences").upsert(
        {
          user_id: userId,
          new_request_alert: notificationPrefs.new_request_alert,
          status_alert: notificationPrefs.status_alert,
          chat_alert: notificationPrefs.chat_alert,
          admin_alert: notificationPrefs.admin_alert,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      );

      if (error) throw error;

      setNotificationPrefMessage("알림 설정이 저장되었습니다.");
    } catch (error) {
      console.error("알림 설정 저장 실패:", error);
      setNotificationPrefMessage(
        error.message || "알림 설정 저장 중 문제가 발생했습니다.",
      );
    } finally {
      setNotificationPrefSaving(false);
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
      padding: isSmallMobile
        ? "82px 12px 30px"
        : isMobile
          ? "88px 16px 36px"
          : "104px 42px 56px",
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
      fontSize: isSmallMobile ? "23px" : isMobile ? "25px" : "30px",
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
      flexWrap: "wrap",
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
      gridTemplateColumns: isTablet ? "1fr" : "320px minmax(0, 1fr)",
      gap: "18px",
      alignItems: "start",
    },
    sideCard: {
      background: CARD,
      border: `1px solid ${BORDER}`,
      borderRadius: isMobile ? "20px" : "24px",
      padding: isMobile ? "22px 18px" : "28px 24px",
      boxShadow: "0 14px 34px rgba(47, 128, 237, 0.08)",
      position: isTablet ? "static" : "sticky",
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
      overflow: "hidden",
    },
    avatarImage: {
      width: "100%",
      height: "100%",
      display: "block",
      objectFit: "cover",
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
      gridTemplateColumns: isSmallMobile
        ? "1fr"
        : "repeat(2, minmax(0, 1fr))",
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
    profilePhotoRow: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "18px",
    },
    profilePhotoEditRow: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      flexWrap: "wrap",
    },
    profilePhotoPreview: {
      width: "76px",
      height: "76px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #5B9DFF 0%, #2F80ED 100%)",
      color: "#FFFFFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "26px",
      fontWeight: 900,
      overflow: "hidden",
      boxShadow: "0 12px 24px rgba(47, 128, 237, 0.14)",
    },
    profilePhotoActions: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      flexWrap: "wrap",
    },
    fileButton: {
      minHeight: "38px",
      border: `1px solid ${BORDER}`,
      borderRadius: "10px",
      background: "#FFFFFF",
      color: TEXT,
      fontSize: "13px",
      fontWeight: 850,
      cursor: "pointer",
      padding: "9px 12px",
      boxSizing: "border-box",
    },
    textDangerButton: {
      border: "none",
      background: "transparent",
      color: DANGER,
      fontSize: "13px",
      fontWeight: 850,
      cursor: "pointer",
      padding: "8px 4px",
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
      gridTemplateColumns: isSmallMobile
        ? "1fr"
        : "repeat(2, minmax(0, 1fr))",
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
      paddingBottom: "6px",
      WebkitOverflowScrolling: "touch",
      scrollbarWidth: "none",
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
      padding: isSmallMobile ? "18px 14px" : isMobile ? "20px 16px" : "26px",
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
      padding: isSmallMobile ? "15px" : isMobile ? "18px" : "22px",
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
      gridTemplateColumns: isTablet ? "1fr" : "repeat(2, minmax(0, 1fr))",
      gap: "12px",
    },
    activityCard: {
      background: SOFT,
      border: `1px solid ${BORDER}`,
      borderRadius: "20px",
      padding: isSmallMobile ? "15px" : isMobile ? "18px" : "20px",
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
      padding: isSmallMobile ? "15px" : isMobile ? "18px" : "20px",
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
    preferencePanel: {
      background: SOFT,
      border: `1px solid ${BORDER}`,
      borderRadius: "20px",
      padding: isMobile ? "18px" : "20px",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    categoryGrid: {
      display: "grid",
      gridTemplateColumns: isTablet ? "1fr" : "repeat(2, minmax(0, 1fr))",
      gap: "10px",
      marginTop: "14px",
    },
    categoryButton: (active) => ({
      minHeight: "76px",
      borderRadius: "16px",
      border: active ? `1px solid ${BRAND}` : `1px solid ${BORDER}`,
      background: active ? "#EEF6FF" : "#FFFFFF",
      color: active ? BRAND : TEXT,
      padding: "14px",
      textAlign: "left",
      cursor: "pointer",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
      boxShadow: active ? "0 10px 22px rgba(47, 128, 237, 0.10)" : "none",
      transition: "border-color 0.18s ease, color 0.18s ease, background-color 0.18s ease",
    }),
    categoryName: {
      display: "block",
      fontSize: "14px",
      fontWeight: 900,
      marginBottom: "6px",
    },
    categoryDesc: {
      display: "block",
      fontSize: "12px",
      color: SUB,
      lineHeight: 1.55,
      wordBreak: "keep-all",
    },
    toggleGroup: {
      display: "grid",
      gap: "10px",
      marginTop: "14px",
    },
    toggleRow: {
      width: "100%",
      border: `1px solid ${BORDER}`,
      borderRadius: "16px",
      background: "#FFFFFF",
      minHeight: "66px",
      padding: "13px 14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      cursor: "pointer",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
      WebkitTapHighlightColor: "transparent",
    },
    toggleTextBox: {
      minWidth: 0,
      display: "grid",
      gap: "4px",
      textAlign: "left",
    },
    toggleTitle: {
      fontSize: "14px",
      color: TEXT,
      fontWeight: 900,
      lineHeight: 1.3,
    },
    toggleDesc: {
      fontSize: "12px",
      color: SUB,
      lineHeight: 1.5,
      wordBreak: "keep-all",
    },
    toggleSwitch: (checked) => ({
      width: "44px",
      height: "24px",
      borderRadius: "999px",
      background: checked ? BRAND : "#CBD5E1",
      position: "relative",
      flexShrink: 0,
      transition: "background-color 0.18s ease",
    }),
    toggleKnob: (checked) => ({
      position: "absolute",
      top: "3px",
      left: checked ? "23px" : "3px",
      width: "18px",
      height: "18px",
      borderRadius: "50%",
      background: "#FFFFFF",
      boxShadow: "0 3px 8px rgba(15, 23, 42, 0.18)",
      transition: "left 0.18s ease",
    }),
    smallGuide: {
      margin: "10px 0 0",
      fontSize: "12px",
      color: SUB,
      lineHeight: 1.65,
      wordBreak: "keep-all",
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
            <div style={styles.avatar}>
              {profileAvatarUrl ? (
                <img src={profileAvatarUrl} alt="프로필 사진" style={styles.avatarImage} />
              ) : (
                initial
              )}
            </div>

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
                    <div style={styles.profilePhotoRow}>
                      <div style={styles.profilePhotoPreview}>
                        {profileAvatarUrl ? (
                          <img
                            src={profileAvatarUrl}
                            alt="프로필 사진"
                            style={styles.avatarImage}
                          />
                        ) : (
                          initial
                        )}
                      </div>
                    </div>

                    <div style={styles.label}>이름</div>
                    <div style={styles.valueText}>{displayName}</div>

                    <div style={styles.label}>이메일</div>
                    <div style={styles.valueEmail}>{emailText}</div>

                    {renderMessage(saveMessage, "수정")}
                  </div>
                ) : (
                  <div style={styles.infoPanel}>
                    <div style={styles.field}>
                      <div style={styles.label}>프로필 사진</div>
                      <div style={styles.profilePhotoEditRow}>
                        <div style={styles.profilePhotoPreview}>
                          {editAvatarUrl ? (
                            <img
                              src={editAvatarUrl}
                              alt="프로필 사진 미리보기"
                              style={styles.avatarImage}
                            />
                          ) : (
                            initial
                          )}
                        </div>
                        <div style={styles.profilePhotoActions}>
                          <label style={styles.fileButton}>
                            사진 변경
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleAvatarChange}
                              style={{ display: "none" }}
                            />
                          </label>
                          {editAvatarUrl && (
                            <button
                              type="button"
                              onClick={handleRemoveAvatar}
                              style={styles.textDangerButton}
                            >
                              사진 삭제
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

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
                    title="알림 설정"
                    desc="알림 종류별로 받을지 말지 설정할 수 있어요."
                    styles={styles}
                  >
                    <div style={styles.settingButtonWrap}>
                      <HoverButton
                        onClick={handleSaveNotificationPrefs}
                        disabled={notificationPrefSaving || notificationPrefLoading}
                        baseStyle={styles.primaryBtn}
                        hoverStyle={{
                          background: BRAND_HOVER,
                          boxShadow: "0 12px 24px rgba(31, 111, 214, 0.22)",
                        }}
                      >
                        {notificationPrefSaving ? "저장 중..." : "저장하기"}
                      </HoverButton>
                    </div>
                  </SettingItem>

                  <div style={styles.preferencePanel}>
                    <div style={styles.toggleGroup}>
                      {canManageWorkerCategories && (
                        <SettingToggle
                          title="내 분야 새 요청 알림"
                          desc="선택한 전문 분야와 맞는 새 요청이 올라오면 알림을 받아요."
                          checked={notificationPrefs.new_request_alert}
                          onChange={() =>
                            handleToggleNotificationPref("new_request_alert")
                          }
                          styles={styles}
                        />
                      )}

                      <SettingToggle
                        title="진행상황 알림"
                        desc="내 요청이 수락, 진행중, 완료로 바뀌면 알림을 받아요."
                        checked={notificationPrefs.status_alert}
                        onChange={() => handleToggleNotificationPref("status_alert")}
                        styles={styles}
                      />

                      <SettingToggle
                        title="채팅 알림"
                        desc="나중에 견적 협의 채팅이 도착하면 알림을 받을 때 사용해요."
                        checked={notificationPrefs.chat_alert}
                        onChange={() => handleToggleNotificationPref("chat_alert")}
                        styles={styles}
                      />

                      {isAdmin && (
                        <SettingToggle
                          title="관리자 운영 알림"
                          desc="새 요청 등록이나 완료 같은 운영 알림을 받아요."
                          checked={notificationPrefs.admin_alert}
                          onChange={() => handleToggleNotificationPref("admin_alert")}
                          styles={styles}
                        />
                      )}
                    </div>

                    {renderMessage(notificationPrefMessage, "저장")}
                  </div>

                  {canManageWorkerCategories && (
                    <>
                      <SettingItem
                        title="전문 분야 설정"
                        desc="선택한 분야의 새 요청이 등록되면 알림을 받을 수 있어요."
                        styles={styles}
                      >
                        <div style={styles.settingButtonWrap}>
                          <HoverButton
                            onClick={handleSaveWorkerCategories}
                            disabled={workerCategorySaving || workerCategoryLoading}
                            baseStyle={styles.primaryBtn}
                            hoverStyle={{
                              background: BRAND_HOVER,
                              boxShadow:
                                "0 12px 24px rgba(31, 111, 214, 0.22)",
                            }}
                          >
                            {workerCategorySaving ? "저장 중..." : "분야 저장"}
                          </HoverButton>
                        </div>
                      </SettingItem>

                      <div style={styles.preferencePanel}>
                        <div style={styles.categoryGrid}>
                          {WORKER_CATEGORY_OPTIONS.map((option) => {
                            const active = workerCategories.includes(option.value);

                            return (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => handleToggleWorkerCategory(option.value)}
                                onMouseDown={(e) => e.currentTarget.blur()}
                                onFocus={(e) => e.currentTarget.blur()}
                                style={styles.categoryButton(active)}
                              >
                                <span style={styles.categoryName}>
                                  {active ? "✓ " : ""}
                                  {option.label}
                                </span>
                                <span style={styles.categoryDesc}>{option.desc}</span>
                              </button>
                            );
                          })}
                        </div>

                        <p style={styles.smallGuide}>
                          선택한 분야와 요청 등록 카테고리가 같으면 해당 새 요청 알림을 받을 수 있어요.
                        </p>

                        {renderMessage(workerCategoryMessage, "저장")}
                      </div>
                    </>
                  )}

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
