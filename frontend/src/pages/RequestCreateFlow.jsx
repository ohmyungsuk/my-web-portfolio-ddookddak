import { useEffect, useMemo, useState } from "react";
import Header from "../components/common/Header";

const INITIAL_ANSWERS = {
  mainCategory: "",
  subCategory: "",
  spaceType: "",
  schedule: "",
  location: "",
  detail: "",
};

const CATEGORY_OPTIONS = [
  { value: "repair", label: "설치/수리", emoji: "🔧" },
  { value: "interior", label: "인테리어", emoji: "🛋️" },
  { value: "cleaning", label: "청소/이사", emoji: "🧹" },
  { value: "appliance", label: "가전", emoji: "📺" },
  { value: "etc", label: "기타", emoji: "📦" },
];

const SERVICE_MAP = {
  repair: [
    { value: "electric", label: "전기/조명" },
    { value: "water", label: "배관/누수" },
    { value: "door", label: "문/창호 수리" },
    { value: "lock", label: "도어락/잠금장치" },
  ],
  interior: [
    { value: "wallpaper", label: "도배" },
    { value: "floor", label: "장판/마루" },
    { value: "wallpaper-floor", label: "도배 + 장판" },
    { value: "partial", label: "부분 인테리어" },
    { value: "total", label: "종합 인테리어" },
  ],
  cleaning: [
    { value: "move-cleaning", label: "입주/이사 청소" },
    { value: "home-cleaning", label: "집 청소" },
    { value: "office-cleaning", label: "사무실 청소" },
    { value: "moving", label: "이사" },
  ],
  appliance: [
    { value: "aircon", label: "에어컨" },
    { value: "tv", label: "TV/벽걸이 설치" },
    { value: "washer", label: "세탁기" },
    { value: "refrigerator", label: "냉장고" },
  ],
  etc: [{ value: "custom", label: "직접 설명할게요" }],
};

const SPACE_OPTIONS = [
  { value: "apartment", label: "아파트" },
  { value: "villa", label: "빌라/주택" },
  { value: "officetel", label: "오피스텔" },
  { value: "store", label: "상가/사무실" },
  { value: "other-space", label: "기타" },
];

const SCHEDULE_OPTIONS = [
  { value: "urgent", label: "가능한 빨리" },
  { value: "within-week", label: "1주 이내" },
  { value: "flexible", label: "일정 협의 가능" },
];

function buildQuestions(mainCategory) {
  const selectedCategory =
    CATEGORY_OPTIONS.find((item) => item.value === mainCategory)?.label || "서비스";

  return [
    {
      key: "mainCategory",
      type: "options",
      title: "어떤 도움이 필요하신가요?",
      description: "먼저 큰 카테고리를 골라주시면 흐름에 맞게 질문해드릴게요.",
      options: CATEGORY_OPTIONS,
    },
    {
      key: "subCategory",
      type: "options",
      title: `${selectedCategory} 중 어떤 작업이 필요하신가요?`,
      description: "가장 가까운 항목을 하나 골라주세요.",
      options: SERVICE_MAP[mainCategory] || [],
    },
    {
      key: "spaceType",
      type: "options",
      title: "어떤 공간에서 진행하실 건가요?",
      description: "작업 위치의 공간 유형을 알려주세요.",
      options: SPACE_OPTIONS,
    },
    {
      key: "schedule",
      type: "options",
      title: "언제 진행하고 싶으신가요?",
      description: "희망 일정을 알려주시면 맞는 작업자를 찾기 더 쉬워져요.",
      options: SCHEDULE_OPTIONS,
    },
    {
      key: "location",
      type: "text",
      title: "어느 지역에서 진행할까요?",
      description: "예: 서울 송파구 잠실동 / 경기 성남시 분당구",
      placeholder: "지역을 입력해 주세요",
    },
    {
      key: "detail",
      type: "textarea",
      title: "작업 내용을 조금만 더 자세히 알려주세요.",
      description: "현재 상태, 필요한 작업, 참고사항 등을 자유롭게 적어주세요.",
      placeholder:
        "예: 거실 벽지 곰팡이 때문에 도배를 새로 하고 싶어요. 바닥 장판도 같이 교체 희망합니다.",
    },
  ];
}

