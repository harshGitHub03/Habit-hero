const achievementModel = require("../mongodb/schemas/achievementModel");

exports.getAllAchievements = async (req, res) => {
    try {
        const userId = req.user?.userId;

        //find all achievements
        const allAchievement = await achievementModel.find({ userId });
        console.log(allAchievement)
        //check if achievements are empty
        if (!allAchievement) {
            return res.status(400).json({
                success: false,
                message: "Achievements are empty.",
            })
        }

        //return achievements
        return res.status(200).json({
            success: false,
            message: "Achievements fetched successfully.",
            achievements: allAchievement
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


exports.getAchievementsById = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const achievementId = req.params?.id;

        //find all achievements
        const achievementData = await achievementModel.findById(achievementId);

        //check if achievements not exists
        if (!achievementData) {
            return res.status(400).json({
                success: false,
                message: "Achievement dosen't exists.",
            })
        }

        //return achievements
        return res.status(200).json({
            success: false,
            message: "Achievement fetched successfully.",
            achievement: achievementData
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