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

      setMessage("요청 등록이 완료되었습니다.");
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
    <div className="page-shell">
      <div className="page-wrap">
        <div className="page-topbar">
          <div className="page-brand">
            <div className="page-brand-mark">ㄸ</div>
            <div className="page-brand-text">뚝딱</div>
          </div>

          <button type="button" className="page-back-btn" onClick={onGoHome}>
            메인으로 돌아가기
          </button>
        </div>

        <div className="page-grid">
          <div className="page-panel page-main">
            <div className="page-eyebrow">요청 등록</div>
            <h1 className="page-title">필요한 작업을 등록해보세요</h1>
            <p className="page-desc">
              문제 상황을 간단히 적어두면 요청이 바로 등록됩니다.
              <br />
              제목, 카테고리, 장소, 내용을 순서대로 입력하면 됩니다.
            </p>

            <form className="form-section" onSubmit={handleSubmit}>
              <div className="field-card">
                <div className="input-group">
                  <label>제목</label>
                  <input
                    type="text"
                    placeholder="예: 사무실 형광등 교체 요청"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>

              <div className="field-card">
                <div className="input-group">
                  <label>카테고리</label>
                  <input
                    type="text"
                    placeholder="예: 전기 / 설비 / 누수"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
              </div>

              <div className="field-card">
                <div className="input-group">
                  <label>장소</label>
                  <input
                    type="text"
                    placeholder="예: 서울 강남구 / 건물 3층 회의실"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="field-card">
                <div className="input-group">
                  <label>내용</label>
                  <textarea
                    placeholder="현재 어떤 문제가 있는지 자세히 적어주세요."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </div>

              {message && (
                <div
                  className={`message ${
                    message.includes("완료") ? "success" : "error"
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="action-row">
                <button type="submit" className="auth-button" disabled={isLoading}>
                  {isLoading ? "등록 중..." : "요청 등록하기"}
                </button>

                <button
                  type="button"
                  className="page-back-btn"
                  onClick={onGoHome}
                >
                  취소하고 돌아가기
                </button>
              </div>
            </form>
          </div>

          <div className="page-panel page-side">
            <div className="side-card">
              <h3 className="side-card-title">등록 안내</h3>
              <p className="side-card-value">3단계 입력</p>
              <p className="side-card-desc">
                제목, 위치, 내용만 정리해도 바로 요청을 시작할 수 있습니다.
              </p>
            </div>

            <div className="side-card">
              <h3 className="side-card-title">현재 상태</h3>
              <p className="side-card-value">요청 등록 전</p>
              <p className="side-card-desc">
                등록 후에는 내 요청 목록에서 상태를 바로 확인할 수 있습니다.
              </p>
            </div>

            <div className="side-card">
              <h3 className="side-card-title">작성 팁</h3>
              <p className="side-card-desc">
                어떤 문제가 생겼는지, 어느 위치인지, 얼마나 급한지 같이 적으면 더 좋아요.
              </p>
            </div>

            <div className="side-card">
              <h3 className="side-card-title">진행 흐름</h3>
              <p className="side-card-desc">
                요청 등록 → 작업자 확인 → 진행 → 완료 순서로 이어집니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestCreatePage;