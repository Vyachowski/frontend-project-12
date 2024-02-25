import { useSelector } from "react-redux";
import { Col } from "react-bootstrap";

import MessagePanel from "./MessagePanel";

const Messages = () => {
  const channels = useSelector((state) => Object.values(state.channels.entities));
  const messages = useSelector((state) => Object.values(state.messages.entities));

  const activeChannelId = useSelector(state => state.ui.activeChannelId);
  const activeChannel = channels.find((channel) => channel.id === activeChannelId);

  return (
    <Col className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {activeChannel?.name}</b>
          </p>
          <span className="text-muted">0 сообщений</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages
            .filter((message) => message.channelId === activeChannelId)
            .map((message) => (
              <p className={'text-break mb-2'} key={message.id}>
                <strong>{message.username}</strong>
                : {message.body}
              </p>
            ))}
        </div>
        <MessagePanel />
      </div>
    </Col>
  )
}

export default Messages;
