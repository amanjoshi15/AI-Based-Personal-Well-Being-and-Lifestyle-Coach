const express = require('express');
const router = express.Router();
const LeaderboardEntry = require('../models/LeaderboardEntry');

router.post('/update', async(req, res) => {
    const { userId, userName, exercise, reps } = req.body;
    try {
        const existing = await LeaderboardEntry.findOne({ userId, exercise });
        if( !existing || reps > existing.reps ) {
            const updated = await LeaderboardEntry.findOneAndUpdate(
                { userId, exercise },
                { userId, userName, exercise, reps },
                { new: true, upsert: true }
            );
            return res.status(200).json({ success: true, data: updated });
        }
        else
            return res.status(200).json({ success: false, message: "Not a new PR" });
    } catch(err) {
        return res.status(500).json({ success: false, error: err.message });
    }
})

router.get('/:exercise', async(req, res) => {
    const { exercise } = req.params;

    try {
        const topEntries = await LeaderboardEntry.find({ exercise })
        .sort({ reps: -1 })
        .limit(10);
        res.json(topEntries);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:exercise/:userId', async(req, res) => {
    const { exercise, userId } = req.params;

    try {
        const userEntry = await LeaderboardEntry.findOne({ exercise, userId });
        if(!userEntry) return res.status(400).json({ message: "User not found" });
        const betterCount = await LeaderboardEntry.countDocuments({
            exercise,
            reps: { $gt: userEntry.reps }
        });
        const rank = betterCount + 1;
        res.json({ pr: userEntry.reps, rank });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;