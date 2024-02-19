import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Header from "./Header.js";
import Chat from "./Chat.js";
import axios from "axios";

const MainPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const syncChannelsAndMessages = async () => {
      if (!token) {
        navigate('/login');
      }

      const { data: channels } = await axios
        .get('/api/v1/channels', {
          headers: {"Authorization" : `Bearer ${token}`}
        })

      console.log(channels);

      const { data: messages } = await axios
        .get('/api/v1/messages', {
          headers: {"Authorization" : `Bearer ${token}`}
        })

      console.log(messages);
    }

    syncChannelsAndMessages();
  }, [token, navigate]);

  return (
    !token
      ? <div>Redirect to login page...</div>
      : (
        <div className={'d-flex flex-column h-100'}>
          <Header />
          <Chat />
        </div>
      )
  );
}

export default MainPage;
