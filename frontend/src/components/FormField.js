import { Form, InputGroup } from 'react-bootstrap';

const FormField = ({
  labelText, formik, fieldKey, placeholderText, type = 'text', newRef,
}) => (
  <InputGroup className="mb-4" ref={newRef}>
    <Form.FloatingLabel label={labelText} controlId={fieldKey}>
      <Form.Control
        type={type}
        placeholder={placeholderText}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[formikKey]}
        isInvalid={formik.touched[formikKey] && formik.errors[fieldKey]}
      />
    </Form.FloatingLabel>
  </InputGroup>
);

export default FormField;
