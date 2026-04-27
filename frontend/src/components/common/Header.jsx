import { useEffect, useRef, useState } from "react";
import { GrNotification } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";

function HeaderNotificationButton({
  isMobile,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  const BRAND_COLOR = "#2F80ED";
  const TEXT_BODY = "#2F3438";

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={(e) => e.currentTarget.blur()}
      style={{
        width: isMobile ? "34px" : "38px",
        height: isMobile ? "34px" : "38px",
        border: "none",
        outline: "none",
        boxShadow: "none",
        background: "transparent",
        padding: 0,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "999px",
        color: isHovered ? BRAND_COLOR : TEXT_BODY,
        transition: "color 0.18s ease, background-color 0.18s ease",
        WebkitTapHighlightColor: "transparent",
      }}
      aria-label="알림"
    >
      <GrNotification size={isMobile ? 18 : 20} />
    </button>
  );
}

function HeaderDropdownButton({
  children,
  onClick,
  danger = false,
  textBody = "#2F3438",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseDown={(e) => e.currentTarget.blur()}
      style={{
        width: "100%",
        background: danger ? "#fee2e2" : "transparent",
        color: danger ? "#dc2626" : textBody,
        border: "none",
        padding: "10px 12px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        textAlign: "left",
        transition: "background-color 0.12s ease",
        outline: "none",
        boxShadow: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = danger ? "#fecaca" : "#f8fafc";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = danger
          ? "#fee2e2"
          : "transparent";
      }}
    >
      {children}
    </button>
  );
}

