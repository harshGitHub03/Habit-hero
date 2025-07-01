const express=require("express");
const { jwtVerify } = require("../middlewares/jwtVerify");
const {tryfun, checkInHabit, getHabitLogsByHabitId,getHabitLogsByUserId, getTodayHabitLogs, removeHabitLogById } = require("../controllers/habitLogsController");
const router=express.Router()

router.post("/:id/check-in",jwtVerify,checkInHabit); // to check in habit
router.get("/:id/logs",jwtVerify,getHabitLogsByHabitId); // to get all logs of specific habit
router.get("/all-logs",jwtVerify,getHabitLogsByUserId); // to get all logs of specific user
router.get("/today",jwtVerify,getTodayHabitLogs); // to get today's habit logs
router.delete("/:log_id/remove",jwtVerify,removeHabitLogById)

module.exports=router;