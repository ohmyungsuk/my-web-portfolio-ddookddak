function LandingPage({ onGoLogin, onGoSignup, onGoCreate, isLoggedIn }) {
  const moveToIntro = () => {
    const introSection = document.getElementById("service-intro");
    if (introSection) {
      introSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuStyle = {
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "500",
    color: "#0f172a",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f1f5f9",
        fontFamily: "Arial, sans-serif",
        color: "#0f172a",
      }}
    >
      {/* 상단 메뉴 */}
      <header
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "18px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#2563eb",
              cursor: "pointer",
              letterSpacing: "-0.5px",
            }}
          >
            뚝딱
          </div>

          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "28px",
            }}
          >
            <span
              style={menuStyle}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              홈
            </span>

            <span style={menuStyle} onClick={moveToIntro}>
              서비스 소개
            </span>

            <span style={menuStyle} onClick={onGoLogin}>
              로그인
            </span>

            <button
              onClick={onGoSignup}
              style={{
                backgroundColor: "#2563eb",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                padding: "10px 16px",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              회원가입
            </button>
          </nav>
        </div>
      </header>

      {/* 메인 영역 */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "64px 32px 90px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "60px",
          flexWrap: "wrap",
        }}
      >
        {/* 왼쪽 */}
        <div style={{ flex: 1, minWidth: "320px" }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#dbeafe",
              color: "#2563eb",
              fontSize: "14px",
              fontWeight: "700",
              padding: "12px 20px",
              borderRadius: "999px",
              marginBottom: "28px",
            }}
          >
            회원제 유지보수 요청 플랫폼
          </div>

          <h1
            style={{
              fontSize: "42px",
              lineHeight: "1.3",
              fontWeight: "800",
              letterSpacing: "-1px",
              margin: "0 0 26px 0",
              color: "#0f172a",
            }}
          >
            쉽고 빠르게
            <br />
            유지보수 요청을 접수하는
            <br />
            서비스
          </h1>

          <p
            style={{
              fontSize: "17px",
              lineHeight: "1.9",
              color: "#475569",
              marginBottom: "34px",
            }}
          >
            뚝딱는 시설, 장비, 환경 관련 문제를 간편하게 등록하고
            <br />
            진행 상태를 확인할 수 있는 유지보수 요청 플랫폼입니다.
          </p>

          <div
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              marginBottom: "28px",
            }}
          >
            <button
              onClick={onGoCreate}
              style={{
                backgroundColor: "#2563eb",
                color: "#ffffff",
                border: "none",
                borderRadius: "14px",
                padding: "16px 24px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 10px 24px rgba(37, 99, 235, 0.18)",
              }}
            >
              로그인 후 요청 등록
            </button>

            <button
              onClick={moveToIntro}
              style={{
                backgroundColor: "#ffffff",
                color: "#2563eb",
                border: "1px solid #cbd5e1",
                borderRadius: "14px",
                padding: "16px 24px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              서비스 보기
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "12px 16px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#334155",
              }}
            >
              빠른 요청 접수
            </div>

            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "12px 16px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#334155",
              }}
            >
              처리 상태 확인
            </div>

            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "12px 16px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#334155",
              }}
            >
              담당자 배정 관리
            </div>
          </div>
        </div>

        {/* 오른쪽 카드 */}
        <div
          style={{
            width: "390px",
            backgroundColor: "#f8fafc",
            borderRadius: "28px",
            padding: "26px",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "22px",
              padding: "24px",
              marginBottom: "18px",
              boxShadow: "0 8px 20px rgba(15, 23, 42, 0.04)",
            }}
          >
            <div
              style={{
                fontSize: "15px",
                color: "#64748b",
                marginBottom: "12px",
              }}
            >
              오늘 접수
            </div>
            <div
              style={{
                fontSize: "36px",
                fontWeight: "800",
                color: "#0f172a",
                marginBottom: "8px",
              }}
            >
              12건
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#94a3b8",
              }}
            >
              오늘 새로 등록된 요청입니다.
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "22px",
              padding: "24px",
              marginBottom: "18px",
              boxShadow: "0 8px 20px rgba(15, 23, 42, 0.04)",
            }}
          >
            <div
              style={{
                fontSize: "15px",
                color: "#64748b",
                marginBottom: "12px",
              }}
            >
              처리 진행
            </div>
            <div
              style={{
                fontSize: "36px",
                fontWeight: "800",
                color: "#0f172a",
                marginBottom: "8px",
              }}
            >
              5건
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#94a3b8",
              }}
            >
              현재 담당자가 처리 중인 요청입니다.
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "22px",
              padding: "24px",
              boxShadow: "0 8px 20px rgba(15, 23, 42, 0.04)",
            }}
          >
            <div
              style={{
                fontSize: "15px",
                color: "#64748b",
                marginBottom: "12px",
              }}
            >
              완료
            </div>
            <div
              style={{
                fontSize: "36px",
                fontWeight: "800",
                color: "#0f172a",
                marginBottom: "8px",
              }}
            >
              21건
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#94a3b8",
              }}
            >
              처리가 완료된 요청 건수입니다.
            </div>
          </div>
        </div>
      </section>

      {/* 서비스 소개 */}
      <section
        id="service-intro"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px 32px 100px",
        }}
      >
        <h2
          style={{
            fontSize: "40px",
            fontWeight: "800",
            textAlign: "center",
            marginBottom: "16px",
            letterSpacing: "-0.7px",
            color: "#0f172a",
          }}
        >
          뚝딱 소개
        </h2>

        <p
          style={{
            textAlign: "center",
            fontSize: "17px",
            lineHeight: "1.9",
            color: "#475569",
            marginBottom: "42px",
          }}
        >
          요청 등록부터 담당자 배정, 처리 완료 확인까지
          <br />한 화면에서 쉽고 빠르게 관리할 수 있습니다.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              padding: "28px",
              boxShadow: "0 8px 20px rgba(15, 23, 42, 0.04)",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                marginBottom: "12px",
                color: "#0f172a",
              }}
            >
              요청 등록
            </h3>
            <p
              style={{
                fontSize: "15px",
                color: "#64748b",
                lineHeight: "1.8",
                margin: 0,
              }}
            >
              시설이나 장비 문제를 간단하게 등록할 수 있습니다.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              padding: "28px",
              boxShadow: "0 8px 20px rgba(15, 23, 42, 0.04)",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                marginBottom: "12px",
                color: "#0f172a",
              }}
            >
              처리 현황 확인
            </h3>
            <p
              style={{
                fontSize: "15px",
                color: "#64748b",
                lineHeight: "1.8",
                margin: 0,
              }}
            >
              접수, 진행 중, 완료 상태를 한눈에 확인할 수 있습니다.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              padding: "28px",
              boxShadow: "0 8px 20px rgba(15, 23, 42, 0.04)",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                marginBottom: "12px",
                color: "#0f172a",
              }}
            >
              담당자 배정
            </h3>
            <p
              style={{
                fontSize: "15px",
                color: "#64748b",
                lineHeight: "1.8",
                margin: 0,
              }}
            >
              작업 담당자를 지정하고 진행 내용을 관리할 수 있습니다.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              padding: "28px",
              boxShadow: "0 8px 20px rgba(15, 23, 42, 0.04)",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                marginBottom: "12px",
                color: "#0f172a",
              }}
            >
              회원 기반 관리
            </h3>
            <p
              style={{
                fontSize: "15px",
                color: "#64748b",
                lineHeight: "1.8",
                margin: 0,
              }}
            >
              로그인한 사용자 기준으로 내 요청과 맡은 작업을 구분할 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
