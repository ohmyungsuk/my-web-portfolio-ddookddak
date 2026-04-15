import { useEffect, useMemo, useState } from "react";
import { supabase } from "../supabaseClient.js";
import "../index.css";

function AllRequestsPage({ onGoHome, onClickRequest }) {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const { data, error } = await supabase
          .from("requests")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setRequests(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("전체 요청 목록 불러오기 실패:", error);
        setMessage(error.message || "전체 요청 목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllRequests();
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
    const open = requests.filter((item) => item.status === "요청 등록").length;
    const inProgress = requests.filter(
      (item) => item.status === "견적 협의중" || item.status === "작업 예정" || item.status === "진행중"
    ).length;
    const completed = requests.filter((item) => item.status === "완료됨").length;
    return {
      total: requests.length,
      open,
      inProgress,
      completed,
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
            <div className="page-eyebrow">전체 요청 목록</div>

            <div className="list-head-row">
              <div>
                <h1 className="list-head-title">등록된 전체 요청</h1>
                <p className="list-head-desc">
                  모든 사용자가 등록한 요청을 최신순으로 확인할 수 있습니다.
                </p>
              </div>

              {!loading && !message && (
                <div className="list-chip-row">
                  <div className="list-chip">전체 {summary.total}개</div>
                  <div className="list-chip">신규 {summary.open}개</div>
                  <div className="list-chip">진행중 {summary.inProgress}개</div>
                  <div className="list-chip">완료 {summary.completed}개</div>
                </div>
              )}
            </div>

            <div className="list-shell">
              {loading && <p style={{ color: "#6b7280" }}>불러오는 중...</p>}

              {!loading && message && <div className="message error">{message}</div>}

              {!loading && !message && requests.length === 0 && (
                <div className="empty-card">
                  등록된 요청이 없습니다.
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
                          <div className="request-meta-value">
                            {request.assigned_username
                              ? request.assigned_username
                              : request.assigned_user_id
                              ? "배정됨"
                              : "아직 없음"}
                          </div>
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
              <h3 className="side-card-title">전체 요청</h3>
              <p className="side-number">{summary.total}건</p>
              <p className="side-card-desc">
                현재 시스템에 등록된 전체 요청 수입니다.
              </p>
            </div>

            <div className="side-card">
              <h3 className="side-card-title">신규 요청</h3>
              <p className="side-number">{summary.open}건</p>
              <p className="side-card-desc">
                아직 수락 전인 요청을 바로 확인할 수 있습니다.
              </p>
            </div>

            <div className="side-card">
              <h3 className="side-card-title">진행중 요청</h3>
              <p className="side-number">{summary.inProgress}건</p>
              <p className="side-card-desc">
                협의중, 작업 예정, 진행중 상태를 포함합니다.
              </p>
            </div>

            <div className="side-card">
              <h3 className="side-card-title">완료된 요청</h3>
              <p className="side-number">{summary.completed}건</p>
              <p className="side-card-desc">
                완료 처리된 요청 내역입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllRequestsPage;