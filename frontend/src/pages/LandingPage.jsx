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

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const moveToSection = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const runAndClose = (action) => {
    setProfileOpen(false);
    setMobileMenuOpen(false);
    if (action) action();
  };

  const navTextButton = {
    background: "none",
    border: "none",
    padding: 0,
    fontSize: isMobile ? "14px" : "14px",
    fontWeight: "700",
    color: "#0f172a",
    cursor: "pointer",
    whiteSpace: "nowrap",
  };

  const outlineButton = {
    border: "1px solid #d8e1f0",
    backgroundColor: "#ffffff",
    color: "#1e293b",
    borderRadius: "12px",
    padding: isMobile ? "10px 14px" : "11px 16px",
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
    padding: isMobile ? "11px 15px" : "12px 18px",
    fontSize: "14px",
    fontWeight: "800",
    cursor: "pointer",
    boxShadow: "0 14px 28px rgba(37, 99, 235, 0.18)",
    whiteSpace: "nowrap",
  };

  const chipStyle = {
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

  const iconBoxStyle = {
    width: isMobile ? "40px" : "44px",
    height: isMobile ? "40px" : "44px",
    borderRadius: "14px",
    border: "1px solid #dbe4f2",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    fontSize: isMobile ? "16px" : "18px",
  };

  const categories = [
    { short: "전", label: "전기", bg: "#eef4ff", color: "#2563eb" },
    { short: "설", label: "설비", bg: "#effcf6", color: "#16a34a" },
    { short: "누", label: "누수", bg: "#ecfeff", color: "#0891b2" },
    { short: "문", label: "도어락", bg: "#f5f3ff", color: "#7c3aed" },
    { short: "냉", label: "에어컨", bg: "#eff6ff", color: "#1d4ed8" },
    { short: "캠", label: "CCTV", bg: "#fff7ed", color: "#ea580c" },
    { short: "판", label: "간판", bg: "#fdf2f8", color: "#db2777" },
    { short: "기", label: "기타", bg: "#f8fafc", color: "#475569" },
  ];

  const featureCards = [
    {
      title: "빠른 요청 접수",
      desc: "문제 내용을 남기면 바로 요청이 등록됩니다.",
      icon: "접수",
      bg: "#eef4ff",
      color: "#2563eb",
    },
    {
      title: "상태 한눈에 확인",
      desc: "접수, 배정, 진행, 완료 흐름을 쉽게 확인할 수 있습니다.",
      icon: "현황",
      bg: "#f5f3ff",
      color: "#7c3aed",
    },
    {
      title: "작업자 연결",
      desc: "요청을 확인한 사람이 수락하고 작업을 이어서 진행합니다.",
      icon: "연결",
      bg: "#ecfeff",
      color: "#0891b2",
    },
    {
      title: "회원별 관리",
      desc: "내 요청과 맡은 작업을 나눠서 더 깔끔하게 관리합니다.",
      icon: "관리",
      bg: "#fff7ed",
      color: "#ea580c",
    },
  ];

  const communityCards = [
    {
      title: "최근 요청 이야기",
      desc: "자주 올라오는 요청 유형과 처리 흐름을 한눈에 볼 수 있습니다.",
      badge: "NEW",
    },
    {
      title: "작업 팁 모음",
      desc: "간단한 유지보수 상식과 실전 팁을 빠르게 확인할 수 있습니다.",
      badge: "TIP",
    },
    {
      title: "이용 후기",
      desc: "사용자들이 남긴 요청 경험과 진행 후기를 모아볼 수 있습니다.",
      badge: "REVIEW",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(180deg, #f8fbff 0%, #f1f5f9 48%, #f8fafc 100%)",
        
        color: "#0f172a",
      }}
    >
      {/* 헤더 */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(226,232,240,0.95)",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            padding: isMobile ? "14px 16px" : "16px 24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "14px",
            }}
          >
            {/* 로고 */}
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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

            {/* 데스크탑 메뉴 */}
            {!isMobile && (
              <>
                <nav
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "26px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    type="button"
                    style={navTextButton}
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    홈
                  </button>

                  <button
                    type="button"
                    style={navTextButton}
                    onClick={() => moveToSection("service-intro")}
                  >
                    서비스 소개
                  </button>

                  <button
                    type="button"
                    style={navTextButton}
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
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      type="button"
                      onClick={onGoLogin}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#0f172a",
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
                      flexWrap: "wrap",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      type="button"
                      onClick={onGoCreate}
                      style={{
                        border: "1px solid #dbe4f2",
                        backgroundColor: "#ffffff",
                        color: "#94a3b8",
                        borderRadius: "14px",
                        padding: "11px 18px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        minWidth: "250px",
                        textAlign: "left",
                      }}
                    >
                      어떤 유지보수가 필요하신가요?
                    </button>

                    <button
                      type="button"
                      style={primaryButton}
                      onClick={onGoCreate}
                    >
                      요청 등록
                    </button>

                    <button
                      type="button"
                      style={iconBoxStyle}
                      onClick={onGoAssignedRequests}
                      title="맡은 작업"
                    >
                      🔔
                      <span
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: "#ef4444",
                        }}
                      />
                    </button>

                    <div style={{ position: "relative" }} ref={profileRef}>
                      <button
                        type="button"
                        onClick={() => setProfileOpen((prev) => !prev)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "7px 12px 7px 8px",
                          borderRadius: "999px",
                          border: "1px solid #dbe4f2",
                          backgroundColor: "#ffffff",
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
                            내 메뉴 열기
                          </div>
                        </div>

                        <span style={{ fontSize: "12px", color: "#64748b" }}>
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
                          <div
                            style={{
                              padding: "10px 12px 12px",
                              borderBottom: "1px solid #eef2f7",
                              marginBottom: "8px",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "14px",
                                fontWeight: "800",
                                color: "#111827",
                              }}
                            >
                              {displayName}님
                            </div>
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#94a3b8",
                                marginTop: "4px",
                              }}
                            >
                              요청과 작업을 관리하세요
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => runAndClose(onGoMyRequests)}
                            style={dropdownButtonStyle()}
                          >
                            내 요청 목록
                          </button>

                          <button
                            type="button"
                            onClick={() => runAndClose(onGoAllRequests)}
                            style={dropdownButtonStyle()}
                          >
                            전체 요청 보기
                          </button>

                          <button
                            type="button"
                            onClick={() => runAndClose(onGoAssignedRequests)}
                            style={dropdownButtonStyle()}
                          >
                            맡은 작업 보기
                          </button>

                          <button
                            type="button"
                            onClick={() => runAndClose(onLogout)}
                            style={dropdownButtonStyle(true)}
                          >
                            로그아웃
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* 모바일 우측 */}
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
                      style={iconBoxStyle}
                      onClick={onGoCreate}
                      title="요청 등록"
                    >
                      ✚
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
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 0,
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
                          <div
                            style={{
                              padding: "10px 12px 12px",
                              borderBottom: "1px solid #eef2f7",
                              marginBottom: "8px",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "14px",
                                fontWeight: "800",
                                color: "#111827",
                              }}
                            >
                              {displayName}님
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => runAndClose(onGoMyRequests)}
                            style={dropdownButtonStyle()}
                          >
                            내 요청 목록
                          </button>
                          <button
                            type="button"
                            onClick={() => runAndClose(onGoAllRequests)}
                            style={dropdownButtonStyle()}
                          >
                            전체 요청 보기
                          </button>
                          <button
                            type="button"
                            onClick={() => runAndClose(onGoAssignedRequests)}
                            style={dropdownButtonStyle()}
                          >
                            맡은 작업 보기
                          </button>
                          <button
                            type="button"
                            onClick={() => runAndClose(onLogout)}
                            style={dropdownButtonStyle(true)}
                          >
                            로그아웃
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={onGoLogin}
                    style={{
                      ...outlineButton,
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
                  style={iconBoxStyle}
                  title="메뉴"
                >
                  ☰
                </button>
              </div>
            )}
          </div>

          {/* 모바일 메뉴 */}
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
              <button
                type="button"
                style={{ ...navTextButton, textAlign: "left" }}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setMobileMenuOpen(false);
                }}
              >
                홈
              </button>

              <button
                type="button"
                style={{ ...navTextButton, textAlign: "left" }}
                onClick={() => moveToSection("service-intro")}
              >
                서비스 소개
              </button>

              <button
                type="button"
                style={{ ...navTextButton, textAlign: "left" }}
                onClick={() => moveToSection("community-preview")}
              >
                커뮤니티
              </button>

              {isLoggedIn ? (
                <>
                  <button
                    type="button"
                    style={{ ...navTextButton, textAlign: "left" }}
                    onClick={() => runAndClose(onGoAllRequests)}
                  >
                    전체 요청
                  </button>
                  <button
                    type="button"
                    style={{ ...navTextButton, textAlign: "left" }}
                    onClick={() => runAndClose(onGoAssignedRequests)}
                  >
                    맡은 작업
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  style={primaryButton}
                  onClick={() => runAndClose(onGoSignup)}
                >
                  회원가입
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {/* 메인 */}
        <section
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            padding: isMobile ? "22px 16px 14px" : "34px 24px 18px",
          }}
        >
          <div
            style={{
              borderRadius: isMobile ? "24px" : "30px",
              padding: isMobile ? "20px" : "30px",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(244,247,255,0.97) 100%)",
              border: "1px solid #e3eaf5",
              boxShadow: "0 22px 50px rgba(15, 23, 42, 0.06)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isTablet ? "1fr" : "1.15fr 0.95fr",
                gap: isMobile ? "18px" : "24px",
                alignItems: "stretch",
              }}
            >
              {/* 왼쪽 */}
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 15px",
                    borderRadius: "999px",
                    backgroundColor: "#eef4ff",
                    color: "#2563eb",
                    fontSize: "12px",
                    fontWeight: "800",
                    marginBottom: "18px",
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      backgroundColor: "#2563eb",
                    }}
                  />
                  스마트 유지보수 요청 플랫폼
                </div>

                <h1
                  style={{
                    fontSize: isMobile ? "28px" : "38px",
                    lineHeight: "1.2",
                    fontWeight: "900",
                    letterSpacing: isMobile ? "-1px" : "-1.6px",
                    margin: "0 0 16px 0",
                    color: "#0f172a",
                  }}
                >
                  요청은 간단하게
                  <br />
                  관리는 더 체계적으로
                </h1>

                <p
                  style={{
                    fontSize: isMobile ? "14px" : "15px",
                    lineHeight: "1.9",
                    color: "#5b6b82",
                    margin: "0 0 20px 0",
                  }}
                >
                  전기, 설비, 누수, 출입문, 장비 문제까지
                  <br />
                  필요한 작업을 빠르게 등록하고 진행 상태를 한 번에 확인하세요.
                </p>

                <div
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #dbe4f2",
                    borderRadius: "20px",
                    padding: "14px",
                    boxShadow: "0 14px 28px rgba(15, 23, 42, 0.04)",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        height: "52px",
                        borderRadius: "14px",
                        backgroundColor: "#f8fafc",
                        border: "1px solid #e5ebf5",
                        display: "flex",
                        alignItems: "center",
                        padding: "0 16px",
                        color: "#94a3b8",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      어떤 유지보수가 필요하신가요?
                    </div>

                    <button
                      type="button"
                      style={{
                        ...primaryButton,
                        height: "52px",
                        borderRadius: "14px",
                        padding: "0 18px",
                        fontSize: "14px",
                        width: isMobile ? "100%" : "auto",
                      }}
                      onClick={onGoCreate}
                    >
                      {isLoggedIn ? "바로 요청하기" : "로그인 후 요청"}
                    </button>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile
                        ? "repeat(4, 1fr)"
                        : "repeat(auto-fit, minmax(62px, 1fr))",
                      gap: "10px",
                      marginTop: "14px",
                    }}
                  >
                    {categories.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={onGoCreate}
                        style={{
                          border: "none",
                          background: "#f8fafc",
                          borderRadius: "14px",
                          padding: "10px 8px",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          color: "#334155",
                        }}
                      >
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "10px",
                            backgroundColor: item.bg,
                            color: item.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            fontWeight: "900",
                          }}
                        >
                          {item.short}
                        </div>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: "700",
                          }}
                        >
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    marginBottom: "14px",
                  }}
                >
                  <button
                    type="button"
                    style={{
                      ...primaryButton,
                      padding: "14px 22px",
                      borderRadius: "14px",
                      fontSize: "15px",
                    }}
                    onClick={onGoCreate}
                  >
                    요청 등록하기
                  </button>

                  <button
                    type="button"
                    style={{
                      ...outlineButton,
                      padding: "14px 22px",
                      borderRadius: "14px",
                      fontSize: "15px",
                    }}
                    onClick={() => moveToSection("service-intro")}
                  >
                    서비스 보기
                  </button>
                </div>

                {isLoggedIn && (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      type="button"
                      style={chipStyle}
                      onClick={onGoMyRequests}
                    >
                      내 요청 목록
                    </button>
                    <button
                      type="button"
                      style={chipStyle}
                      onClick={onGoAllRequests}
                    >
                      전체 요청 목록
                    </button>
                    <button
                      type="button"
                      style={chipStyle}
                      onClick={onGoAssignedRequests}
                    >
                      내가 맡은 작업
                    </button>
                  </div>
                )}
              </div>

              {/* 오른쪽 */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    borderRadius: "26px",
                    padding: isMobile ? "18px" : "22px",
                    background:
                      "linear-gradient(145deg, #1e3a8a 0%, #2563eb 55%, #4f46e5 100%)",
                    color: "#ffffff",
                    boxShadow: "0 20px 38px rgba(37, 99, 235, 0.22)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      opacity: 0.85,
                      marginBottom: "10px",
                    }}
                  >
                    운영 현황
                  </div>

                  <div
                    style={{
                      fontSize: isMobile ? "22px" : "28px",
                      fontWeight: "900",
                      lineHeight: "1.3",
                      marginBottom: "14px",
                      letterSpacing: "-0.9px",
                    }}
                  >
                    접수부터 완료까지
                    <br />
                    흐름이 한눈에 보입니다
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={statCardStyle()}
                    >
                      <div style={{ fontSize: "12px", opacity: 0.82 }}>
                        오늘 접수
                      </div>
                      <div
                        style={{
                          fontSize: isMobile ? "24px" : "28px",
                          fontWeight: "900",
                          marginTop: "6px",
                        }}
                      >
                        12
                      </div>
                    </div>

                    <div style={statCardStyle()}>
                      <div style={{ fontSize: "12px", opacity: 0.82 }}>
                        진행 중
                      </div>
                      <div
                        style={{
                          fontSize: isMobile ? "24px" : "28px",
                          fontWeight: "900",
                          marginTop: "6px",
                        }}
                      >
                        5
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "14px",
                  }}
                >
                  <div style={miniCardStyle()}>
                    <div style={miniIconStyle("#eef4ff")}>접수</div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#64748b",
                        marginBottom: "6px",
                      }}
                    >
                      요청 등록
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "900",
                        color: "#0f172a",
                      }}
                    >
                      즉시 가능
                    </div>
                  </div>

                  <div style={miniCardStyle()}>
                    <div style={miniIconStyle("#f5f3ff")}>현황</div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#64748b",
                        marginBottom: "6px",
                      }}
                    >
                      상태 확인
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "900",
                        color: "#0f172a",
                      }}
                    >
                      한눈에 관리
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 서비스 소개 */}
        <section
          id="service-intro"
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            padding: isMobile ? "8px 16px 28px" : "14px 24px 40px",
          }}
        >
          <SectionTitle
            label="SERVICE OVERVIEW"
            title="뚝딱 소개"
            desc="요청 접수부터 담당자 연결, 처리 완료 확인까지 복잡하지 않게 빠르게 관리할 수 있도록 구성했습니다."
            isMobile={isMobile}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            {featureCards.map((item) => (
              <div
                key={item.title}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "22px",
                  padding: "22px",
                  boxShadow: "0 16px 30px rgba(15, 23, 42, 0.04)",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "15px",
                    backgroundColor: item.bg,
                    color: item.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "900",
                    marginBottom: "16px",
                  }}
                >
                  {item.icon}
                </div>

                <h3
                  style={{
                    margin: "0 0 9px 0",
                    fontSize: "19px",
                    fontWeight: "900",
                    color: "#0f172a",
                    letterSpacing: "-0.3px",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    lineHeight: "1.8",
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
            maxWidth: "1180px",
            margin: "0 auto",
            padding: isMobile ? "0 16px 70px" : "8px 24px 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: isMobile ? "start" : "end",
              flexDirection: isMobile ? "column" : "row",
              gap: "16px",
              marginBottom: "22px",
            }}
          >
            <SectionTitle
              label="COMMUNITY"
              title="커뮤니티"
              desc="요청 이야기, 작업 팁, 이용 후기를 함께 보는 공간입니다."
              isMobile={isMobile}
              align="left"
            />

            <button
              type="button"
              style={outlineButton}
              onClick={() => moveToSection("community-preview")}
            >
              커뮤니티 더 보기
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "16px",
            }}
          >
            {communityCards.map((item) => (
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
                    fontSize: "20px",
                    fontWeight: "900",
                    color: "#0f172a",
                    letterSpacing: "-0.3px",
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
      </main>

      <footer
        style={{
          borderTop: "1px solid #e2e8f0",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            padding: isMobile ? "22px 16px 28px" : "24px 24px 30px",
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "900",
                color: "#2563eb",
                marginBottom: "8px",
              }}
            >
              뚝딱
            </div>
            <div
              style={{
                fontSize: "13px",
                lineHeight: "1.8",
                color: "#64748b",
              }}
            >
              유지보수 요청을 더 간단하고 빠르게
              <br />
              관리하기 위한 서비스 플랫폼
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: isMobile ? "20px" : "34px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "800",
                  color: "#0f172a",
                  marginBottom: "10px",
                }}
              >
                메뉴
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  lineHeight: "2",
                }}
              >
                홈
                <br />
                서비스 소개
                <br />
                커뮤니티
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "800",
                  color: "#0f172a",
                  marginBottom: "10px",
                }}
              >
                서비스
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  lineHeight: "2",
                }}
              >
                요청 접수
                <br />
                상태 확인
                <br />
                담당자 연결
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function dropdownButtonStyle(isDanger = false) {
  return {
    width: "100%",
    textAlign: "left",
    border: "none",
    background: isDanger ? "#fff5f5" : "none",
    padding: "12px 12px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    color: isDanger ? "#ef4444" : "#1e293b",
    marginTop: isDanger ? "6px" : 0,
  };
}

