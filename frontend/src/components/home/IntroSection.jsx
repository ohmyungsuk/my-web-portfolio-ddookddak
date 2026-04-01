function IntroSection() {
  return (
    <section className="intro section">
      <div className="inner">
        <div className="section-title">
          <h3>FixFlow 소개</h3>
          <p>
            요청 등록부터 확인, 처리 상태 관리까지 한 곳에서 할 수 있게
            도와주는 서비스입니다.
          </p>
        </div>

        <div className="intro-grid">
          <div className="intro-card">
            <h4>간편한 요청 등록</h4>
            <p>문제 내용을 빠르게 작성하고 접수할 수 있습니다.</p>
          </div>

          <div className="intro-card">
            <h4>내 요청 확인</h4>
            <p>내가 등록한 요청 목록과 처리 상태를 쉽게 볼 수 있습니다.</p>
          </div>

          <div className="intro-card">
            <h4>관리자 처리</h4>
            <p>관리자는 요청 상태를 변경하고 접수 내용을 관리할 수 있습니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IntroSection;