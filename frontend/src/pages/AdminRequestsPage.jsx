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
const DANGER_HOVER = "#DC2626";

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

  if (status === "quoted" || status === "견적 협의중") return "quoted";
  if (status === "planned" || status === "작업 예정") return "planned";

  if (
    status === "in_progress" ||
    status === "작업중" ||
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
    status === "취소" ||
    status === "취소됨" ||
    status === "요청 취소"
  ) {
    return "cancelled";
  }

  return "pending";
}

function getStatusText(status) {
  const normalized = normalizeStatus(status);

  if (normalized === "pending") return "요청 등록";
  if (normalized === "assigned") return "담당자 배정";
  if (normalized === "quoted") return "견적 협의중";
  if (normalized === "planned") return "작업 예정";
  if (normalized === "in_progress") return "작업 진행중";
  if (normalized === "completed") return "완료";
  if (normalized === "cancelled") return "취소됨";

  return "요청 등록";
}

function getStatusStyle(status) {
  const normalized = normalizeStatus(status);

  if (normalized === "pending") {
    return {
      backgroundColor: "#F1F5F9",
      color: "#475569",
      borderColor: "#E2E8F0",
    };
  }

  if (normalized === "assigned") {
    return {
      backgroundColor: "#EFF6FF",
      color: "#2563EB",
      borderColor: "#BFDBFE",
    };
  }

  if (normalized === "quoted") {
    return {
      backgroundColor: "#FFF7ED",
      color: "#C2410C",
      borderColor: "#FED7AA",
    };
  }

  if (normalized === "planned") {
    return {
      backgroundColor: "#EEF2FF",
      color: "#4F46E5",
      borderColor: "#C7D2FE",
    };
  }

  if (normalized === "in_progress") {
    return {
      backgroundColor: "#ECFDF3",
      color: "#15803D",
      borderColor: "#BBF7D0",
    };
  }

  if (normalized === "completed") {
    return {
      backgroundColor: "#DCFCE7",
      color: "#166534",
      borderColor: "#86EFAC",
    };
  }

  if (normalized === "cancelled") {
    return {
      backgroundColor: "#F8FAFC",
      color: "#64748B",
      borderColor: "#E2E8F0",
    };
  }

  return {
    backgroundColor: "#F1F5F9",
    color: "#334155",
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

function parsePreviewText(content) {
  if (!content) return "요청 내용이 없습니다.";

  const cleaned = String(content)
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned.length > 120 ? `${cleaned.slice(0, 120)}...` : cleaned;
}

function parseContent(content) {
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

  return {
    placeType: getValue("공간 유형:"),
    issueType: getValue("도움이 필요한 내용:"),
    schedule: getValue("희망 일정:"),
  };
}

function getWorkerDisplayName(worker) {
  if (!worker) return "";
  return worker.name || worker.username || "이름 없는 전문가";
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

function HoverCard({ children, onClick, baseStyle, hoverStyle = {} }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onClick={onClick}
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

export default function AdminRequestsPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [requests, setRequests] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [savingRequestId, setSavingRequestId] = useState(null);
  const [windowWidth, setWindowWidth] = useState(getWindowWidth);
  const [message, setMessage] = useState("");

  const isTablet = windowWidth <= 1080;
  const isMobile = windowWidth <= 900;
  const isSmallMobile = windowWidth <= 480;

  const statusOptions = [
    { value: "pending", label: "요청 등록" },
    { value: "assigned", label: "담당자 배정" },
    { value: "quoted", label: "견적 협의중" },
    { value: "planned", label: "작업 예정" },
    { value: "in_progress", label: "작업 진행중" },
    { value: "completed", label: "완료" },
    { value: "cancelled", label: "취소됨" },
  ];

  const defaultCategoryOptions = [
    "전기/조명",
    "설비/배관",
    "누수/방수",
    "도어락/출입문",
    "에어컨/환기",
    "CCTV/네트워크",
    "유리/창호",
    "가전/생활수리",
    "청소/철거",
    "기타 유지보수",
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowWidth());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadAdminRequests = async () => {
    try {
      setLoading(true);
      setMessage("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user?.id) {
        navigate("/login", { replace: true });
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      if (profile?.role !== "admin") {
        setIsAdmin(false);
        return;
      }

      setIsAdmin(true);

      const [
        { data: requestData, error: requestError },
        { data: workerData, error: workerError },
      ] = await Promise.all([
        supabase
          .from("requests")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("profiles")
          .select("id, username, name, role")
          .eq("role", "worker")
          .order("name", { ascending: true }),
      ]);

      if (requestError) throw requestError;

      if (workerError) {
        console.error("전문가 목록 조회 실패:", workerError);
      }

      const safeWorkers = Array.isArray(workerData) ? workerData : [];
      const safeRequests = Array.isArray(requestData) ? requestData : [];

      setWorkers(safeWorkers);

      setRequests(
        safeRequests.map((request) => ({
          ...request,
          normalizedStatus: normalizeStatus(request.status),
          selectedAssignedUserId:
            request.assigned_user_id || request.assigned_to || "",
          selectedAssignedUsername:
            request.assigned_username || request.assigned_name || "",
        })),
      );
    } catch (error) {
      console.error("관리자 요청 페이지 로딩 실패:", error);
      setMessage(error.message || "관리자 요청 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminRequests();
  }, []);

  const summary = useMemo(() => {
    const normalized = requests.map((request) =>
      normalizeStatus(request.normalizedStatus || request.status),
    );

    return {
      total: requests.length,
      pending: normalized.filter((status) => status === "pending").length,
      active: normalized.filter((status) =>
        ["assigned", "quoted", "planned", "in_progress"].includes(status),
      ).length,
      completed: normalized.filter((status) => status === "completed").length,
    };
  }, [requests]);

  const categoryOptions = useMemo(() => {
    const requestCategories = requests
      .map((request) => request.category)
      .filter(Boolean)
      .map((category) => String(category).trim());

    const merged = Array.from(
      new Set([...defaultCategoryOptions, ...requestCategories]),
    );

    return ["all", ...merged];
  }, [requests]);

  const filteredRequests = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return requests.filter((request) => {
      const normalized = normalizeStatus(
        request.normalizedStatus || request.status,
      );

      const matchesStatus =
        statusFilter === "all" || normalized === statusFilter;

      const matchesCategory =
        categoryFilter === "all" || request.category === categoryFilter;

      const parsed = parseContent(request.content);

      const searchTarget = [
        request.title,
        request.content,
        request.category,
        request.location,
        parsed.placeType,
        parsed.issueType,
        parsed.schedule,
        request.assigned_username,
        request.assigned_name,
        request.selectedAssignedUsername,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesKeyword = keyword === "" || searchTarget.includes(keyword);

      return matchesStatus && matchesCategory && matchesKeyword;
    });
  }, [requests, statusFilter, categoryFilter, searchKeyword]);

  const handleStatusChange = (requestId, nextStatus) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId
          ? {
              ...request,
              normalizedStatus: nextStatus,
            }
          : request,
      ),
    );
  };

  const handleWorkerChange = (requestId, workerId) => {
    const selectedWorker = workers.find((worker) => worker.id === workerId);

    setRequests((prev) =>
      prev.map((request) => {
        if (request.id !== requestId) return request;

        const hasWorker = Boolean(workerId);
        const currentStatus = normalizeStatus(
          request.normalizedStatus || request.status,
        );

        let nextStatus = currentStatus;

        if (hasWorker && currentStatus === "pending") {
          nextStatus = "assigned";
        }

        if (
          !hasWorker &&
          ["assigned", "quoted", "planned", "in_progress"].includes(
            currentStatus,
          )
        ) {
          nextStatus = "pending";
        }

        return {
          ...request,
          selectedAssignedUserId: workerId,
          selectedAssignedUsername: selectedWorker
            ? getWorkerDisplayName(selectedWorker)
            : "",
          normalizedStatus: nextStatus,
        };
      }),
    );
  };

  const handleSaveRequest = async (requestId) => {
    const targetRequest = requests.find((request) => request.id === requestId);
    if (!targetRequest) return;

    try {
      setSavingRequestId(requestId);

      const hasWorker = Boolean(targetRequest.selectedAssignedUserId);
      const currentStatus = normalizeStatus(targetRequest.normalizedStatus);

      let nextStatus = currentStatus;

      if (hasWorker && nextStatus === "pending") {
        nextStatus = "assigned";
      }

      if (
        !hasWorker &&
        ["assigned", "quoted", "planned", "in_progress"].includes(nextStatus)
      ) {
        nextStatus = "pending";
      }

      const payload = {
        status: nextStatus,
        assigned_user_id: targetRequest.selectedAssignedUserId || null,
        assigned_username: targetRequest.selectedAssignedUsername || null,
      };

      const { data, error } = await supabase
        .from("requests")
        .update(payload)
        .eq("id", requestId)
        .select()
        .single();

      if (error) throw error;

      setRequests((prev) =>
        prev.map((request) =>
          request.id === requestId
            ? {
                ...request,
                ...data,
                normalizedStatus: normalizeStatus(data.status),
                selectedAssignedUserId: data.assigned_user_id || "",
                selectedAssignedUsername: data.assigned_username || "",
              }
            : request,
        ),
      );

      alert("변경사항이 저장됐어요.");
    } catch (error) {
      console.error("요청 저장 실패:", error);
      alert(error.message || "저장 중 문제가 생겼어요.");
    } finally {
      setSavingRequestId(null);
    }
  };

  const handleOpenDetail = (request) => {
    navigate(`/requests/${request.id}`, {
      state: {
        request,
        from: "/admin/requests",
      },
    });
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
      gridTemplateColumns: isTablet ? "1fr" : "minmax(0, 1fr) 310px",
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
      gridTemplateColumns: isSmallMobile
        ? "1fr"
        : isMobile
          ? "repeat(2, minmax(0, 1fr))"
          : "repeat(4, minmax(0, 1fr))",
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
      gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) 180px 210px",
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
    requestCard: {
      background: "#FFFFFF",
      border: "1px solid #E6EDF5",
      borderRadius: "20px",
      padding: isMobile ? "16px" : "18px",
      transition:
        "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease",
      boxShadow: "0 8px 22px rgba(15, 23, 42, 0.035)",
      boxSizing: "border-box",
    },
    requestLayout: {
      display: "grid",
      gridTemplateColumns: isTablet ? "1fr" : "minmax(0, 1fr) 280px",
      gap: "14px",
      alignItems: "start",
    },
    requestInfoArea: {
      minWidth: 0,
      cursor: "pointer",
    },
    requestTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "center",
      flexDirection: isMobile ? "column" : "row",
      gap: "10px",
      marginBottom: "12px",
    },
    requestTitle: {
      margin: 0,
      fontSize: isMobile ? "18px" : "19px",
      fontWeight: 850,
      color: TEXT,
      lineHeight: 1.45,
      letterSpacing: "-0.3px",
      wordBreak: "break-word",
    },
    requestSub: {
      marginTop: "6px",
      fontSize: "13px",
      color: SUB,
      fontWeight: 550,
    },
    statusPill: {
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
    previewBox: {
      background: "#FBFDFF",
      border: `1px solid ${BORDER}`,
      borderRadius: "15px",
      padding: "14px",
      boxSizing: "border-box",
    },
    previewLabel: {
      fontSize: "12px",
      color: SUB,
      fontWeight: 750,
      marginBottom: "8px",
    },
    previewValue: {
      fontSize: "14px",
      color: TEXT,
      fontWeight: 500,
      lineHeight: 1.75,
      wordBreak: "break-word",
    },
    metaGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
      gap: "10px",
      marginTop: "12px",
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
    adminBox: {
      background: "#F8FBFF",
      border: `1px solid ${BORDER}`,
      borderRadius: "18px",
      padding: "14px",
      display: "grid",
      gap: "10px",
      boxSizing: "border-box",
    },
    adminLabel: {
      fontSize: "12px",
      color: SUB,
      fontWeight: 800,
    },
    assignedPreview: {
      fontSize: "13px",
      color: TEXT,
      background: "#FFFFFF",
      border: `1px solid ${BORDER}`,
      borderRadius: "13px",
      padding: "11px 12px",
      lineHeight: 1.55,
      fontWeight: 650,
      wordBreak: "break-word",
    },
    saveBtn: {
      width: "100%",
      minHeight: "46px",
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
      position: isTablet ? "static" : "sticky",
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
    dangerBtn: {
      width: "100%",
      minHeight: "48px",
      border: "1px solid transparent",
      borderRadius: "14px",
      background: DANGER,
      color: "#FFFFFF",
      fontSize: "14px",
      fontWeight: 800,
      cursor: "pointer",
      outline: "none",
      outlineOffset: 0,
      boxShadow: "0 10px 20px rgba(239, 68, 68, 0.16)",
      transition:
        "background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease",
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
    errorMessage: {
      padding: "12px 14px",
      borderRadius: "14px",
      fontSize: "13px",
      fontWeight: 650,
      lineHeight: 1.6,
      border: "1px solid #FFD8D8",
      background: "#FFF5F5",
      color: "#DC2626",
      wordBreak: "keep-all",
      marginBottom: "14px",
    },
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.loadingWrap}>
            관리자 요청 목록을 불러오는 중입니다...
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
        <h1 style={styles.pageTitle}>전체 요청 관리</h1>

        <div style={styles.shell}>
          <div style={styles.mainCard}>
            <div style={styles.heroCard}>
              <div style={styles.eyebrow}>관리자 요청 관리</div>

              <h2 style={styles.heroTitle}>
                전체 요청 상태와 담당자를 관리해요
              </h2>

              <div style={styles.heroSub}>
                등록된 요청을 확인하고, 담당 전문가 배정과 진행 상태 변경을
                한 화면에서 처리할 수 있어요.
              </div>

              <div style={styles.statGrid}>
                <StatCard
                  label="전체 요청"
                  value={`${summary.total}개`}
                  sub="현재 등록된 전체 요청"
                  styles={styles}
                />

                <StatCard
                  label="요청 등록"
                  value={`${summary.pending}개`}
                  sub="아직 담당자 배정 전"
                  styles={styles}
                />

                <StatCard
                  label="진행 관련"
                  value={`${summary.active}개`}
                  sub="배정부터 진행중까지"
                  styles={styles}
                />

                <StatCard
                  label="완료"
                  value={`${summary.completed}개`}
                  sub="작업이 완료된 요청"
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
                  placeholder="제목, 내용, 카테고리, 담당자 검색"
                  style={styles.input}
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={styles.select}
                >
                  <option value="all">전체 상태</option>
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={styles.select}
                >
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "전체 카테고리" : category}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.countText}>
                총 <strong>{filteredRequests.length}</strong>개의 요청이 보이고,
                등록된 전문가 계정은 <strong>{workers.length}</strong>명입니다.
              </div>
            </div>

            {message && <div style={styles.errorMessage}>{message}</div>}

            <div style={styles.listWrap}>
              {filteredRequests.length === 0 ? (
                <div style={styles.emptyCard}>조건에 맞는 요청이 없어요.</div>
              ) : (
                filteredRequests.map((request) => {
                  const selectedStatus = normalizeStatus(
                    request.normalizedStatus || request.status,
                  );
                  const parsed = parseContent(request.content);
                  const isSaving = savingRequestId === request.id;

                  return (
                    <HoverCard
                      key={request.id}
                      baseStyle={styles.requestCard}
                      hoverStyle={{
                        transform: isMobile ? "none" : "translateY(-3px)",
                        boxShadow: "0 16px 34px rgba(15, 23, 42, 0.08)",
                        borderColor: "#D7E6FB",
                      }}
                    >
                      <div style={styles.requestLayout}>
                        <div
                          style={styles.requestInfoArea}
                          onClick={() => handleOpenDetail(request)}
                        >
                          <div style={styles.requestTop}>
                            <div>
                              <h3 style={styles.requestTitle}>
                                {request.title || "요청 제목 없음"}
                              </h3>

                              <div style={styles.requestSub}>
                                요청 번호 #{request.id}
                              </div>
                            </div>

                            <span
                              style={{
                                ...styles.statusPill,
                                ...getStatusStyle(selectedStatus),
                              }}
                            >
                              {getStatusText(selectedStatus)}
                            </span>
                          </div>

                          <div style={styles.previewBox}>
                            <div style={styles.previewLabel}>요청 내용</div>
                            <div style={styles.previewValue}>
                              {parsePreviewText(request.content)}
                            </div>
                          </div>

                          <div style={styles.metaGrid}>
                            <div style={styles.metaBox}>
                              <div style={styles.metaLabel}>카테고리</div>
                              <div style={styles.metaValue}>
                                {request.category || "미분류"}
                              </div>
                            </div>

                            <div style={styles.metaBox}>
                              <div style={styles.metaLabel}>공간 유형</div>
                              <div style={styles.metaValue}>
                                {request.location || parsed.placeType}
                              </div>
                            </div>

                            <div style={styles.metaBox}>
                              <div style={styles.metaLabel}>등록일</div>
                              <div style={styles.metaValue}>
                                {formatDate(request.created_at)}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          style={styles.adminBox}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <label style={styles.adminLabel}>담당자 배정</label>
                          <select
                            value={request.selectedAssignedUserId || ""}
                            onChange={(e) =>
                              handleWorkerChange(request.id, e.target.value)
                            }
                            style={styles.select}
                            disabled={isSaving}
                          >
                            <option value="">담당자 선택 안 함</option>
                            {workers.map((worker) => (
                              <option key={worker.id} value={worker.id}>
                                {getWorkerDisplayName(worker)}
                              </option>
                            ))}
                          </select>

                          <div style={styles.assignedPreview}>
                            현재 담당자:{" "}
                            {request.selectedAssignedUsername || "미배정"}
                          </div>

                          <label style={styles.adminLabel}>상태 변경</label>
                          <select
                            value={selectedStatus}
                            onChange={(e) =>
                              handleStatusChange(request.id, e.target.value)
                            }
                            style={styles.select}
                            disabled={isSaving}
                          >
                            {statusOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>

                          <HoverButton
                            onClick={() => handleSaveRequest(request.id)}
                            disabled={isSaving}
                            baseStyle={styles.saveBtn}
                            hoverStyle={{
                              background: BRAND_HOVER,
                              boxShadow:
                                "0 14px 24px rgba(31, 111, 214, 0.22)",
                            }}
                          >
                            {isSaving ? "저장 중..." : "변경사항 저장"}
                          </HoverButton>
                        </div>
                      </div>
                    </HoverCard>
                  );
                })
              )}
            </div>
          </div>

          <div style={styles.sideCard}>
            <div style={styles.sideBadge}>관리자 메뉴</div>

            <h3 style={styles.sideTitle}>요청 관리 요약</h3>

            <p style={styles.sideDesc}>
              요청 상태와 담당자를 관리하고, 관리자 메인 화면으로 이동할 수
              있어요.
            </p>

            <div style={{ display: "grid", gap: "10px" }}>
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

            <div style={styles.miniInfo}>
              <div style={styles.miniItem}>
                <div style={styles.miniLabel}>전체 요청 수</div>
                <div style={styles.miniValue}>{summary.total}건</div>
              </div>

              <div style={styles.miniItem}>
                <div style={styles.miniLabel}>전문가 계정</div>
                <div style={styles.miniValue}>{workers.length}명</div>
              </div>

              <div style={styles.miniItem}>
                <div style={styles.miniLabel}>진행 관련 요청</div>
                <div style={styles.miniValue}>{summary.active}건</div>
              </div>

              <div style={styles.miniItem}>
                <div style={styles.miniLabel}>완료 요청</div>
                <div style={styles.miniValue}>{summary.completed}건</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
