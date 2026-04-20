import { useEffect, useMemo, useState } from "react";
import AppButton from "../components/AppButton";

export default function RequestServicePage({
  requestData,
  onBack,
  onSelectService,
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const serviceMap = useMemo(
    () => ({
      interior: [
        {
          key: "total-interior",
          label: "종합 인테리어",
          desc: "집 전체 / 상업공간 / 리모델링",
        },
        {
          key: "partial-interior",
          label: "부분 인테리어",
          desc: "주방 / 욕실 / 거실 / 방",
        },
        {
          key: "wall-floor",
          label: "벽/바닥 시공",
          desc: "도배 / 장판 / 마루 / 타일",
        },
      ],
      repair: [
        {
          key: "electric",
          label: "전기/조명",
          desc: "조명 설치 / 콘센트 / 스위치",
        },
        {
          key: "water",
          label: "수전/배관",
          desc: "수도 / 배수 / 누수 / 변기",
        },
        {
          key: "door",
          label: "문/창호 수리",
          desc: "도어락 / 문틀 / 창문 / 방충망",
        },
      ],
      moving: [
        {
          key: "cleaning",
          label: "청소",
          desc: "입주 / 이사 / 상가 / 정기청소",
        },
        {
          key: "moving-service",
          label: "이사",
          desc: "원룸 / 가정 / 사무실",
        },
      ],
      appliance: [
        {
          key: "aircon",
          label: "에어컨",
          desc: "설치 / 이전 / 철거 / 점검",
        },
        {
          key: "tv",
          label: "TV/벽걸이",
          desc: "브라켓 / 벽걸이 설치",
        },
      ],
      etc: [
        {
          key: "custom",
          label: "직접 설명할게요",
          desc: "서비스가 애매하면 직접 입력",
        },
      ],
    }),
    []
  );

  const services = serviceMap[requestData.mainCategory] || [];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "280px 1fr",
        gap: "18px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "20px",
          border: "1px solid #eceff3",
          boxShadow: "0 12px 30px rgba(15, 23, 42, 0.05)",
          height: "fit-content",
        }}
      >
        <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
          선택한 카테고리
        </div>

        <div
          style={{
            fontSize: "24px",
            fontWeight: 800,
            color: "#111827",
            marginBottom: "18px",
          }}
        >
          {requestData.mainCategoryLabel}
        </div>

        <AppButton variant="secondary" size="lg" fullWidth onClick={onBack}>
          이전으로
        </AppButton>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: isMobile ? "22px 18px" : "28px",
          border: "1px solid #eceff3",
          boxShadow: "0 12px 30px rgba(15, 23, 42, 0.05)",
        }}
      >
        <div
          style={{
            fontSize: isMobile ? "24px" : "30px",
            fontWeight: 800,
            color: "#111827",
            marginBottom: "10px",
            letterSpacing: "-0.02em",
          }}
        >
          어떤 서비스가 필요할까요?
        </div>

        <div
          style={{
            color: "#6b7280",
            fontSize: "16px",
            marginBottom: "24px",
            lineHeight: 1.6,
          }}
        >
          세부 서비스를 선택하면, 그다음 단계에서 필요한 질문을 이어서 받을게요.
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: "14px",
          }}
        >
          {services.map((item) => (
            <button
              key={item.key}
              onClick={() =>
                onSelectService({
                  subCategory: item.key,
                  subCategoryLabel: item.label,
                })
              }
              style={{
                textAlign: "left",
                border: "1px solid #e5e7eb",
                background: "#fff",
                borderRadius: "20px",
                padding: "20px",
                cursor: "pointer",
                transition: "all 0.2s ease",
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
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#111827",
                  marginBottom: "8px",
                }}
              >
                {item.label}
              </div>

              <div
                style={{
                  fontSize: "15px",
                  color: "#6b7280",
                  lineHeight: 1.5,
                }}
              >
                {item.desc}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}