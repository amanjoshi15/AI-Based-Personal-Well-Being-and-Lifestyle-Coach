const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const leaderboardRoutes = require("./routes/leaderboard");

const app = express();
const PORT = 5005;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/leaderboardDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected");
}).catch((err) => {
    console.log("Mongo Connection Error: ", err);
});

app.use("/api/leaderboard", leaderboardRoutes);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});