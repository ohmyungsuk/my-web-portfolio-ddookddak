import { useEffect, useState } from "react";

function MyAssignedRequestsPage({ onGoHome, onClickRequest }) {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("loginUser");
    const loginUser = savedUser ? JSON.parse(savedUser) : null;

    if (!loginUser || !loginUser.id) {
      setMessage(
        "백엔드 사용자 연결이 아직 안 끝났습니다. 새로고침 후 다시 로그인해주세요."
      );
      setLoading(false);
      return;
    }

    fetch(
      `http://localhost:8080/requests/assigned?assignedUserId=${loginUser.id}`
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`서버 응답 오류: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setRequests(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("내가 맡은 작업 목록 불러오기 실패:", error);
        setMessage("내가 맡은 작업 목록을 불러오지 못했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: "800px" }}>
        <div className="auth-header">
          <p className="auth-badge">뚝딱</p>
          <h1>내가 맡은 작업</h1>
          <p className="auth-desc">내가 맡은 작업 목록입니다.</p>
        </div>

        <div className="auth-form">
          {loading && (
            <p style={{ textAlign: "center", color: "#6b7280" }}>
              불러오는 중...
            </p>
          )}

          {!loading && message && (
            <div className="message error">{message}</div>
          )}

          {!loading && !message && requests.length === 0 && (
            <p style={{ textAlign: "center", color: "#374151" }}>
              내가 맡은 작업이 없습니다.
            </p>
          )}

          {!loading && !message && requests.length > 0 && (
            <div className="request-list">
              {requests.map((request) => (
                <div
                  key={request.id}
                  onClick={() => onClickRequest(request)}
                  style={{
                    border: "1px solid #d1d5db",
                    borderRadius: "12px",
                    padding: "16px",
                    marginBottom: "12px",
                    cursor: "pointer",
                    background: "#ffffff",
                  }}
                >
                  <h3 style={{ marginBottom: "10px" }}>{request.title}</h3>
                  <p>카테고리: {request.category}</p>
                  <p>장소: {request.location}</p>
                  <p>내용: {request.content}</p>
                  <p>상태: {request.status}</p>
                </div>
              ))}
            </div>
          )}

          <button type="button" className="auth-button" onClick={onGoHome}>
            메인으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyAssignedRequestsPage;