import { useEffect, useState } from "react";

function MyAssignedRequestsPage({ onGoHome, onClickRequest }) {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

  const savedUser = localStorage.getItem("loginUser");
  const loginUser = savedUser ? JSON.parse(savedUser) : null;

  useEffect(() => {
    if (!loginUser) {
      return;
    }

    fetch(
      `http://localhost:8080/requests/assigned?assignedUserId=${loginUser.id}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setRequests(data);
      })
      .catch((error) => {
        console.error("내가 맡은 작업 목록 불러오기 실패:", error);
        setMessage("내가 맡은 작업 목록을 불러오지 못했습니다.");
      });
  }, [loginUser]);

  if (!loginUser) {
    return (
      <div className="signup-page">
        <div className="signup-card" style={{ maxWidth: "800px" }}>
          <div className="signup-header">
            <h1 className="logo">뚝딱</h1>
            <p className="subtitle">내가 맡은 작업 목록</p>
          </div>

          <div className="signup-form">
            <h2>내가 맡은 작업</h2>
            <p className="message">로그인 정보가 없습니다.</p>

            <button type="button" className="signup-button" onClick={onGoHome}>
              메인으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-page">
      <div className="signup-card" style={{ maxWidth: "800px" }}>
        <div className="signup-header">
          <h1 className="logo">뚝딱</h1>
          <p className="subtitle">내가 맡은 작업 목록</p>
        </div>

        <div className="signup-form">
          <h2>내가 맡은 작업</h2>

          {message && <p className="message">{message}</p>}

          {requests.length === 0 ? (
            <p style={{ textAlign: "center" }}>내가 맡은 작업이 없습니다.</p>
          ) : (
            <div className="request-list">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="request-card"
                  onClick={() => onClickRequest(request)}
                  style={{
                    border: "1px solid #d1d5db",
                    borderRadius: "12px",
                    padding: "16px",
                    marginBottom: "12px",
                    cursor: "pointer",
                  }}
                >
                  <h3>{request.title}</h3>
                  <p>카테고리: {request.category}</p>
                  <p>장소: {request.location}</p>
                  <p>내용: {request.content}</p>
                  <p>상태: {request.status}</p>
                </div>
              ))}
            </div>
          )}

          <button type="button" className="signup-button" onClick={onGoHome}>
            메인으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyAssignedRequestsPage;
