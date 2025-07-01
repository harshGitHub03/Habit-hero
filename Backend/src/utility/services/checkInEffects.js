const habitLogModel = require("../../mongodb/schemas/habitLogModel");
const { updateAchievements } = require("./updateAchievements");

//function to check if lastlog == yesterday /daily
const isSameDate = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

//funtion to check if checkIn isWithinWeek" /weekly
const isWithinWeek = (lastCompleted) => {
    const now = new Date();
    const diff = now - new Date(lastCompleted)
    const days = diff / (1000 * 59 * 59 * 24)
    return days <= 7
}

//get yesterdayDate logic
const getYesterdayDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
}

//main applyCheckInFunction
exports.applyCheckInEffects = async (user, habit) => {
    const habitFrequency = habit.frequency;
    const yesterday = getYesterdayDate();

    //get most recent log for streak
    const lastLog = await habitLogModel.findOne({ userId: user._id, habitId: habit._id }).sort({ date: -1 });

    //if habitFrequency is "daily" basis
    if (habitFrequency == "daily") {
        // update currentStreak logic
        if (lastLog && isSameDate(lastLog.date, yesterday))
            habit.currentStreak += 1
        else
            habit.currentStreak = 1
    }

    //if habitFrequency is "weekly" basis
    if (habitFrequency == "weekly") {
        if (lastLog && isWithinWeek(lastLog.date))
            habit.currentStreak += 1
        else
            habit.currentStreak = 1
    }


    //update maxStreak
    if (habit.currentStreak >= habit.maxStreak)
        habit.maxStreak = habit.currentStreak;

    //update user xp and level
    user.xp += 10
    user.level = Math.floor((user.xp / 100) + 1);

    //update habitModel last completed
    user.lastCompleted = new Date();

    //saves
    await user.save();
    await habit.save();

    //create & save habitLog before achievements to create new achievement 
    const habitLogCreated = await habitLogModel.create({ userId: user._id, habitId: habit._id, date: new Date() })


    //update achievements
    const achievements = await updateAchievements(user._id, user.xp, habit.currentStreak)

    //return updated data
    return {
        currentStreak: habit.currentStreak,
        maxStreak: habit.maxStreak,
        xp: user.xp,
        level: user.level,
        achievements,
        lastCompleted: user.lastCompleted
    }
}

