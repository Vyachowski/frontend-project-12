import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Header from '../components/Header';

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="container d-flex flex-column h-100 justify-content-center align-items-center">
        <p>{t('page404.infoText')}</p>
        <p>
          {t('page404.redirectText')}
          {' '}
          <Link to="./">
            {t('page404.linkRedirectText')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
