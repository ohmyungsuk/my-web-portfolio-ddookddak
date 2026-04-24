import MyPage from "./pages/MyPage";
import AdminPage from "./pages/AdminPage";
import AdminRequestsPage from "./pages/AdminRequestsPage";
import RequestEditPage from "./pages/RequestEditPage";
import AdminUsersPage from "./pages/AdminUsersPage";
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
  const [loginUser, setLoginUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!session?.user;

  useEffect(() => {
  let mounted = true;

  const syncLoginUser = async (newSession) => {
    if (!mounted) return;

    setSession(newSession);

    if (!newSession?.user) {
      localStorage.removeItem("loginUser");
      localStorage.removeItem("role");
      setAuthReady(true);
      return;
    }

    const user = newSession.user;

    const safeName =
      user.user_metadata?.name ||
      user.user_metadata?.full_name ||
      user.user_metadata?.preferred_username ||
      user.user_metadata?.nickname ||
      (user.email ? user.email.split("@")[0] : "사용자");

    const safeUsername =
      user.user_metadata?.preferred_username ||
      user.user_metadata?.nickname ||
      user.user_metadata?.name ||
      user.user_metadata?.full_name ||
      (user.email ? user.email.split("@")[0] : "user");

    let profile = null;

    try {
      const { data } = await supabase
        .from("profiles")
        .select("id, username, name, role")
        .eq("id", user.id)
        .maybeSingle();

      profile = data || null;
    } catch (error) {
      console.error("프로필 조회 실패:", error);
    }

    const finalRole = profile?.role || "user";

    const loginUser = {
      id: user.id,
      supabaseUserId: user.id,
      email: user.email || "",
      name: profile?.name || safeName,
      username: profile?.username || safeUsername,
      nickname: profile?.name || safeName,
      provider: user.app_metadata?.provider || "email",
      role: finalRole,
    };

    localStorage.setItem("loginUser", JSON.stringify(loginUser));
    localStorage.setItem("role", finalRole);
    setLoginUser(loginUser);
    setAuthReady(true);
  };

  supabase.auth.getSession().then(({ data }) => {
    syncLoginUser(data.session);
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, newSession) => {
    syncLoginUser(newSession);
  });

  return () => {
    mounted = false;
    subscription.unsubscribe();
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
      "/admin",
      "/admin/requests",
      "/admin/users",
    ];

    const isDetailPage =
      location.pathname.startsWith("/requests/") &&
      !location.pathname.startsWith("/requests/edit/");
    const isEditPage = location.pathname.startsWith("/requests/edit/");

    const isProtected =
      protectedPages.includes(location.pathname) || isDetailPage || isEditPage;

    if (!isLoggedIn && isProtected) {
      navigate("/login", { replace: true });
      return;
    }

    if (isLoggedIn && authPages.includes(location.pathname)) {
      navigate("/", { replace: true });
    }
  }, [authReady, isLoggedIn, location.pathname, navigate]);

  const userRole = useMemo(() => {
    const value = String(loginUser?.role || "").trim().toLowerCase();
    if (value === "admin") return "admin";
    if (value === "worker") return "worker";
    return "user";
  }, [loginUser]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("loginUser");
    setLoginUser(null);
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
          onGoCreate={() =>
            isLoggedIn ? navigate("/requests/new") : navigate("/login")
          }
          onGoMyPage={() => navigate("/mypage")}
          onGoMyRequests={() => navigate("/requests/my")}
          onGoAllRequests={() => navigate("/requests/all")}
          onGoAssignedRequests={() => navigate("/requests/assigned")}
          onLogout={handleLogout}
        />
      )}

      <Routes>
        <Route
          path="/admin/requests"
          element={
            <RequireRole isLoggedIn={isLoggedIn} userRole={userRole} allow={["admin"]}>
              <AdminRequestsPage />
            </RequireRole>
          }
        />

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
            path="/admin/users"
            element={
              <RequireAuth isLoggedIn={isLoggedIn}>
                <AdminUsersPage />
              </RequireAuth>
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
          path="/admin/users"
          element={
            <RequireAuth isLoggedIn={isLoggedIn}>
              <AdminUsersPage />
            </RequireAuth>
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
            <RequireRole
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              allow={["worker", "admin"]}
            >
              <MyAssignedRequestsPage
                onGoHome={() => navigate("/")}
                onClickRequest={(request) =>
                  navigate(`/requests/${request.id}`, {
                    state: { request, from: "/requests/assigned" },
                  })
                }
              />
            </RequireRole>
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

        <Route
          path="/admin"
          element={
            <RequireRole isLoggedIn={isLoggedIn} userRole={userRole} allow={["admin"]}>
              <AdminPage />
            </RequireRole>
          }
        />

        <Route
          path="/requests/edit/:id"
          element={
            <RequireAuth isLoggedIn={isLoggedIn}>
              <RequestEditPage />
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

function RequireRole({ isLoggedIn, userRole, allow, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!allow.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default App;
