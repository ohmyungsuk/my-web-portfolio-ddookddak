
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient.js";

function normalizeStatus(status) {
  if (status === "pending" || status === "요청 등록") return "pending";
  if (status === "quoted" || status === "견적 협의중") return "quoted";
  if (status === "planned" || status === "작업 예정") return "planned";
  if (status === "in_progress" || status === "진행중") return "in_progress";
  if (status === "completed" || status === "완료됨") return "completed";
  if (status === "cancelled" || status === "취소됨" || status === "요청 취소") return "cancelled";
  return "unknown";
}

function getStatusText(status) {
  const normalized = normalizeStatus(status);
  if (normalized === "pending") return "요청 등록";
  if (normalized === "quoted") return "견적 협의중";
  if (normalized === "planned") return "작업 예정";
  if (normalized === "in_progress") return "진행중";
  if (normalized === "completed") return "완료됨";
  if (normalized === "cancelled") return "취소됨";
  return status || "상태 없음";
}

function getStatusStyle(status) {
  const normalized = normalizeStatus(status);

  if (normalized === "pending") {
    return { backgroundColor: "#eff6ff", color: "#1d4ed8" };
  }
  if (normalized === "quoted") {
    return { backgroundColor: "#fff7ed", color: "#c2410c" };
  }
  if (normalized === "planned") {
    return { backgroundColor: "#eef2ff", color: "#4338ca" };
  }
  if (normalized === "in_progress") {
    return { backgroundColor: "#ecfdf3", color: "#15803d" };
  }
  if (normalized === "completed") {
    return { backgroundColor: "#f0fdf4", color: "#166534" };
  }
  if (normalized === "cancelled") {
    return { backgroundColor: "#f1f5f9", color: "#475569" };
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

function parseDescription(content) {
  const raw = content || "";
  const lines = raw.split("\n");

  const placeType =
    lines.find((line) => line.startsWith("공간 유형:"))?.replace("공간 유형:", "").trim() || "-";

  const issueType =
    lines
      .find((line) => line.startsWith("도움이 필요한 내용:"))
      ?.replace("도움이 필요한 내용:", "")
      .trim() || "-";

  const detailText =
    lines
      .find((line) => line.startsWith("상세 설명:"))
      ?.replace("상세 설명:", "")
      .trim() || raw || "내용이 없습니다.";

  return {
    placeType,
    issueType,
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

function HoverButton({ children, onClick, baseStyle, hoverStyle = {}, disabled = false }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onMouseDown={(e) => e.currentTarget.blur()}
      onFocus={(e) => e.currentTarget.blur()}
      style={{
        ...baseStyle,
        ...(isHover && !disabled ? hoverStyle : {}),
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {children}
    </button>
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

export default function AllRequestsPage({ onGoHome, onClickRequest }) {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const BRAND = "#2563eb";
  const BRAND_HOVER = "#1d4ed8";
  const BG = "#f6f8fc";
  const CARD = "#ffffff";
  const BORDER = "#dbe5f0";
  const TEXT = "#0f172a";
  const SUB = "#64748b";
  const SOFT = "#f8fbff";

  const filterOptions = [
    { key: "all", label: "전체" },
    { key: "pending", label: "요청 등록" },
    { key: "quoted", label: "견적 협의중" },
    { key: "planned", label: "작업 예정" },
    { key: "in_progress", label: "진행중" },
    { key: "completed", label: "완료됨" },
    { key: "cancelled", label: "취소됨" },
  ];

  const categoryOptions = [
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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchAllRequests = async () => {
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
    };

    fetchAllRequests();
  }, []);

  const summary = useMemo(() => {
    const normalized = requests.map((item) => normalizeStatus(item.status));
    const total = requests.length;
    const open = normalized.filter((status) => status === "pending").length;
    const active = normalized.filter((status) =>
      ["quoted", "planned", "in_progress"].includes(status)
    ).length;
    const completed = normalized.filter((status) => status === "completed").length;
    const cancelled = normalized.filter((status) => status === "cancelled").length;

    return { total, open, active, completed, cancelled };
  }, [requests]);

  const filteredRequests = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return requests.filter((item) => {
      const statusMatch =
        selectedFilter === "all" || normalizeStatus(item.status) === selectedFilter;

      const categoryMatch =
        categoryFilter === "all" || (item.category || "") === categoryFilter;

      const searchMatch =
        keyword === "" ||
        (item.title || "").toLowerCase().includes(keyword) ||
        (item.category || "").toLowerCase().includes(keyword) ||
        (item.content || "").toLowerCase().includes(keyword);

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
      padding: isMobile ? "88px 12px 28px" : "104px 20px 48px",
      boxSizing: "border-box",
    },
    container: {
      maxWidth: "1180px",
      margin: "0 auto",
    },
    pageTitle: {
      margin: "0 0 18px",
      fontSize: isMobile ? "23px" : "28px",
      fontWeight: 800,
      color: TEXT,
      letterSpacing: "-0.5px",
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
      borderRadius: "26px",
      padding: isMobile ? "14px" : "22px",
      boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
    },
    heroCard: {
      background: "linear-gradient(180deg, #f8fbff 0%, #fdfefe 100%)",
      border: `1px solid ${BORDER}`,
      borderRadius: "22px",
      padding: isMobile ? "18px 16px" : "24px",
      marginBottom: "18px",
    },
    heroTop: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "center",
      gap: "14px",
      marginBottom: "18px",
    },
    heroTitleWrap: {
      minWidth: 0,
    },
    eyebrow: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "7px 11px",
      borderRadius: "999px",
      background: "#eaf2ff",
      color: BRAND,
      fontSize: "12px",
      fontWeight: 800,
      marginBottom: "12px",
      letterSpacing: "-0.1px",
    },
    heroTitle: {
      margin: 0,
      fontSize: isMobile ? "24px" : "30px",
      fontWeight: 800,
      color: TEXT,
      lineHeight: 1.32,
      letterSpacing: "-0.7px",
    },
    heroSub: {
      marginTop: "10px",
      fontSize: "14px",
      color: SUB,
      lineHeight: 1.75,
      fontWeight: 500,
      wordBreak: "keep-all",
    },
    statGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5, minmax(0, 1fr))",
      gap: "10px",
    },
    statCard: {
      background: "#fff",
      border: `1px solid ${BORDER}`,
      borderRadius: "18px",
      padding: isMobile ? "14px" : "16px",
      boxShadow: "0 6px 16px rgba(15, 23, 42, 0.03)",
    },
    statLabel: {
      fontSize: "12px",
      color: SUB,
      fontWeight: 700,
      marginBottom: "8px",
    },
    statValue: {
      fontSize: isMobile ? "22px" : "24px",
      color: TEXT,
      fontWeight: 800,
      letterSpacing: "-0.4px",
      lineHeight: 1.2,
    },
    statSub: {
      marginTop: "6px",
      fontSize: "12px",
      color: SUB,
      lineHeight: 1.5,
      fontWeight: 500,
    },
    controlsCard: {
      background: SOFT,
      border: `1px solid ${BORDER}`,
      borderRadius: "18px",
      padding: isMobile ? "14px" : "16px",
      marginBottom: "4px",
    },
    controlLabel: {
      fontSize: "13px",
      color: TEXT,
      fontWeight: 700,
      marginBottom: "10px",
    },
    filterBar: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) 210px",
      gap: "10px",
      marginBottom: "12px",
    },
    searchInput: {
      width: "100%",
      height: "48px",
      padding: "0 15px",
      borderRadius: "14px",
      border: `1px solid ${BORDER}`,
      background: "#ffffff",
      color: TEXT,
      fontSize: "14px",
      fontWeight: 500,
      outline: "none",
      boxSizing: "border-box",
    },
    select: {
      width: "100%",
      height: "48px",
      padding: "0 14px",
      borderRadius: "14px",
      border: `1px solid ${BORDER}`,
      background: "#ffffff",
      color: TEXT,
      fontSize: "14px",
      fontWeight: 500,
      outline: "none",
      boxSizing: "border-box",
    },
    filterRow: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
    },
    filterBtn: {
      minHeight: "38px",
      padding: "0 14px",
      border: "1px solid #d9e4f2",
      borderRadius: "999px",
      background: "#ffffff",
      color: TEXT,
      fontSize: "13px",
      fontWeight: 700,
      cursor: "pointer",
      outline: "none",
      boxShadow: "none",
      transition: "all 0.18s ease",
    },
    filterBtnActive: {
      background: BRAND,
      color: "#ffffff",
      border: "1px solid transparent",
      boxShadow: "0 10px 20px rgba(37, 99, 235, 0.16)",
    },
    listWrap: {
      display: "grid",
      gap: "14px",
      marginTop: "18px",
    },
    emptyCard: {
      background: "#fff",
      border: `1px dashed ${BORDER}`,
      borderRadius: "20px",
      padding: "34px 20px",
      textAlign: "center",
      color: SUB,
      fontSize: "14px",
      lineHeight: 1.8,
      fontWeight: 500,
    },
    requestCard: {
      background: "#fff",
      border: "1px solid #e6edf5",
      borderRadius: "22px",
      padding: isMobile ? "16px" : "18px",
      cursor: "pointer",
      transition: "all 0.18s ease",
      boxShadow: "0 8px 22px rgba(15, 23, 42, 0.035)",
    },
    requestTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "center",
      flexDirection: isMobile ? "column" : "row",
      gap: "10px",
      marginBottom: "14px",
    },
    requestTitleWrap: {
      minWidth: 0,
    },
    requestTitle: {
      margin: 0,
      fontSize: isMobile ? "18px" : "19px",
      fontWeight: 800,
      color: TEXT,
      lineHeight: 1.45,
      letterSpacing: "-0.3px",
      wordBreak: "break-word",
    },
    requestSub: {
      marginTop: "6px",
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
      fontWeight: 700,
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
      borderRadius: "16px",
      padding: "12px 14px",
    },
    metaLabel: {
      fontSize: "12px",
      color: SUB,
      fontWeight: 700,
      marginBottom: "6px",
    },
    metaValue: {
      fontSize: "14px",
      color: TEXT,
      fontWeight: 700,
      lineHeight: 1.55,
      wordBreak: "break-word",
    },
    previewBox: {
      background: "#fbfdff",
      border: `1px solid ${BORDER}`,
      borderRadius: "16px",
      padding: "14px",
    },
    previewLabel: {
      fontSize: "12px",
      color: SUB,
      fontWeight: 700,
      marginBottom: "8px",
    },
    previewValue: {
      fontSize: "14px",
      color: TEXT,
      fontWeight: 500,
      lineHeight: 1.75,
      wordBreak: "break-word",
    },
    footer: {
      marginTop: "14px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "10px",
      flexWrap: "wrap",
      paddingTop: "12px",
      borderTop: `1px solid #edf2f7`,
    },
    footerDate: {
      fontSize: "12px",
      color: SUB,
      fontWeight: 600,
    },
    footerLink: {
      fontSize: "13px",
      color: BRAND,
      fontWeight: 800,
    },
    sideCard: {
      background: CARD,
      border: `1px solid ${BORDER}`,
      borderRadius: "26px",
      padding: isMobile ? "16px" : "18px",
      boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
      position: isMobile ? "static" : "sticky",
      top: "94px",
    },
    sideBadge: {
      display: "inline-flex",
      alignItems: "center",
      padding: "7px 10px",
      borderRadius: "999px",
      background: "#eef4ff",
      color: BRAND,
      fontSize: "12px",
      fontWeight: 800,
      marginBottom: "12px",
    },
    sideTitle: {
      margin: 0,
      fontSize: "20px",
      fontWeight: 800,
      color: TEXT,
      letterSpacing: "-0.3px",
    },
    sideDesc: {
      margin: "8px 0 16px",
      fontSize: "13px",
      lineHeight: 1.75,
      color: SUB,
      fontWeight: 500,
      wordBreak: "keep-all",
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
      boxShadow: "0 10px 20px rgba(37, 99, 235, 0.16)",
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
      background: "#f8fbff",
      borderRadius: "16px",
      padding: "12px 14px",
      border: `1px solid ${BORDER}`,
    },
    miniLabel: {
      fontSize: "12px",
      fontWeight: 700,
      color: SUB,
      marginBottom: "4px",
    },
    miniValue: {
      fontSize: "14px",
      fontWeight: 700,
      color: TEXT,
      lineHeight: 1.55,
      wordBreak: "break-word",
    },
    loadingWrap: {
      background: "#fff",
      border: `1px solid ${BORDER}`,
      borderRadius: "20px",
      padding: "30px 20px",
      textAlign: "center",
      color: SUB,
      fontSize: "15px",
      fontWeight: 700,
    },
    errorMessage: {
      padding: "12px 14px",
      borderRadius: "14px",
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
        <h1 style={styles.pageTitle}>전체 요청 목록</h1>

        <div style={styles.shell}>
          <div style={styles.mainCard}>
            <div style={styles.heroCard}>
              <div style={styles.heroTop}>
                <div style={styles.heroTitleWrap}>
                  <div style={styles.eyebrow}>전체 요청 관리</div>
                  <h2 style={styles.heroTitle}>등록된 유지보수 요청을 한눈에 확인해요</h2>
                  <div style={styles.heroSub}>
                    최신 요청부터 빠르게 살펴보고, 상태와 카테고리 기준으로
                    깔끔하게 찾아볼 수 있어요.
                  </div>
                </div>
              </div>

              {!loading && !message && (
                <div style={styles.statGrid}>
                  <StatCard
                    label="전체 요청"
                    value={`${summary.total}개`}
                    sub="현재 등록된 전체 건수"
                    styles={styles}
                  />
                  <StatCard
                    label="신규 요청"
                    value={`${summary.open}개`}
                    sub="아직 접수 단계인 요청"
                    styles={styles}
                  />
                  <StatCard
                    label="진행중"
                    value={`${summary.active}개`}
                    sub="협의 · 예정 · 진행 상태"
                    styles={styles}
                  />
                  <StatCard
                    label="완료"
                    value={`${summary.completed}개`}
                    sub="작업이 끝난 요청"
                    styles={styles}
                  />
                </div>
              )}
            </div>

            <div style={styles.controlsCard}>
              <div style={styles.controlLabel}>검색 및 필터</div>

              <div style={styles.filterBar}>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="제목, 내용, 카테고리로 검색"
                  style={styles.searchInput}
                />

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={styles.select}
                >
                  {categoryOptions.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.filterRow}>
                {filterOptions.map((option) => {
                  const isActive = selectedFilter === option.key;

                  return (
                    <HoverButton
                      key={option.key}
                      onClick={() => setSelectedFilter(option.key)}
                      baseStyle={{
                        ...styles.filterBtn,
                        ...(isActive ? styles.filterBtnActive : {}),
                      }}
                      hoverStyle={
                        isActive
                          ? {
                              background: BRAND_HOVER,
                            }
                          : {
                              color: BRAND,
                              border: "1px solid #bfd3f7",
                            }
                      }
                    >
                      {option.label}
                    </HoverButton>
                  );
                })}
              </div>
            </div>

            <div style={styles.listWrap}>
              {loading && <div style={styles.loadingWrap}>목록을 불러오는 중입니다...</div>}

              {!loading && message && <div style={styles.errorMessage}>{message}</div>}

              {!loading && !message && filteredRequests.length === 0 && (
                <div style={styles.emptyCard}>
                  검색어나 필터 조건에 맞는 요청이 없어요.
                  <br />
                  다른 검색어 또는 카테고리를 선택해보세요.
                </div>
              )}

              {!loading &&
                !message &&
                filteredRequests.length > 0 &&
                filteredRequests.map((request) => {
                  const parsed = parseDescription(request.content);

                  return (
                    <HoverCard
                      key={request.id}
                      onClick={() => handleOpenDetail(request)}
                      baseStyle={styles.requestCard}
                      hoverStyle={{
                        transform: isMobile ? "none" : "translateY(-3px)",
                        boxShadow: "0 16px 34px rgba(15, 23, 42, 0.08)",
                        border: "1px solid #d7e6fb",
                      }}
                    >
                      <div style={styles.requestTop}>
                        <div style={styles.requestTitleWrap}>
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
                          <div style={styles.metaValue}>
                            {request.location || parsed.placeType}
                          </div>
                        </div>

                        <div style={styles.metaBox}>
                          <div style={styles.metaLabel}>등록일</div>
                          <div style={styles.metaValue}>{formatDate(request.created_at)}</div>
                        </div>
                      </div>

                      <div style={styles.previewBox}>
                        <div style={styles.previewLabel}>요청 내용</div>
                        <div style={styles.previewValue}>
                          {parsed.issueType !== "-" ? parsed.issueType : parsed.detailText}
                        </div>
                      </div>

                      <div style={styles.footer}>
                        <div style={styles.footerDate}>
                          등록일 {formatDate(request.created_at)}
                        </div>
                        <div style={styles.footerLink}>상세보기 →</div>
                      </div>
                    </HoverCard>
                  );
                })}
            </div>
          </div>

          <div style={styles.sideCard}>
            <div style={styles.sideBadge}>빠른 이동</div>
            <h3 style={styles.sideTitle}>바로 이동하기</h3>
            <p style={styles.sideDesc}>
              홈으로 돌아가서 새 요청을 등록하거나,
              <br />
              필요한 화면으로 이어서 이동할 수 있어요.
            </p>

            <HoverButton
              onClick={handleGoHome}
              baseStyle={styles.sidePrimaryBtn}
              hoverStyle={{
                background: BRAND_HOVER,
                transform: isMobile ? "none" : "translateY(-1px)",
                boxShadow: "0 14px 24px rgba(29, 78, 216, 0.22)",
              }}
            >
              메인으로 돌아가기
            </HoverButton>

            <div style={styles.miniInfo}>
              <div style={styles.miniItem}>
                <div style={styles.miniLabel}>전체 요청 수</div>
                <div style={styles.miniValue}>{summary.total}건</div>
              </div>

              <div style={styles.miniItem}>
                <div style={styles.miniLabel}>지금 진행중</div>
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
