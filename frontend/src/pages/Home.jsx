function Home({
  onGoToCreate,
  onGoToMyRequests,
  onGoToAllRequests,
  onGoToAssignedRequests,
  onLogout,
}) {
  const savedUser = localStorage.getItem("loginUser");
  const loginUser = savedUser ? JSON.parse(savedUser) : null;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <p className="auth-badge">뚝딱</p>
          <h1>메인 메뉴</h1>
          <p className="auth-desc">요청 관리 시스템</p>
        </div>

        <div className="auth-form">
          <p
            style={{
              color: "#111827",
              textAlign: "center",
              marginBottom: "8px",
              fontSize: "15px",
            }}
          >
            {loginUser ? "환영합니다." : "로그인 정보가 없습니다."}
          </p>

          <button
            type="button"
            className="auth-button"
            onClick={onGoToCreate}
          >
            요청 등록
          </button>

          <button
            type="button"
            className="auth-button"
            onClick={onGoToMyRequests}
          >
            내 요청 목록
          </button>

          <button
            type="button"
            className="auth-button"
            onClick={onGoToAllRequests}
          >
            전체 요청 목록
          </button>

          <button
            type="button"
            className="auth-button"
            onClick={onGoToAssignedRequests}
          >
            내가 맡은 작업
          </button>

          <button
            type="button"
            className="auth-button"
            onClick={onLogout}
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;