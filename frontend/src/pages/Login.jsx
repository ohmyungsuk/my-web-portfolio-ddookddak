import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient.js";

function Login({ onSwitchToSignup, onLoginSuccess }) {
  const navigate = useNavigate();

  const [mode, setMode] = useState("choice");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const redirectTo = `${window.location.origin}${import.meta.env.BASE_URL}#/oauth/callback`;

  const handleOAuthLogin = async (provider) => {
    try {
      setLoading(true);
      setErrorMessage("");

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
        },
      });

      if (error) {
        setErrorMessage(`${provider} 로그인 중 오류가 발생했습니다.`);
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage(error.message || "소셜 로그인 중 문제가 발생했습니다.");
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim()) {
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
        email: email.trim(),
        password,
      });

      if (error) throw error;

      if (onLoginSuccess) {
        onLoginSuccess(data);
      } else {
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.message || "로그인 중 문제가 발생했습니다.");
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
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "440px",
    background: "#ffffff",
    borderRadius: "24px",
    padding: "30px 28px 24px",
    boxShadow: "0 12px 40px rgba(15, 23, 42, 0.08)",
    border: "1px solid #edf1f6",
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
    background: "#EAF4FF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#2F80ED",
    fontWeight: "900",
    fontSize: "13px",
    boxShadow: "0 10px 20px rgba(77, 163, 255, 0.10)",
  };

  const brandTextStyle = {
    fontSize: "21px",
    fontWeight: "800",
    color: "#2F80ED",
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
    color: "#0f172a",
    letterSpacing: "-0.3px",
    lineHeight: 1.35,
  };

  const descStyle = {
    margin: 0,
    fontSize: "14px",
    color: "#64748b",
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
    transition: "all 0.2s ease",
  };

  const emailButtonStyle = {
    ...buttonBaseStyle,
    border: "1px solid #cfd8e6",
    background: "#f8fbff",
    color: "#2563eb",
  };

  const googleButtonStyle = {
    ...buttonBaseStyle,
    border: "1px solid #d1d5db",
    background: "#ffffff",
    color: "#111827",
  };

  const kakaoButtonStyle = {
    ...buttonBaseStyle,
    border: "1px solid #f2d600",
    background: "#FEE500",
    color: "#191919",
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
  };

  const submitButtonStyle = {
    width: "100%",
    height: "50px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "800",
    cursor: "pointer",
  };

  const secondaryButtonStyle = {
    width: "100%",
    height: "48px",
    borderRadius: "14px",
    border: "1px solid #dbe4f2",
    background: "#ffffff",
    color: "#1e293b",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    boxSizing: "border-box",
  };

  const footerStyle = {
    marginTop: "18px",
    textAlign: "center",
    fontSize: "14px",
    color: "#64748b",
  };

  const footerLinkStyle = {
    border: "none",
    background: "transparent",
    color: "#2563eb",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    padding: 0,
  };

  return (
    <div className="auth-page" style={pageStyle}>
      <div className="auth-card" style={cardStyle}>
        <div className="auth-header" style={headerStyle}>
          <div style={brandWrapStyle} onClick={() => navigate("/")}>
            <div style={brandMarkStyle}>ㄸ</div>
            <div style={brandTextStyle}>뚝딱</div>
          </div>

          <h1 style={titleStyle}>
            {mode === "choice" ? "로그인 방법 선택" : "이메일 로그인"}
          </h1>

          <p className="auth-desc" style={descStyle}>
            {mode === "choice"
              ? "원하는 로그인 방식을 선택해주세요."
              : "등록한 이메일과 비밀번호로 접속하세요."}
          </p>
        </div>

        {mode === "choice" ? (
          <div className="auth-form" style={choiceFormStyle}>
            <button
              type="button"
              style={emailButtonStyle}
              onClick={() => setMode("email")}
              disabled={loading}
            >
              이메일로 로그인
            </button>

            <button
              type="button"
              onClick={() => handleOAuthLogin("google")}
              disabled={loading}
              style={googleButtonStyle}
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
            </button>

            <button
              type="button"
              onClick={() => handleOAuthLogin("kakao")}
              disabled={loading}
              style={kakaoButtonStyle}
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
            </button>

            {errorMessage && (
              <div className="message error" style={errorBoxStyle}>
                {errorMessage}
              </div>
            )}
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleLogin} style={emailFormStyle}>
            <div className="input-group">
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

            <div className="input-group">
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

            {errorMessage && (
              <div className="message error" style={errorBoxStyle}>
                {errorMessage}
              </div>
            )}

            <button
              className="auth-button"
              type="submit"
              disabled={loading}
              style={submitButtonStyle}
            >
              {loading ? "로그인 중..." : "이메일 로그인"}
            </button>

            <button
              type="button"
              style={secondaryButtonStyle}
              onClick={() => setMode("choice")}
            >
              다른 방법 선택
            </button>
          </form>
        )}

        <div className="auth-footer" style={footerStyle}>
          <span>아직 계정이 없나요?</span>{" "}
          <button
            type="button"
            className="text-button"
            onClick={() => onSwitchToSignup && onSwitchToSignup()}
            style={footerLinkStyle}
          >
            회원가입으로 이동
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;