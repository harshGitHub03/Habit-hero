import React from "react";

const users = [
  {
    icon: "🎓",
    title: "Students",
    description: "Build strong study routines and beat procrastination.",
  },
  {
    icon: "💻",
    title: "Professionals",
    description: "Stay organized, focused, and in control of your tasks.",
  },
  {
    icon: "💪",
    title: "Fitness Enthusiasts",
    description: "Track your workouts and stay accountable to your goals.",
  },
  {
    icon: "📅",
    title: "Everyone",
    description: "Design a daily system that builds your dream lifestyle.",
  },
];

const BuiltFor = () => {
  return (
    <section className="bg-white py-20 px-6 sm:px-12 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">
          💼 Built For Everyone Ready to Grow
        </h2>

        <div className="relative flex flex-col items-center space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 gap-14">

          {users.map((item, index) => (
            <div
              key={index}
              className="relative flex items-start gap-4 sm:gap-6 text-left group hover:scale-[1.03] transition"
            >
              <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl sm:text-3xl shadow-inner">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 mt-1">{item.description}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default BuiltFor;
