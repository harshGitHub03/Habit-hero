import React from "react";
import loginSignImage from "../assets/loginSignup-Images/bgImg.jpg";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginThunk } from "../redux/thunks/authThunks";

const Login = () => {
  const { register, handleSubmit, formState } = useForm();
  const dispatch = useDispatch()

  //fields error display
  const emailError = formState.errors.email?.message;
  const passwordError = formState.errors.password?.message;

  //submit form function
  const submitForm = (data) => {
    console.log(data)
    dispatch(loginThunk(data))
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Form Section */}
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center bg-gradient-to-tr from-white via-blue-50 to-blue-100 px-6 py-12">
        <form onSubmit={handleSubmit(submitForm)} className="w-full max-w-sm space-y-6">
          {/* Title */}
          <div className="text-left">
            <h2 className="text-3xl font-bold text-blue-800">Log in</h2>
            <p className="text-sm text-gray-600 mt-1">
              Start building better habits!
            </p>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is a required field",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email"
                }
              })}
              type="email"
              id="email"
              placeholder="you@example.com"
              required
              className="w-full bg-transparent border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none py-1 text-gray-800 placeholder-gray-400"
            />
            <span className="text-sm text-red-700">{emailError}</span>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is a required field",
                minLength: {
                  value: 6,
                  message: "Password must be atleast 6 digits"
                }
              })}
              type="password"
              id="password"
              placeholder="••••••••"
              required
              className="w-full bg-transparent border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none py-1 text-gray-800 placeholder-gray-400"
            />
            <span className="text-sm text-red-700">{passwordError}</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition"
          >
            Log In
          </button>

          {/* Footer link */}
          <p className="text-sm text-center text-gray-700">
            Don’t have an account?
            <a
              href="/signup"
              className="text-blue-600 hover:underline ml-1 font-medium"
            >
              Sign Up
            </a>
          </p>
        </form>
      </div>

      {/* Right: Image Section (Hidden on mobile) */}
      <div className="hidden md:block md:w-1/2">
        <img
          src={loginSignImage}
          alt="Login visual"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
