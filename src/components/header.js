import React from 'react';
import './header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/salco.png';

const Header = () => {
  return (
    <Navbar id='navbar' expand="md" className="bg-body-secondary">
      <Container>
        <Navbar.Brand href="/"><img src={logo} alt='logo'/> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-items">
            <Nav.Link href="/" className='item'>Home</Nav.Link>
            <Nav.Link href="#about" className='item'>About</Nav.Link>
            <Nav.Link href="/products" className='item'>medical drugs & products</Nav.Link>
            <Nav.Link href="#contact" className='item'>contact us</Nav.Link>
            <Nav.Link href="/login" className='item'>login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
