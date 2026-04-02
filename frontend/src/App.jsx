import { useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RequestCreatePage from "./pages/RequestCreatePage";
import MyRequestsPage from "./pages/MyRequestsPage";
import RequestDetailPage from "./pages/RequestDetailPage";

function App() {
  const loginUser = localStorage.getItem("loginUser");
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedRequest, setSelectedRequest] = useState(null);

  if (!loginUser) {
    return <Login />;
  }

  const handleLogout = () => {
    localStorage.removeItem("loginUser");
    window.location.reload();
  };

  if (currentPage === "create") {
    return <RequestCreatePage onGoHome={() => setCurrentPage("home")} />;
  }

  if (currentPage === "myRequests") {
    return (
      <MyRequestsPage
        onGoHome={() => setCurrentPage("home")}
        onClickRequest={(request) => {
          console.log("App에서 받음", request);
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
        onGoBack={() => setCurrentPage("myRequests")}
        onGoHome={() => setCurrentPage("home")}
      />
    );
  }

  return (
    <Home
      onGoToCreate={() => setCurrentPage("create")}
      onGoToMyRequests={() => setCurrentPage("myRequests")}
      onLogout={handleLogout}
    />
  );
}

export default App;