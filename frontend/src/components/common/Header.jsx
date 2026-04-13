import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="inner header-inner">
        <h1 className="logo">뚝딱</h1>

        <nav className="nav">
          <Link to="/">홈</Link>
          <Link to="/">서비스 소개</Link>
          <Link to="/login">로그인</Link>
          <Link to="/Signup">회원가입</Link>
          <Link to="/my-requests">내 요청 목록</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
