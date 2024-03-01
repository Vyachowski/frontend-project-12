import {
  Button, Form, InputGroup, Overlay,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { login } from '../store/authSlice';

const LoginForm = () => {
  const loginPageWarningOverlay = useSelector((state) => state.ui.loginPageWarningOverlay);
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const target = useRef(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      const { username, password } = values;
      dispatch(login({ username, password }));
    },
  });

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('loginPage.title')}</h1>
      <Form.Group className="mb-3">
        <InputGroup className="mb-4">
          <Form.FloatingLabel label={t('loginPage.usernameFieldLabel')} controlId="username">
            <Form.Control
              type="text"
              placeholder={t('loginPage.usernameFieldLabel')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              isInvalid={formik.touched.username && formik.errors.username}
            />
          </Form.FloatingLabel>
        </InputGroup>
        <InputGroup className="mb-4" ref={target}>
          <Form.FloatingLabel label={t('loginPage.passwordFieldLabel')} controlId="password">
            <Form.Control
              type="password"
              placeholder={t('loginPage.passwordFieldLabel')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              isInvalid={formik.touched.password && formik.errors.password}
            />
          </Form.FloatingLabel>
        </InputGroup>
        <Overlay target={target.current} show={loginPageWarningOverlay} placement="bottom-start">
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
              {t('loginPage.overlay')}
            </div>
          )}
        </Overlay>
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3">
        {t('loginPage.submitButton')}
      </Button>
    </Form>
  );
};

export default LoginForm;
