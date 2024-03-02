import {
  Button, Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { login } from '../store/authSlice';
import FormField from './FormField';
import FieldOverlay from './FieldOverlay';

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
        <FormField
          labelText={t('loginPage.usernameFieldLabel')}
          formHandler={formik}
          fieldName="username"
        />
        <FormField
          labelText={t('loginPage.passwordFieldLabel')}
          formHandler={formik}
          fieldName="password"
          type="password"
          newRef={target}
        />
        {loginPageWarningOverlay
          && (
          <FieldOverlay
            target={target}
            submitErrorText={t('loginPage.overlay')}
          />
          )}
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3">
        {t('loginPage.submitButton')}
      </Button>
    </Form>
  );
};

export default LoginForm;