function Header({
  isLoggedIn,
  loginUser,
  onGoHome,
  onGoLogin,
  onGoSignup,
  onGoCreate,
  onGoMyPage,
  onGoMyRequests,
  onGoAllRequests,
  onGoAssignedRequests,
  onLogout,
}) {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hoveredTextButton, setHoveredTextButton] = useState("");
  const [hoveredPrimaryButton, setHoveredPrimaryButton] = useState("");
  const [hoveredNotification, setHoveredNotification] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const isMobile = windowWidth <= 768;

  const BRAND_COLOR = "#2F80ED";
  const TEXT_DARK = "#0F172A";
  const TEXT_BODY = "#2F3438";
  const CARD_BORDER = "#E5EDF6";

  const normalizeRole = (role) => {
    const value = String(role || "").trim().toLowerCase();
    if (value === "admin") return "admin";
    if (value === "worker") return "worker";
    return "user";
  };

  const userRole = normalizeRole(loginUser?.role);

  const isAdmin = userRole === "admin";
  const isWorker = userRole === "worker";

  const roleLabel = isAdmin ? "관리자" : isWorker ? "전문가" : "일반 회원";
  const displayName =
    loginUser?.name || loginUser?.username || loginUser?.email || "사용자";

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
    if (onGoHome) {
      onGoHome();
      return;
    }

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

    if (action) {
      action();
    }
  };

  const goAdminPage = () => {
    setProfileOpen(false);
    navigate("/admin");
  };

  const handleNotificationClick = () => {
    alert("알림 기능은 아직 준비 중입니다.");
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
    fontFamily:
      '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
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
    transition:
      "background-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease",
    fontFamily:
      '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const renderNotificationButton = () => (
    <HeaderNotificationButton
      isMobile={isMobile}
      isHovered={hoveredNotification}
      onMouseEnter={() => setHoveredNotification(true)}
      onMouseLeave={() => setHoveredNotification(false)}
      onClick={handleNotificationClick}
    />
  );

  const renderDropdownMenu = () => (
    <div
      style={{
        position: "absolute",
        top: isMobile ? "42px" : "42px",
        right: 0,
        width: "220px",
        backgroundColor: "#ffffff",
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: "14px",
        boxShadow: "0 14px 30px rgba(15, 23, 42, 0.08)",
        padding: "10px",
        zIndex: 100,
      }}
    >
      <div
        style={{
          padding: "10px 12px 12px",
          borderBottom: `1px solid ${CARD_BORDER}`,
          marginBottom: "8px",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            fontWeight: "700",
            color: TEXT_DARK,
            marginBottom: "4px",
          }}
        >
          {displayName}
        </div>

        <div
          style={{
            fontSize: "12px",
            color: isAdmin ? "#DC2626" : isWorker ? "#7C3AED" : "#64748B",
            fontWeight: "700",
          }}
        >
          {roleLabel}
        </div>
      </div>

      <HeaderDropdownButton
        onClick={() => closeAndRun(onGoMyPage)}
        textBody={TEXT_BODY}
      >
        마이페이지
      </HeaderDropdownButton>

      {!isWorker && (
        <HeaderDropdownButton
          onClick={() => closeAndRun(onGoMyRequests)}
          textBody={TEXT_BODY}
        >
          내 요청 목록
        </HeaderDropdownButton>
      )}

      <HeaderDropdownButton
        onClick={() => closeAndRun(onGoAllRequests)}
        textBody={TEXT_BODY}
      >
        전체 요청 보기
      </HeaderDropdownButton>

      {(isWorker || isAdmin) && (
        <HeaderDropdownButton
          onClick={() => closeAndRun(onGoAssignedRequests)}
          textBody={TEXT_BODY}
        >
          맡은 작업 보기
        </HeaderDropdownButton>
      )}

      {isAdmin && (
        <HeaderDropdownButton onClick={goAdminPage} textBody={TEXT_BODY}>
          관리자 페이지
        </HeaderDropdownButton>
      )}

      <HeaderDropdownButton
        onClick={() => closeAndRun(onLogout)}
        danger
        textBody={TEXT_BODY}
      >
        로그아웃
      </HeaderDropdownButton>
    </div>
  );

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
        fontFamily:
          '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
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
            <Link
              to="/"
              style={{
                border: "none",
                outline: "none",
                background: "none",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: "12px",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
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
              <nav
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "32px",
                }}
              >
                {[
                  { key: "home", text: "홈", onClick: goTop },
                  {
                    key: "intro",
                    text: "서비스 소개",
                    onClick: () => moveToSection("service-intro"),
                  },
                  {
                    key: "community",
                    text: "커뮤니티",
                    onClick: () => moveToSection("community-preview"),
                  },
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
                      color:
                        hoveredTextButton === item.key ? BRAND_COLOR : TEXT_BODY,
                    }}
                  >
                    {item.text}
                  </button>
                ))}
              </nav>
            )}
          </div>

          {!isMobile && !isLoggedIn && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "22px",
                flexShrink: 0,
                paddingLeft: "16px",
              }}
            >
              <button
                type="button"
                onClick={onGoLogin}
                onMouseEnter={() => setHoveredTextButton("login")}
                onMouseLeave={() => setHoveredTextButton("")}
                onMouseDown={(e) => e.currentTarget.blur()}
                style={{
                  ...topMenuButton,
                  fontWeight: "500",
                  color: hoveredTextButton === "login" ? BRAND_COLOR : TEXT_BODY,
                }}
              >
                로그인
              </button>

              <button
                type="button"
                onClick={onGoSignup}
                onMouseEnter={() => setHoveredTextButton("signup")}
                onMouseLeave={() => setHoveredTextButton("")}
                onMouseDown={(e) => e.currentTarget.blur()}
                style={{
                  ...topMenuButton,
                  fontWeight: "500",
                  color:
                    hoveredTextButton === "signup" ? BRAND_COLOR : TEXT_BODY,
                }}
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
                  transform:
                    hoveredPrimaryButton === "header-create"
                      ? "translateY(-1px)"
                      : "none",
                  boxShadow:
                    hoveredPrimaryButton === "header-create"
                      ? "0 12px 26px rgba(31, 111, 214, 0.22)"
                      : primaryButton.boxShadow,
                }}
              >
                요청 등록
              </button>
            </div>
          )}

          {!isMobile && isLoggedIn && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                flexShrink: 0,
                paddingLeft: "16px",
              }}
            >
              {renderNotificationButton()}

              <div style={{ position: "relative" }} ref={profileRef}>
                <button
                  type="button"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  onMouseDown={(e) => e.currentTarget.blur()}
                  style={{
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                    background: "none",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "#F1F5F9",
                      color: BRAND_COLOR,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      fontSize: "14px",
                    }}
                  >
                    {String(displayName).slice(0, 1)}
                  </div>

                  <span
                    style={{
                      fontSize: "13px",
                      color: "#8A8F94",
                    }}
                  >
                    ▾
                  </span>
                </button>

                {profileOpen && renderDropdownMenu()}
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
                  transform:
                    hoveredPrimaryButton === "login-create"
                      ? "translateY(-1px)"
                      : "none",
                  boxShadow:
                    hoveredPrimaryButton === "login-create"
                      ? "0 12px 26px rgba(31, 111, 214, 0.22)"
                      : primaryButton.boxShadow,
                }}
              >
                요청 등록
              </button>
            </div>
          )}

          {isMobile && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexShrink: 0,
              }}
            >
              {isLoggedIn ? (
                <>
                  {renderNotificationButton()}

                  <div style={{ position: "relative" }} ref={profileRef}>
                    <button
                      type="button"
                      onClick={() => setProfileOpen((prev) => !prev)}
                      onMouseDown={(e) => e.currentTarget.blur()}
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                        background: "#F1F5F9",
                        color: BRAND_COLOR,
                        cursor: "pointer",
                        padding: 0,
                        fontWeight: "700",
                        fontSize: "12px",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      {String(displayName).slice(0, 1)}
                    </button>

                    {profileOpen && renderDropdownMenu()}
                  </div>

                  <button
                    type="button"
                    onClick={onGoCreate}
                    onMouseDown={(e) => e.currentTarget.blur()}
                    style={{
                      ...primaryButton,
                      padding: "0 12px",
                      height: "36px",
                      fontSize: "13px",
                    }}
                  >
                    요청
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={onGoLogin}
                    onMouseDown={(e) => e.currentTarget.blur()}
                    style={{
                      ...topMenuButton,
                      fontWeight: "500",
                      fontSize: "13px",
                    }}
                  >
                    로그인
                  </button>

                  <button
                    type="button"
                    onClick={onGoSignup}
                    onMouseDown={(e) => e.currentTarget.blur()}
                    style={{
                      ...topMenuButton,
                      fontWeight: "500",
                      fontSize: "13px",
                    }}
                  >
                    회원가입
                  </button>

                  <button
                    type="button"
                    onClick={onGoCreate}
                    onMouseDown={(e) => e.currentTarget.blur()}
                    style={{
                      ...primaryButton,
                      padding: "0 12px",
                      height: "36px",
                      fontSize: "13px",
                    }}
                  >
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