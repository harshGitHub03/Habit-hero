const cors = require("cors");
require("dotenv").config() // to access .env
const express = require("express");
const app = express();

require("../src/mongodb/mongodb.connect") // connect to mongodb

//handle post request json body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

const PORT = parseInt(process.env.PORT) || 3000;

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