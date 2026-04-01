import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MyRequestsPage from "./pages/MyRequestsPage";
import RequestDetailPage from "./pages/RequestDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-requests" element={<MyRequestsPage />} />
        <Route path="/request-detail" element={<RequestDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;