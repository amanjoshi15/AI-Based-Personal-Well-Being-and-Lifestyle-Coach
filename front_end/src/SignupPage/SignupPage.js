import React from 'react';
import Header from '../Components/Header/Header';
import Signup from '../Components/Authorization/Signup-authorization';

const myStyle = {
    backgroundColor: 'green',
    minHeight: '100vh',
    padding: '0px'
};

const SignupPage = () => {
  return (
    <div className="Header" style={myStyle}>
      <Header />
      <div style={{ display: 'flex' }}>
        <main style={{ flex: 1, padding: '20px' }}>
          <Signup />
        </main>
      </div>
    </div>
  );
};

export default SignupPage;