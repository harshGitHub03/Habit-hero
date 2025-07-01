import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAchievements } from "../../redux/thunks/achievementsThunks";
import { Link } from "react-router-dom";

// Dummy data – replace with real backend data
const achievements1 = [
  {
    _id: "1",
    type: "streak_3",
    title: "3-Day Streak",
    description: "You've completed a 3-day habit streak!",
    earnedAt: "2024-06-20T10:00:00Z",
  },
  {
    _id: "2",
    type: "xp_100",
    title: "100 XP Earned",
    description: "You’ve earned your first 100 XP. Great start!",
    earnedAt: "2024-06-19T09:00:00Z",
  },
  {
    _id: "3",
    type: "first_checkin",
    title: "First Check-In!",
    description: "You’ve successfully checked in for the first time!",
    earnedAt: "2024-06-18T08:00:00Z",
  },
];

// Icons for each type
const icons = {
  streak_3: "🔥",
  streak_7: "🔥",
  streak_30: "🔥",
  xp_100: "✨",
  xp_1000: "🏆",
  first_checkin: "✅",
  custom: "🎯",
};

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const Achievements = () => {
  const {AchievementsData}=useSelector(store=>store.achievementsData);
  const achievements=AchievementsData||[];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAchievements())
  },[dispatch])

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 to-teal-100 pt-28 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-800 mb-10 text-center">
          🏆 Your Achievements
        </h1>

        {achievements && achievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement) => (
              <div
                key={achievement._id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{icons[achievement.type] || "🎖️"}</span>
                  <span className="text-xs text-gray-500">
                    {formatDate(achievement.earnedAt)}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-indigo-900 mb-1">
                  {achievement.title}
                </h2>
                <p className="text-sm text-gray-700">{achievement.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <div className="text-6xl mb-4">🌟</div>
            <h2 className="text-2xl font-semibold text-indigo-800 mb-2">
              No Achievements Yet
            </h2>
            <p className="text-gray-600 mb-6 max-w-md">
              Start tracking your habits to earn badges and level up. Your journey to consistency begins now!
            </p>
            <Link
              to="/habits"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full transition font-medium shadow-md"
            >
              ➕ Create a Habit
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Achievements;