function getOptionLabel(question, value) {
  if (!question) return value || "";
  if (question.type !== "options") return value || "";
  return question.options.find((item) => item.value === value)?.label || value || "";
}

export default function RequestCreateFlow() {
  const [answers, setAnswers] = useState(INITIAL_ANSWERS);
  const [currentStep, setCurrentStep] = useState(0);
  const [draftChoice, setDraftChoice] = useState("");
  const [draftText, setDraftText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = useMemo(
    () => buildQuestions(answers.mainCategory),
    [answers.mainCategory]
  );

  const currentQuestion = currentStep < questions.length ? questions[currentStep] : null;

  useEffect(() => {
    if (!currentQuestion) return;

    if (currentQuestion.type === "options") {
      setDraftChoice(answers[currentQuestion.key] || "");
      setDraftText("");
    } else {
      setDraftText(answers[currentQuestion.key] || "");
      setDraftChoice("");
    }
  }, [currentQuestion, answers]);

  const completedCount = questions.filter((q) => {
    const value = answers[q.key];
    return typeof value === "string" ? value.trim() !== "" : Boolean(value);
  }).length;

  const progress = Math.max(8, Math.round((completedCount / questions.length) * 100));

  const currentMainCategory = CATEGORY_OPTIONS.find(
    (item) => item.value === answers.mainCategory
  );

  const currentSubCategory =
    SERVICE_MAP[answers.mainCategory]?.find(
      (item) => item.value === answers.subCategory
    ) || null;

  const flowTitle = currentSubCategory?.label || currentMainCategory?.label || "요청 등록";
  const visibleAnsweredQuestions = questions.slice(0, currentStep);

  const handleNext = () => {
    if (!currentQuestion) return;

    const rawValue =
      currentQuestion.type === "options" ? draftChoice : draftText.trim();

    if (!rawValue) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.key]: rawValue,
    }));

    setCurrentStep((prev) => prev + 1);
  };

  const handleEdit = (questionKey) => {
    const index = questions.findIndex((item) => item.key === questionKey);
    if (index === -1) return;

    const keepKeys = questions.slice(0, index).map((item) => item.key);

    setAnswers((prev) => {
      const next = { ...INITIAL_ANSWERS };
      keepKeys.forEach((key) => {
        next[key] = prev[key];
      });
      return next;
    });

    setCurrentStep(index);
  };

  const handleBack = () => {
    if (currentStep === 0) {
      window.history.back();
      return;
    }
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    const payload = {
      ...answers,
      mainCategoryLabel: currentMainCategory?.label || "",
      subCategoryLabel: currentSubCategory?.label || "",
      spaceTypeLabel:
        SPACE_OPTIONS.find((item) => item.value === answers.spaceType)?.label || "",
      scheduleLabel:
        SCHEDULE_OPTIONS.find((item) => item.value === answers.schedule)?.label || "",
    };

    console.log("요청 등록 payload:", payload);

    try {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 700));
      alert("요청 등록 UI 1차 완료! 다음 단계에서 백엔드 저장 연결하면 됩니다.");
    } catch (error) {
      console.error(error);
      alert("요청 등록 중 문제가 발생했어요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = `
    * {
      box-sizing: border-box;
    }

    .dd-page {
      min-height: 100vh;
      background: #f6f7fb;
      color: #111827;
    }

    .dd-main {
      padding: 96px 16px 72px;
    }

    .dd-shell {
      max-width: 1100px;
      margin: 0 auto;
    }

    .dd-top-card {
      background: #ffffff;
      border: 1px solid #e8ecf3;
      border-radius: 28px;
      padding: 24px 24px 22px;
      box-shadow: 0 16px 40px rgba(15, 23, 42, 0.05);
      margin-bottom: 24px;
    }

    .dd-top-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 12px;
    }

    .dd-top-title {
      fontSize: 28px;
      font-weight: 900;
      letter-spacing: -0.03em;
      color: #111827;
    }

    .dd-progress-text {
      font-size: 18px;
      font-weight: 800;
      color: #3b82f6;
    }

    .dd-progress-track {
      height: 8px;
      background: #e5e7eb;
      border-radius: 999px;
      overflow: hidden;
    }

    .dd-progress-bar {
      height: 100%;
      border-radius: 999px;
      background: linear-gradient(90deg, #5b8eff 0%, #2563eb 100%);
      transition: width 0.3s ease;
    }

    .dd-chat-layout {
      max-width: 760px;
      margin: 0 auto;
    }

    .dd-assistant-bubble {
      max-width: 78%;
      padding: 18px 20px;
      border-radius: 22px;
      background: #ffffff;
      border: 1px solid #e9edf3;
      box-shadow: 0 10px 28px rgba(15, 23, 42, 0.05);
      color: #374151;
      font-size: 17px;
      font-weight: 700;
      line-height: 1.6;
      margin-bottom: 18px;
    }

    .dd-user-wrap {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 26px;
    }

    .dd-user-inner {
      max-width: 82%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
    }

    .dd-user-bubble {
      background: #4b5563;
      color: #ffffff;
      border-radius: 20px;
      padding: 16px 18px;
      font-size: 16px;
      font-weight: 700;
      line-height: 1.5;
      box-shadow: 0 12px 24px rgba(55, 65, 81, 0.18);
    }

    .dd-edit-link {
      border: none;
      background: transparent;
      color: #6b7280;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      padding: 0;
    }

    .dd-edit-link:hover {
      color: #2563eb;
      text-decoration: underline;
    }

    .dd-chat-card {
      background: #ffffff;
      border-radius: 28px;
      padding: 24px;
      border: 1px solid #e8ecf3;
      box-shadow: 0 16px 38px rgba(15, 23, 42, 0.06);
      margin-top: 8px;
    }

    .dd-chat-card-title {
      font-size: 30px;
      font-weight: 900;
      letter-spacing: -0.03em;
      color: #111827;
      margin-bottom: 8px;
      line-height: 1.3;
    }

    .dd-chat-card-desc {
      font-size: 15px;
      color: #6b7280;
      line-height: 1.6;
      margin-bottom: 22px;
    }

    .dd-options {
      display: grid;
      gap: 12px;
    }

    .dd-option {
      width: 100%;
      text-align: left;
      border-radius: 18px;
      border: 1px solid #e5e7eb;
      background: #ffffff;
      padding: 16px 18px;
      cursor: pointer;
      transition:
        background-color 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease,
        transform 0.2s ease;
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .dd-option--selected {
      background: #eff6ff;
      border-color: #3b82f6;
      box-shadow: 0 10px 24px rgba(59, 130, 246, 0.10);
    }

    .dd-option-radio {
      width: 22px;
      height: 22px;
      border-radius: 999px;
      border: 2px solid #d1d5db;
      flex-shrink: 0;
      position: relative;
    }

    .dd-option--selected .dd-option-radio {
      border-color: #3b82f6;
    }

    .dd-option--selected .dd-option-radio::after {
      content: "";
      position: absolute;
      top: 4px;
      left: 4px;
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: #3b82f6;
    }

    .dd-option-text {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 17px;
      font-weight: 800;
      color: #111827;
      line-height: 1.4;
    }

    .dd-option-emoji {
      font-size: 20px;
      flex-shrink: 0;
    }

    .dd-input,
    .dd-textarea {
      width: 100%;
      border: 1px solid #dbe4f0;
      background: #ffffff;
      border-radius: 18px;
      padding: 16px 18px;
      font-size: 16px;
      color: #111827;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .dd-input {
      height: 56px;
    }

    .dd-textarea {
      min-height: 160px;
      resize: vertical;
      line-height: 1.6;
    }

    .dd-input:focus,
    .dd-textarea:focus {
      border-color: #60a5fa;
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.10);
    }

    .dd-btn {
      border: none;
      outline: none;
      border-radius: 16px;
      font-weight: 800;
      cursor: pointer;
      transition:
        background-color 0.2s ease,
        color 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease,
        transform 0.2s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      text-decoration: none;
      white-space: nowrap;
    }

    .dd-btn--primary {
      background: #3b82f6;
      color: #ffffff;
      box-shadow: 0 8px 20px rgba(59, 130, 246, 0.18);
    }

    .dd-btn--secondary {
      background: #ffffff;
      color: #1e293b;
      border: 1px solid #e5e7eb;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
    }

    .dd-btn--lg {
      height: 56px;
      padding: 0 24px;
      font-size: 16px;
    }

    .dd-btn--full {
      width: 100%;
    }

    .dd-btn:disabled {
      background: #dbe2ea !important;
      color: #94a3b8 !important;
      border-color: #dbe2ea !important;
      box-shadow: none !important;
      cursor: not-allowed;
      transform: none !important;
    }

    .dd-actions {
      display: flex;
      gap: 12px;
      margin-top: 22px;
    }

    .dd-summary-list {
      display: grid;
      gap: 12px;
      margin-top: 8px;
    }

    .dd-summary-item {
      border: 1px solid #e8ecf3;
      border-radius: 18px;
      padding: 16px 18px;
      background: #fbfcfe;
    }

    .dd-summary-label {
      font-size: 13px;
      font-weight: 800;
      color: #6b7280;
      margin-bottom: 6px;
    }

    .dd-summary-value {
      font-size: 16px;
      font-weight: 800;
      color: #111827;
      line-height: 1.5;
      word-break: keep-all;
    }

    .dd-help-card {
      margin-bottom: 18px;
    }

    @media (hover: hover) and (pointer: fine) {
      .dd-btn--primary:hover {
        background: #2f76ea;
        box-shadow: 0 12px 24px rgba(59, 130, 246, 0.24);
        transform: translateY(-1px);
      }

      .dd-btn--secondary:hover {
        background: #f1f5f9;
        color: #3b82f6;
        border-color: #dbe4f0;
        box-shadow: 0 8px 18px rgba(15, 23, 42, 0.07);
        transform: translateY(-1px);
      }

      .dd-option:hover {
        transform: translateY(-1px);
        box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
        border-color: #dbe4f0;
        background: #f8fafc;
      }

      .dd-option--selected:hover {
        background: #eff6ff;
        border-color: #3b82f6;
      }
    }

    @media (max-width: 768px) {
    .dd-main {
        padding: 88px 12px 56px;
    }
    }

      .dd-top-card {
        border-radius: 22px;
        padding: 18px 18px 16px;
      }

      .dd-top-card-header {
        align-items: flex-start;
        flex-direction: column;
        margin-bottom: 10px;
      }

      .dd-top-title {
        font-size: 22px;
      }

      .dd-progress-text {
        font-size: 16px;
      }

      .dd-assistant-bubble {
        max-width: 92%;
        font-size: 16px;
        padding: 16px;
        border-radius: 18px;
      }

      .dd-user-inner {
        max-width: 92%;
      }

      .dd-user-bubble {
        font-size: 15px;
      }

      .dd-chat-card {
        padding: 18px 16px;
        border-radius: 22px;
      }

      .dd-chat-card-title {
        font-size: 22px;
      }

      .dd-actions {
        flex-direction: column;
      }

      .dd-btn--lg {
        width: 100%;
        height: 52px;
        font-size: 15px;
      }
    }

    @media (max-width: 560px) {
      .dd-top-title {
        font-size: 20px;
      }

      .dd-chat-card-title {
        font-size: 20px;
      }
    }
  `;

  return (
    <div className="dd-page">
      <style>{styles}</style>

      <Header />

      <main className="dd-main">
        <div className="dd-shell">
          <section className="dd-top-card">
            <div className="dd-top-card-header">
              <div className="dd-top-title">{flowTitle}</div>
              <div className="dd-progress-text">{progress}%</div>
            </div>

            <div className="dd-progress-track">
              <div className="dd-progress-bar" style={{ width: `${progress}%` }} />
            </div>
          </section>

          <section className="dd-chat-layout">
            <div className="dd-assistant-bubble dd-help-card">
              몇 가지 정보만 알려주시면
              <br />
              평균 4명 이상의 작업자에게 요청을 보여줄 수 있어요.
            </div>

            {visibleAnsweredQuestions.map((question) => (
              <div key={question.key}>
                <div className="dd-assistant-bubble">{question.title}</div>

                <div className="dd-user-wrap">
                  <div className="dd-user-inner">
                    <div className="dd-user-bubble">
                      {question.type === "options"
                        ? getOptionLabel(question, answers[question.key])
                        : answers[question.key]}
                    </div>

                    <button
                      className="dd-edit-link"
                      type="button"
                      onClick={() => handleEdit(question.key)}
                    >
                      수정
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {currentQuestion ? (
              <div className="dd-chat-card">
                <div className="dd-chat-card-title">{currentQuestion.title}</div>
                <div className="dd-chat-card-desc">{currentQuestion.description}</div>

                {currentQuestion.type === "options" && (
                  <div className="dd-options">
                    {currentQuestion.options.map((option) => {
                      const isSelected = draftChoice === option.value;

                      return (
                        <button
                          type="button"
                          key={option.value}
                          className={`dd-option ${isSelected ? "dd-option--selected" : ""}`}
                          onClick={() => setDraftChoice(option.value)}
                        >
                          <div className="dd-option-radio" />
                          <div className="dd-option-text">
                            {option.emoji && (
                              <span className="dd-option-emoji">{option.emoji}</span>
                            )}
                            <span>{option.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {currentQuestion.type === "text" && (
                  <input
                    className="dd-input"
                    value={draftText}
                    onChange={(e) => setDraftText(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                  />
                )}

                {currentQuestion.type === "textarea" && (
                  <textarea
                    className="dd-textarea"
                    value={draftText}
                    onChange={(e) => setDraftText(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                  />
                )}

                <div className="dd-actions">
                  <button
                    type="button"
                    className="dd-btn dd-btn--secondary dd-btn--lg dd-btn--full"
                    onClick={handleBack}
                  >
                    {currentStep === 0 ? "뒤로" : "이전"}
                  </button>

                  <button
                    type="button"
                    className="dd-btn dd-btn--primary dd-btn--lg dd-btn--full"
                    onClick={handleNext}
                    disabled={
                      currentQuestion.type === "options"
                        ? !draftChoice
                        : !draftText.trim()
                    }
                  >
                    다음
                  </button>
                </div>
              </div>
            ) : (
              <div className="dd-chat-card">
                <div className="dd-chat-card-title">
                  좋아요, 요청 내용을 정리해봤어요.
                </div>
                <div className="dd-chat-card-desc">
                  아래 내용을 확인하고 이대로 요청을 등록하면 됩니다.
                </div>

                <div className="dd-summary-list">
                  <div className="dd-summary-item">
                    <div className="dd-summary-label">카테고리</div>
                    <div className="dd-summary-value">
                      {currentMainCategory?.label || "-"}
                    </div>
                  </div>

                  <div className="dd-summary-item">
                    <div className="dd-summary-label">세부 서비스</div>
                    <div className="dd-summary-value">
                      {currentSubCategory?.label || "-"}
                    </div>
                  </div>

                  <div className="dd-summary-item">
                    <div className="dd-summary-label">공간 유형</div>
                    <div className="dd-summary-value">
                      {SPACE_OPTIONS.find((item) => item.value === answers.spaceType)
                        ?.label || "-"}
                    </div>
                  </div>

                  <div className="dd-summary-item">
                    <div className="dd-summary-label">희망 일정</div>
                    <div className="dd-summary-value">
                      {SCHEDULE_OPTIONS.find((item) => item.value === answers.schedule)
                        ?.label || "-"}
                    </div>
                  </div>

                  <div className="dd-summary-item">
                    <div className="dd-summary-label">지역</div>
                    <div className="dd-summary-value">{answers.location || "-"}</div>
                  </div>

                  <div className="dd-summary-item">
                    <div className="dd-summary-label">상세 내용</div>
                    <div className="dd-summary-value">{answers.detail || "-"}</div>
                  </div>
                </div>

                <div className="dd-actions">
                  <button
                    type="button"
                    className="dd-btn dd-btn--secondary dd-btn--lg dd-btn--full"
                    onClick={() => handleEdit("mainCategory")}
                  >
                    다시 수정하기
                  </button>

                  <button
                    type="button"
                    className="dd-btn dd-btn--primary dd-btn--lg dd-btn--full"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "등록 중..." : "요청 등록"}
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}