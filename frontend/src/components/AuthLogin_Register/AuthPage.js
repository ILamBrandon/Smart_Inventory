// src/components/AuthLogin_Register/AuthPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useGoogleLogin } from '@react-oauth/google';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import './AuthPage.css';

// CustomSelect component remains unchanged
function CustomSelect({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (val) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div className="select-menu">
      <div className="select-btn" onClick={() => setOpen(!open)}>
        <span className="sBtn-text">
          {value ? options.find((o) => o.value === value)?.label : placeholder}
        </span>
        <i className="bx bx-chevron-down"></i>
      </div>
      {open && (
        <ul className="options">
          {options.map((option) => (
            <li
              className="option"
              key={option.value}
              onClick={() => handleSelect(option.value)}
            >
              <span className="option-text">{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AuthPage({ onLogin }) {
  const navigate = useNavigate(); // Initialize navigate
  const [isLogin, setIsLogin] = useState(true);
  const [fade, setFade] = useState(true);

  // Common fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Registration-only fields
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const roleOptions = [
    { value: 'supplier', label: 'Supplier' },
    { value: 'owner', label: 'Owner' },
    { value: 'employee', label: 'Employee' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure role is selected when registering
    if (!isLogin && !role) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Role is required for registration.',
        confirmButtonColor: '#000'
      });
      return;
    }

    try {
      if (isLogin) {
        // Login process
        const res = await axios.post('http://localhost:5001/api/auth/login', { username, password });
        const token = res.data.accessToken;
        onLogin(token);
        // Redirect to home page after login
        navigate("/");
      } else {
        // Registration process
        const registrationData = { username, password, email, role };
        await axios.post('http://localhost:5001/api/auth/signup', registrationData);
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'Please log in.',
          confirmButtonColor: '#000'
        });
        setTimeout(() => {
          toggleMode();
        }, 2000);
      }
    } catch (err) {
      let errorMessage = '';
      if (err.response && err.response.data && err.response.data.error) {
        const backendError = err.response.data.error;
        if (isLogin) {
          if (backendError === 'Invalid credentials') {
            errorMessage = 'Username does not exist or password incorrect.';
          } else {
            errorMessage = backendError;
          }
        } else {
          if (backendError === 'Validation error') {
            errorMessage = 'Username already in use or incorrect email format.';
          } else {
            errorMessage = backendError;
          }
        }
      } else {
        errorMessage = isLogin
          ? 'Login failed. Please check your credentials.'
          : 'Registration failed. Please try again.';
      }
      Swal.fire({
        icon: 'error',
        title: isLogin ? 'Login Failed' : 'Registration Failed',
        text: errorMessage,
        confirmButtonColor: '#000'
      });
    }    
  };

  // Toggle between Login and Registration modes
  const toggleMode = () => {
    setFade(false);
    setTimeout(() => {
      setIsLogin((prev) => !prev);
      setUsername('');
      setPassword('');
      setEmail('');
      setRole('');
      setFade(true);
    }, 300);
  };

  const handleSocialLogin = async (provider, response) => {
    const dummyToken = `dummy-${provider}-token`;
    onLogin(dummyToken);
    // Redirect to home page after social login
    navigate("/");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => handleSocialLogin('google', credentialResponse),
    onError: () => {}
  });

  return (
    <div className="auth-page">
      {/* Left Side */}
      <div className="left-side">
        <div className="left-content">
          <h1>Smart Inventory</h1>
          <p>
            Welcome to Smart Inventory – your smart solution for efficient inventory management.
            Seamlessly track, manage, and optimize your inventory with ease.
          </p>
          {/* Picture placed at the bottom */}
          <img
            src="https://d38cf3wt06n6q6.cloudfront.net/tyasuitefront/webgpcs/images/warehouse-management-software.png"
            alt="Warehouse Management"
            className="left-img"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="right-side">
        <Card className={`auth-card ${!isLogin ? 'register-mode' : ''}`}>
          <Card.Body className={fade ? 'fade-in' : 'fade-out'}>
            <h4>{isLogin ? 'Login' : 'Register'}</h4>
            <Form onSubmit={handleSubmit}>
              {!isLogin && (
                <Form.Group className="mb-3" controlId="formRole">
                  <Form.Label className="form-label">Role</Form.Label>
                  <CustomSelect
                    value={role}
                    onChange={setRole}
                    options={roleOptions}
                    placeholder="Select your role"
                  />
                </Form.Group>
              )}
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label className="form-label">Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              {!isLogin && (
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label className="form-label">Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
              )}
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mb-3">
                {isLogin ? 'Login' : 'Register'}
              </Button>
            </Form>
            <div className="divider">
              <span>{isLogin ? 'or login with' : 'or register with'}</span>
            </div>
            <div className="social-buttons">
              <div className="social-button">
                <Button variant="outline-info" className="google-btn" onClick={googleLogin}>
                  <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" />
                  {isLogin ? 'Login with Google' : 'Register with Google'}
                </Button>
              </div>
              <div className="social-button">
                <LinkedIn
                  clientId="86bco2ofgo5q6u"
                  redirectUri={`${window.location.origin}/linkedin`}
                  onSuccess={(code) => handleSocialLogin('linkedin', code)}
                  onError={() => {}}
                  scope="openid profile email"
                >
                  {({ linkedInLogin, disabled }) => (
                    <Button
                      variant="outline-info"
                      className="linkedin-btn"
                      onClick={() => {
                        if (typeof linkedInLogin === 'function') linkedInLogin();
                      }}
                      disabled={disabled}
                    >
                      <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" />
                      {isLogin ? 'Login with LinkedIn' : 'Register with LinkedIn'}
                    </Button>
                  )}
                </LinkedIn>
              </div>
            </div>
            <div className="text-center mt-3 account-switch">
              {isLogin ? (
                <>
                  Don’t have an account?{' '}
                  <span
                    onClick={toggleMode}
                    style={{
                      cursor: 'pointer',
                      color: '#007bff',
                      textDecoration: 'underline',
                      background: 'none',
                      padding: 0,
                      border: 'none'
                    }}
                  >
                    Register here
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <span
                    onClick={toggleMode}
                    style={{
                      cursor: 'pointer',
                      color: '#007bff',
                      textDecoration: 'underline',
                      background: 'none',
                      padding: 0,
                      border: 'none'
                    }}
                  >
                    Login here
                  </span>
                </>
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default AuthPage;
