// import {Field, Form, Formik} from "formik";
import loginImg from '../assets/login.png'
import {Card, CardBody, CardFooter, Col, Container, Image, Row, Form, Button} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function LoginPage() {
  return (
    <Container fluid className={'h-100'}>
      <Row className={'justify-content-center align-content-center h-100'}>
        <Col className={'col-12 col-md-8 col-xxl-6'}>
          <Card className={'shadow-sm'}>
            <CardBody className={'row p-5'}>
              <Col className={'col-12 col-md-6 d-flex align-items-center justify-content-center'}>
                <Image src={loginImg} className={'rounded-circle'} alt={'Welcome to the app.'} width={200}/>
              </Col>
              <Form className={'col-12 col-md-6 mt-3 mt-mb-0'}>
                <h1 className={'text-center mb-4'}>Войти</h1>
                <Form.Group className="mb-3">
                  <div className={'mb-3'}>
                    <Form.FloatingLabel label={'Ваш ник'} controlId="nickname">
                      <Form.Control type="text" placeholder="Ваш ник"/>
                    </Form.FloatingLabel>
                  </div>
                  <div className={'mb-4'}>
                    <Form.FloatingLabel label={'Пароль'} controlId="password">
                      <Form.Control type="text" placeholder="Пароль"/>
                    </Form.FloatingLabel>
                  </div>
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

// <Formik
//   initialValues={{ nickname: "", password: "" }}
//   onSubmit={(values) => {
//     alert(JSON.stringify(values, null, 2));
//   }}
// >
//   <Form>
//     <Field name="name" type="text" />
//     <Field name="password" type="password" />
//     <button type="submit">Submit</button>
//   </Form>
// </Formik>
