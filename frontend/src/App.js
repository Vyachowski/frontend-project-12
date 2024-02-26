import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";

import PageNotFound from "./pages/404Page";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import store from "./store";

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/> } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
