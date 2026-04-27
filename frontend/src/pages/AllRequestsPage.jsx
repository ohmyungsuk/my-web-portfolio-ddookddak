import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient.js";

const BRAND = "#2F80ED";
const BRAND_HOVER = "#1F6FD6";
const TEXT = "#0F172A";
const SUB = "#64748B";
const BG = "#F4F7FB";
const CARD = "#FFFFFF";
const BORDER = "#D9E4F2";
const BORDER_HOVER = "#AFCBF5";
const SOFT = "#F8FBFF";

const FILTER_OPTIONS = [
  { key: "all", label: "전체" },
  { key: "pending", label: "요청 등록" },
  { key: "assigned_group", label: "상담 진행" },
  { key: "completed", label: "거래 완료" },
  { key: "cancelled", label: "취소됨" },
];

const CATEGORY_OPTIONS = [
  { key: "all", label: "전체 카테고리" },
  { key: "전기/조명", label: "전기/조명" },
  { key: "설비/배관", label: "설비/배관" },
  { key: "누수/방수", label: "누수/방수" },
  { key: "도어락/출입문", label: "도어락/출입문" },
  { key: "에어컨/환기", label: "에어컨/환기" },
  { key: "CCTV/네트워크", label: "CCTV/네트워크" },
  { key: "유리/창호", label: "유리/창호" },
  { key: "가전/생활수리", label: "가전/생활수리" },
  { key: "청소/철거", label: "청소/철거" },
  { key: "기타 유지보수", label: "기타 유지보수" },
];

function getWindowWidth() {
  if (typeof window === "undefined") return 1024;
  return window.innerWidth;
}

function normalizeStatus(status) {
  if (status === "pending" || status === "요청 등록" || status === "등록됨") {
    return "pending";
  }

  if (
    status === "assigned" ||
    status === "배정완료" ||
    status === "담당자 배정"
  ) {
    return "assigned";
  }

  if (status === "quoted" || status === "견적 협의중") {
    return "quoted";
  }

  if (status === "planned" || status === "작업 예정") {
    return "planned";
  }

  if (
    status === "in_progress" ||
    status === "진행중" ||
    status === "작업 진행중"
  ) {
    return "in_progress";
  }

  if (status === "completed" || status === "완료됨" || status === "완료") {
    return "completed";
  }

  if (
    status === "cancelled" ||
    status === "취소됨" ||
    status === "취소" ||
    status === "요청 취소"
  ) {
    return "cancelled";
  }

  return "unknown";
}

function getStatusText(status) {
  const normalized = normalizeStatus(status);

  if (normalized === "pending") return "요청 등록";
  if (normalized === "assigned") return "담당자 배정";
  if (normalized === "quoted") return "견적 협의중";
  if (normalized === "planned") return "작업 예정";
  if (normalized === "in_progress") return "작업 진행중";
  if (normalized === "completed") return "거래 완료";
  if (normalized === "cancelled") return "취소됨";

  return "상태 없음";
}

function getProgressInfo(status) {
  const normalized = normalizeStatus(status);

  if (normalized === "completed") {
    return {
      percent: 100,
      activeStep: 2,
      color: BRAND,
      message: "거래가 완료된 요청이에요.",
    };
  }

  if (normalized === "cancelled") {
    return {
      percent: 100,
      activeStep: -1,
      color: "#94A3B8",
      message: "취소된 요청이에요.",
    };
  }

  if (["assigned", "quoted", "planned", "in_progress"].includes(normalized)) {
    return {
      percent: 50,
      activeStep: 1,
      color: BRAND,
      message: "정리된 전문가가 확인 중이에요.",
    };
  }

  return {
    percent: 8,
    activeStep: 0,
    color: "#CBD5E1",
    message: "전문가의 답변을 기다리고 있어요.",
  };
}

