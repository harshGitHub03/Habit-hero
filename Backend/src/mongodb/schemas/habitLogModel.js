const mongoose = require("mongoose");
const userModel = require("./userModel");
const HabitModel = require("./habitModel");

// habitLog for tracking habit completion per day.
const habitLogSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: userModel,
            required: true
        },
        habitId: {
            type: mongoose.Schema.ObjectId,
            ref: HabitModel,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    },
    { timestamps: true }
)

//Prevent duplicate check-ins (one habit per day per user)
habitLogSchema.index({ userId: 1, habitId: 1, date: 1 }, { unique: true });

//model of habitlog
const habitLogModel =new mongoose.model("HabitLog", habitLogSchema);

module.exports = habitLogModel;