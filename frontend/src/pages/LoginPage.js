import {
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Image,
  Row,
  Button,
  InputGroup,
  Form,
  Overlay,
} from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';

import { login } from '../store/authSlice';

import loginImg from '../assets/login.png';

const LoginPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loginPageWarningOverlay = useSelector((state) => state.ui.loginPageWarningOverlay);

  const target = useRef(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <CardBody className="row p-5">
              <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Image src={loginImg} className="rounded-circle" alt="Welcome to the app." width={200} />
              </Col>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('loginPage.header')}</h1>
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
            </CardBody>
            <CardFooter className="p-4">
              <p className="text-center mb-0">
                <span>
                  {t('loginPage.noAccountMessage')}
                </span>
                <Link to="/signup">
                  {t('loginPage.noAccountLink')}
                </Link>
              </p>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
