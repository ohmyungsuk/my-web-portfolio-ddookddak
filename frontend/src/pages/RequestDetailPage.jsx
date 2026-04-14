import { useState } from "react";
import { supabase } from "../supabaseClient.js";
import "../index.css";

function RequestDetailPage({ request, onGoBack, onGoHome }) {
  const [detail, setDetail] = useState(request);
  const [message, setMessage] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const savedUser = localStorage.getItem("loginUser");
  const loginUser = savedUser ? JSON.parse(savedUser) : null;

  if (!detail) {
    return (
      <div className="Signup-page">
        <div className="Signup-card">
          <div className="Signup-header">
            <h1 className="logo">뚝딱</h1>
            <p className="subtitle">요청 상세보기 페이지</p>
          </div>

          <div className="Signup-form">
            <h2>요청 상세보기</h2>
            <p className="message">선택된 요청이 없습니다.</p>

            <button type="button" className="Signup-button" onClick={onGoBack}>
              뒤로가기
            </button>

            <button type="button" className="Signup-button" onClick={onGoHome}>
              메인으로 돌아가기
            </button>
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
      "요청 수락 성공! 이제 견적 협의중 상태입니다."
    );
  };

  const handleSetPlanned = async () => {
    await updateRequest(
      { status: "작업 예정" },
      "작업 예정 상태로 변경되었습니다."
    );
  };

  const handleStartWork = async () => {
    await updateRequest({ status: "진행중" }, "작업이 시작되었습니다.");
  };

  const handleComplete = async () => {
    await updateRequest({ status: "완료됨" }, "작업 완료 처리 성공!");
  };

  const writerText = (() => {
    if (detail.user_id === loginUser?.id) return "나";
    if (detail.writer_name) return detail.writer_name;
    if (detail.writer_nickname) return detail.writer_nickname;
    return "작성자 정보 없음";
  })();

  const assignedText = (() => {
    if (!detail.assigned_user_id) return "아직 없음";
    if (detail.assigned_user_id === loginUser?.id) return "나";
    if (detail.assigned_username) return detail.assigned_username;
    return "배정됨";
  })();

  return (
    <div className="Signup-page">
      <div className="Signup-card">
        <div className="Signup-header">
          <h1 className="logo">뚝딱</h1>
          <p className="subtitle">요청 상세보기 페이지</p>
        </div>

        <div className="Signup-form">
          <h2>요청 상세보기</h2>

          {message && <p className="message">{message}</p>}

          <div className="input-group">
            <label>제목</label>
            <div className="input">{detail.title}</div>
          </div>

          <div className="input-group">
            <label>작성자</label>
            <div className="input">{writerText}</div>
          </div>

          <div className="input-group">
            <label>카테고리</label>
            <div className="input">{detail.category}</div>
          </div>

          <div className="input-group">
            <label>장소</label>
            <div className="input">{detail.location}</div>
          </div>

          <div className="input-group">
            <label>내용</label>
            <div
              style={{
                minHeight: "120px",
                border: "1px solid #d1d5db",
                borderRadius: "10px",
                padding: "14px",
                fontSize: "15px",
                backgroundColor: "#f9fafb",
                whiteSpace: "pre-wrap",
              }}
            >
              {detail.content}
            </div>
          </div>

          <div className="input-group">
            <label>상태</label>
            <div
              style={{
                ...getStatusStyle(detail.status),
                borderRadius: "999px",
                padding: "10px 14px",
                fontSize: "14px",
                fontWeight: "700",
                display: "inline-block",
                marginTop: "8px",
              }}
            >
              {detail.status}
            </div>
          </div>

          <div className="input-group">
            <label>담당자</label>
            <div className="input">{assignedText}</div>
          </div>

          {canAccept && (
            <button
              type="button"
              className="Signup-button"
              onClick={handleAccept}
              disabled={actionLoading}
            >
              {actionLoading ? "처리 중..." : "요청 수락하기"}
            </button>
          )}

          {canSetPlanned && (
            <button
              type="button"
              className="Signup-button"
              onClick={handleSetPlanned}
              disabled={actionLoading}
            >
              {actionLoading ? "처리 중..." : "작업 예정으로 변경"}
            </button>
          )}

          {canStartWork && (
            <button
              type="button"
              className="Signup-button"
              onClick={handleStartWork}
              disabled={actionLoading}
            >
              {actionLoading ? "처리 중..." : "작업 시작하기"}
            </button>
          )}

          {canComplete && (
            <button
              type="button"
              className="Signup-button"
              onClick={handleComplete}
              disabled={actionLoading}
            >
              {actionLoading ? "처리 중..." : "완료 처리하기"}
            </button>
          )}

          <button type="button" className="Signup-button" onClick={onGoBack}>
            뒤로가기
          </button>

          <button type="button" className="Signup-button" onClick={onGoHome}>
            메인으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default RequestDetailPage;