import "../index.css";

function LandingPage({ onGoLogin, onGoSignup, onGoCreate, isLoggedIn }) {
  const scrollToIntro = () => {
    const target = document.getElementById("service-intro");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#eef2f8",
      }}
    >
      <header
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "800",
              color: "#2563eb",
            }}
          >
            FixFlow
          </h1>

          <nav
            style={{
              display: "flex",
              gap: "28px",
              alignItems: "center",
            }}
          >
            <button type="button" onClick={goTop} style={menuButtonStyle}>
              홈
            </button>

            <button
              type="button"
              onClick={scrollToIntro}
              style={menuButtonStyle}
            >
              서비스 소개
            </button>

            <button
              type="button"
              onClick={onGoLogin}
              style={menuButtonStyle}
            >
              로그인
            </button>

            <button
              type="button"
              onClick={onGoSignup}
              style={menuButtonStyle}
            >
              회원가입
            </button>
          </nav>
        </div>
      </header>

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "80px 24px 120px 24px",
          display: "grid",
          gridTemplateColumns: "1.4fr 0.9fr",
          gap: "48px",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#dbeafe",
              color: "#2563eb",
              padding: "10px 18px",
              borderRadius: "999px",
              fontSize: "16px",
              fontWeight: "700",
              marginBottom: "28px",
            }}
          >
            회원제 유지보수 요청 플랫폼
          </div>

          <h2
            style={{
              fontSize: "62px",
              lineHeight: "1.18",
              fontWeight: "800",
              color: "#111827",
              margin: "0 0 26px 0",
              letterSpacing: "-1px",
            }}
          >
            쉽고 빠르게
            <br />
            유지보수 요청을 접수하는 서비스
          </h2>

          <p
            style={{
              fontSize: "20px",
              lineHeight: "1.7",
              color: "#4b5563",
              margin: "0 0 36px 0",
              maxWidth: "760px",
            }}
          >
            FixFlow는 시설, 장비, 환경 관련 문제를 간편하게 등록하고
            관리할 수 있는 유지보수 요청 플랫폼입니다.
          </p>

          <div style={{ display: "flex", gap: "16px" }}>
            <button
              type="button"
              onClick={onGoCreate}
              style={{
                border: "none",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                padding: "18px 28px",
                borderRadius: "14px",
                fontSize: "18px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              {isLoggedIn ? "요청 등록하기" : "로그인 후 요청 등록"}
            </button>

            <button
              type="button"
              onClick={scrollToIntro}
              style={{
                border: "1px solid #cbd5e1",
                backgroundColor: "#ffffff",
                color: "#2563eb",
                padding: "18px 28px",
                borderRadius: "14px",
                fontSize: "18px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              서비스 보기
            </button>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#f8fafc",
            borderRadius: "28px",
            padding: "26px",
            boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
          }}
        >
          <div style={statCardStyle}>
            <p style={statLabelStyle}>오늘 접수</p>
            <h3 style={statNumberStyle}>12건</h3>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>처리 진행</p>
            <h3 style={statNumberStyle}>5건</h3>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>완료</p>
            <h3 style={statNumberStyle}>21건</h3>
          </div>
        </div>
      </section>

      <section
        id="service-intro"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 24px 100px 24px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "52px",
            fontWeight: "800",
            color: "#111827",
            marginBottom: "24px",
          }}
        >
          FixFlow 소개
        </h2>

        <p
          style={{
            fontSize: "20px",
            color: "#6b7280",
            lineHeight: "1.8",
            marginBottom: "56px",
          }}
        >
          요청 등록부터 확인, 처리 상태 관리까지 한 곳에서 할 수 있게
          도와주는 서비스입니다.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          <div style={featureCardStyle}>
            <h3 style={featureTitleStyle}>간편한 요청 등록</h3>
            <p style={featureTextStyle}>
              제목, 카테고리, 장소, 내용을 입력해서
              <br />
              빠르게 요청을 등록할 수 있습니다.
            </p>
          </div>

          <div style={featureCardStyle}>
            <h3 style={featureTitleStyle}>내 요청 확인</h3>
            <p style={featureTextStyle}>
              내가 등록한 요청 목록을 보고
              <br />
              상세 내용까지 쉽게 확인할 수 있습니다.
            </p>
          </div>

          <div style={featureCardStyle}>
            <h3 style={featureTitleStyle}>처리 흐름 관리</h3>
            <p style={featureTextStyle}>
              접수 상태와 진행 흐름을 정리해서
              <br />
              보기 쉽게 관리할 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const menuButtonStyle = {
  border: "none",
  background: "none",
  cursor: "pointer",
  fontSize: "18px",
  color: "#111827",
  padding: 0,
};

const statCardStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "20px",
  padding: "24px 20px",
  marginBottom: "18px",
  textAlign: "left",
};

const statLabelStyle = {
  margin: "0 0 12px 0",
  fontSize: "16px",
  color: "#6b7280",
};

const statNumberStyle = {
  margin: 0,
  fontSize: "34px",
  fontWeight: "800",
  color: "#111827",
};

const featureCardStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "22px",
  padding: "28px 22px",
  textAlign: "left",
  minHeight: "180px",
};

const featureTitleStyle = {
  margin: "0 0 16px 0",
  fontSize: "28px",
  fontWeight: "800",
  color: "#111827",
};

const featureTextStyle = {
  margin: 0,
  fontSize: "17px",
  lineHeight: "1.8",
  color: "#6b7280",
};

export default LandingPage;