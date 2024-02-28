import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { setChannelModal } from '../store/uiSlice';

const ModalWindow = ({ children, title }) => {
  const dispatch = useDispatch;
  const showChannelModal = useSelector((state) => state.ui.showChannelModal);

  const handleHide = () => {
    dispatch(setChannelModal({ showChannelModal: false }));
  }

  return (
    <Modal
      show={showChannelModal}
      centered
      onHide={() => handleHide()}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default ModalWindow;
