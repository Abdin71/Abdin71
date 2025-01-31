import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMoon
} from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, Button } from "react-bootstrap";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Books from "./pages/books";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import AddBook from './pages/addBook';
import EditBook from './pages/editBook';
import Quotes from './pages/quotes';
import AddQuote from './pages/addQuote';
import { getUser, setUser, getDarkMode, setDarkMode, setToken } from './helpers/helpers';


const App = () => {
  const darkMode = getDarkMode();
  const isLoggedIn = getUser();
  const htmlElement = document.querySelector('html');
  htmlElement.setAttribute('data-bs-theme',
    darkMode ? 'dark' : 'light');

  const handleSignout = () => {
    setUser(false);
    setToken(null);
    window.location.reload();
  }

  //handle darkmode toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    const htmlElement = document.querySelector('html');
    htmlElement.setAttribute('data-bs-theme',
      darkMode ? 'dark' : 'light');
    window.location.reload();
  };

  return (
    <>
      <Navbar expand="md" className="bg-body-tertiary">
        <Navbar.Brand href="/">BooksCRUD</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Contact</Nav.Link>

          </Nav>
          {isLoggedIn ? (
            <Nav>
              <Nav.Link href="#" onClick={handleSignout}>Sign Out</Nav.Link>
            </Nav>

          ) : (
            <Nav>
              <Nav.Link href="/signin">Sign In</Nav.Link>
              <Nav.Link href="/signup">Register</Nav.Link>
            </Nav>
          )}

          <Button variant="primary" onClick={toggleTheme}>
            {darkMode ? (
              <>
                <FontAwesomeIcon icon={faMoon} size="xs" title="Dark Mode" className="fa-solid mx-2" />
                Light Mode
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faMoon} size="xs" title="Dark Mode" className="fa-solid mx-2" />
                Dark Mode
              </>
            )}
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <BrowserRouter forceRefresh={true}>
        <Routes>
          <Route exact path="/" element={<Books />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/signup"
            element={<SignUp />}
          />
          {isLoggedIn ? (
            <>
              <Route path="/addBook" element={<AddBook />} />
              <Route path="/editBook" element={<EditBook />} />
              <Route path="/addQuote" element={<AddQuote />} />
            </>
          )
            :
            (<>
              <Route path="/addBook" element={<SignIn />} />
              <Route path="/editBook" element={<SignIn />} />
              <Route path="/addQuote" element={<SignIn />} />
            </>)
          }




        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;