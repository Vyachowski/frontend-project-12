import {
  Button, Form, InputGroup,
} from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

import { setShowSignupPageOverlay } from '../store/uiSlice';
import { signup } from '../store/authSlice';
import FieldOverlay from './FieldOverlay';

const SignupForm = () => {
  const showSignupPageOverlay = useSelector((state) => state.ui.showSignupPageOverlay);
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

  const handleUsername = (e) => {
    formik.handleChange(e);
    dispatch(setShowSignupPageOverlay({ showSignupPageOverlay: false }));
  };

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('signupPage.title')}</h1>
      <Form.Group className="mb-3">
        <InputGroup className="mb-4" ref={usernameOverlay}>
          <Form.FloatingLabel label={t('signupPage.labels.usernameFieldLabel')} controlId="username">
            <Form.Control
              type="text"
              placeholder={t('signupPage.labels.usernameFieldLabel')}
              onChange={handleUsername}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              isInvalid={formik.touched.username && formik.errors.username}
            />
          </Form.FloatingLabel>
        </InputGroup>
        {
          formik.errors.username
          && (
            <FieldOverlay
              target={usernameOverlay}
              formikError={formik.errors.username}
            />
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
            <FieldOverlay
              target={passwordOverlay}
              formikError={formik.errors.password}
            />
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
          (formik.errors.passwordConfirmation || showSignupPageOverlay)
          && (
            <FieldOverlay
              target={passwordConfirmationOverlay}
              formikError={formik.errors.passwordConfirmation}
              submitErrorText={
                showSignupPageOverlay
                  ? t(`signupPage.submitErrors.${signupPageErrors.statusCode}`)
                  : null
              }
            />
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
