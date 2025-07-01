const achievementModel = require("../../mongodb/schemas/achievementModel");
const habitLogModel = require("../../mongodb/schemas/habitLogModel");

exports.updateAchievements = async (userId, xp, currentStreak) => {
    const achievementsUnlocked = []

    // STREAK: 3 Days
    if (currentStreak === 3) {
        const type = "streak_3";
        const title = "3-Day Streak";
        const description = "You've completed a 3-day habit streak!";

        const isExists = await achievementModel.findOne({ userId, type });
        if (!isExists) {
            await achievementModel.create({ userId, type, title, description });
            achievementsUnlocked.push[type]
        }
    }

    // STREAK: 7 Days
    if (currentStreak === 7) {
        const type = "streak_7";
        const title = "7-Day Streak";
        const description = "You've maintained your habit for a full week!";

        const isExists = await achievementModel.findOne({ userId, type });
        if (!isExists) {
            await achievementModel.create({ userId, type, title, description });
            achievementsUnlocked.push[type]
        }
    }

    // STREAK: 30 Days
    if (currentStreak === 30) {
        const type = "streak_30";
        const title = "30-Day Streak";
        const description = "A whole month! You've nailed 30 days straight!";

        const isExists = await achievementModel.findOne({ userId, type });
        if (!isExists) {
            await achievementModel.create({ userId, type, title, description });
            achievementsUnlocked.push[type]
        }
    }

    // XP: 100
    if (xp >= 100) {
        const type = "xp_100";
        const title = "100 XP Earned";
        const description = "You’ve earned your first 100 XP. Great start!";

        const isExists = await achievementModel.findOne({ userId, type });
        if (!isExists) {
            await achievementModel.create({ userId, type, title, description });
            achievementsUnlocked.push[type]
        }
    }

    // XP: 1000
    if (xp >= 1000) {
        const type = "xp_1000";
        const title = "1000 XP Achieved";
        const description = "Incredible! You’ve gained 1000 XP through habits!";

        const isExists = await achievementModel.findOne({ userId, type });
        if (!isExists) {
            await achievementModel.create({ userId, type, title, description });
            achievementsUnlocked.push[type]
        }
    }

    // First Check-in
    const totalLogs = await habitLogModel.countDocuments({ userId });
    console.log("totalLogs",totalLogs)
    if (totalLogs === 1) {
        const type = "first_checkin";
        const title = "First Check-In!";
        const description = "You’ve successfully checked in for the first time!";
        
        const isExists = await achievementModel.findOne({ userId, type });
        console.log(isExists)
        if (!isExists) {
            await achievementModel.create({ userId, type, title, description });
            achievementsUnlocked.push[type]
        }
    }
console.log(achievementsUnlocked)
    //return achievements unlocked
    return achievementsUnlocked;
}