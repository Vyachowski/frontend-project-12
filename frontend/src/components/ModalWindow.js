import {useDispatch, useSelector} from "react-redux";
import { Modal } from "react-bootstrap";

import { setChannelModal } from "../store/uiSlice";

const ModalWindow = ({children}) => {
  const dispatch = useDispatch;
  const showChannelModal = useSelector(state => state.ui.showChannelModal);

  return (
    <Modal show={showChannelModal} centered onHide={() => dispatch(setChannelModal({ showChannelModal: false }))}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
}

export default ModalWindow;
