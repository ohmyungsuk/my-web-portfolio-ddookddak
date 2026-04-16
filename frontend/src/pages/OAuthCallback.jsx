import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient.js";

function OAuthCallback() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("로그인 정보를 확인하는 중입니다...");

  useEffect(() => {
    let mounted = true;

    const handleOAuthCallback = async () => {
      try {
        const href = window.location.href;

        // HashRouter(#/oauth/callback) + Supabase OAuth(#access_token=...)
        // 조합 때문에 access_token을 직접 파싱
        const tokenMarker = "#access_token=";
        const tokenStart = href.indexOf(tokenMarker);

        if (tokenStart !== -1) {
          const tokenString = href.slice(tokenStart + 1); // access_token=...&refresh_token=...
          const params = new URLSearchParams(tokenString);

          const access_token = params.get("access_token");
          const refresh_token = params.get("refresh_token");

          if (access_token && refresh_token) {
            const { error: sessionError } = await supabase.auth.setSession({
              access_token,
              refresh_token,
            });

            if (sessionError) {
              console.error("세션 저장 오류:", sessionError);
              if (mounted) {
                setMessage("로그인 세션 저장 중 오류가 발생했습니다.");
                setTimeout(() => navigate("/login"), 1500);
              }
              return;
            }
          }
        }

        // 혹시 code 방식이면 이것도 처리
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");

        if (code) {
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);

          if (exchangeError) {
            console.error("코드 세션 교환 오류:", exchangeError);
          }
        }

        await new Promise((resolve) => setTimeout(resolve, 400));

        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("세션 확인 오류:", error);
          if (mounted) {
            setMessage("로그인 처리 중 오류가 발생했습니다.");
            setTimeout(() => navigate("/login"), 1500);
          }
          return;
        }

        if (!session?.user) {
          if (mounted) {
            setMessage("세션이 없습니다. 다시 로그인해주세요.");
            setTimeout(() => navigate("/login"), 1500);
          }
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
            (user.email ? user.email.split("@")[0] : "사용자"),
          nickname:
            user.user_metadata?.nickname ||
            user.user_metadata?.name ||
            "사용자",
          provider: user.app_metadata?.provider || "oauth",
        };

        localStorage.setItem("loginUser", JSON.stringify(loginUser));
        localStorage.setItem("role", "user");

        if (mounted) {
          setMessage("로그인 성공! 메인으로 이동합니다.");
          setTimeout(() => navigate("/"), 800);
        }
      } catch (err) {
        console.error("OAuth 콜백 처리 오류:", err);
        if (mounted) {
          setMessage("로그인 처리 중 문제가 생겼습니다.");
          setTimeout(() => navigate("/login"), 1500);
        }
      }
    };

    handleOAuthCallback();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eef2f7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          borderRadius: "24px",
          padding: "30px 28px",
          boxShadow: "0 12px 40px rgba(15, 23, 42, 0.08)",
          border: "1px solid #edf1f6",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            margin: "0 0 12px",
            fontSize: "18px",
            fontWeight: "800",
            color: "#0f172a",
            letterSpacing: "-0.3px",
          }}
        >
          소셜 로그인
        </h2>

        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: "#64748b",
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