const mongoose = require("mongoose");
const userModel = require("./userModel");

const achievementSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:userModel,
            required: true
        },

        type: {
            type: String,
            required: true,
            enum: [
                "streak_3", "streak_7", "streak_30",
                "xp_100", "xp_1000", "first_checkin",
                "custom"
            ]
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        earnedAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

const achievementModel =new mongoose.model("Achievement", achievementSchema);
module.exports = achievementModel;