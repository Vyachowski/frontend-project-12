import {
  Button, Form,
} from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

import { setShowSignupPageOverlay } from '../store/uiSlice';
import { signup } from '../store/authSlice';
import FieldOverlay from './FieldOverlay';
import FormField from './FormField';

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
        <FormField
          labelText={t('signupPage.labels.usernameField')}
          formHandler={formik}
          fieldName="username"
          handleChange={handleUsername}
        />
        {
          formik.errors.username
          && (
            <FieldOverlay
              target={usernameOverlay}
              formikError={formik.errors.username}
            />
          )
        }
        <FormField
          labelText={t('signupPage.labels.passwordField')}
          formHandler={formik}
          fieldName="password"
          type="password"
        />
        {
          formik.errors.password
          && (
            <FieldOverlay
              target={passwordOverlay}
              formikError={formik.errors.password}
            />
          )
        }
        <FormField
          labelText={t('signupPage.labels.passwordConfirmationField')}
          formHandler={formik}
          fieldName="passwordConfirmation"
          type="password"
        />
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
