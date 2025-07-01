import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHabitLogsOfUser } from "../../redux/thunks/habitLogsThunks";
import { Link } from "react-router-dom";

const groupedHabitLogs = [
  {
    month: "June 2025",
    habits: [
      {
        title: "🧘‍♂️ Meditation",
        logs: ["2025-06-26", "2025-06-24", "2025-06-21"],
      },
      {
        title: "📚 Reading",
        logs: ["2025-06-25", "2025-06-20"],
      },
    ],
  },
  {
    month: "May 2025",
    habits: [
      {
        title: "🏃‍♂️ Running",
        logs: ["2025-05-29", "2025-05-22", "2025-05-18", "2025-05-18", "2025-05-18", "2025-05-18", "2025-05-18", "2025-05-18", "2025-05-18", "2025-05-18"],
      },
    ],
  },
];

export default function HabitHistorySoft() {
  const { allHabitLogs } = useSelector((store) => store.habitLogsData)
  const { habitsData } = useSelector((store) => store.habitsData)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getAllHabitLogsOfUser())
  }, [])

  return (
    <div className="min-h-screen  bg-gradient-to-br from-rose-100 to-teal-100 text-gray-800 px-6 py-14 pt-24">
      <h1 className="text-4xl font-bold text-center mb-12">📋 Habit History</h1>

      <div className="max-w-3xl mx-auto space-y-12">

        {/* if habits have data  else create habit*/}
        {habitsData && habitsData.length > 0 ? habitsData.map((habit, index) => {
          const habitLogs = allHabitLogs?.filter((logs) => logs.habitId == habit._id)

          //return elements
          return <div key={index}>

            <ul className="space-y-6">
              {/* {group?.map((habit, i) => ( */}
              <li className="border-l-4 border-teal-400 pl-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <span className="text-lg font-medium">{habit?.title || "title"}</span>
                  <div className="flex flex-wrap gap-2 mt-2 md:mt-0">

                    { //when logs are empty
                      !habitLogs ?
                        <span
                          className="text-xs px-3 py-1 bg-white border border-gray-200 rounded-full text-gray-600"
                        >
                          no history yet
                        </span> : null
                    }

                    {//when logs are not empty 
                      habitLogs?.map((log, idx) => {
                        if (idx < 40)
                          return <span
                            key={idx}
                            className="text-xs px-3 py-1 bg-white border border-gray-200 rounded-full text-gray-600"
                          >
                            {new Date(log?.date).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric"
                            })}
                          </span>

                      })}
                  </div>
                </div>
              </li>

            </ul>
          </div>
        }) :
          <div className="flex flex-col items-center justify-center text-center col-span-full py-20 pt-14">
            <div className="text-6xl mb-4">⌛</div>
            <h2 className="text-2xl font-semibold text-indigo-800 mb-2">No habits history yet</h2>
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
        }
      </div>
    </div>
  );
}