function formatDate(value) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return `${String(date.getFullYear()).slice(2)}.${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}

function parseDescription(content) {
  const raw = content || "";
  const lines = raw.split("\n");

  const getValue = (label) => {
    return (
      lines
        .find((line) => line.startsWith(label))
        ?.replace(label, "")
        .trim() || "-"
    );
  };

  const placeType = getValue("공간 유형:");
  const issueType = getValue("도움이 필요한 내용:");
  const schedule = getValue("희망 일정:");

  const detailText =
    lines
      .find((line) => line.startsWith("상세 설명:"))
      ?.replace("상세 설명:", "")
      .trim() ||
    raw ||
    "내용이 없습니다.";

  return {
    placeType,
    issueType,
    schedule,
    detailText,
  };
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
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onMouseDown={(e) => e.currentTarget.blur()}
      onMouseUp={(e) => e.currentTarget.blur()}
      onFocus={(e) => e.currentTarget.blur()}
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

function RequestCard({ request, onOpen, styles, isMobile }) {
  const [isHover, setIsHover] = useState(false);
  const parsed = parseDescription(request.content);
  const normalizedStatus = normalizeStatus(request.status);
  const progress = getProgressInfo(request.status);

  const messageText =
    normalizedStatus === "pending"
      ? "전문가의 답변을 기다리고 있어요."
      : normalizedStatus === "completed"
        ? "요청이 완료됐어요."
        : normalizedStatus === "cancelled"
          ? "취소된 요청이에요."
          : request.assigned_username
            ? `${request.assigned_username} 전문가가 확인 중이에요.`
            : "정리된 전문가가 확인 중이에요.";

  return (
    <div
      style={{
        ...styles.card,
        ...(isHover && !isMobile
            ? {
                transform: "translateY(-4px)",
                boxShadow: "0 18px 36px rgba(47, 128, 237, 0.12)",
              }
            : {}),
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div style={styles.cardHead}>
        <div>
          <div style={styles.titleRow}>
            <h3 style={styles.cardTitle}>{request.title || "요청 제목 없음"}</h3>
            {normalizedStatus !== "completed" &&
              normalizedStatus !== "cancelled" && <span style={styles.redDot} />}
          </div>

          <div style={styles.dateText}>{formatDate(request.created_at)}</div>
        </div>

        <span
          style={{
            ...styles.statusBadge,
            color:
              normalizedStatus === "completed"
                ? "#166534"
                : normalizedStatus === "cancelled"
                  ? "#64748B"
                  : BRAND,
            background:
              normalizedStatus === "completed"
                ? "#DCFCE7"
                : normalizedStatus === "cancelled"
                  ? "#F1F5F9"
                  : "#EFF6FF",
            borderColor:
              normalizedStatus === "completed"
                ? "#86EFAC"
                : normalizedStatus === "cancelled"
                  ? "#E2E8F0"
                  : "#BFDBFE",
          }}
        >
          {getStatusText(request.status)}
        </span>
      </div>

      <div style={styles.progressWrap}>
        <div style={styles.progressTrack}>
          <div
            style={{
              ...styles.progressBar,
              width: `${progress.percent}%`,
              background: progress.color,
            }}
          />
        </div>

        <div style={styles.progressLabels}>
          <span
            style={{
              ...styles.progressLabel,
              color: progress.activeStep === 0 ? TEXT : SUB,
              fontWeight: progress.activeStep === 0 ? 800 : 600,
            }}
          >
            요청등록
          </span>

          <span
            style={{
              ...styles.progressLabel,
              color: progress.activeStep === 1 ? TEXT : SUB,
              fontWeight: progress.activeStep === 1 ? 800 : 600,
              textAlign: "center",
            }}
          >
            상담진행
          </span>

          <span
            style={{
              ...styles.progressLabel,
              color: progress.activeStep === 2 ? TEXT : SUB,
              fontWeight: progress.activeStep === 2 ? 800 : 600,
              textAlign: "right",
            }}
          >
            거래완료
          </span>
        </div>
      </div>

      <div style={styles.infoLine}>
        <span style={styles.infoIcon}>•</span>
        <span>{messageText}</span>
      </div>

      <div style={styles.metaGrid}>
        <div style={styles.metaItem}>
          <span style={styles.metaLabel}>카테고리</span>
          <strong style={styles.metaValue}>{request.category || "-"}</strong>
        </div>

        <div style={styles.metaItem}>
          <span style={styles.metaLabel}>공간</span>
          <strong style={styles.metaValue}>
            {request.location || parsed.placeType}
          </strong>
        </div>

        <div style={styles.metaItem}>
          <span style={styles.metaLabel}>희망 일정</span>
          <strong style={styles.metaValue}>{parsed.schedule}</strong>
        </div>
      </div>

      <div style={styles.previewText}>
        {parsed.issueType !== "-" ? parsed.issueType : parsed.detailText}
      </div>

      <HoverButton
        onClick={() => onOpen(request)}
        baseStyle={styles.detailButton}
        hoverStyle={{
          background: BRAND_HOVER,
          boxShadow: "0 12px 24px rgba(31, 111, 214, 0.22)",
        }}
      >
        자세히 보기
      </HoverButton>
    </div>
  );
}

export default function AllRequestsPage({ onClickRequest }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [loginUser, setLoginUser] = useState(null);
  const [loginProfile, setLoginProfile] = useState(null);
  const [windowWidth, setWindowWidth] = useState(getWindowWidth);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const isMobile = windowWidth <= 720;
  const isTablet = windowWidth <= 1100;
  const gridColumns = isMobile
    ? "1fr"
    : isTablet
      ? "repeat(2, 1fr)"
      : "repeat(3, 1fr)";

  const userRole = loginProfile?.role || loginUser?.user_metadata?.role || null;
  const isWorker = userRole === "worker";

  const fetchLoginProfile = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setLoginUser(user || null);

    if (!user?.id) {
      setLoginProfile(null);
      return;
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      console.error("프로필 조회 실패:", error);
      setLoginProfile(null);
      return;
    }

    setLoginProfile(profile || null);
  }, []);

  const fetchAllRequests = useCallback(async () => {
    try {
      setLoading(true);
      setMessage("");

      const { data, error } = await supabase
        .from("requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setRequests(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("전체 요청 목록 불러오기 실패:", error);
      setMessage(error.message || "전체 요청 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowWidth());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchAllRequests();
    fetchLoginProfile();
  }, [fetchAllRequests, fetchLoginProfile]);

  useEffect(() => {
    if (location.state?.refresh) {
      fetchAllRequests();
      fetchLoginProfile();
    }
  }, [location.state, fetchAllRequests, fetchLoginProfile]);

  const summary = useMemo(() => {
    const normalized = requests.map((item) => normalizeStatus(item.status));

    return {
      total: requests.length,
      pending: normalized.filter((status) => status === "pending").length,
      active: normalized.filter((status) =>
        ["assigned", "quoted", "planned", "in_progress"].includes(status),
      ).length,
      completed: normalized.filter((status) => status === "completed").length,
    };
  }, [requests]);

  const filteredRequests = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return requests.filter((item) => {
      const normalized = normalizeStatus(item.status);

      const statusMatch =
        selectedFilter === "all" ||
        normalized === selectedFilter ||
        (selectedFilter === "assigned_group" &&
          ["assigned", "quoted", "planned", "in_progress"].includes(normalized));

      const categoryMatch =
        categoryFilter === "all" || (item.category || "") === categoryFilter;

      const parsed = parseDescription(item.content);

      const searchTarget = [
        item.title,
        item.category,
        item.content,
        item.location,
        parsed.placeType,
        parsed.issueType,
        parsed.schedule,
        parsed.detailText,
        item.assigned_username,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const searchMatch = keyword === "" || searchTarget.includes(keyword);

      return statusMatch && categoryMatch && searchMatch;
    });
  }, [requests, selectedFilter, categoryFilter, search]);

  const handleOpenDetail = (request) => {
    if (onClickRequest) {
      onClickRequest(request);
      return;
    }

    navigate(`/requests/${request.id}`, {
      state: {
        request,
        from: "/requests/all",
      },
    });
  };

  const styles = {
    page: {
      minHeight: "100dvh",
      background: BG,
      padding: isMobile ? "86px 16px 36px" : "104px 42px 56px",
      boxSizing: "border-box",
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
      marginBottom: "22px",
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
    actionRow: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      width: isMobile ? "100%" : "auto",
    },
    topButton: {
      minHeight: "44px",
      padding: "0 18px",
      borderRadius: "13px",
      border: "1px solid transparent",
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
    whiteTopButton: {
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
    },
    summaryBar: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(4, minmax(0, 1fr))",
      gap: "10px",
      marginBottom: "18px",
    },
    summaryItem: {
      background: "#FFFFFF",
      border: `1px solid ${BORDER}`,
      borderRadius: "18px",
      padding: "16px",
      boxShadow: "0 10px 24px rgba(15, 23, 42, 0.04)",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    summaryLabel: {
      fontSize: "12px",
      color: SUB,
      fontWeight: 800,
      marginBottom: "7px",
    },
    summaryValue: {
      fontSize: "24px",
      color: TEXT,
      fontWeight: 900,
      lineHeight: 1.1,
    },
    filterBox: {
      background: "#FFFFFF",
      border: `1px solid ${BORDER}`,
      borderRadius: "20px",
      padding: isMobile ? "14px" : "16px",
      marginBottom: "20px",
      boxShadow: "0 12px 28px rgba(15, 23, 42, 0.045)",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    filterGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) 210px",
      gap: "10px",
      marginBottom: "12px",
    },
    input: {
      width: "100%",
      height: "48px",
      borderRadius: "14px",
      border: `1px solid ${BORDER}`,
      background: SOFT,
      color: TEXT,
      fontSize: "14px",
      padding: "0 15px",
      outline: "none",
      outlineOffset: 0,
      boxSizing: "border-box",
      WebkitAppearance: "none",
      appearance: "none",
    },
    select: {
      width: "100%",
      height: "48px",
      borderRadius: "14px",
      border: `1px solid ${BORDER}`,
      background: SOFT,
      color: TEXT,
      fontSize: "14px",
      padding: "0 14px",
      outline: "none",
      outlineOffset: 0,
      boxSizing: "border-box",
    },
    tabRow: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
    },
    tabButton: {
      minHeight: "38px",
      padding: "0 14px",
      borderRadius: "999px",
      border: `1px solid ${BORDER}`,
      background: "#FFFFFF",
      color: TEXT,
      fontSize: "13px",
      fontWeight: 800,
      cursor: "pointer",
      boxShadow: "none",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    activeTabButton: {
      background: BRAND,
      color: "#FFFFFF",
      border: "1px solid transparent",
      boxShadow: "0 10px 18px rgba(47, 128, 237, 0.16)",
    },
    countText: {
      margin: "0 0 14px",
      color: SUB,
      fontSize: "13px",
      fontWeight: 650,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: gridColumns,
      gap: "12px",
    },
    card: {
      background: CARD,
      border: `1px solid ${BORDER}`,
      borderRadius: "18px",
      padding: isMobile ? "16px" : "17px",
      minHeight: "330px",
      boxShadow: "0 10px 24px rgba(15, 23, 42, 0.045)",
      transition:
        "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      outline: "none",
      outlineOffset: 0,
    },
    cardHead: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "10px",
      marginBottom: "14px",
    },
    titleRow: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      minWidth: 0,
    },
    cardTitle: {
      margin: 0,
      fontSize: "18px",
      fontWeight: 900,
      color: TEXT,
      letterSpacing: "-0.35px",
      lineHeight: 1.35,
      wordBreak: "break-word",
    },
    redDot: {
      width: "6px",
      height: "6px",
      borderRadius: "999px",
      background: "#EF4444",
      flexShrink: 0,
      marginTop: "-10px",
    },
    dateText: {
      marginTop: "6px",
      color: SUB,
      fontSize: "13px",
      fontWeight: 650,
    },
    statusBadge: {
      flexShrink: 0,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "31px",
      padding: "0 11px",
      borderRadius: "999px",
      border: "1px solid transparent",
      fontSize: "12px",
      fontWeight: 850,
      whiteSpace: "nowrap",
      outline: "none",
      outlineOffset: 0,
    },
    progressWrap: {
      marginBottom: "18px",
    },
    progressTrack: {
      width: "100%",
      height: "8px",
      borderRadius: "999px",
      background: "#E9EEF5",
      overflow: "hidden",
    },
    progressBar: {
      height: "100%",
      borderRadius: "999px",
      transition: "width 0.2s ease",
    },
    progressLabels: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      marginTop: "7px",
      gap: "4px",
    },
    progressLabel: {
      fontSize: "11px",
      lineHeight: 1.3,
    },
    infoLine: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: TEXT,
      fontSize: "13px",
      fontWeight: 700,
      lineHeight: 1.6,
      marginBottom: "14px",
      minHeight: "42px",
      wordBreak: "keep-all",
    },
    infoIcon: {
      width: "18px",
      height: "18px",
      borderRadius: "999px",
      background: "#EEF4FF",
      color: BRAND,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
      fontWeight: 900,
      flexShrink: 0,
    },
    metaGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "7px",
      marginBottom: "12px",
    },
    metaItem: {
      background: SOFT,
      border: `1px solid ${BORDER}`,
      borderRadius: "13px",
      padding: "10px",
      minWidth: 0,
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    metaLabel: {
      display: "block",
      color: SUB,
      fontSize: "11px",
      fontWeight: 800,
      marginBottom: "5px",
    },
    metaValue: {
      display: "block",
      color: TEXT,
      fontSize: "12px",
      fontWeight: 850,
      lineHeight: 1.35,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    previewText: {
      color: SUB,
      fontSize: "13px",
      lineHeight: 1.65,
      fontWeight: 600,
      wordBreak: "break-word",
      marginBottom: "16px",
      minHeight: "42px",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
    detailButton: {
      marginTop: "auto",
      width: "100%",
      minHeight: "48px",
      border: "1px solid transparent",
      borderRadius: "12px",
      background: BRAND,
      color: "#FFFFFF",
      fontSize: "15px",
      fontWeight: 900,
      cursor: "pointer",
      boxShadow: "0 10px 20px rgba(47, 128, 237, 0.16)",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    emptyCard: {
      background: "#FFFFFF",
      border: `1px dashed ${BORDER}`,
      borderRadius: "20px",
      padding: "46px 20px",
      color: SUB,
      textAlign: "center",
      fontSize: "14px",
      lineHeight: 1.8,
      fontWeight: 650,
      gridColumn: "1 / -1",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    message: {
      background: "#FFF5F5",
      border: "1px solid #FFD8D8",
      color: "#DC2626",
      borderRadius: "16px",
      padding: "14px",
      fontSize: "13px",
      fontWeight: 700,
      marginBottom: "16px",
      boxSizing: "border-box",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.topArea}>
          <div>
            <h1 style={styles.title}>전체 요청 목록</h1>
            <div style={styles.subTitle}>
              등록된 유지보수 요청을 카드로 빠르게 확인해요.
            </div>
          </div>

          <div style={styles.actionRow}>
            <HoverButton
              onClick={() => navigate("/requests/new")}
              baseStyle={styles.topButton}
              hoverStyle={{
                background: BRAND_HOVER,
                boxShadow: "0 12px 24px rgba(31, 111, 214, 0.22)",
              }}
            >
              요청 등록
            </HoverButton>

            {isWorker && (
              <HoverButton
                onClick={() => navigate("/requests/assigned")}
                baseStyle={styles.whiteTopButton}
                hoverStyle={{ color: BRAND }}
              >
                내가 맡은 작업
              </HoverButton>
            )}
          </div>
        </div>

        <div style={styles.summaryBar}>
          <div style={styles.summaryItem}>
            <div style={styles.summaryLabel}>전체 요청</div>
            <div style={styles.summaryValue}>{summary.total}개</div>
          </div>

          <div style={styles.summaryItem}>
            <div style={styles.summaryLabel}>요청 등록</div>
            <div style={styles.summaryValue}>{summary.pending}개</div>
          </div>

          <div style={styles.summaryItem}>
            <div style={styles.summaryLabel}>상담 진행</div>
            <div style={styles.summaryValue}>{summary.active}개</div>
          </div>

          <div style={styles.summaryItem}>
            <div style={styles.summaryLabel}>거래 완료</div>
            <div style={styles.summaryValue}>{summary.completed}개</div>
          </div>
        </div>

        <div style={styles.filterBox}>
          <div style={styles.filterGrid}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="제목, 내용, 카테고리로 검색"
              style={styles.input}
            />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={styles.select}
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.tabRow}>
            {FILTER_OPTIONS.map((option) => {
              const isActive = selectedFilter === option.key;

              return (
                <HoverButton
                  key={option.key}
                  onClick={() => setSelectedFilter(option.key)}
                  baseStyle={{
                    ...styles.tabButton,
                    ...(isActive ? styles.activeTabButton : {}),
                  }}
                  hoverStyle={
                    isActive ? { background: BRAND_HOVER } : { color: BRAND }
                  }
                >
                  {option.label}
                </HoverButton>
              );
            })}
          </div>
        </div>

        <p style={styles.countText}>
          총 {filteredRequests.length}개의 요청이 보여요.
        </p>

        {message && <div style={styles.message}>{message}</div>}

        <div style={styles.grid}>
          {loading && (
            <div style={styles.emptyCard}>전체 요청을 불러오는 중입니다...</div>
          )}

          {!loading && !message && filteredRequests.length === 0 && (
            <div style={styles.emptyCard}>
              조건에 맞는 요청이 없어요.
              <br />
              다른 검색어나 필터를 선택해보세요.
            </div>
          )}

          {!loading &&
            !message &&
            filteredRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onOpen={handleOpenDetail}
                styles={styles}
                isMobile={isMobile}
              />
            ))}
        </div>
      </div>
    </div>
  );
}