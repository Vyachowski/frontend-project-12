import { useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";

import { setChannelModal } from "../store/uiSlice";

const RemoveChannelForm = () => {
  const dispatch = useDispatch();

  return (
    <Form onSubmit={null}>
      <Form.Group controlId="fromChannelName">
        Уверены?
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button type='button' className={'me-2'} variant="secondary" onClick={() => dispatch(setChannelModal({ showChannelModal: false }))}>
          Отменить
        </Button>
        <Button type='submit' variant="danger">
          Подтвердить
        </Button>
      </div>
    </Form>
  )
}

export default RemoveChannelForm;
