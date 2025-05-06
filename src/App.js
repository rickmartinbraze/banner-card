// src/App.js
import React, { useEffect, useState } from 'react';
import { initializeBraze, loginToBraze } from './brazeInit';
import './styles.css';

function App() {
  const [userId, setUserId] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    initializeBraze();
  }, []);

  const handleLogin = () => {
    if (userId.trim()) {
      loginToBraze(userId.trim());
      setLoggedIn(true);
    }
  };

  return (
    <div className="container">
      <div id="global-banner-container" style={{ marginBottom: '1rem' }}></div>

      {!loggedIn ? (
        <>
          <h2>Enter User ID to Log In</h2>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID"
          />
          <button onClick={handleLogin}>Log In</button>
        </>
      ) : (
        <h2>Welcome, {userId}!</h2>
      )}
    </div>
  );
}

export default App;

