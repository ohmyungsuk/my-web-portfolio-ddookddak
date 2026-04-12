function HeroSection() {
  return (
    <section className="hero">
      <div className="inner hero-inner">
        <div className="hero-text">
          <p className="hero-badge">회원제 유지보수 요청 플랫폼</p>
          <h2>
            쉽고 빠르게
            <br />
            유지보수 요청을 접수하는 서비스
          </h2>
          <p className="hero-desc">
            뚝딱는 시설, 장비, 환경 관련 문제를 간편하게 등록하고 관리할 수 있는
            유지보수 요청 플랫폼입니다.
          </p>

          <div className="hero-buttons">
            <button type="button" className="primary-btn">
              요청 등록하기
            </button>
            <button type="button" className="secondary-btn">
              서비스 보기
            </button>
          </div>
        </div>

        <div className="hero-card">
          <div className="status-box">
            <p>오늘 접수</p>
            <strong>12건</strong>
          </div>
          <div className="status-box">
            <p>처리 진행</p>
            <strong>5건</strong>
          </div>
          <div className="status-box">
            <p>완료</p>
            <strong>21건</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
