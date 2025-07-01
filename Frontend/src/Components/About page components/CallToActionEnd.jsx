import React from "react";
import { Link } from "react-router-dom"

const CallToActionEnd = () => {
  return (
    <section className="bg-blue-50 py-20 px-6 sm:px-10 md:px-24 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
          👉 No motivation? No problem.
        </h2>
        <p className="text-lg sm:text-xl text-gray-700 mb-8">
          Habit Hero makes self-improvement fun, rewarding, and effortless.
        </p>
        <p className="text-xl font-medium text-gray-900 mb-6">
          Ready to become a Habit Hero?
        </p>

        {/* Sign Up Button */}
        <Link
          to="/signup"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition">
          Sign Up Now
        </Link>
      </div>
    </section>
  );
};

export default CallToActionEnd;
