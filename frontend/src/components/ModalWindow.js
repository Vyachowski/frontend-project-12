import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { setShowChannelModal } from '../store/slices/uiSlice';

const ModalWindow = ({ children, title }) => {
  const dispatch = useDispatch;
  const showChannelModal = useSelector((state) => state.ui.modal.showChannelModal);

  const handleHide = () => {
    dispatch(setShowChannelModal({ showChannelModal: false }));
  };

  return (
    <Modal
      show={showChannelModal}
      centered
      onHide={() => handleHide()}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default ModalWindow;
