import { initReactI18next } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import i18n from 'i18next';

import SignupPage from './pages/SignupPage';
import PageNotFound from './pages/404Page';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import resources from './locales/index';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';

i18n
  .use(initReactI18next)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources,
    lng: 'ru', // if you're using a language detector, do not define the lng option
    fallbackLng: 'ru',

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

const App = () => (
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
);

export default App;
