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

  const redirectTo = `${window.location.origin}${import.meta.env.BASE_URL}`;

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

      if (error) throw error;
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

  const brandStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    marginBottom: "14px",
  };

  const brandMarkStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #2563eb 0%, #6366f1 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontWeight: "900",
    fontSize: "14px",
    boxShadow: "0 12px 24px rgba(37, 99, 235, 0.18)",
  };

  const brandTextStyle = {
    fontSize: "24px",
    fontWeight: "900",
    color: "#2563eb",
    letterSpacing: "-0.6px",
  };

  const socialButtonStyle = {
    width: "100%",
    height: "52px",
    borderRadius: "14px",
    border: "1px solid #dbe4f2",
    background: "#ffffff",
    color: "#1e293b",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
  };

  const outlineButtonStyle = {
    width: "100%",
    height: "52px",
    borderRadius: "14px",
    border: "1px solid #cfd8e6",
    background: "#f8fbff",
    color: "#2563eb",
    fontSize: "15px",
    fontWeight: "800",
    cursor: "pointer",
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div style={brandStyle} onClick={() => navigate("/")}>
            <div style={brandMarkStyle}>ㄸ</div>
            <div style={brandTextStyle}>뚝딱</div>
          </div>

          <h1>{mode === "choice" ? "로그인 방법 선택" : "이메일 로그인"}</h1>
          <p className="auth-desc">
            {mode === "choice"
              ? "원하는 로그인 방식을 선택해주세요."
              : "등록한 이메일과 비밀번호로 접속하세요."}
          </p>
        </div>

        {mode === "choice" ? (
          <div className="auth-form">
            <button
              type="button"
              style={outlineButtonStyle}
              onClick={() => setMode("email")}
            >
              이메일로 로그인
            </button>

            <button
              type="button"
              style={socialButtonStyle}
              onClick={() => handleOAuthLogin("google")}
              disabled={loading}
            >
              Google로 계속하기
            </button>

            <button
              type="button"
              style={socialButtonStyle}
              onClick={() => handleOAuthLogin("kakao")}
              disabled={loading}
            >
              Kakao로 계속하기
            </button>

            {errorMessage && <div className="message error">{errorMessage}</div>}
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label>이메일</label>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="input-group">
              <label>비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {errorMessage && <div className="message error">{errorMessage}</div>}

            <button className="auth-button" type="submit" disabled={loading}>
              {loading ? "로그인 중..." : "로그인"}
            </button>

            <button
              type="button"
              style={socialButtonStyle}
              onClick={() => setMode("choice")}
            >
              다른 방법 선택
            </button>
          </form>
        )}

        <div className="auth-footer">
          <span>아직 계정이 없나요?</span>
          <button
            type="button"
            className="text-button"
            onClick={() => onSwitchToSignup && onSwitchToSignup()}
          >
            회원가입으로 이동
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;