import { ToastContainer, toast } from 'react-toastify';
import { Container, Row } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { io } from 'socket.io-client';

import {
  addChannel, fetchChannels, removeChannel, renameChannel,
} from '../store/channelsSlice';
import { addMessage, fetchMessages } from '../store/messagesSlice';
import { setActiveChannel } from '../store/uiSlice';
import Channels from './Channels';
import Messages from './Messages';

const socket = io();

const Chat = () => {
  const dispatch = useDispatch();
  const activeChannelId = useSelector((state) => state.ui.activeChannelId);

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
      if (id === activeChannelId) {
        dispatch(setActiveChannel({ activeChannelId: '1' }));
      }
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
