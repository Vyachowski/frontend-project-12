import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import LoginForm from '../components/LoginForm';
import AuthCard from '../components/AuthCard';
import loginImg from '../assets/login.png';

const LoginPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  return (
    <AuthCard image={loginImg}>
      <LoginForm />
    </AuthCard>
  );
};

export default LoginPage;
