import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Header from "./Header.js";
import Chat from "./Chat.js";

const MainPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    !token
      ? <div>Redirect to login page...</div>
      : (
        <div className={'d-flex flex-column h-100'}>
          <Header />
          <Chat />
        </div>
      )
  );
}

export default MainPage;
