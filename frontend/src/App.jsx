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
  const [currentPage, setCurrentPage] = useState("landing");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [previousPage, setPreviousPage] = useState("home");

  useEffect(() => {
    let mounted = true;

    const syncLoginUser = (newSession) => {
      if (!mounted) return;

      setSession(newSession);

      if (!newSession?.user) {
        localStorage.removeItem("loginUser");

        setCurrentPage((prev) => {
          if (
            prev === "create" ||
            prev === "myRequests" ||
            prev === "allRequests" ||
            prev === "assignedRequests" ||
            prev === "requestDetail" ||
            prev === "home"
          ) {
            return "landing";
          }
          return prev;
        });

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

      setCurrentPage((prev) => {
      if (prev === "landing" || prev === "login" || prev === "signup") {
        return "landing";
      }
      return prev;
    });

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

  if (!isLoggedIn) {
    if (currentPage === "login") {
      return (
        <Login
          onSwitchToSignup={() => setCurrentPage("signup")}
          onLoginSuccess={() => setCurrentPage("landing")}
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
  return <RequestCreatePage onGoHome={() => setCurrentPage("landing")} />;
}

if (currentPage === "myRequests") {
  return (
    <MyRequestsPage
      onGoHome={() => setCurrentPage("landing")}
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
      onGoHome={() => setCurrentPage("landing")}
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
      onGoHome={() => setCurrentPage("landing")}
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
      onGoHome={() => setCurrentPage("landing")}
    />
  );
}

const savedUser = localStorage.getItem("loginUser");
const loginUser = savedUser ? JSON.parse(savedUser) : null;

return (
  <LandingPage
    isLoggedIn={isLoggedIn}
    loginUser={loginUser}
    onGoLogin={() => setCurrentPage("login")}
    onGoSignup={() => setCurrentPage("signup")}
    onGoCreate={() => setCurrentPage("create")}
    onGoMyRequests={() => setCurrentPage("myRequests")}
    onGoAllRequests={() => setCurrentPage("allRequests")}
    onGoAssignedRequests={() => setCurrentPage("assignedRequests")}
    onLogout={handleLogout}
  />
);
}

export default App;