import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient.js";
import "../index.css";

function RequestCreatePage({ onGoHome }) {
  const navigate = useNavigate();


  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const savedUser = localStorage.getItem("loginUser");
  const loginUser = savedUser ? JSON.parse(savedUser) : null;

  const isMobile = windowWidth <= 900;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginUser) {
      setMessage("로그인 정보가 없습니다.");
      return;
    }

    if (!title.trim() || !category.trim() || !location.trim() || !content.trim()) {
      setMessage("모든 칸을 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      setMessage("");

      const { error } = await supabase.from("requests").insert([
        {
          user_id: loginUser.id,
          title: title.trim(),
          category: category.trim(),
          location: location.trim(),
          content: content.trim(),
          status: "요청 등록",
          assigned_user_id: null,
        },
      ]);

      if (error) throw error;

      setMessage("요청 등록이 완료되었습니다.");
      setTitle("");
      setCategory("");
      setLocation("");
      setContent("");
    } catch (error) {
      console.error(error);
      setMessage(error.message || "요청 등록 중 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
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
    sideWrap: {
      display: "grid",
      gap: "14px",
    },
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
    dot: {
      width: "7px",
      height: "7px",
      borderRadius: "50%",
      background: "#2563eb",
    },
    title: {
      margin: 0,
      fontSize: isMobile ? "34px" : "52px",
      lineHeight: "1.14",
      letterSpacing: isMobile ? "-1px" : "-1.8px",
      fontWeight: "900",
      color: "#0f172a",
    },
    desc: {
      margin: "16px 0 0",
      fontSize: isMobile ? "14px" : "16px",
      lineHeight: "1.9",
      color: "#64748b",
    },
    note: {
      marginTop: "12px",
      fontSize: "13px",
      lineHeight: "1.8",
      color: "#94a3b8",
    },
    formGrid: {
      display: "grid",
      gap: "18px",
      marginTop: "28px",
    },
    fieldCard: {
      background: "#f8fbff",
      border: "1px solid #e3eaf5",
      borderRadius: "24px",
      padding: isMobile ? "18px 16px" : "20px",
    },
    fieldTop: {
      display: "flex",
      alignItems: isMobile ? "flex-start" : "center",
      justifyContent: "space-between",
      gap: "10px",
      flexDirection: isMobile ? "column" : "row",
      marginBottom: "12px",
    },
    fieldLabel: {
      fontSize: "17px",
      fontWeight: "800",
      color: "#0f172a",
      letterSpacing: "-0.2px",
    },
    fieldSub: {
      fontSize: "12px",
      color: "#94a3b8",
      lineHeight: "1.6",
    },
    input: {
      width: "100%",
      height: "56px",
      border: "1px solid #d7deea",
      borderRadius: "18px",
      padding: "0 18px",
      fontSize: "15px",
      outline: "none",
      background: "#ffffff",
    },
    textarea: {
      width: "100%",
      minHeight: "170px",
      border: "1px solid #d7deea",
      borderRadius: "18px",
      padding: "16px 18px",
      fontSize: "15px",
      outline: "none",
      background: "#ffffff",
      resize: "vertical",
      lineHeight: "1.8",
    },
    tip: {
      marginTop: "10px",
      fontSize: "12px",
      color: "#94a3b8",
      lineHeight: "1.7",
    },
    actionRow: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
      marginTop: "4px",
    },
    submitBtn: {
      flex: isMobile ? "1 1 100%" : "0 0 auto",
      minWidth: isMobile ? "100%" : "180px",
      height: "54px",
      border: "none",
      borderRadius: "16px",
      background: "linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)",
      color: "#ffffff",
      fontSize: "16px",
      fontWeight: "800",
      cursor: "pointer",
      boxShadow: "0 14px 28px rgba(37, 99, 235, 0.18)",
    },
    subtleBtn: {
      flex: isMobile ? "1 1 100%" : "0 0 auto",
      minWidth: isMobile ? "100%" : "180px",
      height: "54px",
      border: "1px solid #dbe4f2",
      borderRadius: "16px",
      background: "#ffffff",
      color: "#475569",
      fontSize: "15px",
      fontWeight: "700",
      cursor: "pointer",
    },
    sideHero: {
      borderRadius: "24px",
      padding: "22px",
      background: "linear-gradient(145deg, #1e3a8a 0%, #2563eb 55%, #4f46e5 100%)",
      color: "#ffffff",
      boxShadow: "0 20px 38px rgba(37, 99, 235, 0.18)",
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
            <div style={styles.heroBadge}>
              <span style={styles.dot} />
              요청 등록
            </div>

            <h1 style={styles.title}>필요한 작업을 등록해보세요</h1>

            <p style={styles.desc}>
              문제 상황을 간단히 적어두면 요청이 바로 등록됩니다.
              <br />
              제목, 카테고리, 장소, 내용을 순서대로 입력하면 됩니다.
            </p>

            <div style={styles.note}>
              너무 길게 쓰지 않아도 괜찮아요. 어떤 문제인지, 어디인지,
              얼마나 급한지만 적어도 충분합니다.
            </div>

            <form onSubmit={handleSubmit} style={styles.formGrid}>
              <div style={styles.fieldCard}>
                <div style={styles.fieldTop}>
                  <div style={styles.fieldLabel}>제목</div>
                  <div style={styles.fieldSub}>한 줄로 핵심만 적으면 됩니다</div>
                </div>

                <input
                  style={styles.input}
                  type="text"
                  placeholder="예: 사무실 형광등 교체 요청"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <div style={styles.tip}>
                  예: 전등 교체, 누수 점검, 출입문 수리처럼 바로 이해되게 적으면 좋아요.
                </div>
              </div>

              <div style={styles.fieldCard}>
                <div style={styles.fieldTop}>
                  <div style={styles.fieldLabel}>카테고리</div>
                  <div style={styles.fieldSub}>전기 / 설비 / 누수 등 분류</div>
                </div>

                <input
                  style={styles.input}
                  type="text"
                  placeholder="예: 전기 / 설비 / 누수"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div style={styles.fieldCard}>
                <div style={styles.fieldTop}>
                  <div style={styles.fieldLabel}>장소</div>
                  <div style={styles.fieldSub}>위치를 자세히 적어주세요</div>
                </div>

                <input
                  style={styles.input}
                  type="text"
                  placeholder="예: 서울 강남구 / 건물 3층 회의실"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div style={styles.fieldCard}>
                <div style={styles.fieldTop}>
                  <div style={styles.fieldLabel}>내용</div>
                  <div style={styles.fieldSub}>현재 상황을 설명해주세요</div>
                </div>

                <textarea
                  style={styles.textarea}
                  placeholder="현재 어떤 문제가 있는지 자세히 적어주세요."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />

                <div style={styles.tip}>
                  예: 언제부터 문제가 있었는지, 어느 위치인지, 얼마나 급한지 함께 적으면 더 좋아요.
                </div>
              </div>

              {message && (
                <div
                  className={`message ${
                    message.includes("완료") ? "success" : "error"
                  }`}
                >
                  {message}
                </div>
              )}

              <div style={styles.actionRow}>
                <button type="submit" style={styles.submitBtn} disabled={isLoading}>
                  {isLoading ? "등록 중..." : "요청 등록하기"}
                </button>

                <button type="button" style={styles.subtleBtn} onClick={onGoHome}>
                  취소하고 돌아가기
                </button>
              </div>
            </form>
          </div>

          <div style={styles.sideWrap}>
            <div style={styles.sideHero}>
              <p style={styles.sideHeroLabel}>등록 안내</p>
              <span style={styles.sideHeroBig}>3단계 입력</span>
              <p style={styles.sideHeroText}>
                제목, 위치, 내용만 정리해도
                <br />
                바로 요청을 시작할 수 있습니다.
              </p>
            </div>

            <div style={styles.sideSoft}>
              <p style={styles.sideSoftLabel}>현재 상태</p>
              <strong style={styles.sideSoftTitle}>요청 등록 전</strong>
              <p style={styles.sideSoftText}>
                등록 후에는 내 요청 목록에서 상태를 바로 확인할 수 있습니다.
              </p>
            </div>

            <div style={styles.sideSoft}>
              <p style={styles.sideSoftLabel}>작성 팁</p>
              <strong style={styles.sideSoftTitle}>짧아도 괜찮아요</strong>
              <p style={styles.sideSoftText}>
                어떤 문제가 생겼는지, 어느 위치인지, 얼마나 급한지 같이 적으면 더 좋아요.
              </p>
            </div>

            <div style={styles.sideSoft}>
              <p style={styles.sideSoftLabel}>진행 흐름</p>
              <strong style={styles.sideSoftTitle}>등록 → 확인 → 진행</strong>
              <p style={styles.sideSoftText}>
                요청 등록 후 작업자 확인, 진행, 완료 순서로 이어집니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestCreatePage;