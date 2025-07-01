import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllHabits } from "../../redux/thunks/habitThunks";
import { checkInHabit, getTodayLogs } from "../../redux/thunks/habitLogsThunks";

const Dashboard = () => {
  const dispatch = useDispatch();
  const userData = useSelector(store => store.authData.user)
  const { habitsData } = useSelector(store => store.habitsData)
  const { todayLogs } = useSelector(store => store.habitLogsData)
  const user = userData || []

  useEffect(() => {
    dispatch(getAllHabits())
    dispatch(getTodayLogs())
  }, [dispatch])

  const todayHabits = habitsData;

  //check in habit and fetch updated habits and logs data
  const checkIn = (habitId) => {
    dispatch(checkInHabit(habitId))
    setTimeout(() => {
      dispatch(getAllHabits());
      dispatch(getTodayLogs())
    }, 200)
  }

  return (
    <div className="min-h-screen pt-28 px-6 pb-16 bg-gradient-to-br from-rose-100 to-teal-100 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-800">Welcome back, {user.name} 👋</h1>
          <Link
            to="/profile"
            className="text-sm text-indigo-600 hover:underline font-medium"
          >
            View Profile →
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <p className="text-4xl font-bold text-blue-600">{user.xp}</p>
            <p className="text-sm text-gray-500 mt-1">Total XP</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <p className="text-4xl font-bold text-green-600">{user.level}</p>
            <p className="text-sm text-gray-500 mt-1">Level</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <p className="text-4xl font-bold text-orange-500">
              {todayHabits && todayHabits.length > 0 ? Math.max(...todayHabits.map((h) => h.currentStreak)) : 0}🔥
            </p>
            <p className="text-sm text-gray-500 mt-1">Best Habit Streak </p>
          </div>
        </div>

        {/* Today’s Habits */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">📅 Today's Habits</h2>
          {todayHabits && todayHabits?.length === 0 ? (
            <p className="text-gray-600">No habits for today yet.</p>
          ) : (
            <ul className="space-y-4">
              {todayHabits?.map((habit, i) => i < 3 ? (
                <li
                  key={habit._id}
                  className={`flex justify-between items-center px-4 py-3 rounded-xl border ${habit.done ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                    }`}
                >
                  <span className={`text-lg flex items-center gap-2 ${todayLogs?.some((ele => ele.habitId == habit._id)) ? "line-through text-gray-400" : "text-gray-900"
                    }`}>
                    {habit.icon || "🍀"} {habit.title}
                  </span>
                  <button onClick={() => checkIn(habit._id)} className={`text-sm  text-white px-4 py-1.5 rounded-full hover:bg-indigo-700 transition  ${todayLogs?.some((ele) => ele.habitId == habit._id) ? "bg-green-600" : "bg-red-400"}`}>
                    {todayLogs?.some((ele) => ele.habitId == habit._id) ? "✓ Done Already" : "Check In"}
                  </button>
                </li>
              ) : null)}
            </ul>
          )}

          <div className="text-right mt-4">
            <Link to="/habits" className="text-indigo-600 hover:underline text-sm">
              View All Habits →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
