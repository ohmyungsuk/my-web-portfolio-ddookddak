import { useState } from "react";
import "../index.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      setMessage("");

      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data) {
        localStorage.setItem("loginUser", JSON.stringify(data));
        window.location.href = "/";
      } else {
        setMessage("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error(error);
      setMessage("서버 연결 오류");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-header">
          <h1 className="logo">뚝딱</h1>
          <p className="subtitle">깔끔한 요청 관리 시스템</p>
        </div>

        <form className="signup-form" onSubmit={handleLogin}>
          <h2>로그인</h2>

          <div className="input-group">
            <label>아이디</label>
            <input
              type="text"
              placeholder="아이디를 입력하세요"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          <button type="submit" className="signup-button" disabled={isLoading}>
            {isLoading ? "로그인 중..." : "로그인"}
          </button>

          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
