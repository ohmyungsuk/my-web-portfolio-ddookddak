import { useEffect, useMemo, useState } from "react";
import { supabase } from "../supabaseClient.js";
import "../index.css";

function MyAssignedRequestsPage({ onGoHome, onClickRequest }) {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignedRequests = async () => {
      const savedUser = localStorage.getItem("loginUser");
      const loginUser = savedUser ? JSON.parse(savedUser) : null;

      if (!loginUser || !loginUser.id) {
        setMessage("로그인 정보가 없습니다. 다시 로그인해주세요.");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("requests")
          .select("*")
          .eq("assigned_user_id", loginUser.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setRequests(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("내가 맡은 작업 목록 불러오기 실패:", error);
        setMessage(error.message || "내가 맡은 작업 목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedRequests();
  }, []);

  const getStatusStyle = (status) => {
    if (status === "요청 등록") {
      return { backgroundColor: "#e5e7eb", color: "#374151" };
    }
    if (status === "견적 협의중") {
      return { backgroundColor: "#ffedd5", color: "#c2410c" };
    }
    if (status === "작업 예정") {
      return { backgroundColor: "#dbeafe", color: "#1d4ed8" };
    }
    if (status === "진행중") {
      return { backgroundColor: "#dcfce7", color: "#15803d" };
    }
    if (status === "완료됨") {
      return { backgroundColor: "#bbf7d0", color: "#166534" };
    }
    return { backgroundColor: "#f3f4f6", color: "#111827" };
  };

  const summary = useMemo(() => {
    const planned = requests.filter((item) => item.status === "작업 예정").length;
    const working = requests.filter((item) => item.status === "진행중").length;
    const done = requests.filter((item) => item.status === "완료됨").length;
    return {
      total: requests.length,
      planned,
      working,
      done,
    };
  }, [requests]);

  const formatDate = (value) => {
    if (!value) return "등록일 정보 없음";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "등록일 정보 없음";
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
      date.getDate()
    ).padStart(2, "0")}`;
  };

  return (
    <div className="page-shell">
      <div className="page-wrap">
        <div className="page-topbar">
          <div className="page-brand">
            <div className="page-brand-mark">ㄸ</div>
            <div className="page-brand-text">뚝딱</div>
          </div>

          <button type="button" className="page-back-btn" onClick={onGoHome}>
            메인으로 돌아가기
          </button>
        </div>

        <div className="page-grid">
          <div className="page-panel page-main">
            <div className="page-eyebrow">내가 맡은 작업</div>

            <div className="list-head-row">
              <div>
                <h1 className="list-head-title">내가 맡아서 진행하는 요청</h1>
                <p className="list-head-desc">
                  수락한 요청들을 상태별로 확인하고 상세 페이지에서 이어서 진행할 수 있습니다.
                </p>
              </div>

              {!loading && !message && (
                <div className="list-chip-row">
                  <div className="list-chip">전체 {summary.total}개</div>
                  <div className="list-chip">작업 예정 {summary.planned}개</div>
                  <div className="list-chip">진행중 {summary.working}개</div>
                  <div className="list-chip">완료 {summary.done}개</div>
                </div>
              )}
            </div>

            <div className="list-shell">
              {loading && <p style={{ color: "#6b7280" }}>불러오는 중...</p>}

              {!loading && message && <div className="message error">{message}</div>}

              {!loading && !message && requests.length === 0 && (
                <div className="empty-card">
                  아직 맡은 작업이 없습니다.
                  <br />
                  전체 요청 목록에서 요청을 수락하면 여기에 표시됩니다.
                </div>
              )}

              {!loading && !message && requests.length > 0 && (
                <div className="list-card-grid">
                  {requests.map((request) => (
                    <div
                      key={request.id}
                      className="request-card"
                      onClick={() => onClickRequest(request)}
                    >
                      <div className="request-card-top">
                        <div>
                          <h3 className="request-card-title">{request.title}</h3>
                          <div className="request-card-sub">
                            요청 번호 #{request.id}
                          </div>
                        </div>

                        <div className="request-status-wrap">
                          <span className="status-pill" style={getStatusStyle(request.status)}>
                            {request.status}
                          </span>
                        </div>
                      </div>

                      <div className="request-meta-grid">
                        <div className="request-meta-box">
                          <div className="request-meta-label">카테고리</div>
                          <div className="request-meta-value">{request.category}</div>
                        </div>

                        <div className="request-meta-box">
                          <div className="request-meta-label">장소</div>
                          <div className="request-meta-value">{request.location}</div>
                        </div>

                        <div className="request-meta-box">
                          <div className="request-meta-label">담당자</div>
                          <div className="request-meta-value">나</div>
                        </div>
                      </div>

                      <div className="request-preview">
                        {request.content?.trim() || "요청 내용이 없습니다."}
                      </div>

                      <div className="request-card-footer">
                        <div className="request-card-date">
                          등록일 {formatDate(request.created_at)}
                        </div>
                        <div className="request-card-link">상세보기 →</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="page-panel page-side side-stack">
            <div className="side-card">
              <h3 className="side-card-title">맡은 작업</h3>
              <p className="side-number">{summary.total}건</p>
              <p className="side-card-desc">
                내가 현재 맡고 있는 전체 요청 수입니다.
              </p>
            </div>

            <div className="side-card">
              <h3 className="side-card-title">작업 예정</h3>
              <p className="side-number">{summary.planned}건</p>
              <p className="side-card-desc">
                곧 진행을 시작할 요청입니다.
              </p>
            </div>

            <div className="side-card">
              <h3 className="side-card-title">진행중</h3>
              <p className="side-number">{summary.working}건</p>
              <p className="side-card-desc">
                지금 실제로 작업이 진행 중인 요청입니다.
              </p>
            </div>

            <div className="side-card">
              <h3 className="side-card-title">완료</h3>
              <p className="side-number">{summary.done}건</p>
              <p className="side-card-desc">
                완료 처리한 요청 내역입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAssignedRequestsPage;