const express = require("express");
const { createHabit, getHabit, getHabitById, updateHabit, deleteHabit } = require("../controllers/habitController");
const { jwtVerify } = require("../middlewares/jwtVerify");
const router = express.Router()

router.post("/", jwtVerify, createHabit); //Create habit
router.get("/", jwtVerify, getHabit); // Get all habits
router.get("/:id", jwtVerify, getHabitById); //To get a single habit by id
router.put("/:id", jwtVerify, updateHabit); //To update a single habit by id
router.delete("/:id", jwtVerify, deleteHabit); //To delete a single habit by id



module.exports = router;