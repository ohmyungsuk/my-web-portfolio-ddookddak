import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient.js";

export default function RequestDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [detail, setDetail] = useState(location.state?.request || null);
  const [loading, setLoading] = useState(!location.state?.request);
  const [message, setMessage] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [loginUser, setLoginUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  const fromPath = location.state?.from || "/requests/my";

  const BRAND = "#3b82f6";
  const BRAND_HOVER = "#2563eb";
  const BG = "#f4f7fb";
  const CARD = "#ffffff";
  const BORDER = "#dbe4f0";
  const TEXT = "#1e293b";
  const SUB = "#64748b";
  const SOFT = "#f8fbff";
  const GRAY_BTN = "#94a3b8";
  const GRAY_BTN_HOVER = "#64748b";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setLoginUser(user || null);
    };

    loadUser();
  }, []);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;

      try {
        setLoading(true);

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
    };

    fetchDetail();
  }, [id]);

  const parsedDescription = useMemo(() => {
    const raw = detail?.content || "";
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
  }, [detail]);

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
      date.getDate()
    ).padStart(2, "0")}`;
  };

  const getStatusText = (status) => {
    if (status === "pending") return "요청 등록";
    if (status === "quoted") return "견적 협의중";
    if (status === "planned") return "작업 예정";
    if (status === "in_progress") return "진행중";
    if (status === "completed") return "완료됨";
    return status || "상태 없음";
  };

  const getStatusStyle = (status) => {
    if (status === "pending" || status === "요청 등록") {
      return { backgroundColor: "#eef2f7", color: "#475569" };
    }
    if (status === "quoted" || status === "견적 협의중") {
      return { backgroundColor: "#fff4e5", color: "#c2410c" };
    }
    if (status === "planned" || status === "작업 예정") {
      return { backgroundColor: "#e8f0ff", color: "#1d4ed8" };
    }
    if (status === "in_progress" || status === "진행중") {
      return { backgroundColor: "#eaf8ef", color: "#15803d" };
    }
    if (status === "completed" || status === "완료됨") {
      return { backgroundColor: "#dcfce7", color: "#166534" };
    }
    return { backgroundColor: "#f1f5f9", color: "#334155" };
  };

  const writerText =
    detail?.user_id === loginUser?.id
      ? "나"
      : detail?.writer_name ||
        detail?.writer_nickname ||
        detail?.writer_email ||
        "작성자 정보 없음";

  const assignedText =
    !detail?.assigned_user_id
      ? "아직 없음"
      : detail.assigned_user_id === loginUser?.id
      ? "나"
      : detail.assigned_username || "배정됨";

  const isWriter = !!(loginUser && detail && detail.user_id === loginUser.id);

  const canAccept =
    loginUser &&
    detail &&
    detail.user_id !== loginUser.id &&
    (detail.status === "pending" || detail.status === "요청 등록") &&
    !detail.assigned_user_id;

  const canSetPlanned =
    loginUser &&
    detail &&
    detail.assigned_user_id === loginUser.id &&
    (detail.status === "quoted" || detail.status === "견적 협의중");

  const canStartWork =
    loginUser &&
    detail &&
    detail.assigned_user_id === loginUser.id &&
    (detail.status === "planned" || detail.status === "작업 예정");

  const canComplete =
    loginUser &&
    detail &&
    detail.assigned_user_id === loginUser.id &&
    (detail.status === "in_progress" || detail.status === "진행중");

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
    await updateRequest(
      {
        status: "quoted",
        assigned_user_id: loginUser.id,
        assigned_username:
          loginUser.user_metadata?.name ||
          loginUser.user_metadata?.full_name ||
          loginUser.email ||
          "작업자",
      },
      "요청을 수락했습니다."
    );
  };

  const handleSetPlanned = async () => {
    await updateRequest({ status: "planned" }, "작업 예정 상태로 변경되었습니다.");
  };

  const handleStartWork = async () => {
    await updateRequest({ status: "in_progress" }, "작업을 시작했습니다.");
  };

  const handleComplete = async () => {
    await updateRequest({ status: "completed" }, "작업을 완료 처리했습니다.");
  };

  const handleEdit = () => {
    navigate(`/requests/edit/${detail.id}`, {
      state: { request: detail },
    });
  };

  const handleDelete = async () => {
    if (!detail || !isWriter) return;

    const confirmed = window.confirm("이 요청을 삭제할까요?");
    if (!confirmed) return;

    try {
      setActionLoading(true);
      setMessage("");

      const { error } = await supabase.from("requests").delete().eq("id", detail.id);
      if (error) throw error;

      navigate("/requests/my");
    } catch (error) {
      console.error("요청 삭제 실패:", error);
      setMessage(error.message || "요청 삭제 중 오류가 발생했습니다.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleBack = () => navigate(-1);
  const handleGoHome = () => navigate("/");

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
      fontSize: isMobile ? "28px" : "22px",
      fontWeight: 700,
      color: TEXT,
      lineHeight: 1.4,
      letterSpacing: "-0.4px",
      wordBreak: "break-word",
    },
    statusBadge: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "8px 12px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: 600,
      whiteSpace: "nowrap",
    },
    heroSub: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
      gap: "12px",
    },
    heroSubItem: {
      background: "#fff",
      border: `1px solid ${BORDER}`,
      borderRadius: "16px",
      padding: "14px 16px",
    },
    heroSubLabel: {
      fontSize: "12px",
      fontWeight: 600,
      color: SUB,
      marginBottom: "8px",
    },
    heroSubValue: {
      fontSize: "15px",
      fontWeight: 600,
      color: TEXT,
      lineHeight: 1.5,
      wordBreak: "break-word",
    },
    section: {
      marginTop: "18px",
    },
    sectionTitle: {
      margin: "0 0 12px",
      fontSize: isMobile ? "20px" : "18px",
      fontWeight: 700,
      color: TEXT,
      letterSpacing: "-0.2px",
    },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
      gap: "12px",
    },
    infoCard: {
      background: "#fff",
      border: `1px solid ${BORDER}`,
      borderRadius: "16px",
      padding: "16px",
    },
    infoLabel: {
      fontSize: "13px",
      color: SUB,
      fontWeight: 600,
      marginBottom: "8px",
    },
    infoValue: {
      fontSize: "15px",
      color: TEXT,
      fontWeight: 600,
      lineHeight: 1.5,
      wordBreak: "break-word",
    },
    longCard: {
      background: "#fff",
      border: `1px solid ${BORDER}`,
      borderRadius: "16px",
      padding: "16px",
      marginBottom: "12px",
    },
    longLabel: {
      fontSize: "14px",
      color: TEXT,
      fontWeight: 700,
      marginBottom: "10px",
    },
    longValue: {
      minHeight: "72px",
      background: "#fff",
      border: `1px solid ${BORDER}`,
      borderRadius: "12px",
      padding: "14px 15px",
      color: TEXT,
      fontSize: "14px",
      lineHeight: 1.7,
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      boxSizing: "border-box",
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
    primaryBtn: {
      width: "100%",
      height: "50px",
      border: "none",
      borderRadius: "14px",
      background: BRAND,
      color: "#ffffff",
      fontSize: "15px",
      fontWeight: 700,
      cursor: "pointer",
      outline: "none",
      boxShadow: "0 8px 16px rgba(59, 130, 246, 0.16)",
      transition: "all 0.18s ease",
    },
    dangerBtn: {
      width: "100%",
      height: "50px",
      border: "none",
      borderRadius: "14px",
      background: GRAY_BTN,
      color: "#ffffff",
      fontSize: "15px",
      fontWeight: 700,
      cursor: "pointer",
      outline: "none",
      boxShadow: "0 8px 16px rgba(100, 116, 139, 0.14)",
      transition: "all 0.18s ease",
    },
    secondaryBtn: {
      width: "100%",
      height: "48px",
      border: "1px solid #dbe4f0",
      borderRadius: "14px",
      background: "#ffffff",
      color: TEXT,
      fontSize: "14px",
      fontWeight: 700,
      cursor: "pointer",
      outline: "none",
      boxShadow: "0 8px 16px rgba(15, 23, 42, 0.04)",
      transition: "all 0.18s ease",
    },
    message: {
      marginTop: "14px",
      padding: "12px 14px",
      borderRadius: "12px",
      fontSize: "13px",
      fontWeight: 600,
      lineHeight: 1.6,
      border: "1px solid #d9e6ff",
      background: "#f8fbff",
      color: BRAND_HOVER,
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
    bottomActions: {
      marginTop: "18px",
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
      gap: "10px",
    },
    loadingWrap: {
      maxWidth: "900px",
      margin: "40px auto",
      background: "#fff",
      border: `1px solid ${BORDER}`,
      borderRadius: "20px",
      padding: "30px",
      textAlign: "center",
      fontSize: "15px",
      fontWeight: 600,
      color: SUB,
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
                transform: isMobile ? "none" : "translateY(-1px)",
                boxShadow: "0 10px 18px rgba(37, 99, 235, 0.20)",
              }}
            >
              목록으로 돌아가기
            </HoverButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.pageTitle}>요청 상세보기</h1>

        <div style={styles.shell}>
          <div style={styles.mainCard}>
            <div style={styles.heroCard}>
              <div style={styles.heroTop}>
                <h2 style={styles.heroTitle}>{detail.title || "요청 제목 없음"}</h2>
                <span style={{ ...styles.statusBadge, ...getStatusStyle(detail.status) }}>
                  {getStatusText(detail.status)}
                </span>
              </div>

              <div style={styles.heroSub}>
                <div style={styles.heroSubItem}>
                  <div style={styles.heroSubLabel}>카테고리</div>
                  <div style={styles.heroSubValue}>{detail.category || "-"}</div>
                </div>
                <div style={styles.heroSubItem}>
                  <div style={styles.heroSubLabel}>작성자</div>
                  <div style={styles.heroSubValue}>{writerText}</div>
                </div>
                <div style={styles.heroSubItem}>
                  <div style={styles.heroSubLabel}>등록일</div>
                  <div style={styles.heroSubValue}>{formatDate(detail.created_at)}</div>
                </div>
              </div>
            </div>

            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>요청 정보</h3>
              <div style={styles.infoGrid}>
                <div style={styles.infoCard}>
                  <div style={styles.infoLabel}>담당자</div>
                  <div style={styles.infoValue}>{assignedText}</div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoLabel}>요청 번호</div>
                  <div style={styles.infoValue}>#{detail.id}</div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoLabel}>공간 유형</div>
                  <div style={styles.infoValue}>{parsedDescription.placeType}</div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoLabel}>희망 일정</div>
                  <div style={styles.infoValue}>{parsedDescription.schedule}</div>
                </div>
              </div>
            </div>

            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>상세 내용</h3>

              <div style={styles.longCard}>
                <div style={styles.longLabel}>도움이 필요한 내용</div>
                <div style={styles.longValue}>{parsedDescription.issueType}</div>
              </div>

              <div style={styles.longCard}>
                <div style={styles.longLabel}>상세 설명</div>
                <div style={styles.longValue}>
                  {parsedDescription.detailText?.trim() || "내용이 없습니다."}
                </div>
              </div>
            </div>

            {message && <div style={styles.message}>{message}</div>}

            <div style={styles.bottomActions}>
              <HoverButton
                onClick={handleBack}
                baseStyle={styles.secondaryBtn}
                hoverStyle={{
                  background: SOFT,
                  color: BRAND,
                  transform: isMobile ? "none" : "translateY(-1px)",
                  boxShadow: "0 10px 18px rgba(59, 130, 246, 0.10)",
                }}
              >
                뒤로가기
              </HoverButton>

              <HoverButton
                onClick={handleGoHome}
                baseStyle={styles.primaryBtn}
                hoverStyle={{
                  background: BRAND_HOVER,
                  transform: isMobile ? "none" : "translateY(-1px)",
                  boxShadow: "0 10px 18px rgba(37, 99, 235, 0.20)",
                }}
              >
                메인으로 돌아가기
              </HoverButton>
            </div>
          </div>

          <div style={styles.sideCard}>
            <h3 style={styles.sideTitle}>빠른 작업</h3>
            <p style={styles.sideDesc}>
              요청 상태에 따라 가능한 작업을
              <br />
              여기서 바로 진행할 수 있어요.
            </p>

            <div style={{ display: "grid", gap: "10px" }}>
              {isWriter && (
                <>
                  <HoverButton
                    onClick={handleEdit}
                    disabled={actionLoading}
                    baseStyle={styles.primaryBtn}
                    hoverStyle={{
                      background: BRAND_HOVER,
                      transform: isMobile ? "none" : "translateY(-1px)",
                      boxShadow: "0 10px 18px rgba(37, 99, 235, 0.20)",
                    }}
                  >
                    수정하기
                  </HoverButton>

                  <HoverButton
                    onClick={handleDelete}
                    disabled={actionLoading}
                    baseStyle={styles.dangerBtn}
                    hoverStyle={{
                      background: GRAY_BTN_HOVER,
                      transform: isMobile ? "none" : "translateY(-1px)",
                      boxShadow: "0 10px 18px rgba(100, 116, 139, 0.18)",
                    }}
                  >
                    {actionLoading ? "삭제 중..." : "삭제하기"}
                  </HoverButton>
                </>
              )}

              {canAccept && (
                <HoverButton
                  onClick={handleAccept}
                  disabled={actionLoading}
                  baseStyle={styles.primaryBtn}
                  hoverStyle={{
                    background: BRAND_HOVER,
                    transform: isMobile ? "none" : "translateY(-1px)",
                    boxShadow: "0 10px 18px rgba(37, 99, 235, 0.20)",
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
                    transform: isMobile ? "none" : "translateY(-1px)",
                    boxShadow: "0 10px 18px rgba(37, 99, 235, 0.20)",
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
                    transform: isMobile ? "none" : "translateY(-1px)",
                    boxShadow: "0 10px 18px rgba(37, 99, 235, 0.20)",
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
                    transform: isMobile ? "none" : "translateY(-1px)",
                    boxShadow: "0 10px 18px rgba(37, 99, 235, 0.20)",
                  }}
                >
                  {actionLoading ? "처리 중..." : "완료 처리하기"}
                </HoverButton>
              )}
            </div>

            <div style={styles.miniInfo}>
              <div style={styles.miniItem}>
                <div style={styles.miniLabel}>현재 상태</div>
                <div style={styles.miniValue}>{getStatusText(detail.status)}</div>
              </div>

              <div style={styles.miniItem}>
                <div style={styles.miniLabel}>담당자</div>
                <div style={styles.miniValue}>{assignedText}</div>
              </div>

              <div style={styles.miniItem}>
                <div style={styles.miniLabel}>안내</div>
                <div style={styles.miniValue}>
                  내가 작성한 요청이면 수정/삭제 가능,
                  <br />
                  담당자로 배정된 경우 진행 상태 변경이 가능합니다.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
      onFocus={(e) => e.currentTarget.blur()}
      style={{
        ...baseStyle,
        ...(isHover && !disabled ? hoverStyle : {}),
        opacity: disabled ? 0.72 : 1,
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {children}
    </button>
  );
}