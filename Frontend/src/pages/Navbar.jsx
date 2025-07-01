import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./authTruePages/LogoutPage";

const Navbar = () => {
  const { isAuthenticated, error } = useSelector(store => store.authData)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false); // logout popup
  const [isError, setIsError] = useState(false) //error popup

  useEffect(() => {
    console.log(error)

    //display error / not the session expired
    if (error && error != "Session expired") {
      setIsError(error)
      setTimeout(() => setIsError(false), 3000)
    }
  }, [error])

  //loutout popup
  const [showPopup, setShowPopup] = useState(false)

  // TEMP: Toggle this to simulate authentication status

  const handleLogout = () => {
    setShowPopup(true)
    // Add logout logic here
    console.log("User logged out");
  };

  const authLinks = [

    <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition">
      Dashboard
    </Link>,
    <Link to="/habits" className="text-gray-700 hover:text-blue-600 transition">
      My Habits
    </Link>,
    <Link to="/habit-history" className="text-gray-700 hover:text-blue-600 transition">
      History
    </Link>,
    <Link to="/achievements" className="text-gray-700 hover:text-blue-600 transition">
      Achievements
    </Link>,
    <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition">
      Profile
    </Link>,
    <button
      onClick={handleLogout}
      className="text-red-600 hover:text-red-800 transition"
    >
      Logout
    </button>
  ];

  const guestLinks = [

    <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
      About
    </Link>,
    <Link to="/how-it-works" className="text-gray-700 hover:text-blue-600 transition">
      How it Works
    </Link>,
    <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">
      Login
    </Link>,
    <Link
      to="/signup"
      className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
    >
      Sign Up
    </Link>
  ];

  return (<>
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Habit Hero
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? authLinks : guestLinks}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none text-xl"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4">
            {(isAuthenticated ? authLinks : guestLinks).map((item, idx) => (
              <div key={idx} className="block">
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
      {showPopup && <Logout onClose={() => setShowPopup(false)} />}

      {/* error display */}
      {isError &&
        <div className="bg-red-500 text-white flex justify-between items-center max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 shadow text-sm sm:text-base font-medium tracking-wide">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            <span>{error}</span>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="text-white text-xl hover:text-gray-200 transition text-xl duration-150 ease-in-out"
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      }
    </nav>
  </>);
};

export default Navbar;