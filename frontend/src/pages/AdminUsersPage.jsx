import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const BRAND = "#2F80ED";
const BRAND_HOVER = "#1F6FD6";
const TEXT = "#0F172A";
const SUB = "#64748B";
const BG = "#F4F7FB";
const CARD = "#FFFFFF";
const BORDER = "#D9E4F2";
const SOFT = "#F8FBFF";
const DANGER = "#EF4444";

function normalizeRole(role) {
  const value = String(role || "").trim().toLowerCase();

  if (value === "admin") return "admin";
  if (value === "worker") return "worker";
  return "user";
}

function getRoleText(role) {
  const normalized = normalizeRole(role);

  if (normalized === "admin") return "관리자";
  if (normalized === "worker") return "전문가";
  return "일반 회원";
}

function getProviderText(provider) {
  const value = String(provider || "").trim().toLowerCase();

  if (value === "google") return "구글";
  if (value === "kakao") return "카카오";
  if (value === "email") return "이메일";
  return "알 수 없음";
}

function getDisplayName(user) {
  return user?.name || user?.username || user?.email || "이름 없음";
}

function formatDate(value) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function getRoleClass(role) {
  const normalized = normalizeRole(role);

  if (normalized === "admin") return "admin-user-role admin";
  if (normalized === "worker") return "admin-user-role worker";
  return "admin-user-role user";
}

function getProviderClass(provider) {
  const value = String(provider || "").trim().toLowerCase();

  if (value === "google") return "admin-user-provider google";
  if (value === "kakao") return "admin-user-provider kakao";
  if (value === "email") return "admin-user-provider email";
  return "admin-user-provider unknown";
}

function readLoginUser() {
  try {
    const savedUser = localStorage.getItem("loginUser");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error("loginUser 파싱 실패:", error);
    return null;
  }
}

