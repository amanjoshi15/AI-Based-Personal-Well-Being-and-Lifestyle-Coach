import React from 'react';
import Header from '../Components/Header/Header';
import LeaderboardLog from '../Components/LeaderboardLog/LeaderboardLog';
import './Leaderboard.css';

const Leaderboard = () => {
  return (
    <div className="leaderboard-page">
      <Header />
      <div className="content-container">
        <main className="main-content">
          <LeaderboardLog />
        </main>
      </div>
    </div>
  );
};

export default Leaderboard;