import {
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Image,
  Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AuthCard = ({ image, children }) => {
  const { t } = useTranslation();

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <CardBody className="row p-5">
              <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Image src={image} className="rounded-circle" alt="Welcome to the app." width={200} />
              </Col>
              {children}
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

export default AuthCard;
