import React, { useState } from "react";
import PropTypes from "prop-types";
import toast from 'toasted-notes';
import { Navbar, Nav } from 'react-bootstrap'
import LoginComponent from '../Login';
import { useAuthContext } from '../../../utils/auth.context';

function Header({ text }) {

  const { role, setRole } = useAuthContext();
  const [loginShow, setLoginShow] = useState(false);

  const onSubmit = (role) => {
    setRole(role);
    setLoginShow(false);
    if (role === 'admin') {
      toast.notify(`You are admin now`, {
        position: 'top',
      });
    }
  }

  const openLoginModal = () => {
    return <LoginComponent show={loginShow}
      onHide={() => setLoginShow(false)} onSubmit={onSubmit} />
  }

  return (
    <Navbar expand="lg" variant="dark" bg="dark">
      <Navbar.Brand href="#home">{text}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          {role !== 'admin' ? <Nav.Link onClick={() => setLoginShow(true)}>Login</Nav.Link> :
            <Nav.Link onClick={() => setRole()}>Logout</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
      {openLoginModal()}
    </Navbar>
  );
}
Header.defaultProps = {
  text: "Movie Hub"
};
Header.propTypes = {
  text: PropTypes.string
};
export default Header;
