import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
const GRAY = "#94A3B8";
const GRAY_HOVER = "#64748B";

const STATUS_STEPS = [
  { key: "pending", title: "요청 등록", desc: "요청이 등록됐어요." },
  { key: "assigned", title: "담당자 배정", desc: "전문가가 확인 중이에요." },
  { key: "in_progress", title: "작업 진행", desc: "작업이 진행 중이에요." },
  { key: "completed", title: "완료", desc: "요청이 완료됐어요." },
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

  if (status === "quoted" || status === "견적 협의중") return "quoted";
  if (status === "planned" || status === "작업 예정") return "planned";

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
  if (normalized === "completed") return "완료";
  if (normalized === "cancelled") return "취소됨";

  return status || "상태 없음";
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

function getStepIndex(status) {
  const normalized = normalizeStatus(status);

  if (normalized === "pending") return 0;
  if (["assigned", "quoted", "planned"].includes(normalized)) return 1;
  if (normalized === "in_progress") return 2;
  if (normalized === "completed") return 3;
  if (normalized === "cancelled") return -1;

  return 0;
}

function getStatusGuide(status) {
  const normalized = normalizeStatus(status);

  if (normalized === "pending") {
    return "아직 담당자가 정해지지 않았어요. 전문가가 요청을 수락하면 다음 단계로 넘어갑니다.";
  }

  if (normalized === "assigned") {
    return "담당자가 정해졌어요. 작업 일정이 잡히면 작업 예정 단계로 볼 수 있어요.";
  }

  if (normalized === "quoted") {
    return "전문가가 요청을 확인했어요. 작업 전 세부 내용을 조율하는 단계예요.";
  }

  if (normalized === "planned") {
    return "작업 예정 상태예요. 전문가가 작업을 시작하면 진행중으로 변경됩니다.";
  }

  if (normalized === "in_progress") {
    return "작업이 진행 중이에요. 완료되면 전문가가 완료 처리할 수 있어요.";
  }

  if (normalized === "completed") {
    return "요청이 완료됐어요. 더 이상 상태를 변경하지 않는 단계예요.";
  }

  if (normalized === "cancelled") {
    return "취소된 요청이에요. 필요한 경우 새 요청을 다시 등록해주세요.";
  }

  return "요청 상태를 확인하는 중이에요.";
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

function InfoBox({ label, value, styles }) {
  return (
    <div style={styles.infoBox}>
      <div style={styles.infoLabel}>{label}</div>
      <div style={styles.infoValue}>{value}</div>
    </div>
  );
}

function LongBox({ label, value, styles }) {
  return (
    <div style={styles.longBox}>
      <div style={styles.longLabel}>{label}</div>
      <div style={styles.longValue}>{value}</div>
    </div>
  );
}

export default function RequestDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [detail, setDetail] = useState(location.state?.request || null);
  const [loading, setLoading] = useState(!location.state?.request);
  const [message, setMessage] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [loginUser, setLoginUser] = useState(null);
  const [loginProfile, setLoginProfile] = useState(null);
  const [windowWidth, setWindowWidth] = useState(getWindowWidth);

  const fromPath = location.state?.from || "/requests/my";
  const isMobile = windowWidth <= 900;
  const isSmallMobile = windowWidth <= 480;

  const loadLoginUser = useCallback(async () => {
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
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      console.error("프로필 조회 실패:", error);
      setLoginProfile(null);
      return;
    }

    setLoginProfile(profile || null);
  }, []);

  const fetchDetail = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setMessage("");

      const { data, error } = await supabase
        .from("requests")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (error) throw error;

      setDetail(data);
    } catch (error) {
      console.error("상세 요청 조회 실패:", error);
      setMessage(error.message || "요청 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowWidth());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    loadLoginUser();
  }, [loadLoginUser]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const parsedContent = useMemo(() => parseContent(detail?.content), [detail]);

  const normalizedStatus = normalizeStatus(detail?.status);
  const currentStepIndex = getStepIndex(detail?.status);
  const userRole = loginProfile?.role || loginUser?.user_metadata?.role || null;
  const isWorker = userRole === "worker";

  const requestOwnerId = detail?.user_id ? String(detail.user_id) : "";
  const loginUserId = loginUser?.id ? String(loginUser.id) : "";
  const assignedUserId = detail?.assigned_user_id
    ? String(detail.assigned_user_id)
    : "";

  const isWriter = !!(
    requestOwnerId &&
    loginUserId &&
    requestOwnerId === loginUserId
  );

  const isAssignedWorker = !!(
    loginUserId &&
    assignedUserId &&
    assignedUserId === loginUserId
  );

  const writerText =
    isWriter
      ? "나"
      : detail?.writer_name ||
        detail?.writer_nickname ||
        detail?.writer_email ||
        "작성자 정보 없음";

  const assignedText =
    !assignedUserId
      ? "아직 없음"
      : assignedUserId === loginUserId
        ? "나"
        : detail?.assigned_username || "배정됨";

  const canEdit =
    isWriter && !["completed", "cancelled"].includes(normalizedStatus);

  const canCancel =
    isWriter && !["completed", "cancelled"].includes(normalizedStatus);

  const canDelete =
    isWriter &&
    ["pending", "assigned", "quoted", "planned", "cancelled"].includes(
      normalizedStatus,
    );

  const canAccept = !!(
    loginUserId &&
    detail &&
    isWorker &&
    !isWriter &&
    normalizedStatus === "pending" &&
    !assignedUserId
  );

  const canSetPlanned = !!(
    isAssignedWorker && ["assigned", "quoted"].includes(normalizedStatus)
  );

  const canStartWork = !!(
    isAssignedWorker && normalizedStatus === "planned"
  );

  const canComplete = !!(
    isAssignedWorker && normalizedStatus === "in_progress"
  );

  const hasQuickActions =
    canEdit ||
    canCancel ||
    canDelete ||
    canAccept ||
    canSetPlanned ||
    canStartWork ||
    canComplete;

  const updateRequest = async (updateData, successMessage) => {
    if (!detail) return;

    try {
      setActionLoading(true);
      setMessage("");

      const { data, error } = await supabase
        .from("requests")
        .update(updateData)
        .eq("id", detail.id)
        .select()
        .single();

      if (error) throw error;

      setDetail(data);
      setMessage(successMessage);
    } catch (error) {
      console.error("요청 변경 실패:", error);
      setMessage(error.message || "요청 변경 중 오류가 발생했습니다.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleAccept = async () => {
    if (!loginUser?.id || !canAccept) return;

    await updateRequest(
      {
        status: "quoted",
        assigned_user_id: loginUser.id,
        assigned_username:
          loginProfile?.name ||
          loginProfile?.username ||
          loginUser.user_metadata?.name ||
          loginUser.user_metadata?.full_name ||
          loginUser.email ||
          "전문가",
      },
      "요청을 수락했습니다.",
    );
  };

  const handleSetPlanned = async () => {
    if (!canSetPlanned) return;
    await updateRequest({ status: "planned" }, "작업 예정 상태로 변경됐어요.");
  };

  const handleStartWork = async () => {
    if (!canStartWork) return;
    await updateRequest({ status: "in_progress" }, "작업을 시작했습니다.");
  };

  const handleComplete = async () => {
    if (!canComplete) return;
    await updateRequest({ status: "completed" }, "작업을 완료 처리했습니다.");
  };

  const handleCancel = async () => {
    if (!detail || !canCancel) return;

    const confirmed = window.confirm("이 요청을 취소할까요?");
    if (!confirmed) return;

    await updateRequest({ status: "cancelled" }, "요청이 취소되었습니다.");
  };

  const handleEdit = () => {
    if (!detail || !canEdit) return;

    navigate(`/requests/edit/${detail.id}`, {
      state: { request: detail },
    });
  };

  const handleDelete = async () => {
    if (!detail || !canDelete) return;

    const confirmed = window.confirm("이 요청을 삭제할까요?");
    if (!confirmed) return;

    try {
      setActionLoading(true);
      setMessage("");

      const { error } = await supabase
        .from("requests")
        .delete()
        .eq("id", detail.id)
        .eq("user_id", loginUserId);

      if (error) throw error;

      navigate(fromPath, { state: { refresh: true } });
    } catch (error) {
      console.error("요청 삭제 실패:", error);
      setMessage(error.message || "요청 삭제 중 오류가 발생했습니다.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleBack = () => {
    navigate(fromPath, { state: { refresh: true } });
  };

  const styles = {
    page: {
      minHeight: "100dvh",
      background: BG,
      padding: isMobile ? "88px 16px 36px" : "104px 42px 56px",
      boxSizing: "border-box",
      fontFamily:
        '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    container: {
      maxWidth: "1120px",
      margin: "0 auto",
    },
    pageTitle: {
      margin: "0 0 18px",
      fontSize: isMobile ? "25px" : "30px",
      fontWeight: 900,
      color: TEXT,
      letterSpacing: "-0.7px",
      lineHeight: 1.25,
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
      boxShadow: "0 14px 34px rgba(47, 128, 237, 0.08)",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    heroCard: {
      background: "linear-gradient(180deg, #F8FBFF 0%, #FFFFFF 100%)",
      border: `1px solid ${BORDER}`,
      borderRadius: isMobile ? "18px" : "20px",
      padding: isMobile ? "16px" : "20px",
      marginBottom: "14px",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    heroTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "center",
      flexDirection: isMobile ? "column" : "row",
      gap: "10px",
      marginBottom: "14px",
    },
    heroTitle: {
      margin: 0,
      fontSize: isMobile ? "21px" : "24px",
      fontWeight: 900,
      color: TEXT,
      lineHeight: 1.4,
      letterSpacing: "-0.45px",
      wordBreak: "keep-all",
    },
    statusBadge: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "8px 12px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: 850,
      whiteSpace: "nowrap",
      border: "1px solid transparent",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    infoGridTop: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
      gap: "10px",
    },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
      gap: "10px",
    },
    infoBox: {
      background: "#FFFFFF",
      border: `1px solid ${BORDER}`,
      borderRadius: "16px",
      padding: "14px 15px",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    infoLabel: {
      fontSize: "12px",
      fontWeight: 800,
      color: SUB,
      marginBottom: "7px",
    },
    infoValue: {
      fontSize: "15px",
      fontWeight: 800,
      color: TEXT,
      lineHeight: 1.5,
      wordBreak: "break-word",
    },
    flowCard: {
      background: "#FFFFFF",
      border: `1px solid ${BORDER}`,
      borderRadius: isMobile ? "18px" : "20px",
      padding: isMobile ? "16px" : "18px",
      marginBottom: "18px",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    flowTop: {
      display: "flex",
      alignItems: isMobile ? "flex-start" : "center",
      justifyContent: "space-between",
      flexDirection: isMobile ? "column" : "row",
      gap: "8px",
      marginBottom: "14px",
    },
    flowTitle: {
      margin: 0,
      fontSize: isMobile ? "16px" : "17px",
      fontWeight: 900,
      color: TEXT,
      letterSpacing: "-0.25px",
    },
    flowGuide: {
      margin: 0,
      fontSize: "13px",
      color: SUB,
      lineHeight: 1.6,
      wordBreak: "keep-all",
    },
    flowSteps: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(4, minmax(0, 1fr))",
      gap: "10px",
    },
    flowStep: (isDone, isActive, isCancelled) => ({
      border: `1px solid ${
        isCancelled
          ? "#E2E8F0"
          : isActive || isDone
            ? "#BFDBFE"
            : "#E2E8F0"
      }`,
      background: isCancelled
        ? "#F8FAFC"
        : isActive
          ? "#EFF6FF"
          : isDone
            ? "#F8FBFF"
            : "#FFFFFF",
      borderRadius: "16px",
      padding: "13px 14px",
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    }),
    flowNumber: (isDone, isActive, isCancelled) => ({
      width: "26px",
      height: "26px",
      borderRadius: "999px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      background: isCancelled
        ? "#E2E8F0"
        : isDone || isActive
          ? BRAND
          : "#E2E8F0",
      color: isDone || isActive ? "#FFFFFF" : "#64748B",
      fontSize: "12px",
      fontWeight: 900,
    }),
    flowStepTitle: {
      margin: "1px 0 5px",
      fontSize: "13px",
      fontWeight: 900,
      color: TEXT,
      lineHeight: 1.35,
    },
    flowStepDesc: {
      margin: 0,
      fontSize: "12px",
      color: SUB,
      lineHeight: 1.45,
      wordBreak: "keep-all",
    },
    section: {
      marginTop: "18px",
    },
    sectionTitle: {
      margin: "0 0 12px",
      fontSize: isMobile ? "17px" : "18px",
      fontWeight: 900,
      color: TEXT,
      letterSpacing: "-0.25px",
    },
    longBox: {
      background: "#FFFFFF",
      border: `1px solid ${BORDER}`,
      borderRadius: "16px",
      padding: "15px",
      marginBottom: "12px",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    longLabel: {
      fontSize: "14px",
      color: TEXT,
      fontWeight: 900,
      marginBottom: "10px",
    },
    longValue: {
      minHeight: "72px",
      background: SOFT,
      border: `1px solid ${BORDER}`,
      borderRadius: "13px",
      padding: "14px 15px",
      color: TEXT,
      fontSize: "14px",
      lineHeight: 1.7,
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    sideCard: {
      background: CARD,
      border: `1px solid ${BORDER}`,
      borderRadius: isMobile ? "20px" : "24px",
      padding: isMobile ? "16px" : "18px",
      boxShadow: "0 14px 34px rgba(47, 128, 237, 0.08)",
      position: isMobile ? "static" : "sticky",
      top: "96px",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    sideTitle: {
      margin: 0,
      fontSize: "18px",
      fontWeight: 900,
      color: TEXT,
      letterSpacing: "-0.25px",
    },
    sideDesc: {
      margin: "8px 0 16px",
      fontSize: "13px",
      lineHeight: 1.65,
      color: SUB,
      fontWeight: 600,
      wordBreak: "keep-all",
    },
    primaryBtn: {
      width: "100%",
      minHeight: isMobile ? "48px" : "50px",
      border: "1px solid transparent",
      borderRadius: "14px",
      background: BRAND,
      color: "#FFFFFF",
      fontSize: "15px",
      fontWeight: 850,
      cursor: "pointer",
      outline: "none",
      outlineOffset: 0,
      boxShadow: "0 10px 22px rgba(47, 128, 237, 0.18)",
      transition: "background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease",
      boxSizing: "border-box",
    },
    dangerBtn: {
      width: "100%",
      minHeight: isMobile ? "48px" : "50px",
      border: "1px solid transparent",
      borderRadius: "14px",
      background: DANGER,
      color: "#FFFFFF",
      fontSize: "15px",
      fontWeight: 850,
      cursor: "pointer",
      outline: "none",
      outlineOffset: 0,
      boxShadow: "0 10px 22px rgba(239, 68, 68, 0.16)",
      transition: "background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease",
      boxSizing: "border-box",
    },
    grayBtn: {
      width: "100%",
      minHeight: isMobile ? "48px" : "50px",
      border: "1px solid transparent",
      borderRadius: "14px",
      background: GRAY,
      color: "#FFFFFF",
      fontSize: "15px",
      fontWeight: 850,
      cursor: "pointer",
      outline: "none",
      outlineOffset: 0,
      boxShadow: "0 10px 22px rgba(100, 116, 139, 0.14)",
      transition: "background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease",
      boxSizing: "border-box",
    },
    secondaryBtn: {
      width: "100%",
      minHeight: isMobile ? "48px" : "50px",
      border: `1px solid ${BORDER}`,
      borderRadius: "14px",
      background: "#FFFFFF",
      color: TEXT,
      fontSize: "14px",
      fontWeight: 850,
      cursor: "pointer",
      outline: "none",
      outlineOffset: 0,
      boxShadow: "none",
      transition: "background-color 0.18s ease, color 0.18s ease",
      boxSizing: "border-box",
    },
    message: {
      marginTop: "14px",
      padding: "12px 14px",
      borderRadius: "12px",
      fontSize: "13px",
      fontWeight: 700,
      lineHeight: 1.6,
      border: "1px solid #D9E6FF",
      background: "#F8FBFF",
      color: BRAND_HOVER,
      wordBreak: "keep-all",
      boxSizing: "border-box",
    },
    emptyAction: {
      border: `1px solid ${BORDER}`,
      background: "#F8FAFC",
      color: SUB,
      borderRadius: "14px",
      padding: "14px",
      fontSize: "13px",
      lineHeight: 1.6,
      fontWeight: 700,
      wordBreak: "keep-all",
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    miniInfo: {
      marginTop: "16px",
      paddingTop: "16px",
      borderTop: `1px solid ${BORDER}`,
      display: "grid",
      gap: "10px",
    },
    miniItem: {
      background: "#F8FAFC",
      borderRadius: "14px",
      padding: "12px 14px",
      border: `1px solid ${BORDER}`,
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
    miniLabel: {
      fontSize: "12px",
      fontWeight: 800,
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
    bottomActions: {
      marginTop: "18px",
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
      gap: "10px",
    },
    loadingWrap: {
      maxWidth: "900px",
      margin: "40px auto",
      background: "#FFFFFF",
      border: `1px solid ${BORDER}`,
      borderRadius: "20px",
      padding: "30px",
      textAlign: "center",
      fontSize: "15px",
      fontWeight: 700,
      color: SUB,
      boxSizing: "border-box",
      outline: "none",
      outlineOffset: 0,
    },
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.loadingWrap}>요청 정보를 불러오는 중입니다...</div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div style={styles.page}>
        <div style={styles.loadingWrap}>
          요청 정보를 찾을 수 없습니다.
          <div style={{ marginTop: "16px" }}>
            <HoverButton
              onClick={() => navigate(fromPath)}
              baseStyle={{
                ...styles.primaryBtn,
                width: "220px",
                margin: "0 auto",
              }}
              hoverStyle={{
                background: BRAND_HOVER,
                boxShadow: "0 12px 24px rgba(31, 111, 214, 0.22)",
              }}
            >
              목록으로 돌아가기
            </HoverButton>
          </div>
        </div>
      </div>
    );
  }

  const statusStyle = getStatusStyle(detail.status);
  const isCancelled = normalizedStatus === "cancelled";

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.pageTitle}>요청 상세보기</h1>

        <div style={styles.shell}>
          <div style={styles.mainCard}>
            <div style={styles.heroCard}>
              <div style={styles.heroTop}>
                <h2 style={styles.heroTitle}>
                  {detail.title || "요청 제목 없음"}
                </h2>

                <span style={{ ...styles.statusBadge, ...statusStyle }}>
                  {getStatusText(detail.status)}
                </span>
              </div>

              <div style={styles.infoGridTop}>
                <InfoBox
                  label="카테고리"
                  value={detail.category || "-"}
                  styles={styles}
                />
                <InfoBox label="작성자" value={writerText} styles={styles} />
                <InfoBox
                  label="등록일"
                  value={formatDate(detail.created_at)}
                  styles={styles}
                />
              </div>
            </div>

            <div style={styles.flowCard}>
              <div style={styles.flowTop}>
                <h3 style={styles.flowTitle}>진행 상태</h3>
                <p style={styles.flowGuide}>{getStatusGuide(detail.status)}</p>
              </div>

              <div style={styles.flowSteps}>
                {STATUS_STEPS.map((step, index) => {
                  const isDone = currentStepIndex > index;
                  const isActive = currentStepIndex === index;

                  return (
                    <div
                      key={step.key}
                      style={styles.flowStep(isDone, isActive, isCancelled)}
                    >
                      <div
                        style={styles.flowNumber(isDone, isActive, isCancelled)}
                      >
                        {isDone ? "✓" : index + 1}
                      </div>

                      <div>
                        <p style={styles.flowStepTitle}>{step.title}</p>
                        <p style={styles.flowStepDesc}>{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>요청 정보</h3>

              <div style={styles.infoGrid}>
                <InfoBox label="담당자" value={assignedText} styles={styles} />
                <InfoBox label="요청 번호" value={`#${detail.id}`} styles={styles} />
                <InfoBox
                  label="공간 유형"
                  value={parsedContent.placeType}
                  styles={styles}
                />
                <InfoBox
                  label="희망 일정"
                  value={parsedContent.schedule}
                  styles={styles}
                />
              </div>
            </div>

            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>상세 내용</h3>

              <LongBox
                label="도움이 필요한 내용"
                value={parsedContent.issueType}
                styles={styles}
              />

              <LongBox
                label="상세 설명"
                value={parsedContent.detailText?.trim() || "내용이 없습니다."}
                styles={styles}
              />
            </div>

            {message && <div style={styles.message}>{message}</div>}

            <div style={styles.bottomActions}>
              <HoverButton
                onClick={handleBack}
                baseStyle={styles.secondaryBtn}
                hoverStyle={{
                  color: BRAND,
                }}
              >
                목록으로 돌아가기
              </HoverButton>

              <HoverButton
                onClick={() => navigate("/")}
                baseStyle={styles.primaryBtn}
                hoverStyle={{
                  background: BRAND_HOVER,
                  boxShadow: "0 12px 24px rgba(31, 111, 214, 0.22)",
                }}
              >
                메인으로 돌아가기
              </HoverButton>
            </div>
          </div>

          <div style={styles.sideCard}>
            <h3 style={styles.sideTitle}>빠른 작업</h3>

            <p style={styles.sideDesc}>
              요청 상태와 내 권한에 따라 여기서 바로 처리할 수 있어요.
            </p>

            <div style={{ display: "grid", gap: "10px" }}>
              {canEdit && (
                <HoverButton
                  onClick={handleEdit}
                  disabled={actionLoading}
                  baseStyle={styles.primaryBtn}
                  hoverStyle={{
                    background: BRAND_HOVER,
                    boxShadow: "0 12px 24px rgba(31, 111, 214, 0.22)",
                  }}
                >
                  수정하기
                </HoverButton>
              )}

              {canCancel && (
                <HoverButton
                  onClick={handleCancel}
                  disabled={actionLoading}
                  baseStyle={styles.grayBtn}
                  hoverStyle={{
                    background: GRAY_HOVER,
                    boxShadow: "0 12px 24px rgba(100, 116, 139, 0.18)",
                  }}
                >
                  {actionLoading ? "처리 중..." : "요청 취소하기"}
                </HoverButton>
              )}

              {canDelete && (
                <HoverButton
                  onClick={handleDelete}
                  disabled={actionLoading}
                  baseStyle={styles.dangerBtn}
                  hoverStyle={{
                    background: DANGER_HOVER,
                    boxShadow: "0 12px 24px rgba(220, 38, 38, 0.2)",
                  }}
                >
                  {actionLoading ? "삭제 중..." : "삭제하기"}
                </HoverButton>
              )}

              {canAccept && (
                <HoverButton
                  onClick={handleAccept}
                  disabled={actionLoading}
                  baseStyle={styles.primaryBtn}
                  hoverStyle={{
                    background: BRAND_HOVER,
                    boxShadow: "0 12px 24px rgba(31, 111, 214, 0.22)",
                  }}
                >
                  {actionLoading ? "처리 중..." : "요청 수락하기"}
                </HoverButton>
              )}

              {canSetPlanned && (
                <HoverButton
                  onClick={handleSetPlanned}
                  disabled={actionLoading}
                  baseStyle={styles.primaryBtn}
                  hoverStyle={{
                    background: BRAND_HOVER,
                    boxShadow: "0 12px 24px rgba(31, 111, 214, 0.22)",
                  }}
                >
                  {actionLoading ? "처리 중..." : "작업 예정으로 변경"}
                </HoverButton>
              )}

              {canStartWork && (
                <HoverButton
                  onClick={handleStartWork}
                  disabled={actionLoading}
                  baseStyle={styles.primaryBtn}
                  hoverStyle={{
                    background: BRAND_HOVER,
                    boxShadow: "0 12px 24px rgba(31, 111, 214, 0.22)",
                  }}
                >
                  {actionLoading ? "처리 중..." : "작업 시작하기"}
                </HoverButton>
              )}

              {canComplete && (
                <HoverButton
                  onClick={handleComplete}
                  disabled={actionLoading}
                  baseStyle={styles.primaryBtn}
                  hoverStyle={{
                    background: BRAND_HOVER,
                    boxShadow: "0 12px 24px rgba(31, 111, 214, 0.22)",
                  }}
                >
                  {actionLoading ? "처리 중..." : "완료 처리하기"}
                </HoverButton>
              )}

              {!hasQuickActions && (
                <div style={styles.emptyAction}>
                  지금 내 권한으로 바로 처리할 수 있는 작업은 없어요.
                </div>
              )}
            </div>

            <div style={styles.miniInfo}>
              <div style={styles.miniItem}>
                <div style={styles.miniLabel}>현재 상태</div>
                <div style={styles.miniValue}>
                  {getStatusText(detail.status)}
                </div>
              </div>

              <div style={styles.miniItem}>
                <div style={styles.miniLabel}>담당자</div>
                <div style={styles.miniValue}>{assignedText}</div>
              </div>

              <div style={styles.miniItem}>
                <div style={styles.miniLabel}>안내</div>
                <div style={styles.miniValue}>
                  작성자는 요청 수정/취소/삭제를 할 수 있고, 담당 전문가는 진행
                  상태를 변경할 수 있어요.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}