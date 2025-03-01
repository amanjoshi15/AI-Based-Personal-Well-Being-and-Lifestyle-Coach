import React from 'react';
import Header from '../Components/Header/Header';
import MealPlannerLog from '../Components/MealPlannerLog/MealPlannerLog';
import './MealPlanner.css';

const MealPlanner = () => {
  return (
    <div className="meal-planner-page">
      <Header />
      <div className="content-container">
        <main className="main-content">
          <MealPlannerLog />
        </main>
      </div>
    </div>
  );
};

export default MealPlanner;