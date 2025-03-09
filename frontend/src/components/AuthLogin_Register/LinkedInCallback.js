// src/components/AuthLogin_Register/LinkedInCallback.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LinkedInCallback = ({ onLogin }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('[DEBUG] LinkedInCallback mounted');
    console.log('[DEBUG] Location:', location);

    // Parse the query parameters
    const searchParams = new URLSearchParams(location.search);
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    const code = searchParams.get('code');

    if (error) {
      console.error('[DEBUG] OAuth error:', error, errorDescription);
      // Handle error appropriately (e.g., display a message or redirect)
    } else if (code) {
      console.log('[DEBUG] Received authorization code:', code);
      // TODO: Exchange the authorization code for an access token.
      // For now, simulate a successful login.
      const dummyToken = `linkedin-token-${code}`;
      onLogin(dummyToken);
      // Redirect to the home/dashboard page after login
      navigate('/');
    } else {
      console.warn('[DEBUG] No code or error found in query parameters');
    }
  }, [location, navigate, onLogin]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>LinkedIn OAuth Callback</h2>
      <p>Please wait while we process your authentication...</p>
    </div>
  );
};

export default LinkedInCallback;
