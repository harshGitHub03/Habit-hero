import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllHabits, updateHabit, deleteHabit } from "../../redux/thunks/habitThunks";
import { checkInHabit, getTodayLogs } from "../../redux/thunks/habitLogsThunks";
import { useForm } from "react-hook-form";

const Habits = () => {
  const { habitsData } = useSelector(store => store.habitsData);
  const { todayLogs } = useSelector(store => store.habitLogsData);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllHabits());
    dispatch(getTodayLogs());

  }, []);

  const habits = habitsData || [];

  const [editingHabit, setEditingHabit] = useState(null); // edit confirm
  const [deletingHabit, setDeletingHabit] = useState(null); // delete confirm

  const handleEdit = (habit) => {
    setEditingHabit(habit._id);
    reset({ title: habit.title, icon: habit.icon });
  };


  const handleSave = (data) => {
    const newData = {
      title: data.title,
      icon: data.icon,
      habitId: editingHabit,
    };
    dispatch(updateHabit(newData));
    dispatch(getAllHabits());
    setEditingHabit(null);
  };


  const checkInHabitFun = (habitId) => {
    dispatch(checkInHabit(habitId));
    setTimeout(() => {
      dispatch(getTodayLogs());
    }, 300);
  };

  const deleteHabitFunc = (habitId) => {
    dispatch(deleteHabit(habitId)); // dispatch deleteHabit thunk
    setDeletingHabit(null);
    setTimeout(() => dispatch(getAllHabits()), 200); // fetch habit after deletion
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 to-teal-100 px-6 pt-28 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-800 drop-shadow-md">📌 My Habits</h1>
          <Link
            to="/habits/create"
            className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition shadow"
          >
            + New Habit
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {!habits || habits.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center col-span-full py-20 pt-14">
              <div className="text-6xl mb-4">🌱</div>
              <h2 className="text-2xl font-semibold text-indigo-800 mb-2">No habits yet</h2>
              <p className="text-gray-600 mb-6 max-w-md">
                You haven’t created any habits. Start with your first one and begin building a better routine today!
              </p>
              <Link
                to="/habits/create"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full transition font-medium shadow-md"
              >
                + Create Your First Habit
              </Link>
            </div>
          ) : (
            habits.map((habit) => {
              const doneToday = todayLogs?.some(log => log.habitId === habit?._id);

              return (
                <div
                  key={habit?._id}
                  className="bg-white/60 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all"
                >
                  {editingHabit === habit._id ? (
                    <form onSubmit={handleSubmit(handleSave)}>
                      <div className="mb-4 space-y-3">
                        <input
                          {...register("title")}
                          type="text"
                          name="title"
                          defaultValue={habit.title}
                          placeholder="Habit Title"
                          className="w-full p-2 border rounded-md"
                        />
                        <input
                          {...register("icon")}
                          type="text"
                          name="icon"
                          defaultValue={habit.icon}
                          placeholder="Icon (e.g. 🧘)"
                          className="w-full p-2 border rounded-md"
                        />
                      </div>

                      <div className="flex justify-end space-x-3">
                        <button
                          type="submit"
                          className="bg-green-600 text-white px-4 py-2 rounded-full text-sm"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingHabit(null)}
                          className="bg-gray-400 text-white px-4 py-2 rounded-full text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : deletingHabit === habit._id ? (
                    <div className="text-center space-y-4">
                      <p className="text-lg font-semibold text-red-700">
                        Are you sure you want to delete "<span className="font-bold">{habit.title}</span>"?
                      </p>
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => deleteHabitFunc(habit._id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeletingHabit(null)}
                          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-400 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-5xl">{habit?.icon || "🍀"}</div>
                        <div
                          className={`text-sm font-semibold px-3 py-1 rounded-full ${doneToday
                            ? "bg-green-200 text-green-800"
                            : "bg-gray-300 text-gray-700"
                            }`}
                        >
                          {doneToday ? `✔️ Done ${habit.frequency === "daily" ? "Today" : "Weekly"}` : "Pending"}
                        </div>
                      </div>

                      <h2 className="text-2xl font-bold text-indigo-900 mb-4">{habit?.title}</h2>

                      <div className="flex flex-wrap gap-3 text-sm text-gray-700 mb-6">
                        <span className="bg-orange-100 px-3 py-1 rounded-full">
                          🔥 Streak: {habit?.currentStreak}
                        </span>
                        <span className="bg-yellow-100 px-3 py-1 rounded-full">
                          🏆 Best: {habit.maxStreak}
                        </span>
                        <span className="bg-blue-100 px-3 py-1 rounded-full">
                          ⏳ {habit?.frequency.charAt(0).toUpperCase() + habit?.frequency.slice(1)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => checkInHabitFun(habit?._id)}
                          className={`text-sm px-5 py-2 rounded-full font-medium shadow ${doneToday
                            ? "bg-gray-300 text-gray-800 hover:bg-gray-400"
                            : "bg-indigo-600 text-white hover:bg-indigo-700"
                            }`}
                        >
                          {doneToday ? "Checked In" : "Check In"}
                        </button>
                        <div className="space-x-3 text-sm">
                          <button
                            onClick={() => handleEdit(habit)}
                            className="text-indigo-700 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeletingHabit(habit._id)}
                            className="text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Habits;
