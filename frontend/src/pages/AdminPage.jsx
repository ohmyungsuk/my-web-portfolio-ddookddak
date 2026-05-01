import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const BRAND = "#2F80ED";
const BRAND_HOVER = "#1F6FD6";
const TEXT = "#0F172A";
const SUB = "#64748B";
const BG = "#F4F7FB";
const CARD = "#FFFFFF";
const BORDER = "#D9E4F2";
const BORDER_SOFT = "#E6EEF8";
const SOFT = "#F8FBFF";
const DANGER = "#EF4444";

function getWindowWidth() {
  if (typeof window === "undefined") return 1200;
  return window.innerWidth;
}

function normalizeStatus(status) {
  const value = String(status || "").trim().toLowerCase();

  if (["pending", "접수대기", "요청됨", "요청 등록", "등록됨"].includes(value)) {
    return "pending";
  }

  if (
    [
      "assigned",
      "배정완료",
      "담당자 배정",
      "quoted",
      "견적 협의중",
      "planned",
      "작업 예정",
    ].includes(value)
  ) {
    return "assigned";
  }

  if (["in_progress", "진행중", "작업중", "작업 진행중"].includes(value)) {
    return "in_progress";
  }

  if (["completed", "완료", "완료됨", "작업완료", "처리완료"].includes(value)) {
    return "completed";
  }

  if (["cancelled", "취소", "취소됨", "요청 취소"].includes(value)) {
    return "cancelled";
  }

  return "pending";
}

function getStatusLabel(status) {
  const normalized = normalizeStatus(status);

  if (normalized === "pending") return "요청 등록";
  if (normalized === "assigned") return "진행 준비";
  if (normalized === "in_progress") return "작업 진행중";
  if (normalized === "completed") return "완료";
  if (normalized === "cancelled") return "취소됨";

  return "요청 등록";
}

