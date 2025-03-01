import React from 'react';
import Header from '../Components/Header/Header';
import WorkoutLog from '../Components/WorkoutLog/WorkoutLog';

const myStyle = {
    backgroundColor: 'green',
    minHeight: '100vh',
    padding: '0px'
};

const Workout = () => {
  return (
    <div className="Header" style={myStyle}>
      <Header />
      <div style={{ display: 'flex' }}>
        <main style={{ flex: 1, padding: '20px' }}>
          <WorkoutLog />
        </main>
      </div>
    </div>
  );
};

export default Workout;