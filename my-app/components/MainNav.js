import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { searchHistoryAtom } from '../store';


export default function MainNav() {
  const router = useRouter();
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  function submitForm(e) {
    e.preventDefault(); // prevent the browser from automatically submitting the form

    let queryString = 'title=true';
    queryString += `&q=${searchField}`;

    setSearchHistory(current => [...current, queryString]);
    setIsExpanded(false);
    router.push(`/artwork?${queryString}`);
  }

  return (
    <>
      <Navbar className="fixed-top navbar-dark" bg="dark" expand="lg" expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Mary Junelyn Vergara</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded(!isExpanded)} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref>
                <Nav.Link onClick={() => setIsExpanded(false)}>
                  Home
                </Nav.Link>
              </Link>
              <Link href="/search" passHref>
                <Nav.Link onClick={() => setIsExpanded(false)}>
                  Advanced Search
                </Nav.Link>
              </Link>
            </Nav>
            &nbsp;
            <Form className="d-flex" onSubmit={submitForm}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              />
              <Button type="submit" variant="success">Search</Button>
            </Form>
            &nbsp;
            <Nav className="me-auto">
              <NavDropdown title="User Name" id="basic-nav-dropdown">
                <Link href="/favourites" passHref>
                  <NavDropdown.Item onClick={() => setIsExpanded(false)}>Favourites</NavDropdown.Item>
                </Link>
                <Link href="/history" passHref>
                  <NavDropdown.Item onClick={() => setIsExpanded(false)}>Search History</NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
