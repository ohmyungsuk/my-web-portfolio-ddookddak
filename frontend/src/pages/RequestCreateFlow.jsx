import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { getCategoryIcon } from "../utils/categoryIcons.js";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const CATEGORY_DATA = [
  {
    id: "electrical",
    title: "전기/조명",
    icon: "⚡",
    color: "#2563eb",
    bg: "#eff6ff",
    desc: "콘센트, 스위치, 조명, 누전 등 전기 관련 유지보수",
    services: [
      {
        id: "outlet",
        name: "콘센트 수리/교체",
        summary: "작동 불량, 흔들림, 신규 설치",
        issues: ["작동 안됨", "스파크 발생", "교체 필요", "새로 설치", "기타"],
      },
      {
        id: "switch",
        name: "스위치 수리/교체",
        summary: "전등 버튼, 터치스위치, 고장 교체",
        issues: [
          "전등이 안 켜짐",
          "버튼 불량",
          "교체 필요",
          "새로 설치",
          "기타",
        ],
      },
      {
        id: "lighting",
        name: "조명 설치/교체",
        summary: "LED등, 거실등, 간접조명 설치",
        issues: ["조명 교체", "새 조명 설치", "LED 변경", "소등 불량", "기타"],
      },
      {
        id: "breaker",
        name: "차단기 점검",
        summary: "차단기 내려감, 누전 의심",
        issues: [
          "차단기 자주 내려감",
          "누전 의심",
          "교체 필요",
          "점검 요청",
          "기타",
        ],
      },
      {
        id: "wiring",
        name: "전기 배선 작업",
        summary: "배선 정리, 증설, 노후 배선",
        issues: ["배선 정리", "추가 배선", "노후 배선", "전기 증설", "기타"],
      },
      {
        id: "sensor-light",
        name: "센서등 설치",
        summary: "현관/복도 센서등 설치 및 교체",
        issues: [
          "센서등 교체",
          "작동 안됨",
          "새로 설치",
          "센서 오작동",
          "기타",
        ],
      },
    ],
  },
  {
    id: "plumbing",
    title: "설비/배관",
    icon: "🛠️",
    color: "#0f766e",
    bg: "#ecfdf5",
    desc: "수전, 변기, 배수구, 하수구 등 설비 및 배관 보수",
    services: [
      {
        id: "faucet",
        name: "수전 교체",
        summary: "주방/욕실 수전 교체 및 설치",
        issues: [
          "물 샘",
          "노후 교체",
          "새 제품 설치",
          "욕실 수전",
          "주방 수전",
        ],
      },
      {
        id: "sink",
        name: "세면대/싱크대 수리",
        summary: "배수 문제, 파손, 흔들림",
        issues: ["배수 문제", "파손", "누수", "교체 필요", "기타"],
      },
      {
        id: "toilet",
        name: "변기 수리",
        summary: "막힘, 물내림 불량, 부속 교체",
        issues: ["막힘", "물 계속 내려감", "누수", "부속 교체", "기타"],
      },
      {
        id: "drain",
        name: "배수구 막힘",
        summary: "주방, 욕실, 베란다 배수 문제",
        issues: [
          "욕실 배수 막힘",
          "주방 배수 막힘",
          "베란다 배수",
          "악취",
          "기타",
        ],
      },
      {
        id: "pipe",
        name: "수도 배관 수리",
        summary: "배관 누수, 노후 배관, 교체",
        issues: ["배관 누수", "노후 배관", "배관 교체", "압력 문제", "기타"],
      },
      {
        id: "water-tank",
        name: "수압/급수 점검",
        summary: "물 약함, 급수 이상, 수압 점검",
        issues: ["수압 약함", "급수 이상", "간헐적 단수", "점검 요청", "기타"],
      },
    ],
  },
  {
    id: "waterproof",
    title: "누수/방수",
    icon: "💧",
    color: "#0284c7",
    bg: "#eff6ff",
    desc: "천장, 욕실, 외벽, 베란다 누수 및 방수 작업",
    services: [
      {
        id: "ceiling-leak",
        name: "천장 누수 점검",
        summary: "윗집 누수 의심, 곰팡이, 얼룩",
        issues: ["윗집 누수 의심", "물 얼룩", "곰팡이 발생", "물방울", "기타"],
      },
      {
        id: "bathroom-leak",
        name: "욕실 누수",
        summary: "타일 틈 누수, 배관 누수, 아래층 피해",
        issues: [
          "타일 틈 누수",
          "배관 문제",
          "아래층 피해",
          "방수 필요",
          "기타",
        ],
      },
      {
        id: "balcony-waterproof",
        name: "베란다 방수",
        summary: "바닥/벽면 방수 및 균열 보수",
        issues: ["바닥 방수", "벽면 방수", "누수 재발", "균열", "기타"],
      },
      {
        id: "outer-wall",
        name: "외벽 누수/방수",
        summary: "실리콘 노후, 외벽 균열, 빗물 유입",
        issues: [
          "비 올 때 누수",
          "외벽 균열",
          "실리콘 문제",
          "보수 필요",
          "기타",
        ],
      },
      {
        id: "window-leak",
        name: "창호 누수",
        summary: "창틀 물샘, 실리콘, 결로",
        issues: ["창틀 누수", "실리콘 문제", "결로", "빗물 유입", "기타"],
      },
      {
        id: "roof-waterproof",
        name: "옥상 방수",
        summary: "옥상 방수, 균열 보수, 재방수",
        issues: ["옥상 방수", "크랙 보수", "재방수", "누수 의심", "기타"],
      },
    ],
  },
  {
    id: "doorlock",
    title: "도어락/출입문",
    icon: "🔐",
    color: "#7c3aed",
    bg: "#f5f3ff",
    desc: "도어락, 현관문, 문틀, 손잡이, 도어클로저",
    services: [
      {
        id: "doorlock-install",
        name: "도어락 설치",
        summary: "신규 설치, 번호키, 지문형 도어락",
        issues: [
          "신규 설치",
          "교체 설치",
          "번호키 설치",
          "지문형 설치",
          "기타",
        ],
      },
      {
        id: "doorlock-repair",
        name: "도어락 수리",
        summary: "문 안 열림, 비밀번호 오류, 오작동",
        issues: [
          "문 안 열림",
          "오작동",
          "비밀번호 오류",
          "배터리 문제",
          "기타",
        ],
      },
      {
        id: "front-door",
        name: "현관문 수리",
        summary: "문 닫힘 불량, 틀어짐, 소음",
        issues: ["문 닫힘 불량", "틀어짐", "소음", "잠금 문제", "기타"],
      },
      {
        id: "door-closer",
        name: "도어클로저 교체",
        summary: "문이 세게 닫힘, 천천히 안 닫힘",
        issues: ["문이 세게 닫힘", "천천히 안 닫힘", "교체 필요", "기타"],
      },
      {
        id: "handle",
        name: "문손잡이 교체",
        summary: "손잡이 고장, 흔들림, 파손",
        issues: ["손잡이 파손", "헐거움", "교체 필요", "잠금 불량", "기타"],
      },
      {
        id: "hinge",
        name: "경첩/힌지 수리",
        summary: "문 삐걱거림, 처짐, 마찰",
        issues: ["삐걱거림", "문 처짐", "교체 필요", "문 마찰", "기타"],
      },
    ],
  },
  {
    id: "aircon",
    title: "에어컨/환기",
    icon: "❄️",
    color: "#0f61d8",
    bg: "#eff6ff",
    desc: "에어컨 청소, 냉방 불량, 환풍기/환기 문제",
    services: [
      {
        id: "aircon-clean",
        name: "에어컨 청소",
        summary: "벽걸이, 스탠드, 시스템 분해청소",
        issues: [
          "벽걸이 청소",
          "스탠드 청소",
          "시스템 청소",
          "곰팡이 냄새",
          "기타",
        ],
      },
      {
        id: "aircon-repair",
        name: "에어컨 수리",
        summary: "찬바람 불량, 누수, 소음, 전원 문제",
        issues: ["찬바람 안 나옴", "물 떨어짐", "소음", "전원 문제", "기타"],
      },
      {
        id: "aircon-install",
        name: "에어컨 설치/이전",
        summary: "신규 설치, 이전 설치, 철거",
        issues: ["신규 설치", "이전 설치", "철거", "배관 작업", "기타"],
      },
      {
        id: "gas",
        name: "냉매/가스 점검",
        summary: "가스 충전, 냉방 약함 점검",
        issues: ["가스 충전", "냉방 약함", "점검 요청", "기타"],
      },
      {
        id: "ventilator",
        name: "환풍기/환기 수리",
        summary: "환풍기 교체, 소음, 흡입 불량",
        issues: ["작동 안됨", "소음", "교체", "흡입 약함", "기타"],
      },
      {
        id: "hood",
        name: "후드 점검/교체",
        summary: "주방 후드 소음, 흡입 저하, 교체",
        issues: ["소음", "흡입 약함", "교체 필요", "기타"],
      },
    ],
  },
  {
    id: "cctv",
    title: "CCTV/네트워크",
    icon: "📷",
    color: "#ea580c",
    bg: "#fff7ed",
    desc: "CCTV, 공유기, 와이파이, 인터폰 등",
    services: [
      {
        id: "cctv-install",
        name: "CCTV 설치",
        summary: "가정용, 매장용, 추가 설치",
        issues: ["신규 설치", "추가 설치", "매장용", "가정용", "기타"],
      },
      {
        id: "cctv-repair",
        name: "CCTV 수리",
        summary: "화면 불량, 녹화 오류, 전원 문제",
        issues: ["화면 안 나옴", "녹화 불량", "전원 문제", "연결 문제", "기타"],
      },
      {
        id: "wifi",
        name: "와이파이/공유기 점검",
        summary: "속도 저하, 연결 불량, 교체",
        issues: ["속도 느림", "연결 안됨", "설치 요청", "교체", "기타"],
      },
      {
        id: "intercom",
        name: "인터폰 수리",
        summary: "통화 불량, 화면 불량, 문열림 문제",
        issues: ["화면 불량", "통화 안됨", "문 열림 불량", "교체", "기타"],
      },
      {
        id: "network-wiring",
        name: "네트워크 배선",
        summary: "랜선 정리, 사무실/매장 배선",
        issues: ["랜선 증설", "사무실 배선", "매장 배선", "정리 작업", "기타"],
      },
      {
        id: "door-phone",
        name: "출입통제 장비 점검",
        summary: "출입통제기, 카드리더기, 출입장치",
        issues: ["작동 안됨", "카드 인식 불량", "점검 요청", "기타"],
      },
    ],
  },
  {
    id: "window",
    title: "유리/창호",
    icon: "🪟",
    color: "#0f172a",
    bg: "#f8fafc",
    desc: "유리 교체, 샷시, 창문, 방충망 보수",
    services: [
      {
        id: "glass",
        name: "유리 교체",
        summary: "깨진 유리, 금감, 단열유리",
        issues: ["파손", "금감", "단열 유리", "매장 유리", "기타"],
      },
      {
        id: "screen",
        name: "방충망 교체",
        summary: "찢어짐, 노후, 미세방충망",
        issues: ["찢어짐", "노후", "미세방충망", "틀 수리", "기타"],
      },
      {
        id: "window-repair",
        name: "창문/샷시 수리",
        summary: "개폐 불량, 틀어짐, 잠금 문제",
        issues: ["창문 안 열림", "잠금 문제", "문틀 틀어짐", "기타"],
      },
      {
        id: "silicone",
        name: "창호 실리콘 보수",
        summary: "틈새 보수, 물샘, 곰팡이",
        issues: ["창틀 틈새", "물 샘", "곰팡이", "노후 보수", "기타"],
      },
      {
        id: "roller",
        name: "창문 롤러 교체",
        summary: "미닫이 창문 뻑뻑함, 레일 문제",
        issues: ["창문이 잘 안 움직임", "레일 문제", "교체 필요", "기타"],
      },
      {
        id: "blinds",
        name: "블라인드/롤스크린 설치",
        summary: "가정/매장 블라인드 설치 및 교체",
        issues: ["신규 설치", "교체", "수리", "레일 문제", "기타"],
      },
    ],
  },
  {
    id: "appliance",
    title: "가전/생활수리",
    icon: "📺",
    color: "#1e40af",
    bg: "#eef2ff",
    desc: "생활 속 소규모 수리 및 설치 작업",
    services: [
      {
        id: "shelf",
        name: "선반/행거 설치",
        summary: "벽 선반, 행거, 드릴 작업",
        issues: ["벽 선반 설치", "행거 설치", "드릴 작업", "위치 변경", "기타"],
      },
      {
        id: "curtain",
        name: "커튼/블라인드 설치",
        summary: "커튼봉, 레일, 블라인드 설치",
        issues: ["신규 설치", "교체", "레일 문제", "수리", "기타"],
      },
      {
        id: "furniture",
        name: "가구 간단 수리",
        summary: "경첩, 문짝, 흔들림, 부분 보수",
        issues: ["문짝 문제", "경첩 수리", "흔들림", "부분 보수", "기타"],
      },
      {
        id: "silicon-home",
        name: "집안 실리콘 보수",
        summary: "욕실, 주방, 창틀, 곰팡이 제거",
        issues: ["욕실", "주방", "창틀", "곰팡이 제거", "기타"],
      },
      {
        id: "wall-fix",
        name: "벽면 보수/타공",
        summary: "벽 구멍 보수, 액자 타공, 간단 시공",
        issues: ["벽 구멍 보수", "타공 작업", "액자 설치", "간단 시공", "기타"],
      },
      {
        id: "tv-install",
        name: "TV/가전 설치",
        summary: "벽걸이 TV, 소형 가전 설치 보조",
        issues: ["벽걸이 TV 설치", "가전 설치", "재설치", "기타"],
      },
    ],
  },
  {
    id: "cleaning",
    title: "청소/철거",
    icon: "🧹",
    color: "#15803d",
    bg: "#ecfdf5",
    desc: "입주청소, 부분청소, 소규모 철거 및 폐기",
    services: [
      {
        id: "move-clean",
        name: "입주/이사 청소",
        summary: "입주 전, 이사 후, 부분 청소",
        issues: ["입주 전", "이사 후", "부분 청소", "원룸", "기타"],
      },
      {
        id: "office-clean",
        name: "사무실/상가 청소",
        summary: "정기 청소, 준공 청소, 부분 청소",
        issues: ["정기 청소", "준공 청소", "부분 청소", "기타"],
      },
      {
        id: "aircon-cleaning",
        name: "에어컨 청소",
        summary: "벽걸이, 스탠드, 시스템 청소",
        issues: ["벽걸이", "스탠드", "시스템", "악취 제거", "기타"],
      },
      {
        id: "demolition",
        name: "소규모 철거",
        summary: "집기 철거, 간판 철거, 원상복구",
        issues: ["벽체 철거", "집기 철거", "간판 철거", "원상복구", "기타"],
      },
      {
        id: "waste",
        name: "폐기물 처리",
        summary: "가구, 생활폐기물, 사무실 폐기물",
        issues: [
          "생활 폐기물",
          "가구 폐기",
          "사무실 폐기",
          "대형 폐기물",
          "기타",
        ],
      },
      {
        id: "special-clean",
        name: "특수 청소",
        summary: "곰팡이, 악취, 오염 제거",
        issues: ["곰팡이 제거", "악취 제거", "오염 제거", "기타"],
      },
    ],
  },
  {
    id: "etc",
    title: "기타 유지보수",
    icon: "📦",
    color: "#475569",
    bg: "#f8fafc",
    desc: "어디에 해당하는지 모르겠을 때 시작하는 메뉴",
    services: [
      {
        id: "inspection",
        name: "문제 진단 요청",
        summary: "어디가 문제인지 모를 때 점검 요청",
        issues: [
          "어디가 문제인지 모르겠음",
          "점검 먼저 원함",
          "상담 후 진행",
          "기타",
        ],
      },
      {
        id: "small-fix",
        name: "간단 집수리",
        summary: "여러 군데 자잘한 보수 작업",
        issues: ["부분 수리", "여러 군데 보수", "자잘한 작업", "기타"],
      },
      {
        id: "store-fix",
        name: "상가 유지보수",
        summary: "매장 설비/전기/도어 등 종합 점검",
        issues: ["매장 수리", "시설 점검", "긴급 보수", "기타"],
      },
      {
        id: "office-fix",
        name: "사무실 유지보수",
        summary: "시설 점검, 부분 수리, 고장 대응",
        issues: ["시설 점검", "전기/설비 문제", "부분 수리", "기타"],
      },
      {
        id: "urgent",
        name: "긴급 출동 요청",
        summary: "지금 바로 확인이 필요한 긴급 상황",
        issues: ["긴급 확인 필요", "당일 요청", "빠른 점검", "기타"],
      },
    ],
  },
];

