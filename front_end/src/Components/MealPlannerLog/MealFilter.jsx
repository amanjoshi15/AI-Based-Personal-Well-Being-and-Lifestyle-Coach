import React, { useState } from "react";
import "./MealFilter.css";

const MealFilter = ({ setMeals }) => {
    const [filters, setFilters] = useState({
        minCalories: "",
        maxCalories: "",
        minProtein: "",
        maxProtein: "",
        minCarbs: "",
        maxCarbs: "",
        minFat: "",
        maxFat: ""
    });

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams(filters).toString();

        try {
            const response = await fetch(`http://localhost:8080/api/meals?${queryParams}`);
            const data = await response.json();
            setMeals(data);
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
    };

    return (
        <div className="filter-container">
            <form onSubmit={handleSubmit} className="meal-filter">
                <div className="filter-row">
                    <div className="filter-group">
                        <label>Calories:</label>
                        <div className="input-group">
                            <input type="number" name="minCalories" placeholder="Min" value={filters.minCalories} onChange={handleChange} />
                            <input type="number" name="maxCalories" placeholder="Max" value={filters.maxCalories} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="filter-group">
                        <label>Protein (g):</label>
                        <div className="input-group">
                            <input type="number" name="minProtein" placeholder="Min" value={filters.minProtein} onChange={handleChange} />
                            <input type="number" name="maxProtein" placeholder="Max" value={filters.maxProtein} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className="filter-row">
                    <div className="filter-group">
                        <label>Carbs (g):</label>
                        <div className="input-group">
                            <input type="number" name="minCarbs" placeholder="Min" value={filters.minCarbs} onChange={handleChange} />
                            <input type="number" name="maxCarbs" placeholder="Max" value={filters.maxCarbs} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="filter-group">
                        <label>Fat (g):</label>
                        <div className="input-group">
                            <input type="number" name="minFat" placeholder="Min" value={filters.minFat} onChange={handleChange} />
                            <input type="number" name="maxFat" placeholder="Max" value={filters.maxFat} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <button type="submit" className="search-button">Search Meals</button>
            </form>
        </div>
    );
};

export default MealFilter;