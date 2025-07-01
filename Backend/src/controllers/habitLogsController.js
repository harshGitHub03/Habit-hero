const habitLogModel = require("../mongodb/schemas/habitLogModel");
const habitModel = require("../mongodb/schemas/habitModel");
const userModel = require("../mongodb/schemas/userModel");
const { applyCheckInEffects } = require("../utility/services/checkInEffects");


exports.checkInHabit = async (req, res) => {
    try {
        const habitId = req.params?.id;
        const userId = req.user?.userId;
        console.log(habitId, userId)

        //check if habit already logged in today
        const user = await userModel.findOne({ _id: userId })
        const habit = await habitModel.findOne({ userId, _id: habitId })

        //check if habit exists
        if (!habit) {
            return res.status(400).json({
                success: false,
                message: "Habit dosen't exists."
            })
        }
        //check if habit already checked in today
        const today = new Date()

        const habitLoggedToday = await habitLogModel.findOne({
            userId: user._id.toString(),
            habitId: habit._id.toString(),
            date: {
                $gte: new Date(today.setHours(0, 0, 0, 0)),
                $lt: new Date(today.setHours(23, 59, 59, 999))
            }
        })

        if (habitLoggedToday) { // habit log of today already presents
            return res.status(400).json({
                success: false,
                message: "Habit already checked in today."
            })
        }

        //apply check in effects
        const habitEffects = await applyCheckInEffects(user, habit);

        return res.status(200).json({
            success: false,
            message: "Habit checked in successfully.",
            habitId: habit._id,
            ...habitEffects
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        })
    }
}


exports.getHabitLogsByUserId = async (req, res) => {
    try {
        const userId = req.user?.userId;

        //find data
        const habitLogs = await habitLogModel.find({ userId })

        //res if habit logs are empty
        if (!habitLogs) {
            return res.status(400).json({
                success: false,
                message: "Habit logs are empty.",
            })
        }

        //res if data fetched
        return res.status(200).json({
            success: false,
            message: "Habit logs fetched successfully.",
            habitLogs
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        })
    }
}
exports.getHabitLogsByHabitId = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const habitId = req.params?.id;

        //find data
        const habitLogs = await habitLogModel.find({ userId, _id: habitId })

        //res if habit logs are empty
        if (!habitLogs) {
            return res.status(400).json({
                success: false,
                message: "Habit logs are empty.",
            })
        }

        //res if data fetched
        return res.status(200).json({
            success: false,
            message: "Habit logs fetched successfully.",
            habitLogs
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        })
    }
}


exports.getTodayHabitLogs = async (req, res) => {
    try {
        const userId = req.user?.userId;

        //find data of today
        const today = new Date();

        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        const tadayHabitLogs = await habitLogModel.find({
            userId,
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        })

        //res if habit logs are empty
        if (!tadayHabitLogs) {
            return res.status(400).json({
                success: false,
                message: "Today's Habit logs are empty.",
            })
        }

        //res if data fetched
        return res.status(200).json({
            success: false,
            message: "Today's Habit logs fetched successfully.",
            tadayHabitLogs
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        })
    }
}


exports.removeHabitLogById = async (req, res) => {
    try {
        const habitLogId = req.params?.log_id;
        console.log(habitLogId)
        // find is dosen't exists
        const isExist = await habitLogModel.findOne({ _id: habitLogId })

        // res "dosen't exist" if habit log dosen't exists
        if (!isExist) {
            return res.status(400).json({
                success: false,
                message: "Habit log dosen't exists.",
            })
        }

        //remove habit log if exists
        const removedHabitLog = await habitLogModel.findOneAndDelete({ _id: habitLogId })
        return res.status(200).json({
            success: true,
            message: "Habit log removed successfully.",
            removedHabitLog
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        })
    }
}