import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

import { logout } from '../store/authSlice';

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        <Button
          type="button"
          className="btn btn-primary"
          onClick={handleLogout}
        >
          {t('components.header.logoutButton')}
        </Button>
      </div>
    </nav>
  );
};

export default Header;
