import { useEffect, useRef, useState } from "react";
import { getCategoryIcon } from "../utils/categoryIcons.js";
import { GrNotification } from "react-icons/gr";

function LandingPage({
  onGoLogin,
  onGoSignup,
  onGoCreate,
  onGoAiRequest,
  onGoMyPage,
  onGoMyRequests,
  onGoAllRequests,
  onGoAssignedRequests,
  onLogout,
  isLoggedIn,
  loginUser,
  notifications = [],
  unreadCount = 0,
  onReadNotification,
  onReadAllNotifications,
}) {
  const BRAND_COLOR = "#2F80ED";
  const BRAND_HOVER = "#1F6FD6";
  const BRAND_SOFT = "#EAF3FF";
  const ICON_BG = "#EFF6FF";
  const PAGE_BG =
    "linear-gradient(180deg, #fbfcfe 0%, #f5f7fb 52%, #fafbfd 100%)";
  const TEXT_DARK = "#0F172A";
  const TEXT_MUTED = "#64748B";
  const TEXT_BODY = "#2F3438";
  const BUTTON_BORDER = "#D7E2F0";
  const CARD_BORDER = "#E5EDF6";
  const CARD_SHADOW = "0 10px 24px rgba(15, 23, 42, 0.04)";

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hoveredTextButton, setHoveredTextButton] = useState("");
  const [hoveredPrimaryButton, setHoveredPrimaryButton] = useState("");
  const [hoveredGhostButton, setHoveredGhostButton] = useState("");
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const userRole = String(loginUser?.role || "user").toLowerCase();
  const isAdmin = userRole === "admin";
  const isWorker = userRole === "worker";
  const roleLabel = isAdmin ? "관리자" : isWorker ? "전문가" : "일반 회원";

  const isMobile = windowWidth <= 768;

  const displayName =
    loginUser?.username || loginUser?.name || loginUser?.email || "사용자";

  const safeNotifications = Array.isArray(notifications) ? notifications : [];
  const visibleNotifications = safeNotifications.slice(0, 8);
  const safeUnreadCount = Number(unreadCount) || 0;

  const formatNotificationTime = (value) => {
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
  };

  const handleNotificationClick = (notification) => {
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
    fontFamily:
      '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const ghostButton = {
    border: `1px solid ${BUTTON_BORDER}`,
    backgroundColor: "#ffffff",
    color: TEXT_BODY,
    borderRadius: "12px",
    padding: isMobile ? "10px 12px" : "10px 14px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    whiteSpace: "nowrap",
    outline: "none",
    appearance: "none",
    WebkitAppearance: "none",
    WebkitTapHighlightColor: "transparent",
    boxShadow: "none",
    fontFamily:
      '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    transition:
      "background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease, transform 0.18s ease",
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
    WebkitTapHighlightColor: "transparent",
    boxShadow: "0 8px 20px rgba(47, 128, 237, 0.16)",
    transition:
      "background-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease",
    fontFamily:
      '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const categoryItems = [
    { title: "전기", bg: ICON_BG },
    { title: "설비", bg: ICON_BG },
    { title: "누수", bg: ICON_BG },
    { title: "도어락", bg: ICON_BG },
    { title: "에어컨", bg: ICON_BG },
    { title: "CCTV", bg: ICON_BG },
    { title: "간판", bg: ICON_BG },
    { title: "기타", bg: ICON_BG },
  ];

  const featuredRequests = [
    {
      eyebrow: "빠른 접수",
      title: "전기 점검 · 차단기 문제",
      subtitle: "긴급한 전기 관련 요청을 빠르게 등록하고 흐름을 바로 확인",
      iconKey: "전기",
      bg: "linear-gradient(135deg, #eef4ff 0%, #dbeafe 100%)",
    },
    {
      eyebrow: "생활 수리",
      title: "누수 · 설비 · 배관 요청",
      subtitle: "반복적으로 자주 발생하는 생활 수리 항목을 한 번에 정리",
      iconKey: "누수",
      bg: "linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)",
    },
    {
      eyebrow: "출입/보안",
      title: "도어락 · 출입문 수리",
      subtitle: "출입 관련 문제도 간단한 요청으로 바로 접수 가능",
      iconKey: "도어락",
      bg: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
    },
    {
      eyebrow: "시설 장비",
      title: "냉난방 · CCTV · 간판",
      subtitle: "시설 장비 관련 요청을 더 체계적으로 관리",
      iconKey: "CCTV",
      bg: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
    },
  ];

  const processCards = [
    {
      step: "01",
      title: "요청 등록",
      desc: "문제 상황과 필요한 작업을 짧고 명확하게 입력합니다.",
    },
    {
      step: "02",
      title: "작업자 확인",
      desc: "요청을 본 사람이 수락하고 진행 가능 여부를 확인합니다.",
    },
    {
      step: "03",
      title: "진행 상태 관리",
      desc: "접수, 배정, 진행, 완료 흐름을 한 화면에서 확인합니다.",
    },
  ];

  const storyCards = [
    {
      badge: "NEW",
      title: "최근 요청 이야기",
      desc: "자주 올라오는 요청 유형과 진행 흐름을 함께 볼 수 있습니다.",
    },
    {
      badge: "TIP",
      title: "작업 팁 모음",
      desc: "간단한 점검 요령과 유지보수 팁을 짧게 정리했습니다.",
    },
    {
      badge: "REVIEW",
      title: "이용 후기",
      desc: "사용자들이 남긴 진행 경험과 후기를 참고할 수 있습니다.",
    },
  ];

  const renderNotificationDropdown = () => (
    <div
      style={{
        position: "absolute",
        top: isMobile ? "40px" : "42px",
        right: isMobile ? "-8px" : 0,
        width: isMobile ? "304px" : "348px",
        maxWidth: "calc(100vw - 32px)",
        backgroundColor: "#ffffff",
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: "18px",
        boxShadow: "0 18px 42px rgba(15, 23, 42, 0.13)",
        padding: "12px",
        zIndex: 200,
        boxSizing: "content-box",
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
          <div
            style={{
              fontSize: "15px",
              fontWeight: "900",
              color: TEXT_DARK,
              letterSpacing: "-0.2px",
            }}
          >
            알림
          </div>
          <div
            style={{
              marginTop: "3px",
              fontSize: "12px",
              fontWeight: "700",
              color: TEXT_MUTED,
            }}
          >
            {safeUnreadCount > 0
              ? `안 읽은 알림 ${safeUnreadCount}개`
              : "새 알림을 모두 확인했어요"}
          </div>
        </div>

        <button
          type="button"
          onClick={handleReadAllNotifications}
          onMouseDown={(e) => e.currentTarget.blur()}
          disabled={safeUnreadCount <= 0}
          style={{
            border: "none",
            outline: "none",
            boxShadow: "none",
            background: safeUnreadCount > 0 ? BRAND_SOFT : "#F8FAFC",
            color: safeUnreadCount > 0 ? BRAND_COLOR : "#94A3B8",
            borderRadius: "999px",
            padding: "8px 10px",
            fontSize: "12px",
            fontWeight: "800",
            cursor: safeUnreadCount > 0 ? "pointer" : "default",
            whiteSpace: "nowrap",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          모두 읽음
        </button>
      </div>

      {visibleNotifications.length === 0 ? (
        <div
          style={{
            padding: "30px 10px",
            textAlign: "center",
            color: TEXT_MUTED,
            fontSize: "14px",
            fontWeight: "700",
            lineHeight: "1.7",
          }}
        >
          아직 받은 알림이 없어요.
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            maxHeight: isMobile ? "320px" : "380px",
            overflowY: "auto",
            paddingRight: "2px",
          }}
        >
          {visibleNotifications.map((notification) => {
            const isUnread = !notification.read;

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
                  background: isUnread ? "#F8FBFF" : "#ffffff",
                  padding: "12px",
                  borderRadius: "14px",
                  cursor: "pointer",
                  textAlign: "left",
                  display: "grid",
                  gridTemplateColumns: "8px 1fr",
                  gap: "10px",
                  WebkitTapHighlightColor: "transparent",
                  transition: "background-color 0.18s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#F1F7FF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isUnread
                    ? "#F8FBFF"
                    : "#ffffff";
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "999px",
                    background: isUnread ? BRAND_COLOR : "transparent",
                    marginTop: "7px",
                  }}
                />

                <span style={{ minWidth: 0 }}>
                  <span
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: isUnread ? "900" : "750",
                      color: TEXT_DARK,
                      lineHeight: "1.45",
                      marginBottom: "4px",
                      letterSpacing: "-0.15px",
                    }}
                  >
                    {notification.title || "새 알림"}
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: TEXT_MUTED,
                      lineHeight: "1.55",
                      marginBottom: "7px",
                      wordBreak: "keep-all",
                    }}
                  >
                    {notification.message || "알림 내용이 없습니다."}
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "#94A3B8",
                    }}
                  >
                    {formatNotificationTime(notification.createdAt)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderNotificationButton = () => (
    <div style={{ position: "relative" }} ref={notificationRef}>
      <button
        type="button"
        onClick={() => {
          setProfileOpen(false);
          setNotificationOpen((prev) => !prev);
        }}
        onMouseDown={(e) => e.currentTarget.blur()}
        style={{
          width: isMobile ? "34px" : "36px",
          height: isMobile ? "34px" : "36px",
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
          color: notificationOpen ? BRAND_COLOR : TEXT_BODY,
          position: "relative",
          transition: "color 0.18s ease, background-color 0.18s ease",
          WebkitTapHighlightColor: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = BRAND_COLOR;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = notificationOpen ? BRAND_COLOR : TEXT_BODY;
        }}
        aria-label="알림"
      >
        <GrNotification size={isMobile ? 18 : 20} />

        {safeUnreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: isMobile ? "1px" : "0px",
              right: isMobile ? "0px" : "1px",
              minWidth: safeUnreadCount > 9 ? "18px" : "15px",
              height: "15px",
              padding: safeUnreadCount > 9 ? "0 4px" : 0,
              borderRadius: "999px",
              background: "#EF4444",
              color: "#ffffff",
              border: "2px solid #ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: "900",
              lineHeight: 1,
              boxSizing: "border-box",
              pointerEvents: "none",
            }}
          >
            {safeUnreadCount > 99 ? "99+" : safeUnreadCount}
          </span>
        )}
      </button>

      {notificationOpen && renderNotificationDropdown()}
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: isMobile ? "60px" : "78px",
        background: PAGE_BG,
        color: "#111827",
      }}
    >
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
              <button
                type="button"
                onClick={goTop}
                onMouseDown={(e) => e.currentTarget.blur()}
                style={{
                  border: "none",
                  outline: "none",
                  background: "none",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer",
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
              </button>

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
                          hoveredTextButton === item.key
                            ? BRAND_COLOR
                            : TEXT_BODY,
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
                    color:
                      hoveredTextButton === "login" ? BRAND_COLOR : TEXT_BODY,
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
                  className="button-hover"
                  onClick={onGoCreate}
                  onMouseEnter={() => setHoveredPrimaryButton("guest-create")}
                  onMouseLeave={() => setHoveredPrimaryButton("")}
                  onMouseDown={(e) => e.currentTarget.blur()}
                  style={{
                    ...primaryButton,
                    padding: "0 20px",
                    minWidth: "118px",
                    background: BRAND_COLOR,
                    transform:
                      hoveredPrimaryButton === "guest-create"
                        ? "translateY(-1px)"
                        : "none",
                    boxShadow:
                      hoveredPrimaryButton === "guest-create"
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
                      background: "none",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
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

                  {profileOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "42px",
                        right: 0,
                        width: "210px",
                        backgroundColor: "#ffffff",
                        border: `1px solid ${CARD_BORDER}`,
                        borderRadius: "14px",
                        boxShadow: "0 14px 30px rgba(15, 23, 42, 0.08)",
                        padding: "10px",
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
                      <DropdownButton
                        onClick={() => closeAndRun(onGoMyRequests)}
                      >
                        내 요청 목록
                      </DropdownButton>
                      <DropdownButton
                        onClick={() => closeAndRun(onGoAllRequests)}
                      >
                        전체 요청 보기
                      </DropdownButton>
                      {(isWorker || isAdmin) && (
                        <DropdownButton
                          onClick={() => closeAndRun(onGoAssignedRequests)}
                        >
                          맡은 작업 보기
                        </DropdownButton>
                      )}
                      <DropdownButton
                        onClick={() => closeAndRun(onLogout)}
                        danger
                      >
                        로그아웃
                      </DropdownButton>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="button-hover"
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
                          background: "#F1F5F9",
                          color: BRAND_COLOR,
                          cursor: "pointer",
                          padding: 0,
                          fontWeight: "700",
                          fontSize: "12px",
                        }}
                      >
                        {String(displayName).slice(0, 1)}
                      </button>

                      {profileOpen && (
                        <div
                          style={{
                            position: "absolute",
                            top: "42px",
                            right: 0,
                            width: "210px",
                            backgroundColor: "#ffffff",
                            border: `1px solid ${CARD_BORDER}`,
                            borderRadius: "14px",
                            boxShadow: "0 14px 30px rgba(15, 23, 42, 0.08)",
                            padding: "10px",
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
                          <DropdownButton
                            onClick={() => closeAndRun(onGoMyRequests)}
                          >
                            내 요청 목록
                          </DropdownButton>
                          <DropdownButton
                            onClick={() => closeAndRun(onGoAllRequests)}
                          >
                            전체 요청 보기
                          </DropdownButton>
                          {(isWorker || isAdmin) && (
                            <DropdownButton
                              onClick={() => closeAndRun(onGoAssignedRequests)}
                            >
                              맡은 작업 보기
                            </DropdownButton>
                          )}
                          <DropdownButton
                            onClick={() => closeAndRun(onLogout)}
                            danger
                          >
                            로그아웃
                          </DropdownButton>
                        </div>
                      )}
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

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "28px 16px 24px" : "48px 24px 34px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: isMobile ? "22px" : "28px",
          }}
        >
          <h1
            style={{
              margin: "0 0 14px 0",
              fontSize: isMobile ? "30px" : "clamp(34px, 4vw, 52px)",
              lineHeight: "1.18",
              letterSpacing: isMobile ? "-0.8px" : "-1.4px",
              fontWeight: "800",
              color: TEXT_DARK,
            }}
          >
            어떤 유지보수 서비스가
            <br />
            필요하신가요?
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: isMobile ? "14px" : "15px",
              lineHeight: "1.85",
              color: TEXT_MUTED,
            }}
          >
            전기, 설비, 누수, 도어락, 장비 문제까지
            <br />
            필요한 수리를 한 곳에서 더 빠르게 요청하세요.
          </p>
        </div>

        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto 22px",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "56px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              border: `1px solid ${CARD_BORDER}`,
              boxShadow: "0 12px 24px rgba(15, 23, 42, 0.04)",
              display: "flex",
              alignItems: "center",
              padding: "0 18px",
              color: "#94A3B8",
              fontSize: "14px",
              fontWeight: "500",
              textAlign: "left",
            }}
          >
            어떤 유지보수가 필요하신가요?
          </div>

          <button
            type="button"
            className="button-hover"
            onClick={onGoAiRequest}
            onMouseEnter={() => setHoveredPrimaryButton("hero-ai")}
            onMouseLeave={() => setHoveredPrimaryButton("")}
            onMouseDown={(e) => e.currentTarget.blur()}
            style={{
              ...primaryButton,
              height: "56px",
              borderRadius: "16px",
              width: isMobile ? "100%" : "auto",
              padding: "0 22px",
              background: "#6846F5",
              transform:
                hoveredPrimaryButton === "hero-ai" && !isMobile
                  ? "translateY(-1px)"
                  : "none",
              boxShadow:
                hoveredPrimaryButton === "hero-ai" && !isMobile
                  ? "0 14px 28px rgba(104, 70, 245, 0.24)"
                  : "0 8px 20px rgba(104, 70, 245, 0.16)",
            }}
          >
            ✨ AI 견적 요청
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(4, 1fr)"
              : "repeat(8, minmax(0, 1fr))",
            gap: isMobile ? "12px" : "16px",
            maxWidth: "1080px",
            margin: "0 auto",
          }}
        >
          {categoryItems.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={onGoCreate}
              onMouseDown={(e) => e.currentTarget.blur()}
              style={{
                border: "none",
                outline: "none",
                background: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                padding: 0,
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <div
                style={{
                  width: isMobile ? "52px" : "58px",
                  height: isMobile ? "52px" : "58px",
                  borderRadius: "18px",
                  backgroundColor: item.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 18px rgba(47, 128, 237, 0.06)",
                }}
              >
                <img
                  src={getCategoryIcon(item.title)}
                  alt={item.title}
                  draggable="false"
                  style={{
                    width: isMobile ? "24px" : "28px",
                    height: isMobile ? "24px" : "28px",
                    objectFit: "contain",
                    display: "block",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                />
              </div>

              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#334155",
                }}
              >
                {item.title}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "0 16px 30px" : "0 24px 42px",
        }}
      >
        <SectionHeader
          title="지금 많이 찾는 요청"
          desc="자주 등록되는 요청을 더 빠르게 확인하고 바로 접수할 수 있습니다."
          isMobile={isMobile}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(4, minmax(0, 1fr))",
            gap: "16px",
          }}
        >
          {featuredRequests.map((card, index) => (
            <div
              key={card.title}
              style={{
                borderRadius: "24px",
                overflow: "hidden",
                backgroundColor: "#ffffff",
                border: `1px solid ${CARD_BORDER}`,
                boxShadow: CARD_SHADOW,
              }}
            >
              <div
                style={{
                  minHeight: "168px",
                  padding: "20px",
                  background: card.bg,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "inline-block",
                      padding: "7px 10px",
                      borderRadius: "999px",
                      backgroundColor: "rgba(255,255,255,0.78)",
                      fontSize: "11px",
                      fontWeight: "900",
                      color: "#475569",
                      marginBottom: "14px",
                    }}
                  >
                    {card.eyebrow}
                  </div>

                  <div
                    style={{
                      fontSize: "18px",
                      lineHeight: "1.4",
                      fontWeight: "800",
                      letterSpacing: "-0.4px",
                      color: TEXT_DARK,
                      marginBottom: "8px",
                    }}
                  >
                    {card.title}
                  </div>

                  <div
                    style={{
                      fontSize: "14px",
                      lineHeight: "1.75",
                      color: "#475569",
                    }}
                  >
                    {card.subtitle}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <div
                    style={{
                      width: isMobile ? "52px" : "58px",
                      height: isMobile ? "52px" : "58px",
                      borderRadius: "18px",
                      background: ICON_BG,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 8px 18px rgba(15, 23, 42, 0.05)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <img
                      src={getCategoryIcon(card.iconKey)}
                      alt={card.title}
                      draggable="false"
                      style={{
                        width: isMobile ? "24px" : "28px",
                        height: isMobile ? "24px" : "28px",
                        objectFit: "contain",
                        display: "block",
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: "16px 18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    color: TEXT_MUTED,
                  }}
                >
                  요청 바로가기
                </span>

                <button
                  type="button"
                  onClick={onGoCreate}
                  onMouseEnter={() => setHoveredGhostButton(`feature-${index}`)}
                  onMouseLeave={() => setHoveredGhostButton("")}
                  onMouseDown={(e) => e.currentTarget.blur()}
                  style={{
                    ...ghostButton,
                    padding: "9px 14px",
                    fontSize: "13px",
                    borderColor:
                      hoveredGhostButton === `feature-${index}`
                        ? "#BFD7FF"
                        : BUTTON_BORDER,
                    color:
                      hoveredGhostButton === `feature-${index}`
                        ? BRAND_COLOR
                        : TEXT_BODY,
                    backgroundColor:
                      hoveredGhostButton === `feature-${index}`
                        ? "#F8FBFF"
                        : "#ffffff",
                  }}
                >
                  보기
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="service-intro"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "0 16px 32px" : "0 24px 46px",
        }}
      >
        <SectionHeader
          title="서비스 소개"
          desc="요청 등록부터 작업 수락, 상태 확인까지 이어지는 흐름을 간단하게 사용할 수 있습니다."
          isMobile={isMobile}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
            gap: "16px",
          }}
        >
          {processCards.map((item) => (
            <div
              key={item.step}
              style={{
                backgroundColor: "#ffffff",
                border: `1px solid ${CARD_BORDER}`,
                borderRadius: "24px",
                padding: "24px",
                boxShadow: CARD_SHADOW,
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "14px",
                  background: BRAND_COLOR,
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: "900",
                  marginBottom: "18px",
                  boxShadow: "0 10px 22px rgba(47, 128, 237, 0.18)",
                }}
              >
                {item.step}
              </div>

              <h3
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "18px",
                  fontWeight: "800",
                  letterSpacing: "-0.3px",
                  color: TEXT_DARK,
                  lineHeight: "1.4",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: "1.85",
                  color: TEXT_MUTED,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="community-preview"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "0 16px 76px" : "0 24px 86px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "flex-end",
            flexDirection: isMobile ? "column" : "row",
            gap: "16px",
            marginBottom: "22px",
          }}
        >
          <SectionHeader
            title="커뮤니티"
            desc="요청 이야기, 작업 팁, 이용 후기를 함께 보고 서비스 흐름을 이해할 수 있습니다."
            isMobile={isMobile}
            noMargin
          />

          <button
            type="button"
            onClick={() => moveToSection("community-preview")}
            onMouseEnter={() => setHoveredGhostButton("community-more")}
            onMouseLeave={() => setHoveredGhostButton("")}
            onMouseDown={(e) => e.currentTarget.blur()}
            style={{
              ...ghostButton,
              borderColor:
                hoveredGhostButton === "community-more"
                  ? "#BFD7FF"
                  : BUTTON_BORDER,
              color:
                hoveredGhostButton === "community-more"
                  ? BRAND_COLOR
                  : TEXT_BODY,
              backgroundColor:
                hoveredGhostButton === "community-more"
                  ? "#F8FBFF"
                  : "#ffffff",
            }}
          >
            커뮤니티 더 보기
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
            gap: "16px",
          }}
        >
          {storyCards.map((item) => (
            <div
              key={item.title}
              style={{
                backgroundColor: "#ffffff",
                border: `1px solid ${CARD_BORDER}`,
                borderRadius: "24px",
                padding: "24px",
                boxShadow: CARD_SHADOW,
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "7px 11px",
                  borderRadius: "999px",
                  backgroundColor: BRAND_SOFT,
                  color: BRAND_COLOR,
                  fontSize: "11px",
                  fontWeight: "900",
                  marginBottom: "14px",
                }}
              >
                {item.badge}
              </div>

              <h3
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "18px",
                  fontWeight: "800",
                  letterSpacing: "-0.3px",
                  color: TEXT_DARK,
                  lineHeight: "1.4",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: "1.9",
                  color: TEXT_MUTED,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer
        style={{
          borderTop: `1px solid ${CARD_BORDER}`,
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: isMobile ? "28px 16px 34px" : "34px 24px 40px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1.5fr 1fr 1fr",
              gap: "24px",
              alignItems: "start",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "14px",
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

                <div
                  style={{
                    fontSize: isMobile ? "22px" : "23px",
                    fontWeight: "800",
                    color: BRAND_COLOR,
                    letterSpacing: "-0.5px",
                    whiteSpace: "nowrap",
                  }}
                >
                  뚝딱
                </div>
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: "1.9",
                  color: TEXT_MUTED,
                  maxWidth: "360px",
                }}
              >
                유지보수 요청을 더 간단하고 빠르게 접수하고 상태를 체계적으로
                관리하기 위한 서비스 플랫폼
              </p>
            </div>

            <FooterColumn
              title="메뉴"
              items={["홈", "서비스 소개", "커뮤니티"]}
            />
            <FooterColumn
              title="서비스"
              items={["요청 접수", "상태 확인", "담당자 연결"]}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}

function DropdownButton({ children, onClick, danger = false }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onMouseDown={(e) => e.currentTarget.blur()}
      onBlur={() => setIsHover(false)}
      style={{
        width: "100%",
        textAlign: "left",
        border: "none",
        outline: "none",
        boxShadow: "none",
        WebkitTapHighlightColor: "transparent",
        background: danger
          ? isHover
            ? "#FFE9E9"
            : "#FFF5F5"
          : isHover
          ? "#F8FBFF"
          : "transparent",
        padding: "12px 12px",
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: "700",
        cursor: "pointer",
        color: danger ? "#EF4444" : isHover ? "#2F80ED" : "#1E293B",
        marginTop: danger ? "6px" : 0,
        transition: "all 0.18s ease",
      }}
    >
      {children}
    </button>
  );
}

function SectionHeader({ title, desc, isMobile, noMargin = false }) {
  return (
    <div
      style={{
        marginBottom: noMargin ? 0 : "22px",
      }}
    >
      <h2
        style={{
          margin: "0 0 10px 0",
          fontSize: isMobile ? "26px" : "30px",
          fontWeight: "800",
          letterSpacing: "-0.8px",
          color: "#0F172A",
          lineHeight: "1.25",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          margin: 0,
          fontSize: "15px",
          lineHeight: "1.8",
          color: "#64748B",
          maxWidth: "680px",
        }}
      >
        {desc}
      </p>
    </div>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <div
        style={{
          fontSize: "14px",
          fontWeight: "800",
          color: "#111827",
          marginBottom: "12px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {items.map((item) => (
          <div
            key={item}
            style={{
              fontSize: "14px",
              color: "#64748B",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
