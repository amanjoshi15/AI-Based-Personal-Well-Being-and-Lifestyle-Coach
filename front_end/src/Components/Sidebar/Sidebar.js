import React from 'react';
import './style.css';
import { MyBarChart1, MyBarChart2 } from "./Chart";

const Style2 = {
  border: '1px solid #ddd',
  backgroundColor: 'white',
  padding: '10px 15px',
  borderRadius: '30px',
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
    <div style={{ ...Style2, ...props.style }}>
      {props.text}
    </div>
  );
};

const Sidebar = () => {
  return (
    <aside id='sidebarstyle'>
        <br />
        <h1 id='log1'>Workout Logs</h1>
        <div className="box">
          <h3 style={{ color: "white", display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Host Grotesk", serif' }}>Calories</h3>
          <ul style={Style3}>
            <li className='card1' style={{ margin: '0px 30px' }}>
              <Card text="Week" style={{ color: 'white', backgroundColor: 'darkgreen', border: '1px solid darkgreen' }} />
            </li>
            <li className='card1' style={{ margin: '0px 30px' }}>
              <Card text="Month" />
            </li>
          </ul>
          <MyBarChart1 />
        </div>
        
        <br /><br />
        
        <div className="box">
        <h3 style={{ color: "white", display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Host Grotesk", serif'  }}>Steps</h3>
          <ul style={Style3}>
            <li className='card1' style={{ margin: '0px 30px' }}>
              <Card text="Week" style={{ color: 'white', backgroundColor: 'darkgreen', border: '1px solid darkgreen' }} />
            </li>
            <li className='card1' style={{ margin: '0px 30px' }}>
              <Card text="Month" />
            </li>
          </ul>
          <MyBarChart2 />
        </div>
        <br /><br /><br /><br />
    </aside>
  )
}

export default Sidebar
