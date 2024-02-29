// eslint-disable-next-line
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row } from 'react-bootstrap';

import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';

import {
  addChannel, fetchChannels, removeChannel, renameChannel,
} from '../store/channelsSlice';
import { addMessage, fetchMessages } from '../store/messagesSlice';
import Channels from './Channels';
import Messages from './Messages';

const socket = io();

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });

    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
      toast('Канал добавлен');
    });

    socket.on('removeChannel', ({ id }) => {
      dispatch(removeChannel(id));
      toast('Канал удален');
    });

    socket.on('renameChannel', ({ id, name }) => {
      dispatch(renameChannel({ id, changes: { name } }));
      toast('Канал переименован');
    });
  });

  return (
    <Container className="container h-100 my-4 overflow-hidden rounded shadow">
      <Row className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default Chat;
