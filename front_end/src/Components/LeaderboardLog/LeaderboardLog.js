import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { submitScore, getLeaderboard } from './LeaderboardAPI';
import './LeaderboardLog.css';

const LeaderboardLog = () => {
  const location = useLocation();
  const navigationState = location.state || {};

  const exerciseOptions = [
    "Push-Ups",
    "Pull-Ups",
    "Squats",
    "Jumping Jacks",
    "Russian Twists"
  ];

  const [form, setForm] = useState({
    userId: '',
    userName: '',
    exercise: navigationState.exercise || exerciseOptions[0],
    reps: navigationState.reps || 0,
  });

  const [leaderboard, setLeaderboard] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchLeaderboard();
  }, [form.exercise]); // Fetch when exercise changes

  const handleChange = (e) => {
    const newForm = { ...form, [e.target.name]: e.target.value };
    if (e.target.name === 'exercise') {
      newForm.reps = 0; // Reset reps when exercise changes
    }
    setForm(newForm);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!form.userId || !form.userName) return;

    try {
      const res = await submitScore(form);
      setMessage(res.data.message || 'Score submitted successfully!');
      fetchLeaderboard();
    } catch (err) {
      setMessage('Error submitting score.');
      console.error(err);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await getLeaderboard(form.exercise);
      setLeaderboard(res.data);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
    }
  };

  return (
    <div className="leaderboard-container">
      <h1>🏆 Leaderboard</h1>

      <div className="exercise-selector">
        <label htmlFor="exercise-select">Select Exercise:</label>
        <select
          id="exercise-select"
          name="exercise"
          value={form.exercise}
          onChange={handleChange}
        >
          {exerciseOptions.map((exercise) => (
            <option key={exercise} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="leaderboard-form">
        <input
          type="text"
          name="userId"
          placeholder="User Email ID"
          value={form.userId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="userName"
          placeholder="User Name"
          value={form.userName}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="reps"
          value={form.reps}
          onChange={handleChange}
          placeholder="Number of Reps"
        />
        <button type="submit">Submit Score</button>
      </form>

      {message && <p className="message">{message}</p>}

      <hr />

      <h2>Leaderboard for {form.exercise}</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Reps</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.length > 0 ? (
            leaderboard.map((entry, index) => (
              <tr key={entry._id}>
                <td>{index + 1}</td>
                <td>{entry.userName}</td>
                <td>{entry.reps}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-data">No data yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardLog;
