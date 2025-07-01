const express = require("express");
const { getAllAchievements, getAchievementsById } = require("../controllers/achievements");
const { jwtVerify } = require("../middlewares/jwtVerify");
const router = express.Router();

router.get("/", jwtVerify, getAllAchievements);
router.get("/:id", jwtVerify, getAchievementsById);

module.exports = router;