function statCardStyle() {
  return {
    backgroundColor: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: "16px",
    padding: "14px",
  };
}

function miniCardStyle() {
  return {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    border: "1px solid #e2e8f0",
    padding: "18px",
    boxShadow: "0 12px 24px rgba(15, 23, 42, 0.04)",
  };
}

function miniIconStyle(bg) {
  return {
    width: "42px",
    height: "42px",
    borderRadius: "14px",
    backgroundColor: bg,
    color: "#334155",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "900",
    marginBottom: "12px",
  };
}

function SectionTitle({ label, title, desc, isMobile, align = "center" }) {
  return (
    <div
      style={{
        textAlign: align,
        marginBottom: "18px",
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "9px 14px",
          borderRadius: "999px",
          backgroundColor: label === "COMMUNITY" ? "#f5f3ff" : "#eef4ff",
          color: label === "COMMUNITY" ? "#4f46e5" : "#2563eb",
          fontSize: "12px",
          fontWeight: "800",
          marginBottom: "12px",
        }}
      >
        {label}
      </div>

      <h2
        style={{
          fontSize: isMobile ? "28px" : "32px",
          fontWeight: "900",
          letterSpacing: "-1px",
          margin: "0 0 10px 0",
          color: "#0f172a",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          fontSize: "15px",
          lineHeight: "1.8",
          color: "#64748b",
          margin: 0,
        }}
      >
        {desc}
      </p>
    </div>
  );
}

export default LandingPage;