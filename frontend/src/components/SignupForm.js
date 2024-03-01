import {
  Button, Form, InputGroup, Overlay,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { signup } from '../store/authSlice';

const SignupForm = () => {
  const signupPageOverlay = useSelector((state) => state.ui.signupPageOverlay);
  const signupPageErrors = useSelector((state) => state.app.signupPageErrors);

  const usernameOverlay = useRef(null);
  const passwordOverlay = useRef(null);
  const passwordConfirmationOverlay = useRef(null);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    username: Yup
      .string()
      .required(t('signupPage.validationErrors.common.required'))
      .min(3, t('signupPage.validationErrors.username.minChar'))
      .max(20, t('signupPage.validationErrors.username.maxChar')),
    password: Yup
      .string()
      .required(t('signupPage.validationErrors.common.required'))
      .min(6, t('signupPage.validationErrors.password.minChar')),
    passwordConfirmation: Yup
      .string()
      .required(t('signupPage.validationErrors.common.required'))
      .oneOf([Yup.ref('password'), null], t('signupPage.validationErrors.passwordConfirmation.equalToPassword')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema,
    onSubmit: (values) => {
      const { username, password } = values;
      dispatch(signup({ username, password }));
    },
  });

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('signupPage.title')}</h1>
      <Form.Group className="mb-3">
        <InputGroup className="mb-4" ref={usernameOverlay}>
          <Form.FloatingLabel label={t('signupPage.labels.usernameFieldLabel')} controlId="username">
            <Form.Control
              type="text"
              placeholder={t('signupPage.labels.usernameFieldLabel')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              isInvalid={formik.touched.username && formik.errors.username}
            />
          </Form.FloatingLabel>
        </InputGroup>
        {
          formik.errors.username
          && (
            <Overlay target={usernameOverlay.current} show placement="bottom-start">
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
                  {formik.errors.username}
                </div>
              )}
            </Overlay>
          )
        }
        <InputGroup className="mb-4" ref={passwordOverlay}>
          <Form.FloatingLabel label={t('signupPage.labels.passwordFieldLabel')} controlId="password">
            <Form.Control
              type="password"
              placeholder={t('signupPage.labels.passwordFieldLabel')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              isInvalid={formik.touched.password && formik.errors.password}
            />
          </Form.FloatingLabel>
        </InputGroup>
        {
          formik.errors.password
          && (
            <Overlay target={passwordOverlay.current} show placement="bottom-start">
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
                  {formik.errors.password}
                </div>
              )}
            </Overlay>
          )
        }
        <InputGroup className="mb-4" ref={passwordConfirmationOverlay}>
          <Form.FloatingLabel label={t('signupPage.labels.passwordConfirmationFieldLabel')} controlId="passwordConfirmation">
            <Form.Control
              type="password"
              placeholder={t('signupPage.labels.passwordConfirmationFieldLabel')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordConfirmation}
              isInvalid={
                formik.touched.passwordConfirmation
                && formik.errors.passwordConfirmation
              }
            />
          </Form.FloatingLabel>
        </InputGroup>
        {
          (formik.errors.passwordConfirmation || signupPageOverlay)
          && (
            <Overlay target={passwordConfirmationOverlay.current} show placement="bottom-start">
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
                  {formik.errors.passwordConfirmation}
                  {t(`signupPage.submitErrors.${signupPageErrors.statusCode}`)}
                </div>
              )}
            </Overlay>
          )
        }
      </Form.Group>
      <Button
        type="submit"
        variant="outline-primary"
        className="w-100 mb-3"
      >
        {t('signupPage.submitButton')}
      </Button>
    </Form>
  );
};

export default SignupForm;
