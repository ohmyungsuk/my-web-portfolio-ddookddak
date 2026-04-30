import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const BRAND = "#2F80ED";
const BRAND_HOVER = "#1F6FD6";
const TEXT = "#0F172A";
const SUB = "#64748B";
const BORDER = "#E5EDF6";

function SupportPage({ isLoggedIn }) {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState("request");

  const quickLinks = useMemo(
    () => [
      {
        title: "요청 접수",
        desc: "수리나 점검이 필요하면 바로 요청을 등록하세요.",
        action: () => navigate(isLoggedIn ? "/requests/new" : "/login"),
      },
      {
        title: "상태 확인",
        desc: "내가 등록한 요청의 진행 상태를 확인할 수 있어요.",
        action: () => navigate(isLoggedIn ? "/requests/my" : "/login"),
      },
      {
        title: "커뮤니티",
        desc: "작업 팁과 이용 후기를 먼저 살펴보세요.",
        action: () => navigate("/community"),
      },
    ],
    [isLoggedIn, navigate],
  );

  const faqItems = [
    {
      id: "request",
      question: "요청은 어떻게 접수하나요?",
      answer:
        "상단 또는 고객센터의 요청 접수 버튼을 누른 뒤 서비스 종류와 현장 상황을 입력하면 됩니다. 사진을 함께 올리면 담당자가 더 빠르게 확인할 수 있습니다.",
    },
    {
      id: "status",
      question: "진행 상태는 어디서 확인하나요?",
      answer:
        "로그인 후 내 요청 목록에서 접수, 배정, 진행 중, 완료 상태를 확인할 수 있습니다. 상태가 바뀌면 알림으로도 안내됩니다.",
    },
    {
      id: "worker",
      question: "담당자는 어떻게 연결되나요?",
      answer:
        "요청 내용과 서비스 분야를 기준으로 담당자가 확인합니다. 필요한 경우 요청 상세에서 추가 안내가 이어질 수 있습니다.",
    },
    {
      id: "account",
      question: "계정 정보와 프로필 사진은 어디서 수정하나요?",
      answer:
        "로그인 후 마이페이지에서 이름, 프로필 사진, 알림 설정 등 계정 정보를 관리할 수 있습니다.",
    },
  ];

  const cardStyle = {
    border: `1px solid ${BORDER}`,
    borderRadius: "8px",
    background: "#ffffff",
    boxShadow: "0 10px 24px rgba(15, 23, 42, 0.04)",
  };

  const primaryButtonStyle = {
    border: "none",
    borderRadius: "12px",
    height: "44px",
    padding: "0 18px",
    background: BRAND,
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "900",
    cursor: "pointer",
    fontFamily:
      '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #F8FBFF 0%, #F5F7FB 48%, #FFFFFF 100%)",
        padding: "128px 24px 72px",
        boxSizing: "border-box",
        fontFamily:
          '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "22px",
            alignItems: "stretch",
            marginBottom: "24px",
          }}
        >
          <div style={{ ...cardStyle, padding: "34px" }}>
            <p
              style={{
                margin: "0 0 10px",
                color: BRAND,
                fontSize: "13px",
                fontWeight: "900",
              }}
            >
              고객센터
            </p>
            <h1
              style={{
                margin: "0 0 14px",
                color: TEXT,
                fontSize: "34px",
                lineHeight: 1.25,
                fontWeight: "950",
              }}
            >
              도움이 필요하신가요?
            </h1>
            <p
              style={{
                margin: 0,
                maxWidth: "620px",
                color: SUB,
                fontSize: "15px",
                lineHeight: 1.8,
                wordBreak: "keep-all",
              }}
            >
              요청 접수, 진행 상태, 담당자 연결, 계정 관리까지 자주 찾는
              도움말을 한 곳에서 확인할 수 있습니다.
            </p>
          </div>

          <div style={{ ...cardStyle, padding: "24px" }}>
            <h2
              style={{
                margin: "0 0 14px",
                color: TEXT,
                fontSize: "18px",
                fontWeight: "900",
              }}
            >
              빠른 문의
            </h2>
            <div style={{ display: "grid", gap: "10px" }}>
              {quickLinks.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={item.action}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#BFD7FF";
                    e.currentTarget.style.color = BRAND;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = BORDER;
                    e.currentTarget.style.color = TEXT;
                  }}
                  style={{
                    border: `1px solid ${BORDER}`,
                    borderRadius: "8px",
                    background: "#ffffff",
                    padding: "14px",
                    textAlign: "left",
                    cursor: "pointer",
                    color: TEXT,
                    fontFamily: "inherit",
                    transition: "color 0.16s ease, border-color 0.16s ease",
                  }}
                >
                  <strong style={{ display: "block", fontSize: "14px" }}>
                    {item.title}
                  </strong>
                  <span
                    style={{
                      display: "block",
                      marginTop: "4px",
                      color: SUB,
                      fontSize: "12px",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "22px",
          }}
        >
          <div style={{ ...cardStyle, padding: "26px" }}>
            <h2
              style={{
                margin: "0 0 18px",
                color: TEXT,
                fontSize: "22px",
                fontWeight: "950",
              }}
            >
              자주 묻는 질문
            </h2>
            <div style={{ display: "grid", gap: "10px" }}>
              {faqItems.map((item) => {
                const isOpen = openFaq === item.id;

                return (
                  <div
                    key={item.id}
                    style={{
                      border: `1px solid ${isOpen ? "#BFD7FF" : BORDER}`,
                      borderRadius: "8px",
                      background: isOpen ? "#F8FBFF" : "#ffffff",
                      overflow: "hidden",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? "" : item.id)}
                      style={{
                        width: "100%",
                        border: "none",
                        background: "transparent",
                        padding: "16px",
                        color: TEXT,
                        textAlign: "left",
                        fontSize: "15px",
                        fontWeight: "900",
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      {item.question}
                    </button>
                    {isOpen && (
                      <p
                        style={{
                          margin: 0,
                          padding: "0 16px 16px",
                          color: SUB,
                          fontSize: "14px",
                          lineHeight: 1.75,
                          wordBreak: "keep-all",
                        }}
                      >
                        {item.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <aside style={{ ...cardStyle, padding: "26px" }}>
            <h2
              style={{
                margin: "0 0 12px",
                color: TEXT,
                fontSize: "20px",
                fontWeight: "950",
              }}
            >
              문의 전 확인해 주세요
            </h2>
            <p
              style={{
                margin: "0 0 18px",
                color: SUB,
                fontSize: "14px",
                lineHeight: 1.75,
                wordBreak: "keep-all",
              }}
            >
              사진, 위치, 증상, 희망 일정을 자세히 입력하면 담당자가 더 빠르게
              확인할 수 있습니다.
            </p>
            <button
              type="button"
              onClick={() => navigate(isLoggedIn ? "/requests/new" : "/login")}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = BRAND_HOVER;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = BRAND;
              }}
              style={{ ...primaryButtonStyle, width: "100%" }}
            >
              요청 등록하기
            </button>
          </aside>
        </section>
      </div>
    </main>
  );
}

export default SupportPage;
