import { useEffect, useState } from "react";

function MyRequestsPage({ onGoHome, onClickRequest }) {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("loginUser");
    const loginUser = savedUser ? JSON.parse(savedUser) : null;

    if (!loginUser) {
      setMessage("로그인 정보가 없습니다.");
      return;
    }

    const userId = loginUser.id;

    fetch(`http://localhost:8080/requests/my?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setRequests(data);
      })
      .catch((error) => {
        console.error("내 요청 목록 불러오기 실패:", error);
        setMessage("내 요청 목록을 불러오지 못했습니다.");
      });
  }, []);

  return (
    <div className="signup-page">
      <div className="signup-card" style={{ maxWidth: "700px" }}>
        <div className="signup-header">
          <h1 className="logo">FixFlow</h1>
          <p className="subtitle">내가 등록한 요청 목록</p>
        </div>

        <div className="signup-form">
          <h2>내 요청 목록</h2>

          {message && <p className="message">{message}</p>}

          {requests.length === 0 ? (
            <p style={{ textAlign: "center" }}>등록한 요청이 없습니다.</p>
          ) : (
            <div className="request-list">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="request-card"
                  onClick={() => {
                    console.log("카드 클릭됨", request);
                    onClickRequest(request);
                  }}
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

          <button
            type="button"
            className="signup-button"
            onClick={onGoHome}
          >
            메인으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyRequestsPage;