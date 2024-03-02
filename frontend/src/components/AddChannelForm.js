import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { postChannel } from '../store/slices/channelsSlice';
import { setChannelModal } from '../store/slices/uiSlice';
import { filter } from '../locales';

const AddChannelForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const channels = useSelector((state) => Object.values(state.channels.entities));
  const showChannelModal = useSelector((state) => state.ui.showChannelModal);

  const channelNames = channels.map((channel) => channel.name);

  const validationSchema = Yup.object({
    newChannelName: Yup
      .string()
      .required(t('components.addChannelForm.validationErrors.required'))
      .min(3, t('components.addChannelForm.validationErrors.minChars'))
      .max(20, t('components.addChannelForm.validationErrors.maxChars'))
      .test('is-unique', t('components.addChannelForm.validationErrors.uniqueName'), (value) => !channelNames.includes(value)),
  });

  const formik = useFormik({
    initialValues: {
      newChannelName: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema,
    onSubmit: (values) => {
      const { newChannelName } = values;
      const filteredChannelName = filter.clean(newChannelName);
      dispatch(postChannel(filteredChannelName));
      dispatch(setChannelModal({ showChannelModal: false }));
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
        <Form.Label visuallyHidden>{t('components.addChannelForm.title')}</Form.Label>
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
        {formik.errors.newChannelName
          ? (
            <Form.Control.Feedback className="mb-2" type="invalid">
              {formik.errors.newChannelName}
            </Form.Control.Feedback>
          )
          : null}
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button type="button" className="me-2" variant="secondary" onClick={() => dispatch(setChannelModal({ showChannelModal: false }))}>
          {t('components.addChannelForm.cancelButton')}
        </Button>
        <Button type="submit" variant="primary">
          {t('components.addChannelForm.submitButton')}
        </Button>
      </div>
    </Form>
  );
};

export default AddChannelForm;