export default function AdminUsersPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [savingUserId, setSavingUserId] = useState(null);
  const [message, setMessage] = useState("");

  const loginUser = useMemo(() => readLoginUser(), []);

  const fetchUsers = useCallback(async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("auth_created_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("회원 목록 조회 실패:", error);
      throw error;
    }

    setUsers(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => {
    let mounted = true;

    const checkAdminAndLoad = async () => {
      try {
        setLoading(true);

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
          setMessage(error.message || "회원 목록을 불러오지 못했습니다.");
          setLoading(false);
          setIsAdmin(false);
        }
      }
    };

    checkAdminAndLoad();

    return () => {
      mounted = false;
    };
  }, [fetchUsers, loginUser, navigate]);

  const summary = useMemo(() => {
    const roles = users.map((user) => normalizeRole(user?.role));

    return {
      total: users.length,
      user: roles.filter((role) => role === "user").length,
      worker: roles.filter((role) => role === "worker").length,
      admin: roles.filter((role) => role === "admin").length,
    };
  }, [users]);

  const filteredUsers = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return users.filter((user) => {
      const normalizedRole = normalizeRole(user?.role);

      const matchesRole =
        roleFilter === "all" ? true : normalizedRole === roleFilter;

      const searchTarget = [
        user?.name,
        user?.username,
        user?.email,
        user?.provider,
        user?.id,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesKeyword = keyword === "" || searchTarget.includes(keyword);

      return matchesRole && matchesKeyword;
    });
  }, [users, roleFilter, searchKeyword]);

  const handleRoleChange = (userId, nextRole) => {
    setMessage("");

    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, role: normalizeRole(nextRole) } : user
      )
    );
  };

  const handleSaveRole = async (user) => {
    try {
      setSavingUserId(user.id);
      setMessage("");

      const nextRole = normalizeRole(user.role);

      const { error } = await supabase
        .from("profiles")
        .update({ role: nextRole })
        .eq("id", user.id);

      if (error) throw error;

      setMessage(`${getDisplayName(user)}님의 역할이 저장되었습니다.`);
    } catch (error) {
      console.error("역할 저장 실패:", error);
      setMessage(error.message || "역할 저장 중 문제가 발생했습니다.");
      await fetchUsers();
    } finally {
      setSavingUserId(null);
    }
  };

  if (loading) {
    return (
      <div className="admin-users-page">
        <style>{styles}</style>

        <main className="admin-users-container">
          <section className="admin-users-empty-card">
            <h1>회원 관리 불러오는 중...</h1>
            <p>회원 목록과 역할 정보를 확인하고 있어요.</p>
          </section>
        </main>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-users-page">
        <style>{styles}</style>

        <main className="admin-users-container">
          <section className="admin-users-empty-card">
            <h1>관리자만 접근할 수 있어요</h1>
            <p>
              현재 계정은 관리자 권한이 없어서 회원 관리 페이지를 볼 수 없습니다.
            </p>

            <div className="admin-users-top-actions">
              <button
                type="button"
                className="admin-users-white-button"
                onClick={() => navigate("/admin")}
              >
                관리자 메인으로
              </button>

              <button
                type="button"
                className="admin-users-blue-button"
                onClick={() => navigate("/")}
              >
                홈으로
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-users-page">
      <style>{styles}</style>

      <main className="admin-users-container">
        <section className="admin-users-hero">
          <div>
            <span className="admin-users-kicker">관리자 회원 관리</span>
            <h1>전체 회원 관리</h1>
            <p>
              회원 목록을 확인하고, 필요한 경우 일반 회원 / 전문가 / 관리자
              역할을 변경할 수 있어요.
            </p>
          </div>

          <div className="admin-users-top-actions">
            <button
              type="button"
              className="admin-users-white-button"
              onClick={() => navigate("/admin")}
            >
              관리자 메인
            </button>

            <button
              type="button"
              className="admin-users-blue-button"
              onClick={() => navigate("/admin/requests")}
            >
              요청 관리
            </button>
          </div>
        </section>

        <section className="admin-users-summary-grid">
          <div className="admin-users-summary-card">
            <span>전체 회원</span>
            <strong>{summary.total}명</strong>
          </div>

          <div className="admin-users-summary-card">
            <span>일반 회원</span>
            <strong>{summary.user}명</strong>
          </div>

          <div className="admin-users-summary-card">
            <span>전문가</span>
            <strong>{summary.worker}명</strong>
          </div>

          <div className="admin-users-summary-card">
            <span>관리자</span>
            <strong>{summary.admin}명</strong>
          </div>
        </section>

        <section className="admin-users-filter-card">
          <div className="admin-users-filter-grid">
            <label className="admin-users-field">
              <span>검색</span>
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="이름, 아이디, 이메일, 가입방식, 회원 ID 검색"
              />
            </label>

            <label className="admin-users-field">
              <span>역할</span>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">전체 역할</option>
                <option value="user">일반 회원</option>
                <option value="worker">전문가</option>
                <option value="admin">관리자</option>
              </select>
            </label>
          </div>

          <div className="admin-users-count">
            총 <strong>{filteredUsers.length}</strong>명의 회원이 보여요.
          </div>

          {message && <div className="admin-users-message">{message}</div>}
        </section>

        <section className="admin-users-list-section">
          {filteredUsers.length === 0 ? (
            <div className="admin-users-empty-list">
              조건에 맞는 회원이 없습니다.
            </div>
          ) : (
            <div className="admin-users-list">
              {filteredUsers.map((user) => (
                <article key={user.id} className="admin-users-card">
                  <div className="admin-users-card-top">
                    <div className="admin-users-avatar">
                      {String(getDisplayName(user)).slice(0, 1)}
                    </div>

                    <div className="admin-users-main-info">
                      <div className="admin-users-name-row">
                        <h2>{getDisplayName(user)}</h2>

                        <div className="admin-users-badge-row">
                          <span className={getRoleClass(user.role)}>
                            {getRoleText(user.role)}
                          </span>

                          <span className={getProviderClass(user.provider)}>
                            {getProviderText(user.provider)}
                          </span>
                        </div>
                      </div>

                      <div className="admin-users-meta-grid">
                        <div>
                          <span>아이디</span>
                          <p>{user?.username || "-"}</p>
                        </div>

                        <div>
                          <span>이름</span>
                          <p>{user?.name || "-"}</p>
                        </div>

                        <div>
                          <span>이메일</span>
                          <p>{user?.email || "-"}</p>
                        </div>

                        <div>
                          <span>회원 ID</span>
                          <p>{user?.id || "-"}</p>
                        </div>

                        <div>
                          <span>가입일</span>
                          <p>
                            {formatDate(user?.auth_created_at || user?.created_at)}
                          </p>
                        </div>

                        <div>
                          <span>가입방식</span>
                          <p>{getProviderText(user?.provider)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="admin-users-role-editor">
                    <label>
                      <span>역할 변경</span>
                      <select
                        value={normalizeRole(user.role)}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      >
                        <option value="user">일반 회원</option>
                        <option value="worker">전문가</option>
                        <option value="admin">관리자</option>
                      </select>
                    </label>

                    <button
                      type="button"
                      className="admin-users-save-button"
                      onClick={() => handleSaveRole(user)}
                      disabled={savingUserId === user.id}
                    >
                      {savingUserId === user.id ? "저장 중..." : "역할 저장"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

const styles = `
  .admin-users-page {
    min-height: 100dvh;
    background: ${BG};
    color: ${TEXT};
    font-family:
      "Pretendard",
      "Noto Sans KR",
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;
  }

  .admin-users-page * {
    box-sizing: border-box;
  }

  .admin-users-container {
    width: min(1160px, calc(100% - 32px));
    margin: 0 auto;
    padding: 104px 0 56px;
  }

  .admin-users-hero,
  .admin-users-filter-card,
  .admin-users-list-section,
  .admin-users-empty-card {
    background: ${CARD};
    border: 1px solid ${BORDER};
    border-radius: 24px;
    box-shadow: 0 14px 34px rgba(47, 128, 237, 0.08);
  }

  .admin-users-hero {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 18px;
    padding: 26px;
    margin-bottom: 16px;
  }

  .admin-users-kicker {
    display: inline-flex;
    align-items: center;
    margin-bottom: 12px;
    padding: 7px 11px;
    border-radius: 999px;
    background: #EFF6FF;
    color: ${BRAND};
    font-size: 12px;
    font-weight: 900;
  }

  .admin-users-hero h1,
  .admin-users-empty-card h1 {
    margin: 0;
    font-size: 30px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -0.7px;
    color: ${TEXT};
  }

  .admin-users-hero p,
  .admin-users-empty-card p {
    margin: 10px 0 0;
    max-width: 620px;
    color: ${SUB};
    font-size: 14px;
    line-height: 1.75;
    font-weight: 600;
    word-break: keep-all;
  }

  .admin-users-top-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    flex-shrink: 0;
  }

  .admin-users-blue-button,
  .admin-users-white-button,
  .admin-users-save-button {
    min-height: 44px;
    border-radius: 13px;
    padding: 0 18px;
    border: 1px solid transparent;
    font-size: 14px;
    font-weight: 850;
    cursor: pointer;
    outline: none;
    outline-offset: 0;
    -webkit-tap-highlight-color: transparent;
    transition:
      background-color 0.18s ease,
      color 0.18s ease,
      box-shadow 0.18s ease,
      transform 0.18s ease;
  }

  .admin-users-blue-button,
  .admin-users-save-button {
    background: ${BRAND};
    color: #FFFFFF;
    box-shadow: 0 10px 22px rgba(47, 128, 237, 0.18);
  }

  .admin-users-blue-button:hover,
  .admin-users-save-button:hover {
    background: ${BRAND_HOVER};
    box-shadow: 0 12px 24px rgba(31, 111, 214, 0.22);
  }

  .admin-users-white-button {
    background: #FFFFFF;
    border-color: ${BORDER};
    color: ${TEXT};
    box-shadow: none;
  }

  .admin-users-white-button:hover {
    color: ${BRAND};
  }

  .admin-users-blue-button:focus,
  .admin-users-blue-button:focus-visible,
  .admin-users-white-button:focus,
  .admin-users-white-button:focus-visible,
  .admin-users-save-button:focus,
  .admin-users-save-button:focus-visible {
    outline: none;
  }

  .admin-users-summary-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px;
    margin-bottom: 16px;
  }

  .admin-users-summary-card {
    background: #FFFFFF;
    border: 1px solid ${BORDER};
    border-radius: 18px;
    padding: 16px;
    box-shadow: 0 10px 24px rgba(47, 128, 237, 0.055);
  }

  .admin-users-summary-card span {
    display: block;
    margin-bottom: 8px;
    color: ${SUB};
    font-size: 12px;
    font-weight: 850;
  }

  .admin-users-summary-card strong {
    color: ${TEXT};
    font-size: 25px;
    line-height: 1;
    font-weight: 900;
  }

  .admin-users-filter-card {
    padding: 18px;
    margin-bottom: 16px;
  }

  .admin-users-filter-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 220px;
    gap: 10px;
  }

  .admin-users-field {
    display: grid;
    gap: 8px;
  }

  .admin-users-field span {
    font-size: 13px;
    font-weight: 850;
    color: ${TEXT};
  }

  .admin-users-field input,
  .admin-users-field select,
  .admin-users-role-editor select {
    width: 100%;
    height: 48px;
    border: 1px solid ${BORDER};
    border-radius: 14px;
    background: ${SOFT};
    color: ${TEXT};
    padding: 0 14px;
    font-size: 14px;
    outline: none;
    outline-offset: 0;
    appearance: none;
    -webkit-appearance: none;
  }

  .admin-users-field input:focus,
  .admin-users-field select:focus,
  .admin-users-role-editor select:focus {
    border-color: #AFCBF5;
    box-shadow: 0 0 0 3px rgba(47, 128, 237, 0.1);
  }

  .admin-users-count {
    margin-top: 14px;
    color: ${SUB};
    font-size: 13px;
    font-weight: 700;
  }

  .admin-users-count strong {
    color: ${TEXT};
  }

  .admin-users-message {
    margin-top: 12px;
    padding: 12px 14px;
    border: 1px solid #D9E6FF;
    border-radius: 14px;
    background: #F8FBFF;
    color: ${BRAND_HOVER};
    font-size: 13px;
    font-weight: 800;
    line-height: 1.6;
  }

  .admin-users-list-section {
    padding: 18px;
  }

  .admin-users-list {
    display: grid;
    gap: 12px;
  }

  .admin-users-card {
    border: 1px solid ${BORDER};
    border-radius: 20px;
    background: #FFFFFF;
    padding: 18px;
    box-shadow: 0 10px 24px rgba(47, 128, 237, 0.045);
  }

  .admin-users-card-top {
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }

  .admin-users-avatar {
    width: 46px;
    height: 46px;
    border-radius: 16px;
    background: linear-gradient(135deg, #5B9DFF 0%, ${BRAND} 100%);
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 900;
    flex-shrink: 0;
    box-shadow: 0 12px 24px rgba(47, 128, 237, 0.16);
  }

  .admin-users-main-info {
    min-width: 0;
    flex: 1;
  }

  .admin-users-name-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
  }

  .admin-users-name-row h2 {
    margin: 0;
    color: ${TEXT};
    font-size: 20px;
    font-weight: 900;
    line-height: 1.35;
    letter-spacing: -0.3px;
    word-break: break-word;
  }

  .admin-users-badge-row {
    display: flex;
    gap: 7px;
    flex-wrap: wrap;
    justify-content: flex-end;
    flex-shrink: 0;
  }

  .admin-user-role,
  .admin-user-provider {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 29px;
    padding: 0 10px;
    border-radius: 999px;
    border: 1px solid transparent;
    font-size: 12px;
    font-weight: 850;
    white-space: nowrap;
  }

  .admin-user-role.admin {
    background: #FEF2F2;
    border-color: #FECACA;
    color: #DC2626;
  }

  .admin-user-role.worker {
    background: #EEF2FF;
    border-color: #C7D2FE;
    color: #4F46E5;
  }

  .admin-user-role.user {
    background: #F1F5F9;
    border-color: #E2E8F0;
    color: #475569;
  }

  .admin-user-provider.google {
    background: #FFF7ED;
    border-color: #FED7AA;
    color: #C2410C;
  }

  .admin-user-provider.kakao {
    background: #FEF9C3;
    border-color: #FDE68A;
    color: #854D0E;
  }

  .admin-user-provider.email {
    background: #EFF6FF;
    border-color: #BFDBFE;
    color: ${BRAND};
  }

  .admin-user-provider.unknown {
    background: #F8FAFC;
    border-color: #E2E8F0;
    color: ${SUB};
  }

  .admin-users-meta-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
  }

  .admin-users-meta-grid div {
    min-width: 0;
    border: 1px solid ${BORDER};
    border-radius: 14px;
    background: ${SOFT};
    padding: 11px 12px;
  }

  .admin-users-meta-grid span {
    display: block;
    margin-bottom: 5px;
    color: ${SUB};
    font-size: 11px;
    font-weight: 850;
  }

  .admin-users-meta-grid p {
    margin: 0;
    color: ${TEXT};
    font-size: 13px;
    font-weight: 750;
    line-height: 1.45;
    word-break: break-all;
  }

  .admin-users-role-editor {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid ${BORDER};
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .admin-users-role-editor label {
    display: grid;
    gap: 8px;
    min-width: 220px;
    flex: 1;
    max-width: 320px;
  }

  .admin-users-role-editor label span {
    color: ${SUB};
    font-size: 12px;
    font-weight: 850;
  }

  .admin-users-save-button:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .admin-users-empty-list {
    padding: 42px 20px;
    border: 1px dashed ${BORDER};
    border-radius: 18px;
    background: ${SOFT};
    color: ${SUB};
    text-align: center;
    font-size: 14px;
    font-weight: 800;
  }

  .admin-users-empty-card {
    padding: 34px;
  }

  @media (max-width: 900px) {
    .admin-users-container {
      width: min(100% - 28px, 1160px);
      padding-top: 90px;
    }

    .admin-users-hero {
      flex-direction: column;
      padding: 22px 18px;
      border-radius: 22px;
    }

    .admin-users-top-actions,
    .admin-users-blue-button,
    .admin-users-white-button {
      width: 100%;
    }

    .admin-users-summary-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .admin-users-filter-grid {
      grid-template-columns: 1fr;
    }

    .admin-users-card-top {
      flex-direction: column;
    }

    .admin-users-name-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .admin-users-badge-row {
      justify-content: flex-start;
    }

    .admin-users-meta-grid {
      grid-template-columns: 1fr;
    }

    .admin-users-role-editor,
    .admin-users-role-editor label,
    .admin-users-save-button {
      width: 100%;
      max-width: none;
    }
  }

  @media (max-width: 520px) {
    .admin-users-summary-grid {
      grid-template-columns: 1fr;
    }

    .admin-users-hero h1,
    .admin-users-empty-card h1 {
      font-size: 25px;
    }

    .admin-users-card,
    .admin-users-filter-card,
    .admin-users-list-section {
      padding: 14px;
      border-radius: 18px;
    }
  }
`;
