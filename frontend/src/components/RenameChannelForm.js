import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { patchChannel } from "../store/channelsSlice";
import { setChannelModal } from "../store/uiSlice";

const RenameChannelForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const channels = useSelector((state) => Object.values(state.channels.entities));
  const showChannelModal = useSelector(state => state.ui.showChannelModal);
  const editingChannel = useSelector(state => state.ui.editingChannel);

  const channelNames = channels.map(channel => channel.name);

  const validationSchema = Yup.object({
    newChannelName: Yup
      .string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .test('is-unique', 'Имя канала должно быть уникальным', (value) => {
        return !channelNames.includes(value);
      })
  });

  const formik = useFormik({
    initialValues: {
      newChannelName: editingChannel.name,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: validationSchema,
    onSubmit: values => {
      const { newChannelName: name } = values;
      dispatch(patchChannel( { name, id: editingChannel.id }))
      dispatch(setChannelModal({ showChannelModal: false }));
    },
  });

  useEffect(() => {
    if (showChannelModal) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100)
    }
  }, [showChannelModal]);

  return (
    <Form onSubmit={formik.handleSubmit}>
    <Form.Group controlId="fromChannelName">
      <Form.Label visuallyHidden>Переименовать канал</Form.Label>
      <Form.Control
        name='newChannelName'
        className='mb-2'
        type='text'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.newChannelName}
        isInvalid={formik.touched.newChannelName && formik.errors.newChannelName}
        ref={inputRef}
      />
      {formik.errors.newChannelName
        ? (
          <Form.Control.Feedback className='mb-2' type="invalid">
            {formik.errors.newChannelName}
          </Form.Control.Feedback>)
        : null
      }
    </Form.Group>
    <div className="d-flex justify-content-end">
      <Button type='button' className={'me-2'} variant="secondary" onClick={() => dispatch(setChannelModal({ showChannelModal: false }))}>
        Отменить
      </Button>
      <Button type='submit' variant="primary">
        Переименовать
      </Button>
    </div>
  </Form>)
}

export default RenameChannelForm;
