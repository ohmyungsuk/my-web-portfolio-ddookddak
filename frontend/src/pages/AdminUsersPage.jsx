import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const BRAND = "#2F80ED";
const BRAND_HOVER = "#1F6FD6";
const TEXT = "#0F172A";
const SUB = "#64748B";
const BG = "#F4F7FB";
const CARD = "#FFFFFF";
const BORDER = "#DBE4F0";
const SOFT = "#F8FBFF";
const DANGER = "#EF4444";

function getWindowWidth() {
  if (typeof window === "undefined") return 1024;
  return window.innerWidth;
}

function normalizeRole(role) {
  const value = String(role || "").trim().toLowerCase();

  if (value === "admin") return "admin";
  if (value === "worker") return "worker";
  return "user";
}

function getRoleText(role) {
  const normalized = normalizeRole(role);

  if (normalized === "admin") return "관리자";
  if (normalized === "worker") return "전문가";
  return "일반 회원";
}

function getProviderText(provider) {
  const value = String(provider || "").trim().toLowerCase();

  if (value === "google") return "구글";
  if (value === "kakao") return "카카오";
  if (value === "email") return "이메일";
  return "알 수 없음";
}

function getDisplayName(user) {
  return user?.name || user?.username || user?.email || "이름 없음";
}

function getRoleStyle(role) {
  const normalized = normalizeRole(role);

  if (normalized === "admin") {
    return {
      backgroundColor: "#FEF2F2",
      color: "#DC2626",
      borderColor: "#FECACA",
    };
  }

  if (normalized === "worker") {
    return {
      backgroundColor: "#EEF2FF",
      color: "#4F46E5",
      borderColor: "#C7D2FE",
    };
  }

  return {
    backgroundColor: "#F1F5F9",
    color: "#475569",
    borderColor: "#E2E8F0",
  };
}

function getProviderStyle(provider) {
  const value = String(provider || "").trim().toLowerCase();

  if (value === "google") {
    return {
      backgroundColor: "#FFF7ED",
      color: "#C2410C",
      borderColor: "#FED7AA",
    };
  }

  if (value === "kakao") {
    return {
      backgroundColor: "#FEF9C3",
      color: "#854D0E",
      borderColor: "#FDE68A",
    };
  }

  if (value === "email") {
    return {
      backgroundColor: "#EFF6FF",
      color: "#2563EB",
      borderColor: "#BFDBFE",
    };
  }

  return {
    backgroundColor: "#F8FAFC",
    color: "#64748B",
    borderColor: "#E2E8F0",
  };
}

