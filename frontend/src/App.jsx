import MyPage from "./pages/MyPage";
import { useEffect, useMemo, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { supabase } from "./supabaseClient.js";

import Header from "./components/common/Header";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RequestCreateFlow from "./pages/RequestCreateFlow";
import MyRequestsPage from "./pages/MyRequestsPage";
import AllRequestsPage from "./pages/AllRequestsPage";
import MyAssignedRequestsPage from "./pages/MyAssignedRequestsPage";
import RequestDetailPage from "./pages/RequestDetailPage";
import OAuthCallback from "./pages/OAuthCallback";


function App() {
  const [session, setSession] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!session?.user;

  useEffect(() => {
    let mounted = true;

    const syncLoginUser = (newSession) => {
      if (!mounted) return;

      setSession(newSession);

      if (!newSession?.user) {
        localStorage.removeItem("loginUser");
        setAuthReady(true);
        return;
      }

      const user = newSession.user;
      const displayName =
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "사용자";

      const loginUser = {
        id: user.id,
        supabaseUserId: user.id,
        email: user.email,
        name: displayName,
        username: displayName,
      };

      localStorage.setItem("loginUser", JSON.stringify(loginUser));
      setAuthReady(true);
    };

    supabase.auth.getSession().then(({ data }) => {
      syncLoginUser(data.session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        syncLoginUser(newSession);
      }
    );

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!authReady) return;

    const authPages = ["/login", "/signup"];
    const protectedPages = [
      "/requests/new",
      "/requests/my",
      "/requests/all",
      "/requests/assigned",
      "/mypage",
    ];

    const isDetailPage = location.pathname.startsWith("/requests/");
    const isProtected =
      protectedPages.includes(location.pathname) || isDetailPage;

    if (!isLoggedIn && isProtected) {
      navigate("/login", { replace: true });
      return;
    }

    if (isLoggedIn && authPages.includes(location.pathname)) {
      navigate("/", { replace: true });
    }
  }, [authReady, isLoggedIn, location.pathname, navigate]);

  const loginUser = useMemo(() => {
    const savedUser = localStorage.getItem("loginUser");
    return savedUser ? JSON.parse(savedUser) : null;
  }, [session]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("loginUser");
    navigate("/", { replace: true });
  };

  if (!authReady) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <p className="auth-badge">뚝딱</p>
            <h1>불러오는 중...</h1>
            <p className="auth-desc">로그인 정보를 확인하고 있습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  const hideHeader = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideHeader && (
        <Header
          isLoggedIn={isLoggedIn}
          loginUser={loginUser}
          onGoHome={() => navigate("/")}
          onGoLogin={() => navigate("/login")}
          onGoSignup={() => navigate("/signup")}
          onGoCreate={() => (isLoggedIn ? navigate("/requests/new") : navigate("/login"))}
          onGoMyPage={() => navigate("/mypage")}
          onGoMyRequests={() => navigate("/requests/my")}
          onGoAllRequests={() => navigate("/requests/all")}
          onGoAssignedRequests={() => navigate("/requests/assigned")}
          onLogout={handleLogout}
        />
      )}
      <Routes>

      <Route
        path="/mypage"
        element={
          <RequireAuth isLoggedIn={isLoggedIn}>
            <MyPage
              loginUser={loginUser}
              onGoHome={() => navigate("/")}
              onGoMyRequests={() => navigate("/requests/my")}
              onGoAllRequests={() => navigate("/requests/all")}
              onGoAssignedRequests={() => navigate("/requests/assigned")}
              onLogout={handleLogout}
            />
          </RequireAuth>
        }
      />

      <Route
        path="/"
        element={
          <LandingPage
          isLoggedIn={isLoggedIn}
          loginUser={loginUser}
          onGoLogin={() => navigate("/login")}
          onGoSignup={() => navigate("/signup")}
          onGoCreate={() =>
            isLoggedIn ? navigate("/requests/new") : navigate("/login")
          }
          onGoMyPage={() => navigate("/mypage")}
          onGoMyRequests={() => navigate("/requests/my")}
          onGoAllRequests={() => navigate("/requests/all")}
          onGoAssignedRequests={() => navigate("/requests/assigned")}
          onLogout={handleLogout}
        />
        }
      />

      <Route
        path="/login"
        element={
          isLoggedIn ? (
            <Navigate to="/" replace />
          ) : (
            <Login
              onSwitchToSignup={() => navigate("/signup")}
              onLoginSuccess={() => navigate("/", { replace: true })}
            />
          )
        }
      />

      <Route
        path="/signup"
        element={
          isLoggedIn ? (
            <Navigate to="/" replace />
          ) : (
            <Signup onSwitchToLogin={() => navigate("/login")} />
          )
        }
      />

      <Route path="/oauth/callback" element={<OAuthCallback />} />

      <Route
        path="/requests/new"
        element={
          <RequireAuth isLoggedIn={isLoggedIn}>
            <RequestCreateFlow />
          </RequireAuth>
        }
      />

      <Route
        path="/requests/my"
        element={
          <RequireAuth isLoggedIn={isLoggedIn}>
            <MyRequestsPage
              onGoHome={() => navigate("/")}
              onClickRequest={(request) =>
                navigate(`/requests/${request.id}`, {
                  state: { request, from: "/requests/my" },
                })
              }
            />
          </RequireAuth>
        }
      />

      <Route
        path="/requests/all"
        element={
          <RequireAuth isLoggedIn={isLoggedIn}>
            <AllRequestsPage
              onGoHome={() => navigate("/")}
              onClickRequest={(request) =>
                navigate(`/requests/${request.id}`, {
                  state: { request, from: "/requests/all" },
                })
              }
            />
          </RequireAuth>
        }
      />

      <Route
        path="/requests/assigned"
        element={
          <RequireAuth isLoggedIn={isLoggedIn}>
            <MyAssignedRequestsPage
              onGoHome={() => navigate("/")}
              onClickRequest={(request) =>
                navigate(`/requests/${request.id}`, {
                  state: { request, from: "/requests/assigned" },
                })
              }
            />
          </RequireAuth>
        }
      />

      <Route
        path="/requests/:id"
        element={
          <RequireAuth isLoggedIn={isLoggedIn}>
            <RequestDetailPage onGoHome={() => navigate("/")} />
          </RequireAuth>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
}

function RequireAuth({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default App;