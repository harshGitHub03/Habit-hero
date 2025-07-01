const express = require("express");
const { registerUser, loginUser, getProfile, updateProfile } = require("../controllers/authController");
const { jwtVerify } = require("../middlewares/jwtVerify");
const router = express.Router()

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", jwtVerify, getProfile) // fetch profile
router.put("/profile", jwtVerify, updateProfile); //update profile

module.exports = router;