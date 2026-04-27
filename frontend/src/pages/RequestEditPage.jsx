import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient.js";

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

function parseDescription(description) {
  const raw = description || "";
  const lines = raw.split("\n");

  const getValue = (label) => {
    return (
      lines
        .find((line) => line.startsWith(label))
        ?.replace(label, "")
        .trim() || ""
    );
  };

  return {
    placeType: getValue("공간 유형:"),
    issueType: getValue("도움이 필요한 내용:"),
    schedule: getValue("희망 일정:"),
    detailText: getValue("상세 설명:"),
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

function Field({ label, children, styles }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

export default function RequestEditPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loginUser, setLoginUser] = useState(null);
  const [originalRequest, setOriginalRequest] = useState(
    location.state?.request || null,
  );
  const [message, setMessage] = useState("");
  const [windowWidth, setWindowWidth] = useState(getWindowWidth);

  const [form, setForm] = useState({
    title: "",
    category: "",
    placeType: "",
    issueType: "",
    schedule: "",
    detailText: "",
  });

  const isMobile = windowWidth <= 900;
  const isSmallMobile = windowWidth <= 480;

  const categoryOptions = [
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

        const requestOwnerId = requestData?.user_id
          ? String(requestData.user_id)
          : "";
        const loginUserId = user?.id ? String(user.id) : "";

        if (!requestOwnerId || !loginUserId || requestOwnerId !== loginUserId) {
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

      const content = buildDescription({
        placeType: form.placeType.trim(),
        issueType: form.issueType.trim(),
        schedule: form.schedule.trim(),
        detailText: form.detailText.trim(),
      });

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

  const handleGoLogin = () => {
    navigate("/login");
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
      maxWidth: "980px",
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
    card: {
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
      marginBottom: "18px",
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
      fontSize: isMobile ? "22px" : "27px",
      fontWeight: 850,
      color: TEXT,
      lineHeight: 1.35,
      letterSpacing: "-0.6px",
      wordBreak: "keep-all",
    },
    heroSub: {
      marginTop: "10px",
      fontSize: isMobile ? "13px" : "14px",
      lineHeight: 1.7,
      color: SUB,
      fontWeight: 500,
      wordBreak: "keep-all",
    },
    section: {
      marginTop: "20px",
    },
    sectionTitle: {
      margin: "0 0 12px",
      fontSize: isMobile ? "17px" : "18px",
      fontWeight: 850,
      color: TEXT,
      letterSpacing: "-0.25px",
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
      color: "#334155",
      fontWeight: 800,
    },
    input: {
      width: "100%",
      height: "50px",
      borderRadius: "14px",
      border: `1px solid ${BORDER}`,
      background: "#FFFFFF",
      padding: "0 14px",
      fontSize: "14px",
      color: TEXT,
      outline: "none",
      outlineOffset: 0,
      boxSizing: "border-box",
      WebkitAppearance: "none",
      appearance: "none",
    },
    select: {
      width: "100%",
      height: "50px",
      borderRadius: "14px",
      border: `1px solid ${BORDER}`,
      background: "#FFFFFF",
      padding: "0 14px",
      fontSize: "14px",
      color: TEXT,
      outline: "none",
      outlineOffset: 0,
      boxSizing: "border-box",
      WebkitAppearance: "none",
      appearance: "none",
    },
    textarea: {
      width: "100%",
      minHeight: isMobile ? "140px" : "160px",
      borderRadius: "14px",
      border: `1px solid ${BORDER}`,
      background: "#FFFFFF",
      padding: "14px",
      fontSize: "14px",
      color: TEXT,
      outline: "none",
      outlineOffset: 0,
      resize: "vertical",
      lineHeight: 1.7,
      boxSizing: "border-box",
      WebkitAppearance: "none",
      appearance: "none",
    },
    guideBox: {
      marginTop: "12px",
      padding: "13px 14px",
      borderRadius: "14px",
      background: SOFT,
      border: `1px solid ${BORDER}`,
      color: SUB,
      fontSize: "13px",
      lineHeight: 1.7,
      fontWeight: 550,
      wordBreak: "keep-all",
      boxSizing: "border-box",
    },
    message: {
      marginTop: "14px",
      padding: "12px 14px",
      borderRadius: "12px",
      fontSize: "13px",
      fontWeight: 700,
      lineHeight: 1.6,
      border: "1px solid #FFD8D8",
      background: "#FFF5F5",
      color: "#DC2626",
      wordBreak: "keep-all",
      boxSizing: "border-box",
    },
    actionRow: {
      marginTop: "18px",
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
      gap: "10px",
    },
    secondaryBtn: {
      width: "100%",
      minHeight: "50px",
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
        "background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease",
      boxSizing: "border-box",
    },
    primaryBtn: {
      width: "100%",
      minHeight: "50px",
      border: "1px solid transparent",
      borderRadius: "14px",
      background: BRAND,
      color: "#FFFFFF",
      fontSize: "15px",
      fontWeight: 800,
      cursor: "pointer",
      outline: "none",
      outlineOffset: 0,
      boxShadow: "0 10px 22px rgba(47, 128, 237, 0.18)",
      transition:
        "background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease",
      boxSizing: "border-box",
    },
    dangerBtn: {
      width: "100%",
      minHeight: "50px",
      border: "1px solid transparent",
      borderRadius: "14px",
      background: DANGER,
      color: "#FFFFFF",
      fontSize: "15px",
      fontWeight: 800,
      cursor: "pointer",
      outline: "none",
      outlineOffset: 0,
      boxShadow: "0 10px 22px rgba(239, 68, 68, 0.16)",
      transition:
        "background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease",
      boxSizing: "border-box",
    },
    loadingWrap: {
      maxWidth: "900px",
      margin: "40px auto",
      background: "#FFFFFF",
      border: `1px solid ${BORDER}`,
      borderRadius: "20px",
      padding: isMobile ? "24px 18px" : "30px",
      textAlign: "center",
      fontSize: "15px",
      fontWeight: 700,
      color: SUB,
      lineHeight: 1.7,
      boxSizing: "border-box",
    },
    loadingAction: {
      marginTop: "16px",
      display: "grid",
      gap: "10px",
      maxWidth: "260px",
      marginLeft: "auto",
      marginRight: "auto",
    },
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.loadingWrap}>
          수정할 요청 정보를 불러오는 중입니다...
        </div>
      </div>
    );
  }

  if (!originalRequest) {
    const needLogin = message.includes("로그인");

    return (
      <div style={styles.page}>
        <div style={styles.loadingWrap}>
          {message || "수정할 요청 정보를 찾을 수 없습니다."}

          <div style={styles.loadingAction}>
            {needLogin && (
              <HoverButton
                onClick={handleGoLogin}
                baseStyle={styles.primaryBtn}
                hoverStyle={{
                  background: BRAND_HOVER,
                  boxShadow: "0 12px 24px rgba(31, 111, 214, 0.22)",
                }}
              >
                로그인하러 가기
              </HoverButton>
            )}

            <HoverButton
              onClick={() => navigate("/requests/my")}
              baseStyle={styles.secondaryBtn}
              hoverStyle={{
                color: BRAND,
              }}
            >
              내 요청 목록으로 돌아가기
            </HoverButton>
          </div>
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
            <div style={styles.eyebrow}>요청 내용 수정</div>
            <h2 style={styles.heroTitle}>등록한 요청 내용을 다시 정리해요</h2>
            <div style={styles.heroSub}>
              제목, 카테고리, 공간 유형, 요청 내용, 희망 일정, 상세 설명을
              수정할 수 있어요.
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>기본 정보</h3>

            <div style={styles.grid}>
              <Field label="제목" styles={styles}>
                <input
                  style={styles.input}
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="요청 제목을 입력해주세요"
                />
              </Field>

              <Field label="카테고리" styles={styles}>
                <select
                  style={styles.select}
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                >
                  <option value="">카테고리를 선택해주세요</option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="공간 유형" styles={styles}>
                <input
                  style={styles.input}
                  value={form.placeType}
                  onChange={(e) => handleChange("placeType", e.target.value)}
                  placeholder="예: 가정집, 상가/매장, 사무실"
                />
              </Field>

              <Field label="희망 일정" styles={styles}>
                <input
                  style={styles.input}
                  value={form.schedule}
                  onChange={(e) => handleChange("schedule", e.target.value)}
                  placeholder="예: 가능한 빨리, 이번 주말, 2주 이내"
                />
              </Field>
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

            <div style={styles.guideBox}>
              필수 항목은 제목, 카테고리, 공간 유형, 도움이 필요한 내용, 희망
              일정이에요.
            </div>
          </div>

          {message && <div style={styles.message}>{message}</div>}

          <div style={styles.actionRow}>
            <HoverButton
              onClick={handleBack}
              baseStyle={styles.secondaryBtn}
              hoverStyle={{
                color: BRAND,
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
                boxShadow: "0 12px 24px rgba(31, 111, 214, 0.22)",
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