const POPULAR_REQUESTS = [
  "콘센트 수리/교체",
  "변기 수리",
  "천장 누수 점검",
  "도어락 설치",
  "에어컨 청소",
  "CCTV 설치",
  "방충망 교체",
  "입주/이사 청소",
];

const EMPTY_ANSWERS = {
  placeType: "",
  issueType: "",
  schedule: "",
  detail: "",
};

function buildQuestions(serviceName, issues) {
  return [
    {
      key: "placeType",
      type: "options",
      title: "어떤 공간에서 필요한 작업인가요?",
      options: ["가정집", "상가/매장", "사무실", "기타"],
    },
    {
      key: "issueType",
      type: "options",
      title: `${serviceName}와 관련해 어떤 도움이 필요하신가요?`,
      options: issues?.length
        ? issues
        : ["점검 요청", "수리 요청", "교체 요청", "기타"],
    },
    {
      key: "schedule",
      type: "options",
      title: "언제 진행을 원하시나요?",
      options: ["가능한 빨리", "이번 주 내", "2주 이내", "일정 협의 가능"],
    },
    {
      key: "detail",
      type: "textarea",
      title: "현재 상황을 조금 더 자세히 알려주세요.",
      placeholder: `${serviceName} 관련 현재 문제 상황, 현장 상태, 원하는 작업 내용을 자유롭게 적어주세요.`,
    },
  ];
}

