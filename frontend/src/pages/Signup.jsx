import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient.js";

function Signup({ onSwitchToLogin }) {
  const navigate = useNavigate();

  const BRAND_COLOR = "#2F80ED";
  const BRAND_HOVER = "#1F6FD6";
  const TEXT_DARK = "#0F172A";
  const TEXT_MUTED = "#64748B";
  const CARD_BORDER = "#E5EDF6";

  const [mode, setMode] = useState("choice");
  const [signupRole, setSignupRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const redirectTo = `${window.location.origin}${import.meta.env.BASE_URL}#/oauth/callback`;

  useEffect(() => {
    setLoading(false);
    setErrorMessage("");
    sessionStorage.removeItem("oauth_in_progress");
    sessionStorage.removeItem("oauth_provider");
    sessionStorage.removeItem("oauth_mode");
  }, []);

  const passwordChecks = useMemo(() => {
    const value = password || "";

    return {
      minLength: value.length >= 8,
      hasLetter: /[A-Za-z]/.test(value),
      hasNumber: /[0-9]/.test(value),
      hasSpecial: /[!@#$%^&*()_\-+=[\]{};:'",.<>/?\\|`~]/.test(value),
    };
  }, [password]);

  const validatePassword = (value) => {
    if (value.length < 8) {
      return "비밀번호는 8자 이상이어야 합니다.";
    }
    if (!/[A-Za-z]/.test(value)) {
      return "비밀번호에 영문을 1개 이상 포함해주세요.";
    }
    if (!/[0-9]/.test(value)) {
      return "비밀번호에 숫자를 1개 이상 포함해주세요.";
    }
    if (!/[!@#$%^&*()_\-+=[\]{};:'",.<>/?\\|`~]/.test(value)) {
      return "비밀번호에 특수문자를 1개 이상 포함해주세요.";
    }
    return "";
  };

  const handleOAuthSignup = async (provider) => {
    if (loading) return;

    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      sessionStorage.setItem("oauth_in_progress", "true");
      sessionStorage.setItem("oauth_provider", provider);
      sessionStorage.setItem("oauth_mode", "signup");
      sessionStorage.setItem("signup_role", signupRole);

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
        },
      });

      if (error) throw error;
    } catch (error) {
      sessionStorage.removeItem("oauth_in_progress");
      sessionStorage.removeItem("oauth_provider");
      sessionStorage.removeItem("oauth_mode");
      sessionStorage.removeItem("signup_role");
      setErrorMessage(error.message || "소셜 회원가입 중 문제가 발생했습니다.");
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      setErrorMessage("이름을 입력해주세요.");
      return;
    }

    if (!trimmedEmail) {
      setErrorMessage("이메일을 입력해주세요.");
      return;
    }

    if (!password) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    if (!passwordCheck) {
      setErrorMessage("비밀번호 확인을 입력해주세요.");
      return;
    }

    if (password !== passwordCheck) {
      setErrorMessage("비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      setLoading(true);

      const { data: existingProfile, error: existingProfileError } = await supabase
        .from("profiles")
        .select("id, provider")
        .eq("email", trimmedEmail)
        .maybeSingle();

      if (existingProfileError) {
        throw existingProfileError;
      }

      if (existingProfile) {
        setErrorMessage("이미 가입된 이메일입니다. 로그인으로 진행해주세요.");
        setLoading(false);
        return;
      }

      const username = trimmedEmail.split("@")[0];

      const { data, error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: {
          data: {
            name: trimmedName,
            role: signupRole,
          },
          emailRedirectTo: redirectTo,
        },
      });

      if (error) throw error;

      const createdUser = data?.user;

      if (!createdUser?.id) {
        throw new Error("회원가입 사용자 정보를 가져오지 못했습니다.");
      }

      if (Array.isArray(createdUser.identities) && createdUser.identities.length === 0) {
        setErrorMessage("이미 가입된 이메일입니다. 로그인으로 진행해주세요.");
        setLoading(false);
        return;
      }

      const { error: profileError } = await supabase.from("profiles").upsert(
        {
          id: createdUser.id,
          username,
          name: trimmedName,
          email: trimmedEmail,
          role: signupRole,
          provider: "email",
          auth_created_at: createdUser.created_at || new Date().toISOString(),
        },
        { onConflict: "id" }
      );

      if (profileError) throw profileError;

      setSuccessMessage("회원가입이 완료되었습니다. 이메일 인증이 필요하면 메일함을 확인해주세요.");
      setName("");
      setEmail("");
      setPassword("");
      setPasswordCheck("");
      setMode("choice");
      setSignupRole("user");
    } catch (error) {
      setErrorMessage(error.message || "회원가입 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const pageStyle = {
    minHeight: "100vh",
    background: "#F3F6FA",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "28px 16px",
    boxSizing: "border-box",
    fontFamily:
      '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "460px",
    background: "#ffffff",
    borderRadius: "28px",
    padding: "30px 28px 24px",
    border: `1px solid ${CARD_BORDER}`,
    boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
    boxSizing: "border-box",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "22px",
  };

  const brandWrapStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    marginBottom: "18px",
  };

  const brandMarkStyle = {
    width: "38px",
    height: "38px",
    borderRadius: "13px",
    background: BRAND_COLOR,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontWeight: "900",
    fontSize: "13px",
    flexShrink: 0,
    boxShadow: "0 10px 20px rgba(47, 128, 237, 0.16)",
  };

  const brandTextStyle = {
    fontSize: "22px",
    fontWeight: "900",
    color: BRAND_COLOR,
    letterSpacing: "-0.4px",
    lineHeight: 1,
  };

  const titleStyle = {
    margin: "0 0 10px",
    fontSize: "18px",
    fontWeight: "800",
    color: TEXT_DARK,
    lineHeight: 1.4,
    letterSpacing: "-0.3px",
  };

  const descStyle = {
    margin: 0,
    fontSize: "14px",
    color: TEXT_MUTED,
    lineHeight: 1.6,
  };

  const roleSectionStyle = {
    marginBottom: "16px",
  };

  const roleLabelStyle = {
    marginBottom: "10px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#334155",
    textAlign: "left",
  };

  const roleButtonRowStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  };

  const roleGuideBoxStyle = {
    marginTop: "10px",
    padding: "13px 14px",
    borderRadius: "14px",
    background: "#FAFCFF",
    border: "1px solid #E7EEF8",
    textAlign: "left",
  };

  const roleGuideTitleStyle = {
    margin: "0 0 6px",
    fontSize: "13px",
    fontWeight: "800",
    color: TEXT_DARK,
  };

  const roleGuideTextStyle = {
    margin: 0,
    fontSize: "13px",
    lineHeight: 1.6,
    color: TEXT_MUTED,
  };

  const baseButtonStyle = {
    width: "100%",
    height: "50px",
    borderRadius: "14px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxSizing: "border-box",
    outline: "none",
    appearance: "none",
    WebkitAppearance: "none",
    WebkitTapHighlightColor: "transparent",
    transition:
      "background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, filter 0.18s ease",
  };

  const primaryButtonStyle = {
    ...baseButtonStyle,
    border: "none",
    background: BRAND_COLOR,
    color: "#ffffff",
    boxShadow: "0 10px 24px rgba(47, 128, 237, 0.18)",
  };

  const whiteButtonStyle = {
    ...baseButtonStyle,
    border: `1px solid ${CARD_BORDER}`,
    background: "#ffffff",
    color: TEXT_DARK,
    boxShadow: "none",
  };

  const kakaoButtonStyle = {
    ...baseButtonStyle,
    border: "none",
    background: "#FEE500",
    color: "#191919",
    boxShadow: "none",
  };

  const selectedRoleButtonStyle = {
    ...baseButtonStyle,
    height: "46px",
    border: `1px solid ${BRAND_COLOR}`,
    background: "#ffffff",
    color: BRAND_COLOR,
    boxShadow: "none",
  };

  const unselectedRoleButtonStyle = {
    ...baseButtonStyle,
    height: "46px",
    border: `1px solid ${CARD_BORDER}`,
    background: "#ffffff",
    color: TEXT_DARK,
    boxShadow: "none",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#334155",
  };

  const inputStyle = {
    width: "100%",
    height: "50px",
    borderRadius: "13px",
    border: "1px solid #D9E2EC",
    padding: "0 14px",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
    color: TEXT_DARK,
    backgroundColor: "#ffffff",
  };

  const passwordChecklistStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    padding: "12px 14px",
    borderRadius: "14px",
    background: "#FAFCFF",
    border: "1px solid #E7EEF8",
  };

  const checklistRowStyle = (passed) => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: passed ? "#2563EB" : "#64748B",
    fontWeight: passed ? "700" : "500",
    lineHeight: 1.5,
  });

  const checklistDotStyle = (passed) => ({
    width: "8px",
    height: "8px",
    borderRadius: "999px",
    background: passed ? "#2563EB" : "#CBD5E1",
    flexShrink: 0,
  });

  const errorBoxStyle = {
    padding: "12px 14px",
    borderRadius: "12px",
    background: "#FFF1F2",
    color: "#BE123C",
    fontSize: "13px",
    lineHeight: 1.5,
  };

  const successBoxStyle = {
    padding: "12px 14px",
    borderRadius: "12px",
    background: "#ECFDF3",
    color: "#047857",
    fontSize: "13px",
    lineHeight: 1.5,
  };

  const footerStyle = {
    marginTop: "18px",
    textAlign: "center",
    fontSize: "14px",
    color: TEXT_MUTED,
  };

  const footerLinkStyle = {
    border: "none",
    background: "transparent",
    color: BRAND_COLOR,
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    padding: 0,
    outline: "none",
    WebkitTapHighlightColor: "transparent",
  };

  const iconBoxStyle = {
    width: "18px",
    height: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };

  const roleGuide =
    signupRole === "worker"
      ? {
          title: "전문가 회원 안내",
          text: "전문가 회원은 맡은 작업 보기, 요청 수락, 작업 진행과 완료 처리 같은 전문가 전용 흐름을 사용할 수 있어요.",
        }
      : {
          title: "일반 회원 안내",
          text: "일반 회원은 요청 등록, 내 요청 목록 확인, 요청 상세 확인처럼 요청을 맡기는 사용자 흐름으로 이용하게 돼요.",
        };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <div style={brandWrapStyle} onClick={() => navigate("/")}>
            <div style={brandMarkStyle}>ㄸ</div>
            <div style={brandTextStyle}>뚝딱</div>
          </div>

          <h1 style={titleStyle}>
            {mode === "choice" ? "회원가입 방법을 선택해주세요" : "이메일로 회원가입"}
          </h1>

          <p style={descStyle}>
            {mode === "choice"
              ? "일반 회원과 전문가 회원 중 선택한 뒤 가입을 진행할 수 있어요."
              : "회원 정보를 입력하고 가입을 진행해주세요."}
          </p>
        </div>

        {mode === "choice" ? (
          <>
            <div style={roleSectionStyle}>
              <div style={roleLabelStyle}>회원 유형</div>

              <div style={roleButtonRowStyle}>
                <HoverButton
                  onClick={() => setSignupRole("user")}
                  style={
                    signupRole === "user"
                      ? selectedRoleButtonStyle
                      : unselectedRoleButtonStyle
                  }
                  hoverStyle={
                    signupRole === "user"
                      ? {}
                      : {
                          color: BRAND_COLOR,
                        }
                  }
                >
                  일반 회원
                </HoverButton>

                <HoverButton
                  onClick={() => setSignupRole("worker")}
                  style={
                    signupRole === "worker"
                      ? selectedRoleButtonStyle
                      : unselectedRoleButtonStyle
                  }
                  hoverStyle={
                    signupRole === "worker"
                      ? {}
                      : {
                          color: BRAND_COLOR,
                        }
                  }
                >
                  전문가 회원
                </HoverButton>
              </div>

              <div style={roleGuideBoxStyle}>
                <p style={roleGuideTitleStyle}>{roleGuide.title}</p>
                <p style={roleGuideTextStyle}>{roleGuide.text}</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <HoverButton
                onClick={() => setMode("email")}
                disabled={loading}
                style={primaryButtonStyle}
                hoverStyle={{
                  background: BRAND_HOVER,
                  boxShadow: "0 14px 28px rgba(31, 111, 214, 0.22)",
                }}
              >
                이메일로 시작하기
              </HoverButton>

              <HoverButton
                onClick={() => handleOAuthSignup("google")}
                disabled={loading}
                style={whiteButtonStyle}
                hoverStyle={{
                  color: BRAND_COLOR,
                }}
              >
                <span style={iconBoxStyle}>
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    style={{ display: "block", width: "18px", height: "18px" }}
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                </span>
                <span>구글로 회원가입</span>
              </HoverButton>

              <HoverButton
                onClick={() => handleOAuthSignup("kakao")}
                disabled={loading}
                style={kakaoButtonStyle}
                hoverStyle={{
                  filter: "brightness(0.97)",
                }}
              >
                <span style={iconBoxStyle}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ display: "block" }}
                  >
                    <path
                      d="M12 4C7.03 4 3 7.13 3 11c0 2.46 1.63 4.63 4.09 5.88L6.2 20.5c-.08.33.29.59.58.41l4.17-2.72c.34.04.69.06 1.05.06 4.97 0 9-3.13 9-7S16.97 4 12 4Z"
                      fill="#191919"
                    />
                  </svg>
                </span>
                <span>카카오로 회원가입</span>
              </HoverButton>

              {errorMessage && <div style={errorBoxStyle}>{errorMessage}</div>}
              {successMessage && <div style={successBoxStyle}>{successMessage}</div>}
            </div>
          </>
        ) : (
          <form onSubmit={handleSignup} style={formStyle}>
            <div>
              <label style={labelStyle}>이름</label>
              <input
                type="text"
                placeholder="이름을 입력하세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>이메일</label>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={passwordChecklistStyle}>
              <div style={checklistRowStyle(passwordChecks.minLength)}>
                <span style={checklistDotStyle(passwordChecks.minLength)} />
                8자 이상 입력
              </div>
              <div style={checklistRowStyle(passwordChecks.hasLetter)}>
                <span style={checklistDotStyle(passwordChecks.hasLetter)} />
                영문 1개 이상 포함
              </div>
              <div style={checklistRowStyle(passwordChecks.hasNumber)}>
                <span style={checklistDotStyle(passwordChecks.hasNumber)} />
                숫자 1개 이상 포함
              </div>
              <div style={checklistRowStyle(passwordChecks.hasSpecial)}>
                <span style={checklistDotStyle(passwordChecks.hasSpecial)} />
                특수문자 1개 이상 포함
              </div>
            </div>

            <div>
              <label style={labelStyle}>비밀번호 확인</label>
              <input
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
                style={inputStyle}
              />
            </div>

            {errorMessage && <div style={errorBoxStyle}>{errorMessage}</div>}
            {successMessage && <div style={successBoxStyle}>{successMessage}</div>}

            <HoverButton
              type="submit"
              disabled={loading}
              style={primaryButtonStyle}
              hoverStyle={{
                background: BRAND_HOVER,
                boxShadow: "0 14px 28px rgba(31, 111, 214, 0.22)",
              }}
            >
              {loading ? "가입 중..." : "이메일 회원가입"}
            </HoverButton>

            <HoverButton
              onClick={() => setMode("choice")}
              style={whiteButtonStyle}
              hoverStyle={{
                color: BRAND_COLOR,
              }}
            >
              다른 방법 선택
            </HoverButton>
          </form>
        )}

        <div style={footerStyle}>
          이미 계정이 있으신가요?{" "}
          <HoverButton
            onClick={() =>
              onSwitchToLogin ? onSwitchToLogin() : navigate("/login")
            }
            style={footerLinkStyle}
            hoverStyle={{ color: BRAND_HOVER }}
          >
            로그인
          </HoverButton>
        </div>
      </div>
    </div>
  );
}

function HoverButton({
  children,
  onClick,
  style,
  hoverStyle = {},
  disabled = false,
  type = "button",
}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onMouseDown={(e) => e.currentTarget.blur()}
      onMouseUp={(e) => e.currentTarget.blur()}
      onFocus={(e) => e.currentTarget.blur()}
      style={{
        ...style,
        opacity: disabled ? 0.65 : 1,
        cursor: disabled ? "not-allowed" : style?.cursor || "pointer",
        outline: "none",
        boxShadow: style?.boxShadow || "none",
        WebkitTapHighlightColor: "transparent",
        appearance: "none",
        WebkitAppearance: "none",
        transition:
          "background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, filter 0.18s ease",
        ...(isHover && !disabled ? hoverStyle : {}),
      }}
    >
      {children}
    </button>
  );
}

export default Signup;