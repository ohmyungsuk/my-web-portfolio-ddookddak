import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient.js";

function parseDescription(description) {
  const raw = description || "";
  const lines = raw.split("\n");

  const placeType =
    lines.find((line) => line.startsWith("공간 유형:"))?.replace("공간 유형:", "").trim() || "";

  const issueType =
    lines
      .find((line) => line.startsWith("도움이 필요한 내용:"))
      ?.replace("도움이 필요한 내용:", "")
      .trim() || "";

  const schedule =
    lines.find((line) => line.startsWith("희망 일정:"))?.replace("희망 일정:", "").trim() || "";

  const detailText =
    lines
      .find((line) => line.startsWith("상세 설명:"))
      ?.replace("상세 설명:", "")
      .trim() || "";

  return {
    placeType,
    issueType,
    schedule,
    detailText,
  };
}

function buildDescription({ placeType, issueType, schedule, detailText }) {
  return [
    `공간 유형: ${placeType || ""}`,
    `도움이 필요한 내용: ${issueType || ""}`,
    `희망 일정: ${schedule || ""}`,
    `상세 설명: ${detailText || ""}`,
  ].join("\n");
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

export default function RequestEditPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loginUser, setLoginUser] = useState(null);
  const [originalRequest, setOriginalRequest] = useState(location.state?.request || null);
  const [message, setMessage] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  const [form, setForm] = useState({
    title: "",
    category: "",
    placeType: "",
    issueType: "",
    schedule: "",
    detailText: "",
  });

  const BRAND = "#3b82f6";
  const BRAND_HOVER = "#2563eb";
  const BG = "#f4f7fb";
  const CARD = "#ffffff";
  const BORDER = "#dbe4f0";
  const TEXT = "#1e293b";
  const SUB = "#64748b";
  const SOFT = "#f8fbff";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loadData = async () => {
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

        let requestData = location.state?.request || null;

        if (!requestData) {
          const { data, error } = await supabase
            .from("requests")
            .select("*")
            .eq("id", Number(id))
            .single();

          if (error) throw error;
          requestData = data;
        }

        if (!requestData) {
          setMessage("수정할 요청을 찾을 수 없습니다.");
          setLoading(false);
          return;
        }

        if (requestData.user_id !== user.id) {
          setMessage("본인이 작성한 요청만 수정할 수 있습니다.");
          setLoading(false);
          return;
        }

        const parsed = parseDescription(requestData.content);

        setOriginalRequest(requestData);
        setForm({
          title: requestData.title || "",
          category: requestData.category || "",
          placeType: parsed.placeType || "",
          issueType: parsed.issueType || "",
          schedule: parsed.schedule || "",
          detailText: parsed.detailText || "",
        });
      } catch (error) {
        console.error("수정 페이지 데이터 로드 실패:", error);
        setMessage(error.message || "수정할 요청 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, location.state]);

  const canSave = useMemo(() => {
    return (
      form.title.trim() &&
      form.category.trim() &&
      form.placeType.trim() &&
      form.issueType.trim() &&
      form.schedule.trim()
    );
  }, [form]);

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleBack = () => {
    if (originalRequest?.id) {
      navigate(`/requests/${originalRequest.id}`, {
        state: {
          request: originalRequest,
          from: "/requests/my",
        },
      });
      return;
    }
    navigate("/requests/my");
  };

  const handleSave = async () => {
    if (!originalRequest || !loginUser) return;
    if (!canSave) {
      setMessage("필수 항목을 먼저 입력해주세요.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const content = buildDescription(form);

        const { data, error } = await supabase
        .from("requests")
        .update({
            title: form.title.trim(),
            category: form.category.trim(),
            content,
        })
        .eq("id", originalRequest.id)
        .eq("user_id", loginUser.id)
        .select()
        .single();

      if (error) throw error;

      navigate(`/requests/${data.id}`, {
        state: {
          request: data,
          from: "/requests/my",
        },
      });
    } catch (error) {
      console.error("요청 수정 실패:", error);
      setMessage(error.message || "요청 수정 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: BG,
      padding: isMobile ? "92px 12px 28px" : "104px 20px 48px",
      boxSizing: "border-box",
    },
    container: {
      maxWidth: "980px",
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
    card: {
      background: CARD,
      border: `1px solid ${BORDER}`,
      borderRadius: "22px",
      padding: isMobile ? "16px" : "22px",
      boxShadow: "0 6px 18px rgba(15, 23, 42, 0.04)",
    },
    heroCard: {
      background: "#f7fbff",
      border: `1px solid ${BORDER}`,
      borderRadius: "18px",
      padding: isMobile ? "16px" : "18px",
      marginBottom: "18px",
    },
    heroTitle: {
      margin: 0,
      fontSize: isMobile ? "24px" : "20px",
      fontWeight: 700,
      color: TEXT,
      lineHeight: 1.4,
      letterSpacing: "-0.3px",
    },
    heroSub: {
      marginTop: "8px",
      fontSize: "14px",
      lineHeight: 1.7,
      color: SUB,
      fontWeight: 500,
    },
    section: {
      marginTop: "18px",
    },
    sectionTitle: {
      margin: "0 0 12px",
      fontSize: "17px",
      fontWeight: 700,
      color: TEXT,
      letterSpacing: "-0.2px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
      gap: "12px",
    },
    field: {
      display: "grid",
      gap: "8px",
    },
    fullField: {
      display: "grid",
      gap: "8px",
      marginTop: "12px",
    },
    label: {
      fontSize: "13px",
      color: SUB,
      fontWeight: 600,
    },
    input: {
      width: "100%",
      height: "48px",
      borderRadius: "14px",
      border: `1px solid ${BORDER}`,
      background: "#ffffff",
      padding: "0 14px",
      fontSize: "14px",
      color: TEXT,
      outline: "none",
      boxSizing: "border-box",
    },
    textarea: {
      width: "100%",
      minHeight: "120px",
      borderRadius: "14px",
      border: `1px solid ${BORDER}`,
      background: "#ffffff",
      padding: "14px",
      fontSize: "14px",
      color: TEXT,
      outline: "none",
      resize: "vertical",
      lineHeight: 1.7,
      boxSizing: "border-box",
    },
    message: {
      marginTop: "14px",
      padding: "12px 14px",
      borderRadius: "12px",
      fontSize: "13px",
      fontWeight: 600,
      lineHeight: 1.6,
      border: "1px solid #ffd8d8",
      background: "#fff5f5",
      color: "#dc2626",
    },
    actionRow: {
      marginTop: "18px",
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
      gap: "10px",
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
        <div style={styles.loadingWrap}>수정할 요청 정보를 불러오는 중입니다...</div>
      </div>
    );
  }

  if (!originalRequest || message === "본인이 작성한 요청만 수정할 수 있습니다.") {
    return (
      <div style={styles.page}>
        <div style={styles.loadingWrap}>
          {message || "수정할 요청 정보를 찾을 수 없습니다."}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.pageTitle}>요청 수정하기</h1>

        <div style={styles.card}>
          <div style={styles.heroCard}>
            <h2 style={styles.heroTitle}>등록한 요청 내용을 수정해보세요</h2>
            <div style={styles.heroSub}>
              제목, 카테고리, 공간 유형, 요청 내용, 희망 일정, 상세 설명을 수정할 수 있어요.
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>기본 정보</h3>
            <div style={styles.grid}>
              <div style={styles.field}>
                <label style={styles.label}>제목</label>
                <input
                  style={styles.input}
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="요청 제목을 입력해주세요"
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>카테고리</label>
                <input
                  style={styles.input}
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  placeholder="예: 전기/조명"
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>공간 유형</label>
                <input
                  style={styles.input}
                  value={form.placeType}
                  onChange={(e) => handleChange("placeType", e.target.value)}
                  placeholder="예: 가정집"
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>희망 일정</label>
                <input
                  style={styles.input}
                  value={form.schedule}
                  onChange={(e) => handleChange("schedule", e.target.value)}
                  placeholder="예: 가능한 빨리"
                />
              </div>
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>상세 내용</h3>

            <div style={styles.fullField}>
              <label style={styles.label}>도움이 필요한 내용</label>
              <input
                style={styles.input}
                value={form.issueType}
                onChange={(e) => handleChange("issueType", e.target.value)}
                placeholder="예: 콘센트 수리/교체"
              />
            </div>

            <div style={styles.fullField}>
              <label style={styles.label}>상세 설명</label>
              <textarea
                style={styles.textarea}
                value={form.detailText}
                onChange={(e) => handleChange("detailText", e.target.value)}
                placeholder="현재 상황을 자세히 적어주세요"
              />
            </div>
          </div>

          {message && <div style={styles.message}>{message}</div>}

          <div style={styles.actionRow}>
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
              취소하고 돌아가기
            </HoverButton>

            <HoverButton
              onClick={handleSave}
              disabled={!canSave || saving}
              baseStyle={styles.primaryBtn}
              hoverStyle={{
                background: BRAND_HOVER,
                transform: isMobile ? "none" : "translateY(-1px)",
                boxShadow: "0 10px 18px rgba(37, 99, 235, 0.20)",
              }}
            >
              {saving ? "저장 중..." : "수정 저장하기"}
            </HoverButton>
          </div>
        </div>
      </div>
    </div>
  );
}