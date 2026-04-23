import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function AdminRequestsPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [requests, setRequests] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [savingRequestId, setSavingRequestId] = useState(null);

  const loginUser = useMemo(() => {
    const savedUser = localStorage.getItem("loginUser");
    return savedUser ? JSON.parse(savedUser) : null;
  }, []);

  const statusOptions = [
    { value: "pending", label: "접수대기" },
    { value: "assigned", label: "배정완료" },
    { value: "in_progress", label: "작업중" },
    { value: "completed", label: "완료" },
    { value: "cancelled", label: "취소됨" },
  ];

  const normalizeStatus = (status) => {
    const value = String(status || "").trim().toLowerCase();

    if (["pending", "접수대기", "요청됨"].includes(value)) return "pending";
    if (["assigned", "배정완료", "quoted", "planned", "작업 예정"].includes(value)) {
      return "assigned";
    }
    if (["in_progress", "작업중", "진행중"].includes(value)) return "in_progress";
    if (["completed", "완료", "완료됨"].includes(value)) return "completed";
    if (["cancelled", "취소", "취소됨"].includes(value)) return "cancelled";

    return "pending";
  };

  const getStatusText = (status) => {
    switch (normalizeStatus(status)) {
      case "pending":
        return "접수대기";
      case "assigned":
        return "배정완료";
      case "in_progress":
        return "작업중";
      case "completed":
        return "완료";
      case "cancelled":
        return "취소됨";
      default:
        return "접수대기";
    }
  };

  const getStatusStyle = (status) => {
    switch (normalizeStatus(status)) {
      case "pending":
        return {
          background: "#FFF7ED",
          color: "#C2410C",
          border: "1px solid #FED7AA",
        };
      case "assigned":
        return {
          background: "#EFF6FF",
          color: "#1D4ED8",
          border: "1px solid #BFDBFE",
        };
      case "in_progress":
        return {
          background: "#EEF2FF",
          color: "#4338CA",
          border: "1px solid #C7D2FE",
        };
      case "completed":
        return {
          background: "#ECFDF5",
          color: "#047857",
          border: "1px solid #A7F3D0",
        };
      case "cancelled":
        return {
          background: "#F3F4F6",
          color: "#4B5563",
          border: "1px solid #D1D5DB",
        };
      default:
        return {
          background: "#F8FAFC",
          color: "#475569",
          border: "1px solid #E2E8F0",
        };
    }
  };

  const parsePreviewText = (content) => {
    if (!content) return "요청 내용이 없습니다.";

    const cleaned = String(content)
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return cleaned.length > 110 ? `${cleaned.slice(0, 110)}...` : cleaned;
  };

  const getWorkerDisplayName = (worker) => {
    if (!worker) return "";
    return worker.name || worker.username || "이름 없는 담당자";
  };

  useEffect(() => {
    const fetchAdminRequests = async () => {
      try {
        if (!loginUser?.id && !loginUser?.supabaseUserId) {
          navigate("/login", { replace: true });
          return;
        }

        const userId = loginUser.supabaseUserId || loginUser.id;

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", userId)
          .single();

        if (profileError) {
          console.error("관리자 권한 확인 실패:", profileError);
          setLoading(false);
          return;
        }

        if (profile?.role !== "admin") {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        setIsAdmin(true);

        const [{ data: requestData, error: requestError }, { data: workerData, error: workerError }] =
          await Promise.all([
            supabase.from("requests").select("*").order("created_at", { ascending: false }),
            supabase
              .from("profiles")
              .select("id, username, name, role")
              .eq("role", "worker")
              .order("name", { ascending: true }),
          ]);

        if (requestError) {
          console.error("전체 요청 조회 실패:", requestError);
          setLoading(false);
          return;
        }

        if (workerError) {
          console.error("담당자 목록 조회 실패:", workerError);
        }

        const safeWorkers = Array.isArray(workerData) ? workerData : [];
        setWorkers(safeWorkers);

        const safeData = Array.isArray(requestData) ? requestData : [];
        setRequests(
          safeData.map((request) => ({
            ...request,
            normalized_status: normalizeStatus(request.status),
            selected_assigned_to: request.assigned_to || "",
            selected_assigned_name: request.assigned_name || "",
          }))
        );
      } catch (error) {
        console.error("관리자 요청 페이지 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminRequests();
  }, [loginUser, navigate]);

  const handleStatusChange = (requestId, nextStatus) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId
          ? {
              ...request,
              normalized_status: nextStatus,
            }
          : request
      )
    );
  };

  const handleWorkerChange = (requestId, workerId) => {
    const selectedWorker = workers.find((worker) => worker.id === workerId);

    setRequests((prev) =>
      prev.map((request) => {
        if (request.id !== requestId) return request;

        const hasWorker = Boolean(workerId);
        const nextStatus = hasWorker
          ? request.normalized_status === "pending"
            ? "assigned"
            : request.normalized_status
          : request.normalized_status === "assigned"
          ? "pending"
          : request.normalized_status;

        return {
          ...request,
          selected_assigned_to: workerId,
          selected_assigned_name: selectedWorker ? getWorkerDisplayName(selectedWorker) : "",
          normalized_status: nextStatus,
        };
      })
    );
  };

  const handleSaveRequest = async (requestId) => {
    const targetRequest = requests.find((request) => request.id === requestId);

    if (!targetRequest) return;

    try {
      setSavingRequestId(requestId);

      const hasAssignedWorker = Boolean(targetRequest.selected_assigned_to);
      const nextStatus = hasAssignedWorker
        ? targetRequest.normalized_status === "pending"
          ? "assigned"
          : targetRequest.normalized_status
        : targetRequest.normalized_status;

      const payload = {
        status: nextStatus,
        assigned_to: targetRequest.selected_assigned_to || null,
        assigned_name: targetRequest.selected_assigned_name || null,
      };

      const { error } = await supabase.from("requests").update(payload).eq("id", requestId);

      if (error) {
        console.error("요청 저장 실패:", error);
        alert("저장에 실패했어요.");
        return;
      }

      setRequests((prev) =>
        prev.map((request) =>
          request.id === requestId
            ? {
                ...request,
                status: nextStatus,
                normalized_status: nextStatus,
                assigned_to: targetRequest.selected_assigned_to || null,
                assigned_name: targetRequest.selected_assigned_name || null,
                selected_assigned_to: targetRequest.selected_assigned_to || "",
                selected_assigned_name: targetRequest.selected_assigned_name || "",
              }
            : request
        )
      );

      alert("상태와 담당자 정보가 저장됐어요.");
    } catch (error) {
      console.error("요청 저장 중 오류:", error);
      alert("저장 중 문제가 생겼어요.");
    } finally {
      setSavingRequestId(null);
    }
  };

  const categoryOptions = useMemo(() => {
    const categories = requests
      .map((request) => request.category)
      .filter(Boolean)
      .map((category) => String(category).trim());

    return ["all", ...Array.from(new Set(categories))];
  }, [requests]);

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const normalizedStatus = request.normalized_status || normalizeStatus(request.status);

      const matchesStatus =
        statusFilter === "all" ? true : normalizedStatus === statusFilter;

      const matchesCategory =
        categoryFilter === "all" ? true : request.category === categoryFilter;

      const keyword = searchKeyword.trim().toLowerCase();
      const matchesKeyword =
        keyword === ""
          ? true
          : String(request.title || "").toLowerCase().includes(keyword) ||
            String(request.content || "").toLowerCase().includes(keyword) ||
            String(request.category || "").toLowerCase().includes(keyword) ||
            String(request.assigned_name || "").toLowerCase().includes(keyword) ||
            String(request.selected_assigned_name || "").toLowerCase().includes(keyword);

      return matchesStatus && matchesCategory && matchesKeyword;
    });
  }, [requests, statusFilter, categoryFilter, searchKeyword]);

  if (loading) {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <div style={sectionCardStyle}>
            <h1 style={titleStyle}>전체 요청 관리 불러오는 중...</h1>
            <p style={descStyle}>관리자 요청 목록을 확인하고 있습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <div style={sectionCardStyle}>
            <h1 style={titleStyle}>관리자만 접근할 수 있어요</h1>
            <p style={descStyle}>
              현재 계정은 관리자 권한이 없어서 전체 요청 관리 페이지를 볼 수 없습니다.
            </p>

            <div style={buttonRowStyle}>
              <button
                type="button"
                onClick={() => navigate("/admin")}
                style={primaryButtonStyle}
              >
                관리자 메인으로 가기
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                style={secondaryButtonStyle}
              >
                홈으로 가기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <section style={sectionCardStyle}>
          <div style={topHeaderStyle}>
            <div>
              <p style={badgeStyle}>관리자 요청 관리</p>
              <h1 style={titleStyle}>전체 요청 관리</h1>
              <p style={descStyle}>
                전체 요청의 상태를 바꾸고 담당자를 바로 배정할 수 있어요.
              </p>
            </div>

            <div style={buttonRowStyle}>
              <button
                type="button"
                onClick={() => navigate("/admin")}
                style={secondaryButtonStyle}
              >
                관리자 메인
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                style={primaryButtonStyle}
              >
                홈으로 가기
              </button>
            </div>
          </div>
        </section>

        <section style={sectionCardStyle}>
          <div style={filterGridStyle}>
            <div style={filterBoxStyle}>
              <label style={labelStyle}>검색</label>
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="제목, 내용, 카테고리, 담당자 검색"
                style={inputStyle}
              />
            </div>

            <div style={filterBoxStyle}>
              <label style={labelStyle}>상태</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={selectStyle}
              >
                <option value="all">전체 상태</option>
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={filterBoxStyle}>
              <label style={labelStyle}>카테고리</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={selectStyle}
              >
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "전체 카테고리" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={countRowStyle}>
            총 <strong>{filteredRequests.length}</strong>개의 요청이 보여요. 담당자 계정은 <strong>{workers.length}</strong>명 등록돼 있어요.
          </div>
        </section>

        <section style={sectionCardStyle}>
          {filteredRequests.length === 0 ? (
            <div style={emptyStyle}>조건에 맞는 요청이 없습니다.</div>
          ) : (
            <div style={requestListStyle}>
              {filteredRequests.map((request) => {
                const selectedStatus = request.normalized_status || normalizeStatus(request.status);
                const isSaving = savingRequestId === request.id;

                return (
                  <div key={request.id} style={requestCardStyle}>
                    <div style={requestTopStyle}>
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/requests/${request.id}`, {
                            state: { request, from: "/admin/requests" },
                          })
                        }
                        style={requestInfoButtonStyle}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h3 style={requestTitleStyle}>{request.title || "제목 없음"}</h3>
                          <p style={requestPreviewStyle}>{parsePreviewText(request.content)}</p>
                        </div>

                        <span style={{ ...badgePillStyle, ...getStatusStyle(selectedStatus) }}>
                          {getStatusText(selectedStatus)}
                        </span>
                      </button>

                      <div style={adminActionWrapStyle}>
                        <div style={adminFieldStyle}>
                          <label style={smallLabelStyle}>담당자 배정</label>
                          <select
                            value={request.selected_assigned_to || ""}
                            onChange={(e) => handleWorkerChange(request.id, e.target.value)}
                            style={adminSelectStyle}
                            disabled={isSaving}
                          >
                            <option value="">담당자 선택 안 함</option>
                            {workers.map((worker) => (
                              <option key={worker.id} value={worker.id}>
                                {getWorkerDisplayName(worker)}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div style={assignedPreviewStyle}>
                          현재 담당자: {request.selected_assigned_name || request.assigned_name || "미배정"}
                        </div>

                        <div style={adminFieldStyle}>
                          <label style={smallLabelStyle}>상태 변경</label>
                          <select
                            value={selectedStatus}
                            onChange={(e) => handleStatusChange(request.id, e.target.value)}
                            style={adminSelectStyle}
                            disabled={isSaving}
                          >
                            {statusOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleSaveRequest(request.id)}
                          style={saveButtonStyle}
                          disabled={isSaving}
                        >
                          {isSaving ? "저장 중..." : "변경사항 저장"}
                        </button>
                      </div>
                    </div>

                    <div style={metaRowStyle}>
                      <span>카테고리: {request.category || "미분류"}</span>
                      <span>
                        등록일:{" "}
                        {request.created_at
                          ? new Date(request.created_at).toLocaleDateString("ko-KR")
                          : "-"}
                      </span>
                      <span>요청 ID: {request.id}</span>
                      <span>담당자 ID: {request.selected_assigned_to || request.assigned_to || "-"}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#F8FAFC",
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "108px 20px 56px",
};

const sectionCardStyle = {
  background: "#FFFFFF",
  border: "1px solid #E2E8F0",
  borderRadius: "24px",
  padding: "24px",
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
  marginBottom: "20px",
};

const topHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "16px",
  flexWrap: "wrap",
};

const badgeStyle = {
  margin: 0,
  marginBottom: "10px",
  fontSize: "13px",
  fontWeight: 700,
  color: "#2563EB",
};

const titleStyle = {
  margin: 0,
  fontSize: "30px",
  fontWeight: 800,
  color: "#0F172A",
  lineHeight: 1.3,
};

const descStyle = {
  margin: "10px 0 0",
  fontSize: "15px",
  color: "#475569",
  lineHeight: 1.6,
};

const buttonRowStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const primaryButtonStyle = {
  border: "none",
  borderRadius: "14px",
  background: "#2563EB",
  color: "#FFFFFF",
  fontSize: "14px",
  fontWeight: 700,
  padding: "12px 18px",
  cursor: "pointer",
};

const secondaryButtonStyle = {
  border: "1px solid #CBD5E1",
  borderRadius: "14px",
  background: "#FFFFFF",
  color: "#0F172A",
  fontSize: "14px",
  fontWeight: 700,
  padding: "12px 18px",
  cursor: "pointer",
};

const filterGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "14px",
};

const filterBoxStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const labelStyle = {
  fontSize: "13px",
  fontWeight: 700,
  color: "#334155",
};

const inputStyle = {
  height: "46px",
  borderRadius: "14px",
  border: "1px solid #CBD5E1",
  padding: "0 14px",
  fontSize: "14px",
  outline: "none",
};

const selectStyle = {
  height: "46px",
  borderRadius: "14px",
  border: "1px solid #CBD5E1",
  padding: "0 14px",
  fontSize: "14px",
  outline: "none",
  background: "#FFFFFF",
};

const countRowStyle = {
  marginTop: "16px",
  fontSize: "14px",
  color: "#475569",
};

const emptyStyle = {
  padding: "28px 16px",
  borderRadius: "18px",
  background: "#F8FAFC",
  border: "1px dashed #CBD5E1",
  color: "#64748B",
  textAlign: "center",
  fontSize: "15px",
};

const requestListStyle = {
  display: "grid",
  gap: "12px",
};

const requestCardStyle = {
  width: "100%",
  textAlign: "left",
  border: "1px solid #E2E8F0",
  borderRadius: "20px",
  background: "#FFFFFF",
  padding: "18px",
};

const requestTopStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "16px",
  flexWrap: "wrap",
};

const requestInfoButtonStyle = {
  flex: 1,
  minWidth: "260px",
  textAlign: "left",
  border: "none",
  background: "transparent",
  padding: 0,
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "12px",
  flexWrap: "wrap",
};

const requestTitleStyle = {
  margin: 0,
  fontSize: "20px",
  fontWeight: 800,
  color: "#0F172A",
  lineHeight: 1.4,
};

const requestPreviewStyle = {
  margin: "8px 0 0",
  fontSize: "14px",
  color: "#475569",
  lineHeight: 1.6,
};

const metaRowStyle = {
  display: "flex",
  gap: "14px",
  flexWrap: "wrap",
  marginTop: "14px",
  fontSize: "13px",
  color: "#64748B",
};

const badgePillStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "999px",
  padding: "8px 12px",
  fontSize: "12px",
  fontWeight: 700,
  whiteSpace: "nowrap",
};

const adminActionWrapStyle = {
  minWidth: "250px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const adminFieldStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const smallLabelStyle = {
  fontSize: "12px",
  fontWeight: 700,
  color: "#475569",
};

const adminSelectStyle = {
  height: "44px",
  borderRadius: "14px",
  border: "1px solid #CBD5E1",
  padding: "0 12px",
  fontSize: "14px",
  outline: "none",
  background: "#FFFFFF",
};

const assignedPreviewStyle = {
  fontSize: "13px",
  color: "#475569",
  background: "#F8FAFC",
  border: "1px solid #E2E8F0",
  borderRadius: "12px",
  padding: "10px 12px",
  lineHeight: 1.5,
};

const saveButtonStyle = {
  border: "none",
  borderRadius: "14px",
  background: "#2563EB",
  color: "#FFFFFF",
  fontSize: "14px",
  fontWeight: 700,
  padding: "12px 16px",
  cursor: "pointer",
};

export default AdminRequestsPage;
