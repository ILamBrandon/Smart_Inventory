// src/index.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="305508461422-en7drpk2crfqs3troo850tdk260l7bu2.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
