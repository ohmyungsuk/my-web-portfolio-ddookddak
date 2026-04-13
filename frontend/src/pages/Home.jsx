npfunction Home({
  onGoToCreate,
  onGoToMyRequests,
  onGoToAllRequests,
  onGoToAssignedRequests,
  onLogout,
}) {
  const savedUser = localStorage.getItem("loginUser");
  const loginUser = savedUser ? JSON.parse(savedUser) : null;

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-header">
          <h1 className="logo">뚝딱</h1>
          <p className="subtitle">요청 관리 시스템</p>
        </div>

        <div className="signup-form">
          <h2>메인 메뉴</h2>

          <p
            className="message"
            style={{ color: "#111827", textAlign: "center" }}
          >
            {loginUser
              ? `${loginUser.username}님, 환영합니다.`
              : "로그인 정보가 없습니다."}
          </p>

          <button
            type="button"
            className="signup-button"
            onClick={onGoToCreate}
          >
            요청 등록
          </button>

          <button
            type="button"
            className="signup-button"
            onClick={onGoToMyRequests}
          >
            내 요청 목록
          </button>

          <button
            type="button"
            className="signup-button"
            onClick={onGoToAllRequests}
          >
            전체 요청 목록
          </button>

          <button
            type="button"
            className="signup-button"
            onClick={onGoToAssignedRequests}
          >
            내가 맡은 작업
          </button>

          <button type="button" className="signup-button" onClick={onLogout}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
