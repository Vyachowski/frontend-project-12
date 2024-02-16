import loginImg from '../assets/login.png'
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
  Overlay
} from "react-bootstrap";
import {Link} from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {setUser} from "../store/authSlice";

const LoginPage = () => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    username: Yup.string().required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      const { username, password} = values;
      axios
        .post('/api/v1/login', {
          username,
          password
        })
        .then(r => {
          setShow(false);
          const { token, username} = r.data;
          dispatch(setUser(token, username));
        })
        .catch(() => setShow(true));
    },
  });

  return (
    <Container fluid className={'h-100'}>
      <Row className={'justify-content-center align-content-center h-100'}>
        <Col className={'col-12 col-md-8 col-xxl-6'}>
          <Card className={'shadow-sm'}>
            <CardBody className={'row p-5'}>
              <Col className={'col-12 col-md-6 d-flex align-items-center justify-content-center'}>
                <Image src={loginImg} className={'rounded-circle'} alt={'Welcome to the app.'} width={200}/>
              </Col>
              <Form className={'col-12 col-md-6 mt-3 mt-mb-0'} onSubmit={formik.handleSubmit}>
                <h1 className={'text-center mb-4'}>Войти</h1>
                <Form.Group className="mb-3">
                  <InputGroup className={'mb-3'}>
                    <Form.FloatingLabel label={'Ваш ник'} controlId="username">
                      <Form.Control
                        type="text"
                        placeholder="Ваш ник"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        isInvalid={formik.touched.username && formik.errors.username}
                      />
                    {/*<Form.Control.Feedback type="invalid">*/}
                    {/*  {formik.errors.username}*/}
                    {/*</Form.Control.Feedback>*/}
                    </Form.FloatingLabel>
                  </InputGroup>
                  <InputGroup className={'mb-4'}>
                    <Form.FloatingLabel label={'Пароль'} controlId="password">
                      <Form.Control
                        type="password"
                        placeholder="Пароль"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        isInvalid={formik.touched.password && formik.errors.password}
                      />
                    {/*<Form.Control.Feedback type="invalid">*/}
                    {/*  {formik.errors.password}*/}
                    {/*</Form.Control.Feedback>*/}
                    </Form.FloatingLabel>
                  </InputGroup>
                </Form.Group>
                <Overlay target={target.current} show={show} placement="top-start">
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
                      Неверные имя пользователя или пароль
                    </div>
                  )}
                </Overlay>
                <Button type={'submit'} ref={target} variant={'outline-primary'} className={'w-100 mb-3'}>Войти</Button>
              </Form>
            </CardBody>
            <CardFooter className={'p-4'}>
              <p className={'text-center mb-0'}>
                <span>Нет аккаунта? </span>
                <Link to={'/'}>
                  Регистрация
                </Link>
              </p>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
