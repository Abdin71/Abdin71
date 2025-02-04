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
import SignIn from "./pages/signin/page";
import SignUp from "./pages/signup/page";
import Todo from './pages/todo/page';
import EditTodo from './pages/editTodo/page';
import AddTodo from './pages/addTodo/page';
import { setUser, getDarkMode, setDarkMode, setToken, isUserLoggedIn } from './helpers/helpers';


const App = () => {
  const darkMode = getDarkMode();
  const isLoggedIn = isUserLoggedIn();
  const htmlElement = document.querySelector('html');
  htmlElement?.setAttribute('data-bs-theme',
    darkMode ? 'dark' : 'light');

  const handleSignout = () => {
    setUser(null);
    setToken(null);
    window.location.reload();
  }

  //handle darkmode toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    const htmlElement = document.querySelector('html');
    htmlElement?.setAttribute('data-bs-theme',
      darkMode ? 'dark' : 'light');
    window.location.reload();
  };

  return (
    <>
      <Navbar expand="md" className="bg-body-tertiary d-flex p-2 align-items-start text-white" style={{ backgroundImage: 'linear-gradient(to right, #2c3e50, #4ca1af)', height: '200px' }}>
        <Navbar.Brand href="/" className="text-white">Todo App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="text-white">Home</Nav.Link>
            <Nav.Link href="#" className="text-white">About</Nav.Link>
            <Nav.Link href="#" className="text-white">Contact</Nav.Link>
          </Nav>
          {isLoggedIn ? (
            <Nav>
              <Nav.Link href="#" onClick={handleSignout} className="text-white">Sign Out</Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href="/signin" className="text-white">Sign In</Nav.Link>
              <Nav.Link href="/signup" className="text-white">Register</Nav.Link>
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/signup"
            element={<SignUp />}
          />
          {isLoggedIn ? (
            <>
              <Route path="/AddTodo" element={<AddTodo />} />
              <Route path="/EditTodo" element={<EditTodo />} />
            </>
          )
            :
            (<>
              <Route path="/AddTodo" element={<SignIn />} />
              <Route path="/EditTodo" element={<SignIn />} />
            </>)
          }
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;