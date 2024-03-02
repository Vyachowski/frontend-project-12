import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { patchChannel } from '../store/slices/channelsSlice';
import { setShowChannelModal } from '../store/slices/uiSlice';

const RenameChannelForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const channels = useSelector((state) => Object.values(state.channels.entities));
  const showChannelModal = useSelector((state) => state.ui.modal.showChannelModal);
  const editingChannel = useSelector((state) => state.ui.chat.editingChannel);

  const channelNames = channels.map((channel) => channel.name);

  const validationSchema = Yup.object({
    newChannelName: Yup
      .string()
      .required(t('components.renameChannelForm.validationErrors.required'))
      .min(3, t('components.renameChannelForm.validationErrors.minChar'))
      .max(20, t('components.renameChannelForm.validationErrors.maxChar'))
      .test('is-unique', t('components.renameChannelForm.validationErrors.uniqueName'), (value) => !channelNames.includes(value)),
  });

  const formik = useFormik({
    initialValues: {
      newChannelName: editingChannel.name,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema,
    onSubmit: (values) => {
      const { newChannelName: name } = values;
      dispatch(patchChannel({ name, id: editingChannel.id }));
      dispatch(setShowChannelModal({ showChannelModal: false }));
    },
  });

  useEffect(() => {
    if (showChannelModal) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [showChannelModal]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group controlId="fromChannelName">
        <Form.Label visuallyHidden>{t('components.renameChannelForm.title')}</Form.Label>
        <Form.Control
          name="newChannelName"
          className="mb-2"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newChannelName}
          isInvalid={formik.touched.newChannelName && formik.errors.newChannelName}
          ref={inputRef}
        />
        {
          formik.errors.newChannelName
            ? (
              <Form.Control.Feedback className="mb-2" type="invalid">
                {
                typeof formik.errors.newChannelName === 'string'
                  ? formik.errors.newChannelName
                  : formik.errors.newChannelName.join(' ')
              }
              </Form.Control.Feedback>
            )
            : null
        }
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button type="button" className="me-2" variant="secondary" onClick={() => dispatch(setShowChannelModal({ showChannelModal: false }))}>
          {t('components.renameChannelForm.cancelButton')}
        </Button>
        <Button type="submit" variant="primary">
          {t('components.renameChannelForm.submitButton')}
        </Button>
      </div>
    </Form>
  );
};

export default RenameChannelForm;
