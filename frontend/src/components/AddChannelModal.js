import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Modal } from "react-bootstrap";

import { setChannelModal } from "../store/uiSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import {postChannel} from "../store/channelsSlice";

const AddChannelModal = () => {
  const dispatch = useDispatch();
  const showChannelModal = useSelector(state => state.ui.showChannelModal);

  const validationSchema = Yup.object({
    username: Yup.string().required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      newChannelName: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      const { newChannelName } = values;
      dispatch(postChannel(newChannelName))
    },
  });

  return (
    <Modal show={showChannelModal} centered onHide={() => dispatch(setChannelModal({ showChannelModal: false }))}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="channelName">
            <Form.Label visuallyHidden>Название канала</Form.Label>
              <Form.Control
                className='mb-2'
                type="channelName"
                placeholder=''
                autoFocus
              />
          </Form.Group>
          <Form.Group className="d-flex justify-content-end">
            <Button className={'me-2'} variant="secondary" onClick={() => dispatch(setChannelModal({ showChannelModal: false }))}>
              Отменить
            </Button>
            <Button variant="primary" onClick={() => dispatch(setChannelModal({ showChannelModal: false }))}>
              Отправить
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddChannelModal;