function formatDate(value) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}.${String(date.getDate()).padStart(2, "0")}`;
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
      style={{
        ...baseStyle,
        ...(isHover && !disabled ? hoverStyle : {}),
        opacity: disabled ? 0.68 : 1,
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

function HoverCard({ children, baseStyle, hoverStyle = {} }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        ...baseStyle,
        ...(isHover ? hoverStyle : {}),
      }}
    >
      {children}
    </div>
  );
}

function StatCard({ label, value, sub, styles }) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statLabel}>{label}</div>
      <div style={styles.statValue}>{value}</div>
      <div style={styles.statSub}>{sub}</div>
    </div>
  );
}

export default function AdminUsersPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginUser, setLoginUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [providerFilter, setProviderFilter] = useState("all");
  const [savingUserId, setSavingUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [windowWidth, setWindowWidth] = useState(getWindowWidth);

  const isMobile = windowWidth <= 900;
  const isSmallMobile = windowWidth <= 480;

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("auth_created_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (error) throw error;

    setUsers(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowWidth());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let mounted = true;

    const checkAdminAndLoad = async () => {
      try {
        setLoading(true);
        setMessage("");

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        let currentUser = user || null;
        let currentUserId = user?.id || null;

        if (userError || !currentUserId) {
          try {
            const savedUser = localStorage.getItem("loginUser");
            const parsedUser = savedUser ? JSON.parse(savedUser) : null;

            currentUser = parsedUser || null;
            currentUserId = parsedUser?.supabaseUserId || parsedUser?.id || null;
          } catch (error) {
            console.error("loginUser 파싱 실패:", error);
          }
        }

        if (!currentUserId) {
          navigate("/login", { replace: true });
          return;
        }

        if (!mounted) return;
        setLoginUser(currentUser);

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", currentUserId)
          .maybeSingle();

        if (profileError) throw profileError;

        const admin = normalizeRole(profile?.role) === "admin";

        if (!mounted) return;
        setIsAdmin(admin);

        if (!admin) {
          setLoading(false);
          return;
        }

        await fetchUsers();

        if (mounted) {
          setLoading(false);
        }
      } catch (error) {
        console.error("관리자 회원관리 페이지 로딩 실패:", error);

        if (mounted) {
          setMessage(error.message || "회원 목록을 불러오지 못했습니다.");
          setIsAdmin(false);
          setLoading(false);
        }
      }
    };

    checkAdminAndLoad();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  const summary = useMemo(() => {
    return {
      total: users.length,
      normal: users.filter((user) => normalizeRole(user.role) === "user")
        .length,
      worker: users.filter((user) => normalizeRole(user.role) === "worker")
        .length,
      admin: users.filter((user) => normalizeRole(user.role) === "admin")
        .length,
    };
  }, [users]);

  const providerOptions = useMemo(() => {
    const providers = users
      .map((user) => String(user?.provider || "").trim().toLowerCase())
      .filter(Boolean);

    return ["all", ...Array.from(new Set(providers))];
  }, [users]);

  const filteredUsers = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return users.filter((user) => {
      const normalizedRole = normalizeRole(user?.role);
      const normalizedProvider = String(user?.provider || "")
        .trim()
        .toLowerCase();

      const matchesRole =
        roleFilter === "all" ? true : normalizedRole === roleFilter;

      const matchesProvider =
        providerFilter === "all" ? true : normalizedProvider === providerFilter;

      const searchTarget = [
        user?.name,
        user?.username,
        user?.email,
        user?.provider,
        user?.id,
        getRoleText(user?.role),
        getProviderText(user?.provider),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesKeyword = keyword === "" || searchTarget.includes(keyword);

      return matchesRole && matchesProvider && matchesKeyword;
    });
  }, [users, roleFilter, providerFilter, searchKeyword]);

  const handleRoleChange = (userId, nextRole) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, role: normalizeRole(nextRole) } : user,
      ),
    );
  };

  const handleSaveRole = async (user) => {
    try {
      setSavingUserId(user.id);
      setMessage("");

      const nextRole = normalizeRole(user.role);

      const { error } = await supabase
        .from("profiles")
        .update({ role: nextRole })
        .eq("id", user.id);

      if (error) throw error;

      setMessage("역할이 저장되었습니다.");
    } catch (error) {
      console.error("역할 저장 실패:", error);
      setMessage(error.message || "역할 저장 중 문제가 발생했습니다.");
      await fetchUsers();
    } finally {
      setSavingUserId(null);
    }
  };

  const styles = {
    page: {
      minHeight: "100dvh",
      background: BG,
      padding: isMobile ? "88px 14px 28px" : "104px 24px 52px",
      boxSizing: "border-box",
      fontFamily:
        '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    container: {
      maxWidth: "1180px",
      margin: "0 auto",
    },
    pageTitle: {
      margin: "0 0 18px",
      fontSize: isMobile ? "21px" : "25px",
      fontWeight: 850,
      color: TEXT,
      letterSpacing: "-0.4px",
      lineHeight: 1.35,
    },
    shell: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) 310px",
      gap: isMobile ? "14px" : "18px",
      alignItems: "start",
    },
    mainCard: {
      background: CARD,
      border: `1px solid ${BORDER}`,
      borderRadius: isMobile ? "20px" : "24px",
      padding: isSmallMobile ? "15px" : isMobile ? "16px" : "22px",
      boxShadow: "0 14px 34px rgba(15, 23, 42, 0.06)",
      boxSizing: "border-box",
    },
    heroCard: {
      background: "linear-gradient(180deg, #F8FBFF 0%, #FFFFFF 100%)",
      border: `1px solid ${BORDER}`,
      borderRadius: isMobile ? "18px" : "20px",
      padding: isMobile ? "16px" : "20px",
      marginBottom: "16px",
      boxSizing: "border-box",
    },
    eyebrow: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "7px 11px",
      borderRadius: "999px",
      background: "#EAF2FF",
      color: BRAND,
      fontSize: "12px",
      fontWeight: 850,
      marginBottom: "12px",
    },
    heroTitle: {
      margin: 0,
      fontSize: isMobile ? "23px" : "28px",
      fontWeight: 850,
      color: TEXT,
      lineHeight: 1.35,
      letterSpacing: "-0.6px",
      wordBreak: "keep-all",
    },
    heroSub: {
      marginTop: "10px",
      fontSize: isMobile ? "13px" : "14px",
      color: SUB,
      lineHeight: 1.7,
      fontWeight: 500,
      wordBreak: "keep-all",
    },
    statGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(4, minmax(0, 1fr))",
      gap: "10px",
      marginTop: "16px",
    },
    statCard: {
      background: "#FFFFFF",
      border: `1px solid ${BORDER}`,
      borderRadius: "16px",
      padding: isMobile ? "14px" : "15px",
      boxSizing: "border-box",
    },
    statLabel: {
      fontSize: "12px",
      color: SUB,
      fontWeight: 750,
      marginBottom: "7px",
    },
    statValue: {
      fontSize: isMobile ? "21px" : "23px",
      color: TEXT,
      fontWeight: 850,
      letterSpacing: "-0.35px",
      lineHeight: 1.2,
    },
    statSub: {
      marginTop: "6px",
      fontSize: "12px",
      color: SUB,
      lineHeight: 1.5,
      fontWeight: 500,
      wordBreak: "keep-all",
    },
    controlsCard: {
      background: SOFT,
      border: `1px solid ${BORDER}`,
      borderRadius: "18px",
      padding: isMobile ? "14px" : "16px",
      marginBottom: "18px",
      boxSizing: "border-box",
    },
    controlLabel: {
      fontSize: "13px",
      color: TEXT,
      fontWeight: 800,
      marginBottom: "10px",
    },
    filterBar: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) 170px 170px",
      gap: "10px",
    },
    input: {
      width: "100%",
      height: "48px",
      padding: "0 15px",
      borderRadius: "14px",
      border: `1px solid ${BORDER}`,
      background: "#FFFFFF",
      color: TEXT,
      fontSize: "14px",
      fontWeight: 500,
      outline: "none",
      boxSizing: "border-box",
      WebkitAppearance: "none",
      appearance: "none",
    },
    select: {
      width: "100%",
      height: "48px",
      padding: "0 14px",
      borderRadius: "14px",
      border: `1px solid ${BORDER}`,
      background: "#FFFFFF",
      color: TEXT,
      fontSize: "14px",
      fontWeight: 500,
      outline: "none",
      boxSizing: "border-box",
    },
    countText: {
      marginTop: "12px",
      fontSize: "13px",
      color: SUB,
      lineHeight: 1.6,
      fontWeight: 600,
      wordBreak: "keep-all",
    },
    message: {
      marginBottom: "14px",
      padding: "12px 14px",
      borderRadius: "14px",
      fontSize: "13px",
      fontWeight: 650,
      lineHeight: 1.6,
      border: "1px solid #D9E6FF",
      background: "#F8FBFF",
      color: BRAND_HOVER,
      wordBreak: "keep-all",
      boxSizing: "border-box",
    },
    listWrap: {
      display: "grid",
      gap: "14px",
    },
    emptyCard: {
      background: "#FFFFFF",
      border: `1px dashed ${BORDER}`,
      borderRadius: "18px",
      padding: "34px 20px",
      textAlign: "center",
      color: SUB,
      fontSize: "14px",
      lineHeight: 1.8,
      fontWeight: 550,
      wordBreak: "keep-all",
    },
    userCard: {
      background: "#FFFFFF",
      border: "1px solid #E6EDF5",
      borderRadius: "20px",
      padding: isMobile ? "16px" : "18px",
      transition:
        "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease",
      boxShadow: "0 8px 22px rgba(15, 23, 42, 0.035)",
      boxSizing: "border-box",
    },
    userTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "center",
      flexDirection: isMobile ? "column" : "row",
      gap: "12px",
      marginBottom: "14px",
    },
    nameArea: {
      minWidth: 0,
    },
    userName: {
      margin: 0,
      fontSize: isMobile ? "18px" : "19px",
      fontWeight: 850,
      color: TEXT,
      lineHeight: 1.45,
      letterSpacing: "-0.3px",
      wordBreak: "break-word",
    },
    userSub: {
      marginTop: "6px",
      fontSize: "13px",
      color: SUB,
      fontWeight: 550,
      wordBreak: "break-all",
    },
    badgeRow: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      flexWrap: "wrap",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "8px 12px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: 800,
      whiteSpace: "nowrap",
      border: "1px solid transparent",
      boxSizing: "border-box",
    },
    metaGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
      gap: "10px",
      marginBottom: "14px",
    },
    metaBox: {
      background: "#FBFDFF",
      border: `1px solid ${BORDER}`,
      borderRadius: "15px",
      padding: "12px 14px",
      boxSizing: "border-box",
    },
    metaLabel: {
      fontSize: "12px",
      color: SUB,
      fontWeight: 750,
      marginBottom: "6px",
    },
    metaValue: {
      fontSize: "14px",
      color: TEXT,
      fontWeight: 750,
      lineHeight: 1.55,
      wordBreak: "break-word",
    },
    idValue: {
      fontSize: "13px",
      color: TEXT,
      fontWeight: 650,
      lineHeight: 1.55,
      wordBreak: "break-all",
    },
    actionBox: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) 160px",
      gap: "10px",
      alignItems: "end",
      paddingTop: "14px",
      borderTop: "1px solid #EDF2F7",
    },
    actionLabel: {
      fontSize: "12px",
      color: SUB,
      fontWeight: 800,
      marginBottom: "8px",
    },
    saveBtn: {
      width: "100%",
      minHeight: "48px",
      border: "1px solid transparent",
      borderRadius: "14px",
      background: BRAND,
      color: "#FFFFFF",
      fontSize: "14px",
      fontWeight: 800,
      cursor: "pointer",
      outline: "none",
      outlineOffset: 0,
      boxShadow: "0 10px 20px rgba(47, 128, 237, 0.16)",
      transition:
        "background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease",
      boxSizing: "border-box",
    },
    sideCard: {
      background: CARD,
      border: `1px solid ${BORDER}`,
      borderRadius: isMobile ? "20px" : "24px",
      padding: isMobile ? "16px" : "18px",
      boxShadow: "0 14px 34px rgba(15, 23, 42, 0.06)",
      position: isMobile ? "static" : "sticky",
      top: "94px",
      boxSizing: "border-box",
    },
    sideBadge: {
      display: "inline-flex",
      alignItems: "center",
      padding: "7px 10px",
      borderRadius: "999px",
      background: "#EEF4FF",
      color: BRAND,
      fontSize: "12px",
      fontWeight: 850,
      marginBottom: "12px",
    },
    sideTitle: {
      margin: 0,
      fontSize: "19px",
      fontWeight: 850,
      color: TEXT,
      letterSpacing: "-0.3px",
    },
    sideDesc: {
      margin: "8px 0 16px",
      fontSize: "13px",
      lineHeight: 1.7,
      color: SUB,
      fontWeight: 500,
      wordBreak: "keep-all",
    },
    primaryBtn: {
      width: "100%",
      minHeight: "48px",
      border: "1px solid transparent",
      borderRadius: "14px",
      background: BRAND,
      color: "#FFFFFF",
      fontSize: "14px",
      fontWeight: 800,
      cursor: "pointer",
      outline: "none",
      outlineOffset: 0,
      boxShadow: "0 10px 20px rgba(47, 128, 237, 0.16)",
      transition:
        "background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease",
      boxSizing: "border-box",
    },
    whiteBtn: {
      width: "100%",
      minHeight: "48px",
      border: `1px solid ${BORDER}`,
      borderRadius: "14px",
      background: "#FFFFFF",
      color: TEXT,
      fontSize: "14px",
      fontWeight: 800,
      cursor: "pointer",
      outline: "none",
      outlineOffset: 0,
      boxShadow: "none",
      transition:
        "background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease",
      boxSizing: "border-box",
    },
    miniInfo: {
      marginTop: "16px",
      paddingTop: "16px",
      borderTop: `1px solid ${BORDER}`,
      display: "grid",
      gap: "10px",
    },
    miniItem: {
      background: "#F8FBFF",
      borderRadius: "15px",
      padding: "12px 14px",
      border: `1px solid ${BORDER}`,
      boxSizing: "border-box",
    },
    miniLabel: {
      fontSize: "12px",
      fontWeight: 750,
      color: SUB,
      marginBottom: "4px",
    },
    miniValue: {
      fontSize: "14px",
      fontWeight: 750,
      color: TEXT,
      lineHeight: 1.55,
      wordBreak: "break-word",
    },
    loadingWrap: {
      background: "#FFFFFF",
      border: `1px solid ${BORDER}`,
      borderRadius: "18px",
      padding: "30px 20px",
      textAlign: "center",
      color: SUB,
      fontSize: "15px",
      fontWeight: 700,
      boxSizing: "border-box",
    },
    dangerText: {
      color: DANGER,
      fontWeight: 750,
    },
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.loadingWrap}>
            회원 목록과 역할 정보를 불러오는 중입니다...
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.loadingWrap}>
            관리자만 접근할 수 있어요.
            {message && (
              <div style={{ marginTop: "8px", fontSize: "13px" }}>
                {message}
              </div>
            )}
            <div
              style={{
                display: "grid",
                gap: "10px",
                maxWidth: "260px",
                margin: "18px auto 0",
              }}
            >
              <HoverButton
                onClick={() => navigate("/admin")}
                baseStyle={styles.primaryBtn}
                hoverStyle={{
                  background: BRAND_HOVER,
                  boxShadow: "0 14px 24px rgba(31, 111, 214, 0.22)",
                }}
              >
                관리자 메인
              </HoverButton>

              <HoverButton
                onClick={() => navigate("/")}
                baseStyle={styles.whiteBtn}
                hoverStyle={{
                  color: BRAND,
                }}
              >
                메인으로 돌아가기
              </HoverButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.pageTitle}>회원 관리</h1>

        <div style={styles.shell}>
          <div style={styles.mainCard}>
            <div style={styles.heroCard}>
              <div style={styles.eyebrow}>관리자 회원 관리</div>

              <h2 style={styles.heroTitle}>
                전체 회원과 역할 정보를 관리해요
              </h2>

              <div style={styles.heroSub}>
                회원 목록을 확인하고, 일반 회원/전문가/관리자 역할을 변경할 수
                있어요.
              </div>

              <div style={styles.statGrid}>
                <StatCard
                  label="전체 회원"
                  value={`${summary.total}명`}
                  sub="등록된 전체 회원"
                  styles={styles}
                />

                <StatCard
                  label="일반 회원"
                  value={`${summary.normal}명`}
                  sub="요청을 등록하는 회원"
                  styles={styles}
                />

                <StatCard
                  label="전문가"
                  value={`${summary.worker}명`}
                  sub="요청을 수락하는 회원"
                  styles={styles}
                />

                <StatCard
                  label="관리자"
                  value={`${summary.admin}명`}
                  sub="서비스를 관리하는 계정"
                  styles={styles}
                />
              </div>
            </div>

            <div style={styles.controlsCard}>
              <div style={styles.controlLabel}>검색 및 필터</div>

              <div style={styles.filterBar}>
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="이름, 아이디, 이메일, 가입방식, 회원 ID 검색"
                  style={styles.input}
                />

                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  style={styles.select}
                >
                  <option value="all">전체 역할</option>
                  <option value="user">일반 회원</option>
                  <option value="worker">전문가</option>
                  <option value="admin">관리자</option>
                </select>

                <select
                  value={providerFilter}
                  onChange={(e) => setProviderFilter(e.target.value)}
                  style={styles.select}
                >
                  {providerOptions.map((provider) => (
                    <option key={provider} value={provider}>
                      {provider === "all"
                        ? "전체 가입방식"
                        : getProviderText(provider)}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.countText}>
                총 <strong>{filteredUsers.length}</strong>명의 회원이 보여요.
              </div>
            </div>

            {message && <div style={styles.message}>{message}</div>}

            <div style={styles.listWrap}>
              {filteredUsers.length === 0 ? (
                <div style={styles.emptyCard}>조건에 맞는 회원이 없어요.</div>
              ) : (
                filteredUsers.map((user) => {
                  const saving = savingUserId === user.id;
                  const joinedAt = user?.auth_created_at || user?.created_at;
                  const isMe =
                    loginUser?.id === user.id ||
                    loginUser?.supabaseUserId === user.id;

                  return (
                    <HoverCard
                      key={user.id}
                      baseStyle={styles.userCard}
                      hoverStyle={{
                        transform: isMobile ? "none" : "translateY(-3px)",
                        boxShadow: "0 16px 34px rgba(15, 23, 42, 0.08)",
                        borderColor: "#D7E6FB",
                      }}
                    >
                      <div style={styles.userTop}>
                        <div style={styles.nameArea}>
                          <h3 style={styles.userName}>
                            {getDisplayName(user)}
                            {isMe ? " (나)" : ""}
                          </h3>
                          <div style={styles.userSub}>
                            {user?.email || "이메일 정보 없음"}
                          </div>
                        </div>

                        <div style={styles.badgeRow}>
                          <span
                            style={{
                              ...styles.badge,
                              ...getRoleStyle(user.role),
                            }}
                          >
                            {getRoleText(user.role)}
                          </span>

                          <span
                            style={{
                              ...styles.badge,
                              ...getProviderStyle(user.provider),
                            }}
                          >
                            {getProviderText(user.provider)}
                          </span>
                        </div>
                      </div>

                      <div style={styles.metaGrid}>
                        <div style={styles.metaBox}>
                          <div style={styles.metaLabel}>아이디</div>
                          <div style={styles.metaValue}>
                            {user?.username || "-"}
                          </div>
                        </div>

                        <div style={styles.metaBox}>
                          <div style={styles.metaLabel}>이름</div>
                          <div style={styles.metaValue}>{user?.name || "-"}</div>
                        </div>

                        <div style={styles.metaBox}>
                          <div style={styles.metaLabel}>가입일</div>
                          <div style={styles.metaValue}>
                            {formatDate(joinedAt)}
                          </div>
                        </div>

                        <div style={styles.metaBox}>
                          <div style={styles.metaLabel}>가입방식</div>
                          <div style={styles.metaValue}>
                            {getProviderText(user?.provider)}
                          </div>
                        </div>

                        <div style={styles.metaBox}>
                          <div style={styles.metaLabel}>현재 역할</div>
                          <div style={styles.metaValue}>
                            {getRoleText(user?.role)}
                          </div>
                        </div>

                        <div style={styles.metaBox}>
                          <div style={styles.metaLabel}>회원 ID</div>
                          <div style={styles.idValue}>{user?.id || "-"}</div>
                        </div>
                      </div>

                      <div style={styles.actionBox}>
                        <div>
                          <div style={styles.actionLabel}>역할 변경</div>
                          <select
                            value={normalizeRole(user.role)}
                            onChange={(e) =>
                              handleRoleChange(user.id, e.target.value)
                            }
                            style={styles.select}
                            disabled={saving}
                          >
                            <option value="user">일반 회원</option>
                            <option value="worker">전문가</option>
                            <option value="admin">관리자</option>
                          </select>
                        </div>

                        <HoverButton
                          onClick={() => handleSaveRole(user)}
                          disabled={saving}
                          baseStyle={styles.saveBtn}
                          hoverStyle={{
                            background: BRAND_HOVER,
                            boxShadow:
                              "0 14px 24px rgba(31, 111, 214, 0.22)",
                          }}
                        >
                          {saving ? "저장 중..." : "역할 저장"}
                        </HoverButton>
                      </div>
                    </HoverCard>
                  );
                })
              )}
            </div>
          </div>

          <div style={styles.sideCard}>
            <div style={styles.sideBadge}>관리자 메뉴</div>

            <h3 style={styles.sideTitle}>회원 관리 요약</h3>

            <p style={styles.sideDesc}>
              회원 역할과 가입방식을 확인하고, 요청 관리 화면으로 이동할 수
              있어요.
            </p>

            <div style={{ display: "grid", gap: "10px" }}>
              <HoverButton
                onClick={() => navigate("/admin/requests")}
                baseStyle={styles.primaryBtn}
                hoverStyle={{
                  background: BRAND_HOVER,
                  boxShadow: "0 14px 24px rgba(31, 111, 214, 0.22)",
                }}
              >
                요청 관리로 가기
              </HoverButton>

              <HoverButton
                onClick={() => navigate("/admin")}
                baseStyle={styles.whiteBtn}
                hoverStyle={{
                  color: BRAND,
                }}
              >
                관리자 메인
              </HoverButton>

              <HoverButton
                onClick={() => navigate("/")}
                baseStyle={styles.whiteBtn}
                hoverStyle={{
                  color: BRAND,
                }}
              >
                메인으로 돌아가기
              </HoverButton>
            </div>

            <div style={styles.miniInfo}>
              <div style={styles.miniItem}>
                <div style={styles.miniLabel}>전체 회원</div>
                <div style={styles.miniValue}>{summary.total}명</div>
              </div>

              <div style={styles.miniItem}>
                <div style={styles.miniLabel}>일반 회원</div>
                <div style={styles.miniValue}>{summary.normal}명</div>
              </div>

              <div style={styles.miniItem}>
                <div style={styles.miniLabel}>전문가</div>
                <div style={styles.miniValue}>{summary.worker}명</div>
              </div>

              <div style={styles.miniItem}>
                <div style={styles.miniLabel}>관리자</div>
                <div style={styles.miniValue}>{summary.admin}명</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}