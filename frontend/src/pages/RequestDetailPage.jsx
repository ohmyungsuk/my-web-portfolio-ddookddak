import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function RequestDetailPage() {
  const [searchParams] = useSearchParams();
  const [request, setRequest] = useState(null);

  const id = searchParams.get("id");

  useEffect(() => {
    fetch(`http://localhost:8080/requests/detail?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRequest(data);
      })
      .catch((error) => {
        console.error("요청 상세 불러오기 실패:", error);
      });
  }, [id]);

  if (!request) {
    return (
      <div className="request-detail-page">
        <div className="inner">
          <p>불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="request-detail-page">
      <div className="inner">
        <h2>요청 상세 보기</h2>

        <div className="request-detail-card">
          <h3>{request.title}</h3>
          <p>카테고리: {request.category}</p>
          <p>장소: {request.location}</p>
          <p>내용: {request.content}</p>
          <p>상태: {request.status}</p>
        </div>
      </div>
    </div>
  );
}

export default RequestDetailPage;