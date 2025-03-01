import React from "react";
import "./MealList.css";

const MealList = ({ meals }) => {
    const sampleMeals = [
        {
            id: 1,
            description: "Grilled Chicken Salad",
            calories: 350,
            proteins: 35,
            carbs: 15,
            fats: 18
        },
        {
            id: 2,
            description: "Protein Smoothie",
            calories: 280,
            proteins: 24,
            carbs: 30,
            fats: 10
        },
        {
            id: 3,
            description: "Quinoa Bowl",
            calories: 420,
            proteins: 18,
            carbs: 65,
            fats: 14
        }
    ];

    const displayMeals = meals.length > 0 ? meals : sampleMeals;

    return (
        <div className="meal-list">
            {displayMeals.map((meal, index) => (
                <div key={index} className="meal-item">
                    <div className="meal-name">
                        {meal.description || meal.meal_name || "Unnamed Meal"}
                    </div>
                    <div className="meal-stats">
                        <span>Calories: {meal.calories}</span>
                        <span>• Protein: {meal.proteins || meal.protein || 0}g</span>
                        <span>• Carbs: {meal.carbs || meal.carbohydrates || 0}g</span>
                        <span>• Fat: {meal.fats || meal.fat || 0}g</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MealList;