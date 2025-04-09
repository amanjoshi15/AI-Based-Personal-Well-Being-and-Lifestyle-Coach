import React from 'react';
import Header from '../Components/Header/Header';
import Login from '../Components/Authorization/Login-authorization';

const myStyle = {
    backgroundColor: 'green',
    minHeight: '100vh',
    padding: '0px'
};

const LoginPage = () => {
  return (
    <div className="Header" style={myStyle}>
      <Header />
      <div style={{ display: 'flex' }}>
        <main style={{ flex: 1, padding: '20px' }}>
          <Login />
        </main>
      </div>
    </div>
  );
};

export default LoginPage;