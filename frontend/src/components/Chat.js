import { Container, Row } from "react-bootstrap";

import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";

import { addChannel, fetchChannels, removeChannel, renameChannel } from "../store/channelsSlice";
import { addMessage, fetchMessages } from "../store/messagesSlice";
import Channels from "./Channels";
import Messages from "./Messages";

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch])

  useEffect(()=> {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });

    socket.on('newChannel', (message) => {
      dispatch(addChannel(message));
    });

    socket.on('removeChannel', (message) => {
      dispatch(removeChannel(message));
    });

    socket.on('renameChannel', (message) => {
      dispatch(renameChannel(message));
    });
  })

  return (
    <Container className="container h-100 my-4 overflow-hidden rounded shadow">
      <Row className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  )
}

export default Chat;
export const socket = io();
