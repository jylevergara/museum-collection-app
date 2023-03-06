import { Card, Col, Container, Row } from 'react-bootstrap';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import MainNav from './MainNav';

export default function Layout(props) {
  return (
    <>
      <MainNav />
      <br />
      <Container>
        {props.children}
      </Container>
      <br />
      <Card className="text-center text-white" bg="dark" style={{ borderRadius: 0 }}>
        <Card.Body>
          <Card.Title>Created by <a href="https://jylevergara.com">Jyle Vergara</a></Card.Title>
          <Row className="justify-content-md-center">
            <Col md="auto"><a href="https://instagram.com/jylejouneys"><FaInstagram /></a></Col>
            <Col md="auto"><a href="https://github.com/jylevergara"><FaGithub /></a></Col>
            <Col md="auto"><a href="https://linkedin.com/mary-junelyn-vergara"><FaLinkedin /></a></Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
