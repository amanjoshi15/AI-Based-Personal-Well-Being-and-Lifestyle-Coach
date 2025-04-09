import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Workout from './Workout/Workout';
import MealPlanner from './MealPlanner/MealPlanner';
import LoginPage from './LoginPage/LoginPage';
import Signup from './SignupPage/SignupPage';
import Leaderboard from './Leaderboard/Leaderboard';
import ProtectedRoute from './Components/Authorization/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workout-log"
          element={
            <ProtectedRoute>
              <Workout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meal-planner"
          element={
            <ProtectedRoute>
              <MealPlanner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />

        {/* Redirect any unknown routes to dashboard if logged in, or login if not */}
        <Route
          path="*"
          element={
            localStorage.getItem('token') ? 
              <Navigate to="/" replace /> : 
              <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
