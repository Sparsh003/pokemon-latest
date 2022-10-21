import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <Navbar bg="dark" variant="white">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="link">
              Pokemon Go
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/mypokemonList" className="link">
              Catched Pokemon
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
