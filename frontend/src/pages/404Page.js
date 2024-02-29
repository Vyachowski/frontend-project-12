import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Header from '../components/Header';

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="container d-flex flex-column h-100 justify-content-center align-items-center">
        <p>{t('page404.info')}</p>
        <p>
          {t('page404.redirect')}
          {' '}
          <Link to="./">
            {t('page404.linkRedirect')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
