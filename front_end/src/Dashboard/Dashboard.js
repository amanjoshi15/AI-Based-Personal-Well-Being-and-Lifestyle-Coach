import React from 'react';
import Header from '../Components/Header/Header';
import Sidebar from '../Components/Sidebar/Sidebar';
import ExerciseFeed from '../Components/ExerciseFeed/ExerciseFeed';
import MetricsPanel from '../Components/MetricsPanel/MetricsPanel';

const myStyle = {
  backgroundColor: 'green',
  minHeight: '100vh',
  padding: '10px',
  padding: '0px'
};

const Dashboard = () => {
  return (
    <div className="Dashboard" style={myStyle}>
      <Header />
      <div style={{ display: 'flex' }}>
        <main style={{ flex: 1, padding: '20px' }}>
          <ExerciseFeed />
          <MetricsPanel />
        </main>
        <aside style={{ padding: '20px 20px 20px 0px' }}>
          <Sidebar />
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
