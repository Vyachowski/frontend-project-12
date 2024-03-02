import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { setShowModalWindow } from '../store/slices/uiSlice';

const ModalWindow = ({ children, title }) => {
  const dispatch = useDispatch();
  const showModalWindow = useSelector((state) => state.ui.modal.showModalWindow);

  const handleClose = () => {
    dispatch(setShowModalWindow({ showModalWindow: false }));
  };

  return (
    <Modal
      show={showModalWindow}
      centered
      onHide={handleClose}
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
