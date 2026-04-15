import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function OAuthCallback() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("로그인 정보를 확인하는 중입니다...");

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("세션 확인 오류:", error.message);
          setMessage("로그인 처리 중 오류가 발생했습니다.");
          setTimeout(() => navigate("/login"), 1500);
          return;
        }

        const session = data?.session;

        if (!session?.user) {
          setMessage("세션이 없습니다. 다시 로그인해주세요.");
          setTimeout(() => navigate("/login"), 1500);
          return;
        }

        const user = session.user;

        const loginUser = {
          id: user.id,
          email: user.email || "",
          username:
            user.user_metadata?.preferred_username ||
            user.user_metadata?.name ||
            user.user_metadata?.full_name ||
            user.user_metadata?.nickname ||
            "카카오사용자",
          nickname:
            user.user_metadata?.nickname ||
            user.user_metadata?.name ||
            "카카오사용자",
          provider: user.app_metadata?.provider || "kakao",
        };

        localStorage.setItem("loginUser", JSON.stringify(loginUser));
        localStorage.setItem("role", "user");

        setMessage("로그인 성공! 메인으로 이동합니다.");
        setTimeout(() => navigate("/"), 1000);
      } catch (err) {
        console.error("OAuth 콜백 처리 오류:", err);
        setMessage("로그인 처리 중 문제가 생겼습니다.");
        setTimeout(() => navigate("/login"), 1500);
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "32px 24px",
          boxShadow: "0 12px 40px rgba(15, 23, 42, 0.08)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            margin: "0 0 12px",
            fontSize: "24px",
            fontWeight: "700",
            color: "#111827",
          }}
        >
          카카오 로그인
        </h2>

        <p
          style={{
            margin: 0,
            fontSize: "15px",
            color: "#6b7280",
            lineHeight: "1.6",
          }}
        >
          {message}
        </p>
      </div>
    </div>
  );
}

export default OAuthCallback;