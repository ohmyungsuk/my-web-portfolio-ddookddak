import { useState } from "react";
import { supabase } from "../supabaseClient.js";
import "../index.css";

function RequestDetailPage({ request, onGoBack, onGoHome }) {
  const [detail, setDetail] = useState(request);
  const [message, setMessage] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const savedUser = localStorage.getItem("loginUser");
  const loginUser = savedUser ? JSON.parse(savedUser) : null;

  const handleBack = () => {
    if (onGoBack) {
      onGoBack();
      return;
    }
    if (onGoHome) {
      onGoHome();
    }
  };

  if (!detail) {
    return (
      <div className="page-shell">
        <div className="page-wrap">
          <div className="page-topbar">
            <div className="page-brand">
              <div className="page-brand-mark">ㄸ</div>
              <div className="page-brand-text">뚝딱</div>
            </div>
          </div>

          <div className="page-panel page-main">
            <div className="page-eyebrow">요청 상세보기</div>
            <h1 className="page-title">선택된 요청이 없습니다</h1>
            <p className="page-desc">목록에서 요청을 다시 선택해주세요.</p>

            <div className="action-row">
              <button type="button" className="page-back-btn" onClick={handleBack}>
                뒤로가기
              </button>
              <button type="button" className="auth-button" onClick={onGoHome}>
                메인으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

  const isMyRequest = loginUser && detail.user_id === loginUser.id;

  const canAccept =
    loginUser &&
    !isMyRequest &&
    detail.status === "요청 등록" &&
    !detail.assigned_user_id;

  const canSetPlanned =
    loginUser &&
    detail.assigned_user_id === loginUser.id &&
    detail.status === "견적 협의중";

  const canStartWork =
    loginUser &&
    detail.assigned_user_id === loginUser.id &&
    detail.status === "작업 예정";

  const canComplete =
    loginUser &&
    detail.assigned_user_id === loginUser.id &&
    detail.status === "진행중";

  const updateRequest = async (updateData, successMessage) => {
    try {
      setActionLoading(true);
      setMessage("");

      const { data, error } = await supabase
        .from("requests")
        .update(updateData)
        .eq("id", detail.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setDetail(data);
      setMessage(successMessage);
    } catch (error) {
      console.error("요청 변경 실패:", error);
      setMessage(error.message || "요청 변경 중 오류가 발생했습니다.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleAccept = async () => {
    await updateRequest(
      {
        status: "견적 협의중",
        assigned_user_id: loginUser.id,
      },
      "요청을 수락했습니다."
    );
  };

  const handleSetPlanned = async () => {
    await updateRequest({ status: "작업 예정" }, "작업 예정 상태로 변경되었습니다.");
  };

  const handleStartWork = async () => {
    await updateRequest({ status: "진행중" }, "작업을 시작했습니다.");
  };

  const handleComplete = async () => {
    await updateRequest({ status: "완료됨" }, "작업을 완료 처리했습니다.");
  };

  const writerText =
    detail.user_id === loginUser?.id
      ? "나"
      : detail.writer_name || detail.writer_nickname || "작성자 정보 없음";

  const assignedText =
    !detail.assigned_user_id
      ? "아직 없음"
      : detail.assigned_user_id === loginUser?.id
      ? "나"
      : detail.assigned_username || "배정됨";

  return (
    <div className="page-shell">
      <div className="page-wrap">
        <div className="page-topbar">
          <div className="page-brand">
            <div className="page-brand-mark">ㄸ</div>
            <div className="page-brand-text">뚝딱</div>
          </div>

          <button type="button" className="page-back-btn" onClick={handleBack}>
            뒤로가기
          </button>
        </div>

        <div className="page-grid">
          <div className="page-panel page-main">
            <div className="page-eyebrow">요청 상세보기</div>
            <h1 className="page-title">{detail.title}</h1>
            <p className="page-desc">
              요청 정보와 현재 진행 상태를 확인할 수 있습니다.
            </p>

            {message && (
              <div
                className={`message ${
                  message.includes("완료") || message.includes("수락") || message.includes("변경")
                    ? "success"
                    : "error"
                }`}
                style={{ marginTop: "22px" }}
              >
                {message}
              </div>
            )}

            <div className="detail-grid">
              <div className="detail-mini">
                <div className="detail-mini-label">작성자</div>
                <div className="detail-mini-value">{writerText}</div>
              </div>

              <div className="detail-mini">
                <div className="detail-mini-label">담당자</div>
                <div className="detail-mini-value">{assignedText}</div>
              </div>

              <div className="detail-mini">
                <div className="detail-mini-label">카테고리</div>
                <div className="detail-mini-value">{detail.category}</div>
              </div>

              <div className="detail-mini">
                <div className="detail-mini-label">장소</div>
                <div className="detail-mini-value">{detail.location}</div>
              </div>
            </div>

            <div className="detail-field-full">
              <div className="detail-mini-label">상세 내용</div>
              <div className="detail-box">{detail.content}</div>
            </div>

            <div className="detail-field-full">
              <div className="detail-mini-label">현재 상태</div>
              <div
                className="status-pill"
                style={getStatusStyle(detail.status)}
              >
                {detail.status}
              </div>
            </div>

            <div className="action-stack">
              {canAccept && (
                <button
                  type="button"
                  className="auth-button"
                  onClick={handleAccept}
                  disabled={actionLoading}
                >
                  {actionLoading ? "처리 중..." : "요청 수락하기"}
                </button>
              )}

              {canSetPlanned && (
                <button
                  type="button"
                  className="auth-button"
                  onClick={handleSetPlanned}
                  disabled={actionLoading}
                >
                  {actionLoading ? "처리 중..." : "작업 예정으로 변경"}
                </button>
              )}

              {canStartWork && (
                <button
                  type="button"
                  className="auth-button"
                  onClick={handleStartWork}
                  disabled={actionLoading}
                >
                  {actionLoading ? "처리 중..." : "작업 시작하기"}
                </button>
              )}

              {canComplete && (
                <button
                  type="button"
                  className="auth-button"
                  onClick={handleComplete}
                  disabled={actionLoading}
                >
                  {actionLoading ? "처리 중..." : "완료 처리하기"}
                </button>
              )}
            </div>

            <div className="action-row">
              <button type="button" className="page-back-btn" onClick={handleBack}>
                뒤로가기
              </button>
              <button type="button" className="auth-button" onClick={onGoHome}>
                메인으로 돌아가기
              </button>
            </div>
          </div>

          <div className="page-panel page-side">
            <div className="side-card">
              <h3 className="side-card-title">현재 상태</h3>
              <p className="side-card-value">{detail.status}</p>
              <p className="side-card-desc">
                요청 진행 단계에 따라 상태가 실시간으로 바뀝니다.
              </p>
            </div>

            <div className="side-card">
              <h3 className="side-card-title">처리 안내</h3>
              <p className="side-card-desc">
                작업자가 수락하면 견적 협의중 → 작업 예정 → 진행중 → 완료됨 순서로 이어집니다.
              </p>
            </div>

            <div className="side-card">
              <h3 className="side-card-title">빠른 이동</h3>
              <p className="side-card-desc">
                뒤로가기를 누르면 이전 목록으로, 메인으로 돌아가기를 누르면 홈으로 이동합니다.
              </p>
            </div>

            <div className="side-card">
              <h3 className="side-card-title">요청 번호</h3>
              <p className="side-card-value">#{detail.id}</p>
              <p className="side-card-desc">상세 요청 식별용 번호입니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestDetailPage;