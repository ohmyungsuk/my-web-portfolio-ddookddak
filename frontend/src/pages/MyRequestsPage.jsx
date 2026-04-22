import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient.js";

function normalizeStatus(status) {
  if (status === "pending" || status === "요청 등록") return "pending";
  if (status === "quoted" || status === "견적 협의중") return "quoted";
  if (status === "planned" || status === "작업 예정") return "planned";
  if (status === "in_progress" || status === "진행중") return "in_progress";
  if (status === "completed" || status === "완료됨") return "completed";
  return "unknown";
}

function getStatusText(status) {
  const normalized = normalizeStatus(status);
  if (normalized === "pending") return "요청 등록";
  if (normalized === "quoted") return "견적 협의중";
  if (normalized === "planned") return "작업 예정";
  if (normalized === "in_progress") return "진행중";
  if (normalized === "completed") return "완료됨";
  return status || "상태 없음";
}

function getStatusStyle(status) {
  const normalized = normalizeStatus(status);

  if (normalized === "pending") {
    return { backgroundColor: "#eef2f7", color: "#475569" };
  }
  if (normalized === "quoted") {
    return { backgroundColor: "#fff4e5", color: "#c2410c" };
  }
  if (normalized === "planned") {
    return { backgroundColor: "#e8f0ff", color: "#1d4ed8" };
  }
  if (normalized === "in_progress") {
    return { backgroundColor: "#eaf8ef", color: "#15803d" };
  }
  if (normalized === "completed") {
    return { backgroundColor: "#dcfce7", color: "#166534" };
  }

  return { backgroundColor: "#f1f5f9", color: "#334155" };
}

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

function parseDescription(description) {
  const raw = description || "";
  const lines = raw.split("\n");

  const placeType =
    lines.find((line) => line.startsWith("공간 유형:"))?.replace("공간 유형:", "").trim() || "-";

  const issueType =
    lines
      .find((line) => line.startsWith("도움이 필요한 내용:"))
      ?.replace("도움이 필요한 내용:", "")
      .trim() || "-";

  const schedule =
    lines.find((line) => line.startsWith("희망 일정:"))?.replace("희망 일정:", "").trim() || "-";

  const detailText =
    lines
      .find((line) => line.startsWith("상세 설명:"))
      ?.replace("상세 설명:", "")
      .trim() || raw || "내용이 없습니다.";

  return {
    placeType,
    issueType,
    schedule,
    detailText,
  };
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

export default function MyRequestsPage({ onGoHome, onClickRequest }) {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [loginUser, setLoginUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  const BRAND = "#3b82f6";
  const BRAND_HOVER = "#2563eb";
  const BG = "#f4f7fb";
  const CARD = "#ffffff";
  const BORDER = "#dbe4f0";
  const TEXT = "#1e293b";
  const SUB = "#64748b";
  const SOFT = "#eef4ff";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        setLoading(true);
        setMessage("");

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          setMessage("로그인 정보가 없습니다. 다시 로그인해주세요.");
          setLoading(false);
          return;
        }

        setLoginUser(user);

        const { data, error } = await supabase
          .from("requests")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;

        setRequests(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("내 요청 목록 불러오기 실패:", error);
        setMessage(error.message || "내 요청 목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyRequests();
  }, []);

  const summary = useMemo(() => {
    const normalized = requests.map((item) => normalizeStatus(item.status));
    const total = requests.length;
    const active = normalized.filter((status) =>
      ["pending", "quoted", "planned", "in_progress"].includes(status)
    ).length;
    const completed = normalized.filter((status) => status === "completed").length;

    return { total, active, completed };
  }, [requests]);

  const handleOpenDetail = (request) => {
    if (onClickRequest) {
      onClickRequest(request);
      return;
    }

    navigate(`/requests/${request.id}`, {
      state: {
        request,
        from: "/requests/my",
      },
    });
  };

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
      return;
    }
    navigate("/");
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: BG,
      padding: isMobile ? "92px 12px 28px" : "104px 20px 48px",
      boxSizing: "border-box",
    },

    container: {
      maxWidth: "1120px",
      margin: "0 auto",
    },

    pageTitle: {
      margin: "0 0 18px",
      fontSize: isMobile ? "22px" : "24px",
      fontWeight: 700,
      color: TEXT,
      letterSpacing: "-0.3px",
      lineHeight: 1.35,
    },

    shell: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) 300px",
      gap: "18px",
      alignItems: "start",
    },

    mainCard: {
      background: CARD,
      border: `1px solid ${BORDER}`,
      borderRadius: "22px",
      padding: isMobile ? "16px" : "22px",
      boxShadow: "0 6px 18px rgba(15, 23, 42, 0.04)",
    },

    heroCard: {
      background: "#f7fbff",
      border: `1px solid ${BORDER}`,
      borderRadius: "20px",
      padding: isMobile ? "16px" : "20px",
      marginBottom: "18px",
    },

    heroTitle: {
      margin: 0,
      fontSize: isMobile ? "26px" : "22px",
      fontWeight: 700,
      color: TEXT,
      lineHeight: 1.4,
      letterSpacing: "-0.4px",
    },

    heroSub: {
      marginTop: "10px",
      fontSize: "14px",
      color: SUB,
      lineHeight: 1.7,
      fontWeight: 500,
    },

    chipRow: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginTop: "16px",
    },

    chip: {
      border: `1px solid ${BORDER}`,
      background: "#fff",
      color: TEXT,
      borderRadius: "999px",
      padding: "8px 12px",
      fontSize: "13px",
      fontWeight: 600,
    },

    listWrap: {
      display: "grid",
      gap: "14px",
      marginTop: "18px",
    },

    emptyCard: {
      background: "#fff",
      border: `1px dashed ${BORDER}`,
      borderRadius: "18px",
      padding: "32px 20px",
      textAlign: "center",
      color: SUB,
      fontSize: "14px",
      lineHeight: 1.8,
      fontWeight: 500,
    },

    requestCard: {
      background: "#fff",
      border: "1px solid #e8eef5",
      borderRadius: "18px",
      padding: "16px",
      cursor: "pointer",
      transition: "all 0.18s ease",
      boxShadow: "0 4px 12px rgba(15, 23, 42, 0.03)",
    },

    requestTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "center",
      flexDirection: isMobile ? "column" : "row",
      gap: "10px",
      marginBottom: "14px",
    },

    requestTitle: {
      margin: 0,
      fontSize: isMobile ? "20px" : "18px",
      fontWeight: 700,
      color: TEXT,
      lineHeight: 1.45,
      letterSpacing: "-0.2px",
      wordBreak: "break-word",
    },

    requestSub: {
      marginTop: "4px",
      fontSize: "13px",
      color: SUB,
      fontWeight: 500,
    },

    statusPill: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "8px 12px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: 600,
      whiteSpace: "nowrap",
    },

    metaGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
      gap: "10px",
      marginBottom: "12px",
    },

    metaBox: {
      background: "#fbfdff",
      border: `1px solid ${BORDER}`,
      borderRadius: "14px",
      padding: "12px 14px",
    },

    metaLabel: {
      fontSize: "12px",
      color: SUB,
      fontWeight: 600,
      marginBottom: "6px",
    },

    metaValue: {
      fontSize: "14px",
      color: TEXT,
      fontWeight: 600,
      lineHeight: 1.5,
      wordBreak: "break-word",
    },

    previewBox: {
      background: "#fbfdff",
      border: `1px solid ${BORDER}`,
      borderRadius: "14px",
      padding: "13px 14px",
    },

    previewLabel: {
      fontSize: "12px",
      color: SUB,
      fontWeight: 600,
      marginBottom: "6px",
    },

    previewValue: {
      fontSize: "14px",
      color: TEXT,
      fontWeight: 500,
      lineHeight: 1.7,
      wordBreak: "break-word",
    },

    footer: {
      marginTop: "12px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "10px",
      flexWrap: "wrap",
    },

    footerDate: {
      fontSize: "12px",
      color: SUB,
      fontWeight: 500,
    },

    footerLink: {
      fontSize: "13px",
      color: BRAND,
      fontWeight: 700,
    },

    sideCard: {
      background: CARD,
      border: `1px solid ${BORDER}`,
      borderRadius: "22px",
      padding: isMobile ? "16px" : "18px",
      boxShadow: "0 6px 18px rgba(15, 23, 42, 0.04)",
      position: isMobile ? "static" : "sticky",
      top: "96px",
    },

    sideTitle: {
      margin: 0,
      fontSize: "18px",
      fontWeight: 700,
      color: TEXT,
    },

    sideDesc: {
      margin: "8px 0 16px",
      fontSize: "13px",
      lineHeight: 1.65,
      color: SUB,
      fontWeight: 500,
    },

    sidePrimaryBtn: {
      width: "100%",
      height: "48px",
      border: "none",
      borderRadius: "14px",
      background: BRAND,
      color: "#fff",
      fontSize: "14px",
      fontWeight: 700,
      cursor: "pointer",
      outline: "none",
      boxShadow: "0 8px 16px rgba(59, 130, 246, 0.16)",
      transition: "all 0.18s ease",
    },

    miniInfo: {
      marginTop: "16px",
      paddingTop: "16px",
      borderTop: `1px solid ${BORDER}`,
      display: "grid",
      gap: "10px",
    },

    miniItem: {
      background: "#f6f9fc",
      borderRadius: "14px",
      padding: "12px 14px",
      border: `1px solid ${BORDER}`,
    },

    miniLabel: {
      fontSize: "12px",
      fontWeight: 600,
      color: SUB,
      marginBottom: "4px",
    },

    miniValue: {
      fontSize: "14px",
      fontWeight: 600,
      color: TEXT,
      lineHeight: 1.55,
      wordBreak: "break-word",
    },

    loadingWrap: {
      background: "#fff",
      border: `1px solid ${BORDER}`,
      borderRadius: "18px",
      padding: "28px 20px",
      textAlign: "center",
      color: SUB,
      fontSize: "15px",
      fontWeight: 600,
    },

    errorMessage: {
      padding: "12px 14px",
      borderRadius: "12px",
      fontSize: "13px",
      fontWeight: 600,
      lineHeight: 1.6,
      border: "1px solid #ffd8d8",
      background: "#fff5f5",
      color: "#dc2626",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.pageTitle}>내 요청 목록</h1>

        <div style={styles.shell}>
          <div style={styles.mainCard}>
            <div style={styles.heroCard}>
              <h2 style={styles.heroTitle}>내가 등록한 요청</h2>
              <div style={styles.heroSub}>
                최근에 등록한 요청부터 순서대로 확인할 수 있어요.
              </div>

              {!loading && !message && (
                <div style={styles.chipRow}>
                  <div style={styles.chip}>전체 {summary.total}개</div>
                  <div style={styles.chip}>진행중 {summary.active}개</div>
                  <div style={styles.chip}>완료 {summary.completed}개</div>
                </div>
              )}
            </div>

            <div style={styles.listWrap}>
              {loading && <div style={styles.loadingWrap}>목록을 불러오는 중입니다...</div>}

              {!loading && message && <div style={styles.errorMessage}>{message}</div>}

              {!loading && !message && requests.length === 0 && (
                <div style={styles.emptyCard}>
                  아직 등록한 요청이 없습니다.
                  <br />
                  메인에서 새 요청을 등록해보세요.
                </div>
              )}

              {!loading &&
                !message &&
                requests.length > 0 &&
                requests.map((request) => {
                  const parsed = parseDescription(request.content);

                  return (
                    <HoverCard
                      key={request.id}
                      onClick={() => handleOpenDetail(request)}
                      baseStyle={styles.requestCard}
                      hoverStyle={{
                        transform: isMobile ? "none" : "translateY(-2px)",
                        boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
                      }}
                    >
                      <div style={styles.requestTop}>
                        <div>
                          <h3 style={styles.requestTitle}>{request.title}</h3>
                          <div style={styles.requestSub}>요청 번호 #{request.id}</div>
                        </div>

                        <span
                          style={{
                            ...styles.statusPill,
                            ...getStatusStyle(request.status),
                          }}
                        >
                          {getStatusText(request.status)}
                        </span>
                      </div>

                      <div style={styles.metaGrid}>
                        <div style={styles.metaBox}>
                          <div style={styles.metaLabel}>카테고리</div>
                          <div style={styles.metaValue}>{request.category || "-"}</div>
                        </div>

                        <div style={styles.metaBox}>
                          <div style={styles.metaLabel}>공간 유형</div>
                          <div style={styles.metaValue}>{parsed.placeType}</div>
                        </div>

                        <div style={styles.metaBox}>
                          <div style={styles.metaLabel}>담당자</div>
                          <div style={styles.metaValue}>
                            {request.assigned_username
                              ? request.assigned_username
                              : request.assigned_user_id
                              ? "배정됨"
                              : "아직 없음"}
                          </div>
                        </div>
                      </div>

                      <div style={styles.previewBox}>
                        <div style={styles.previewLabel}>요청 내용</div>
                        <div style={styles.previewValue}>
                          {parsed.issueType !== "-" ? parsed.issueType : parsed.detailText}
                        </div>
                      </div>

                      <div style={styles.footer}>
                        <div style={styles.footerDate}>등록일 {formatDate(request.created_at)}</div>
                        <div style={styles.footerLink}>상세보기 →</div>
                      </div>
                    </HoverCard>
                  );
                })}
            </div>
          </div>

          <div style={styles.sideCard}>
            <h3 style={styles.sideTitle}>빠른 이동</h3>
            <p style={styles.sideDesc}>
              등록한 요청을 확인하고
              <br />
              상세 페이지에서 상태를 볼 수 있어요.
            </p>

            <HoverCard
              onClick={handleGoHome}
              baseStyle={{
                ...styles.sidePrimaryBtn,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              hoverStyle={{
                background: "#f8fbff",
                color: BRAND,
                borderColor: "#dbe4f0",
                transform: isMobile ? "none" : "translateY(-1px)",
                boxShadow: "0 10px 18px rgba(59, 130, 246, 0.10)",
              }}
            >
              메인으로 돌아가기
            </HoverCard>

            <div style={styles.miniInfo}>
              <div style={styles.miniItem}>
                <div style={styles.miniLabel}>내 계정</div>
                <div style={styles.miniValue}>{loginUser?.email || "-"}</div>
              </div>

              <div style={styles.miniItem}>
                <div style={styles.miniLabel}>진행중 요청</div>
                <div style={styles.miniValue}>{summary.active}건</div>
              </div>

              <div style={styles.miniItem}>
                <div style={styles.miniLabel}>완료된 요청</div>
                <div style={styles.miniValue}>{summary.completed}건</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}