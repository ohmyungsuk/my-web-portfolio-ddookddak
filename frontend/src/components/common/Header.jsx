import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const savedUser = localStorage.getItem("loginUser");
  const loginUser = savedUser ? JSON.parse(savedUser) : null;

  const handleGoToCreate = () => {
    navigate("/requests/new");
  };

  const handleGoToNotifications = () => {
    alert("알림 기능은 아직 준비 중입니다.");
  };

  const handleGoToProfile = () => {
    navigate("/requests/my");
  };

  return (
    <header
      style={{
        width: "100%",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          height: "80px",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        {/* 왼쪽: 로고 + 메뉴 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "36px",
            minWidth: 0,
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #2F80ED, #1C63E0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontWeight: "800",
                fontSize: "18px",
                boxShadow: "0 10px 20px rgba(59, 130, 246, 0.18)",
              }}
            >
              ㄸ
            </div>

            <span
              style={{
                fontSize: "30px",
                fontWeight: "800",
                color: "#2F80ED",
                letterSpacing: "-0.5px",
                lineHeight: 1,
              }}
            >
              뚝딱
            </span>
          </Link>

          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#111827",
                fontSize: "17px",
                fontWeight: "700",
                whiteSpace: "nowrap",
              }}
            >
              홈
            </Link>

            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#111827",
                fontSize: "17px",
                fontWeight: "700",
                whiteSpace: "nowrap",
              }}
            >
              서비스 소개
            </Link>

            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#111827",
                fontSize: "17px",
                fontWeight: "700",
                whiteSpace: "nowrap",
              }}
            >
              커뮤니티
            </Link>
          </nav>
        </div>

        {/* 오른쪽: 알림 + 요청등록 + 프로필 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            flexShrink: 0,
          }}
        >
          <button
            type="button"
            onClick={handleGoToNotifications}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "9999px",
              border: "1px solid #e5e7eb",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              padding: 0,
            }}
            aria-label="알림"
            title="알림"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z"
                fill="#374151"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleGoToCreate}
            style={{
              border: "none",
              background: "linear-gradient(135deg, #2F80ED, #1C63E0)",
              color: "#ffffff",
              height: "48px",
              padding: "0 22px",
              borderRadius: "14px",
              fontSize: "16px",
              fontWeight: "800",
              cursor: "pointer",
              boxShadow: "0 12px 24px rgba(59, 130, 246, 0.22)",
              whiteSpace: "nowrap",
            }}
          >
            요청 등록
          </button>

          <button
            type="button"
            onClick={handleGoToProfile}
            style={{
              height: "50px",
              padding: "0 16px 0 10px",
              borderRadius: "9999px",
              border: "1px solid #dbe2ea",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, #2F80ED, #1C63E0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontWeight: "800",
                fontSize: "15px",
                flexShrink: 0,
              }}
            >
              {loginUser?.username?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                lineHeight: 1.1,
              }}
            >
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "800",
                  color: "#111827",
                  whiteSpace: "nowrap",
                }}
              >
                {loginUser?.username || "게스트"}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                }}
              >
                내 메뉴
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;