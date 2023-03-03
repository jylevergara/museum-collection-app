import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { readToken, removeToken } from '../lib/authenticate';
import { addToHistory } from '../lib/userData';
import { searchHistoryAtom, userTokenAtom } from '../store';

export default function MainNav() {
  const router = useRouter();
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [token, setToken] = useAtom(userTokenAtom);

  useEffect(() => {
    setToken(readToken())
  },[readToken])

  function logout() {
    setIsExpanded(false);
    removeToken();
    setToken(null);
    router.push('/login');
  }

  async function submitForm(e) {
    e.preventDefault(); // prevent the browser from automatically submitting the form

    let queryString = 'title=true';
    queryString += `&q=${searchField}`;

    setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
    setIsExpanded(false);
    router.push(`/artwork?${queryString}`);
  }

  return (
    <>
      <Navbar className="fixed-top navbar-dark" bg="dark" expand="lg" expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Met Museum Collection</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded(!isExpanded)} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref>
                <Nav.Link onClick={() => setIsExpanded(false)}>
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <Link href="/search" passHref>
                  <Nav.Link onClick={() => setIsExpanded(false)}>
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            &nbsp;
            {token && (
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
            )}
            &nbsp;
            {token && (
              <Nav className="me-auto">
                <NavDropdown title={token ? token.userName : 'User Name'} id="basic-nav-dropdown">
                  <Link href="/favourites" passHref>
                    <NavDropdown.Item onClick={() => setIsExpanded(false)}>Favourites</NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref>
                    <NavDropdown.Item onClick={() => setIsExpanded(false)}>Search History</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
            {!token && (
              <Nav className="me-auto">
                <Link href="/register" passHref>
                  <Nav.Link onClick={() => setIsExpanded(false)}>
                    Register
                  </Nav.Link>
                </Link>
                <Link href="/login" passHref>
                  <Nav.Link onClick={() => setIsExpanded(false)}>
                    Login
                  </Nav.Link>
                </Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
