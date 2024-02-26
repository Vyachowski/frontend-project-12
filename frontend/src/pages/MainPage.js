import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Header from "../components/Header.js";
import Chat from "../components/Chat.js";

import { logout } from "../store/authSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    !isAuthenticated && navigate('/login');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (['token', 'username'].includes(event.key) && !event.newValue) {
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
    !isAuthenticated
      ? <div className={'text-center d-flex justify-content-center align-items-center'}>Redirect to login page...</div>
      : (
        <div className={'d-flex flex-column h-100'}>
          <Header />
          <Chat />
        </div>
      )
  );
}

export default MainPage;
