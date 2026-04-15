import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient.js";

function Signup({ onSwitchToLogin }) {
  const navigate = useNavigate();

  const [mode, setMode] = useState("choice");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const redirectTo = `${window.location.origin}${import.meta.env.BASE_URL}`;

  const handleOAuthSignup = async (provider) => {
    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
        },
      });

      if (error) throw error;
    } catch (error) {
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

  const googleButtonWrapStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  };

  const googleButtonStyle = {
    MozUserSelect: "none",
    WebkitUserSelect: "none",
    msUserSelect: "none",
    WebkitAppearance: "none",
    backgroundColor: "#ffffff",
    backgroundImage: "none",
    border: "1px solid #747775",
    borderRadius: "20px",
    boxSizing: "border-box",
    color: "#1f1f1f",
    cursor: "pointer",
    fontFamily: '"Roboto", arial, sans-serif',
    fontSize: "14px",
    height: "40px",
    letterSpacing: "0.25px",
    outline: "none",
    overflow: "hidden",
    padding: "0 12px",
    position: "relative",
    textAlign: "center",
    transition: "background-color .218s, border-color .218s, box-shadow .218s",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
    width: "100%",
    maxWidth: "392px",
    minWidth: "min-content",
  };

  const googleButtonContentStyle = {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    height: "100%",
    justifyContent: "center",
    position: "relative",
    width: "100%",
  };

  const googleButtonIconStyle = {
    height: "20px",
    marginRight: "10px",
    minWidth: "20px",
    width: "20px",
  };

  const googleButtonTextStyle = {
    flexGrow: 0,
    fontFamily: '"Roboto", arial, sans-serif',
    fontWeight: 500,
    overflow: "hidden",
    textOverflow: "ellipsis",
    verticalAlign: "top",
  };

  const googleButtonStateStyle = {
    transition: "opacity .218s",
    bottom: 0,
    left: 0,
    opacity: 0,
    position: "absolute",
    right: 0,
    top: 0,
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div style={brandStyle} onClick={() => navigate("/")}>
            <div style={brandMarkStyle}>ㄸ</div>
            <div style={brandTextStyle}>뚝딱</div>
          </div>

          <h1>{mode === "choice" ? "회원가입 방법 선택" : "이메일 회원가입"}</h1>
          <p className="auth-desc">
            {mode === "choice"
              ? "원하는 회원가입 방식을 선택해주세요."
              : "새 계정을 만들고 유지보수 요청 서비스를 시작하세요."}
          </p>
        </div>

        {mode === "choice" ? (
          <div className="auth-form">
            <button
              type="button"
              style={outlineButtonStyle}
              onClick={() => setMode("email")}
            >
              이메일로 회원가입
            </button>

            <div style={googleButtonWrapStyle}>
              <button
                type="button"
                onClick={() => handleOAuthSignup("google")}
                disabled={loading}
                style={googleButtonStyle}
              >
                <div style={googleButtonStateStyle}></div>
                <div style={googleButtonContentStyle}>
                  <div style={googleButtonIconStyle}>
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      style={{ display: "block" }}
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
                      <path fill="none" d="M0 0h48v48H0z" />
                    </svg>
                  </div>
                  <span style={googleButtonTextStyle}>Google 계정으로 가입</span>
                  <span style={{ display: "none" }}>Google 계정으로 가입</span>
                </div>
              </button>
            </div>

            <button
              type="button"
              style={socialButtonStyle}
              onClick={() => handleOAuthSignup("kakao")}
              disabled={loading}
            >
              Kakao로 시작하기
            </button>

            {errorMessage && <div className="message error">{errorMessage}</div>}
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSignup}>
            <div className="input-group">
              <label>이름</label>
              <input
                type="text"
                placeholder="이름을 입력하세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>

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
                placeholder="6글자 이상 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <div className="input-group">
              <label>비밀번호 확인</label>
              <input
                type="password"
                placeholder="비밀번호를 다시 입력"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            {errorMessage && <div className="message error">{errorMessage}</div>}
            {successMessage && (
              <div className="message success">{successMessage}</div>
            )}

            <button className="auth-button" type="submit" disabled={loading}>
              {loading ? "가입 중..." : "회원가입"}
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
          <span>이미 계정이 있나요?</span>
          <button
            type="button"
            className="text-button"
            onClick={() => onSwitchToLogin && onSwitchToLogin()}
          >
            로그인으로 이동
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;