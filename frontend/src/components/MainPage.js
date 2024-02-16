import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function MainPage() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');

  useEffect(() => {
    !isAuthenticated && navigate('login');
  }, [isAuthenticated, navigate]);

  return (
    !isAuthenticated
      ? <div>Redirect to login page...</div>
      : <div>CHAT WILL BE HERE SOON!</div>
  );
}
