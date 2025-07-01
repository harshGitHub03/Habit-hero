import React from "react";

const steps = [
  {
    icon: "📝",
    title: "Sign Up",
    description: "Create your free account and start tracking right away.",
  },
  {
    icon: "🛠️",
    title: "Create Habits",
    description: "Add routines like Workout, Read, or Drink Water.",
  },
  {
    icon: "✅",
    title: "Check In Daily",
    description: "Mark them done and maintain your streaks.",
  },
  {
    icon: "⚡",
    title: "Earn Rewards",
    description: "Get XP and unlock badges as you stay consistent.",
  },
  {
    icon: "🚀",
    title: "Transform",
    description: "Watch yourself level up — one habit at a time.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-20 px-6 sm:px-12 md:px-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
          🧠 How It Works
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side - Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="text-3xl mt-1">{step.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Motivational Message */}
          <div className="flex flex-col justify-center text-center md:text-left">
            <blockquote className="text-xl font-medium text-gray-800 leading-relaxed italic border-l-4 border-blue-500 pl-4">
              “Your habits shape your future. Start small, stay consistent, and become the person you aim to be.”
            </blockquote>
            <p className="mt-4 text-gray-500 text-sm">
              — Habit Hero Team
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
