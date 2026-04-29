import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { supabase } from "./supabaseClient.js";
import useNotificationSocket from "./hooks/useNotificationSocket";

import Header from "./components/common/Header";

import LandingPage from "./pages/LandingPage";
import CommunityPage from "./pages/CommunityPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OAuthCallback from "./pages/OAuthCallback";

import MyPage from "./pages/MyPage";

import RequestCreateFlow from "./pages/RequestCreateFlow";
import MyRequestsPage from "./pages/MyRequestsPage";
import AllRequestsPage from "./pages/AllRequestsPage";
import MyAssignedRequestsPage from "./pages/MyAssignedRequestsPage";
import RequestDetailPage from "./pages/RequestDetailPage";
import RequestEditPage from "./pages/RequestEditPage";
import AiRequestPage from "./pages/AiRequestPage";

import AdminPage from "./pages/AdminPage";
import AdminRequestsPage from "./pages/AdminRequestsPage";
import AdminUsersPage from "./pages/AdminUsersPage";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

function App() {
  const [session, setSession] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [loginUser, setLoginUser] = useState(null);

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!session?.user;

  const getUserId = useCallback((user) => {
    return user?.id || user?.supabaseUserId || "";
  }, []);

  const loadNotifications = useCallback(async (userId) => {
    if (!userId) return;

    try {
      const [listResponse, countResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/notifications?recipientId=${userId}`),
        fetch(
          `${API_BASE_URL}/api/notifications/unread-count?recipientId=${userId}`
        ),
      ]);

      if (!listResponse.ok) {
        throw new Error("알림 목록 조회 실패");
      }

      if (!countResponse.ok) {
        throw new Error("안 읽은 알림 개수 조회 실패");
      }

      const listData = await listResponse.json();
      const countData = await countResponse.json();

      setNotifications(Array.isArray(listData) ? listData : []);
      setUnreadCount(Number(countData) || 0);
    } catch (error) {
      console.error("알림 조회 실패:", error);
    }
  }, []);

  const handleNotificationReceived = useCallback((notification) => {
    console.log("App에서 받은 알림:", notification);

    setNotifications((prev) => {
      const exists = prev.some((item) => item.id === notification.id);

      if (exists) {
        return prev;
      }

      return [notification, ...prev].slice(0, 50);
    });

    if (!notification.read) {
      setUnreadCount((prev) => prev + 1);
    }
  }, []);

  useNotificationSocket(loginUser, handleNotificationReceived);

  useEffect(() => {
    const userId = getUserId(loginUser);

    if (!userId) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    loadNotifications(userId);
  }, [loginUser, getUserId, loadNotifications]);

  const markNotificationAsRead = useCallback(
    async (notification) => {
      const userId = getUserId(loginUser);

      if (!userId || !notification?.id) return;

      const moveTarget = notification.targetUrl;

      if (notification.read) {
        if (moveTarget) {
          navigate(moveTarget);
        }
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/notifications/${notification.id}/read?recipientId=${userId}`,
          {
            method: "PATCH",
          }
        );

        if (!response.ok) {
          throw new Error("알림 읽음 처리 실패");
        }

        setNotifications((prev) =>
          prev.map((item) =>
            item.id === notification.id
              ? {
                  ...item,
                  read: true,
                  readAt: new Date().toISOString(),
                }
              : item
          )
        );

        setUnreadCount((prev) => Math.max(prev - 1, 0));

        if (moveTarget) {
          navigate(moveTarget);
        }
      } catch (error) {
        console.error("알림 읽음 처리 실패:", error);
      }
    },
    [loginUser, getUserId, navigate]
  );

  const markAllNotificationsAsRead = useCallback(async () => {
    const userId = getUserId(loginUser);

    if (!userId) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/notifications/read-all?recipientId=${userId}`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("전체 알림 읽음 처리 실패");
      }

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          read: true,
          readAt: item.readAt || new Date().toISOString(),
        }))
      );

      setUnreadCount(0);
    } catch (error) {
      console.error("전체 알림 읽음 처리 실패:", error);
    }
  }, [loginUser, getUserId]);

  useEffect(() => {
    let mounted = true;

    const syncLoginUser = async (newSession) => {
      if (!mounted) return;

      setSession(newSession);

      if (!newSession?.user) {
        localStorage.removeItem("loginUser");
        localStorage.removeItem("role");
        setLoginUser(null);
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
        const { data, error } = await supabase
          .from("profiles")
          .select("id, username, name, role")
          .eq("id", user.id)
          .maybeSingle();

        if (error) {
          console.error("프로필 조회 실패:", error);
        }

        profile = data || null;
      } catch (error) {
        console.error("프로필 조회 실패:", error);
      }

      const finalRole = profile?.role || "user";
      const avatarUrl =
        profile?.avatar_url ||
        user.user_metadata?.avatar_url ||
        user.user_metadata?.picture ||
        user.user_metadata?.photo_url ||
        "";

      const nextLoginUser = {
        id: user.id,
        supabaseUserId: user.id,
        email: user.email || "",
        name: profile?.name || safeName,
        username: profile?.username || safeUsername,
        nickname: profile?.name || safeName,
        avatarUrl,
        provider: user.app_metadata?.provider || "email",
        role: finalRole,
      };

      localStorage.setItem("loginUser", JSON.stringify(nextLoginUser));
      localStorage.setItem("role", finalRole);

      setLoginUser(nextLoginUser);
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
      "/requests/ai",
      "/requests/my",
      "/requests/all",
      "/requests/assigned",
      "/mypage",
      "/admin",
      "/admin/requests",
      "/admin/users",
    ];

    const isRequestDetailPage =
      location.pathname.startsWith("/requests/") &&
      !location.pathname.startsWith("/requests/edit/") &&
      !protectedPages.includes(location.pathname);

    const isRequestEditPage = location.pathname.startsWith("/requests/edit/");

    const isProtectedPage =
      protectedPages.includes(location.pathname) ||
      isRequestDetailPage ||
      isRequestEditPage;

    if (!isLoggedIn && isProtectedPage) {
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
    localStorage.removeItem("role");

    setLoginUser(null);
    setNotifications([]);
    setUnreadCount(0);

    navigate("/", { replace: true });
  };

  if (!authReady) {
    return <div style={{ minHeight: "100vh", background: "#fff" }} />;
  }

  const hideHeader = ["/login", "/signup"].includes(location.pathname);

  const notificationProps = {
    notifications,
    unreadCount,
    onReadNotification: markNotificationAsRead,
    onReadAllNotifications: markAllNotificationsAsRead,
  };

  return (
    <>
      {!hideHeader && (
        <Header
          isLoggedIn={isLoggedIn}
          loginUser={loginUser}
          {...notificationProps}
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
          onGoCommunity={(postId) => {
            if (postId) {
              navigate("/community");
              setTimeout(() => navigate(`/community?post=${postId}`), 0);
              return;
            }
            navigate("/community");
          }}
          onLogout={handleLogout}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              isLoggedIn={isLoggedIn}
              loginUser={loginUser}
              {...notificationProps}
              onGoLogin={() => navigate("/login")}
              onGoSignup={() => navigate("/signup")}
              onGoCreate={() =>
                isLoggedIn ? navigate("/requests/new") : navigate("/login")
              }
              onGoAiRequest={() =>
                isLoggedIn ? navigate("/requests/ai") : navigate("/login")
              }
              onGoMyPage={() => navigate("/mypage")}
              onGoMyRequests={() => navigate("/requests/my")}
              onGoAllRequests={() => navigate("/requests/all")}
              onGoAssignedRequests={() => navigate("/requests/assigned")}
              onGoCommunity={(postId) => {
                if (postId) {
                  navigate("/community");
                  setTimeout(() => navigate(`/community?post=${postId}`), 0);
                  return;
                }
                navigate("/community");
              }}
              onLogout={handleLogout}
            />
          }
        />

        <Route path="/community" element={<CommunityPage />} />

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
          path="/requests/new"
          element={
            <RequireAuth isLoggedIn={isLoggedIn}>
              <RequestCreateFlow />
            </RequireAuth>
          }
        />

        <Route
          path="/requests/ai"
          element={
            <RequireAuth isLoggedIn={isLoggedIn}>
              <AiRequestPage loginUser={loginUser} />
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
          path="/requests/edit/:id"
          element={
            <RequireAuth isLoggedIn={isLoggedIn}>
              <RequestEditPage />
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

        <Route
          path="/admin"
          element={
            <RequireRole
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              allow={["admin"]}
            >
              <AdminPage />
            </RequireRole>
          }
        />

        <Route
          path="/admin/requests"
          element={
            <RequireRole
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              allow={["admin"]}
            >
              <AdminRequestsPage />
            </RequireRole>
          }
        />

        <Route
          path="/admin/users"
          element={
            <RequireRole
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              allow={["admin"]}
            >
              <AdminUsersPage />
            </RequireRole>
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
