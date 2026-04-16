import { useEffect, useRef, useState } from "react";

function LandingPage({
  onGoLogin,
  onGoSignup,
  onGoCreate,
  onGoMyRequests,
  onGoAllRequests,
  onGoAssignedRequests,
  onLogout,
  isLoggedIn,
  loginUser,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const profileRef = useRef(null);

  const isMobile = windowWidth <= 768;

  const displayName =
    loginUser?.username || loginUser?.name || loginUser?.email || "사용자";

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    const handleOutsideClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const moveToSection = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const closeAndRun = (action) => {
    setProfileOpen(false);
    setMobileMenuOpen(false);
    if (action) action();
  };

  const topMenuButton = {
    background: "none",
    border: "none",
    padding: "0",
    fontSize: "14px",
    fontWeight: "600",
    color: "#2f3438",
    cursor: "pointer",
    whiteSpace: "nowrap",
    letterSpacing: "-0.2px",
    fontFamily:
      '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const ghostButton = {
    border: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
    color: "#2f3438",
    borderRadius: "10px",
    padding: isMobile ? "10px 12px" : "10px 14px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontFamily:
      '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const primaryButton = {
    border: "none",
    background: "#35a2ff",
    color: "#ffffff",
    borderRadius: "6px",
    padding: isMobile ? "10px 14px" : "0 18px",
    height: isMobile ? "40px" : "38px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    whiteSpace: "nowrap",
    boxShadow: "none",
    fontFamily:
      '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const categoryItems = [
    { title: "전기", icon: "⚡", color: "#2563eb", bg: "#eef4ff" },
    { title: "설비", icon: "🛠️", color: "#0f766e", bg: "#ecfeff" },
    { title: "누수", icon: "💧", color: "#0284c7", bg: "#eff6ff" },
    { title: "도어락", icon: "🔐", color: "#7c3aed", bg: "#f5f3ff" },
    { title: "에어컨", icon: "❄️", color: "#2563eb", bg: "#eff6ff" },
    { title: "CCTV", icon: "📷", color: "#ea580c", bg: "#fff7ed" },
    { title: "간판", icon: "🪧", color: "#db2777", bg: "#fdf2f8" },
    { title: "기타", icon: "📦", color: "#475569", bg: "#f8fafc" },
  ];

  const featuredRequests = [
    {
      eyebrow: "빠른 접수",
      title: "전기 점검 · 차단기 문제",
      subtitle: "긴급한 전기 관련 요청을 빠르게 등록하고 흐름을 바로 확인",
      image: "⚡",
      bg: "linear-gradient(135deg, #eef4ff 0%, #dbeafe 100%)",
    },
    {
      eyebrow: "생활 수리",
      title: "누수 · 설비 · 배관 요청",
      subtitle: "반복적으로 자주 발생하는 생활 수리 항목을 한 번에 정리",
      image: "💧",
      bg: "linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)",
    },
    {
      eyebrow: "출입/보안",
      title: "도어락 · 출입문 수리",
      subtitle: "출입 관련 문제도 간단한 요청으로 바로 접수 가능",
      image: "🔐",
      bg: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
    },
    {
      eyebrow: "시설 장비",
      title: "냉난방 · CCTV · 간판",
      subtitle: "시설 장비 관련 요청을 더 체계적으로 관리",
      image: "📷",
      bg: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
    },
  ];

  const processCards = [
    {
      step: "01",
      title: "요청 등록",
      desc: "문제 상황과 필요한 작업을 짧고 명확하게 입력합니다.",
    },
    {
      step: "02",
      title: "작업자 확인",
      desc: "요청을 본 사람이 수락하고 진행 가능 여부를 확인합니다.",
    },
    {
      step: "03",
      title: "진행 상태 관리",
      desc: "접수, 배정, 진행, 완료 흐름을 한 화면에서 확인합니다.",
    },
  ];

  const storyCards = [
    {
      badge: "NEW",
      title: "최근 요청 이야기",
      desc: "자주 올라오는 요청 유형과 진행 흐름을 함께 볼 수 있습니다.",
    },
    {
      badge: "TIP",
      title: "작업 팁 모음",
      desc: "간단한 점검 요령과 유지보수 팁을 짧게 정리했습니다.",
    },
    {
      badge: "REVIEW",
      title: "이용 후기",
      desc: "사용자들이 남긴 진행 경험과 후기를 참고할 수 있습니다.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #fbfcfe 0%, #f5f7fb 52%, #fafbfd 100%)",
        color: "#111827",
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #ededed",
          fontFamily:
            '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: isMobile ? "0 20px" : "0 64px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              height: isMobile ? "60px" : "78px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "28px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? "16px" : "40px",
                minWidth: 0,
                flex: 1,
              }}
            >
              <button
                type="button"
                onClick={goTop}
                style={{
                  border: "none",
                  background: "none",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: isMobile ? "36px" : "42px",
                    height: isMobile ? "36px" : "42px",
                    borderRadius: "14px",
                    background: "#4DA3FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontWeight: "800",
                    fontSize: "14px",
                  }}
                >
                  ㄸ
                </div>

                <span
                  style={{
                    fontSize: isMobile ? "22px" : "23px",
                    fontWeight: "800",
                    color: "#2F80ED",
                    letterSpacing: "-0.5px",
                    whiteSpace: "nowrap",
                  }}
                >
                  뚝딱
                </span>
              </button>

              {!isMobile && (
                <nav
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "32px",
                  }}
                >
                  <button type="button" style={topMenuButton} onClick={goTop}>
                    홈
                  </button>
                  <button
                    type="button"
                    style={topMenuButton}
                    onClick={() => moveToSection("service-intro")}
                  >
                    서비스 소개
                  </button>
                  <button
                    type="button"
                    style={topMenuButton}
                    onClick={() => moveToSection("community-preview")}
                  >
                    커뮤니티
                  </button>
                </nav>
              )}
            </div>

            {!isMobile && !isLoggedIn && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "22px",
                  flexShrink: 0,
                  paddingLeft: "16px",
                }}
              >
                <button
                  type="button"
                  onClick={onGoLogin}
                  style={{
                    border: "none",
                    background: "none",
                    padding: 0,
                    color: "#2f3438",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                    fontFamily:
                      '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  }}
                >
                  로그인
                </button>

                <button
                  type="button"
                  onClick={onGoSignup}
                  style={{
                    border: "none",
                    background: "none",
                    padding: 0,
                    color: "#2f3438",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                    fontFamily:
                      '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  }}
                >
                  회원가입
                </button>

                <button
                  type="button"
                  onClick={onGoCreate}
                  style={{
                    ...primaryButton,
                    padding: "0 20px",
                    minWidth: "118px",
                  }}
                >
                  요청 등록
                </button>
              </div>
            )}

            {!isMobile && isLoggedIn && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "18px",
                  flexShrink: 0,
                  paddingLeft: "16px",
                }}
              >
                <button
                  type="button"
                  onClick={() => alert("알림 기능은 아직 준비 중입니다.")}
                  style={{
                    width: "24px",
                    height: "24px",
                    border: "none",
                    background: "transparent",
                    padding: 0,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-label="알림"
                  title="알림"
                >
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4.8 17.2C4.48 17.52 4.71 18 5.16 18H18.84C19.29 18 19.52 17.52 19.2 17.2L18 16Z"
                      fill="#2f3438"
                    />
                  </svg>
                </button>

                <div style={{ position: "relative" }} ref={profileRef}>
                  <button
                    type="button"
                    onClick={() => setProfileOpen((prev) => !prev)}
                    style={{
                      border: "none",
                      background: "none",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "#f1f5f9",
                        color: "#2563eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "700",
                        fontSize: "14px",
                      }}
                    >
                      {String(displayName).slice(0, 1)}
                    </div>

                    <span
                      style={{
                        fontSize: "13px",
                        color: "#8a8f94",
                      }}
                    >
                      ▾
                    </span>
                  </button>

                  {profileOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "52px",
                        right: 0,
                        width: "220px",
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "14px",
                        boxShadow: "0 14px 30px rgba(15, 23, 42, 0.08)",
                        padding: "10px",
                      }}
                    >
                      <DropdownButton onClick={() => closeAndRun(onGoMyRequests)}>
                        내 요청 목록
                      </DropdownButton>
                      <DropdownButton onClick={() => closeAndRun(onGoAllRequests)}>
                        전체 요청 보기
                      </DropdownButton>
                      <DropdownButton
                        onClick={() => closeAndRun(onGoAssignedRequests)}
                      >
                        맡은 작업 보기
                      </DropdownButton>
                      <DropdownButton
                        onClick={() => closeAndRun(onLogout)}
                        danger
                      >
                        로그아웃
                      </DropdownButton>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={onGoCreate}
                  style={{
                    ...primaryButton,
                    padding: "0 20px",
                    minWidth: "118px",
                    height: "38px",
                  }}
                >
                  요청 등록
                </button>
              </div>
            )}

            {isMobile && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flexShrink: 0,
                }}
              >
                {isLoggedIn ? (
                  <>
                    <button
                      type="button"
                      onClick={() => alert("알림 기능은 아직 준비 중입니다.")}
                      style={{
                        width: "24px",
                        height: "24px",
                        border: "none",
                        background: "transparent",
                        padding: 0,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      aria-label="알림"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4.8 17.2C4.48 17.52 4.71 18 5.16 18H18.84C19.29 18 19.52 17.52 19.2 17.2L18 16Z"
                          fill="#2f3438"
                        />
                      </svg>
                    </button>

                    <div style={{ position: "relative" }} ref={profileRef}>
                      <button
                        type="button"
                        onClick={() => setProfileOpen((prev) => !prev)}
                        style={{
                          width: "34px",
                          height: "34px",
                          borderRadius: "50%",
                          border: "none",
                          background: "#f1f5f9",
                          color: "#2563eb",
                          cursor: "pointer",
                          padding: 0,
                          fontWeight: "700",
                          fontSize: "12px",
                        }}
                      >
                        {String(displayName).slice(0, 1)}
                      </button>

                      {profileOpen && (
                        <div
                          style={{
                            position: "absolute",
                            top: "42px",
                            right: 0,
                            width: "210px",
                            backgroundColor: "#ffffff",
                            border: "1px solid #e5e7eb",
                            borderRadius: "14px",
                            boxShadow: "0 14px 30px rgba(15, 23, 42, 0.08)",
                            padding: "10px",
                          }}
                        >
                          <DropdownButton
                            onClick={() => closeAndRun(onGoMyRequests)}
                          >
                            내 요청 목록
                          </DropdownButton>
                          <DropdownButton
                            onClick={() => closeAndRun(onGoAllRequests)}
                          >
                            전체 요청 보기
                          </DropdownButton>
                          <DropdownButton
                            onClick={() => closeAndRun(onGoAssignedRequests)}
                          >
                            맡은 작업 보기
                          </DropdownButton>
                          <DropdownButton
                            onClick={() => closeAndRun(onLogout)}
                            danger
                          >
                            로그아웃
                          </DropdownButton>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={onGoCreate}
                      style={{
                        ...primaryButton,
                        padding: "0 12px",
                        height: "36px",
                        fontSize: "13px",
                      }}
                    >
                      요청
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={onGoLogin}
                      style={{
                        border: "none",
                        background: "none",
                        padding: 0,
                        color: "#2f3438",
                        fontSize: "13px",
                        fontWeight: "500",
                        cursor: "pointer",
                        fontFamily:
                          '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                      }}
                    >
                      로그인
                    </button>

                    <button
                      type="button"
                      onClick={onGoSignup}
                      style={{
                        border: "none",
                        background: "none",
                        padding: 0,
                        color: "#2f3438",
                        fontSize: "13px",
                        fontWeight: "500",
                        cursor: "pointer",
                        fontFamily:
                          '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                      }}
                    >
                      회원가입
                    </button>

                    <button
                      type="button"
                      onClick={onGoCreate}
                      style={{
                        ...primaryButton,
                        padding: "0 12px",
                        height: "36px",
                        fontSize: "13px",
                      }}
                    >
                      요청
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "28px 16px 24px" : "48px 24px 34px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: isMobile ? "22px" : "28px",
          }}
        >
          <h1
            style={{
              margin: "0 0 14px 0",
              fontSize: isMobile ? "30px" : "clamp(34px, 4vw, 52px)",
              lineHeight: "1.18",
              letterSpacing: isMobile ? "-0.8px" : "-1.4px",
              fontWeight: "800",
              color: "#0f172a",
            }}
          >
            어떤 유지보수 서비스가
            <br />
            필요하신가요?
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: isMobile ? "14px" : "15px",
              lineHeight: "1.85",
              color: "#64748b",
            }}
          >
            전기, 설비, 누수, 도어락, 장비 문제까지
            <br />
            필요한 수리를 한 곳에서 더 빠르게 요청하세요.
          </p>
        </div>

        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto 22px",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "56px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              boxShadow: "0 12px 24px rgba(15, 23, 42, 0.04)",
              display: "flex",
              alignItems: "center",
              padding: "0 18px",
              color: "#94a3b8",
              fontSize: "14px",
              fontWeight: "500",
              textAlign: "left",
            }}
          >
            어떤 유지보수가 필요하신가요?
          </div>

          <button
            type="button"
            onClick={onGoCreate}
            style={{
              ...primaryButton,
              height: "56px",
              borderRadius: "16px",
              width: isMobile ? "100%" : "auto",
              padding: "0 22px",
            }}
          >
            {isLoggedIn ? "바로 요청하기" : "로그인 후 요청"}
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(4, 1fr)"
              : "repeat(8, minmax(0, 1fr))",
            gap: isMobile ? "12px" : "16px",
            maxWidth: "1080px",
            margin: "0 auto",
          }}
        >
          {categoryItems.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={onGoCreate}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                padding: 0,
              }}
            >
              <div
                style={{
                  width: isMobile ? "52px" : "58px",
                  height: isMobile ? "52px" : "58px",
                  borderRadius: "18px",
                  backgroundColor: item.bg,
                  color: item.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: isMobile ? "22px" : "24px",
                  boxShadow: "0 8px 18px rgba(15, 23, 42, 0.04)",
                }}
              >
                {item.icon}
              </div>

              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#334155",
                }}
              >
                {item.title}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "0 16px 30px" : "0 24px 42px",
        }}
      >
        <SectionHeader
          title="지금 많이 찾는 요청"
          desc="자주 등록되는 요청을 더 빠르게 확인하고 바로 접수할 수 있습니다."
          isMobile={isMobile}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(4, minmax(0, 1fr))",
            gap: "16px",
          }}
        >
          {featuredRequests.map((card) => (
            <div
              key={card.title}
              style={{
                borderRadius: "24px",
                overflow: "hidden",
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                boxShadow: "0 16px 30px rgba(15, 23, 42, 0.04)",
              }}
            >
              <div
                style={{
                  minHeight: "168px",
                  padding: "20px",
                  background: card.bg,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "inline-block",
                      padding: "7px 10px",
                      borderRadius: "999px",
                      backgroundColor: "rgba(255,255,255,0.78)",
                      fontSize: "11px",
                      fontWeight: "900",
                      color: "#475569",
                      marginBottom: "14px",
                    }}
                  >
                    {card.eyebrow}
                  </div>

                  <div
                    style={{
                      fontSize: "18px",
                      lineHeight: "1.4",
                      fontWeight: "800",
                      letterSpacing: "-0.4px",
                      color: "#0f172a",
                      marginBottom: "8px",
                    }}
                  >
                    {card.title}
                  </div>

                  <div
                    style={{
                      fontSize: "14px",
                      lineHeight: "1.75",
                      color: "#475569",
                    }}
                  >
                    {card.subtitle}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    fontSize: "28px",
                  }}
                >
                  {card.image}
                </div>
              </div>

              <div
                style={{
                  padding: "16px 18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    color: "#64748b",
                  }}
                >
                  요청 바로가기
                </span>

                <button
                  type="button"
                  onClick={onGoCreate}
                  style={{
                    ...ghostButton,
                    padding: "9px 14px",
                    fontSize: "13px",
                  }}
                >
                  보기
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="service-intro"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "0 16px 32px" : "0 24px 46px",
        }}
      >
        <SectionHeader
          title="서비스 소개"
          desc="요청 등록부터 작업 수락, 상태 확인까지 이어지는 흐름을 간단하게 사용할 수 있습니다."
          isMobile={isMobile}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
            gap: "16px",
          }}
        >
          {processCards.map((item) => (
            <div
              key={item.step}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "24px",
                padding: "24px",
                boxShadow: "0 16px 30px rgba(15, 23, 42, 0.04)",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "14px",
                  background: "#4DA3FF",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: "900",
                  marginBottom: "18px",
                }}
              >
                {item.step}
              </div>

              <h3
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "18px",
                  fontWeight: "800",
                  letterSpacing: "-0.3px",
                  color: "#0f172a",
                  lineHeight: "1.4",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: "1.85",
                  color: "#64748b",
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="community-preview"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "0 16px 76px" : "0 24px 86px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "flex-end",
            flexDirection: isMobile ? "column" : "row",
            gap: "16px",
            marginBottom: "22px",
          }}
        >
          <SectionHeader
            title="커뮤니티"
            desc="요청 이야기, 작업 팁, 이용 후기를 함께 보고 서비스 흐름을 이해할 수 있습니다."
            isMobile={isMobile}
            noMargin
          />

          <button
            type="button"
            style={ghostButton}
            onClick={() => moveToSection("community-preview")}
          >
            커뮤니티 더 보기
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
            gap: "16px",
          }}
        >
          {storyCards.map((item) => (
            <div
              key={item.title}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "24px",
                padding: "24px",
                boxShadow: "0 16px 30px rgba(15, 23, 42, 0.04)",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "7px 11px",
                  borderRadius: "999px",
                  backgroundColor: "#eef2ff",
                  color: "#4f46e5",
                  fontSize: "11px",
                  fontWeight: "900",
                  marginBottom: "14px",
                }}
              >
                {item.badge}
              </div>

              <h3
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "18px",
                  fontWeight: "800",
                  letterSpacing: "-0.3px",
                  color: "#0f172a",
                  lineHeight: "1.4",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: "1.9",
                  color: "#64748b",
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer
        style={{
          borderTop: "1px solid #e7edf5",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: isMobile ? "28px 16px 34px" : "34px 24px 40px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1.5fr 1fr 1fr",
              gap: "24px",
              alignItems: "start",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "12px",
                    background: "#4DA3FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontWeight: "900",
                    fontSize: "14px",
                  }}
                >
                  ㄸ
                </div>

                <div
                  style={{
                    fontSize: "21px",
                    fontWeight: "900",
                    color: "#2F80ED",
                    letterSpacing: "-0.5px",
                  }}
                >
                  뚝딱
                </div>
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: "1.9",
                  color: "#64748b",
                  maxWidth: "360px",
                }}
              >
                유지보수 요청을 더 간단하고 빠르게 접수하고 상태를 체계적으로
                관리하기 위한 서비스 플랫폼
              </p>
            </div>

            <FooterColumn
              title="메뉴"
              items={["홈", "서비스 소개", "커뮤니티"]}
            />
            <FooterColumn
              title="서비스"
              items={["요청 접수", "상태 확인", "담당자 연결"]}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}

function DropdownButton({ children, onClick, danger = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        border: "none",
        background: danger ? "#fff5f5" : "none",
        padding: "12px 12px",
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: "700",
        cursor: "pointer",
        color: danger ? "#ef4444" : "#1e293b",
        marginTop: danger ? "6px" : 0,
      }}
    >
      {children}
    </button>
  );
}

function SectionHeader({ title, desc, isMobile, noMargin = false }) {
  return (
    <div
      style={{
        marginBottom: noMargin ? 0 : "22px",
      }}
    >
      <h2
        style={{
          margin: "0 0 10px 0",
          fontSize: isMobile ? "26px" : "30px",
          fontWeight: "800",
          letterSpacing: "-0.8px",
          color: "#0f172a",
          lineHeight: "1.25",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          margin: 0,
          fontSize: "15px",
          lineHeight: "1.8",
          color: "#64748b",
          maxWidth: "680px",
        }}
      >
        {desc}
      </p>
    </div>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <div
        style={{
          fontSize: "14px",
          fontWeight: "800",
          color: "#111827",
          marginBottom: "12px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {items.map((item) => (
          <div
            key={item}
            style={{
              fontSize: "14px",
              color: "#64748b",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;