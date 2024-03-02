import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { setActiveChannel, setChannelModal } from '../store/slices/uiSlice';
import { deleteChannel } from '../store/slices/channelsSlice';

const RemoveChannelForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.ui.editingChannel);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(deleteChannel(id));
    dispatch(setChannelModal({ showChannelModal: false }));
    dispatch(setActiveChannel({ activeChannelId: '1' }));
  };

  const handleCancel = () => {
    dispatch(setChannelModal({ showChannelModal: false }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="fromChannelName">
        {t('components.removeChannelForm.title')}
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button type="button" className="me-2" variant="secondary" onClick={handleCancel}>
          {t('components.removeChannelForm.cancelButton')}
        </Button>
        <Button type="submit" variant="danger">
          {t('components.removeChannelForm.submitButton')}
        </Button>
      </div>
    </Form>
  );
};

export default RemoveChannelForm;
