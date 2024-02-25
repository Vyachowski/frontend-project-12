import { Button, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChannel } from "../store/uiSlice";

const Channels = () => {
  const dispatch = useDispatch();

  const channels = useSelector((state) => Object.values(state.channels.entities));
  const activeChannelId = useSelector(state => state.ui.activeChannelId);

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button type="button" variant="link" className="p-0 lh-1" onClick={null}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path
              d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ListGroup id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-hidden h-100 d-block" defaultActiveKey="#link1" as='ul'>
         {channels.map((channel) => (
          <ListGroupItem key={channel.id} className="nav-item p-0 w-100 overflow-hidden" as='li'>
            <Button
              type='button'
              variant={ channel.id === activeChannelId ? 'secondary' : ''}
              className={'w-100 rounded-0 text-start'}
              onClick={() => dispatch(setActiveChannel(channel.id))}
            >
              <span className="me-1">#</span>{channel.name}
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Col>
  )
}

export default Channels;
