import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyRequestsPage() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("저장된 userId:", userId);

    fetch(`http://localhost:8080/requests/my?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("받아온 데이터:", data);
        setRequests(data);
      })
      .catch((error) => {
        console.error("내 요청 목록 불러오기 실패:", error);
      });
  }, []);

  return (
    <div className="my-requests-page">
      <div className="inner">
        <h2>내 요청 목록</h2>

        {requests.length === 0 ? (
          <p>등록한 요청이 없습니다.</p>
        ) : (
          <div className="request-list">
            {requests.map((request) => (
              <div
                className="request-card"
                key={request.id}
                onClick={() => navigate(`/request-detail?id=${request.id}`)}
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
      </div>
    </div>
  );
}

export default MyRequestsPage;