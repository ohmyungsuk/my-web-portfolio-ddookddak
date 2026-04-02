import "../index.css";

function RequestDetailPage({ request, onGoBack, onGoHome }) {
  if (!request) {
    return (
      <div className="signup-page">
        <div className="signup-card">
          <div className="signup-header">
            <h1 className="logo">FixFlow</h1>
            <p className="subtitle">요청 상세보기</p>
          </div>

          <div className="signup-form">
            <h2>요청 상세보기</h2>
            <p className="message">선택된 요청이 없습니다.</p>

            <button
              type="button"
              className="signup-button"
              onClick={onGoBack}
            >
              뒤로가기
            </button>

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

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-header">
          <h1 className="logo">FixFlow</h1>
          <p className="subtitle">요청 상세보기 페이지</p>
        </div>

        <div className="signup-form">
          <h2>요청 상세보기</h2>

          <div className="input-group">
            <label>제목</label>
            <div className="input">{request.title}</div>
          </div>

          <div className="input-group">
            <label>카테고리</label>
            <div className="input">{request.category}</div>
          </div>

          <div className="input-group">
            <label>장소</label>
            <div className="input">{request.location}</div>
          </div>

          <div className="input-group">
            <label>내용</label>
            <div
              style={{
                minHeight: "120px",
                border: "1px solid #d1d5db",
                borderRadius: "10px",
                padding: "14px",
                fontSize: "15px",
                backgroundColor: "#f9fafb",
                whiteSpace: "pre-wrap",
              }}
            >
              {request.content}
            </div>
          </div>

          <div className="input-group">
            <label>상태</label>
            <div className="input">{request.status}</div>
          </div>

          <button
            type="button"
            className="signup-button"
            onClick={onGoBack}
          >
            뒤로가기
          </button>

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

export default RequestDetailPage;