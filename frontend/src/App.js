import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PageNotFound from "./components/404Page";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/> } />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
