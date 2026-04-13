import { useEffect, useState } from "react";

function MyRequestsPage({ onGoHome, onClickRequest }) {
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

    fetch(`http://localhost:8080/requests/my?userId=${loginUser.id}`)
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
        console.error("내 요청 목록 불러오기 실패:", error);
        setMessage("내 요청 목록을 불러오지 못했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getStatusStyle = (status) => {
    if (status === "요청 등록") {
      return { backgroundColor: "#e5e7eb", color: "#374151" };
    }
    if (status === "견적 협의중") {
      return { backgroundColor: "#ffedd5", color: "#c2410c" };
    }
    if (status === "작업 예정") {
      return { backgroundColor: "#dbeafe", color: "#1d4ed8" };
    }
    if (status === "진행중") {
      return { backgroundColor: "#dcfce7", color: "#15803d" };
    }
    if (status === "완료됨") {
      return { backgroundColor: "#bbf7d0", color: "#166534" };
    }

    return { backgroundColor: "#f3f4f6", color: "#111827" };
  };

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: "800px" }}>
        <div className="auth-header">
          <p className="auth-badge">뚝딱</p>
          <h1>내 요청 목록</h1>
          <p className="auth-desc">내가 등록한 요청 목록입니다.</p>
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
              등록한 요청이 없습니다.
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

                  <p style={{ marginTop: "8px" }}>
                    상태:{" "}
                    <span
                      style={{
                        ...getStatusStyle(request.status),
                        padding: "6px 12px",
                        borderRadius: "999px",
                        fontSize: "14px",
                        fontWeight: "700",
                        display: "inline-block",
                      }}
                    >
                      {request.status}
                    </span>
                  </p>

                  <p style={{ marginTop: "8px" }}>
                    담당자:{" "}
                    {request.assignedUsername
                      ? request.assignedUsername
                      : "아직 없음"}
                  </p>
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

export default MyRequestsPage;