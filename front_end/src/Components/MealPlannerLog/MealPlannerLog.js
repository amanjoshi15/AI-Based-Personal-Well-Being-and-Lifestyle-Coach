import React, { useState } from 'react';
import MealFilter from './MealFilter';
import MealList from './MealList';
import './MealPlannerLog.css';

const MealPlannerLog = () => {
    const [meals, setMeals] = useState([]);

    return (
        <div className="meal-planner-container">
            <h1 className="meal-title">Today's Meal Plan</h1>
            <MealFilter setMeals={setMeals} />
            <MealList meals={meals} />
        </div>
    );
};

export default MealPlannerLog;