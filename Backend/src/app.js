const express = require("express");
const app = express();
require("dotenv").config(); // to access .env
const cors = require("cors");

const PORT = parseInt(process.env.PORT) || 3000;
require("../src/mongodb/mongodb.connect") // connect to mongodb

//handle post request json body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
console.log(process.env.CORS_ORIGIN)
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

const authRoutes = require("./routes/auth.routes");
const habitRoutes = require("./routes/habit.routes")
const habitLogsRoutes = require("./routes/habit.logs.routes");
const achievementsRoutes = require("./routes/achievements.routes");


//routes
app.use("/auth", authRoutes);
app.use("/habits", habitRoutes)
app.use("/habit-logs", habitLogsRoutes)
app.use("/achievements", achievementsRoutes)

app.listen(PORT, () => console.log("running"))