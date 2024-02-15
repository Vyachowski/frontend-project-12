// import {Field, Form, Formik} from "formik";
import loginImg from '../assets/login.png'
import {Card, CardBody, CardFooter, Col, Container, Image, Row, Button, InputGroup, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import { useFormik} from "formik";
import * as Yup from "yup";

export default function LoginPage() {
  const validationSchema = Yup.object({
    nickname: Yup.string().required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      nickname: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
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
                    <Form.FloatingLabel label={'Ваш ник'} controlId="nickname">
                      <Form.Control
                        type="text"
                        placeholder="Ваш ник"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nickname}
                        isInvalid={formik.touched.nickname && formik.errors.nickname}
                      />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.nickname}
                    </Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.password}
                    </Form.Control.Feedback>
                    </Form.FloatingLabel>
                  </InputGroup>
                </Form.Group>
                <Button type={'submit'} variant={'outline-primary'} className={'w-100 mb-3'}>Войти</Button>
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
