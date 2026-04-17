import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient.js";
import "../index.css";

function MyAssignedRequestsPage({ onGoHome, onClickRequest }) {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isMobile = windowWidth <= 900;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchAssignedRequests = async () => {
      const savedUser = localStorage.getItem("loginUser");
      const loginUser = savedUser ? JSON.parse(savedUser) : null;

      if (!loginUser || !loginUser.id) {
        setMessage("로그인 정보가 없습니다. 다시 로그인해주세요.");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("requests")
          .select("*")
          .eq("assigned_user_id", loginUser.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setRequests(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("내가 맡은 작업 목록 불러오기 실패:", error);
        setMessage(error.message || "내가 맡은 작업 목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedRequests();
  }, []);

  const summary = useMemo(() => {
    const total = requests.length;
    const planned = requests.filter((item) => item.status === "작업 예정").length;
    const working = requests.filter((item) => item.status === "진행중").length;
    const done = requests.filter((item) => item.status === "완료됨").length;

    return { total, planned, working, done };
  }, [requests]);

  const getStatusStyle = (status) => {
    if (status === "요청 등록") return { backgroundColor: "#eef2f7", color: "#475569" };
    if (status === "견적 협의중") return { backgroundColor: "#ffedd5", color: "#c2410c" };
    if (status === "작업 예정") return { backgroundColor: "#dbeafe", color: "#1d4ed8" };
    if (status === "진행중") return { backgroundColor: "#dcfce7", color: "#15803d" };
    if (status === "완료됨") return { backgroundColor: "#bbf7d0", color: "#166534" };
    return { backgroundColor: "#f3f4f6", color: "#111827" };
  };

  const formatDate = (value) => {
    if (!value) return "등록일 정보 없음";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "등록일 정보 없음";
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
      date.getDate()
    ).padStart(2, "0")}`;
  };

  const styles = getPageStyles(isMobile);

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

          <button type="button" style={styles.backBtn} onClick={onGoHome}>
            메인으로 돌아가기
          </button>
        </div>

        <div style={styles.grid}>
          <div style={styles.mainCard}>
            <div style={styles.badge}>내가 맡은 작업</div>

            <h1 style={styles.title}>내가 진행하는 요청</h1>
            <p style={styles.desc}>
              수락한 요청들을 상태별로 확인하고 상세 페이지에서 이어서 진행할 수 있습니다.
            </p>

            {!loading && !message && (
              <div style={styles.chipRow}>
                <div style={styles.chip}>전체 {summary.total}개</div>
                <div style={styles.chip}>작업 예정 {summary.planned}개</div>
                <div style={styles.chip}>진행중 {summary.working}개</div>
                <div style={styles.chip}>완료 {summary.done}개</div>
              </div>
            )}

            <div style={styles.listWrap}>
              {loading && <p style={styles.infoText}>불러오는 중...</p>}

              {!loading && message && <div className="message error">{message}</div>}

              {!loading && !message && requests.length === 0 && (
                <div style={styles.emptyCard}>
                  아직 맡은 작업이 없습니다.
                  <br />
                  전체 요청 목록에서 요청을 수락하면 여기에 표시됩니다.
                </div>
              )}

              {!loading &&
                !message &&
                requests.length > 0 &&
                requests.map((request) => (
                  <div
                    key={request.id}
                    style={styles.requestCard}
                    onClick={() => onClickRequest(request)}
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
                        {request.status}
                      </span>
                    </div>

                    <div style={styles.metaGrid}>
                      <div style={styles.metaBox}>
                        <div style={styles.metaLabel}>카테고리</div>
                        <div style={styles.metaValue}>{request.category}</div>
                      </div>

                      <div style={styles.metaBox}>
                        <div style={styles.metaLabel}>장소</div>
                        <div style={styles.metaValue}>{request.location}</div>
                      </div>

                      <div style={styles.metaBox}>
                        <div style={styles.metaLabel}>담당자</div>
                        <div style={styles.metaValue}>나</div>
                      </div>
                    </div>

                    <div style={styles.previewBox}>
                      {request.content?.trim() || "요청 내용이 없습니다."}
                    </div>

                    <div style={styles.cardFooter}>
                      <div style={styles.footerDate}>
                        등록일 {formatDate(request.created_at)}
                      </div>
                      <div style={styles.footerLink}>상세보기 →</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div style={styles.sideWrap}>
            <div style={styles.sideHero}>
              <p style={styles.sideHeroLabel}>맡은 작업</p>
              <span style={styles.sideHeroBig}>{summary.total}건</span>
              <p style={styles.sideHeroText}>
                내가 현재 맡고 있는 전체 요청 수입니다.
              </p>
            </div>

            <div style={styles.sideSoft}>
              <p style={styles.sideSoftLabel}>작업 예정</p>
              <strong style={styles.sideSoftTitle}>{summary.planned}건</strong>
              <p style={styles.sideSoftText}>곧 진행을 시작할 요청입니다.</p>
            </div>

            <div style={styles.sideSoft}>
              <p style={styles.sideSoftLabel}>진행중 / 완료</p>
              <strong style={styles.sideSoftTitle}>
                {summary.working} / {summary.done}
              </strong>
              <p style={styles.sideSoftText}>
                현재 작업 중인 요청과 완료 처리한 요청입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getPageStyles(isMobile) {
  return {
    shell: {
      minHeight: "100vh",
      background: "linear-gradient(180deg, #f8fbff 0%, #eef4fb 100%)",
      padding: isMobile ? "20px 14px 40px" : "34px 20px 64px",
    },
    wrap: {
      maxWidth: "1180px",
      margin: "0 auto",
    },
    topbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "14px",
      flexWrap: "wrap",
      marginBottom: isMobile ? "18px" : "24px",
    },
    brand: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
   brandMark: {
      width: "40px",
      height: "40px",
      borderRadius: "14px",
      background: "#2F80ED",
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
      gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) 300px",
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
    sideWrap: {
      display: "grid",
      gap: "14px",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "9px 14px",
      borderRadius: "999px",
      background: "#eef4ff",
      color: "#2F80ED",
      fontSize: "12px",
      fontWeight: "800",
      marginBottom: "16px",
    },
    title: {
      margin: 0,
      fontSize: isMobile ? "34px" : "44px",
      lineHeight: "1.14",
      letterSpacing: isMobile ? "-1px" : "-1.5px",
      fontWeight: "900",
      color: "#0f172a",
    },
    desc: {
      margin: "14px 0 0",
      fontSize: isMobile ? "14px" : "16px",
      lineHeight: "1.9",
      color: "#64748b",
    },
    chipRow: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      marginTop: "18px",
    },
    chip: {
      border: "1px solid #dbe4f2",
      background: "#ffffff",
      color: "#334155",
      borderRadius: "999px",
      padding: "9px 13px",
      fontSize: "13px",
      fontWeight: "700",
    },
    listWrap: {
      display: "grid",
      gap: "14px",
      marginTop: "22px",
    },
    infoText: {
      color: "#6b7280",
    },
    emptyCard: {
      background: "#ffffff",
      border: "1px dashed #cbd5e1",
      borderRadius: "22px",
      padding: "34px 22px",
      textAlign: "center",
      color: "#64748b",
      lineHeight: "1.8",
    },
    requestCard: {
      background: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: "22px",
      padding: "20px",
      boxShadow: "0 16px 30px rgba(15, 23, 42, 0.04)",
      cursor: "pointer",
    },
    requestTop: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "14px",
      flexDirection: isMobile ? "column" : "row",
    },
    requestTitle: {
      margin: 0,
      fontSize: "22px",
      fontWeight: "900",
      letterSpacing: "-0.4px",
      color: "#0f172a",
    },
    requestSub: {
      marginTop: "8px",
      fontSize: "14px",
      color: "#64748b",
      lineHeight: "1.7",
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
    metaGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
      gap: "12px",
      marginTop: "18px",
    },
    metaBox: {
      background: "#f8fafc",
      border: "1px solid #e5ebf5",
      borderRadius: "16px",
      padding: "14px",
    },
    metaLabel: {
      fontSize: "12px",
      fontWeight: "800",
      color: "#64748b",
      marginBottom: "6px",
    },
    metaValue: {
      fontSize: "15px",
      lineHeight: "1.6",
      fontWeight: "700",
      color: "#0f172a",
      wordBreak: "break-word",
    },
    previewBox: {
      marginTop: "16px",
      padding: "16px",
      borderRadius: "16px",
      background: "#f8fafc",
      border: "1px solid #e5ebf5",
      color: "#475569",
      fontSize: "14px",
      lineHeight: "1.8",
    },
    cardFooter: {
      marginTop: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      flexWrap: "wrap",
    },
    footerDate: {
      fontSize: "13px",
      color: "#94a3b8",
      fontWeight: "700",
    },
    footerLink: {
      fontSize: "13px",
      fontWeight: "800",
      color: "#2F80ED",
    },
    sideHero: {
      borderRadius: "24px",
      padding: "22px",
      background: "linear-gradient(145deg, #1C63E0 0%, #2F80ED 55%, #2F7BE5 100%)",
      color: "#ffffff",
      boxShadow: "0 20px 38px rgba(47, 128, 237, 0.18)",
    },
    sideHeroLabel: {
      margin: 0,
      fontSize: "13px",
      fontWeight: "800",
      opacity: 0.88,
    },
    sideHeroBig: {
      display: "block",
      marginTop: "10px",
      marginBottom: "12px",
      fontSize: isMobile ? "26px" : "30px",
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
    sideSoftLabel: {
      margin: 0,
      fontSize: "13px",
      color: "#64748b",
      fontWeight: "800",
    },
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
}

export default MyAssignedRequestsPage;