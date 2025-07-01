import React from "react";

const features = [
  {
    icon: "🎯",
    title: "Stay Focused",
    description: "Set daily or weekly habits to build discipline.",
  },
  {
    icon: "🔥",
    title: "Track Streaks",
    description: "Don’t break the chain — maintain your momentum.",
  },
  {
    icon: "🏆",
    title: "Earn Achievements",
    description: "Unlock badges and XP for every win.",
  },
  {
    icon: "📈",
    title: "Visualize Progress",
    description: "Use charts and calendars to track your growth.",
  },
  {
    icon: "🎮",
    title: "Gamify Life",
    description: "Level up as you complete habits and earn rewards.",
  },
];

const About = () => {
  return (
    <div className="bg-white min-h-screen py-16 px-6 md:px-20">
      {/* Intro Section */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-blue-600">Habit Hero</span>
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Habit Hero helps you build consistency through habit tracking, streaks, rewards, and progress analytics — all gamified to make your self-improvement journey exciting.
        </p>
        <a
          href="/signup"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          🚀 Why <span className="text-blue-600">Habit Hero</span>?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
