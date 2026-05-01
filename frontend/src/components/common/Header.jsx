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
  onGoServiceIntro,
  onGoCreate,
  onGoMyPage,
  onGoMyRequests,
  onGoAllRequests,
  onGoAssignedRequests,
  onGoCommunity,
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
  const SOFT_BLUE = "#EFF6FF";

  const safeNotifications = Array.isArray(notifications) ? notifications : [];
  const safeUnreadCount = Number(unreadCount) || 0;
  const hasUnread = safeUnreadCount > 0;
  const badgeText = safeUnreadCount > 99 ? "99+" : String(safeUnreadCount);

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
  const avatarUrl =
    loginUser?.avatarUrl ||
    loginUser?.avatar_url ||
    loginUser?.picture ||
    loginUser?.photoUrl ||
    "";

  const renderProfileAvatar = (size = 40) => (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: "#F1F5F9",
        color: BRAND_COLOR,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "700",
        fontSize: size <= 34 ? "12px" : "14px",
        overflow: "hidden",
      }}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="프로필 사진"
          referrerPolicy="no-referrer"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "cover",
          }}
        />
      ) : (
        String(displayName).slice(0, 1)
      )}
    </div>
  );

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

  const closeAndRun = (action) => {
    setProfileOpen(false);
    if (action) action();
  };

  const goAdminPage = () => {
    setProfileOpen(false);
    navigate("/admin");
  };

  const goServiceIntro = () => {
    if (onGoServiceIntro) {
      onGoServiceIntro();
      return;
    }
    navigate("/service");
  };

  const handleNotificationToggle = () => {
    setProfileOpen(false);
    setNotificationOpen((prev) => !prev);
  };

  const handleNotificationClick = (notification) => {
    if (onReadNotification) {
      onReadNotification(notification);
    }
    setNotificationOpen(false);
  };

  const handleReadAllNotifications = (e) => {
    e.stopPropagation();
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
    boxShadow: "none",
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
          outline: "none",
          boxShadow: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = danger ? "#fecaca" : "#f8fafc";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = danger ? "#fee2e2" : "transparent";
        }}
      >
        {children}
      </button>
    );
  }

  const renderNotificationButton = () => (
    <button
      type="button"
      onClick={handleNotificationToggle}
      onMouseEnter={() => setHoveredNotification(true)}
      onMouseLeave={() => setHoveredNotification(false)}
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
        color: hoveredNotification || notificationOpen ? BRAND_COLOR : TEXT_BODY,
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
            top: isMobile ? "0px" : "-1px",
            right: isMobile ? "-1px" : "0px",
            minWidth: safeUnreadCount > 9 ? "18px" : "15px",
            height: "15px",
            padding: safeUnreadCount > 9 ? "0 4px" : 0,
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

  const renderNotificationDropdown = () => (
    <div
      style={{
        position: "absolute",
        top: isMobile ? "42px" : "44px",
        right: isMobile ? "-54px" : "-6px",
        width: isMobile ? "310px" : "360px",
        maxWidth: "calc(100vw - 28px)",
        backgroundColor: "#ffffff",
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: "18px",
        boxShadow: "0 18px 42px rgba(15, 23, 42, 0.14)",
        overflow: "hidden",
        zIndex: 120,
      }}
    >
      <div
        style={{
          padding: "15px 16px 13px",
          borderBottom: `1px solid ${CARD_BORDER}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "15px",
              fontWeight: "800",
              color: TEXT_DARK,
              letterSpacing: "-0.3px",
            }}
          >
            알림
          </div>
          <div
            style={{
              marginTop: "3px",
              fontSize: "12px",
              color: "#64748B",
              fontWeight: "500",
            }}
          >
            {hasUnread
              ? `읽지 않은 알림 ${safeUnreadCount}개`
              : "새 알림이 없습니다"}
          </div>
        </div>

        {safeNotifications.length > 0 && (
          <button
            type="button"
            onClick={handleReadAllNotifications}
            onMouseDown={(e) => e.currentTarget.blur()}
            style={{
              border: "none",
              outline: "none",
              boxShadow: "none",
              background: SOFT_BLUE,
              color: BRAND_COLOR,
              borderRadius: "999px",
              padding: "7px 10px",
              fontSize: "12px",
              fontWeight: "800",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            모두 읽음
          </button>
        )}
      </div>

      <div
        style={{
          maxHeight: "360px",
          overflowY: "auto",
          padding: safeNotifications.length > 0 ? "8px" : "24px 18px",
        }}
      >
        {safeNotifications.length === 0 ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "22px", marginBottom: "8px" }}>🔔</div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "700",
                color: TEXT_DARK,
                marginBottom: "4px",
              }}
            >
              아직 알림이 없습니다
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#64748B",
                lineHeight: 1.5,
              }}
            >
              요청 진행 상황이 바뀌면 이곳에 표시됩니다.
            </div>
          </div>
        ) : (
          safeNotifications.slice(0, 10).map((notification) => {
            const isRead = notification.read;

            return (
              <button
                key={notification.id}
                type="button"
                onClick={() => handleNotificationClick(notification)}
                onMouseDown={(e) => e.currentTarget.blur()}
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                  background: isRead ? "#ffffff" : "#F8FBFF",
                  borderRadius: "13px",
                  padding: "12px",
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  gap: "10px",
                  transition: "background-color 0.14s ease",
                  marginBottom: "4px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isRead
                    ? "#F8FAFC"
                    : "#EFF6FF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isRead
                    ? "#ffffff"
                    : "#F8FBFF";
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "999px",
                    background: isRead ? "#CBD5E1" : BRAND_COLOR,
                    flexShrink: 0,
                    marginTop: "6px",
                  }}
                />

                <span style={{ minWidth: 0, flex: 1 }}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "8px",
                      marginBottom: "4px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: isRead ? "700" : "800",
                        color: TEXT_DARK,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {notification.title || "새 알림"}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#94A3B8",
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {formatNotificationTime(notification.createdAt)}
                    </span>
                  </span>

                  <span
                    style={{
                      display: "block",
                      fontSize: "12px",
                      color: "#64748B",
                      lineHeight: 1.45,
                      wordBreak: "keep-all",
                    }}
                  >
                    {notification.message || "알림 내용을 확인해주세요."}
                  </span>
                </span>
              </button>
            );
          })
        )}
      </div>
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

      <DropdownButton onClick={() => closeAndRun(onGoMyPage)}>
        마이페이지
      </DropdownButton>

      {!isWorker && (
        <DropdownButton onClick={() => closeAndRun(onGoMyRequests)}>
          내 요청 목록
        </DropdownButton>
      )}

      <DropdownButton onClick={() => closeAndRun(onGoAllRequests)}>
        전체 요청 보기
      </DropdownButton>

      {(isWorker || isAdmin) && (
        <DropdownButton onClick={() => closeAndRun(onGoAssignedRequests)}>
          맡은 작업 보기
        </DropdownButton>
      )}

      {isAdmin && (
        <DropdownButton onClick={goAdminPage}>관리자 페이지</DropdownButton>
      )}

      <DropdownButton onClick={() => closeAndRun(onLogout)} danger>
        로그아웃
      </DropdownButton>
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
              <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                {[
                  { key: "home", text: "홈", onClick: goTop },
                  {
                    key: "intro",
                    text: "서비스 소개",
                    onClick: goServiceIntro,
                  },
                  {
                    key: "community",
                    text: "커뮤니티",
                    onClick: () =>
                      onGoCommunity ? onGoCommunity() : navigate("/community"),
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
                  background:
                    hoveredPrimaryButton === "header-create"
                      ? "#1F6FD6"
                      : BRAND_COLOR,
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
              <div style={{ position: "relative" }} ref={notificationRef}>
                {renderNotificationButton()}
                {notificationOpen && renderNotificationDropdown()}
              </div>

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
                    background: "none",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    boxShadow: "none",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {renderProfileAvatar(40)}
                  <span style={{ fontSize: "13px", color: "#8A8F94" }}>▾</span>
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
                  background:
                    hoveredPrimaryButton === "login-create"
                      ? "#1F6FD6"
                      : BRAND_COLOR,
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
                  <div style={{ position: "relative" }} ref={notificationRef}>
                    {renderNotificationButton()}
                    {notificationOpen && renderNotificationDropdown()}
                  </div>

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
                        background: "transparent",
                        color: BRAND_COLOR,
                        cursor: "pointer",
                        padding: 0,
                        fontWeight: "700",
                        fontSize: "12px",
                        boxShadow: "none",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      {renderProfileAvatar(34)}
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
