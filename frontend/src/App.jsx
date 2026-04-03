import { useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import RequestCreatePage from "./pages/RequestCreatePage";
import MyRequestsPage from "./pages/MyRequestsPage";
import AllRequestsPage from "./pages/AllRequestsPage";
import RequestDetailPage from "./pages/RequestDetailPage";

function App() {
  const loginUser = localStorage.getItem("loginUser");
  const [currentPage, setCurrentPage] = useState("landing");
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    if (
      loginUser &&
      (currentPage === "landing" ||
        currentPage === "login" ||
        currentPage === "signup")
    ) {
      setCurrentPage("home");
    }
  }, [loginUser, currentPage]);

  const handleLogout = () => {
    localStorage.removeItem("loginUser");
    setCurrentPage("landing");
    window.location.reload();
  };

  const handleGoCreateFromLanding = () => {
    if (loginUser) {
      setCurrentPage("create");
    } else {
      setCurrentPage("login");
    }
  };

  if (!loginUser) {
    if (currentPage === "login") {
      return <Login />;
    }

    if (currentPage === "signup") {
      return <Signup onGoLogin={() => setCurrentPage("login")} />;
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
          setCurrentPage("requestDetail");
        }}
      />
    );
  }

  if (currentPage === "requestDetail") {
    return (
      <RequestDetailPage
        request={selectedRequest}
        onGoBack={() => setCurrentPage("allRequests")}
        onGoHome={() => setCurrentPage("home")}
      />
    );
  }

  return (
    <Home
      onGoToCreate={() => setCurrentPage("create")}
      onGoToMyRequests={() => setCurrentPage("myRequests")}
      onGoToAllRequests={() => setCurrentPage("allRequests")}
      onLogout={handleLogout}
    />
  );
}

export default App;