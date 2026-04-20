import { useEffect, useMemo, useState } from "react";
import AppButton from "../components/AppButton";

export default function RequestQuestionPage({
  requestData,
  onBack,
  onNext,
  onGoHome,
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const questionData = useMemo(() => {
    if (requestData.subCategory === "wall-floor") {
      return {
        title: "어떤 시공을 원하시나요?",
        helper:
          "몇 가지 정보만 알려주시면 더 잘 맞는 작업자로 연결하기 쉬워져요.",
        options: [
          { key: "wallpaper-floor", label: "도배 + 장판", badge: "많이 선택했어요" },
          { key: "wallpaper", label: "도배" },
          { key: "flooring", label: "장판" },
        ],
      };
    }

    if (requestData.subCategory === "total-interior") {
      return {
        title: "어떤 유형의 인테리어인가요?",
        helper: "공간 유형을 고르면 다음 입력이 더 쉬워져요.",
        options: [
          { key: "home-interior", label: "주택 인테리어", badge: "추천" },
          { key: "apartment-interior", label: "아파트 인테리어" },
          { key: "commercial-interior", label: "상업공간 인테리어" },
        ],
      };
    }

    return {
      title: "어떤 요청에 가까운가요?",
      helper: "가장 비슷한 항목 하나를 골라주세요.",
      options: [
        { key: "install", label: "새로 설치하고 싶어요" },
        { key: "repair", label: "고장 나서 수리하고 싶어요" },
        { key: "check", label: "점검/상담을 먼저 받고 싶어요" },
      ],
    };
  }, [requestData.subCategory]);

  const optionButtonBaseStyle = {
    width: "100%",
    textAlign: "left",
    borderRadius: "18px",
    padding: "18px 18px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  return (
    <div
      style={{
        maxWidth: "760px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "22px",
          padding: isMobile ? "18px" : "22px",
          border: "1px solid #eceff3",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
          marginBottom: "18px",
        }}
      >
        <div
          style={{
            fontSize: isMobile ? "17px" : "20px",
            fontWeight: 700,
            color: "#374151",
            lineHeight: 1.6,
          }}
        >
          몇 가지 정보만 알려주시면
          <br />
          평균 4명 이상의 작업자에게 보여줄 수 있게 도와줄게요.
        </div>
      </div>

      <div
        style={{
          background: "#ffffff",
          borderRadius: "28px",
          padding: isMobile ? "20px 16px" : "28px",
          border: "1px solid #eceff3",
          boxShadow: "0 16px 36px rgba(15, 23, 42, 0.06)",
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
          {questionData.title}
        </div>

        <div
          style={{
            fontSize: "15px",
            color: "#6b7280",
            lineHeight: 1.6,
            marginBottom: "22px",
          }}
        >
          {questionData.helper}
        </div>

        <div style={{ display: "grid", gap: "12px" }}>
          {questionData.options.map((option) => {
            const isSelected = selectedOption === option.key;

            return (
              <button
                key={option.key}
                onClick={() => setSelectedOption(option.key)}
                style={{
                  ...optionButtonBaseStyle,
                  border: isSelected ? "2px solid #3b82f6" : "1px solid #e5e7eb",
                  background: isSelected ? "#eff6ff" : "#ffffff",
                  boxShadow: isSelected
                    ? "0 10px 24px rgba(59, 130, 246, 0.10)"
                    : "0 4px 12px rgba(15, 23, 42, 0.03)",
                }}
                onMouseEnter={(e) => {
                  if (window.innerWidth > 768) {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 24px rgba(15, 23, 42, 0.08)";
                    if (!isSelected) {
                      e.currentTarget.style.background = "#f8fafc";
                      e.currentTarget.style.borderColor = "#dbe4f0";
                    }
                  }
                }}
                onMouseLeave={(e) => {
                  if (window.innerWidth > 768) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = isSelected
                      ? "0 10px 24px rgba(59, 130, 246, 0.10)"
                      : "0 4px 12px rgba(15, 23, 42, 0.03)";
                    e.currentTarget.style.background = isSelected
                      ? "#eff6ff"
                      : "#ffffff";
                    e.currentTarget.style.borderColor = isSelected
                      ? "#3b82f6"
                      : "#e5e7eb";
                  }
                }}
              >
                {option.badge && (
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#2563eb",
                      marginBottom: "6px",
                    }}
                  >
                    {option.badge}
                  </div>
                )}

                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  {option.label}
                </div>
              </button>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "22px",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <AppButton
            variant="secondary"
            size="lg"
            fullWidth
            onClick={onBack}
          >
            이전
          </AppButton>

          <AppButton
            variant="primary"
            size="lg"
            fullWidth
            disabled={!selectedOption}
            onClick={() =>
              onNext({
                serviceType: selectedOption,
              })
            }
          >
            다음
          </AppButton>
        </div>

        <div style={{ marginTop: "12px" }}>
          <AppButton
            variant="secondary"
            size="lg"
            fullWidth
            onClick={onGoHome}
          >
            메인으로 돌아가기
          </AppButton>
        </div>
      </div>
    </div>
  );
}