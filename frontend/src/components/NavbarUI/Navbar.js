import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaWarehouse, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

function ModernNavbar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Update the token state in App by calling onLogout
    if (onLogout) {
      onLogout();
    }
    // Redirect to the authentication page using the replace option
    navigate('/auth', { replace: true });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      {/* Using a fluid container removes the default horizontal padding */}
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <FaWarehouse className="mb-1" /> Smart Inventory
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/suppliers">Suppliers</Nav.Link>
            <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
            <Nav.Link as={Link} to="/warehouses">Warehouses</Nav.Link>
            <Nav.Link as={Link} to="/notifications">Notifications</Nav.Link>
            <Nav.Link as={Link} to="/analytics">Analytics</Nav.Link>
            {/* Align dropdown to the right */}
            <NavDropdown title={<FaUserCircle size={20} />} id="user-dropdown" align="end">
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ModernNavbar;
