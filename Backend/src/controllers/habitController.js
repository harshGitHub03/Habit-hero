const habitModel = require("../mongodb/schemas/habitModel")


exports.createHabit = async (req, res) => {
    try {
        const userId = req.user?.userId
        console.log(userId)
        const { title, icon, frequency, } = req.body

        const isHabitDublicate = await habitModel.findOne({ userId, title })

        if (isHabitDublicate) {
            return res.status(401).json({
                success: false,
                message: "Habit already exists",
            })
        }

        //create habit
        const habitCreated = await habitModel.create({ userId, title, icon, frequency })

        return res.status(200).json({
            success: true,
            message: "Habit created successfully",
            habitCreated
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    }
}

exports.getHabit = async (req, res) => {
    try {
        const userId = req.user?.userId

        //find habits of userId
        const habitData = await habitModel.find({ userId })

        //send res
        return res.status(200).json({
            success: true,
            message: "Habit fetched successfully",
            habitData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    }
}


exports.getHabitById = async (req, res) => {
    try {
        console.log(req.params)
        const userId = req.user?.userId
        const habitId = req.params.id

        //find habits of userId
        const habitData = await habitModel.findOne({ userId, _id: habitId })

        //send res
        return res.status(200).json({
            success: true,
            message: "Habit fetched successfully",
            habitData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    }
}

exports.updateHabit = async (req, res) => {
    try {
        const userId = req.user?.userId
        const habitId = req.params?.id
        const { title, icon, frequency } = req.body;

        // find habit to update
        const habit = await habitModel.findOne({ userId, _id: habitId })

        //check and update
        if (title) habit.title = title;
        if (icon) habit.icon = icon;
        if (frequency) habit.frequency = frequency;

        //save updates
        const updatedHabit = await habit.save();

        //send res
        return res.status(200).json({
            success: true,
            message: "Habit updated successfully",
            habitData: updatedHabit
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    }
}


exports.deleteHabit = async (req, res) => {
    try {
        const habitId = req.params?.id

        //delete habit
        const deletedHabit = await habitModel.findByIdAndDelete({ _id: habitId });

        //check if habit already deleted
        if (!deletedHabit) {
            return res.status(400).json({
                success: true,
                message: "Habit already deleted",
                habitData: deletedHabit
            })
        }

        //send response
        return res.status(200).json({
            success: true,
            message: "Habit deleted successfully",
            habitData: deletedHabit
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    }
}