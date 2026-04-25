import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient.js";

function Login({ onSwitchToSignup, onLoginSuccess }) {
  const navigate = useNavigate();

  const BRAND_COLOR = "#2F80ED";
  const BRAND_HOVER = "#1F6FD6";
  const TEXT_DARK = "#0F172A";
  const TEXT_MUTED = "#64748B";
  const CARD_BORDER = "#E5EDF6";

  const [mode, setMode] = useState("choice");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  const redirectTo = `${window.location.origin}${import.meta.env.BASE_URL}#/oauth/callback`;

  useEffect(() => {
    setLoading(false);
    setErrorMessage("");
    sessionStorage.removeItem("oauth_in_progress");
    sessionStorage.removeItem("oauth_provider");
    sessionStorage.removeItem("oauth_mode");
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOAuthLogin = async (provider) => {
    if (loading) return;

    try {
      setLoading(true);
      setErrorMessage("");

      sessionStorage.setItem("oauth_in_progress", "true");
      sessionStorage.setItem("oauth_provider", provider);
      sessionStorage.setItem("oauth_mode", "login");
      sessionStorage.removeItem("signup_role");

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
      setErrorMessage(error.message || "소셜 로그인 중 문제가 발생했습니다.");
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setErrorMessage("이메일을 입력해주세요.");
      return;
    }

    if (!password) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (error) throw error;

      if (onLoginSuccess) {
        onLoginSuccess(data);
      } else {
        navigate("/");
      }
    } catch (error) {
      const message = String(error.message || "");

      if (message.toLowerCase().includes("invalid login credentials")) {
        setErrorMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else {
        setErrorMessage(message || "로그인 중 문제가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const pageStyle = {
    minHeight: "100vh",
    background: "#F3F6FA",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: isMobile ? "18px 12px" : "28px 16px",
    boxSizing: "border-box",
    fontFamily:
      '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "460px",
    background: "#ffffff",
    borderRadius: isMobile ? "22px" : "28px",
    padding: isMobile ? "24px 18px 20px" : "30px 28px 24px",
    border: `1px solid ${CARD_BORDER}`,
    boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
    boxSizing: "border-box",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: isMobile ? "18px" : "22px",
  };

  const brandWrapStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    marginBottom: isMobile ? "14px" : "18px",
  };

  const brandMarkStyle = {
    width: isMobile ? "34px" : "38px",
    height: isMobile ? "34px" : "38px",
    borderRadius: isMobile ? "11px" : "13px",
    background: BRAND_COLOR,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontWeight: "900",
    fontSize: isMobile ? "12px" : "13px",
    flexShrink: 0,
    boxShadow: "0 10px 20px rgba(47, 128, 237, 0.16)",
  };

  const brandTextStyle = {
    fontSize: isMobile ? "20px" : "22px",
    fontWeight: "900",
    color: BRAND_COLOR,
    letterSpacing: "-0.4px",
    lineHeight: 1,
  };

  const titleStyle = {
    margin: "0 0 8px",
    fontSize: isMobile ? "17px" : "18px",
    fontWeight: "800",
    color: TEXT_DARK,
    lineHeight: 1.4,
    letterSpacing: "-0.3px",
  };

  const descStyle = {
    margin: 0,
    fontSize: isMobile ? "13px" : "14px",
    color: TEXT_MUTED,
    lineHeight: 1.6,
  };

  const baseButtonStyle = {
    width: "100%",
    height: isMobile ? "48px" : "50px",
    borderRadius: "14px",
    fontSize: isMobile ? "14px" : "15px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxSizing: "border-box",
    outline: "none",
    appearance: "none",
    WebkitAppearance: "none",
    WebkitTapHighlightColor: "transparent",
    transition:
      "background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, filter 0.18s ease",
  };

  const primaryButtonStyle = {
    ...baseButtonStyle,
    border: "none",
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
    border: "none",
    background: "#FEE500",
    color: "#191919",
    boxShadow: "none",
  };

  const iconBoxStyle = {
    width: "18px",
    height: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
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
    fontWeight: "700",
    color: "#334155",
  };

  const inputStyle = {
    width: "100%",
    height: isMobile ? "48px" : "50px",
    borderRadius: "13px",
    border: "1px solid #D9E2EC",
    padding: "0 14px",
    fontSize: isMobile ? "13px" : "14px",
    boxSizing: "border-box",
    outline: "none",
    color: TEXT_DARK,
    backgroundColor: "#ffffff",
  };

  const errorBoxStyle = {
    padding: "12px 14px",
    borderRadius: "12px",
    background: "#FFF1F2",
    color: "#BE123C",
    fontSize: isMobile ? "12px" : "13px",
    lineHeight: 1.5,
  };

  const footerStyle = {
    marginTop: isMobile ? "16px" : "18px",
    textAlign: "center",
    fontSize: isMobile ? "13px" : "14px",
    color: TEXT_MUTED,
  };

  const footerLinkStyle = {
    border: "none",
    background: "transparent",
    color: BRAND_COLOR,
    fontSize: isMobile ? "13px" : "14px",
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
            {mode === "choice"
              ? "로그인 방법을 선택해주세요"
              : "이메일로 로그인"}
          </h1>
          <p style={descStyle}>
            {mode === "choice"
              ? "이메일, 구글, 카카오 중 원하는 방법으로 로그인할 수 있어요."
              : "가입한 이메일과 비밀번호를 입력해주세요."}
          </p>
        </div>

        {mode === "choice" ? (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <HoverButton
              onClick={() => setMode("email")}
              disabled={loading}
              style={primaryButtonStyle}
              hoverStyle={{
                background: BRAND_HOVER,
                boxShadow: "0 14px 28px rgba(31, 111, 214, 0.22)",
              }}
            >
              이메일로 로그인
            </HoverButton>

            <HoverButton
              onClick={() => handleOAuthLogin("google")}
              disabled={loading}
              style={whiteButtonStyle}
              hoverStyle={{ color: BRAND_COLOR }}
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
              <span>구글로 로그인</span>
            </HoverButton>

            <HoverButton
              onClick={() => handleOAuthLogin("kakao")}
              disabled={loading}
              style={kakaoButtonStyle}
              hoverStyle={{ filter: "brightness(0.97)" }}
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
              <span>카카오로 로그인</span>
            </HoverButton>

            {errorMessage && <div style={errorBoxStyle}>{errorMessage}</div>}
          </div>
        ) : (
          <form onSubmit={handleLogin} style={formStyle}>
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
                autoComplete="current-password"
                style={inputStyle}
              />
            </div>

            {errorMessage && <div style={errorBoxStyle}>{errorMessage}</div>}

            <HoverButton
              type="submit"
              disabled={loading}
              style={primaryButtonStyle}
              hoverStyle={{
                background: BRAND_HOVER,
                boxShadow: "0 14px 28px rgba(31, 111, 214, 0.22)",
              }}
            >
              {loading ? "로그인 중..." : "이메일로 로그인"}
            </HoverButton>

            <HoverButton
              onClick={() => setMode("choice")}
              style={whiteButtonStyle}
              hoverStyle={{ color: BRAND_COLOR }}
            >
              다른 방법 선택
            </HoverButton>
          </form>
        )}

        <div style={footerStyle}>
          아직 계정이 없으신가요?{" "}
          <HoverButton
            onClick={() =>
              onSwitchToSignup ? onSwitchToSignup() : navigate("/signup")
            }
            style={footerLinkStyle}
            hoverStyle={{ color: BRAND_HOVER }}
          >
            회원가입
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
        boxShadow: style?.boxShadow || "none",
        WebkitTapHighlightColor: "transparent",
        appearance: "none",
        WebkitAppearance: "none",
        transition:
          "background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, filter 0.18s ease",
        ...(isHover && !disabled ? hoverStyle : {}),
      }}
    >
      {children}
    </button>
  );
}

export default Login;
