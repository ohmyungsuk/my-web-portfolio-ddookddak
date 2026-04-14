import { useState } from "react";
import { supabase } from "../supabaseClient.js";

function Login({ onSwitchToSignup, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

      if (error) {
        throw error;
      }

      if (onLoginSuccess) {
        onLoginSuccess(data);
      } else {
        alert("로그인 성공");
      }
    } catch (error) {
      setErrorMessage(error.message || "로그인 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <p className="auth-badge">뚝딱</p>
          <h1>로그인</h1>
          <p className="auth-desc">
            등록한 이메일과 비밀번호로 접속하세요.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>이메일</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorMessage && <div className="message error">{errorMessage}</div>}

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

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