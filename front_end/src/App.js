import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Workout from './Workout/Workout';
import MealPlanner from './MealPlanner/MealPlanner';
import LoginPage from './LoginPage/LoginPage';
import Signup from './SignupPage/SignupPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/workout-log" element={<Workout />} />
        <Route path="/meal-planner" element={<MealPlanner />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
