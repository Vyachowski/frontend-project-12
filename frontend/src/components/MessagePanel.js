import { Button, Form} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { postMessage} from "../store/messagesSlice";
import { setMessageText } from "../store/uiSlice";

const MessagePanel = () => {
  const dispatch = useDispatch();
  const messageText = useSelector((state) => state.ui.messageText);
  const activeChannelId = useSelector(state => state.ui.activeChannelId);
  const username = useSelector(state => state.auth.username)

  const sendMessage = (e) => {
    e.preventDefault();
    const newMessage = { body: messageText, channelId: activeChannelId, username }
    dispatch(postMessage(newMessage));
  }

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" onSubmit={sendMessage}>
        <Form.Group className="d-flex has-validation">
          <Form.Control
            className="border-0 p-0 ps-2 form-control"
            name="body"
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            value={messageText}
            onChange={(e) => dispatch(setMessageText({ messageText: e.target.value }))}
            disabled={false}
          />
          <Button
            type='submit'
            className={'border-0 lh-1'}
            variant={'outline-secondary'}
            disabled={messageText.length === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path>
            </svg>
            <span className="visually-hidden">Отправить</span>
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default MessagePanel;
