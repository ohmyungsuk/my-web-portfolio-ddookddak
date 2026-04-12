import { useState } from "react";
import "../index.css";

function RequestCreatePage({ onGoHome }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const savedUser = localStorage.getItem("loginUser");
  const loginUser = savedUser ? JSON.parse(savedUser) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginUser) {
      setMessage("로그인 정보가 없습니다.");
      return;
    }

    if (!title || !category || !location || !content) {
      setMessage("모든 칸을 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      setMessage("");

      const response = await fetch("http://localhost:8080/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: loginUser.id,
          title: title,
          category: category,
          location: location,
          content: content,
          status: "요청 등록",
          assignedUserId: null,
        }),
      });

      const data = await response.text();

      if (response.ok) {
        setMessage("요청 등록 성공!");
        setTitle("");
        setCategory("");
        setLocation("");
        setContent("");
      } else {
        setMessage("요청 등록 실패: " + data);
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
          <p className="subtitle">요청 등록 페이지</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>요청 등록</h2>

          <div className="input-group">
            <label>제목</label>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>카테고리</label>
            <input
              type="text"
              placeholder="카테고리를 입력하세요"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>장소</label>
            <input
              type="text"
              placeholder="장소를 입력하세요"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>내용</label>
            <textarea
              placeholder="요청 내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                minHeight: "120px",
                border: "1px solid #d1d5db",
                borderRadius: "10px",
                padding: "14px",
                fontSize: "15px",
                outline: "none",
                resize: "none",
              }}
            />
          </div>

          <button type="submit" className="signup-button" disabled={isLoading}>
            {isLoading ? "등록 중..." : "요청 등록"}
          </button>

          <button type="button" className="signup-button" onClick={onGoHome}>
            메인으로 돌아가기
          </button>

          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default RequestCreatePage;
