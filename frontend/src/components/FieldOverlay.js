import { Overlay } from 'react-bootstrap';

const FieldOverlay = ({ target, formikError, submitErrorText = null }) => (
  <Overlay target={target.current} show placement="bottom-start">
    {({
      placement: _placement,
      arrowProps: _arrowProps,
      show: _show,
      popper: _popper,
      hasDoneInitialMeasure: _hasDoneInitialMeasure,
      ...props
    }) => (
      <div
        {...props}
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(220, 53, 69, 0.9)',
          padding: '2px 10px',
          color: 'white',
          borderRadius: 2.5,
          ...props.style,
        }}
      >
        {formikError}
        {submitErrorText}
      </div>
    )}
  </Overlay>
);

export default FieldOverlay;
