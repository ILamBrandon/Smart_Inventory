import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaWarehouse, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    onLogout();
    navigate('/auth', { replace: true });
  };

  return (
    <nav className="custom-navbar">
      <div className="custom-navbar-container">
        <Link to="/" className="custom-navbar-brand">
          <FaWarehouse className="icon" /> Smart Inventory
        </Link>
        <button className="custom-navbar-toggle" onClick={toggleMenu}>
          &#9776;
        </button>
        <div className={`custom-navbar-collapse ${menuOpen ? 'open' : ''}`}>
          <ul className="custom-navbar-nav">
            <li className="nav-item">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link to="/suppliers">Suppliers</Link>
            </li>
            <li className="nav-item">
              <Link to="/orders">Orders</Link>
            </li>
            <li className="nav-item">
              <Link to="/warehouses">Warehouses</Link>
            </li>
            <li className="nav-item">
              <Link to="/analytics">Analytics</Link>
            </li>
            <li className="nav-item">
              <Link to="/notifications">Notifications</Link>
            </li>
            <li className="nav-item dropdown">
              <span className="dropdown-toggle" onClick={toggleDropdown}>
                <FaUserCircle size={20} />
              </span>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/settings">Settings</Link>
                  </li>
                  <li className="dropdown-divider"></li>
                  <li>
                    <button onClick={handleLogout} className="dropdown-logout">
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
