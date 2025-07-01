const mongoose = require("mongoose")
const userModel = require("./userModel")

const habitSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: userModel,
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        icon: {
            type: String,
        },
        frequency: {
            type: String,
            enum: ["daily", "weekly"],
            default: "daily"
        },
        currentStreak: {
            type: Number,
            default: 0
        },
        maxStreak: {
            type: Number,
            default: 0
        },
        lastCompleted: {
            type: Date,
            default: null
        }
    },
    { timestamps: true }
);

const habitModel =new mongoose.model("HabitModel", habitSchema)
module.exports = habitModel;