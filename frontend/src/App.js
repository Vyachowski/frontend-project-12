import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import i18n from 'i18next';

import SignupPage from './pages/SignupPage';
import PageNotFound from './pages/404Page';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import resources from './locales/index';
import store from './store';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',

    interpolation: {
      escapeValue: false,
    },
  });

const rollbarConfig = {
  accessToken: '6585e2c2acda46f3b6ae4dd072016d81',
};

const App = () => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>
);

export default App;
