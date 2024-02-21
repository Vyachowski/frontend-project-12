import { Button, Col, Container, Form, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useGetChannelsQuery } from "../store/channelsApi";
import { useGetMessagesQuery } from "../store/messagesApi";
import { useState } from "react";

const Chat = () => {
  const [activeChannel, setActiveChannel] = useState('1');
  // const { data: channelsData, error: channelsError, isLoading: isChannelsLoading, refetch: refetchChannels } = useGetChannelsQuery();
  // const { data: messagesData, error: messagesError, isLoading: isMessagesLoading, refetch: refetchMessages } = useGetMessagesQuery();
  const { data: channelsData } = useGetChannelsQuery();
  const { data: messagesData } = useGetMessagesQuery();
  const channels = channelsData || [];
  const messages = messagesData || [];

  return (
    <Container className="container h-100 my-4 overflow-hidden rounded shadow">
      <Row className="row h-100 bg-white flex-md-row">
        <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <Button type="button" variant="link" className="p-0 lh-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path
                  d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                <path
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
              </svg>
              <span className="visually-hidden">+</span>
            </Button>
          </div>
          <ListGroup id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-hidden h-100 d-block" defaultActiveKey="#link1" as='ul'>
            {channels.map((channel) => (
              <ListGroupItem key={channel.id} className="nav-item p-0 w-100 overflow-hidden" as='li'>
                <Button
                  type='button'
                  variant={ channel.id === activeChannel ? 'secondary' :''}
                  className={'w-100 rounded-0 text-start'}
                  onClick={() => setActiveChannel(channel.id)}
                >
                  <span className="me-1">#</span>{channel.name}
                </Button>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b># general</b>
              </p>
              <span className="text-muted">0 сообщений</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5">
              {messages
                .filter((message) => message.channelId === activeChannel)
                .map((message, index) => (
                <p className={'text-break mb-2'} key={index}>
                  <strong>{message.author}</strong>
                  : {message.text}
                </p>
              ))}
            </div>
            <div className="mt-auto px-5 py-3">
              <Form noValidate="" className="py-1 border rounded-2">
                <Form.Group className="d-flex has-validation">
                  <Form.Control className="border-0 p-0 ps-2 form-control" name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..."/>
                  <Button type="submit" className={'border-0 lh-1'} variant={'outline-secondary'} disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                      <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path>
                    </svg>
                    <span className="visually-hidden">Отправить</span>
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Chat;
