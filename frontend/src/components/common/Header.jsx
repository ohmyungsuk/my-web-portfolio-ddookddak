import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ isLoggedIn, loginUser, onGoHome, onGoLogin, onGoSignup, onGoCreate, onGoMyPage, onGoMyRequests, onGoAllRequests, onGoAssignedRequests, onLogout }) {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hoveredTextButton, setHoveredTextButton] = useState("");
  const [hoveredPrimaryButton, setHoveredPrimaryButton] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const isMobile = windowWidth <= 768;

  const BRAND_COLOR = "#2F80ED";
  const TEXT_DARK = "#0F172A";
  const TEXT_BODY = "#2F3438";
  const CARD_BORDER = "#E5EDF6";

  const displayName = loginUser?.username || loginUser?.name || loginUser?.email || "사용자";

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleOutsideClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const moveToSection = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const closeAndRun = (action) => {
    setProfileOpen(false);
    if (action) action();
  };

  const topMenuButton = {
    background: "none",
    border: "none",
    padding: "0",
    fontSize: "14px",
    fontWeight: "600",
    color: TEXT_BODY,
    cursor: "pointer",
    whiteSpace: "nowrap",
    letterSpacing: "-0.2px",
    outline: "none",
    WebkitTapHighlightColor: "transparent",
    fontFamily: '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const primaryButton = {
    border: "none",
    background: BRAND_COLOR,
    color: "#ffffff",
    borderRadius: "12px",
    padding: isMobile ? "10px 14px" : "0 18px",
    height: isMobile ? "40px" : "38px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    whiteSpace: "nowrap",
    outline: "none",
    appearance: "none",
    WebkitAppearance: "none",
    boxShadow: "0 8px 20px rgba(47, 128, 237, 0.16)",
    transition: "background-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease",
    fontFamily: '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  function DropdownButton({ children, onClick, danger = false }) {
    return (
      <button
        type="button"
        onClick={onClick}
        onMouseDown={(e) => e.currentTarget.blur()}
        style={{
          width: "100%",
          background: danger ? "#fee2e2" : "transparent",
          color: danger ? "#dc2626" : TEXT_BODY,
          border: "none",
          padding: "10px 12px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
          textAlign: "left",
          transition: "background-color 0.12s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = danger ? "#fecaca" : "#f8fafc";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = danger ? "#fee2e2" : "transparent";
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <header
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        zIndex: 50,
        backgroundColor: "#ffffff",
        borderBottom: `1px solid ${CARD_BORDER}`,
        fontFamily: '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: isMobile ? "0 20px" : "0 64px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            height: isMobile ? "60px" : "78px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "16px" : "40px",
              minWidth: 0,
              flex: 1,
            }}
          >
            <Link to="/" style={{ border: "none", outline: "none", background: "none", padding: 0, display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", textDecoration: "none" }}>
              <div
                style={{
                  width: isMobile ? "36px" : "42px",
                  height: isMobile ? "36px" : "42px",
                  borderRadius: "14px",
                  background: BRAND_COLOR,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontWeight: "800",
                  fontSize: "14px",
                  boxShadow: "0 10px 24px rgba(47, 128, 237, 0.18)",
                }}
              >
                ㄸ
              </div>

              <span
                style={{
                  fontSize: isMobile ? "22px" : "23px",
                  fontWeight: "800",
                  color: BRAND_COLOR,
                  letterSpacing: "-0.5px",
                  whiteSpace: "nowrap",
                }}
              >
                뚝딱
              </span>
            </Link>

            {!isMobile && (
              <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                {[
                  { key: "home", text: "홈", onClick: goTop },
                  { key: "intro", text: "서비스 소개", onClick: () => moveToSection("service-intro") },
                  { key: "community", text: "커뮤니티", onClick: () => moveToSection("community-preview") },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={item.onClick}
                    onMouseEnter={() => setHoveredTextButton(item.key)}
                    onMouseLeave={() => setHoveredTextButton("")}
                    onMouseDown={(e) => e.currentTarget.blur()}
                    style={{
                      ...topMenuButton,
                      color: hoveredTextButton === item.key ? BRAND_COLOR : TEXT_BODY,
                    }}
                  >
                    {item.text}
                  </button>
                ))}
              </nav>
            )}
          </div>

          {!isMobile && !isLoggedIn && (
            <div style={{ display: "flex", alignItems: "center", gap: "22px", flexShrink: 0, paddingLeft: "16px" }}>
              <button
                type="button"
                onClick={onGoLogin}
                onMouseEnter={() => setHoveredTextButton("login")}
                onMouseLeave={() => setHoveredTextButton("")}
                onMouseDown={(e) => e.currentTarget.blur()}
                style={{ ...topMenuButton, fontWeight: "500", color: hoveredTextButton === "login" ? BRAND_COLOR : TEXT_BODY }}
              >
                로그인
              </button>

              <button
                type="button"
                onClick={onGoSignup}
                onMouseEnter={() => setHoveredTextButton("signup")}
                onMouseLeave={() => setHoveredTextButton("")}
                onMouseDown={(e) => e.currentTarget.blur()}
                style={{ ...topMenuButton, fontWeight: "500", color: hoveredTextButton === "signup" ? BRAND_COLOR : TEXT_BODY }}
              >
                회원가입
              </button>

              <button
                type="button"
                onClick={onGoCreate}
                onMouseEnter={() => setHoveredPrimaryButton("header-create")}
                onMouseLeave={() => setHoveredPrimaryButton("")}
                onMouseDown={(e) => e.currentTarget.blur()}
                style={{
                  ...primaryButton,
                  padding: "0 20px",
                  minWidth: "118px",
                  background: BRAND_COLOR,
                  transform: hoveredPrimaryButton === "header-create" ? "translateY(-1px)" : "none",
                  boxShadow: hoveredPrimaryButton === "header-create" ? "0 12px 26px rgba(31, 111, 214, 0.22)" : primaryButton.boxShadow,
                }}
              >
                요청 등록
              </button>
            </div>
          )}

          {!isMobile && isLoggedIn && (
            <div style={{ display: "flex", alignItems: "center", gap: "18px", flexShrink: 0, paddingLeft: "16px" }}>
              <button
                type="button"
                onClick={() => alert("알림 기능은 아직 준비 중입니다.")}
                onMouseDown={(e) => e.currentTarget.blur()}
                style={{ width: "24px", height: "24px", border: "none", outline: "none", background: "transparent", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4.8 17.2C4.48 17.52 4.71 18 5.16 18H18.84C19.29 18 19.52 17.52 19.2 17.2L18 16Z" fill={TEXT_BODY} />
                </svg>
              </button>

              <div style={{ position: "relative" }} ref={profileRef}>
                <button
                  type="button"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  onMouseDown={(e) => e.currentTarget.blur()}
                  style={{ border: "none", outline: "none", background: "none", padding: 0, display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
                >
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#F1F5F9", color: BRAND_COLOR, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "14px" }}>
                    {String(displayName).slice(0, 1)}
                  </div>
                  <span style={{ fontSize: "13px", color: "#8A8F94" }}>▾</span>
                </button>

                {profileOpen && (
                  <div style={{ position: "absolute", top: "42px", right: 0, width: "210px", backgroundColor: "#ffffff", border: `1px solid ${CARD_BORDER}`, borderRadius: "14px", boxShadow: "0 14px 30px rgba(15, 23, 42, 0.08)", padding: "10px" }}>
                    <DropdownButton onClick={() => closeAndRun(onGoMyPage)}>마이페이지</DropdownButton>
                    <DropdownButton onClick={() => closeAndRun(onGoMyRequests)}>내 요청 목록</DropdownButton>
                    <DropdownButton onClick={() => closeAndRun(onGoAllRequests)}>전체 요청 보기</DropdownButton>
                    <DropdownButton onClick={() => closeAndRun(onGoAssignedRequests)}>맡은 작업 보기</DropdownButton>
                    <DropdownButton onClick={() => closeAndRun(onLogout)} danger>로그아웃</DropdownButton>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={onGoCreate}
                onMouseEnter={() => setHoveredPrimaryButton("login-create")}
                onMouseLeave={() => setHoveredPrimaryButton("")}
                onMouseDown={(e) => e.currentTarget.blur()}
                style={{
                  ...primaryButton,
                  padding: "0 20px",
                  minWidth: "118px",
                  background: BRAND_COLOR,
                  transform: hoveredPrimaryButton === "login-create" ? "translateY(-1px)" : "none",
                  boxShadow: hoveredPrimaryButton === "login-create" ? "0 12px 26px rgba(31, 111, 214, 0.22)" : primaryButton.boxShadow,
                }}
              >
                요청 등록
              </button>
            </div>
          )}

          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
              {isLoggedIn ? (
                <>
                  <button type="button" onClick={() => alert("알림 기능은 아직 준비 중입니다.")} onMouseDown={(e) => e.currentTarget.blur()} style={{ width: "24px", height: "24px", border: "none", outline: "none", background: "transparent", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4.8 17.2C4.48 17.52 4.71 18 5.16 18H18.84C19.29 18 19.52 17.52 19.2 17.2L18 16Z" fill={TEXT_BODY} />
                    </svg>
                  </button>

                  <div style={{ position: "relative" }} ref={profileRef}>
                    <button type="button" onClick={() => setProfileOpen((prev) => !prev)} onMouseDown={(e) => e.currentTarget.blur()} style={{ width: "34px", height: "34px", borderRadius: "50%", border: "none", outline: "none", background: "#F1F5F9", color: BRAND_COLOR, cursor: "pointer", padding: 0, fontWeight: "700", fontSize: "12px" }}>
                      {String(displayName).slice(0, 1)}
                    </button>

                    {profileOpen && (
                      <div style={{ position: "absolute", top: "42px", right: 0, width: "210px", backgroundColor: "#ffffff", border: `1px solid ${CARD_BORDER}`, borderRadius: "14px", boxShadow: "0 14px 30px rgba(15, 23, 42, 0.08)", padding: "10px" }}>
                        <DropdownButton onClick={() => closeAndRun(onGoMyPage)}>마이페이지</DropdownButton>
                        <DropdownButton onClick={() => closeAndRun(onGoMyRequests)}>내 요청 목록</DropdownButton>
                        <DropdownButton onClick={() => closeAndRun(onGoAllRequests)}>전체 요청 보기</DropdownButton>
                        <DropdownButton onClick={() => closeAndRun(onGoAssignedRequests)}>맡은 작업 보기</DropdownButton>
                        <DropdownButton onClick={() => closeAndRun(onLogout)} danger>로그아웃</DropdownButton>
                      </div>
                    )}
                  </div>

                  <button type="button" onClick={onGoCreate} onMouseDown={(e) => e.currentTarget.blur()} style={{ ...primaryButton, padding: "0 12px", height: "36px", fontSize: "13px" }}>
                    요청
                  </button>
                </>
              ) : (
                <>
                  <button type="button" onClick={onGoLogin} onMouseDown={(e) => e.currentTarget.blur()} style={{ ...topMenuButton, fontWeight: "500", fontSize: "13px" }}>
                    로그인
                  </button>

                  <button type="button" onClick={onGoSignup} onMouseDown={(e) => e.currentTarget.blur()} style={{ ...topMenuButton, fontWeight: "500", fontSize: "13px" }}>
                    회원가입
                  </button>

                  <button type="button" onClick={onGoCreate} onMouseDown={(e) => e.currentTarget.blur()} style={{ ...primaryButton, padding: "0 12px", height: "36px", fontSize: "13px" }}>
                    요청
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;