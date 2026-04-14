import { useState } from "react";
import { supabase } from "../supabaseClient.js";
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

    if (!title.trim() || !category.trim() || !location.trim() || !content.trim()) {
      setMessage("모든 칸을 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      setMessage("");

      const { error } = await supabase.from("requests").insert([
        {
          user_id: loginUser.id,
          title: title.trim(),
          category: category.trim(),
          location: location.trim(),
          content: content.trim(),
          status: "요청 등록",
          assigned_user_id: null,
        },
      ]);

      if (error) {
        throw error;
      }

      setMessage("요청 등록 성공!");
      setTitle("");
      setCategory("");
      setLocation("");
      setContent("");
    } catch (error) {
      console.error(error);
      setMessage(error.message || "요청 등록 중 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Signup-page">
      <div className="Signup-card">
        <div className="Signup-header">
          <h1 className="logo">뚝딱</h1>
          <p className="subtitle">요청 등록 페이지</p>
        </div>

        <form className="Signup-form" onSubmit={handleSubmit}>
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

          <button type="submit" className="Signup-button" disabled={isLoading}>
            {isLoading ? "등록 중..." : "요청 등록"}
          </button>

          <button type="button" className="Signup-button" onClick={onGoHome}>
            메인으로 돌아가기
          </button>

          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default RequestCreatePage;