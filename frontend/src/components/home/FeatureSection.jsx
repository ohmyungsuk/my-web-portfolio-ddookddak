function FeatureSection() {
  return (
    <section className="feature section">
      <div className="inner">
        <div className="section-title">
          <h3>주요 기능</h3>
          <p>현재 프로젝트에서 구현할 핵심 기능들입니다.</p>
        </div>

        <div className="feature-list">
          <div className="feature-item">
            <span>01</span>
            <div>
              <h4>회원가입 / 로그인</h4>
              <p>사용자 계정을 만들고 로그인할 수 있습니다.</p>
            </div>
          </div>

          <div className="feature-item">
            <span>02</span>
            <div>
              <h4>요청 등록</h4>
              <p>유지보수 요청 내용을 작성해 등록할 수 있습니다.</p>
            </div>
          </div>

          <div className="feature-item">
            <span>03</span>
            <div>
              <h4>내 요청 목록 확인</h4>
              <p>내가 등록한 요청들을 한 번에 확인할 수 있습니다.</p>
            </div>
          </div>

          <div className="feature-item">
            <span>04</span>
            <div>
              <h4>상태 변경 관리</h4>
              <p>관리자가 요청 상태를 변경하고 처리 흐름을 관리합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;