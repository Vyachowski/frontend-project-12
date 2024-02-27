import {useDispatch, useSelector} from "react-redux";
import { Button, Form } from "react-bootstrap";

import { deleteChannel } from "../store/channelsSlice";
import { setChannelModal } from "../store/uiSlice";

const RemoveChannelForm = () => {
  const dispatch = useDispatch();
  const {id} = useSelector(state => state.ui.editingChannel);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(deleteChannel(id))
    dispatch(setChannelModal({ showChannelModal: false }));
  }

  return (
    <Form onSubmit={handleSubmit}>
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
