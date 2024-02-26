import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Modal } from "react-bootstrap";

import { setChannelModal } from "../store/uiSlice";
import * as Yup from "yup";
import { useFormik } from "formik";

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

    },
  });

  return (
    <Modal show={showChannelModal} onHide={() => dispatch(setChannelModal({ showChannelModal: false }))}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="channelName">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="channelName"
              placeholder="name@example.com"
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(setChannelModal({ showChannelModal: false }))}>
          Close
        </Button>
        <Button variant="primary" onClick={() => dispatch(setChannelModal({ showChannelModal: false }))}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddChannelModal;
