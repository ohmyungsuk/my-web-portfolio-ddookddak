import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/hello")
      .then((response) => response.text())
      .then((data) => {
        setMessage(data);
      });
  }, []);

  return (
    <div>
      <h1>태준ENG 홈페이지</h1>
      <p>리액트 화면 연결 성공</p>
      <p>백엔드 응답: {message}</p>
    </div>
  );
}

export default App;