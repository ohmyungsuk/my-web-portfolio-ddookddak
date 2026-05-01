import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/service-remo-hero.png";
import dashboardImage from "../assets/service-dashboard.png";

const PROCESS = [
  ["01", "접수", "사진과 증상을 남기면 필요한 정보가 한 번에 정리됩니다."],
  ["02", "확인", "담당자가 요청 내용을 확인하고 진행 가능 여부를 안내합니다."],
  ["03", "진행", "작업 상태와 추가 요청을 댓글로 이어가며 확인합니다."],
  ["04", "완료", "처리 결과와 이력을 남겨 다음 관리까지 이어집니다."],
];

const METRICS = [
  ["10", "유지보수 카테고리"],
  ["4", "진행 상태 흐름"],
  ["24h", "언제든 접수"],
];

const TECH_LAYERS = [
  ["SCAN", "문제 감지", "사진과 설명에서 핵심 증상을 빠르게 분류합니다."],
  ["MATCH", "담당 연결", "요청 유형과 상태에 맞춰 확인 흐름을 이어갑니다."],
  ["TRACK", "상태 추적", "접수부터 완료까지 모든 움직임을 놓치지 않습니다."],
];

const INTELLIGENCE = [
  ["전기/조명", "누전, 조명, 콘센트"],
  ["누수/방수", "천장, 욕실, 외벽"],
  ["에어컨/환기", "청소, 수리, 점검"],
  ["출입/보안", "도어락, CCTV, 네트워크"],
];

