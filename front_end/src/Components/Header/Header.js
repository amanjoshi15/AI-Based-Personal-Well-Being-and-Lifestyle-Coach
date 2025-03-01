import React from 'react';
import Logo from './Logo.jpg';
import './style.css';
import { Link } from 'react-router-dom';

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
          <Link to="Compete.js" className='links'>
            <Card text="Compete" className='cards' />
          </Link>
        </li>
        <li className='navitem' style={{ margin: '0px 30px' }}>
          <Link to="Leaderboard.js" className='links'>
            <Card text="Leaderboard" className='cards' />
          </Link>
        </li>
        <li className='navitem' style={{ margin: '0px 30px' }}>
          <Link to="/login" className='links'>
            <Card text="Login" style={{ color: 'white', backgroundColor: 'darkgreen', border: '1px solid darkgreen' }} className='loginCard' />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
