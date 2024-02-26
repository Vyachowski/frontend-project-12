import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Header from "../components/Header.js";
import Chat from "../components/Chat.js";
import { logout } from "../store/authSlice";
import {useDispatch, useSelector} from "react-redux";

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'token' && !event.newValue) {
        dispatch(logout());
        navigate('/login');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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
