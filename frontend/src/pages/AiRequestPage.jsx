import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategoryIcon } from "../utils/categoryIcons.js";

const DAILY_LIMIT = 3;
const STORAGE_KEY = "ddookddak_ai_request_usage";

function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${date}`;
}

function getInitialUsage() {
  try {
    const today = getTodayKey();
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (saved?.date === today && typeof saved?.usedCount === "number") {
      return saved;
    }

    return {
      date: today,
      usedCount: 0,
    };
  } catch {
    return {
      date: getTodayKey(),
      usedCount: 0,
    };
  }
}

function SparkleIcon({ size = 18, color = "#6D4AFF" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2.5L13.8 7.2L18.5 9L13.8 10.8L12 15.5L10.2 10.8L5.5 9L10.2 7.2L12 2.5Z"
        fill={color}
      />
      <path
        d="M18.5 14.5L19.5 17L22 18L19.5 19L18.5 21.5L17.5 19L15 18L17.5 17L18.5 14.5Z"
        fill="#2F80ED"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 5V19"
        stroke="white"
        strokeWidth="2.7"
        strokeLinecap="round"
      />
      <path
        d="M6.5 10.5L12 5L17.5 10.5"
        stroke="white"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function detectCategory(text) {
  const value = text.toLowerCase();

  if (value.includes("전기") || value.includes("차단기") || value.includes("조명")) {
    return "전기";
  }

  if (value.includes("누수") || value.includes("물") || value.includes("배관")) {
    return "누수";
  }

  if (value.includes("에어컨") || value.includes("냉난방")) {
    return "에어컨";
  }

  if (value.includes("도어락") || value.includes("문") || value.includes("잠금")) {
    return "도어락";
  }

  if (value.includes("cctv") || value.includes("카메라")) {
    return "CCTV";
  }

  if (value.includes("간판")) {
    return "간판";
  }

  if (value.includes("설비") || value.includes("수도") || value.includes("싱크대")) {
    return "설비";
  }

  return "기타";
}

function makeTitle(category) {
  if (category === "전기") return "전기 점검 견적 요청";
  if (category === "누수") return "누수 수리 견적 요청";
  if (category === "에어컨") return "에어컨 점검 견적 요청";
  if (category === "도어락") return "도어락 수리 견적 요청";
  if (category === "CCTV") return "CCTV 점검 견적 요청";
  if (category === "간판") return "간판 수리 견적 요청";
  if (category === "설비") return "설비 수리 견적 요청";

  return "유지보수 견적 요청";
}

function AiRequestPage({ loginUser }) {
  const navigate = useNavigate();

  const storedRole = localStorage.getItem("role");
  const isAdmin =
    String(loginUser?.role || storedRole || "").trim().toLowerCase() ===
    "admin";

  const [usage, setUsage] = useState(getInitialUsage);
  const [requestText, setRequestText] = useState("");
  const [generatedRequest, setGeneratedRequest] = useState(null);

  const remainingCount = Math.max(DAILY_LIMIT - usage.usedCount, 0);
  const isLimitReached = !isAdmin && remainingCount <= 0;

  const examples = useMemo(
    () => [
      {
        category: "전기",
        title: "전기 점검",
        text: "사무실 차단기가 자꾸 내려가요. 콘센트 몇 군데도 전기가 안 들어와서 점검이 필요해요.",
      },
      {
        category: "누수",
        title: "누수 수리",
        text: "화장실 천장에서 물이 조금씩 떨어져요. 원인 확인이랑 수리가 필요합니다.",
      },
      {
        category: "에어컨",
        title: "에어컨 점검",
        text: "벽걸이 에어컨에서 냄새가 나고 바람이 약해요. 청소나 점검을 받고 싶어요.",
      },
      {
        category: "도어락",
        title: "도어락 수리",
        text: "도어락 번호가 잘 안 눌리고 문이 가끔 안 열려요. 교체가 필요한지도 확인하고 싶어요.",
      },
    ],
    []
  );

  const saveUsage = (nextUsedCount) => {
    const nextUsage = {
      date: getTodayKey(),
      usedCount: nextUsedCount,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUsage));
    setUsage(nextUsage);
  };

  const handleExampleClick = (text) => {
    setRequestText(text);
    setGeneratedRequest(null);
  };

  const handleGenerate = () => {
    const trimmedText = requestText.trim();

    if (!trimmedText) {
      alert("필요한 내용을 먼저 적어주세요.");
      return;
    }

    if (isLimitReached) {
        alert("오늘 사용할 수 있는 AI 요청 횟수를 모두 사용했어요.");
        return;
        }

    const category = detectCategory(trimmedText);
    const title = makeTitle(category);

    const draft = {
      category,
      title,
      content: `안녕하세요.