function ServiceIntroPage({ isLoggedIn }) {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  const progress = useMemo(() => {
    if (typeof window === "undefined") return 0;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) return 0;
    return Math.min(scrollY / max, 1);
  }, [scrollY]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const items = Array.from(document.querySelectorAll(".service-reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.16 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const goCreate = () => {
    navigate(isLoggedIn ? "/requests/new" : "/login");
  };

  return (
    <main className="service-page">
      <div className="service-progress" style={{ transform: `scaleX(${progress})` }} />

      <section className="service-hero">
        <div
          className="service-hero-bg"
          style={{ "--hero-shift": `${Math.min(scrollY * 0.06, 70)}px` }}
        />
        <div className="service-hero-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="service-brand-cloud" aria-hidden="true">
          {"DDOOKDDAK".split("").map((letter, index) => (
            <b key={`${letter}-${index}`}>{letter}</b>
          ))}
        </div>
        <div className="service-hero-content">
          <p className="service-kicker service-reveal">DDOOKDDAK MAINTENANCE CLOUD</p>
          <h1 className="service-reveal">
            공간의 불편을
            <br />
            감지하고, 접수하고,
            <br />
            끝까지 관리합니다.
          </h1>
          <p className="service-hero-copy service-reveal">
            뚝딱은 전기, 누수, 에어컨, 도어락, 청소 같은 생활 유지보수 요청을
            하나의 흐름으로 연결하는 서비스입니다. 집과 매장의 작은 문제를
            더 빠르고 선명하게 정리합니다.
          </p>
        </div>
        <div className="service-scroll" aria-hidden="true">
          <span>SCROLL</span>
          <i />
        </div>
      </section>

      <section className="service-intro">
        <div className="service-intro-copy service-reveal">
          <p className="service-kicker">SERVICE IDENTITY</p>
          <h2>
            흩어진 요청을
            <br />
            하나의 유지보수 경험으로.
          </h2>
        </div>
        <div className="service-intro-panel service-reveal">
          <p>
            뚝딱은 단순한 문의창이 아니라 생활 공간을 계속 돌보는 접수, 확인,
            진행, 완료의 관리 흐름입니다. 고객은 필요한 내용을 쉽게 남기고,
            담당자는 상태와 소통을 한곳에서 이어갑니다.
          </p>
          <div className="service-metrics">
            {METRICS.map(([value, label]) => (
              <strong key={label}>
                <span>{value}</span>
                {label}
              </strong>
            ))}
          </div>
        </div>
      </section>

      <section className="service-system">
        <div className="service-section-head service-reveal">
          <p className="service-kicker">SYSTEM FLOW</p>
          <h2>요청이 들어오면, 흐름은 자동으로 정리됩니다.</h2>
          <p>
            필요한 정보를 모으고, 담당 확인과 상태 변경을 이어가며,
            처리 이력까지 남기는 구조로 유지보수 과정을 정리합니다.
          </p>
        </div>
        <div className="service-process service-reveal">
          <div className="service-process-map" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="service-process-list">
            {PROCESS.map(([step, title, desc], index) => (
              <article key={step} style={{ transitionDelay: `${index * 80}ms` }}>
                <em>{step}</em>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-dashboard">
        <div className="service-dashboard-visual service-reveal">
          <img src={dashboardImage} alt="뚝딱 유지보수 관리 화면 이미지" />
        </div>
        <div className="service-dashboard-copy service-reveal">
          <p className="service-kicker">CONNECTED OPERATION</p>
          <h2>
            요청은 가볍게,
            <br />
            관리는 깊게.
          </h2>
          <p>
            사진, 증상, 위치, 댓글, 상태가 이어지면 작은 문제도 놓치지 않습니다.
            뚝딱은 반복되는 유지보수 업무를 보기 쉬운 흐름으로 바꾸고,
            고객과 담당자 사이의 확인 과정을 줄입니다.
          </p>
          <div className="service-signal-grid" aria-label="뚝딱 관리 신호">
            <span>접수 알림</span>
            <span>담당 확인</span>
            <span>댓글 소통</span>
            <span>완료 이력</span>
          </div>
        </div>
      </section>

      <section className="service-tech">
        <div className="service-section-head service-reveal">
          <p className="service-kicker">DDOOKDDAK INTELLIGENCE</p>
          <h2>요청을 읽고, 분류하고, 움직이게 만드는 기술.</h2>
          <p>
            뚝딱은 단순히 요청을 쌓아두지 않습니다. 문제 유형을 구조화하고,
            담당 확인과 상태 흐름을 연결해 유지보수 경험을 더 선명하게 만듭니다.
          </p>
        </div>

        <div className="service-tech-stage service-reveal">
          <div className="service-tech-core" aria-hidden="true">
            <i />
            <i />
            <i />
            <strong>DDOOKDDAK</strong>
          </div>
          <div className="service-tech-radar" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="service-tech-layers">
            {TECH_LAYERS.map(([code, title, desc], index) => (
              <article key={code} style={{ transitionDelay: `${index * 90}ms` }}>
                <span>{code}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-command">
        <div className="service-command-copy service-reveal">
          <p className="service-kicker">LIVE COMMAND BOARD</p>
          <h2>생활 유지보수를 실시간 보드처럼.</h2>
          <p>
            전기, 누수, 냉난방, 출입 보안까지 서로 다른 요청이 하나의 보드에서
            읽히고 정리됩니다. 고객의 불편은 빠르게 접수되고, 담당자는 필요한
            정보를 한눈에 확인합니다.
          </p>
        </div>
        <div className="service-command-board service-reveal">
          {INTELLIGENCE.map(([title, desc], index) => (
            <article key={title} style={{ transitionDelay: `${index * 70}ms` }}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{title}</strong>
              <p>{desc}</p>
              <i />
            </article>
          ))}
        </div>
      </section>

      <section className="service-final">
        <div className="service-final-inner service-reveal">
          <p className="service-kicker">START DDOOKDDAK</p>
          <h2>
            오늘 생긴 불편,
            <br />
            지금 뚝딱에 남겨보세요.
          </h2>
          <p>
            사진 한 장과 짧은 설명이면 충분합니다. 필요한 유지보수 요청을
            남기고 담당 확인부터 완료까지 한곳에서 확인하세요.
          </p>
          <button type="button" onClick={goCreate}>요청 등록하기</button>
        </div>
      </section>

      <style>{`
        .service-page {
          position: relative;
          min-height: 100vh;
          color: #f8fbff;
          background:
            radial-gradient(circle at 18% 8%, rgba(47, 128, 237, 0.28), transparent 30%),
            radial-gradient(circle at 86% 36%, rgba(125, 211, 252, 0.16), transparent 28%),
            radial-gradient(circle at 22% 72%, rgba(37, 99, 235, 0.16), transparent 34%),
            linear-gradient(180deg, #050914 0%, #07111f 42%, #081322 68%, #050914 100%);
          font-family: "Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          overflow-x: hidden;
        }

        .service-page::before {
          content: "";
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(125,211,252,0.045) 1px, transparent 1px),
            linear-gradient(180deg, rgba(125,211,252,0.04) 1px, transparent 1px);
          background-size: 88px 88px;
          mask-image: linear-gradient(180deg, transparent, #000 16%, #000 86%, transparent);
        }

        .service-page > * {
          position: relative;
          z-index: 1;
        }

        .service-progress {
          position: fixed;
          left: 0;
          top: 0;
          z-index: 120;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #39b8ff, #2f80ed, #9cc7ff);
          transform-origin: left center;
        }

        .service-hero {
          position: relative;
          min-height: 100svh;
          display: grid;
          place-items: center;
          overflow: hidden;
          isolation: isolate;
          padding: 140px 24px 150px;
          background: #050914;
        }

        .service-hero-bg {
          position: absolute;
          inset: -8%;
          z-index: -4;
          overflow: hidden;
          background-image: url(${heroImage});
          background-size: cover;
          background-position: center;
          transform: translateY(var(--hero-shift, 0px)) scale(1.08);
          filter: saturate(1.06) contrast(1.05);
          animation: heroFilm 18s ease-in-out infinite alternate;
        }

        .service-hero-bg::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -1px;
          height: 34%;
          background:
            linear-gradient(180deg, rgba(5,9,20,0) 0%, rgba(6,15,28,0.76) 58%, #07111f 100%);
        }

        .service-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -3;
          background:
            linear-gradient(90deg, rgba(5, 9, 20, 0.86), rgba(5, 9, 20, 0.36), rgba(5, 9, 20, 0.78)),
            linear-gradient(180deg, rgba(5, 9, 20, 0.16) 0%, rgba(5, 9, 20, 0.82) 70%, #07111f 100%);
        }

        .service-hero::after {
          content: "";
          position: absolute;
          inset: -20%;
          z-index: -2;
          background:
            linear-gradient(112deg, transparent 22%, rgba(255,255,255,0.28) 38%, transparent 52%),
            linear-gradient(68deg, transparent 34%, rgba(47,128,237,0.24) 48%, transparent 62%);
          opacity: 0.5;
          animation: lightSweep 12s ease-in-out infinite alternate;
          mix-blend-mode: screen;
        }

        .service-hero-orbit {
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
        }

        .service-hero-orbit span {
          position: absolute;
          border: 1px solid rgba(156, 199, 255, 0.26);
          border-radius: 999px;
          box-shadow: inset 0 0 60px rgba(47, 128, 237, 0.08);
          animation: orbitPulse 7s ease-in-out infinite;
        }

        .service-hero-orbit span:nth-child(1) {
          width: 560px;
          height: 560px;
          right: -160px;
          top: 18%;
        }

        .service-hero-orbit span:nth-child(2) {
          width: 360px;
          height: 360px;
          left: -120px;
          bottom: 5%;
          animation-delay: 1.2s;
        }

        .service-hero-orbit span:nth-child(3) {
          width: 220px;
          height: 220px;
          right: 22%;
          bottom: 16%;
          animation-delay: 2.2s;
        }

        .service-brand-cloud {
          position: absolute;
          left: 50%;
          top: 68px;
          z-index: 1;
          width: min(1240px, calc(100% - 48px));
          display: flex;
          justify-content: space-between;
          transform: translateX(-50%);
          opacity: 0.18;
          pointer-events: none;
        }

        .service-brand-cloud b {
          color: #ffffff;
          font-size: clamp(24px, 5vw, 92px);
          line-height: 1;
          font-weight: 950;
          letter-spacing: 0;
          animation: floatLetter 5.4s ease-in-out infinite;
        }

        .service-brand-cloud b:nth-child(2n) {
          animation-delay: 0.4s;
        }

        .service-brand-cloud b:nth-child(3n) {
          animation-delay: 0.8s;
        }

        .service-hero-content {
          width: min(1180px, 100%);
          margin: 0 auto;
          text-align: center;
        }

        .service-kicker {
          margin: 0 0 18px;
          color: #61b8ff;
          font-size: 13px;
          line-height: 1.2;
          font-weight: 950;
          letter-spacing: 0.08em;
        }

        .service-hero h1,
        .service-intro h2,
        .service-section-head h2,
        .service-dashboard h2,
        .service-command h2,
        .service-final h2 {
          margin: 0;
          font-weight: 950;
          letter-spacing: 0;
          word-break: keep-all;
        }

        .service-hero h1 {
          max-width: 1100px;
          margin: 0 auto;
          color: #ffffff;
          font-size: clamp(46px, 8vw, 112px);
          line-height: 1.04;
          text-shadow: 0 26px 70px rgba(0, 0, 0, 0.46);
        }

        .service-hero-copy {
          max-width: 820px;
          margin: 30px auto 0;
          color: rgba(255, 255, 255, 0.82);
          font-size: 18px;
          line-height: 1.9;
          font-weight: 750;
          word-break: keep-all;
        }

        .service-scroll {
          position: absolute;
          left: 50%;
          bottom: 34px;
          display: grid;
          justify-items: center;
          gap: 10px;
          transform: translateX(-50%);
          color: rgba(255,255,255,0.72);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.12em;
        }

        .service-scroll i {
          width: 1px;
          height: 58px;
          background: linear-gradient(180deg, #ffffff, transparent);
          transform-origin: top;
          animation: scrollLine 1.7s ease-in-out infinite;
        }

        .service-intro,
        .service-system,
        .service-dashboard,
        .service-tech,
        .service-command,
        .service-final-inner {
          width: min(1180px, calc(100% - 48px));
          margin: 0 auto;
        }

        .service-intro {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(320px, 0.78fr);
          gap: 54px;
          align-items: end;
          padding: 150px 0 96px;
          color: #ffffff;
        }

        .service-intro::before {
          content: "";
          position: absolute;
          left: 50%;
          top: -180px;
          z-index: -1;
          width: 100vw;
          height: 320px;
          transform: translateX(-50%);
          background:
            radial-gradient(ellipse at 50% 30%, rgba(47,128,237,0.18), transparent 58%),
            linear-gradient(180deg, rgba(7,17,31,0) 0%, #07111f 44%, rgba(7,17,31,0.94) 72%, rgba(7,17,31,0) 100%);
          pointer-events: none;
        }

        .service-intro h2,
        .service-section-head h2,
        .service-dashboard h2,
        .service-command h2,
        .service-final h2 {
          font-size: clamp(36px, 5.4vw, 74px);
          line-height: 1.08;
        }

        .service-intro-panel {
          border: 1px solid rgba(156, 199, 255, 0.2);
          background:
            linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04)),
            radial-gradient(circle at 20% 0%, rgba(47,128,237,0.28), transparent 34%);
          border-radius: 8px;
          padding: 32px;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(18px);
        }

        .service-intro-panel p,
        .service-section-head p,
        .service-dashboard-copy p,
        .service-final p {
          margin: 0;
          color: rgba(226, 239, 255, 0.76);
          font-size: 16px;
          line-height: 1.9;
          font-weight: 750;
          word-break: keep-all;
        }

        .service-metrics {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 28px;
        }

        .service-metrics strong {
          min-height: 100px;
          display: grid;
          align-content: center;
          border-radius: 8px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(156, 199, 255, 0.18);
          color: rgba(226, 239, 255, 0.72);
          font-size: 12px;
          font-weight: 900;
          text-align: center;
        }

        .service-metrics span {
          display: block;
          color: #ffffff;
          font-size: 36px;
          line-height: 1;
          font-weight: 950;
          margin-bottom: 8px;
        }

        .service-system {
          position: relative;
          color: #ffffff;
          padding: 120px 0;
        }

        .service-system::before {
          content: "";
          position: absolute;
          inset: 34px -80px;
          z-index: -1;
          border-radius: 8px;
          background:
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(180deg, rgba(255,255,255,0.05) 1px, transparent 1px),
            radial-gradient(circle at 12% 20%, rgba(47,128,237,0.34), transparent 30%),
            linear-gradient(135deg, #07111f, #0b1b32 55%, #06101f);
          background-size: 82px 82px, 82px 82px, auto, auto;
          box-shadow: 0 36px 110px rgba(15, 23, 42, 0.24);
        }

        .service-section-head {
          max-width: 820px;
          margin-bottom: 44px;
        }

        .service-system .service-section-head h2,
        .service-system .service-section-head p {
          color: #ffffff;
        }

        .service-process {
          display: grid;
          grid-template-columns: minmax(280px, 0.88fr) minmax(0, 1.12fr);
          gap: 22px;
          border: 1px solid rgba(156, 199, 255, 0.18);
          background:
            linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.035)),
            radial-gradient(circle at 24% 26%, rgba(47,128,237,0.24), transparent 34%);
          overflow: hidden;
          border-radius: 8px;
          padding: 22px;
          box-shadow: 0 26px 90px rgba(0, 0, 0, 0.22);
        }

        .service-process-map {
          position: relative;
          min-height: 420px;
          overflow: hidden;
          border-radius: 8px;
          background:
            linear-gradient(90deg, rgba(125,211,252,0.075) 1px, transparent 1px),
            linear-gradient(180deg, rgba(125,211,252,0.075) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(57,184,255,0.28), transparent 24%),
            rgba(5, 14, 27, 0.7);
          background-size: 48px 48px, 48px 48px, auto, auto;
        }

        .service-process-map::before,
        .service-process-map::after {
          content: "";
          position: absolute;
          border-radius: 999px;
          border: 1px solid rgba(125,211,252,0.24);
        }

        .service-process-map::before {
          width: 260px;
          height: 260px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 70px rgba(47,128,237,0.22), inset 0 0 44px rgba(47,128,237,0.12);
          animation: orbitRing 6.5s ease-in-out infinite;
        }

        .service-process-map::after {
          width: 150px;
          height: 150px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(47,128,237,0.28), transparent 62%);
        }

        .service-process-map span {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #7dd3fc;
          box-shadow: 0 0 26px #39b8ff;
          animation: nodePulse 2.6s ease-in-out infinite;
        }

        .service-process-map span:nth-child(1) {
          left: 28%;
          top: 32%;
        }

        .service-process-map span:nth-child(2) {
          right: 26%;
          top: 46%;
          animation-delay: 0.7s;
        }

        .service-process-map span:nth-child(3) {
          left: 42%;
          bottom: 25%;
          animation-delay: 1.4s;
        }

        .service-process-list {
          display: grid;
          gap: 10px;
        }

        .service-process-list article {
          position: relative;
          min-height: 94px;
          display: grid;
          grid-template-columns: 62px minmax(0, 1fr);
          gap: 18px;
          align-items: center;
          border-radius: 8px;
          border: 1px solid rgba(156, 199, 255, 0.16);
          background: rgba(255,255,255,0.055);
          padding: 18px;
          transition: transform 0.22s ease, background 0.22s ease, border-color 0.22s ease;
        }

        .service-process-list article:hover {
          transform: translateX(6px);
          border-color: rgba(125,211,252,0.36);
          background: rgba(47,128,237,0.12);
        }

        .service-process-list em {
          width: 52px;
          height: 52px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid rgba(125,211,252,0.28);
          background: rgba(57,184,255,0.1);
          color: #7dd3fc;
          font-size: 13px;
          font-style: normal;
          font-weight: 950;
        }

        .service-process-list h3 {
          margin: 0 0 6px;
          color: #eef6ff;
          font-size: 25px;
          line-height: 1.1;
          font-weight: 950;
          letter-spacing: 0;
        }

        .service-process-list p {
          margin: 0;
          color: rgba(226,239,255,0.7);
          font-size: 14px;
          line-height: 1.65;
          font-weight: 700;
          word-break: keep-all;
        }

        .service-dashboard {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
          gap: 48px;
          align-items: center;
          padding: 118px 0;
          color: #ffffff;
        }

        .service-dashboard-visual {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 36px 110px rgba(15, 23, 42, 0.22);
        }

        .service-dashboard-visual::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.28) 42%, transparent 56%),
            radial-gradient(circle at 70% 30%, rgba(47,128,237,0.24), transparent 28%);
          mix-blend-mode: screen;
          animation: glassSweep 7s ease-in-out infinite alternate;
        }

        .service-dashboard-visual img {
          display: block;
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
        }

        .service-dashboard-copy p {
          margin-top: 22px;
        }

        .service-signal-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          margin-top: 28px;
        }

        .service-signal-grid span {
          min-height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          border: 1px solid rgba(156, 199, 255, 0.2);
          background: rgba(255,255,255,0.08);
          color: #ffffff;
          font-size: 15px;
          font-weight: 950;
          box-shadow: 0 16px 36px rgba(15, 23, 42, 0.05);
        }

        .service-tech {
          padding: 118px 0;
          color: #ffffff;
        }

        .service-tech .service-section-head h2,
        .service-tech .service-section-head p {
          color: #ffffff;
        }

        .service-tech-stage {
          position: relative;
          min-height: 560px;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid rgba(156, 199, 255, 0.22);
          background:
            linear-gradient(90deg, rgba(125,211,252,0.08) 1px, transparent 1px),
            linear-gradient(180deg, rgba(125,211,252,0.08) 1px, transparent 1px),
            radial-gradient(circle at 50% 48%, rgba(47,128,237,0.32), transparent 28%),
            radial-gradient(circle at 20% 20%, rgba(125,211,252,0.18), transparent 26%),
            linear-gradient(135deg, #050914, #081a31 52%, #050914);
          background-size: 72px 72px, 72px 72px, auto, auto, auto;
          box-shadow: 0 40px 110px rgba(15, 23, 42, 0.26);
          isolation: isolate;
        }

        .service-tech-stage::before {
          content: "";
          position: absolute;
          inset: -30%;
          background: conic-gradient(from 0deg, transparent, rgba(57,184,255,0.26), transparent 34%);
          animation: techSweep 9s linear infinite;
          opacity: 0.9;
          mix-blend-mode: screen;
        }

        .service-tech-stage::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.14) 42%, transparent 56%),
            radial-gradient(circle at 50% 48%, transparent 0 150px, rgba(5,9,20,0.2) 151px 100%);
          animation: commandGlare 5.8s ease-in-out infinite alternate;
          pointer-events: none;
        }

        .service-tech-core {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 2;
          width: 230px;
          height: 230px;
          display: grid;
          place-items: center;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 1px solid rgba(156, 199, 255, 0.34);
          background: radial-gradient(circle, rgba(47,128,237,0.34), rgba(5,9,20,0.86) 68%);
          box-shadow: 0 0 80px rgba(47,128,237,0.36), inset 0 0 54px rgba(125,211,252,0.12);
        }

        .service-tech-core i {
          position: absolute;
          inset: -34px;
          border-radius: 50%;
          border: 1px solid rgba(125,211,252,0.2);
          animation: orbitRing 6s ease-in-out infinite;
        }

        .service-tech-core i:nth-child(2) {
          inset: -72px;
          animation-delay: 0.7s;
        }

        .service-tech-core i:nth-child(3) {
          inset: -112px;
          animation-delay: 1.4s;
        }

        .service-tech-core strong {
          color: #ffffff;
          font-size: 16px;
          font-weight: 950;
          letter-spacing: 0.08em;
        }

        .service-tech-radar span {
          position: absolute;
          z-index: 1;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #7dd3fc;
          box-shadow: 0 0 24px #39b8ff;
          animation: nodePulse 2.8s ease-in-out infinite;
        }

        .service-tech-radar span:nth-child(1) {
          left: 18%;
          top: 28%;
        }

        .service-tech-radar span:nth-child(2) {
          right: 22%;
          top: 22%;
          animation-delay: 0.6s;
        }

        .service-tech-radar span:nth-child(3) {
          left: 24%;
          bottom: 22%;
          animation-delay: 1.2s;
        }

        .service-tech-radar span:nth-child(4) {
          right: 16%;
          bottom: 30%;
          animation-delay: 1.8s;
        }

        .service-tech-layers {
          position: absolute;
          inset: 30px;
          z-index: 3;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          align-items: end;
          gap: 12px;
        }

        .service-tech-layers article {
          min-height: 190px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.14);
          background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04));
          backdrop-filter: blur(14px);
          padding: 22px;
          box-shadow: 0 24px 70px rgba(0,0,0,0.18);
        }

        .service-tech-layers span {
          color: #7dd3fc;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 0.12em;
        }

        .service-tech-layers h3 {
          margin: 54px 0 10px;
          color: #ffffff;
          font-size: 30px;
          line-height: 1.1;
          font-weight: 950;
          letter-spacing: 0;
        }

        .service-tech-layers p {
          margin: 0;
          color: rgba(255,255,255,0.72);
          font-size: 14px;
          line-height: 1.7;
          font-weight: 750;
          word-break: keep-all;
        }

        .service-command {
          display: grid;
          grid-template-columns: minmax(0, 0.86fr) minmax(0, 1.14fr);
          gap: 44px;
          align-items: center;
          padding: 112px 0;
          color: #ffffff;
        }

        .service-command-copy p {
          margin: 22px 0 0;
          color: rgba(226, 239, 255, 0.76);
          font-size: 16px;
          line-height: 1.9;
          font-weight: 750;
          word-break: keep-all;
        }

        .service-command-board {
          position: relative;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          padding: 18px;
          border-radius: 8px;
          border: 1px solid rgba(156, 199, 255, 0.2);
          background:
            linear-gradient(90deg, rgba(125,211,252,0.08) 1px, transparent 1px),
            linear-gradient(180deg, rgba(125,211,252,0.08) 1px, transparent 1px),
            rgba(255,255,255,0.06);
          background-size: 46px 46px;
          box-shadow: 0 34px 90px rgba(0, 0, 0, 0.2);
          overflow: hidden;
        }

        .service-command-board::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: -30%;
          height: 42%;
          background: linear-gradient(180deg, transparent, rgba(57,184,255,0.18), transparent);
          animation: verticalScan 4.6s ease-in-out infinite;
          pointer-events: none;
        }

        .service-command-board article {
          position: relative;
          min-height: 188px;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid rgba(156, 199, 255, 0.2);
          background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05));
          padding: 22px;
          display: grid;
          align-content: space-between;
        }

        .service-command-board article i {
          position: absolute;
          right: 18px;
          top: 18px;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid rgba(47,128,237,0.26);
          background: radial-gradient(circle, rgba(47,128,237,0.2), transparent 64%);
          animation: nodePulse 2.6s ease-in-out infinite;
        }

        .service-command-board span {
          color: #2f80ed;
          font-size: 12px;
          font-weight: 950;
        }

        .service-command-board strong {
          color: #ffffff;
          font-size: 28px;
          line-height: 1.12;
          font-weight: 950;
          letter-spacing: 0;
        }

        .service-command-board p {
          margin: 0;
          color: rgba(226, 239, 255, 0.72);
          font-size: 13px;
          line-height: 1.65;
          font-weight: 750;
        }

        .service-range {
          padding: 118px 0 70px;
          color: #0f172a;
        }

        .service-category-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 12px;
        }

        .service-category-card {
          position: relative;
          min-height: 198px;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid #d9e4f2;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.92), rgba(248,251,255,0.9)),
            radial-gradient(circle at 80% 8%, rgba(47,128,237,0.13), transparent 32%);
          padding: 18px;
          display: grid;
          align-content: space-between;
          box-shadow: 0 18px 42px rgba(15, 23, 42, 0.05);
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .service-category-card::after {
          content: "";
          position: absolute;
          right: -34px;
          top: -34px;
          width: 96px;
          height: 96px;
          border-radius: 50%;
          background: rgba(47,128,237,0.1);
        }

        .service-category-card:hover {
          transform: translateY(-6px);
          border-color: #9cc7ff;
          box-shadow: 0 26px 64px rgba(47, 128, 237, 0.14);
        }

        .service-category-card span {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: #eff6ff;
        }

        .service-category-card img {
          width: 28px;
          height: 28px;
          object-fit: contain;
        }

        .service-category-card strong {
          color: #0f172a;
          font-size: 17px;
          line-height: 1.35;
          font-weight: 950;
          word-break: keep-all;
        }

        .service-category-card em {
          margin-top: 8px;
          color: #64748b;
          font-size: 12px;
          line-height: 1.55;
          font-style: normal;
          font-weight: 750;
          word-break: keep-all;
        }

        .service-spaces {
          padding: 90px 0 120px;
          color: #0f172a;
        }

        .service-space-track {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .service-space-card {
          position: relative;
          min-height: 360px;
          overflow: hidden;
          border-radius: 8px;
          padding: 28px;
          display: grid;
          align-content: end;
          background:
            linear-gradient(180deg, rgba(5,9,20,0.04), rgba(5,9,20,0.88)),
            url(${heroImage});
          background-size: cover;
          background-position: center;
          box-shadow: 0 28px 70px rgba(15,23,42,0.16);
          transition: transform 0.24s ease, filter 0.24s ease;
        }

        .service-space-card:nth-child(2) {
          background-position: 64% center;
        }

        .service-space-card:nth-child(3) {
          background-position: 86% center;
        }

        .service-space-card:hover {
          transform: translateY(-8px);
          filter: saturate(1.08);
        }

        .service-space-card span {
          position: absolute;
          left: 24px;
          top: 24px;
          color: #9cc7ff;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 0.08em;
        }

        .service-space-card h3 {
          margin: 0 0 10px;
          color: #ffffff;
          font-size: 38px;
          line-height: 1.1;
          font-weight: 950;
          letter-spacing: 0;
        }

        .service-space-card p {
          margin: 0;
          max-width: 300px;
          color: rgba(255,255,255,0.78);
          font-size: 14px;
          line-height: 1.7;
          font-weight: 750;
          word-break: keep-all;
        }

        .service-final {
          padding: 0 0 120px;
          color: #ffffff;
          background: transparent;
        }

        .service-final-inner {
          min-height: 500px;
          display: grid;
          align-content: center;
          border-radius: 8px;
          padding: 54px;
          background:
            linear-gradient(90deg, rgba(5,9,20,0.94), rgba(5,9,20,0.7)),
            radial-gradient(circle at 82% 20%, rgba(47,128,237,0.36), transparent 32%),
            url(${dashboardImage});
          background-size: cover;
          background-position: center;
          box-shadow: 0 40px 110px rgba(15, 23, 42, 0.2);
        }

        .service-final p {
          max-width: 640px;
          margin-top: 22px;
          color: rgba(255,255,255,0.8);
        }

        .service-final button {
          width: fit-content;
          min-height: 54px;
          margin-top: 34px;
          border: none;
          border-radius: 8px;
          background: #ffffff;
          color: #0f172a;
          padding: 0 26px;
          font-size: 15px;
          font-weight: 950;
          cursor: pointer;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
          transition: transform 0.18s ease, background 0.18s ease;
        }

        .service-final button:hover {
          transform: translateY(-3px);
          background: #eaf3ff;
        }

        .service-reveal {
          opacity: 0;
          transform: translate3d(0, 54px, 0) scale(0.97);
          filter: blur(10px);
          transition:
            opacity 0.9s ease,
            transform 0.9s cubic-bezier(0.19, 1, 0.22, 1),
            filter 0.9s ease;
          will-change: opacity, transform, filter;
        }

        .service-intro-copy.service-reveal,
        .service-dashboard-visual.service-reveal,
        .service-command-copy.service-reveal {
          transform: translate3d(-72px, 36px, 0) scale(0.96);
        }

        .service-intro-panel.service-reveal,
        .service-dashboard-copy.service-reveal,
        .service-command-board.service-reveal {
          transform: translate3d(72px, 36px, 0) scale(0.96);
        }

        .service-section-head.service-reveal {
          transform: translate3d(0, 64px, 0) scale(0.96);
        }

        .service-process article.service-reveal {
          transform: translate3d(0, 72px, 0) rotateX(8deg) scale(0.95);
          transform-origin: center bottom;
        }

        .service-reveal.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0) rotateX(0) scale(1);
          filter: blur(0);
        }

        .service-process article.service-reveal.is-visible {
          animation: processGlow 1.1s ease both;
        }

        .service-tech-stage.is-visible .service-tech-layers article {
          animation: panelPop 0.8s cubic-bezier(0.19, 1, 0.22, 1) both;
        }

        .service-tech-stage.is-visible .service-tech-layers article:nth-child(2) {
          animation-delay: 0.12s;
        }

        .service-tech-stage.is-visible .service-tech-layers article:nth-child(3) {
          animation-delay: 0.24s;
        }

        .service-command-board.is-visible article {
          animation: boardRise 0.82s cubic-bezier(0.19, 1, 0.22, 1) both;
        }

        .service-command-board.is-visible article:nth-child(2) {
          animation-delay: 0.08s;
        }

        .service-command-board.is-visible article:nth-child(3) {
          animation-delay: 0.16s;
        }

        .service-command-board.is-visible article:nth-child(4) {
          animation-delay: 0.24s;
        }

        @keyframes heroFilm {
          0% {
            background-position: 44% 50%;
            filter: saturate(1.02) contrast(1.02) brightness(0.96);
          }
          100% {
            background-position: 56% 48%;
            filter: saturate(1.12) contrast(1.08) brightness(1.04);
          }
        }

        @keyframes lightSweep {
          0% {
            transform: translateX(-16%) rotate(-2deg);
            opacity: 0.22;
          }
          100% {
            transform: translateX(16%) rotate(1deg);
            opacity: 0.58;
          }
        }

        @keyframes orbitPulse {
          0%, 100% {
            transform: scale(0.98);
            opacity: 0.34;
          }
          50% {
            transform: scale(1.04);
            opacity: 0.76;
          }
        }

        @keyframes floatLetter {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }

        @keyframes scrollLine {
          0%, 100% {
            transform: scaleY(0.2);
            opacity: 0.35;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        @keyframes glassSweep {
          0% {
            transform: translateX(-28%);
            opacity: 0.18;
          }
          100% {
            transform: translateX(28%);
            opacity: 0.52;
          }
        }

        @keyframes techSweep {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes orbitRing {
          0%, 100% {
            transform: scale(0.96);
            opacity: 0.28;
          }
          50% {
            transform: scale(1.04);
            opacity: 0.78;
          }
        }

        @keyframes nodePulse {
          0%, 100% {
            transform: scale(0.82);
            opacity: 0.48;
          }
          50% {
            transform: scale(1.18);
            opacity: 1;
          }
        }

        @keyframes commandGlare {
          0% {
            transform: translateX(-18%);
            opacity: 0.28;
          }
          100% {
            transform: translateX(18%);
            opacity: 0.58;
          }
        }

        @keyframes verticalScan {
          0%, 100% {
            transform: translateY(-20%);
            opacity: 0;
          }
          45%, 65% {
            opacity: 1;
          }
          100% {
            transform: translateY(340%);
          }
        }

        @keyframes processGlow {
          0% {
            box-shadow: inset 0 0 0 rgba(125,211,252,0), 0 0 0 rgba(47,128,237,0);
          }
          46% {
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.22), 0 0 42px rgba(47,128,237,0.22);
          }
          100% {
            box-shadow: inset 0 0 0 rgba(125,211,252,0), 0 0 0 rgba(47,128,237,0);
          }
        }

        @keyframes panelPop {
          0% {
            opacity: 0;
            transform: translateY(44px) scale(0.94);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes boardRise {
          0% {
            opacity: 0;
            transform: translateY(34px) scale(0.96);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .service-reveal {
            opacity: 1;
            transform: none;
            filter: none;
            transition: none;
          }

          .service-hero-bg,
          .service-hero::after,
          .service-hero-orbit span,
          .service-brand-cloud b,
          .service-scroll i,
          .service-dashboard-visual::after {
            animation: none;
          }
        }

        @media (max-width: 980px) {
          .service-hero {
            min-height: 92svh;
            padding: 128px 18px 86px;
          }

          .service-intro,
          .service-dashboard {
            grid-template-columns: 1fr;
          }

          .service-command {
            grid-template-columns: 1fr;
          }

          .service-process,
          .service-category-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .service-tech-layers {
            grid-template-columns: 1fr;
            align-items: stretch;
          }

          .service-tech-layers article {
            min-height: auto;
          }

          .service-tech-layers h3 {
            margin-top: 26px;
          }

          .service-space-track {
            display: flex;
            overflow-x: auto;
            padding-bottom: 16px;
            scroll-snap-type: x mandatory;
          }

          .service-space-card {
            flex: 0 0 74%;
            scroll-snap-align: start;
          }
        }

        @media (max-width: 640px) {
          .service-hero {
            min-height: auto;
            padding: 112px 16px 80px;
          }

          .service-brand-cloud {
            top: 84px;
            opacity: 0.12;
          }

          .service-hero h1 {
            font-size: 42px;
          }

          .service-hero-copy {
            font-size: 15px;
          }

          .service-intro,
          .service-system,
          .service-dashboard,
          .service-tech,
          .service-command,
          .service-final-inner {
            width: min(100% - 32px, 1180px);
          }

          .service-intro,
          .service-system,
          .service-dashboard,
          .service-tech,
          .service-command {
            padding: 72px 0;
          }

          .service-intro h2,
          .service-section-head h2,
          .service-dashboard h2,
          .service-command h2,
          .service-final h2 {
            font-size: 34px;
          }

          .service-metrics,
          .service-process,
          .service-category-grid,
          .service-signal-grid,
          .service-command-board {
            grid-template-columns: 1fr;
          }

          .service-tech-stage {
            min-height: 720px;
          }

          .service-tech-core {
            width: 170px;
            height: 170px;
          }

          .service-process article {
            min-height: 230px;
          }

          .service-category-card {
            min-height: 170px;
          }

          .service-space-card {
            flex-basis: 86%;
            min-height: 330px;
          }

          .service-final {
            padding-bottom: 72px;
          }

          .service-final-inner {
            min-height: 440px;
            padding: 32px 22px;
          }

          .service-final button {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}

export default ServiceIntroPage;