export default function RequestCreateFlow() {
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState("electrical");
  const [selectedService, setSelectedService] = useState(null);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(EMPTY_ANSWERS);
  const [draftOption, setDraftOption] = useState("");
  const [draftText, setDraftText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitLockRef = useRef(false);
  const iconRowRef = useRef(null);
  const dragStateRef = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  });

  const handleIconDragStart = (event) => {
    const row = iconRowRef.current;
    if (!row) return;

    dragStateRef.current.isDown = true;
    dragStateRef.current.startX = event.pageX - row.offsetLeft;
    dragStateRef.current.scrollLeft = row.scrollLeft;
    row.classList.add("dragging");
  };

  const handleIconDragMove = (event) => {
    const row = iconRowRef.current;
    if (!row || !dragStateRef.current.isDown) return;

    event.preventDefault();
    const x = event.pageX - row.offsetLeft;
    const walk = (x - dragStateRef.current.startX) * 1.1;
    row.scrollLeft = dragStateRef.current.scrollLeft - walk;
  };

  const handleIconDragEnd = () => {
    const row = iconRowRef.current;
    dragStateRef.current.isDown = false;
    if (row) row.classList.remove("dragging");
  };

  const selectedCategory = useMemo(() => {
    return (
      CATEGORY_DATA.find((item) => item.id === selectedCategoryId) ||
      CATEGORY_DATA[0]
    );
  }, [selectedCategoryId]);

  const filteredServices = selectedCategory.services;

  const questions = useMemo(() => {
    if (!selectedService) return [];
    return buildQuestions(selectedService.name, selectedService.issues);
  }, [selectedService]);

  const currentQuestion = questions[step] || null;
  const progress = questions.length
    ? Math.round((step / questions.length) * 100)
    : 0;

  const handleSelectService = (categoryId, service) => {
    setSelectedCategoryId(categoryId);
    setSelectedService(service);
    setStep(0);
    setAnswers(EMPTY_ANSWERS);
    setDraftOption("");
    setDraftText("");
    submitLockRef.current = false;
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    if (step === 0) {
      setSelectedService(null);
      setAnswers(EMPTY_ANSWERS);
      setDraftOption("");
      setDraftText("");
      return;
    }

    const previousStep = step - 1;
    const previousQuestion = questions[previousStep];
    const previousValue = previousQuestion
      ? answers[previousQuestion.key] || ""
      : "";

    if (previousQuestion?.type === "options") {
      setDraftOption(previousValue);
      setDraftText("");
    } else {
      setDraftText(previousValue);
      setDraftOption("");
    }

    setStep(previousStep);
  };

  const handleNext = () => {
    if (!currentQuestion) return;

    const value =
      currentQuestion.type === "options" ? draftOption : draftText.trim();

    if (!value) return;

    const nextAnswers = {
      ...answers,
      [currentQuestion.key]: value,
    };

    const nextStep = step + 1;
    const nextQuestion = questions[nextStep];
    const nextValue = nextQuestion ? nextAnswers[nextQuestion.key] || "" : "";

    if (nextQuestion?.type === "options") {
      setDraftOption(nextValue);
      setDraftText("");
    } else {
      setDraftText(nextValue);
      setDraftOption("");
    }

    setAnswers(nextAnswers);
    setStep(nextStep);
  };

  const handleEdit = (questionKey) => {
    const targetIndex = questions.findIndex(
      (question) => question.key === questionKey,
    );
    if (targetIndex < 0) return;

    const targetQuestion = questions[targetIndex];
    const targetValue = answers[targetQuestion.key] || "";

    if (targetQuestion.type === "options") {
      setDraftOption(targetValue);
      setDraftText("");
    } else {
      setDraftText(targetValue);
      setDraftOption("");
    }

    setStep(targetIndex);
  };

  const handleSubmit = async () => {
    if (submitLockRef.current || isSubmitting) return;

    const savedUser = localStorage.getItem("loginUser");
    const loginUser = savedUser ? JSON.parse(savedUser) : null;

    if (!loginUser?.id) {
      alert("로그인 정보가 없습니다. 다시 로그인 후 시도해주세요.");
      return;
    }

    submitLockRef.current = true;
    setIsSubmitting(true);

    const payload = {
      user_id: loginUser.id,
      title: `${selectedCategory.title} - ${selectedService.name}`,
      category: selectedCategory.title,
      location: answers.placeType || "",
      content: [
        `공간 유형: ${answers.placeType || ""}`,
        `도움이 필요한 내용: ${answers.issueType || ""}`,
        `희망 일정: ${answers.schedule || ""}`,
        `상세 설명: ${answers.detail || ""}`,
      ].join("\n"),
      status: "요청 등록",
      assigned_user_id: null,
      assigned_username: null,
    };

    try {
      const { data: createdRequest, error } = await supabase
        .from("requests")
        .insert([payload])
        .select("id, title, category")
        .single();

      if (error) throw error;

      try {
        const notificationResponse = await fetch(
          `${API_BASE_URL}/api/notification-events/request-created`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              requestId: createdRequest?.id,
              actorId: loginUser.id,
              category: createdRequest?.category || selectedCategory.title,
              title: createdRequest?.title || payload.title,
              message: `${payload.title} 요청이 등록되었습니다.`,
            }),
          },
        );

        if (!notificationResponse.ok) {
          console.error(
            "요청 등록 알림 발송 실패:",
            await notificationResponse.text(),
          );
        }
      } catch (notificationError) {
        console.error("요청 등록 알림 발송 실패:", notificationError);
      }

      navigate("/requests/my");
    } catch (error) {
      console.error("요청 등록 실패:", error);
      alert(error.message || "요청 등록 중 문제가 발생했습니다.");
      submitLockRef.current = false;
      setIsSubmitting(false);
    }
  };

  const styles = `
    * { box-sizing: border-box; }

    .dd-flow-page {
      min-height: 100vh;
      background: #f6f8fc;
      color: #0f172a;
    }

    .dd-category-icon-img {
      width: 26px;
      height: 26px;
      object-fit: contain;
      display: block;
      pointer-events: none;
      user-select: none;
    }

    .dd-flow-main {
      max-width: 1160px;
      margin: 0 auto;
      padding: 28px 20px 72px;
    }

    .dd-request-title {
      margin: 0 0 20px;
      font-size: 28px;
      font-weight: 900;
      letter-spacing: -0.04em;
      color: #0f172a;
      line-height: 1.2;
    }

     .dd-icon-row {
      display: flex;
      flex-wrap: nowrap;
      gap: 12px;
      align-items: stretch;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 4px 24px;
      cursor: grab;
      user-select: none;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
    }

    .dd-icon-row::-webkit-scrollbar {
      display: none;
    }

    .dd-icon-row {
      display: flex;
      flex-wrap: nowrap;
      gap: 10px;
      justify-content: center;
      align-items: center;
      overflow-x: auto;
      padding: 10px 14px;
      scrollbar-width: none;
    }

    .dd-icon-row::-webkit-scrollbar {
      display: none;
    }

        .dd-icon-row.dragging {
      cursor: grabbing;
    }

    .dd-icon-pill {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;
      width: 98px;
      min-width: 98px;
      max-width: 98px;
      height: 112px;
      min-height: 112px;
      padding: 14px 8px 12px;
      border-radius: 24px;
      border: 1px solid rgba(216, 227, 243, 0.9);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0.58) 100%);
      color: #334155;
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
      transition:
        transition:
          transform 0.18s ease,
          box-shadow 0.18s ease,
          background 0.18s ease;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.7),
        0 8px 20px rgba(15, 23, 42, 0.05);
      text-align: center;
      overflow: hidden;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      flex: 0 0 auto;
      scroll-snap-align: start;
    }   


    .dd-icon-pill:hover {
      background: #ffffff;
      transform: translateY(-1px);
    }

    .dd-icon-pill.active {
      background: #eff6ff;
      border-color: #cfe0ff;
      box-shadow: 0 16px 30px rgba(59, 130, 246, 0.15);
    }

    .dd-icon-symbol {
      --icon-color: #2563eb;
      --icon-bg: #eff6ff;
      position: relative;
      width: 40px;
      height: 40px;
      min-width: 40px;
      min-height: 40px;
      border-radius: 16px;
      display: grid;
      place-items: center;
      font-size: 18px;
      color: var(--icon-color);
      background:
        radial-gradient(circle at 30% 24%, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.72) 26%, rgba(255,255,255,0.08) 27%),
        linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.16) 100%),
        var(--icon-bg);
      border: 1px solid rgba(255,255,255,0.65);
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.78),
        inset 0 -10px 18px rgba(255,255,255,0.12),
        0 10px 22px rgba(15, 23, 42, 0.08);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      overflow: hidden;
    }

    .dd-icon-pill span:last-child {
      display: block;
      width: 100%;
      line-height: 1.2;
      word-break: keep-all;
      white-space: normal;
    }

    .dd-board-intro {
      display: grid;
      gap: 10px;
      align-items: flex-start;
    }

    .dd-board-wrap {
      display: grid;
      grid-template-columns: 260px minmax(0, 1fr);
      gap: 20px;
      margin: 20px auto 0;
      padding: 0 16px;
      max-width: 1120px;
    }

    .dd-sidebar {
      background: #ffffff;
      border: 1px solid #e5ebf3;
      border-radius: 22px;
      padding: 14px;
      box-shadow: 0 12px 22px rgba(15, 23, 42, 0.05);
    }

    .dd-sidebar-title {
      margin: 0 0 18px;
      font-size: 16px;
      font-weight: 900;
      color: #0f172a;
    }

    .dd-sidebar-list {
      display: grid;
      gap: 10px;
    }

    .dd-sidebar-item {
      width: 100%;
      text-align: left;
      padding: 14px 16px;
      border-radius: 16px;
      border: 1px solid #eef2f8;
      background: #f8fbff;
      color: #334155;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.18s ease;
    }

    .dd-sidebar-item:hover {
      transform: translateX(2px);
      border-color: #cfe0fb;
      background: #ffffff;
    }

    .dd-sidebar-item.active {
      background: #eef6ff;
      border-color: #3b82f6;
      color: #0f172a;
      box-shadow: 0 10px 22px rgba(59, 130, 246, 0.08);
    }

    .dd-board-main {
      display: grid;
      gap: 12px;
    }

    .dd-board-intro {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 280px;
      gap: 16px;
      align-items: center;
    }

    .dd-board-heading {
      margin: 0;
      font-size: 28px;
      font-weight: 900;
      color: #0f172a;
    }

    .dd-board-desc {
      margin: 12px 0 0;
      font-size: 15px;
      line-height: 1.8;
      color: #475569;
    }

    .dd-board-top-cards {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 18px;
      align-items: stretch;
    }

    .dd-spot-card {
      padding: 22px 20px;
      border-radius: 24px;
      background: #f8fbff;
      border: 1px solid #e5ebf3;
      box-shadow: 0 12px 24px rgba(15, 23, 42, 0.05);
      display: grid;
      gap: 10px;
      min-height: 140px;
      cursor: pointer;
      transition: all 0.18s ease;
    }

    .dd-spot-card:hover {
      transform: translateY(-2px);
      border-color: #bfd7ff;
      background: #eff6ff;
    }

    .dd-spot-label {
      margin: 0;
      font-size: 13px;
      color: #2563eb;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .dd-spot-title {
      margin: 0;
      font-size: 19px;
      font-weight: 900;
      color: #0f172a;
      line-height: 1.4;
    }

    .dd-spot-action {
      margin-top: auto;
      font-size: 14px;
      font-weight: 800;
      color: #2563eb;
    }

    .dd-board-service-title {
      margin: 0 0 14px;
      font-size: 20px;
      font-weight: 900;
      color: #0f172a;
    }

    .dd-board-service-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 18px;
      align-items: start;
    }

    .dd-board-service-card {
      padding: 18px 18px;
      border-radius: 22px;
      border: 1px solid #e5ebf3;
      background: #ffffff;
      box-shadow: 0 10px 18px rgba(15, 23, 42, 0.04);
      text-align: left;
      display: grid;
      gap: 10px;
      min-height: 120px;
      cursor: pointer;
      transition: all 0.18s ease;
    }

    .dd-board-service-card:hover {
      transform: translateY(-1px);
      border-color: #cfe0fb;
      background: #f8fbff;
    }

    .dd-board-service-name {
      margin: 0;
      font-size: 16px;
      font-weight: 900;
      color: #0f172a;
    }

    .dd-board-service-summary {
      margin: 0;
      font-size: 14px;
      color: #64748b;
      line-height: 1.6;
      font-weight: 700;
    }

    .dd-popular-wrap {
      padding: 24px;
      background: #ffffff;
      border: 1px solid #e7edf5;
      border-radius: 26px;
      box-shadow: 0 12px 28px rgba(15, 23, 42, 0.04);
    }

    .dd-popular-title {
      margin: 0;
      font-size: 18px;
      font-weight: 900;
      color: #0f172a;
    }

    .dd-chip-list {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 16px;
    }

    .dd-chip {
      border: 1px solid #d9e4f0;
      background: #f8fbff;
      color: #1e293b;
      border-radius: 999px;
      padding: 11px 16px;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.18s ease;
    }

    .dd-chip:hover {
      background: #3b82f6;
      border-color: #3b82f6;
      color: #ffffff;
      transform: translateY(-1px);
    }

    .dd-category-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 24px;
    }

    .dd-category-tab {
      min-height: 52px;
      padding: 0 18px;
      border-radius: 14px;
      border: 1px solid #dce5f0;
      background: #ffffff;
      color: #334155;
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.18s ease;
    }

    .dd-category-tab:hover {
      border-color: #bfd7ff;
      background: #f8fbff;
      color: #2563eb;
    }

    .dd-category-tab.active {
      background: #3b82f6;
      border-color: #3b82f6;
      color: #ffffff;
      box-shadow: 0 12px 24px rgba(59, 130, 246, 0.18);
    }

    .dd-service-panel {
      margin-top: 24px;
      padding: 28px;
      background: #ffffff;
      border: 1px solid #e7edf5;
      border-radius: 28px;
      box-shadow: 0 12px 28px rgba(15, 23, 42, 0.04);
    }

    .dd-service-head {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }

    .dd-service-title {
      margin: 0;
      font-size: 28px;
      line-height: 1.2;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.04em;
    }

    .dd-service-sub {
      margin: 10px 0 0;
      font-size: 15px;
      color: #64748b;
      font-weight: 600;
      line-height: 1.6;
    }

    .dd-service-count {
      font-size: 14px;
      color: #2563eb;
      font-weight: 800;
      white-space: nowrap;
    }

    .dd-feature-row {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
      margin-bottom: 18px;
    }

    .dd-feature-card {
      border: 1px solid #e4eaf3;
      background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
      border-radius: 22px;
      padding: 22px 20px;
      text-align: left;
      cursor: pointer;
      transition: all 0.18s ease;
      box-shadow: 0 8px 18px rgba(15, 23, 42, 0.03);
      min-height: 126px;
    }

    .dd-feature-card:hover {
      transform: translateY(-2px);
      border-color: #bfd7ff;
      box-shadow: 0 16px 30px rgba(59, 130, 246, 0.08);
    }

    .dd-feature-name {
      font-size: 18px;
      line-height: 1.4;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.03em;
    }

    .dd-feature-summary {
      margin-top: 10px;
      font-size: 14px;
      line-height: 1.6;
      color: #64748b;
      font-weight: 700;
    }

    .dd-feature-link {
      margin-top: 16px;
      font-size: 14px;
      color: #2563eb;
      font-weight: 800;
    }

    .dd-service-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
    }

    .dd-service-card {
      border: 1px solid #e4eaf3;
      background: #ffffff;
      border-radius: 18px;
      padding: 18px 16px;
      text-align: left;
      cursor: pointer;
      transition: all 0.18s ease;
      min-height: 112px;
      box-shadow: 0 4px 10px rgba(15, 23, 42, 0.015);
    }

    .dd-service-card:hover {
      transform: translateY(-2px);
      border-color: #bfd7ff;
      background: #f8fbff;
      box-shadow: 0 14px 26px rgba(59, 130, 246, 0.08);
    }

    .dd-service-name {
      font-size: 17px;
      line-height: 1.45;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.02em;
    }

    .dd-service-summary {
      margin-top: 10px;
      font-size: 13px;
      line-height: 1.6;
      color: #64748b;
      font-weight: 700;
    }

    .dd-chat-shell {
      max-width: 560px;
      margin: 0 auto;
      padding-top: 6px;
    }

    .dd-chat-head {
      margin-bottom: 22px;
    }

    .dd-chat-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      margin-bottom: 10px;
    }

    .dd-chat-title {
      font-size: 21px;
      line-height: 1.4;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.03em;
    }

    .dd-chat-progress {
      font-size: 14px;
      color: #2563eb;
      font-weight: 800;
    }

    .dd-progress-track {
      width: 100%;
      height: 6px;
      background: #e5ebf2;
      border-radius: 999px;
      overflow: hidden;
    }

    .dd-progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #60a5fa 0%, #2563eb 100%);
      border-radius: 999px;
      transition: width 0.2s ease;
    }

    .dd-guide-bubble {
      width: fit-content;
      max-width: 300px;
      background: #ffffff;
      border: 1px solid #e7edf4;
      border-radius: 18px;
      padding: 16px 18px;
      box-shadow: 0 8px 18px rgba(15, 23, 42, 0.04);
      font-size: 14px;
      line-height: 1.6;
      color: #334155;
      font-weight: 700;
      margin-bottom: 16px;
    }

    .dd-answer-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 16px;
    }

    .dd-answer-item {
      display: flex;
      justify-content: flex-end;
    }

    .dd-answer-bubble {
      max-width: 330px;
      background: #475569;
      color: #ffffff;
      border-radius: 18px;
      padding: 12px 14px;
      box-shadow: 0 10px 22px rgba(71, 85, 105, 0.14);
    }

    .dd-answer-q {
      font-size: 11px;
      color: rgba(255,255,255,0.72);
      margin-bottom: 4px;
      line-height: 1.4;
    }

    .dd-answer-v {
      font-size: 14px;
      font-weight: 700;
      line-height: 1.55;
      word-break: break-word;
    }

    .dd-answer-edit {
      margin-top: 4px;
      text-align: right;
    }

    .dd-answer-edit button {
      border: none;
      background: transparent;
      color: #dbeafe;
      cursor: pointer;
      font-size: 12px;
      font-weight: 700;
      padding: 0;
    }

    .dd-answer-edit button:hover {
      color: #ffffff;
      text-decoration: underline;
    }

    .dd-question-card {
      background: #ffffff;
      border: 1px solid #e7edf4;
      border-radius: 22px;
      padding: 20px;
      box-shadow: 0 12px 24px rgba(15, 23, 42, 0.05);
    }

    .dd-question-title {
      margin: 0 0 18px;
      font-size: 18px;
      font-weight: 800;
      line-height: 1.5;
      color: #334155;
      word-break: keep-all;
    }

    .dd-options {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .dd-option {
      width: 100%;
      min-height: 52px;
      border: 1px solid #e4eaf3;
      border-radius: 14px;
      background: #ffffff;
      padding: 0 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      transition: all 0.18s ease;
    }

    .dd-option:hover {
      border-color: #cfe0fb;
      background: #f8fbff;
    }

    .dd-option.selected {
      border-color: #60a5fa;
      background: #f5f9ff;
      box-shadow: 0 8px 18px rgba(59, 130, 246, 0.08);
    }

    .dd-radio {
      width: 22px;
      height: 22px;
      border-radius: 999px;
      border: 2px solid #d1d9e6;
      flex-shrink: 0;
      position: relative;
    }

    .dd-option.selected .dd-radio {
      border-color: #3b82f6;
      background: #3b82f6;
      box-shadow: inset 0 0 0 4px #ffffff;
    }

    .dd-option-label {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.5;
    }

    .dd-textarea {
      width: 100%;
      min-height: 120px;
      resize: vertical;
      padding: 14px;
      border: 1px solid #e4eaf3;
      background: #ffffff;
      border-radius: 14px;
      outline: none;
      transition: all 0.18s ease;
      color: #0f172a;
      font-size: 14px;
      line-height: 1.65;
    }

    .dd-textarea:focus {
      border-color: #60a5fa;
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.08);
    }

    .dd-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 16px;
    }

    .dd-btn {
      height: 48px;
      border-radius: 14px;
      border: none;
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.18s ease;
    }

    .dd-btn:disabled {
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
      opacity: 0.72;
    }

    .dd-btn.submitting {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: #2563eb !important;
      color: #ffffff !important;
    }

    .dd-submit-spinner {
      width: 16px;
      height: 16px;
      border-radius: 999px;
      border: 2px solid rgba(255, 255, 255, 0.42);
      border-top-color: #ffffff;
      animation: ddSubmitSpin 0.75s linear infinite;
      flex: 0 0 auto;
    }

    @keyframes ddSubmitSpin {
      to { transform: rotate(360deg); }
    }

    .dd-btn.secondary {
      background: #ffffff;
      color: #0f172a;
      border: 1px solid #dbe3ef;
    }

    .dd-btn.secondary:hover {
      background: #f8fbff;
      color: #2563eb;
      border-color: #bfdbfe;
    }

    .dd-btn.primary {
      background: #dce4ee;
      color: #97a6b8;
    }

    .dd-btn.primary.enabled {
      background: #3b82f6;
      color: #ffffff;
      box-shadow: 0 10px 20px rgba(59, 130, 246, 0.16);
    }

    .dd-btn.primary.enabled:hover {
      transform: translateY(-1px);
      background: #2f76ea;
    }

    .dd-summary {
      display: grid;
      gap: 10px;
      margin-bottom: 12px;
    }

    .dd-summary-item {
      border: 1px solid #e5ebf3;
      background: #f8fbff;
      border-radius: 14px;
      padding: 13px 14px;
    }

    .dd-summary-key {
      font-size: 12px;
      color: #64748b;
      font-weight: 800;
      margin-bottom: 4px;
    }

    .dd-summary-value {
      font-size: 14px;
      color: #0f172a;
      font-weight: 700;
      line-height: 1.6;
      word-break: break-word;
    }

    @media (max-width: 1080px) {
      .dd-service-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .dd-feature-row {
        grid-template-columns: 1fr;
      }

      .dd-category-board {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 768px) {
  .dd-icon-banner {
    width: 100%;
    margin: 0 auto 20px;
    padding: 12px;
    border-radius: 24px;
  }

  .dd-category-icon-img {
    width: 24px;
    height: 24px;
  }

  .dd-icon-row {
    gap: 10px;
    justify-content: flex-start;
    padding: 2px 18px;
  }

  .dd-icon-pill {
    width: 84px;
    min-width: 84px;
    min-height: 84px;
    padding: 10px 6px;
    border-radius: 18px;
    gap: 8px;
    font-size: 12px;
  }

  .dd-icon-symbol {
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
    border-radius: 14px;
    font-size: 16px;
  }

  .dd-icon-label {
    min-height: 32px;
    max-height: 32px;
    font-size: 12px;
    line-height: 1.3;
  }

    .dd-icon-label {
      display: -webkit-box;
      width: 100%;
      min-height: 34px;
      max-height: 34px;
      line-height: 1.3;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: -0.02em;
      word-break: keep-all;
      white-space: normal;
      overflow: hidden;
      text-align: center;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      position: relative;
      z-index: 1;
    }

  .dd-flow-main {
    padding: 24px 14px 56px;
  }

  .dd-board-wrap {
    grid-template-columns: 1fr;
  }

  .dd-board-intro {
    grid-template-columns: 1fr;
  }

  .dd-request-title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .dd-top-hero {
    padding: 20px;
  }

  .dd-category-board {
    grid-template-columns: 1fr;
  }

  .dd-category-card {
    min-height: auto;
  }

  .dd-service-panel {
    padding: 20px;
    border-radius: 22px;
  }

  .dd-service-title {
    font-size: 22px;
  }

  .dd-service-grid {
    grid-template-columns: 1fr;
  }

  .dd-actions {
    grid-template-columns: 1fr;
  }
}

    /* ===== 상단 카테고리 아이콘 영역 최종 정리: 큰 카드 배경 제거 ===== */
    .dd-icon-banner {
      width: 100% !important;
      max-width: 1120px !important;
      margin: 14px auto 18px !important;
      padding: 0 10px !important;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      border-radius: 0 !important;
    }

    .dd-icon-row {
      display: grid !important;
      grid-template-columns: repeat(10, minmax(0, 1fr)) !important;
      gap: 8px !important;
      align-items: start !important;
      justify-content: center !important;
      width: 100% !important;
      padding: 4px 0 16px !important;
      overflow: visible !important;
      cursor: default !important;
      user-select: none !important;
      scrollbar-width: none !important;
    }

    .dd-icon-row::-webkit-scrollbar {
      display: none !important;
    }

    .dd-icon-row.dragging {
      cursor: default !important;
    }

    .dd-icon-pill {
      position: relative !important;
      width: 100% !important;
      min-width: 0 !important;
      max-width: none !important;
      height: auto !important;
      min-height: 0 !important;
      padding: 4px 2px 13px !important;
      border: none !important;
      border-radius: 16px !important;
      background: transparent !important;
      color: #334155 !important;
      box-shadow: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: flex-start !important;
      gap: 7px !important;
      cursor: pointer !important;
      text-align: center !important;
      overflow: visible !important;
      outline: none !important;
      flex: initial !important;
      scroll-snap-align: none !important;
      transition: transform 0.18s ease, background-color 0.18s ease !important;
      -webkit-tap-highlight-color: transparent !important;
    }

    .dd-icon-pill:hover {
      transform: translateY(-1px) !important;
      background: rgba(239, 246, 255, 0.5) !important;
      border: none !important;
      box-shadow: none !important;
    }

    .dd-icon-pill:focus,
    .dd-icon-pill:focus-visible,
    .dd-icon-pill:active {
      outline: none !important;
      border: none !important;
      box-shadow: none !important;
    }

    .dd-icon-pill.active {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      margin-bottom: 0 !important;
    }

    .dd-icon-pill::after {
      content: "" !important;
      position: absolute !important;
      left: 50% !important;
      bottom: 2px !important;
      width: 0 !important;
      height: 3px !important;
      border-radius: 999px !important;
      background: #2f80ed !important;
      transform: translateX(-50%) !important;
      transition: width 0.18s ease !important;
    }

    .dd-icon-pill.active::after {
      width: 34px !important;
    }

    .dd-icon-symbol {
      width: 40px !important;
      height: 40px !important;
      min-width: 40px !important;
      min-height: 40px !important;
      border-radius: 14px !important;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      overflow: visible !important;
      color: inherit !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }

    .dd-icon-pill:hover .dd-icon-symbol,
    .dd-icon-pill.active .dd-icon-symbol {
      background: rgba(239, 246, 255, 0.7) !important;
      border: none !important;
      box-shadow: none !important;
    }

    .dd-category-icon-img {
      width: 32px !important;
      height: 32px !important;
      object-fit: contain !important;
      display: block !important;
      user-select: none !important;
      pointer-events: none !important;
    }

    .dd-icon-label,
    .dd-icon-pill span:last-child {
      display: block !important;
      width: 100% !important;
      min-height: 0 !important;
      max-height: none !important;
      font-size: 13px !important;
      line-height: 1.25 !important;
      font-weight: 800 !important;
      color: #334155 !important;
      text-align: center !important;
      word-break: keep-all !important;
      white-space: normal !important;
    }

    .dd-icon-pill.active .dd-icon-label,
    .dd-icon-pill.active span:last-child {
      color: #0f172a !important;
    }

    @media (max-width: 1080px) {
      .dd-icon-row {
        grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
        gap: 12px 8px !important;
      }
    }

    @media (max-width: 768px) {
      .dd-icon-banner {
        margin: 10px auto 14px !important;
        padding: 0 12px !important;
      }

      .dd-icon-row {
        display: flex !important;
        justify-content: flex-start !important;
        gap: 14px !important;
        overflow-x: auto !important;
        overflow-y: hidden !important;
        padding: 4px 2px 14px !important;
        -webkit-overflow-scrolling: touch !important;
      }

      .dd-icon-pill {
        flex: 0 0 66px !important;
        width: 66px !important;
        min-width: 66px !important;
        padding: 4px 0 12px !important;
        gap: 6px !important;
      }

      .dd-icon-symbol {
        width: 38px !important;
        height: 38px !important;
        min-width: 38px !important;
        min-height: 38px !important;
      }

      .dd-category-icon-img {
        width: 27px !important;
        height: 27px !important;
      }

      .dd-icon-label,
      .dd-icon-pill span:last-child {
        font-size: 12px !important;
        line-height: 1.25 !important;
      }

      .dd-icon-pill.active::after {
        width: 28px !important;
      }
    }

  `;

  if (selectedService) {
    return (
      <div className="dd-flow-page">
        <style>{styles}</style>

        <main className="dd-flow-main">
          <div className="dd-chat-shell">
            <section className="dd-chat-head">
              <div className="dd-chat-top">
                <div className="dd-chat-title">{selectedService.name}</div>
                <div className="dd-chat-progress">{progress}%</div>
              </div>

              <div className="dd-progress-track">
                <div
                  className="dd-progress-bar"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </section>

            <div className="dd-guide-bubble">
              몇 가지 정보만 알려주시면
              <br />더 정확한 요청으로 연결할 수 있어요.
            </div>

            <div className="dd-answer-list">
              {questions.slice(0, step).map((question) => (
                <div className="dd-answer-item" key={question.key}>
                  <div className="dd-answer-bubble">
                    <div className="dd-answer-q">{question.title}</div>
                    <div className="dd-answer-v">{answers[question.key]}</div>
                    <div className="dd-answer-edit">
                      <button
                        type="button"
                        onClick={() => handleEdit(question.key)}
                      >
                        수정
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {currentQuestion ? (
              <section className="dd-question-card">
                <h2 className="dd-question-title">{currentQuestion.title}</h2>

                {currentQuestion.type === "options" ? (
                  <div className="dd-options">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`dd-option ${draftOption === option ? "selected" : ""}`}
                        onClick={() => setDraftOption(option)}
                      >
                        <span className="dd-radio" />
                        <span className="dd-option-label">{option}</span>
                      </button>
                    ))}
                  </div>
                ) : (
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
                    className="dd-btn secondary"
                    onClick={handleBack}
                  >
                    {step === 0 ? "카테고리로" : "뒤로"}
                  </button>

                  <button
                    type="button"
                    className={`dd-btn primary ${
                      (
                        currentQuestion.type === "options"
                          ? !!draftOption
                          : !!draftText.trim()
                      )
                        ? "enabled"
                        : ""
                    }`}
                    onClick={handleNext}
                  >
                    다음
                  </button>
                </div>
              </section>
            ) : (
              <section className="dd-question-card">
                <h2 className="dd-question-title">요청 내용을 확인해주세요.</h2>

                <div className="dd-summary">
                  <div className="dd-summary-item">
                    <div className="dd-summary-key">카테고리</div>
                    <div className="dd-summary-value">
                      {selectedCategory.title}
                    </div>
                  </div>

                  <div className="dd-summary-item">
                    <div className="dd-summary-key">선택한 서비스</div>
                    <div className="dd-summary-value">
                      {selectedService.name}
                    </div>
                  </div>

                  <div className="dd-summary-item">
                    <div className="dd-summary-key">공간 유형</div>
                    <div className="dd-summary-value">{answers.placeType}</div>
                  </div>

                  <div className="dd-summary-item">
                    <div className="dd-summary-key">도움이 필요한 내용</div>
                    <div className="dd-summary-value">{answers.issueType}</div>
                  </div>

                  <div className="dd-summary-item">
                    <div className="dd-summary-key">희망 일정</div>
                    <div className="dd-summary-value">{answers.schedule}</div>
                  </div>

                  <div className="dd-summary-item">
                    <div className="dd-summary-key">상세 설명</div>
                    <div className="dd-summary-value">{answers.detail}</div>
                  </div>
                </div>

                <div className="dd-actions">
                  <button
                    type="button"
                    className="dd-btn secondary"
                    onClick={() => setStep(questions.length - 1)}
                    disabled={isSubmitting}
                  >
                    마지막 답변 수정
                  </button>

                  <button
                    type="button"
                    className={`dd-btn primary enabled ${isSubmitting ? "submitting" : ""}`}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="dd-submit-spinner" aria-hidden="true" />
                        요청 등록 중...
                      </>
                    ) : (
                      "요청 등록"
                    )}
                  </button>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dd-flow-page">
      <style>{styles}</style>

      <main className="dd-flow-main">
        <h1 className="dd-request-title">견적요청</h1>

        <section className="dd-icon-banner">
          <div
            ref={iconRowRef}
            className="dd-icon-row"
            onMouseDown={handleIconDragStart}
            onMouseMove={handleIconDragMove}
            onMouseUp={handleIconDragEnd}
            onMouseLeave={handleIconDragEnd}
          >
            {CATEGORY_DATA.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`dd-icon-pill ${selectedCategoryId === category.id ? "active" : ""}`}
                onClick={() => setSelectedCategoryId(category.id)}
                aria-pressed={selectedCategoryId === category.id}
              >
                <span
                  className="dd-icon-symbol"
                  style={{
                    "--icon-bg": "#EFF6FF",
                  }}
                >
                  <img
                    src={getCategoryIcon(category.title)}
                    alt={category.title}
                    className="dd-category-icon-img"
                    draggable="false"
                  />
                </span>
                <span className="dd-icon-label">{category.title}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="dd-board-wrap">
          <aside className="dd-sidebar">
            <div className="dd-sidebar-title">카테고리</div>
            <div className="dd-sidebar-list">
              {CATEGORY_DATA.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`dd-sidebar-item ${selectedCategoryId === category.id ? "active" : ""}`}
                  onClick={() => setSelectedCategoryId(category.id)}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </aside>

          <div className="dd-board-main">
            <div className="dd-board-intro">
              <div>
                <h2 className="dd-board-heading">{selectedCategory.title}</h2>
                <p className="dd-board-desc">{selectedCategory.desc}</p>
              </div>
            </div>

            <div className="dd-board-top-cards">
              <button
                type="button"
                className="dd-spot-card"
                onClick={() => {
                  const featured = selectedCategory.services[0];
                  if (featured)
                    handleSelectService(selectedCategory.id, featured);
                }}
              >
                <p className="dd-spot-label">추천 서비스</p>
                <p className="dd-spot-title">
                  {selectedCategory.title} 대표 작업
                </p>
                <span className="dd-spot-action">바로 요청하기 →</span>
              </button>

              <button
                type="button"
                className="dd-spot-card"
                onClick={() => {
                  const featured =
                    selectedCategory.services[1] ||
                    selectedCategory.services[0];
                  if (featured)
                    handleSelectService(selectedCategory.id, featured);
                }}
              >
                <p className="dd-spot-label">빠른 선택</p>
                <p className="dd-spot-title">
                  주요 {selectedCategory.title} 작업
                </p>
                <span className="dd-spot-action">바로 요청하기 →</span>
              </button>
            </div>

            <div>
              <h3 className="dd-board-service-title">
                {selectedCategory.title} 서비스
              </h3>
              <div className="dd-board-service-grid">
                {filteredServices.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    className="dd-board-service-card"
                    onClick={() =>
                      handleSelectService(selectedCategory.id, service)
                    }
                  >
                    <p className="dd-board-service-name">{service.name}</p>
                    <p className="dd-board-service-summary">
                      {service.summary}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
