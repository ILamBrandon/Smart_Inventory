import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ModernNavbar from './components/NavbarUI/Navbar';
import InventoryDashboard from './components/InventoryDashboard';
import ProductList from './components/ProductList';
import SupplierList from './components/SupplierList';
import OrderList from './components/OrderList';
import WarehouseList from './components/WarehouseList';
import NotificationsPanel from './components/NotificationsPanel';
import AuthPage from './components/AuthLogin_Register/AuthPage';
import LinkedInCallback from './components/AuthLogin_Register/LinkedInCallback';
import AWSDashboard from './components/AWSDashboard';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // If there is no token, force the auth page to load (even at "/")
  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path="/linkedin" element={<LinkedInCallback onLogin={handleLogin} />} />
          <Route path="/auth" element={<AuthPage onLogin={handleLogin} />} />
          <Route path="/*" element={<AuthPage onLogin={handleLogin} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="app light">
        <ModernNavbar onLogout={handleLogout} />
        <div className="content flex-grow-1 p-4">
          <Routes>
            <Route path="/" element={<InventoryDashboard />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/suppliers" element={<SupplierList />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/warehouses" element={<WarehouseList />} />
            <Route path="/notifications" element={<NotificationsPanel />} />
            <Route path="/aws-dashboard" element={<AWSDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
