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
  const isTablet = windowWidth <= 1024;

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
    padding: 0,
    fontSize: "15px",
    fontWeight: "700",
    color: "#111827",
    cursor: "pointer",
    whiteSpace: "nowrap",
  };

  const ghostButton = {
    border: "1px solid #dbe4f2",
    backgroundColor: "#ffffff",
    color: "#1e293b",
    borderRadius: "12px",
    padding: isMobile ? "10px 13px" : "11px 16px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    whiteSpace: "nowrap",
  };

  const primaryButton = {
    border: "none",
    background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
    color: "#ffffff",
    borderRadius: "12px",
    padding: isMobile ? "11px 14px" : "12px 18px",
    fontSize: "14px",
    fontWeight: "800",
    cursor: "pointer",
    whiteSpace: "nowrap",
    boxShadow: "0 14px 28px rgba(37, 99, 235, 0.18)",
  };

  const chipButton = {
    border: "1px solid #dbe4f2",
    backgroundColor: "#ffffff",
    color: "#334155",
    borderRadius: "999px",
    padding: "9px 13px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    whiteSpace: "nowrap",
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
      {/* 헤더 */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid #e7edf5",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: isMobile ? "14px 16px" : "16px 24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <div
              onClick={goTop}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: isMobile ? "38px" : "42px",
                  height: isMobile ? "38px" : "42px",
                  borderRadius: "14px",
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #6366f1 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontWeight: "900",
                  fontSize: isMobile ? "14px" : "15px",
                  boxShadow: "0 10px 22px rgba(37, 99, 235, 0.18)",
                }}
              >
                ㄸ
              </div>

              <div
                style={{
                  fontSize: isMobile ? "22px" : "24px",
                  fontWeight: "900",
                  color: "#2563eb",
                  letterSpacing: "-0.7px",
                }}
              >
                뚝딱
              </div>
            </div>

            {!isMobile && (
              <>
                <nav
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "28px",
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

                {!isLoggedIn ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={onGoLogin}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#111827",
                        fontSize: "14px",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                    >
                      로그인
                    </button>

                    <span style={{ color: "#cbd5e1" }}>/</span>

                    <button
                      type="button"
                      onClick={onGoSignup}
                      style={primaryButton}
                    >
                      회원가입
                    </button>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={onGoCreate}
                      style={primaryButton}
                    >
                      요청 등록
                    </button>

                    <div style={{ position: "relative" }} ref={profileRef}>
                      <button
                        type="button"
                        onClick={() => setProfileOpen((prev) => !prev)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          border: "1px solid #dbe4f2",
                          backgroundColor: "#ffffff",
                          borderRadius: "999px",
                          padding: "7px 12px 7px 8px",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            width: "34px",
                            height: "34px",
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "800",
                            fontSize: "12px",
                          }}
                        >
                          {String(displayName).slice(0, 1)}
                        </div>

                        <div style={{ textAlign: "left", lineHeight: 1.2 }}>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: "800",
                              color: "#111827",
                            }}
                          >
                            {displayName}님
                          </div>
                          <div
                            style={{
                              fontSize: "11px",
                              color: "#94a3b8",
                              marginTop: "2px",
                            }}
                          >
                            내 메뉴
                          </div>
                        </div>

                        <span
                          style={{
                            fontSize: "12px",
                            color: "#64748b",
                          }}
                        >
                          ▾
                        </span>
                      </button>

                      {profileOpen && (
                        <div
                          style={{
                            position: "absolute",
                            top: "56px",
                            right: 0,
                            width: "220px",
                            backgroundColor: "#ffffff",
                            border: "1px solid #e2e8f0",
                            borderRadius: "18px",
                            boxShadow: "0 20px 40px rgba(15, 23, 42, 0.12)",
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
                          <DropdownButton onClick={() => closeAndRun(onLogout)} danger>
                            로그아웃
                          </DropdownButton>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {isMobile && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {isLoggedIn ? (
                  <>
                    <button
                      type="button"
                      onClick={onGoCreate}
                      style={{
                        ...primaryButton,
                        padding: "10px 12px",
                        fontSize: "13px",
                      }}
                    >
                      요청
                    </button>

                    <div style={{ position: "relative" }} ref={profileRef}>
                      <button
                        type="button"
                        onClick={() => setProfileOpen((prev) => !prev)}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          border: "1px solid #dbe4f2",
                          backgroundColor: "#ffffff",
                          cursor: "pointer",
                          padding: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "800",
                            fontSize: "12px",
                          }}
                        >
                          {String(displayName).slice(0, 1)}
                        </div>
                      </button>

                      {profileOpen && (
                        <div
                          style={{
                            position: "absolute",
                            top: "50px",
                            right: 0,
                            width: "210px",
                            backgroundColor: "#ffffff",
                            border: "1px solid #e2e8f0",
                            borderRadius: "18px",
                            boxShadow: "0 20px 40px rgba(15, 23, 42, 0.12)",
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
                          <DropdownButton onClick={() => closeAndRun(onLogout)} danger>
                            로그아웃
                          </DropdownButton>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={onGoLogin}
                    style={{
                      ...ghostButton,
                      padding: "9px 12px",
                      fontSize: "13px",
                    }}
                  >
                    로그인
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "14px",
                    border: "1px solid #dbe4f2",
                    backgroundColor: "#ffffff",
                    cursor: "pointer",
                  }}
                >
                  ☰
                </button>
              </div>
            )}
          </div>

          {isMobile && mobileMenuOpen && (
            <div
              style={{
                marginTop: "14px",
                borderTop: "1px solid #eef2f7",
                paddingTop: "14px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
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

              {!isLoggedIn && (
                <button
                  type="button"
                  onClick={() => closeAndRun(onGoSignup)}
                  style={primaryButton}
                >
                  회원가입
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* 메인 검색 영역 */}
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
              margin: "0 0 16px 0",
              fontSize: isMobile ? "30px" : "48px",
              lineHeight: "1.2",
              letterSpacing: isMobile ? "-1px" : "-1.8px",
              fontWeight: "900",
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
              fontSize: isMobile ? "14px" : "16px",
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
              height: "58px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              boxShadow: "0 12px 24px rgba(15, 23, 42, 0.04)",
              display: "flex",
              alignItems: "center",
              padding: "0 18px",
              color: "#94a3b8",
              fontSize: "14px",
              fontWeight: "600",
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
              height: "58px",
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
                  fontSize: "13px",
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

      {/* 많이 찾는 요청 */}
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
                      fontSize: "24px",
                      lineHeight: "1.35",
                      fontWeight: "900",
                      letterSpacing: "-0.5px",
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

      {/* 서비스 소개 */}
      <section
        id="service-intro"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "0 16px 30px" : "0 24px 44px",
        }}
      >
        <SectionHeader
          title="서비스 이용 흐름"
          desc="처음 이용하는 사람도 어렵지 않게 접수부터 완료까지 확인할 수 있습니다."
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
                  borderRadius: "16px",
                  backgroundColor: "#eef4ff",
                  color: "#2563eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "900",
                  fontSize: "13px",
                  marginBottom: "16px",
                }}
              >
                {item.step}
              </div>

              <h3
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "22px",
                  fontWeight: "900",
                  letterSpacing: "-0.3px",
                  color: "#0f172a",
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

      {/* 커뮤니티 */}
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
                  fontSize: "22px",
                  fontWeight: "900",
                  letterSpacing: "-0.3px",
                  color: "#0f172a",
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

      {/* 푸터 */}
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
                    background:
                      "linear-gradient(135deg, #2563eb 0%, #6366f1 100%)",
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
                    fontSize: "22px",
                    fontWeight: "900",
                    color: "#2563eb",
                    letterSpacing: "-0.6px",
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
                유지보수 요청을 더 간단하고 빠르게 접수하고
                상태를 체계적으로 관리하기 위한 서비스 플랫폼
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
          fontSize: isMobile ? "28px" : "34px",
          fontWeight: "900",
          letterSpacing: "-1px",
          color: "#0f172a",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          margin: 0,
          fontSize: "15px",
          lineHeight: "1.85",
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