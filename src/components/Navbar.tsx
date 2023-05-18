import React from 'react';
import Container from 'react-bootstrap/Container';
import NavbarBS from 'react-bootstrap/Navbar';

// interface IProps {}

const Navbar: React.FC = () => {
  return (
    <NavbarBS bg="light">
      <Container>
        <NavbarBS.Brand href="/">IKOONA</NavbarBS.Brand>
      </Container>
    </NavbarBS>
  );
};

export default Navbar;
