import { Form, InputGroup } from 'react-bootstrap';

const FormField = ({
  labelText, formik, fieldName, type = 'text', newRef, handleChange,
}) => (
  <InputGroup className="mb-4" ref={newRef}>
    <Form.FloatingLabel label={labelText} controlId={fieldName}>
      <Form.Control
        type={type}
        placeholder={labelText}
        onChange={handleChange ?? formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[fieldName]}
        isInvalid={formik.touched[fieldName] && formik.errors[fieldName]}
      />
    </Form.FloatingLabel>
  </InputGroup>
);

export default FormField;
