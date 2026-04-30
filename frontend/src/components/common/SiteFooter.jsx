import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BRAND = "#2F80ED";
const TEXT = "#0F172A";
const SUB = "#64748B";
const BORDER = "#E5EDF6";

function SiteFooter({ isLoggedIn = false }) {
  const navigate = useNavigate();

  const goCreate = () => navigate(isLoggedIn ? "/requests/new" : "/login");
  const goMyRequests = () => navigate(isLoggedIn ? "/requests/my" : "/login");

  return (
    <footer
      style={{
        borderTop: `1px solid ${BORDER}`,
        backgroundColor: "#ffffff",
        fontFamily:
          '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "34px 24px 40px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "24px",
            alignItems: "start",
          }}
        >
          <div>
            <button
              type="button"
              onClick={() => navigate("/")}
              style={{
                border: "none",
                background: "transparent",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "14px",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              <span
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "14px",
                  background: BRAND,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontWeight: "800",
                  fontSize: "14px",
                  boxShadow: "0 10px 24px rgba(47, 128, 237, 0.18)",
                }}
              >
                ㄸ
              </span>
              <span
                style={{
                  fontSize: "23px",
                  fontWeight: "800",
                  color: BRAND,
                  letterSpacing: "-0.5px",
                }}
              >
                뚝딱
              </span>
            </button>

            <p
              style={{
                margin: 0,
                fontSize: "14px",
                lineHeight: "1.9",
                color: SUB,
                maxWidth: "360px",
              }}
            >
              유지보수 요청을 간단하고 빠르게 접수하고 상태를 체계적으로
              관리하기 위한 서비스 플랫폼입니다.
            </p>
          </div>

          <FooterColumn
            title="메뉴"
            items={[
              { label: "홈", onClick: () => navigate("/") },
              { label: "서비스 소개", onClick: () => navigate("/") },
              { label: "커뮤니티", onClick: () => navigate("/community") },
            ]}
          />
          <FooterColumn
            title="서비스"
            items={[
              { label: "요청 접수", onClick: goCreate },
              { label: "상태 확인", onClick: goMyRequests },
              { label: "전체 요청 보기", onClick: () => navigate("/requests/all") },
              { label: "담당자 연결", onClick: goCreate },
            ]}
          />
          <FooterColumn
            title="고객지원"
            items={[
              { label: "고객센터", onClick: () => navigate("/support") },
              { label: "이용약관", onClick: () => navigate("/terms") },
              { label: "개인정보 처리방침", onClick: () => navigate("/privacy") },
            ]}
          />
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }) {
  const [hoveredItem, setHoveredItem] = useState("");

  return (
    <div>
      <div
        style={{
          fontSize: "14px",
          fontWeight: "800",
          color: TEXT,
          marginBottom: "12px",
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {items.map((item) => {
          const isHover = hoveredItem === item.label;

          return (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem("")}
              onMouseDown={(e) => e.currentTarget.blur()}
              style={{
                width: "fit-content",
                border: "none",
                background: "transparent",
                padding: 0,
                fontSize: "14px",
                color: isHover ? BRAND : SUB,
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight: isHover ? "800" : "500",
                textAlign: "left",
                transition: "color 0.16s ease, font-weight 0.16s ease",
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SiteFooter;
