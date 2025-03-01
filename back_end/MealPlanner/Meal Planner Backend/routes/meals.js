const express = require('express');
const router = express.Router();
const Food = require('../models/Meal');

router.get('/', async (req, res) => {
    try {
        let {
            minCalories, maxCalories, 
            minProtein, maxProtein, 
            minCarbs, maxCarbs, 
            minFat, maxFat, 
            minCholesterol, maxCholesterol,
            minSugar, maxSugar, 
            minCalcium, maxCalcium, 
            minIron, maxIron, 
            minPotassium, maxPotassium
        } = req.query;

        let filter = {};

        if (minCalories) filter.calories = { ...filter.calories, $gte: parseFloat(minCalories) };
        if (maxCalories) filter.calories = { ...filter.calories, $lte: parseFloat(maxCalories) };

        if (minProtein) filter.protein = { ...filter.protein, $gte: parseFloat(minProtein) };
        if (maxProtein) filter.protein = { ...filter.protein, $lte: parseFloat(maxProtein) };

        if (minCarbs) filter.carbohydrate = { ...filter.carbohydrate, $gte: parseFloat(minCarbs) };
        if (maxCarbs) filter.carbohydrate = { ...filter.carbohydrate, $lte: parseFloat(maxCarbs) };

        if (minFat) filter.totalFat = { ...filter.totalFat, $gte: parseFloat(minFat) };
        if (maxFat) filter.totalFat = { ...filter.totalFat, $lte: parseFloat(maxFat) };

        if (minCholesterol) filter.cholesterol = { ...filter.cholesterol, $gte: parseFloat(minCholesterol) };
        if (maxCholesterol) filter.cholesterol = { ...filter.cholesterol, $lte: parseFloat(maxCholesterol) };

        if (minSugar) filter.sugar = { ...filter.sugar, $gte: parseFloat(minSugar) };
        if (maxSugar) filter.sugar = { ...filter.sugar, $lte: parseFloat(maxSugar) };

        if (minCalcium) filter.calcium = { ...filter.calcium, $gte: parseFloat(minCalcium) };
        if (maxCalcium) filter.calcium = { ...filter.calcium, $lte: parseFloat(maxCalcium) };

        if (minIron) filter.iron = { ...filter.iron, $gte: parseFloat(minIron) };
        if (maxIron) filter.iron = { ...filter.iron, $lte: parseFloat(maxIron) };

        if (minPotassium) filter.potassium = { ...filter.potassium, $gte: parseFloat(minPotassium) };
        if (maxPotassium) filter.potassium = { ...filter.potassium, $lte: parseFloat(maxPotassium) };

        const meals = await Food.find(filter).limit(3);

        res.json(meals);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;