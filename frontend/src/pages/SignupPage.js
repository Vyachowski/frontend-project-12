import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import signupImg from '../assets/signup.jpg';

import AuthCard from '../components/AuthCard';
import SignupForm from '../components/SignupForm';

const SignupPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  return (
    <AuthCard image={signupImg} hasFooter={false}>
      <SignupForm />
    </AuthCard>
  );
};

export default SignupPage;
