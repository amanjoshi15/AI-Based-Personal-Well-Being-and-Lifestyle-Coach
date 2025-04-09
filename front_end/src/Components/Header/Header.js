import React from 'react';
import Logo from './Logo.jpg';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';

const Style1 = {
  padding: '10px',
  backgroundColor: 'white',
  color: 'black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '4px solid black',
};

const Style2 = {
  border: '1px solid #ddd',
  padding: '10px',
  borderRadius: '20px',
  boxShadow: '5px 5px 8px darkgreen',
  marginBottom: '10px',
};

const Style3 = {
  display: 'flex',
  listStyle: 'none',
  justifyContent: 'space-around',
  padding: '0',
  margin: '0',
};

const Card = (props) => {
  return (
    <div className={`cards ${props.className || ''}`} style={{ ...Style2, ...props.style }}>
      {props.text}
    </div>
  );
};


const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token'); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    navigate('/login'); // Redirect to login page
  };

  return (
    <header style={Style1}>
      <div id='header_font' style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src={Logo} style={{ height: '70px' }} alt="Logo" />
        <div style={{ margin: 0 }}>StayFit</div>
      </div>
      <ul style={Style3}>
        <li className='navitem' style={{ margin: '0px 30px' }}>
          <Link to="/" className='links'>
          <Card text="Dashboard" className='cards' />
          </Link>
        </li>
        <li className='navitem' style={{ margin: '0px 30px' }}>
          <Link to="/workout-log" className='links'>
            <Card text="Workout" className='cards' />
          </Link>
        </li>
        <li className='navitem' style={{ margin: '0px 30px' }}>
          <Link to="/meal-planner" className='links'>
            <Card text="Meal Planner" className='cards' />
          </Link>
        </li>
        <li className='navitem' style={{ margin: '0px 30px' }}>
          <Link to="/leaderboard" className='links'>
            <Card text="Leaderboard" className='cards' />
          </Link>
        </li>
        <li className='navitem' style={{ margin: '0px 30px' }}>
          {isLoggedIn ? (
            // Show Logout button if logged in
            <div onClick={handleLogout} className='links' style={{ cursor: 'pointer' }}>
              <Card 
                text="Logout" 
                style={{ color: 'white', backgroundColor: 'darkgreen', border: '1px solid darkgreen' }} 
                className='loginCard' 
              />
            </div>
          ) : (
            // Show Login button if not logged in
            <Link to="/login" className='links'>
              <Card 
                text="Login" 
                style={{ color: 'white', backgroundColor: 'darkgreen', border: '1px solid darkgreen' }} 
                className='loginCard' 
              />
            </Link>
          )}
        </li>
      </ul>
    </header>
  );
};

export default Header;