function getStatusStyle(status) {
  const normalized = normalizeStatus(status);

  if (normalized === "pending") {
    return {
      background: "#EFF6FF",
      color: "#2563EB",
      borderColor: "#BFDBFE",
    };
  }

  if (normalized === "assigned") {
    return {
      background: "#EEF2FF",
      color: "#4F46E5",
      borderColor: "#C7D2FE",
    };
  }

  if (normalized === "in_progress") {
    return {
      background: "#ECFDF3",
      color: "#15803D",
      borderColor: "#BBF7D0",
    };
  }

  if (normalized === "completed") {
    return {
      background: "#DCFCE7",
      color: "#166534",
      borderColor: "#86EFAC",
    };
  }

  if (normalized === "cancelled") {
    return {
      background: "#F1F5F9",
      color: "#64748B",
      borderColor: "#E2E8F0",
    };
  }

  return {
    background: "#F8FAFC",
    color: SUB,
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

function parseContentPreview(content) {
  if (!content) return "요청 내용이 없습니다.";

  const cleaned = String(content)
    .replace(/공간 유형:/g, "")
    .replace(/도움이 필요한 내용:/g, "")
    .replace(/희망 일정:/g, "")
    .replace(/상세 설명:/g, "")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return "요청 내용이 없습니다.";
  return cleaned.length > 92 ? `${cleaned.slice(0, 92)}...` : cleaned;
}

function HoverButton({ children, onClick, baseStyle, hoverStyle = {}, disabled = false }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onMouseDown={(event) => event.currentTarget.blur()}
      onMouseUp={(event) => event.currentTarget.blur()}
      onFocus={(event) => event.currentTarget.blur()}
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

function SummaryCard({ label, value, desc, tone = "blue", styles }) {
  const toneStyle = {
    blue: { background: "#EFF6FF", color: BRAND },
    indigo: { background: "#EEF2FF", color: "#4F46E5" },
    green: { background: "#ECFDF3", color: "#15803D" },
    gray: { background: "#F1F5F9", color: "#64748B" },
    red: { background: "#FFF1F2", color: DANGER },
  }[tone];

  return (
    <div style={styles.summaryCard}>
      <div style={{ ...styles.summaryIcon, ...toneStyle }}>{value}</div>
      <div>
        <p style={styles.summaryLabel}>{label}</p>
        <p style={styles.summaryDesc}>{desc}</p>
      </div>
    </div>
  );
}

function QuickCard({ title, desc, buttonText, onClick, styles }) {
  return (
    <div style={styles.quickCard}>
      <div>
        <h3 style={styles.quickTitle}>{title}</h3>
        <p style={styles.quickDesc}>{desc}</p>
      </div>

      <HoverButton
        onClick={onClick}
        baseStyle={styles.whiteButton}
        hoverStyle={{ color: BRAND }}
      >
        {buttonText}
      </HoverButton>
    </div>
  );
}

function RecentRequestCard({ request, onOpen, styles }) {
  const [isHover, setIsHover] = useState(false);
  const statusStyle = getStatusStyle(request.status);

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onMouseDown={(event) => event.currentTarget.blur()}
      onFocus={(event) => event.currentTarget.blur()}
      style={{
        ...styles.requestCard,
        ...(isHover
          ? {
              transform: "translateY(-2px)",
              boxShadow: "0 16px 30px rgba(47, 128, 237, 0.09)",
              borderColor: "#CFE0FB",
            }
          : {}),
      }}
    >
      <div style={styles.requestCardTop}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={styles.requestTitle}>{request.title || "제목 없음"}</h3>
          <p style={styles.requestPreview}>{parseContentPreview(request.content)}</p>
        </div>

        <span style={{ ...styles.statusBadge, ...statusStyle }}>
          {getStatusLabel(request.status)}
        </span>
      </div>

      <div style={styles.requestMeta}>
        <span>카테고리 {request.category || "미분류"}</span>
        <span>등록일 {formatDate(request.created_at)}</span>
        <span>담당자 {request.assigned_username || "아직 없음"}</span>
      </div>
    </button>
  );
}

export default function AdminPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState("");
  const [windowWidth, setWindowWidth] = useState(getWindowWidth);
  const [summary, setSummary] = useState({
    total: 0,
    pending: 0,
    assigned: 0,
    in_progress: 0,
    completed: 0,
    cancelled: 0,
  });
  const [userSummary, setUserSummary] = useState({
    total: 0,
    user: 0,
    worker: 0,
    admin: 0,
  });
  const [recentRequests, setRecentRequests] = useState([]);

  const isMobile = windowWidth <= 760;
  const isSmallMobile = windowWidth <= 460;

  const loginUser = useMemo(() => {
    try {
      const savedUser = localStorage.getItem("loginUser");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("저장된 로그인 정보 파싱 실패:", error);
      return null;
    }
  }, []);

  const loadAdminData = useCallback(async () => {
    try {
      setLoading(true);
      setMessage("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const userId = user?.id || loginUser?.supabaseUserId || loginUser?.id;

      if (!userId) {
        navigate("/login", { replace: true });
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .maybeSingle();

      if (profileError) throw profileError;

      if (profile?.role !== "admin") {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);

      const [
        { data: requests, error: requestsError },
        { data: profiles, error: profilesError },
      ] = await Promise.all([
        supabase
          .from("requests")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase.from("profiles").select("role"),
      ]);

      if (requestsError) throw requestsError;
      if (profilesError) throw profilesError;

      const safeRequests = Array.isArray(requests) ? requests : [];
      const safeProfiles = Array.isArray(profiles) ? profiles : [];
      const nextSummary = {
        total: safeRequests.length,
        pending: 0,
        assigned: 0,
        in_progress: 0,
        completed: 0,
        cancelled: 0,
      };

      safeRequests.forEach((request) => {
        const normalized = normalizeStatus(request.status);
        if (nextSummary[normalized] !== undefined) {
          nextSummary[normalized] += 1;
        }
      });

      const nextUserSummary = {
        total: safeProfiles.length,
        user: 0,
        worker: 0,
        admin: 0,
      };

      safeProfiles.forEach((profile) => {
        const role = String(profile?.role || "user").trim().toLowerCase();

        if (role === "admin") {
          nextUserSummary.admin += 1;
        } else if (role === "worker") {
          nextUserSummary.worker += 1;
        } else {
          nextUserSummary.user += 1;
        }
      });

      setSummary(nextSummary);
      setUserSummary(nextUserSummary);
      setRecentRequests(safeRequests.slice(0, 6));
    } catch (error) {
      console.error("관리자 페이지 로딩 실패:", error);
      setMessage(error.message || "관리자 정보를 불러오지 못했습니다.");
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }, [loginUser?.id, loginUser?.supabaseUserId, navigate]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowWidth());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    loadAdminData();
  }, [loadAdminData]);

  const activeCount = summary.assigned + summary.in_progress;

  const styles = {
    page: {
      minHeight: "100dvh",
      background: BG,
      padding: isMobile ? "88px 16px 38px" : "104px 42px 58px",
      boxSizing: "border-box",
      fontFamily:
        '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      color: TEXT,
    },
    container: {
      maxWidth: "1160px",
      margin: "0 auto",
    },
    hero: {
      background: "linear-gradient(180deg, #FFFFFF 0%, #F8FBFF 100%)",
      border: `1px solid ${BORDER}`,
      borderRadius: isMobile ? "20px" : "26px",
      padding: isMobile ? "22px 18px" : "28px",
      boxShadow: "0 16px 36px rgba(47, 128, 237, 0.08)",
      marginBottom: "18px",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    heroInner: {
      display: "flex",
      justifyContent: "space-between",
      gap: "18px",
      flexWrap: "wrap",
      alignItems: "flex-start",
      flexDirection: isMobile ? "column" : "row",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      margin: "0 0 10px",
      padding: "7px 11px",
      borderRadius: "999px",
      background: "#EFF6FF",
      color: BRAND,
      fontSize: "12px",
      fontWeight: 900,
      lineHeight: 1,
    },
    title: {
      margin: 0,
      fontSize: isMobile ? "25px" : "31px",
      fontWeight: 900,
      color: TEXT,
      lineHeight: 1.25,
      letterSpacing: "-0.8px",
      wordBreak: "keep-all",
    },
    desc: {
      margin: "10px 0 0",
      fontSize: "14px",
      color: SUB,
      lineHeight: 1.7,
      fontWeight: 600,
      wordBreak: "keep-all",
    },
    buttonRow: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      width: isMobile ? "100%" : "auto",
    },
    primaryButton: {
      minHeight: "45px",
      padding: "0 18px",
      border: "1px solid transparent",
      borderRadius: "14px",
      background: BRAND,
      color: "#FFFFFF",
      fontSize: "14px",
      fontWeight: 850,
      cursor: "pointer",
      boxShadow: "0 10px 22px rgba(47, 128, 237, 0.18)",
      boxSizing: "border-box",
      width: isMobile ? "100%" : "auto",
      outline: "none",
      outlineOffset: 0,
    },
    whiteButton: {
      minHeight: "45px",
      padding: "0 18px",
      border: `1px solid ${BORDER}`,
      borderRadius: "14px",
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
    },
    message: {
      marginBottom: "16px",
      padding: "13px 15px",
      borderRadius: "14px",
      background: "#FFF5F5",
      border: "1px solid #FFD8D8",
      color: "#DC2626",
      fontSize: "13px",
      fontWeight: 800,
      lineHeight: 1.6,
      boxSizing: "border-box",
    },
    summaryGrid: {
      display: "grid",
      gridTemplateColumns: isSmallMobile
        ? "1fr"
        : isMobile
          ? "repeat(2, minmax(0, 1fr))"
          : "repeat(3, minmax(0, 1fr))",
      gap: "12px",
      marginBottom: "18px",
    },
    summaryCard: {
      background: CARD,
      border: `1px solid ${BORDER}`,
      borderRadius: "20px",
      padding: isMobile ? "16px" : "18px",
      boxShadow: "0 12px 26px rgba(47, 128, 237, 0.055)",
      display: "flex",
      alignItems: "center",
      gap: "14px",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    summaryIcon: {
      width: "52px",
      height: "52px",
      borderRadius: "17px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      fontSize: "22px",
      fontWeight: 900,
      lineHeight: 1,
    },
    summaryLabel: {
      margin: 0,
      fontSize: "14px",
      color: TEXT,
      fontWeight: 900,
      lineHeight: 1.35,
    },
    summaryDesc: {
      margin: "5px 0 0",
      fontSize: "12px",
      color: SUB,
      fontWeight: 650,
      lineHeight: 1.5,
    },
    quickGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(4, minmax(0, 1fr))",
      gap: "12px",
      marginBottom: "18px",
    },
    quickCard: {
      background: CARD,
      border: `1px solid ${BORDER}`,
      borderRadius: "20px",
      padding: "18px",
      boxShadow: "0 12px 26px rgba(47, 128, 237, 0.055)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      gap: "16px",
      minHeight: isMobile ? "auto" : "160px",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    quickTitle: {
      margin: "0 0 8px",
      fontSize: "18px",
      fontWeight: 900,
      color: TEXT,
      lineHeight: 1.35,
    },
    quickDesc: {
      margin: 0,
      fontSize: "13px",
      color: SUB,
      lineHeight: 1.7,
      fontWeight: 650,
      wordBreak: "keep-all",
    },
    sectionCard: {
      background: CARD,
      border: `1px solid ${BORDER}`,
      borderRadius: isMobile ? "20px" : "24px",
      padding: isMobile ? "18px" : "22px",
      boxShadow: "0 16px 36px rgba(47, 128, 237, 0.06)",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    sectionHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "center",
      flexDirection: isMobile ? "column" : "row",
      gap: "12px",
      marginBottom: "16px",
    },
    sectionTitle: {
      margin: 0,
      fontSize: isMobile ? "20px" : "22px",
      fontWeight: 900,
      color: TEXT,
      lineHeight: 1.35,
      letterSpacing: "-0.35px",
    },
    sectionDesc: {
      margin: "6px 0 0",
      fontSize: "13px",
      color: SUB,
      lineHeight: 1.7,
      fontWeight: 650,
    },
    empty: {
      padding: "34px 16px",
      borderRadius: "18px",
      background: SOFT,
      border: `1px dashed ${BORDER}`,
      color: SUB,
      textAlign: "center",
      fontSize: "14px",
      fontWeight: 700,
      lineHeight: 1.7,
      boxSizing: "border-box",
    },
    requestList: {
      display: "grid",
      gap: "10px",
    },
    requestCard: {
      width: "100%",
      textAlign: "left",
      border: `1px solid ${BORDER_SOFT}`,
      borderRadius: "18px",
      background: "#FFFFFF",
      padding: isMobile ? "15px" : "17px",
      cursor: "pointer",
      boxShadow: "0 8px 18px rgba(47, 128, 237, 0.035)",
      transition: "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
      appearance: "none",
      WebkitAppearance: "none",
      WebkitTapHighlightColor: "transparent",
    },
    requestCardTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "12px",
      flexDirection: isMobile ? "column" : "row",
    },
    requestTitle: {
      margin: 0,
      fontSize: "17px",
      fontWeight: 900,
      color: TEXT,
      lineHeight: 1.4,
      wordBreak: "break-word",
    },
    requestPreview: {
      margin: "8px 0 0",
      fontSize: "13px",
      color: SUB,
      lineHeight: 1.7,
      fontWeight: 600,
      wordBreak: "break-word",
    },
    requestMeta: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
      marginTop: "14px",
      fontSize: "12px",
      color: SUB,
      fontWeight: 750,
    },
    statusBadge: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "999px",
      padding: "8px 12px",
      fontSize: "12px",
      fontWeight: 850,
      whiteSpace: "nowrap",
      border: "1px solid transparent",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    loadingWrap: {
      background: CARD,
      border: `1px solid ${BORDER}`,
      borderRadius: "22px",
      padding: "34px 24px",
      textAlign: "center",
      boxShadow: "0 16px 36px rgba(47, 128, 237, 0.08)",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.loadingWrap}>
            <p style={styles.badge}>관리자</p>
            <h1 style={styles.title}>관리자 페이지 불러오는 중...</h1>
            <p style={styles.desc}>권한과 요청 현황을 확인하고 있습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.hero}>
            <p style={styles.badge}>접근 제한</p>
            <h1 style={styles.title}>관리자만 들어올 수 있어요</h1>
            <p style={styles.desc}>
              현재 계정은 관리자 권한이 없어서 이 페이지를 볼 수 없습니다.
            </p>

            {message && <div style={{ ...styles.message, marginTop: "16px" }}>{message}</div>}

            <div style={{ ...styles.buttonRow, marginTop: "18px" }}>
              <HoverButton
                onClick={() => navigate("/")}
                baseStyle={styles.primaryButton}
                hoverStyle={{
                  background: BRAND_HOVER,
                  boxShadow: "0 12px 24px rgba(31, 111, 214, 0.22)",
                }}
              >
                홈으로 가기
              </HoverButton>

              <HoverButton
                onClick={() => navigate("/mypage")}
                baseStyle={styles.whiteButton}
                hoverStyle={{ color: BRAND }}
              >
                마이페이지로 가기
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
        <section style={styles.hero}>
          <div style={styles.heroInner}>
            <div>
              <p style={styles.badge}>관리자 대시보드</p>
              <h1 style={styles.title}>요청 현황을 한눈에 확인해요</h1>
              <p style={styles.desc}>
                전체 요청과 진행 상태를 확인하고, 관리자 화면으로 빠르게 이동할 수 있어요.
              </p>
            </div>

            <div style={styles.buttonRow}>
              <HoverButton
                onClick={() => navigate("/admin/requests")}
                baseStyle={styles.primaryButton}
                hoverStyle={{
                  background: BRAND_HOVER,
                  boxShadow: "0 12px 24px rgba(31, 111, 214, 0.22)",
                }}
              >
                요청 관리
              </HoverButton>

              <HoverButton
                onClick={() => navigate("/admin/users")}
                baseStyle={styles.whiteButton}
                hoverStyle={{ color: BRAND }}
              >
                회원 관리
              </HoverButton>

              <HoverButton
                onClick={() => navigate("/")}
                baseStyle={styles.whiteButton}
                hoverStyle={{ color: BRAND }}
              >
                홈으로
              </HoverButton>
            </div>
          </div>
        </section>

        {message && <div style={styles.message}>{message}</div>}

        <section style={styles.summaryGrid}>
          <SummaryCard
            label="전체 요청"
            value={summary.total}
            desc="등록된 모든 요청"
            tone="blue"
            styles={styles}
          />
          <SummaryCard
            label="요청 등록"
            value={summary.pending}
            desc="아직 담당자 배정 전"
            tone="gray"
            styles={styles}
          />
          <SummaryCard
            label="진행 관련"
            value={activeCount}
            desc="배정부터 작업 진행까지"
            tone="indigo"
            styles={styles}
          />
          <SummaryCard
            label="작업 진행중"
            value={summary.in_progress}
            desc="현재 처리 중인 요청"
            tone="green"
            styles={styles}
          />
          <SummaryCard
            label="완료"
            value={summary.completed}
            desc="처리가 끝난 요청"
            tone="green"
            styles={styles}
          />
          <SummaryCard
            label="취소됨"
            value={summary.cancelled}
            desc="취소 처리된 요청"
            tone="red"
            styles={styles}
          />
          <SummaryCard
            label="전체 회원"
            value={userSummary.total}
            desc={`전문가 ${userSummary.worker}명 · 관리자 ${userSummary.admin}명`}
            tone="indigo"
            styles={styles}
          />
        </section>

        <section style={styles.quickGrid}>
          <QuickCard
            title="요청 관리"
            desc="전체 요청을 확인하고 담당자 배정과 상태 변경을 처리해요."
            buttonText="요청 관리로 이동"
            onClick={() => navigate("/admin/requests")}
            styles={styles}
          />
          <QuickCard
            title="회원 관리"
            desc="회원 목록을 확인하고 일반회원, 전문가, 관리자 역할을 관리해요."
            buttonText="회원 관리로 이동"
            onClick={() => navigate("/admin/users")}
            styles={styles}
          />
          <QuickCard
            title="전문가 관리"
            desc="전문가 계정을 확인하고 요청 담당자로 배정할 계정을 정리해요."
            buttonText="전문가 확인"
            onClick={() => navigate("/admin/users")}
            styles={styles}
          />
          <QuickCard
            title="전체 요청 보기"
            desc="사용자 화면 기준의 전체 요청 목록을 확인할 수 있어요."
            buttonText="전체 요청 보기"
            onClick={() => navigate("/requests/all")}
            styles={styles}
          />
        </section>

        <section style={styles.sectionCard}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>최근 등록된 요청</h2>
              <p style={styles.sectionDesc}>
                최근 들어온 요청을 빠르게 확인하고 상세보기로 이동할 수 있어요.
              </p>
            </div>

            <HoverButton
              onClick={() => navigate("/admin/requests")}
              baseStyle={styles.whiteButton}
              hoverStyle={{ color: BRAND }}
            >
              전체 보기
            </HoverButton>
          </div>

          {recentRequests.length === 0 ? (
            <div style={styles.empty}>등록된 요청이 아직 없습니다.</div>
          ) : (
            <div style={styles.requestList}>
              {recentRequests.map((request) => (
                <RecentRequestCard
                  key={request.id}
                  request={request}
                  styles={styles}
                  onOpen={() =>
                    navigate(`/requests/${request.id}`, {
                      state: { request, from: "/admin" },
                    })
                  }
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