아래 내용으로 유지보수 견적을 요청드립니다.

${trimmedText}

가능한 일정, 예상 비용, 작업 가능 여부를 안내받고 싶습니다.
상담 후 자세한 작업 범위와 금액을 결정하고 싶습니다.`,
    };

    setGeneratedRequest(draft);
    if (!isAdmin) {
  saveUsage(Math.min(usage.usedCount + 1, DAILY_LIMIT));
}   
  };

  const handleMoveToRequestCreate = () => {
    if (!generatedRequest) return;

    navigate("/requests/new", {
      state: {
        aiDraft: generatedRequest,
      },
    });
  };

  return (
    <main className="ai-request-page">
      <section className="ai-request-wrap">
        <button
          type="button"
          className="ai-back-button"
          onClick={() => navigate(-1)}
        >
          ← 돌아가기
        </button>

        <div className="ai-top-info">
          <div className="ai-info-icon">i</div>
        </div>

        <section className="ai-title-area">
          <p className="ai-small-title">뚝딱 AI 요청 도우미</p>

          <h1>
            필요한 내용을 적으면
            <br />
            요청서로 정리해드려요
          </h1>

          <p className="ai-sub-desc">
            길게 쓰지 않아도 괜찮아요. 상황만 편하게 적어주세요.
          </p>

          <p className="ai-count-text">
            오늘 남은 AI 요청 횟수{" "}
            <strong>
              {isAdmin ? "무제한" : `${remainingCount}/${DAILY_LIMIT}`}
            </strong>
          </p>
        </section>

        <section className="ai-example-section">
          <div className="ai-section-title">
            <SparkleIcon size={18} />
            <span>이렇게 요청해 보세요</span>
          </div>

          <div className="ai-example-grid">
            {examples.map((item) => (
              <button
                key={item.title}
                type="button"
                className="ai-example-card"
                onClick={() => handleExampleClick(item.text)}
              >
                <div className="ai-example-icon">
                  <img
                    src={getCategoryIcon(item.category)}
                    alt={item.category}
                    draggable="false"
                  />
                </div>

                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="ai-input-section">
          <textarea
            value={requestText}
            onChange={(event) => {
              setRequestText(event.target.value);
              setGeneratedRequest(null);
            }}
            placeholder="어떤 서비스가 필요한지 알려 주세요."
            className="ai-textarea"
          />

          <button
            type="button"
            className="ai-send-button"
            onClick={handleGenerate}
            disabled={isLimitReached}
            aria-label="AI 요청서 만들기"
          >
            <SendIcon />
          </button>
        </section>

        {generatedRequest && (
          <section className="ai-result-box">
            <div className="ai-result-header">
              <div>
                <p>AI가 정리한 요청서 초안</p>
                <h2>{generatedRequest.title}</h2>
              </div>

              <span>{generatedRequest.category}</span>
            </div>

            <div className="ai-result-content">{generatedRequest.content}</div>

            <button
              type="button"
              className="ai-result-button"
              onClick={handleMoveToRequestCreate}
            >
              요청 등록 페이지로 가져가기
            </button>
          </section>
        )}

        {isLimitReached && (
        <p className="ai-limit-message">
            오늘은 AI 요청 횟수를 모두 사용했어요. 내일 다시 사용할 수 있어요.
        </p>
        )}
      </section>

      <style>{`
        .ai-request-page {
          min-height: 100vh;
          padding: 28px 18px 70px;
          box-sizing: border-box;
          background:
            radial-gradient(circle at top center, rgba(47, 128, 237, 0.09), transparent 32%),
            linear-gradient(180deg, #f4f8ff 0%, #ffffff 48%, #ffffff 100%);
          color: #0f172a;
        }

        .ai-request-page button,
        .ai-request-page textarea {
          font-family: inherit;
        }

        .ai-request-page button,
        .ai-request-page textarea,
        .ai-request-page button:hover,
        .ai-request-page textarea:hover,
        .ai-request-page button:focus,
        .ai-request-page textarea:focus,
        .ai-request-page button:active,
        .ai-request-page textarea:active,
        .ai-request-page button:focus-visible,
        .ai-request-page textarea:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }

        .ai-request-wrap {
          position: relative;
          max-width: 960px;
          margin: 0 auto;
        }

        .ai-back-button {
          position: absolute;
          left: 0;
          top: 0;
          height: 40px;
          padding: 0 15px;
          border: 1px solid #dbeafe;
          border-radius: 999px;
          background: #ffffff;
          color: #64748b;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          transition: color 0.18s ease, border-color 0.18s ease;
        }

        .ai-back-button:hover {
          color: #2f80ed;
          border-color: #bfdbfe;
        }

        .ai-top-info {
          display: flex;
          justify-content: flex-end;
          height: 40px;
        }

        .ai-info-icon {
          width: 24px;
          height: 24px;
          border-radius: 999px;
          border: 2px solid #334155;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #334155;
          font-size: 13px;
          font-weight: 900;
          line-height: 1;
        }

        .ai-title-area {
          padding: 34px 0 68px;
          text-align: center;
        }

        .ai-small-title {
          margin: 0 0 12px;
          color: #64748b;
          font-size: 15px;
          font-weight: 800;
        }

        .ai-title-area h1 {
          margin: 0;
          color: #3858f6;
          font-size: clamp(32px, 4.8vw, 48px);
          line-height: 1.22;
          letter-spacing: -0.055em;
          font-weight: 950;
        }

        .ai-sub-desc {
          margin: 18px 0 0;
          color: #64748b;
          font-size: 15px;
          line-height: 1.7;
          font-weight: 650;
        }

        .ai-count-text {
          margin: 18px 0 0;
          color: #64748b;
          font-size: 14px;
          font-weight: 750;
        }

        .ai-count-text strong {
          color: #3858f6;
        }

        .ai-example-section {
          margin-top: 0;
        }

        .ai-section-title {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 18px;
          color: #0f172a;
          font-size: 18px;
          font-weight: 950;
          letter-spacing: -0.035em;
        }

        .ai-example-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 32px;
        }

        .ai-example-card {
          min-height: 182px;
          padding: 22px 20px;
          border: 1px solid #e5edf7;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.95);
          text-align: left;
          cursor: pointer;
          transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
        }

        .ai-example-card:hover {
          transform: translateY(-3px);
          border-color: #bfdbfe;
          box-shadow: 0 16px 34px rgba(47, 128, 237, 0.1) !important;
        }

        .ai-example-icon {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          background: #eff6ff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .ai-example-icon img {
          width: 25px;
          height: 25px;
          object-fit: contain;
          display: block;
          user-select: none;
          pointer-events: none;
        }

        .ai-example-card strong {
          display: block;
          margin-bottom: 10px;
          color: #0f172a;
          font-size: 17px;
          font-weight: 950;
          letter-spacing: -0.035em;
        }

        .ai-example-card p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
          line-height: 1.65;
          font-weight: 650;
          word-break: keep-all;
        }

        .ai-input-section {
          position: relative;
          min-height: 150px;
          padding: 20px 68px 20px 20px;
          box-sizing: border-box;
          border: 1px solid #e5edf7;
          border-radius: 22px;
          background: #f3f6fb;
        }

        .ai-input-section:focus-within {
          border-color: #bfdbfe;
          background: #f8fbff;
        }

        .ai-textarea {
          width: 100%;
          min-height: 110px;
          border: none;
          resize: none;
          background: transparent;
          color: #334155;
          font-size: 16px;
          line-height: 1.65;
          font-weight: 650;
        }

        .ai-textarea::placeholder {
          color: #64748b;
        }

        .ai-send-button {
          position: absolute;
          right: 18px;
          bottom: 18px;
          width: 44px;
          height: 44px;
          border: none;
          border-radius: 999px;
          background: linear-gradient(135deg, #2f80ed 0%, #6d4aff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.18s ease, opacity 0.18s ease;
        }

        .ai-send-button:hover {
          transform: translateY(-1px);
        }

        .ai-send-button:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
        }

        .ai-result-box {
          margin-top: 22px;
          padding: 22px;
          border: 1px solid #dbeafe;
          border-radius: 22px;
          background: #ffffff;
          box-shadow: 0 16px 38px rgba(15, 23, 42, 0.06);
        }

        .ai-result-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 16px;
        }

        .ai-result-header p {
          margin: 0 0 7px;
          color: #3858f6;
          font-size: 13px;
          font-weight: 950;
        }

        .ai-result-header h2 {
          margin: 0;
          color: #0f172a;
          font-size: 21px;
          font-weight: 950;
          letter-spacing: -0.04em;
        }

        .ai-result-header span {
          flex-shrink: 0;
          padding: 8px 12px;
          border-radius: 999px;
          background: #eff6ff;
          color: #2f80ed;
          font-size: 13px;
          font-weight: 900;
        }

        .ai-result-content {
          white-space: pre-line;
          padding: 17px;
          border-radius: 16px;
          background: #f8fbff;
          color: #475569;
          font-size: 15px;
          line-height: 1.8;
          font-weight: 650;
        }

        .ai-result-button {
          width: 100%;
          height: 50px;
          margin-top: 16px;
          border: none;
          border-radius: 15px;
          background: #2f80ed;
          color: #ffffff;
          font-size: 15px;
          font-weight: 950;
          cursor: pointer;
          transition: background 0.18s ease, transform 0.18s ease;
        }

        .ai-result-button:hover {
          background: #1f6fd6;
          transform: translateY(-1px);
        }

        .ai-limit-message {
          margin: 16px 0 0;
          color: #64748b;
          font-size: 14px;
          font-weight: 700;
          text-align: center;
        }

        @media (max-width: 900px) {
          .ai-example-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .ai-request-page {
            padding: 20px 14px 56px;
          }

          .ai-back-button {
            position: static;
            margin-bottom: 10px;
          }

          .ai-top-info {
            position: absolute;
            right: 0;
            top: 6px;
          }

          .ai-title-area {
            padding: 28px 0 48px;
          }

          .ai-small-title {
            font-size: 14px;
          }

          .ai-title-area h1 {
            font-size: 31px;
          }

          .ai-sub-desc {
            font-size: 14px;
          }

          .ai-example-grid {
            grid-template-columns: 1fr;
            gap: 14px;
            margin-bottom: 24px;
          }

          .ai-example-card {
            min-height: auto;
            padding: 19px 18px;
          }

          .ai-input-section {
            min-height: 145px;
            padding: 18px 60px 18px 18px;
            border-radius: 20px;
          }

          .ai-textarea {
            min-height: 108px;
            font-size: 15px;
          }

          .ai-send-button {
            right: 14px;
            bottom: 14px;
            width: 42px;
            height: 42px;
          }

          .ai-result-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .ai-result-header h2 {
            font-size: 20px;
          }
        }
      `}</style>
    </main>
  );
}

export default AiRequestPage;