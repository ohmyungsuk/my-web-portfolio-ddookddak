import { useState } from "react";

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

  const displayName =
    loginUser?.username || loginUser?.name || loginUser?.email || "사용자";

  const moveToIntro = () => {
    const introSection = document.getElementById("service-intro");
    if (introSection) {
      introSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const moveToCommunity = () => {
    const communitySection = document.getElementById("community-preview");
    if (communitySection) {
      communitySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const runAndClose = (action) => {
    setProfileOpen(false);
    if (action) action();
  };

  const topMenuStyle = {
    background: "none",
    border: "none",
    padding: 0,
    fontSize: "14px",
    fontWeight: "700",
    color: "#0f172a",
    cursor: "pointer",
  };

  const outlineButton = {
    border: "1px solid #d7e0ef",
    backgroundColor: "#ffffff",
    color: "#1e293b",
    borderRadius: "12px",
    padding: "11px 16px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
  };

  const primaryButton = {
    border: "none",
    background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
    color: "#ffffff",
    borderRadius: "12px",
    padding: "12px 18px",
    fontSize: "14px",
    fontWeight: "800",
    cursor: "pointer",
    boxShadow: "0 14px 28px rgba(37, 99, 235, 0.18)",
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
  };

  const iconBoxStyle = {
    width: "44px",
    height: "44px",
    borderRadius: "14px",
    border: "1px solid #dbe4f2",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    fontSize: "18px",
  };

  const categories = [
    { icon: "⚡", label: "전기" },
    { icon: "🛠️", label: "설비" },
    { icon: "💧", label: "누수" },
    { icon: "🔐", label: "도어락" },
    { icon: "❄️", label: "에어컨" },
    { icon: "📷", label: "CCTV" },
    { icon: "🪧", label: "간판" },
    { icon: "📦", label: "기타" },
  ];

  const featureCards = [
    {
      title: "빠른 요청 접수",
      desc: "문제 내용을 남기면 바로 요청이 등록됩니다.",
      icon: "📝",
      bg: "#eef4ff",
    },
    {
      title: "상태 한눈에 확인",
      desc: "접수, 배정, 진행, 완료 흐름을 쉽게 확인할 수 있습니다.",
      icon: "📊",
      bg: "#f5f3ff",
    },
    {
      title: "작업자 연결",
      desc: "요청을 확인한 사람이 수락하고 작업을 이어서 진행합니다.",
      icon: "🤝",
      bg: "#ecfeff",
    },
    {
      title: "회원별 관리",
      desc: "내 요청과 맡은 작업을 나눠서 더 깔끔하게 관리합니다.",
      icon: "👤",
      bg: "#fff7ed",
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
        fontFamily:
          "Pretendard, Apple SD Gothic Neo, Noto Sans KR, Arial, sans-serif",
        color: "#0f172a",
      }}
    >
      {/* 헤더 */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "rgba(255,255,255,0.86)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(226,232,240,0.92)",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "18px",
            flexWrap: "wrap",
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
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg, #2563eb 0%, #6366f1 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontWeight: "900",
                fontSize: "15px",
                boxShadow: "0 10px 22px rgba(37, 99, 235, 0.18)",
              }}
            >
              ㄸ
            </div>

            <div
              style={{
                fontSize: "24px",
                fontWeight: "900",
                color: "#2563eb",
                letterSpacing: "-0.7px",
              }}
            >
              뚝딱
            </div>
          </div>

          {/* 가운데 메뉴 */}
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
              style={topMenuStyle}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              홈
            </button>

            <button type="button" style={topMenuStyle} onClick={moveToIntro}>
              서비스 소개
            </button>

            <button type="button" style={topMenuStyle} onClick={moveToCommunity}>
              커뮤니티
            </button>
          </nav>

          {/* 오른쪽 */}
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

              <button type="button" style={primaryButton} onClick={onGoCreate}>
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

              <div style={{ position: "relative" }}>
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

                  <div
                    style={{
                      textAlign: "left",
                      lineHeight: 1.2,
                    }}
                  >
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
                      style={{
                        width: "100%",
                        textAlign: "left",
                        border: "none",
                        background: "none",
                        padding: "12px 12px",
                        borderRadius: "12px",
                        fontSize: "14px",
                        fontWeight: "700",
                        cursor: "pointer",
                        color: "#1e293b",
                      }}
                    >
                      내 요청 목록
                    </button>

                    <button
                      type="button"
                      onClick={() => runAndClose(onGoAllRequests)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        border: "none",
                        background: "none",
                        padding: "12px 12px",
                        borderRadius: "12px",
                        fontSize: "14px",
                        fontWeight: "700",
                        cursor: "pointer",
                        color: "#1e293b",
                      }}
                    >
                      전체 요청 보기
                    </button>

                    <button
                      type="button"
                      onClick={() => runAndClose(onGoAssignedRequests)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        border: "none",
                        background: "none",
                        padding: "12px 12px",
                        borderRadius: "12px",
                        fontSize: "14px",
                        fontWeight: "700",
                        cursor: "pointer",
                        color: "#1e293b",
                      }}
                    >
                      맡은 작업 보기
                    </button>

                    <button
                      type="button"
                      onClick={() => runAndClose(onLogout)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        border: "none",
                        backgroundColor: "#fff5f5",
                        padding: "12px 12px",
                        borderRadius: "12px",
                        fontSize: "14px",
                        fontWeight: "700",
                        cursor: "pointer",
                        color: "#ef4444",
                        marginTop: "6px",
                      }}
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
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
            padding: "34px 24px 18px",
          }}
        >
          <div
            style={{
              borderRadius: "30px",
              padding: "30px",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(244,247,255,0.97) 100%)",
              border: "1px solid #e3eaf5",
              boxShadow: "0 22px 50px rgba(15, 23, 42, 0.06)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.15fr 0.95fr",
                gap: "24px",
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
                    fontSize: "38px",
                    lineHeight: "1.2",
                    fontWeight: "900",
                    letterSpacing: "-1.6px",
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
                    fontSize: "15px",
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
                      gridTemplateColumns: "1fr auto",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        height: "54px",
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
                        height: "54px",
                        borderRadius: "14px",
                        padding: "0 20px",
                        fontSize: "14px",
                      }}
                      onClick={onGoCreate}
                    >
                      {isLoggedIn ? "바로 요청하기" : "로그인 후 요청"}
                    </button>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(62px, 1fr))",
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
                        <span style={{ fontSize: "18px" }}>{item.icon}</span>
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
                    onClick={moveToIntro}
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
                    padding: "22px",
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
                      fontSize: "28px",
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
                      style={{
                        backgroundColor: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(255,255,255,0.14)",
                        borderRadius: "16px",
                        padding: "14px",
                      }}
                    >
                      <div style={{ fontSize: "12px", opacity: 0.82 }}>
                        오늘 접수
                      </div>
                      <div
                        style={{
                          fontSize: "28px",
                          fontWeight: "900",
                          marginTop: "6px",
                        }}
                      >
                        12
                      </div>
                    </div>

                    <div
                      style={{
                        backgroundColor: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(255,255,255,0.14)",
                        borderRadius: "16px",
                        padding: "14px",
                      }}
                    >
                      <div style={{ fontSize: "12px", opacity: 0.82 }}>
                        진행 중
                      </div>
                      <div
                        style={{
                          fontSize: "28px",
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
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "20px",
                      border: "1px solid #e2e8f0",
                      padding: "18px",
                      boxShadow: "0 12px 24px rgba(15, 23, 42, 0.04)",
                    }}
                  >
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "14px",
                        backgroundColor: "#eef4ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "19px",
                        marginBottom: "12px",
                      }}
                    >
                      📝
                    </div>
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

                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "20px",
                      border: "1px solid #e2e8f0",
                      padding: "18px",
                      boxShadow: "0 12px 24px rgba(15, 23, 42, 0.04)",
                    }}
                  >
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "14px",
                        backgroundColor: "#f5f3ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "19px",
                        marginBottom: "12px",
                      }}
                    >
                      🔧
                    </div>
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
            padding: "14px 24px 40px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "9px 14px",
                borderRadius: "999px",
                backgroundColor: "#eef4ff",
                color: "#2563eb",
                fontSize: "12px",
                fontWeight: "800",
                marginBottom: "12px",
              }}
            >
              SERVICE OVERVIEW
            </div>

            <h2
              style={{
                fontSize: "32px",
                fontWeight: "900",
                letterSpacing: "-1px",
                margin: "0 0 10px 0",
                color: "#0f172a",
              }}
            >
              뚝딱 소개
            </h2>

            <p
              style={{
                fontSize: "15px",
                lineHeight: "1.8",
                color: "#64748b",
                margin: 0,
              }}
            >
              요청 접수부터 담당자 연결, 처리 완료 확인까지
              <br />
              복잡하지 않게 빠르게 관리할 수 있도록 구성했습니다.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
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
            padding: "8px 24px 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "22px",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-block",
                  padding: "9px 14px",
                  borderRadius: "999px",
                  backgroundColor: "#f5f3ff",
                  color: "#4f46e5",
                  fontSize: "12px",
                  fontWeight: "800",
                  marginBottom: "12px",
                }}
              >
                COMMUNITY
              </div>

              <h2
                style={{
                  fontSize: "32px",
                  fontWeight: "900",
                  letterSpacing: "-1px",
                  margin: "0 0 8px 0",
                  color: "#0f172a",
                }}
              >
                커뮤니티
              </h2>

              <p
                style={{
                  fontSize: "15px",
                  lineHeight: "1.8",
                  color: "#64748b",
                  margin: 0,
                }}
              >
                요청 이야기, 작업 팁, 이용 후기를 함께 보는 공간입니다.
              </p>
            </div>

            <button
              type="button"
              style={outlineButton}
              onClick={moveToCommunity}
            >
              커뮤니티 더 보기
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
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
            padding: "24px 24px 30px",
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap",
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
              gap: "34px",
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

export default LandingPage;