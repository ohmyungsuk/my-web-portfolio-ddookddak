import { useState } from "react";
import "../index.css";

function Signup({ onGoLogin }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !userId ||
      !password ||
      !passwordCheck ||
      !name ||
      !nickname ||
      !email ||
      !phoneNumber
    ) {
      setMessage("모든 칸을 입력해주세요.");
      return;
    }

    if (password !== passwordCheck) {
      setMessage("비밀번호가 서로 다릅니다.");
      return;
    }

    try {
      setIsLoading(true);
      setMessage("");

      const response = await fetch("http://localhost:8080/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userId,
          password: password,
          name: name,
          nickname: nickname,
          email: email,
          phoneNumber: phoneNumber,
        }),
      });

      const data = await response.text();

      if (response.ok) {
        setMessage("회원가입 성공!");
        setUserId("");
        setPassword("");
        setPasswordCheck("");
        setName("");
        setNickname("");
        setEmail("");
        setPhoneNumber("");
      } else {
        setMessage("회원가입 실패: " + data);
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
          <p className="subtitle"></p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>회원가입</h2>

          <div className="input-group">
            <label>아이디</label>
            <input
              type="text"
              placeholder="아이디를 입력하세요"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
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

          <div className="input-group">
            <label>비밀번호 확인</label>
            <input
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>이름</label>
            <input
              type="text"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>닉네임</label>
            <input
              type="text"
              placeholder="닉네임을 입력하세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>이메일</label>
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>휴대폰번호</label>
            <input
              type="text"
              placeholder="휴대폰번호를 입력하세요"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <button type="submit" className="signup-button" disabled={isLoading}>
            {isLoading ? "가입 중..." : "가입하기"}
          </button>

          {message && <p className="message">{message}</p>}

          <button type="button" className="signup-button" onClick={onGoLogin}>
            로그인으로 가기
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
