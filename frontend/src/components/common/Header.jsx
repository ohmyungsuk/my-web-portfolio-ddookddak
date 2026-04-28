import { useEffect, useRef, useState } from "react";
import { GrNotification } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";

function formatNotificationTime(value) {
  if (!value) return "방금 전";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "방금 전";
  }

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "방금 전";
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays < 7) return `${diffDays}일 전`;

  return `${date.getMonth() + 1}.${date.getDate()}`;
}

function HeaderNotificationButton({
  isMobile,
  isHovered,
  unreadCount = 0,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  const BRAND_COLOR = "#2F80ED";
  const TEXT_BODY = "#2F3438";
  const hasUnread = Number(unreadCount) > 0;
  const badgeText = unreadCount > 99 ? "99+" : String(unreadCount);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={(e) => e.currentTarget.blur()}
      style={{
        position: "relative",
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

      {hasUnread && (
        <span
          style={{
            position: "absolute",
            top: isMobile ? "1px" : "0px",
            right: isMobile ? "0px" : "1px",
            minWidth: unreadCount > 9 ? "18px" : "15px",
            height: "15px",
            padding: unreadCount > 9 ? "0 4px" : 0,
            borderRadius: "999px",
            background: "#EF4444",
            color: "#ffffff",
            border: "2px solid #ffffff",
            boxSizing: "content-box",
            fontSize: "10px",
            lineHeight: "15px",
            fontWeight: "900",
            textAlign: "center",
          }}
        >
          {badgeText}
        </span>
      )}
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
  notifications = [],
  unreadCount = 0,
  onReadNotification,
  onReadAllNotifications,
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
  const [notificationOpen, setNotificationOpen] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

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

      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setNotificationOpen(false);
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
    setNotificationOpen(false);

    if (action) {
      action();
    }
  };

  const goAdminPage = () => {
    setProfileOpen(false);
    setNotificationOpen(false);
    navigate("/admin");
  };

  const handleNotificationClick = () => {
    setProfileOpen(false);
    setNotificationOpen((prev) => !prev);
  };

  const handleReadNotification = (notification) => {
    setNotificationOpen(false);

    if (onReadNotification) {
      onReadNotification(notification);
    }
  };

  const handleReadAllNotifications = () => {
    if (onReadAllNotifications) {
      onReadAllNotifications();
    }
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

  const renderNotificationPanel = () => (
    <div
      style={{
        position: "absolute",
        top: isMobile ? "42px" : "42px",
        right: isMobile ? "-54px" : 0,
        width: isMobile ? "310px" : "360px",
        maxWidth: "calc(100vw - 28px)",
        backgroundColor: "#ffffff",
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: "18px",
        boxShadow: "0 18px 40px rgba(15, 23, 42, 0.12)",
        padding: "12px",
        zIndex: 120,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          padding: "4px 4px 12px",
          borderBottom: `1px solid ${CARD_BORDER}`,
          marginBottom: "8px",
        }}
      >
        <div>
          <strong
            style={{
              display: "block",
              color: TEXT_DARK,
              fontSize: "15px",
              fontWeight: "900",
              letterSpacing: "-0.03em",
            }}
          >
            알림
          </strong>
          <span
            style={{
              display: "block",
              marginTop: "3px",
              color: "#64748B",
              fontSize: "12px",
              fontWeight: "700",
            }}
          >
            안 읽은 알림 {unreadCount}개
          </span>
        </div>

        {Number(unreadCount) > 0 && (
          <button
            type="button"
            onClick={handleReadAllNotifications}
            onMouseDown={(e) => e.currentTarget.blur()}
            style={{
              border: "none",
              outline: "none",
              boxShadow: "none",
              background: "#EFF6FF",
              color: BRAND_COLOR,
              height: "30px",
              padding: "0 10px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: "900",
              cursor: "pointer",
            }}
          >
            모두 읽음
          </button>
        )}
      </div>

      <div
        style={{
          maxHeight: isMobile ? "330px" : "380px",
          overflowY: "auto",
          paddingRight: "2px",
        }}
      >
        {notifications.length === 0 ? (
          <div
            style={{
              padding: "32px 10px",
              textAlign: "center",
              color: "#94A3B8",
              fontSize: "14px",
              fontWeight: "700",
            }}
          >
            아직 도착한 알림이 없어요.
          </div>
        ) : (
          notifications.map((notification) => {
            const isUnread = !notification.read;

            return (
              <button
                key={notification.id}
                type="button"
                onClick={() => handleReadNotification(notification)}
                onMouseDown={(e) => e.currentTarget.blur()}
                style={{
                  width: "100%",
                  display: "flex",
                  gap: "10px",
                  padding: "12px 10px",
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                  borderRadius: "14px",
                  background: isUnread ? "#F8FBFF" : "#ffffff",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background-color 0.16s ease",
                  marginBottom: "4px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#EFF6FF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isUnread
                    ? "#F8FBFF"
                    : "#ffffff";
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "999px",
                    background: isUnread ? BRAND_COLOR : "#CBD5E1",
                    flexShrink: 0,
                    marginTop: "7px",
                  }}
                />

                <span style={{ minWidth: 0, flex: 1 }}>
                  <strong
                    style={{
                      display: "block",
                      color: TEXT_DARK,
                      fontSize: "14px",
                      fontWeight: isUnread ? "900" : "750",
                      lineHeight: 1.45,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {notification.title || "새 알림"}
                  </strong>

                  <span
                    style={{
                      display: "block",
                      marginTop: "5px",
                      color: "#64748B",
                      fontSize: "13px",
                      fontWeight: "650",
                      lineHeight: 1.5,
                      wordBreak: "keep-all",
                    }}
                  >
                    {notification.message || "알림 내용이 없습니다."}
                  </span>

                  <span
                    style={{
                      display: "block",
                      marginTop: "7px",
                      color: "#94A3B8",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                  >
                    {formatNotificationTime(notification.createdAt)}
                  </span>
                </span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );

  const renderNotificationButton = () => (
    <div style={{ position: "relative" }} ref={notificationRef}>
      <HeaderNotificationButton
        isMobile={isMobile}
        isHovered={hoveredNotification || notificationOpen}
        unreadCount={unreadCount}
        onMouseEnter={() => setHoveredNotification(true)}
        onMouseLeave={() => setHoveredNotification(false)}
        onClick={handleNotificationClick}
      />

      {notificationOpen && renderNotificationPanel()}
    </div>
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
                  onClick={() => {
                    setNotificationOpen(false);
                    setProfileOpen((prev) => !prev);
                  }}
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
                      onClick={() => {
                        setNotificationOpen(false);
                        setProfileOpen((prev) => !prev);
                      }}
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
