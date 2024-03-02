import {
  Button, ButtonGroup, Col, Dropdown, ListGroup, ListGroupItem,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  setActiveChannel, setShowModalWindow, setModalWindowForm, setEditingChannel,
} from '../store/slices/uiSlice';

import RemoveChannelForm from './RemoveChannelForm';
import RenameChannelForm from './RenameChannelForm';
import AddChannelForm from './AddChannelForm';
import ModalWindow from './ModalWindow';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const channels = useSelector((state) => Object.values(state.channels.entities));
  const activeChannelId = useSelector((state) => state.ui.chat.activeChannelId);
  const showChannelModal = useSelector((state) => state.ui.modal.showModalWindow);
  const channelModalType = useSelector((state) => state.ui.modal.modalWindowForm);

  const getModalTitle = (() => {
    switch (channelModalType) {
      case 'RemoveChannel':
        return t('components.channels.modal.titles.removeChannel');
      case 'RenameChannel':
        return t('components.channels.modal.titles.renameChannel');
      case 'AddChannel':
        return t('components.channels.modal.titles.addChannel');
      default:
        return '';
    }
  });

  const changeActiveChannel = ({ id }) => {
    dispatch(setActiveChannel({ activeChannelId: id }));
  };

  const handleAddChannel = () => {
    dispatch(setModalWindowForm({ modalWindowForm: 'AddChannel' }));
    dispatch(setShowModalWindow({ showModalWindow: true }));
  };

  const handleRemoveChannel = (editingChannel) => {
    dispatch(setModalWindowForm({ modalWindowForm: 'RemoveChannel' }));
    dispatch(setShowModalWindow({ showModalWindow: true }));
    dispatch(setEditingChannel({ editingChannel }));
  };

  const handleRenameChannel = (editingChannel) => {
    dispatch(setModalWindowForm({ modalWindowForm: 'RenameChannel' }));
    dispatch(setShowModalWindow({ showModalWindow: true }));
    dispatch(setEditingChannel({ editingChannel }));
  };

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('components.channels.title')}</b>
        <Button type="button" variant="link" className="p-0 lh-1" onClick={handleAddChannel}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path
              d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
            />
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
          <span className="visually-hidden">{t('components.channels.addButton')}</span>
        </Button>
      </div>
      <ListGroup id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block" defaultActiveKey="#link1" as="ul">
        {channels.map((channel) => (
          <ListGroupItem key={channel.id} className="nav-item p-0 w-100" as="li">
            {channel.removable
              ? (
                <Dropdown className="w-100" as={ButtonGroup}>
                  <Button
                    className="w-100 text-start"
                    variant={channel.id === activeChannelId ? 'secondary' : ''}
                    onClick={() => changeActiveChannel(channel)}
                  >
                    #
                    {' '}
                    {channel.name}
                  </Button>

                  <Dropdown.Toggle
                    split
                    variant={channel.id === activeChannelId ? 'secondary' : ''}
                    id={`dropdown-split-basic-${channel.id}`}
                  >
                    <span className="visually-hidden">
                      {t('components.channels.dropdown.title')}
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      href="#"
                      onClick={() => handleRemoveChannel(channel)}
                    >
                      {t('components.channels.dropdown.removeButton')}
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#"
                      onClick={() => handleRenameChannel(channel)}
                    >
                      {t('components.channels.dropdown.renameButton')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )
              : (
                <Button
                  type="button"
                  variant={channel.id === activeChannelId ? 'secondary' : ''}
                  className="w-100 text-start"
                  onClick={() => changeActiveChannel(channel)}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>
              )}
          </ListGroupItem>
        ))}
      </ListGroup>
      {
        showChannelModal && (
          <ModalWindow
            title={getModalTitle()}
          >
            {channelModalType === 'RemoveChannel' && <RemoveChannelForm />}
            {channelModalType === 'RenameChannel' && <RenameChannelForm />}
            {channelModalType === 'AddChannel' && <AddChannelForm />}
          </ModalWindow>
        )
      }
    </Col>
  );
};

export default Channels;
