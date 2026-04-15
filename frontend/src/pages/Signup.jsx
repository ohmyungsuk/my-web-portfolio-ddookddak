import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient.js";

function Signup({ onSwitchToLogin }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        throw error;
      }

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

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div style={brandStyle} onClick={() => navigate("/")}>
            <div style={brandMarkStyle}>ㄸ</div>
            <div style={brandTextStyle}>뚝딱</div>
          </div>

          <h1>회원가입</h1>
          <p className="auth-desc">
            새 계정을 만들고 유지보수 요청 서비스를 시작하세요.
          </p>
        </div>

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
        </form>

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