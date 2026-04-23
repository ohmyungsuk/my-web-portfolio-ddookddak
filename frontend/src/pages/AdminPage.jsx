import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function AdminPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [summary, setSummary] = useState({
    total: 0,
    pending: 0,
    assigned: 0,
    in_progress: 0,
    completed: 0,
    cancelled: 0,
  });
  const [recentRequests, setRecentRequests] = useState([]);

  const loginUser = useMemo(() => {
    const savedUser = localStorage.getItem("loginUser");
    return savedUser ? JSON.parse(savedUser) : null;
  }, []);

  const normalizeStatus = (status) => {
    const value = String(status || "").trim().toLowerCase();

    if (["pending", "접수대기", "요청됨"].includes(value)) return "pending";
    if (["assigned", "배정완료", "작업 예정", "quoted", "planned"].includes(value))
      return "assigned";
    if (["in_progress", "진행중", "작업중"].includes(value)) return "in_progress";
    if (["completed", "완료", "완료됨"].includes(value)) return "completed";
    if (["cancelled", "취소", "취소됨"].includes(value)) return "cancelled";

    return "pending";
  };

  const getStatusLabel = (status) => {
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
          background: "#F9FAFB",
          color: "#374151",
          border: "1px solid #E5E7EB",
        };
    }
  };

  const parseContentPreview = (content) => {
    if (!content) return "요청 내용이 없습니다.";

    const cleaned = String(content)
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return cleaned.length > 90 ? `${cleaned.slice(0, 90)}...` : cleaned;
  };

  useEffect(() => {
    const fetchAdminData = async () => {
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
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        if (profile?.role !== "admin") {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        setIsAdmin(true);

        const { data: requests, error: requestsError } = await supabase
          .from("requests")
          .select("*")
          .order("created_at", { ascending: false });

        if (requestsError) {
          console.error("요청 목록 조회 실패:", requestsError);
          setLoading(false);
          return;
        }

        const safeRequests = Array.isArray(requests) ? requests : [];

        const nextSummary = {
          total: safeRequests.length,
          pending: 0,
          assigned: 0,
          in_progress: 0,
          completed: 0,
          cancelled: 0,
        };

        safeRequests.forEach((request) => {
          const normalized = normalizeStatus(request.status);
          if (nextSummary[normalized] !== undefined) {
            nextSummary[normalized] += 1;
          }
        });

        setSummary(nextSummary);
        setRecentRequests(safeRequests.slice(0, 6));
      } catch (error) {
        console.error("관리자 페이지 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [loginUser, navigate]);

  if (loading) {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <div style={heroStyle}>
            <p style={badgeStyle}>관리자</p>
            <h1 style={titleStyle}>관리자 페이지 불러오는 중...</h1>
            <p style={descStyle}>권한과 요청 현황을 확인하고 있습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <div style={heroStyle}>
            <p style={badgeStyle}>접근 제한</p>
            <h1 style={titleStyle}>관리자만 들어올 수 있어요</h1>
            <p style={descStyle}>
              현재 계정은 관리자 권한이 없어서 이 페이지를 볼 수 없습니다.
            </p>

            <div style={buttonRowStyle}>
              <button
                type="button"
                onClick={() => navigate("/")}
                style={primaryButtonStyle}
              >
                홈으로 가기
              </button>
              <button
                type="button"
                onClick={() => navigate("/mypage")}
                style={secondaryButtonStyle}
              >
                마이페이지로 가기
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
        <section style={heroStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
              alignItems: "flex-start",
            }}
          >
            <div>
              <p style={badgeStyle}>관리자 대시보드</p>
              <h1 style={titleStyle}>요청 현황 한눈에 보기</h1>
              <p style={descStyle}>
                전체 요청 수와 상태별 진행 현황을 빠르게 확인할 수 있어요.
              </p>
            </div>

            <div style={buttonRowStyle}>
              <button
                type="button"
                onClick={() => navigate("/admin/requests")}
                style={primaryButtonStyle}
              >
                전체 요청 관리
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
        </section>

        <section style={summaryGridStyle}>
          <SummaryCard label="전체 요청" value={summary.total} />
          <SummaryCard label="접수대기" value={summary.pending} />
          <SummaryCard label="배정완료" value={summary.assigned} />
          <SummaryCard label="작업중" value={summary.in_progress} />
          <SummaryCard label="완료" value={summary.completed} />
          <SummaryCard label="취소됨" value={summary.cancelled} />
        </section>

        <section style={sectionCardStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <h2 style={sectionTitleStyle}>최근 등록된 요청</h2>
              <p style={sectionDescStyle}>
                최근 들어온 요청을 빠르게 확인할 수 있어요.
              </p>
            </div>
          </div>

          {recentRequests.length === 0 ? (
            <div style={emptyStyle}>등록된 요청이 아직 없습니다.</div>
          ) : (
            <div style={requestListStyle}>
              {recentRequests.map((request) => (
                <button
                  key={request.id}
                  type="button"
                  onClick={() =>
                    navigate(`/requests/${request.id}`, {
                      state: { request, from: "/admin" },
                    })
                  }
                  style={requestCardButtonStyle}
                >
                  <div style={requestCardTopStyle}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={requestTitleStyle}>
                        {request.title || "제목 없음"}
                      </h3>
                      <p style={requestPreviewStyle}>
                        {parseContentPreview(request.content)}
                      </p>
                    </div>

                    <span style={{ ...statusBadgeStyle, ...getStatusStyle(request.status) }}>
                      {getStatusLabel(request.status)}
                    </span>
                  </div>

                  <div style={requestMetaStyle}>
                    <span>카테고리: {request.category || "미분류"}</span>
                    <span>
                      등록일:{" "}
                      {request.created_at
                        ? new Date(request.created_at).toLocaleDateString("ko-KR")
                        : "-"}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div style={summaryCardStyle}>
      <p style={summaryLabelStyle}>{label}</p>
      <strong style={summaryValueStyle}>{value}</strong>
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

const heroStyle = {
  background: "#FFFFFF",
  border: "1px solid #E2E8F0",
  borderRadius: "24px",
  padding: "28px",
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
  marginBottom: "20px",
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

const summaryGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: "14px",
  marginBottom: "20px",
};

const summaryCardStyle = {
  background: "#FFFFFF",
  border: "1px solid #E2E8F0",
  borderRadius: "20px",
  padding: "20px",
  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.04)",
};

const summaryLabelStyle = {
  margin: 0,
  fontSize: "14px",
  color: "#64748B",
  fontWeight: 600,
};

const summaryValueStyle = {
  display: "block",
  marginTop: "10px",
  fontSize: "30px",
  color: "#0F172A",
  lineHeight: 1.2,
};

const sectionCardStyle = {
  background: "#FFFFFF",
  border: "1px solid #E2E8F0",
  borderRadius: "24px",
  padding: "24px",
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
};

const sectionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  marginBottom: "18px",
  flexWrap: "wrap",
};

const sectionTitleStyle = {
  margin: 0,
  fontSize: "22px",
  fontWeight: 800,
  color: "#0F172A",
};

const sectionDescStyle = {
  margin: "6px 0 0",
  fontSize: "14px",
  color: "#64748B",
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

const requestCardButtonStyle = {
  width: "100%",
  textAlign: "left",
  border: "1px solid #E2E8F0",
  borderRadius: "20px",
  background: "#FFFFFF",
  padding: "18px",
  cursor: "pointer",
};

const requestCardTopStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "12px",
  flexWrap: "wrap",
};

const requestTitleStyle = {
  margin: 0,
  fontSize: "18px",
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

const requestMetaStyle = {
  display: "flex",
  gap: "14px",
  flexWrap: "wrap",
  marginTop: "14px",
  fontSize: "13px",
  color: "#64748B",
};

const statusBadgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "999px",
  padding: "8px 12px",
  fontSize: "12px",
  fontWeight: 700,
  whiteSpace: "nowrap",
};

export default AdminPage;