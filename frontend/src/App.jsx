import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient.js";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import RequestCreatePage from "./pages/RequestCreatePage";
import MyRequestsPage from "./pages/MyRequestsPage";
import AllRequestsPage from "./pages/AllRequestsPage";
import MyAssignedRequestsPage from "./pages/MyAssignedRequestsPage";
import RequestDetailPage from "./pages/RequestDetailPage";

function App() {
  const [session, setSession] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState("");
  const [currentPage, setCurrentPage] = useState("landing");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [previousPage, setPreviousPage] = useState("home");

  const syncBackendUser = async (user) => {
    const response = await fetch("http://localhost:8080/users/supabase-sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        name: user.user_metadata?.name || user.email?.split("@")[0] || "사용자",
      }),
    });

    const text = await response.text();

    if (!response.ok) {
      throw new Error(`백엔드 사용자 동기화 실패: ${response.status} / ${text}`);
    }

    return JSON.parse(text);
  };

  useEffect(() => {
    let mounted = true;

    const syncLoginUser = async (newSession) => {
      if (!mounted) return;

      setSession(newSession);
      setAuthError("");

      if (!newSession?.user) {
        localStorage.removeItem("loginUser");
        setAuthReady(true);
        return;
      }

      setAuthReady(false);

      try {
        const backendUser = await syncBackendUser(newSession.user);

        if (!mounted) return;

        const displayName =
          backendUser.nickname ||
          backendUser.name ||
          backendUser.username ||
          newSession.user.user_metadata?.name ||
          newSession.user.email?.split("@")[0] ||
          "사용자";

        const loginUser = {
          id: backendUser.id,
          backendUserId: backendUser.id,
          supabaseUserId: newSession.user.id,
          email: newSession.user.email,
          name: backendUser.name || displayName,
          username: displayName,
        };

        localStorage.setItem("loginUser", JSON.stringify(loginUser));

        setCurrentPage((prev) => {
          if (prev === "landing" || prev === "login" || prev === "signup") {
            return "home";
          }
          return prev;
        });
      } catch (error) {
        console.error("백엔드 사용자 동기화 실패:", error);
        localStorage.removeItem("loginUser");
        setAuthError(
          "백엔드 사용자 연결에 실패했습니다. 백엔드를 다시 실행하고 새로고침한 뒤 다시 로그인해주세요."
        );
      } finally {
        if (mounted) {
          setAuthReady(true);
        }
      }
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

  const isLoggedIn = !!session?.user;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("loginUser");
    setCurrentPage("landing");
  };

  const handleGoCreateFromLanding = () => {
    if (isLoggedIn) {
      setCurrentPage("create");
    } else {
      setCurrentPage("login");
    }
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

  if (authError) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <p className="auth-badge">뚝딱</p>
            <h1>연결 오류</h1>
            <p className="auth-desc">로그인 연동 중 문제가 생겼습니다.</p>
          </div>

          <div className="auth-form">
            <div className="message error">{authError}</div>

            <button
              type="button"
              className="auth-button"
              onClick={() => window.location.reload()}
            >
              새로고침
            </button>

            <button
              type="button"
              className="auth-button"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    if (currentPage === "login") {
      return (
        <Login
          onSwitchToSignup={() => setCurrentPage("signup")}
          onLoginSuccess={() => setCurrentPage("home")}
        />
      );
    }

    if (currentPage === "signup") {
      return <Signup onSwitchToLogin={() => setCurrentPage("login")} />;
    }

    return (
      <LandingPage
        onGoLogin={() => setCurrentPage("login")}
        onGoSignup={() => setCurrentPage("signup")}
        onGoCreate={handleGoCreateFromLanding}
        isLoggedIn={false}
      />
    );
  }

  if (currentPage === "create") {
    return <RequestCreatePage onGoHome={() => setCurrentPage("home")} />;
  }

  if (currentPage === "myRequests") {
    return (
      <MyRequestsPage
        onGoHome={() => setCurrentPage("home")}
        onClickRequest={(request) => {
          setSelectedRequest(request);
          setPreviousPage("myRequests");
          setCurrentPage("requestDetail");
        }}
      />
    );
  }

  if (currentPage === "allRequests") {
    return (
      <AllRequestsPage
        onGoHome={() => setCurrentPage("home")}
        onClickRequest={(request) => {
          setSelectedRequest(request);
          setPreviousPage("allRequests");
          setCurrentPage("requestDetail");
        }}
      />
    );
  }

  if (currentPage === "assignedRequests") {
    return (
      <MyAssignedRequestsPage
        onGoHome={() => setCurrentPage("home")}
        onClickRequest={(request) => {
          setSelectedRequest(request);
          setPreviousPage("assignedRequests");
          setCurrentPage("requestDetail");
        }}
      />
    );
  }

  if (currentPage === "requestDetail") {
    return (
      <RequestDetailPage
        request={selectedRequest}
        onGoBack={() => setCurrentPage(previousPage)}
        onGoHome={() => setCurrentPage("home")}
      />
    );
  }

  return (
    <Home
      onGoToCreate={() => setCurrentPage("create")}
      onGoToMyRequests={() => setCurrentPage("myRequests")}
      onGoToAllRequests={() => setCurrentPage("allRequests")}
      onGoToAssignedRequests={() => setCurrentPage("assignedRequests")}
      onLogout={handleLogout}
    />
  );
}

export default App;