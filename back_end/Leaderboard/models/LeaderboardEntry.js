const mongoose = require('mongoose');

const leaderboardEntrySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  exercise: { type: String, required: true },
  reps: { type: Number, required: true },
}, { timestamps: true });

leaderboardEntrySchema.index({ userId: 1, exercise: 1 }, { unique: true });

module.exports = mongoose.model('LeaderboardEntry', leaderboardEntrySchema);