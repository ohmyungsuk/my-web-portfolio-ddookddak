import { useMemo } from "react";

const BRAND = "#2F80ED";
const TEXT = "#0F172A";
const SUB = "#64748B";
const BORDER = "#E5EDF6";

const POLICY_CONTENT = {
  terms: {
    label: "이용약관",
    title: "뚝딱 이용약관",
    desc: "뚝딱 서비스 이용에 필요한 기본 조건과 회원의 권리 및 의무를 안내합니다.",
    sections: [
      {
        heading: "제1조 목적",
        body: "이 약관은 뚝딱이 제공하는 유지보수 요청 접수, 상태 관리, 커뮤니티 등 서비스의 이용 조건과 절차를 정하는 것을 목적으로 합니다.",
      },
      {
        heading: "제2조 서비스 범위",
        body: "회원은 서비스에서 요청 등록, 진행 상태 확인, 담당자 연결, 커뮤니티 게시글 확인 및 작성 기능을 이용할 수 있습니다. 일부 기능은 로그인 또는 회원 유형에 따라 제한될 수 있습니다.",
      },
      {
        heading: "제3조 회원의 책임",
        body: "회원은 요청 내용, 사진, 연락 가능한 정보 등 서비스 이용에 필요한 정보를 사실에 맞게 입력해야 합니다. 허위 정보, 광고성 게시물, 타인의 권리를 침해하는 콘텐츠는 제한될 수 있습니다.",
      },
      {
        heading: "제4조 요청 처리",
        body: "등록된 요청은 담당자 확인 후 상태가 변경될 수 있으며, 작업 가능 여부와 일정은 요청 내용 및 현장 상황에 따라 달라질 수 있습니다.",
      },
      {
        heading: "제5조 서비스 제한",
        body: "서비스 운영을 방해하거나 타인의 이용을 침해하는 행위가 확인될 경우 게시글 삭제, 이용 제한, 계정 조치가 이루어질 수 있습니다.",
      },
    ],
  },
  privacy: {
    label: "개인정보 처리방침",
    title: "개인정보 처리방침",
    desc: "뚝딱이 어떤 개인정보를 수집하고 어떻게 이용, 보관, 보호하는지 안내합니다.",
    sections: [
      {
        heading: "수집하는 개인정보",
        body: "회원가입과 로그인 과정에서 이메일, 이름, 프로필 사진, 회원 유형, 인증 제공자 정보가 수집될 수 있습니다. 요청 접수 과정에서는 요청 내용, 첨부 이미지, 진행 상태 정보가 저장될 수 있습니다.",
      },
      {
        heading: "개인정보 이용 목적",
        body: "수집한 정보는 회원 식별, 요청 접수 및 처리, 담당자 연결, 알림 제공, 고객 문의 대응, 서비스 품질 개선을 위해 이용합니다.",
      },
      {
        heading: "보관 및 파기",
        body: "개인정보는 수집 목적 달성 또는 회원 탈퇴 시 지체 없이 파기합니다. 단, 법령에 따라 보관이 필요한 정보는 정해진 기간 동안 분리하여 보관할 수 있습니다.",
      },
      {
        heading: "제3자 제공",
        body: "뚝딱은 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만 요청 처리에 필요한 범위에서 담당자에게 요청 정보가 전달될 수 있으며, 법령상 의무가 있는 경우 예외적으로 제공될 수 있습니다.",
      },
      {
        heading: "이용자의 권리",
        body: "회원은 마이페이지에서 개인정보를 확인하거나 수정할 수 있으며, 개인정보 삭제 및 처리 정지를 요청할 수 있습니다.",
      },
    ],
  },
};

function PolicyPage({ type = "terms" }) {
  const content = useMemo(
    () => POLICY_CONTENT[type] || POLICY_CONTENT.terms,
    [type],
  );

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #F8FBFF 0%, #F5F7FB 46%, #FFFFFF 100%)",
        padding: "128px 24px 72px",
        boxSizing: "border-box",
        fontFamily:
          '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <section
          style={{
            border: `1px solid ${BORDER}`,
            borderRadius: "8px",
            background: "#ffffff",
            padding: "34px",
            boxShadow: "0 10px 24px rgba(15, 23, 42, 0.04)",
            marginBottom: "18px",
          }}
        >
          <p
            style={{
              margin: "0 0 10px",
              color: BRAND,
              fontSize: "13px",
              fontWeight: "900",
            }}
          >
            {content.label}
          </p>
          <h1
            style={{
              margin: "0 0 14px",
              color: TEXT,
              fontSize: "34px",
              lineHeight: 1.25,
              fontWeight: "950",
            }}
          >
            {content.title}
          </h1>
          <p
            style={{
              margin: 0,
              color: SUB,
              fontSize: "15px",
              lineHeight: 1.8,
              wordBreak: "keep-all",
            }}
          >
            {content.desc}
          </p>
        </section>

        <section
          style={{
            border: `1px solid ${BORDER}`,
            borderRadius: "8px",
            background: "#ffffff",
            padding: "28px 34px",
            boxShadow: "0 10px 24px rgba(15, 23, 42, 0.04)",
          }}
        >
          {content.sections.map((section, index) => (
            <article
              key={section.heading}
              style={{
                paddingTop: index === 0 ? 0 : "22px",
                marginTop: index === 0 ? 0 : "22px",
                borderTop: index === 0 ? "none" : `1px solid ${BORDER}`,
              }}
            >
              <h2
                style={{
                  margin: "0 0 10px",
                  color: TEXT,
                  fontSize: "18px",
                  fontWeight: "950",
                  lineHeight: 1.45,
                }}
              >
                {section.heading}
              </h2>
              <p
                style={{
                  margin: 0,
                  color: SUB,
                  fontSize: "14px",
                  lineHeight: 1.85,
                  wordBreak: "keep-all",
                }}
              >
                {section.body}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export default PolicyPage;
