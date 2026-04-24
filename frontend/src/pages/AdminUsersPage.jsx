import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function AdminUsersPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [savingUserId, setSavingUserId] = useState(null);

  const loginUser = useMemo(() => {
    try {
      const savedUser = localStorage.getItem("loginUser");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("loginUser 파싱 실패:", error);
      return null;
    }
  }, []);

  const normalizeRole = (role) => {
    const value = String(role || "").trim().toLowerCase();

    if (value === "admin") return "admin";
    if (value === "worker") return "worker";
    return "user";
  };

  const getRoleText = (role) => {
    switch (normalizeRole(role)) {
      case "admin":
        return "관리자";
      case "worker":
        return "전문가";
      default:
        return "일반 회원";
    }
  };

  const getProviderText = (provider) => {
    const value = String(provider || "").trim().toLowerCase();

    if (value === "google") return "구글";
    if (value === "kakao") return "카카오";
    if (value === "email") return "이메일";
    return "알 수 없음";
  };

  const getRoleStyle = (role) => {
    switch (normalizeRole(role)) {
      case "admin":
        return {
          background: "#FEF2F2",
          color: "#DC2626",
          border: "1px solid #FECACA",
        };
      case "worker":
        return {
          background: "#F5F3FF",
          color: "#7C3AED",
          border: "1px solid #DDD6FE",
        };
      default:
        return {
          background: "#F8FAFC",
          color: "#475569",
          border: "1px solid #E2E8F0",
        };
    }
  };

  const getDisplayName = (user) => {
    return user?.name || user?.username || user?.email || "이름 없음";
  };

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("auth_created_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("회원 목록 조회 실패:", error);
        return;
      }

      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("회원 목록 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    let mounted = true;

    const checkAdminAndLoad = async () => {
      try {
        if (!loginUser?.id && !loginUser?.supabaseUserId) {
          navigate("/login", { replace: true });
          return;
        }

        const userId = loginUser?.supabaseUserId || loginUser?.id;

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", userId)
          .single();

        if (profileError) {
          console.error("관리자 권한 확인 실패:", profileError);
          if (mounted) {
            setIsAdmin(false);
            setLoading(false);
          }
          return;
        }

        const admin = normalizeRole(profile?.role) === "admin";

        if (!mounted) return;

        setIsAdmin(admin);

        if (!admin) {
          setLoading(false);
          return;
        }

        await fetchUsers();

        if (mounted) {
          setLoading(false);
        }
      } catch (error) {
        console.error("관리자 사용자 페이지 로딩 실패:", error);
        if (mounted) {
          setLoading(false);
          setIsAdmin(false);
        }
      }
    };

    checkAdminAndLoad();

    return () => {
      mounted = false;
    };
  }, [loginUser, navigate]);

  const filteredUsers = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return users.filter((user) => {
      const normalizedRole = normalizeRole(user?.role);

      const matchesRole =
        roleFilter === "all" ? true : normalizedRole === roleFilter;

      const matchesKeyword =
        keyword === ""
          ? true
          : String(user?.name || "").toLowerCase().includes(keyword) ||
            String(user?.username || "").toLowerCase().includes(keyword) ||
            String(user?.email || "").toLowerCase().includes(keyword) ||
            String(user?.provider || "").toLowerCase().includes(keyword) ||
            String(user?.id || "").toLowerCase().includes(keyword);

      return matchesRole && matchesKeyword;
    });
  }, [users, roleFilter, searchKeyword]);

  const handleRoleChange = (userId, nextRole) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, role: nextRole } : user
      )
    );
  };

  const handleSaveRole = async (user) => {
    try {
      setSavingUserId(user.id);

      const nextRole = normalizeRole(user.role);

      const { error } = await supabase
        .from("profiles")
        .update({ role: nextRole })
        .eq("id", user.id);

      if (error) {
        throw error;
      }

      alert("역할이 저장되었습니다.");
    } catch (error) {
      console.error("역할 저장 실패:", error);
      alert("역할 저장 중 문제가 발생했습니다.");
      await fetchUsers();
    } finally {
      setSavingUserId(null);
    }
  };

  if (loading) {
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <div style={sectionCardStyle}>
            <h1 style={titleStyle}>회원 관리 불러오는 중...</h1>
            <p style={descStyle}>회원 목록과 역할 정보를 확인하고 있습니다.</p>
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
              현재 계정은 관리자 권한이 없어서 회원 관리 페이지를 볼 수 없습니다.
            </p>

            <div style={buttonRowStyle}>
              <button
                type="button"
                onClick={() => navigate("/admin")}
                style={secondaryButtonStyle}
              >
                관리자 메인으로 가기
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
              <p style={badgeStyle}>관리자 회원 관리</p>
              <h1 style={titleStyle}>전체 회원 관리</h1>
              <p style={descStyle}>
                회원 목록을 확인하고 역할과 가입방식을 관리할 수 있어요.
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
                onClick={() => navigate("/admin/requests")}
                style={primaryButtonStyle}
              >
                요청 관리로 가기
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
                placeholder="이름, 아이디, 이메일, 가입방식, 회원 ID 검색"
                style={inputStyle}
              />
            </div>

            <div style={filterBoxStyle}>
              <label style={labelStyle}>역할</label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                style={selectStyle}
              >
                <option value="all">전체 역할</option>
                <option value="user">일반 회원</option>
                <option value="worker">전문가</option>
                <option value="admin">관리자</option>
              </select>
            </div>
          </div>

          <div style={countRowStyle}>
            총 <strong>{filteredUsers.length}</strong>명의 회원이 보여요.
          </div>
        </section>

        <section style={sectionCardStyle}>
          {filteredUsers.length === 0 ? (
            <div style={emptyStyle}>조건에 맞는 회원이 없습니다.</div>
          ) : (
            <div style={userListStyle}>
              {filteredUsers.map((user) => (
                <div key={user.id} style={userCardStyle}>
                  <div style={userTopStyle}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={nameRowStyle}>
                        <h3 style={userNameStyle}>{getDisplayName(user)}</h3>
                        <span
                          style={{
                            ...roleBadgeStyle,
                            ...getRoleStyle(user.role),
                          }}
                        >
                          {getRoleText(user.role)}
                        </span>
                      </div>

                      <div style={metaGridStyle}>
                        <div>
                          <span style={metaLabelStyle}>아이디</span>
                          <p style={metaValueStyle}>{user?.username || "-"}</p>
                        </div>

                        <div>
                          <span style={metaLabelStyle}>이름</span>
                          <p style={metaValueStyle}>{user?.name || "-"}</p>
                        </div>

                        <div>
                          <span style={metaLabelStyle}>이메일</span>
                          <p style={metaValueStyle}>{user?.email || "-"}</p>
                        </div>

                        <div>
                          <span style={metaLabelStyle}>가입방식</span>
                          <p style={metaValueStyle}>{getProviderText(user?.provider)}</p>
                        </div>

                        <div>
                          <span style={metaLabelStyle}>회원 ID</span>
                          <p style={metaValueStyle}>{user?.id || "-"}</p>
                        </div>

                        <div>
                          <span style={metaLabelStyle}>가입일</span>
                          <p style={metaValueStyle}>
                            {user?.auth_created_at
                              ? new Date(user.auth_created_at).toLocaleDateString("ko-KR")
                              : user?.created_at
                              ? new Date(user.created_at).toLocaleDateString("ko-KR")
                              : "-"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={actionRowStyle}>
                    <div style={roleEditorStyle}>
                      <label style={smallLabelStyle}>역할 변경</label>
                      <select
                        value={normalizeRole(user.role)}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        style={roleSelectStyle}
                      >
                        <option value="user">일반 회원</option>
                        <option value="worker">전문가</option>
                        <option value="admin">관리자</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSaveRole(user)}
                      disabled={savingUserId === user.id}
                      style={{
                        ...saveButtonStyle,
                        opacity: savingUserId === user.id ? 0.7 : 1,
                        cursor: savingUserId === user.id ? "default" : "pointer",
                      }}
                    >
                      {savingUserId === user.id ? "저장 중..." : "역할 저장"}
                    </button>
                  </div>
                </div>
              ))}
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

const userListStyle = {
  display: "grid",
  gap: "14px",
};

const userCardStyle = {
  border: "1px solid #E2E8F0",
  borderRadius: "20px",
  background: "#FFFFFF",
  padding: "20px",
};

const userTopStyle = {
  display: "flex",
  gap: "16px",
  alignItems: "flex-start",
};

const nameRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap",
  marginBottom: "14px",
};

const userNameStyle = {
  margin: 0,
  fontSize: "20px",
  fontWeight: 800,
  color: "#0F172A",
  lineHeight: 1.4,
};

const roleBadgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "999px",
  padding: "7px 12px",
  fontSize: "12px",
  fontWeight: 700,
  whiteSpace: "nowrap",
};

const metaGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "12px",
};

const metaLabelStyle = {
  display: "block",
  fontSize: "12px",
  fontWeight: 700,
  color: "#64748B",
  marginBottom: "4px",
};

const metaValueStyle = {
  margin: 0,
  fontSize: "14px",
  color: "#0F172A",
  lineHeight: 1.5,
  wordBreak: "break-all",
};

const actionRowStyle = {
  marginTop: "18px",
  paddingTop: "18px",
  borderTop: "1px solid #E2E8F0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: "14px",
  flexWrap: "wrap",
};

const roleEditorStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  minWidth: "220px",
};

const smallLabelStyle = {
  fontSize: "12px",
  fontWeight: 700,
  color: "#64748B",
};

const roleSelectStyle = {
  height: "44px",
  borderRadius: "12px",
  border: "1px solid #CBD5E1",
  padding: "0 12px",
  fontSize: "14px",
  outline: "none",
  background: "#FFFFFF",
};

const saveButtonStyle = {
  border: "none",
  borderRadius: "12px",
  background: "#2563EB",
  color: "#FFFFFF",
  fontSize: "14px",
  fontWeight: 700,
  padding: "12px 18px",
};

export default AdminUsersPage;
