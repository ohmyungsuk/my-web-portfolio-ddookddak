import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient.js";

function Signup({ onSwitchToLogin }) {
  const navigate = useNavigate();

  const BRAND_COLOR = "#2F80ED";
  const BRAND_HOVER = "#1F6FD6";
  const BRAND_SOFT = "#F8FBFF";
  const TEXT_DARK = "#0F172A";
  const TEXT_MUTED = "#64748B";

  const [mode, setMode] = useState("choice");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const redirectTo = `${window.location.origin}${import.meta.env.BASE_URL}#/oauth/callback`;

  const resetOAuthUiState = () => {
    setLoading(false);
    setErrorMessage("");
    sessionStorage.removeItem("oauth_in_progress");
    sessionStorage.removeItem("oauth_provider");
    sessionStorage.removeItem("oauth_mode");
  };

  useEffect(() => {
    resetOAuthUiState();

    const handlePageShow = () => {
      resetOAuthUiState();
    };

    const handleFocus = () => {
      resetOAuthUiState();
    };

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const handleOAuthSignup = async (provider) => {
    if (loading) return;

    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      sessionStorage.setItem("oauth_in_progress", "true");
      sessionStorage.setItem("oauth_provider", provider);
      sessionStorage.setItem("oauth_mode", "signup");

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
        },
      });

      if (error) {
        sessionStorage.removeItem("oauth_in_progress");
        sessionStorage.removeItem("oauth_provider");
        sessionStorage.removeItem("oauth_mode");
        setErrorMessage(`${provider} 회원가입 중 오류가 발생했습니다.`);
        setLoading(false);
      }
    } catch (error) {
      sessionStorage.removeItem("oauth_in_progress");
      sessionStorage.removeItem("oauth_provider");
      sessionStorage.removeItem("oauth_mode");
      setErrorMessage(error.message || "소셜 회원가입 중 문제가 발생했습니다.");
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!name.trim()) {
      setErrorMessage("이름을 입력해주세요.");
      return;
    }

    if (!email.trim()) {
      setErrorMessage("이메일을 입력해주세요.");
      return;
    }

    if (!password) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("비밀번호는 6글자 이상으로 입력해주세요.");
      return;
    }

    if (password !== passwordCheck) {
      setErrorMessage("비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            name: name.trim(),
          },
          emailRedirectTo: redirectTo,
        },
      });

      if (error) throw error;

      setSuccessMessage(
        "회원가입이 완료되었습니다. 이메일 인증이 켜져 있으면 메일함에서 인증을 진행해주세요."
      );

      setName("");
      setEmail("");
      setPassword("");
      setPasswordCheck("");
    } catch (error) {
      setErrorMessage(error.message || "회원가입 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const pageStyle = {
    minHeight: "100vh",
    background: "#eef2f7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 16px",
    boxSizing: "border-box",
    fontFamily:
      '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "440px",
    background: "#ffffff",
    borderRadius: "24px",
    padding: "30px 28px 24px",
    boxShadow: "0 12px 40px rgba(15, 23, 42, 0.08)",
    border: "1px solid #edf1f6",
    boxSizing: "border-box",
  };

  const brandWrapStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    marginBottom: "12px",
  };

  const brandMarkStyle = {
    width: "36px",
    height: "36px",
    borderRadius: "12px",
    background: BRAND_COLOR,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontWeight: "900",
    fontSize: "13px",
    boxShadow: "0 10px 20px rgba(47, 128, 237, 0.18)",
    flexShrink: 0,
  };

  const brandTextStyle = {
    fontSize: "21px",
    fontWeight: "900",
    color: BRAND_COLOR,
    letterSpacing: "-0.4px",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "22px",
  };

  const titleStyle = {
    margin: "0 0 10px",
    fontSize: "18px",
    fontWeight: "800",
    color: TEXT_DARK,
    letterSpacing: "-0.3px",
    lineHeight: 1.35,
  };

  const descStyle = {
    margin: 0,
    fontSize: "14px",
    color: TEXT_MUTED,
    lineHeight: "1.6",
  };

  const choiceFormStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  const buttonBaseStyle = {
    width: "100%",
    height: "50px",
    borderRadius: "14px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxSizing: "border-box",
    outline: "none",
    WebkitTapHighlightColor: "transparent",
    appearance: "none",
    WebkitAppearance: "none",
    transition:
      "background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease, filter 0.18s ease",
  };

  const emailButtonStyle = {
    ...buttonBaseStyle,
    border: "none",
    background: "linear-gradient(135deg, #2F80ED 0%, #1C63E0 100%)",
    color: "#ffffff",
    boxShadow: "0 10px 24px rgba(47, 128, 237, 0.18)",
  };

  const googleButtonStyle = {
    ...buttonBaseStyle,
    border: "none",
    background: "#ffffff",
    color: "#111827",
    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.04)",
  };

  const kakaoButtonStyle = {
    ...buttonBaseStyle,
    border: "none",
    background: "#FEE500",
    color: "#191919",
    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.05)",
  };

  const iconBoxStyle = {
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };

  const errorBoxStyle = {
    marginTop: "4px",
    padding: "12px 14px",
    borderRadius: "12px",
    background: "#fff1f2",
    color: "#be123c",
    fontSize: "13px",
    lineHeight: "1.5",
  };

  const successBoxStyle = {
    marginTop: "4px",
    padding: "12px 14px",
    borderRadius: "12px",
    background: "#ecfdf5",
    color: "#15803d",
    fontSize: "13px",
    lineHeight: "1.5",
  };

  const emailFormStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#334155",
  };

  const inputStyle = {
    width: "100%",
    height: "48px",
    borderRadius: "12px",
    border: "1px solid #d9e2ec",
    padding: "0 14px",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
    color: TEXT_DARK,
    backgroundColor: "#ffffff",
  };

  const submitButtonStyle = {
    width: "100%",
    height: "50px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #2F80ED 0%, #1C63E0 100%)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "800",
    cursor: "pointer",
    outline: "none",
    WebkitTapHighlightColor: "transparent",
    boxShadow: "0 10px 24px rgba(47, 128, 237, 0.18)",
  };

  const secondaryButtonStyle = {
    width: "100%",
    height: "48px",
    borderRadius: "14px",
    border: "none",
    background: "#ffffff",
    color: "#1e293b",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    boxSizing: "border-box",
    outline: "none",
    WebkitTapHighlightColor: "transparent",
    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.04)",
  };

  const footerStyle = {
    marginTop: "18px",
    textAlign: "center",
    fontSize: "14px",
    color: TEXT_MUTED,
  };

  const footerLinkStyle = {
    border: "none",
    background: "transparent",
    color: "#2563eb",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    padding: 0,
    outline: "none",
    WebkitTapHighlightColor: "transparent",
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <div style={brandWrapStyle} onClick={() => navigate("/")}>
            <div style={brandMarkStyle}>ㄸ</div>
            <div style={brandTextStyle}>뚝딱</div>
          </div>

          <h1 style={titleStyle}>
            {mode === "choice" ? "회원가입 방법 선택" : "이메일 회원가입"}
          </h1>

          <p style={descStyle}>
            {mode === "choice"
              ? "원하는 회원가입 방식을 선택해주세요."
              : "새 계정을 만들고 유지보수 요청 서비스를 시작하세요."}
          </p>
        </div>

        {mode === "choice" ? (
          <div style={choiceFormStyle}>
            <HoverButton
              onClick={() => setMode("email")}
              disabled={loading}
              style={emailButtonStyle}
              hoverStyle={{
                filter: "brightness(0.92)",
                boxShadow: "0 14px 28px rgba(31, 111, 214, 0.22)",
                transform: "translateY(-1px)",
              }}
            >
              이메일로 회원가입
            </HoverButton>

            <HoverButton
              onClick={() => handleOAuthSignup("google")}
              disabled={loading}
              style={googleButtonStyle}
              hoverStyle={{
                backgroundColor: BRAND_SOFT,
                transform: "translateY(-1px)",
                boxShadow: "0 12px 24px rgba(15, 23, 42, 0.06)",
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
              <span>Google로 계속하기</span>
            </HoverButton>

            <HoverButton
              onClick={() => handleOAuthSignup("kakao")}
              disabled={loading}
              style={kakaoButtonStyle}
              hoverStyle={{
                transform: "translateY(-1px)",
                boxShadow: "0 12px 24px rgba(15, 23, 42, 0.08)",
                filter: "brightness(0.98)",
              }}
            >
              <span style={iconBoxStyle}>
                <svg
                  width="20"
                  height="20"
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
              <span>카카오로 계속하기</span>
            </HoverButton>

            {errorMessage && <div style={errorBoxStyle}>{errorMessage}</div>}
          </div>
        ) : (
          <form onSubmit={handleSignup} style={emailFormStyle}>
            <div>
              <label style={labelStyle}>이름</label>
              <input
                type="text"
                placeholder="이름을 입력하세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>비밀번호 확인</label>
              <input
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
                style={inputStyle}
              />
            </div>

            {errorMessage && <div style={errorBoxStyle}>{errorMessage}</div>}
            {successMessage && <div style={successBoxStyle}>{successMessage}</div>}

            <HoverButton
              type="submit"
              disabled={loading}
              style={submitButtonStyle}
              hoverStyle={{
                filter: "brightness(0.92)",
                transform: "translateY(-1px)",
                boxShadow: "0 14px 28px rgba(31, 111, 214, 0.22)",
              }}
            >
              {loading ? "가입 중..." : "이메일 회원가입"}
            </HoverButton>

            <HoverButton
              onClick={() => setMode("choice")}
              style={secondaryButtonStyle}
              hoverStyle={{
                backgroundColor: BRAND_SOFT,
                color: BRAND_COLOR,
                transform: "translateY(-1px)",
                boxShadow: "0 12px 24px rgba(47, 128, 237, 0.10)",
              }}
            >
              다른 방법 선택
            </HoverButton>
          </form>
        )}

        <div style={footerStyle}>
          <span>이미 계정이 있나요?</span>{" "}
          <HoverButton
            onClick={() => onSwitchToLogin && onSwitchToLogin()}
            style={footerLinkStyle}
            hoverStyle={{
              color: BRAND_HOVER,
            }}
          >
            로그인으로 이동
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
      onBlur={() => setIsHover(false)}
      style={{
        outline: "none",
        WebkitTapHighlightColor: "transparent",
        transition:
          "background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease, filter 0.18s ease",
        ...style,
        ...(isHover && !disabled ? hoverStyle : {}),
      }}
    >
      {children}
    </button>
  );
}

export default Signup;