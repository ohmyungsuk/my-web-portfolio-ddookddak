import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient.js";

function Signup({ onSwitchToLogin }) {
  const navigate = useNavigate();

  const BRAND_COLOR = "#2F80ED";
  const BRAND_HOVER = "#1F6FD6";
  const TEXT_DARK = "#0F172A";
  const TEXT_MUTED = "#64748B";
  const CARD_BORDER = "#E5EDF6";

  const getWindowWidth = () => {
    if (typeof window === "undefined") return 1024;
    return window.innerWidth;
  };

  const [windowWidth, setWindowWidth] = useState(getWindowWidth);
  const [signupStep, setSignupStep] = useState("terms");
  const [selectedTermsId, setSelectedTermsId] = useState("");
  const [mode, setMode] = useState("choice");
  const [signupRole, setSignupRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  const isMobile = windowWidth <= 640;
  const isSmallMobile = windowWidth <= 380;

  const redirectTo = `${window.location.origin}${import.meta.env.BASE_URL}#/oauth/callback`;

  const termsItems = [
    {
      id: "terms",
      required: true,
      title: "뚝딱 이용약관",
      summary:
        "서비스 이용, 요청 등록, 커뮤니티 이용, 계정 관리에 필요한 기본 약관입니다.",
      detail:
        "뚝딱은 유지보수 요청 접수와 진행 상태 관리를 돕는 플랫폼입니다. 사용자는 정확한 요청 정보를 입력해야 하며, 허위 요청이나 타인의 권리를 침해하는 게시글은 제한될 수 있습니다.",
      sections: [
        {
          heading: "제1조 목적",
          body: "이 약관은 뚝딱 서비스의 이용 조건과 절차, 회원과 회사의 권리 및 의무, 서비스 이용에 필요한 기본 사항을 정하는 것을 목적으로 합니다.",
        },
        {
          heading: "제2조 서비스 이용",
          body: "회원은 유지보수 요청 등록, 요청 상태 확인, 커뮤니티 이용, 알림 확인 등의 기능을 사용할 수 있습니다. 서비스의 일부 기능은 로그인 또는 회원 유형에 따라 제한될 수 있습니다.",
        },
        {
          heading: "제3조 회원의 의무",
          body: "회원은 요청 내용과 첨부 자료를 사실에 맞게 입력해야 하며, 타인의 개인정보나 권리를 침해하는 내용을 등록해서는 안 됩니다. 허위 요청, 부적절한 게시글, 서비스 운영을 방해하는 행위는 제한될 수 있습니다.",
        },
        {
          heading: "제4조 요청 및 작업 진행",
          body: "등록된 요청은 담당자 확인 후 상태가 변경될 수 있습니다. 견적, 일정, 작업 가능 여부는 요청 내용과 현장 상황에 따라 달라질 수 있습니다.",
        },
        {
          heading: "제5조 커뮤니티 운영",
          body: "커뮤니티 글과 댓글은 다른 사용자에게 공개될 수 있습니다. 욕설, 광고, 허위 정보, 개인정보 노출 등 운영 기준에 맞지 않는 콘텐츠는 수정 또는 삭제될 수 있습니다.",
        },
      ],
    },
    {
      id: "privacy",
      required: true,
      title: "개인정보 수집 및 이용",
      summary:
        "회원 식별, 요청 처리, 알림 제공을 위해 필요한 최소 정보를 수집합니다.",
      detail:
        "수집 항목은 이메일, 이름, 프로필 사진, 회원 유형, 요청 내용, 첨부 이미지 등입니다. 수집한 정보는 서비스 제공과 고객 지원 목적에만 사용하며, 관련 법령에 따른 보관 기간 이후 삭제합니다.",
      sections: [
        {
          heading: "수집하는 개인정보",
          body: "필수 항목은 이메일, 이름, 회원 유형, 로그인 식별 정보입니다. 사용자가 직접 등록하는 경우 프로필 사진, 요청 내용, 요청 이미지, 댓글 내용이 함께 저장될 수 있습니다.",
        },
        {
          heading: "개인정보 이용 목적",
          body: "회원 식별, 로그인 유지, 요청 접수 및 진행 상태 관리, 담당자 연결, 알림 제공, 고객 문의 대응, 서비스 품질 개선을 위해 개인정보를 이용합니다.",
        },
        {
          heading: "보관 및 파기",
          body: "개인정보는 회원 탈퇴 또는 수집 목적 달성 시 지체 없이 파기합니다. 다만 관련 법령에 따라 보관이 필요한 정보는 정해진 기간 동안 분리 보관할 수 있습니다.",
        },
        {
          heading: "제3자 제공",
          body: "뚝딱은 원칙적으로 개인정보를 외부에 제공하지 않습니다. 단, 요청 처리에 필요한 범위에서 담당자에게 요청 정보가 전달될 수 있으며, 법령에 따른 요청이 있는 경우 예외적으로 제공될 수 있습니다.",
        },
        {
          heading: "이용자의 권리",
          body: "회원은 마이페이지에서 기본 정보를 확인하거나 수정할 수 있으며, 개인정보 처리에 대한 문의와 삭제 요청을 할 수 있습니다.",
        },
      ],
    },
    {
      id: "marketing",
      required: false,
      title: "이벤트 및 혜택 알림 수신",
      summary:
        "새 기능, 이벤트, 서비스 안내를 선택적으로 받을 수 있습니다.",
      detail:
        "동의하지 않아도 회원가입과 서비스 이용에는 제한이 없습니다. 알림 수신 여부는 마이페이지에서 언제든 변경할 수 있습니다.",
      sections: [
        {
          heading: "수신 항목",
          body: "새 기능 안내, 서비스 업데이트, 이벤트, 혜택, 운영 공지, 추천 콘텐츠 등의 정보를 받을 수 있습니다.",
        },
        {
          heading: "발송 방법",
          body: "알림은 서비스 내 알림, 이메일, 향후 제공될 수 있는 메시지 채널을 통해 발송될 수 있습니다.",
        },
        {
          heading: "동의 거부 및 철회",
          body: "이 항목은 선택 동의입니다. 동의하지 않아도 회원가입과 기본 서비스 이용에는 제한이 없으며, 마이페이지에서 언제든 수신 설정을 변경할 수 있습니다.",
        },
        {
          heading: "개인화 안내",
          body: "회원 유형, 요청 이력, 관심 서비스에 따라 더 적합한 안내가 표시될 수 있습니다.",
        },
      ],
    },
  ];

  const requiredTermsAgreed = termsItems
    .filter((item) => item.required)
    .every((item) => agreements[item.id]);
  const allTermsAgreed = termsItems.every((item) => agreements[item.id]);
  const selectedTerms = termsItems.find((item) => item.id === selectedTermsId);

  useEffect(() => {
    setLoading(false);
    setErrorMessage("");

    sessionStorage.removeItem("oauth_in_progress");
    sessionStorage.removeItem("oauth_provider");
    sessionStorage.removeItem("oauth_mode");
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowWidth());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const passwordChecks = useMemo(() => {
    const value = password || "";

    return {
      minLength: value.length >= 8,
      hasLetter: /[A-Za-z]/.test(value),
      hasNumber: /[0-9]/.test(value),
      hasSpecial: /[!@#$%^&*()_\-+=[\]{};:'",.<>/?\\|`~]/.test(value),
    };
  }, [password]);

  const validatePassword = (value) => {
    if (value.length < 8) {
      return "비밀번호는 8자 이상이어야 합니다.";
    }

    if (!/[A-Za-z]/.test(value)) {
      return "비밀번호에 영문을 1개 이상 포함해주세요.";
    }

    if (!/[0-9]/.test(value)) {
      return "비밀번호에 숫자를 1개 이상 포함해주세요.";
    }

    if (!/[!@#$%^&*()_\-+=[\]{};:'",.<>/?\\|`~]/.test(value)) {
      return "비밀번호에 특수문자를 1개 이상 포함해주세요.";
    }

    return "";
  };

  const handleToggleAgreement = (id) => {
    setAgreements((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setErrorMessage("");
  };

  const handleToggleAllAgreements = () => {
    const nextValue = !allTermsAgreed;
    setAgreements(
      termsItems.reduce(
        (next, item) => ({
          ...next,
          [item.id]: nextValue,
        }),
        {},
      ),
    );
    setErrorMessage("");
  };

  const handleShowTerms = (item) => {
    setSelectedTermsId(item.id);
    setSignupStep("termsDetail");
  };

  const handleOAuthSignup = async (provider) => {
    if (loading) return;

    if (!requiredTermsAgreed) {
      setErrorMessage("필수 약관에 동의해야 회원가입을 진행할 수 있습니다.");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      sessionStorage.setItem("oauth_in_progress", "true");
      sessionStorage.setItem("oauth_provider", provider);
      sessionStorage.setItem("oauth_mode", "signup");
      sessionStorage.setItem("signup_role", signupRole);

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
        },
      });

      if (error) throw error;
    } catch (error) {
      sessionStorage.removeItem("oauth_in_progress");
      sessionStorage.removeItem("oauth_provider");
      sessionStorage.removeItem("oauth_mode");
      sessionStorage.removeItem("signup_role");

      setErrorMessage(error.message || "소셜 회원가입 중 문제가 발생했습니다.");
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!requiredTermsAgreed) {
      setErrorMessage("필수 약관에 동의해야 회원가입을 진행할 수 있습니다.");
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      setErrorMessage("이름을 입력해주세요.");
      return;
    }

    if (!trimmedEmail) {
      setErrorMessage("이메일을 입력해주세요.");
      return;
    }

    if (!password) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    if (!passwordCheck) {
      setErrorMessage("비밀번호 확인을 입력해주세요.");
      return;
    }

    if (password !== passwordCheck) {
      setErrorMessage("비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      setLoading(true);

      const { data: existingProfile, error: existingProfileError } =
        await supabase
          .from("profiles")
          .select("id, provider")
          .eq("email", trimmedEmail)
          .maybeSingle();

      if (existingProfileError) {
        throw existingProfileError;
      }

      if (existingProfile) {
        setErrorMessage("이미 가입된 이메일입니다. 로그인으로 진행해주세요.");
        setLoading(false);
        return;
      }

      const username = trimmedEmail.split("@")[0];

      const { data, error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: {
          data: {
            name: trimmedName,
            role: signupRole,
          },
          emailRedirectTo: redirectTo,
        },
      });

      if (error) throw error;

      const createdUser = data?.user;

      if (!createdUser?.id) {
        throw new Error("회원가입 사용자 정보를 가져오지 못했습니다.");
      }

      if (
        Array.isArray(createdUser.identities) &&
        createdUser.identities.length === 0
      ) {
        setErrorMessage("이미 가입된 이메일입니다. 로그인으로 진행해주세요.");
        setLoading(false);
        return;
      }

      const { error: profileError } = await supabase.from("profiles").upsert(
        {
          id: createdUser.id,
          username,
          name: trimmedName,
          email: trimmedEmail,
          role: signupRole,
          provider: "email",
          auth_created_at: createdUser.created_at || new Date().toISOString(),
        },
        { onConflict: "id" },
      );

      if (profileError) throw profileError;

      setSuccessMessage(
        "회원가입이 완료되었습니다. 이메일 인증이 필요하면 메일함을 확인해주세요.",
      );

      setName("");
      setEmail("");
      setPassword("");
      setPasswordCheck("");
      setMode("choice");
      setSignupRole("user");
    } catch (error) {
      setErrorMessage(error.message || "회원가입 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const pageStyle = {
    minHeight: "100dvh",
    background:
      "linear-gradient(180deg, #F8FBFF 0%, #F3F6FA 52%, #EEF4FB 100%)",
    display: "flex",
    alignItems: isMobile ? "flex-start" : "center",
    justifyContent: "center",
    padding: isMobile ? "22px 14px" : "32px 18px",
    boxSizing: "border-box",
    fontFamily:
      '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "460px",
    background: "#ffffff",
    borderRadius: isMobile ? "22px" : "28px",
    padding: isSmallMobile
      ? "22px 16px 18px"
      : isMobile
      ? "26px 20px 22px"
      : "32px 30px 26px",
    border: `1px solid ${CARD_BORDER}`,
    boxShadow: isMobile
      ? "0 12px 28px rgba(15, 23, 42, 0.07)"
      : "0 18px 46px rgba(15, 23, 42, 0.08)",
    boxSizing: "border-box",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: isMobile ? "20px" : "24px",
  };

  const brandWrapStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    marginBottom: isMobile ? "16px" : "18px",
    WebkitTapHighlightColor: "transparent",
  };

  const brandMarkStyle = {
    width: isMobile ? "36px" : "40px",
    height: isMobile ? "36px" : "40px",
    borderRadius: isMobile ? "12px" : "14px",
    background: BRAND_COLOR,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontWeight: "900",
    fontSize: isMobile ? "12px" : "13px",
    flexShrink: 0,
    boxShadow: "0 10px 22px rgba(47, 128, 237, 0.18)",
  };

  const brandTextStyle = {
    fontSize: isMobile ? "21px" : "23px",
    fontWeight: "900",
    color: BRAND_COLOR,
    letterSpacing: "-0.5px",
    lineHeight: 1,
  };

  const BrandLogo = () => (
    <>
      <div style={brandMarkStyle}>ㄸ</div>
      <div style={brandTextStyle}>뚝딱</div>
    </>
  );

  const titleStyle = {
    margin: "0 0 8px",
    fontSize: isMobile ? "18px" : "19px",
    fontWeight: "850",
    color: TEXT_DARK,
    lineHeight: 1.38,
    letterSpacing: "-0.35px",
  };

  const descStyle = {
    margin: 0,
    fontSize: isMobile ? "13px" : "14px",
    color: TEXT_MUTED,
    lineHeight: 1.6,
    wordBreak: "keep-all",
  };

  const roleSectionStyle = {
    marginBottom: isMobile ? "14px" : "16px",
  };

  const termsPanelStyle = {
    marginBottom: isMobile ? "14px" : "16px",
    border: "1px solid #E7EEF8",
    borderRadius: "18px",
    background: "#FAFCFF",
    padding: isMobile ? "14px" : "16px",
  };

  const termsAllButtonStyle = {
    width: "100%",
    border: "none",
    background: "transparent",
    padding: "0 0 12px",
    borderBottom: "1px solid #E7EEF8",
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    textAlign: "left",
    cursor: "pointer",
    fontFamily:
      '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const termsListStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    paddingTop: "12px",
  };

  const checkCircleStyle = (checked) => ({
    width: "22px",
    height: "22px",
    borderRadius: "999px",
    border: `1px solid ${checked ? BRAND_COLOR : "#94A3B8"}`,
    background: checked ? BRAND_COLOR : "#ffffff",
    color: checked ? "#ffffff" : "#94A3B8",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: "14px",
    fontWeight: "900",
    lineHeight: 1,
  });

  const termsItemButtonStyle = {
    border: "none",
    background: "transparent",
    padding: 0,
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    textAlign: "left",
    cursor: "pointer",
    fontFamily:
      '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const termsViewButtonStyle = {
    border: "none",
    background: "transparent",
    color: TEXT_MUTED,
    fontSize: "12px",
    fontWeight: "800",
    padding: "2px 0",
    cursor: "pointer",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
    flexShrink: 0,
    fontFamily:
      '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const detailBackButtonStyle = {
    border: "none",
    background: "transparent",
    color: TEXT_MUTED,
    fontSize: "13px",
    fontWeight: "800",
    padding: "0",
    cursor: "pointer",
    fontFamily:
      '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const detailBodyStyle = {
    border: "1px solid #E7EEF8",
    borderRadius: "18px",
    background: "#FAFCFF",
    padding: isMobile ? "16px" : "20px",
    maxHeight: isMobile ? "48vh" : "430px",
    overflowY: "auto",
  };

  const roleLabelStyle = {
    marginBottom: "10px",
    fontSize: isMobile ? "13px" : "14px",
    fontWeight: "750",
    color: "#334155",
    textAlign: "left",
  };

  const roleButtonRowStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: isSmallMobile ? "8px" : "10px",
  };

  const roleGuideBoxStyle = {
    marginTop: "10px",
    padding: isMobile ? "12px 12px" : "13px 14px",
    borderRadius: "14px",
    background: "#FAFCFF",
    border: "1px solid #E7EEF8",
    textAlign: "left",
  };

  const roleGuideTitleStyle = {
    margin: "0 0 6px",
    fontSize: isMobile ? "12px" : "13px",
    fontWeight: "850",
    color: TEXT_DARK,
  };

  const roleGuideTextStyle = {
    margin: 0,
    fontSize: isMobile ? "12px" : "13px",
    lineHeight: 1.6,
    color: TEXT_MUTED,
    wordBreak: "keep-all",
  };

  const buttonHeight = isMobile ? "48px" : "50px";

  const baseButtonStyle = {
    width: "100%",
    minHeight: buttonHeight,
    borderRadius: "14px",
    fontSize: isMobile ? "14px" : "15px",
    fontWeight: "750",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxSizing: "border-box",
    outline: "none",
    outlineOffset: 0,
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    WebkitTapHighlightColor: "transparent",
    userSelect: "none",
    touchAction: "manipulation",
    transition:
      "background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, filter 0.18s ease, transform 0.18s ease",
  };

  const primaryButtonStyle = {
    ...baseButtonStyle,
    border: "1px solid transparent",
    background: BRAND_COLOR,
    color: "#ffffff",
    boxShadow: "0 10px 24px rgba(47, 128, 237, 0.18)",
  };

  const whiteButtonStyle = {
    ...baseButtonStyle,
    border: `1px solid ${CARD_BORDER}`,
    background: "#ffffff",
    color: TEXT_DARK,
    boxShadow: "none",
  };

  const kakaoButtonStyle = {
    ...baseButtonStyle,
    border: "1px solid transparent",
    background: "#FEE500",
    color: "#191919",
    boxShadow: "none",
  };

  const selectedRoleButtonStyle = {
    ...baseButtonStyle,
    minHeight: isMobile ? "44px" : "46px",
    border: `1px solid ${BRAND_COLOR}`,
    background: "#ffffff",
    color: BRAND_COLOR,
    boxShadow: "none",
    fontSize: isMobile ? "13px" : "14px",
  };

  const unselectedRoleButtonStyle = {
    ...baseButtonStyle,
    minHeight: isMobile ? "44px" : "46px",
    border: `1px solid ${CARD_BORDER}`,
    background: "#ffffff",
    color: TEXT_DARK,
    boxShadow: "none",
    fontSize: isMobile ? "13px" : "14px",
  };

  const buttonGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "10px" : "12px",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "12px" : "14px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontSize: isMobile ? "13px" : "14px",
    fontWeight: "750",
    color: "#334155",
  };

  const inputStyle = {
    width: "100%",
    height: buttonHeight,
    borderRadius: "13px",
    border: "1px solid #D9E2EC",
    padding: "0 14px",
    fontSize: isMobile ? "14px" : "14px",
    boxSizing: "border-box",
    outline: "none",
    color: TEXT_DARK,
    backgroundColor: "#ffffff",
    WebkitAppearance: "none",
    appearance: "none",
  };

  const passwordChecklistStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    marginTop: "10px",
    padding: isMobile ? "11px 12px" : "12px 14px",
    borderRadius: "14px",
    background: "#FAFCFF",
    border: "1px solid #E7EEF8",
  };

  const checklistRowStyle = (passed) => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: isMobile ? "12px" : "13px",
    color: passed ? BRAND_COLOR : TEXT_MUTED,
    fontWeight: passed ? "750" : "500",
    lineHeight: 1.5,
  });

  const checklistDotStyle = (passed) => ({
    width: "8px",
    height: "8px",
    borderRadius: "999px",
    background: passed ? BRAND_COLOR : "#CBD5E1",
    flexShrink: 0,
  });

  const errorBoxStyle = {
    padding: "12px 14px",
    borderRadius: "12px",
    background: "#FFF1F2",
    color: "#BE123C",
    fontSize: isMobile ? "12px" : "13px",
    lineHeight: 1.5,
    wordBreak: "keep-all",
  };

  const successBoxStyle = {
    padding: "12px 14px",
    borderRadius: "12px",
    background: "#ECFDF3",
    color: "#047857",
    fontSize: isMobile ? "12px" : "13px",
    lineHeight: 1.5,
    wordBreak: "keep-all",
  };

  const footerStyle = {
    marginTop: isMobile ? "18px" : "20px",
    textAlign: "center",
    fontSize: isMobile ? "13px" : "14px",
    color: TEXT_MUTED,
  };

  const footerLinkStyle = {
    border: "none",
    background: "transparent",
    color: BRAND_COLOR,
    fontSize: isMobile ? "13px" : "14px",
    fontWeight: "800",
    cursor: "pointer",
    padding: "0",
    outline: "none",
    boxShadow: "none",
    appearance: "none",
    WebkitAppearance: "none",
    WebkitTapHighlightColor: "transparent",
  };

  const iconBoxStyle = {
    width: "18px",
    height: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };

  const roleGuide =
    signupRole === "worker"
      ? {
          title: "전문가 회원 안내",
          text: "전문가 회원은 맡은 작업 보기, 요청 수락, 작업 진행과 완료 처리 같은 전문가 전용 흐름을 사용할 수 있어요.",
        }
      : {
          title: "일반 회원 안내",
          text: "일반 회원은 요청 등록, 내 요청 목록 확인, 요청 상세 확인처럼 요청을 맡기는 사용자 흐름으로 이용하게 돼요.",
        };

  if (signupStep === "termsDetail" && selectedTerms) {
    return (
      <div style={pageStyle}>
        <div
          style={{
            ...cardStyle,
            maxWidth: "520px",
            padding: isSmallMobile
              ? "24px 18px 20px"
              : isMobile
              ? "28px 22px 24px"
              : "34px 30px 28px",
          }}
        >
          <div style={{ marginBottom: "18px" }}>
            <button
              type="button"
              onClick={() => setSignupStep("terms")}
              onMouseDown={(e) => e.currentTarget.blur()}
              style={detailBackButtonStyle}
            >
              ← 약관 동의로 돌아가기
            </button>
          </div>

          <div style={headerStyle}>
            <div style={brandWrapStyle} onClick={() => navigate("/")}>
              <BrandLogo />
            </div>

            <h1 style={titleStyle}>{selectedTerms.title}</h1>
            <p style={descStyle}>{selectedTerms.summary}</p>
          </div>

          <div style={detailBodyStyle}>
            <p
              style={{
                margin: "0 0 18px",
                color: "#334155",
                fontSize: "14px",
                lineHeight: 1.8,
                wordBreak: "keep-all",
              }}
            >
              {selectedTerms.detail}
            </p>

            {(selectedTerms.sections || []).map((section) => (
              <section
                key={section.heading}
                style={{
                  paddingTop: "16px",
                  marginTop: "16px",
                  borderTop: "1px solid #E7EEF8",
                }}
              >
                <h2
                  style={{
                    margin: "0 0 8px",
                    color: TEXT_DARK,
                    fontSize: "15px",
                    fontWeight: "900",
                    lineHeight: 1.45,
                  }}
                >
                  {section.heading}
                </h2>
                <p
                  style={{
                    margin: 0,
                    color: TEXT_MUTED,
                    fontSize: "13px",
                    lineHeight: 1.75,
                    wordBreak: "keep-all",
                  }}
                >
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "10px",
              marginTop: "16px",
            }}
          >
            <HoverButton
              onClick={() => setSignupStep("terms")}
              style={whiteButtonStyle}
              hoverStyle={{ color: BRAND_COLOR }}
            >
              돌아가기
            </HoverButton>
            <HoverButton
              onClick={() => {
                handleToggleAgreement(selectedTerms.id);
                setSignupStep("terms");
              }}
              style={{
                ...primaryButtonStyle,
                background: agreements[selectedTerms.id]
                  ? "#94A3B8"
                  : BRAND_COLOR,
                boxShadow: agreements[selectedTerms.id]
                  ? "none"
                  : primaryButtonStyle.boxShadow,
              }}
              hoverStyle={{
                background: agreements[selectedTerms.id]
                  ? "#64748B"
                  : BRAND_HOVER,
              }}
            >
              {agreements[selectedTerms.id] ? "동의 해제" : "동의하기"}
            </HoverButton>
          </div>
        </div>
      </div>
    );
  }

  if (signupStep === "terms") {
    return (
      <div style={pageStyle}>
        <div
          style={{
            ...cardStyle,
            maxWidth: "456px",
            padding: isSmallMobile
              ? "24px 18px 20px"
              : isMobile
              ? "28px 22px 24px"
              : "34px 28px 28px",
          }}
        >
          <div style={headerStyle}>
            <div style={brandWrapStyle} onClick={() => navigate("/")}>
              <BrandLogo />
            </div>

            <h1 style={titleStyle}>회원가입 약관 동의</h1>
            <p style={descStyle}>
              서비스 이용에 필요한 필수 약관에 동의하면 회원가입을 계속할 수 있습니다.
            </p>
          </div>

          <div style={termsPanelStyle}>
            <button
              type="button"
              onClick={handleToggleAllAgreements}
              onMouseDown={(e) => e.currentTarget.blur()}
              style={termsAllButtonStyle}
            >
              <span style={checkCircleStyle(allTermsAgreed)}>
                {allTermsAgreed ? "✓" : ""}
              </span>
              <span>
                <strong
                  style={{
                    display: "block",
                    color: TEXT_DARK,
                    fontSize: "16px",
                    fontWeight: "900",
                    marginBottom: "6px",
                  }}
                >
                  전체 동의하기
                </strong>
                <span
                  style={{
                    display: "block",
                    color: TEXT_MUTED,
                    fontSize: "13px",
                    lineHeight: 1.6,
                    wordBreak: "keep-all",
                  }}
                >
                  필수 약관과 선택 알림 수신 동의를 한 번에 선택합니다.
                </span>
              </span>
            </button>

            <div style={termsListStyle}>
              {termsItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1fr) auto",
                    gap: "10px",
                    alignItems: "start",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleToggleAgreement(item.id)}
                    onMouseDown={(e) => e.currentTarget.blur()}
                    style={termsItemButtonStyle}
                  >
                    <span style={checkCircleStyle(agreements[item.id])}>
                      {agreements[item.id] ? "✓" : ""}
                    </span>
                    <span>
                      <span
                        style={{
                          display: "block",
                          color: TEXT_DARK,
                          fontSize: "14px",
                          fontWeight: "850",
                          lineHeight: 1.45,
                        }}
                      >
                        <span
                          style={{
                            color: item.required ? BRAND_COLOR : TEXT_MUTED,
                            marginRight: "5px",
                          }}
                        >
                          {item.required ? "필수" : "선택"}
                        </span>
                        {item.title}
                      </span>
                      <span
                        style={{
                          display: "block",
                          marginTop: "4px",
                          color: TEXT_MUTED,
                          fontSize: "12px",
                          lineHeight: 1.55,
                          wordBreak: "keep-all",
                        }}
                      >
                        {item.summary}
                      </span>
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleShowTerms(item)}
                    onMouseDown={(e) => e.currentTarget.blur()}
                    style={termsViewButtonStyle}
                  >
                    보기
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            disabled={!requiredTermsAgreed}
            onClick={() => {
              setErrorMessage("");
              setSuccessMessage("");
              setSignupStep("signup");
            }}
            onMouseDown={(e) => e.currentTarget.blur()}
            style={{
              ...primaryButtonStyle,
              background: requiredTermsAgreed ? BRAND_COLOR : "#98A2B3",
              boxShadow: requiredTermsAgreed
                ? "0 10px 24px rgba(47, 128, 237, 0.18)"
                : "none",
              cursor: requiredTermsAgreed ? "pointer" : "not-allowed",
            }}
          >
            다음
          </button>

          <div style={footerStyle}>
            이미 계정이 있으신가요?{" "}
            <HoverButton
              onClick={() =>
                onSwitchToLogin ? onSwitchToLogin() : navigate("/login")
              }
              style={footerLinkStyle}
              hoverStyle={{
                color: BRAND_HOVER,
              }}
            >
              로그인
            </HoverButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <div style={brandWrapStyle} onClick={() => navigate("/")}>
            <BrandLogo />
          </div>

          <h1 style={titleStyle}>
            {mode === "choice"
              ? "회원가입 방법을 선택해주세요"
              : "이메일로 회원가입"}
          </h1>

          <p style={descStyle}>
            {mode === "choice"
              ? "일반 회원과 전문가 회원 중 선택한 뒤 가입을 진행할 수 있어요."
              : "회원 정보를 입력하고 가입을 진행해주세요."}
          </p>
        </div>

        {mode === "choice" ? (
          <>
            <div style={roleSectionStyle}>
              <div style={roleLabelStyle}>회원 유형</div>

              <div style={roleButtonRowStyle}>
                <HoverButton
                  onClick={() => setSignupRole("user")}
                  style={
                    signupRole === "user"
                      ? selectedRoleButtonStyle
                      : unselectedRoleButtonStyle
                  }
                  hoverStyle={
                    signupRole === "user" ? {} : { color: BRAND_COLOR }
                  }
                >
                  일반 회원
                </HoverButton>

                <HoverButton
                  onClick={() => setSignupRole("worker")}
                  style={
                    signupRole === "worker"
                      ? selectedRoleButtonStyle
                      : unselectedRoleButtonStyle
                  }
                  hoverStyle={
                    signupRole === "worker" ? {} : { color: BRAND_COLOR }
                  }
                >
                  전문가 회원
                </HoverButton>
              </div>

              <div style={roleGuideBoxStyle}>
                <p style={roleGuideTitleStyle}>{roleGuide.title}</p>
                <p style={roleGuideTextStyle}>{roleGuide.text}</p>
              </div>
            </div>

            <div style={buttonGroupStyle}>
              <HoverButton
                onClick={() => setMode("email")}
                disabled={loading}
                style={primaryButtonStyle}
                hoverStyle={{
                  background: BRAND_HOVER,
                  boxShadow: "0 14px 28px rgba(31, 111, 214, 0.22)",
                }}
              >
                이메일로 시작하기
              </HoverButton>

              <HoverButton
                onClick={() => handleOAuthSignup("google")}
                disabled={loading}
                style={whiteButtonStyle}
                hoverStyle={{
                  color: BRAND_COLOR,
                }}
              >
                <span style={iconBoxStyle}>
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    style={{ display: "block", width: "18px", height: "18px" }}
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                </span>
                <span>구글로 회원가입</span>
              </HoverButton>

              <HoverButton
                onClick={() => handleOAuthSignup("kakao")}
                disabled={loading}
                style={kakaoButtonStyle}
                hoverStyle={{
                  filter: "brightness(0.97)",
                }}
              >
                <span style={iconBoxStyle}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ display: "block" }}
                  >
                    <path
                      d="M12 4C7.03 4 3 7.13 3 11c0 2.46 1.63 4.63 4.09 5.88L6.2 20.5c-.08.33.29.59.58.41l4.17-2.72c.34.04.69.06 1.05.06 4.97 0 9-3.13 9-7S16.97 4 12 4Z"
                      fill="#191919"
                    />
                  </svg>
                </span>
                <span>카카오로 회원가입</span>
              </HoverButton>

              {errorMessage && <div style={errorBoxStyle}>{errorMessage}</div>}
              {successMessage && (
                <div style={successBoxStyle}>{successMessage}</div>
              )}
            </div>
          </>
        ) : (
          <form onSubmit={handleSignup} style={formStyle}>
            <div>
              <label style={labelStyle}>이름</label>
              <input
                type="text"
                placeholder="이름을 입력하세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>이메일</label>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                style={inputStyle}
              />

              <div style={passwordChecklistStyle}>
                <div style={checklistRowStyle(passwordChecks.minLength)}>
                  <span style={checklistDotStyle(passwordChecks.minLength)} />
                  8자 이상 입력
                </div>

                <div style={checklistRowStyle(passwordChecks.hasLetter)}>
                  <span style={checklistDotStyle(passwordChecks.hasLetter)} />
                  영문 1개 이상 포함
                </div>

                <div style={checklistRowStyle(passwordChecks.hasNumber)}>
                  <span style={checklistDotStyle(passwordChecks.hasNumber)} />
                  숫자 1개 이상 포함
                </div>

                <div style={checklistRowStyle(passwordChecks.hasSpecial)}>
                  <span style={checklistDotStyle(passwordChecks.hasSpecial)} />
                  특수문자 1개 이상 포함
                </div>
              </div>
            </div>

            <div>
              <label style={labelStyle}>비밀번호 확인</label>
              <input
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
                autoComplete="new-password"
                style={inputStyle}
              />
            </div>

            {errorMessage && <div style={errorBoxStyle}>{errorMessage}</div>}
            {successMessage && (
              <div style={successBoxStyle}>{successMessage}</div>
            )}

            <HoverButton
              type="submit"
              disabled={loading}
              style={primaryButtonStyle}
              hoverStyle={{
                background: BRAND_HOVER,
                boxShadow: "0 14px 28px rgba(31, 111, 214, 0.22)",
              }}
            >
              {loading ? "가입 중..." : "이메일 회원가입"}
            </HoverButton>

            <HoverButton
              onClick={() => {
                setErrorMessage("");
                setSuccessMessage("");
                setMode("choice");
              }}
              style={whiteButtonStyle}
              hoverStyle={{
                color: BRAND_COLOR,
              }}
            >
              다른 방법 선택
            </HoverButton>
          </form>
        )}

        <div style={footerStyle}>
          이미 계정이 있으신가요?{" "}
          <HoverButton
            onClick={() =>
              onSwitchToLogin ? onSwitchToLogin() : navigate("/login")
            }
            style={footerLinkStyle}
            hoverStyle={{
              color: BRAND_HOVER,
            }}
          >
            로그인
          </HoverButton>
        </div>
      </div>
    </div>
  );
}

function HoverButton({
  children,
  onClick,
  style,
  hoverStyle = {},
  disabled = false,
  type = "button",
}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onMouseDown={(e) => e.currentTarget.blur()}
      onMouseUp={(e) => e.currentTarget.blur()}
      onFocus={(e) => e.currentTarget.blur()}
      style={{
        ...style,
        opacity: disabled ? 0.65 : 1,
        cursor: disabled ? "not-allowed" : style?.cursor || "pointer",
        outline: "none",
        outlineOffset: 0,
        boxShadow: style?.boxShadow || "none",
        border: style?.border || "none",
        WebkitTapHighlightColor: "transparent",
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
        ...(isHover && !disabled ? hoverStyle : {}),
      }}
    >
      {children}
    </button>
  );
}

export default Signup;
