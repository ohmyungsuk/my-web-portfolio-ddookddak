import { useEffect, useState } from "react";

export default function RequestCategoryPage({ onSelectCategory }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categories = [
    { key: "repair", label: "설치/수리", icon: "🔧" },
    { key: "interior", label: "인테리어", icon: "🛋️" },
    { key: "moving", label: "이사/청소", icon: "🚚" },
    { key: "appliance", label: "가전", icon: "📺" },
    { key: "etc", label: "기타", icon: "📦" },
  ];

  const cardWrapStyle = {
    background: "#ffffff",
    borderRadius: "28px",
    padding: isMobile ? "22px 18px" : "30px 28px",
    boxShadow: "0 18px 40px rgba(15, 23, 42, 0.06)",
    border: "1px solid #eceff3",
  };

  const titleStyle = {
    fontSize: isMobile ? "24px" : "32px",
    fontWeight: 800,
    color: "#111827",
    marginBottom: "10px",
    letterSpacing: "-0.02em",
  };

  const subtitleStyle = {
    fontSize: isMobile ? "15px" : "17px",
    color: "#6b7280",
    marginBottom: "28px",
    lineHeight: 1.6,
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)",
    gap: "14px",
  };

  return (
    <div style={cardWrapStyle}>
      <div style={titleStyle}>어떤 요청을 등록할까요?</div>
      <div style={subtitleStyle}>
        먼저 큰 카테고리를 골라주시면,
        <br />
        그다음에 세부 서비스와 요청 내용을 차근차근 받을게요.
      </div>

      <div style={gridStyle}>
        {categories.map((item) => (
          <button
            key={item.key}
            onClick={() =>
              onSelectCategory({
                mainCategory: item.key,
                mainCategoryLabel: item.label,
              })
            }
            style={{
              border: "1px solid #e5e7eb",
              background: "#fff",
              borderRadius: "22px",
              padding: isMobile ? "18px 10px" : "22px 12px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              minHeight: isMobile ? "120px" : "140px",
              fontWeight: 700,
              color: "#1f2937",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.03)",
            }}
            onMouseEnter={(e) => {
              if (window.innerWidth > 768) {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 24px rgba(15, 23, 42, 0.08)";
                e.currentTarget.style.background = "#f8fafc";
                e.currentTarget.style.borderColor = "#dbe4f0";
              }
            }}
            onMouseLeave={(e) => {
              if (window.innerWidth > 768) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(15, 23, 42, 0.03)";
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.borderColor = "#e5e7eb";
              }
            }}
          >
            <div style={{ fontSize: isMobile ? "28px" : "34px" }}>{item.icon}</div>
            <div style={{ fontSize: isMobile ? "14px" : "15px" }}>{item.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}