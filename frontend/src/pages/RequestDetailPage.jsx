import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient.js";
import "../index.css";

function RequestDetailPage({ onGoHome }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [detail, setDetail] = useState(location.state?.request || null);
  const [loading, setLoading] = useState(!location.state?.request);
  const [message, setMessage] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const savedUser = localStorage.getItem("loginUser");
  const loginUser = savedUser ? JSON.parse(savedUser) : null;

  const fromPath = location.state?.from || "/requests/all";

  const isMobile = useMemo(() => window.innerWidth <= 900, []);

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

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate(fromPath);
  };

  const getStatusStyle = (status) => {
    if (status === "요청 등록") {
      return { backgroundColor: "#eef2f7", color: "#475569" };
    }
    if (status === "견적 협의중") {
      return { backgroundColor: "#ffedd5", color: "#c2410c" };
    }
    if (status === "작업 예정") {
      return { backgroundColor: "#dbeafe", color: "#1d4ed8" };
    }
    if (status === "진행중") {
      return { backgroundColor: "#dcfce7", color: "#15803d" };
    }
    if (status === "완료됨") {
      return { backgroundColor: "#bbf7d0", color: "#166534" };
    }
    return { backgroundColor: "#f3f4f6", color: "#111827" };
  };

  const writerText =
    detail?.user_id === loginUser?.id
      ? "나"
      : detail?.writer_name || detail?.writer_nickname || "작성자 정보 없음";

  const assignedText =
    !detail?.assigned_user_id
      ? "아직 없음"
      : detail.assigned_user_id === loginUser?.id
      ? "나"
      : detail.assigned_username || "배정됨";

  const canAccept =
    loginUser &&
    detail &&
    detail.user_id !== loginUser.id &&
    detail.status === "요청 등록" &&
    !detail.assigned_user_id;

  const canSetPlanned =
    loginUser &&
    detail &&
    detail.assigned_user_id === loginUser.id &&
    detail.status === "견적 협의중";

  const canStartWork =
    loginUser &&
    detail &&
    detail.assigned_user_id === loginUser.id &&
    detail.status === "작업 예정";

  const canComplete =
    loginUser &&
    detail &&
    detail.assigned_user_id === loginUser.id &&
    detail.status === "진행중";

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
        status: "견적 협의중",
        assigned_user_id: loginUser.id,
        assigned_username: loginUser.username || loginUser.name || "작업자",
      },
      "요청을 수락했습니다."
    );
  };

  const handleSetPlanned = async () => {
    await updateRequest({ status: "작업 예정" }, "작업 예정 상태로 변경되었습니다.");
  };

  const handleStartWork = async () => {
    await updateRequest({ status: "진행중" }, "작업을 시작했습니다.");
  };

  const handleComplete = async () => {
    await updateRequest({ status: "완료됨" }, "작업을 완료 처리했습니다.");
  };

  const formatDate = (value) => {
    if (!value) return "등록일 정보 없음";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "등록일 정보 없음";
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
      date.getDate()
    ).padStart(2, "0")}`;
  };

  const styles = {
    shell: {
      minHeight: "100vh",
      background: "linear-gradient(180deg, #f8fbff 0%, #eef4fb 100%)",
      padding: isMobile ? "20px 14px 40px" : "34px 20px 64px",
    },
    wrap: { maxWidth: "1180px", margin: "0 auto" },
    topbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "14px",
      flexWrap: "wrap",
      marginBottom: isMobile ? "18px" : "24px",
    },
    brand: { display: "flex", alignItems: "center", gap: "10px" },
    brandMark: {
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
    },
    brandText: {
      fontSize: "24px",
      fontWeight: "900",
      color: "#2F80ED",
      letterSpacing: "-0.6px",
    },
    backBtn: {
      border: "1px solid #dbe4f2",
      background: "#ffffff",
      color: "#1e293b",
      borderRadius: "14px",
      padding: "12px 18px",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) 320px",
      gap: "22px",
      alignItems: "start",
    },
    mainCard: {
      background: "rgba(255,255,255,0.94)",
      border: "1px solid #e4ebf5",
      borderRadius: "30px",
      padding: isMobile ? "22px 18px" : "30px",
      boxShadow: "0 18px 38px rgba(15, 23, 42, 0.05)",
    },
    sideWrap: { display: "grid", gap: "14px" },
    heroBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "9px 14px",
      borderRadius: "999px",
      background: "#eef4ff",
      color: "#2563eb",
      fontSize: "12px",
      fontWeight: "800",
      marginBottom: "16px",
    },
    titleRow: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "16px",
      flexDirection: isMobile ? "column" : "row",
    },
    title: {
      margin: 0,
      fontSize: isMobile ? "34px" : "48px",
      lineHeight: "1.14",
      letterSpacing: isMobile ? "-1px" : "-1.6px",
      fontWeight: "900",
      color: "#0f172a",
    },
    desc: {
      margin: "16px 0 0",
      fontSize: isMobile ? "14px" : "16px",
      lineHeight: "1.9",
      color: "#64748b",
    },
    statusPill: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "999px",
      padding: "10px 14px",
      fontSize: "14px",
      fontWeight: "800",
      whiteSpace: "nowrap",
    },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
      gap: "14px",
      marginTop: "26px",
    },
    infoCard: {
      background: "#f8fbff",
      border: "1px solid #e3eaf5",
      borderRadius: "22px",
      padding: "18px",
    },
    infoLabel: {
      fontSize: "13px",
      color: "#64748b",
      fontWeight: "800",
      marginBottom: "8px",
    },
    infoValue: {
      fontSize: "20px",
      lineHeight: "1.5",
      color: "#0f172a",
      fontWeight: "900",
      letterSpacing: "-0.3px",
      wordBreak: "break-word",
    },
    contentWrap: {
      marginTop: "20px",
      background: "#f8fbff",
      border: "1px solid #e3eaf5",
      borderRadius: "24px",
      padding: "20px",
    },
    contentLabel: {
      fontSize: "14px",
      color: "#64748b",
      fontWeight: "800",
      marginBottom: "12px",
    },
    contentBox: {
      minHeight: "170px",
      border: "1px solid #d7deea",
      borderRadius: "18px",
      background: "#ffffff",
      padding: "18px",
      whiteSpace: "pre-wrap",
      lineHeight: "1.9",
      fontSize: "15px",
      color: "#1f2937",
    },
    messageWrap: { marginTop: "18px" },
    actionStack: { display: "grid", gap: "10px", marginTop: "22px" },
    primaryAction: {
      height: "52px",
      border: "none",
      borderRadius: "16px",
      background: "linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)",
      color: "#ffffff",
      fontSize: "15px",
      fontWeight: "800",
      cursor: "pointer",
      boxShadow: "0 14px 28px rgba(37, 99, 235, 0.18)",
    },
    actionRow: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
      marginTop: "20px",
    },
    subtleBtn: {
      flex: isMobile ? "1 1 100%" : "0 0 auto",
      minWidth: isMobile ? "100%" : "180px",
      height: "52px",
      border: "1px solid #dbe4f2",
      borderRadius: "16px",
      background: "#ffffff",
      color: "#475569",
      fontSize: "15px",
      fontWeight: "700",
      cursor: "pointer",
    },
    homeBtn: {
      flex: isMobile ? "1 1 100%" : "0 0 auto",
      minWidth: isMobile ? "100%" : "180px",
      height: "52px",
      border: "none",
      borderRadius: "16px",
      background: "linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)",
      color: "#ffffff",
      fontSize: "15px",
      fontWeight: "800",
      cursor: "pointer",
    },
    sideHero: {
      borderRadius: "24px",
      padding: "22px",
      background: "linear-gradient(145deg, #1e3a8a 0%, #2563eb 55%, #4f46e5 100%)",
      color: "#ffffff",
      boxShadow: "0 20px 38px rgba(37, 99, 235, 0.18)",
    },
    sideHeroLabel: { margin: 0, fontSize: "13px", fontWeight: "800", opacity: 0.88 },
    sideHeroBig: {
      display: "block",
      marginTop: "10px",
      marginBottom: "12px",
      fontSize: isMobile ? "24px" : "28px",
      lineHeight: "1.2",
      letterSpacing: "-0.7px",
      fontWeight: "900",
    },
    sideHeroText: {
      margin: 0,
      fontSize: "14px",
      lineHeight: "1.8",
      opacity: 0.94,
    },
    sideSoft: {
      border: "1px solid #e5ebf5",
      borderRadius: "22px",
      padding: "18px",
      background: "rgba(255,255,255,0.94)",
    },
    sideSoftLabel: { margin: 0, fontSize: "13px", color: "#64748b", fontWeight: "800" },
    sideSoftTitle: {
      display: "block",
      marginTop: "8px",
      marginBottom: "6px",
      fontSize: "20px",
      color: "#0f172a",
      fontWeight: "900",
      letterSpacing: "-0.3px",
      lineHeight: "1.4",
    },
    sideSoftText: {
      margin: 0,
      fontSize: "13px",
      color: "#94a3b8",
      lineHeight: "1.8",
    },
  };

  if (loading) {
    return (
      <div style={styles.shell}>
        <div style={styles.wrap}>
          <div style={styles.mainCard}>불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div style={styles.shell}>
        <div style={styles.wrap}>
          <div style={styles.mainCard}>
            <div style={styles.heroBadge}>요청 상세보기</div>
            <h1 style={styles.title}>요청을 찾을 수 없습니다</h1>
            <p style={styles.desc}>삭제되었거나 잘못된 주소일 수 있습니다.</p>

            {message && (
              <div style={styles.messageWrap}>
                <div className="message error">{message}</div>
              </div>
            )}

            <div style={styles.actionRow}>
              <button type="button" style={styles.subtleBtn} onClick={handleBack}>
                뒤로가기
              </button>
              <button type="button" style={styles.homeBtn} onClick={onGoHome}>
                메인으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.shell}>
      <div style={styles.wrap}>
        <div style={styles.topbar}>
          <div
            style={{ ...styles.brand, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <div style={styles.brandMark}>ㄸ</div>
            <div style={styles.brandText}>뚝딱</div>
          </div>

          <button type="button" style={styles.backBtn} onClick={handleBack}>
            뒤로가기
          </button>
        </div>

        <div style={styles.grid}>
          <div style={styles.mainCard}>
            <div style={styles.heroBadge}>요청 상세보기</div>

            <div style={styles.titleRow}>
              <div>
                <h1 style={styles.title}>{detail.title}</h1>
                <p style={styles.desc}>
                  요청 정보와 현재 진행 상태를 확인할 수 있습니다.
                </p>
              </div>

              <span style={{ ...styles.statusPill, ...getStatusStyle(detail.status) }}>
                {detail.status}
              </span>
            </div>

            {message && (
              <div style={styles.messageWrap}>
                <div
                  className={`message ${
                    message.includes("완료") ||
                    message.includes("수락") ||
                    message.includes("변경")
                      ? "success"
                      : "error"
                  }`}
                >
                  {message}
                </div>
              </div>
            )}

            <div style={styles.infoGrid}>
              <div style={styles.infoCard}>
                <div style={styles.infoLabel}>작성자</div>
                <div style={styles.infoValue}>{writerText}</div>
              </div>

              <div style={styles.infoCard}>
                <div style={styles.infoLabel}>담당자</div>
                <div style={styles.infoValue}>{assignedText}</div>
              </div>

              <div style={styles.infoCard}>
                <div style={styles.infoLabel}>카테고리</div>
                <div style={styles.infoValue}>{detail.category}</div>
              </div>

              <div style={styles.infoCard}>
                <div style={styles.infoLabel}>장소</div>
                <div style={styles.infoValue}>{detail.location}</div>
              </div>
            </div>

            <div style={styles.contentWrap}>
              <div style={styles.contentLabel}>상세 내용</div>
              <div style={styles.contentBox}>{detail.content?.trim() || "내용이 없습니다."}</div>
            </div>

            <div style={styles.actionStack}>
              {canAccept && (
                <button
                  type="button"
                  style={styles.primaryAction}
                  onClick={handleAccept}
                  disabled={actionLoading}
                >
                  {actionLoading ? "처리 중..." : "요청 수락하기"}
                </button>
              )}

              {canSetPlanned && (
                <button
                  type="button"
                  style={styles.primaryAction}
                  onClick={handleSetPlanned}
                  disabled={actionLoading}
                >
                  {actionLoading ? "처리 중..." : "작업 예정으로 변경"}
                </button>
              )}

              {canStartWork && (
                <button
                  type="button"
                  style={styles.primaryAction}
                  onClick={handleStartWork}
                  disabled={actionLoading}
                >
                  {actionLoading ? "처리 중..." : "작업 시작하기"}
                </button>
              )}

              {canComplete && (
                <button
                  type="button"
                  style={styles.primaryAction}
                  onClick={handleComplete}
                  disabled={actionLoading}
                >
                  {actionLoading ? "처리 중..." : "완료 처리하기"}
                </button>
              )}
            </div>

            <div style={styles.actionRow}>
              <button type="button" style={styles.subtleBtn} onClick={handleBack}>
                뒤로가기
              </button>

              <button type="button" style={styles.homeBtn} onClick={onGoHome}>
                메인으로 돌아가기
              </button>
            </div>
          </div>

          <div style={styles.sideWrap}>
            <div style={styles.sideHero}>
              <p style={styles.sideHeroLabel}>현재 상태</p>
              <span style={styles.sideHeroBig}>{detail.status}</span>
              <p style={styles.sideHeroText}>
                등록일 {formatDate(detail.created_at)}
                <br />
                요청 번호 #{detail.id}
              </p>
            </div>

            <div style={styles.sideSoft}>
              <p style={styles.sideSoftLabel}>처리 안내</p>
              <strong style={styles.sideSoftTitle}>상태는 순서대로 바뀝니다</strong>
              <p style={styles.sideSoftText}>
                요청 등록 → 견적 협의중 → 작업 예정 → 진행중 → 완료됨 순서로 이어집니다.
              </p>
            </div>

            <div style={styles.sideSoft}>
              <p style={styles.sideSoftLabel}>빠른 이동</p>
              <strong style={styles.sideSoftTitle}>목록과 홈으로 이동 가능</strong>
              <p style={styles.sideSoftText}>
                뒤로가기를 누르면 이전 목록으로, 메인으로 돌아가기를 누르면 홈으로 이동합니다.
              </p>
            </div>

            <div style={styles.sideSoft}>
              <p style={styles.sideSoftLabel}>담당자 정보</p>
              <strong style={styles.sideSoftTitle}>{assignedText}</strong>
              <p style={styles.sideSoftText}>
                담당자가 아직 없으면 전체 요청 목록에서 수락 후 진행할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestDetailPage;