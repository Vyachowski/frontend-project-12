import { Form, InputGroup } from 'react-bootstrap';

const FormField = ({
  labelText, formHandler, fieldName, type = 'text', newRef, handleChange,
}) => (
  <InputGroup className="mb-4" ref={newRef}>
    <Form.FloatingLabel label={labelText} controlId={fieldName}>
      <Form.Control
        type={type}
        placeholder={labelText}
        onChange={handleChange ?? formHandler.handleChange}
        onBlur={formHandler.handleBlur}
        value={formHandler.values[fieldName]}
        isInvalid={formHandler.touched[fieldName] && formHandler.errors[fieldName]}
      />
    </Form.FloatingLabel>
  </InputGroup>
);

export default FormField;
