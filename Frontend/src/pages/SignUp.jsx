import React from "react";
import loginSignImage from "../assets/loginSignup-Images/bgImg.jpg"
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux"
import { registerThunk } from "../redux/thunks/authThunks";
import { useState } from "react";

const SignUp = () => {
    const { register, handleSubmit, watch, formState } = useForm();
    const password = watch("password") // to get dynamic password field data "updated"
    const dispatch = useDispatch()

    //for validation errors
    const nameError = formState.errors.name?.message
    const emailError = formState.errors.email?.message
    const passwordError = formState.errors.password?.message
    const confirmPasswordError = formState.errors.confirmPassword?.message

    //form submit dispatch
    const onSubmit = (data) => {
        console.log(data)
        dispatch(registerThunk(data))
    }

    return (
        <div className="min-h-screen flex">
            {/* Left: Form Section */}
            <div className="w-full md:w-1/2 min-h-screen pt-[100px] flex items-center justify-center bg-gradient-to-tr from-white via-blue-50 to-blue-100 px-6 py-12">

                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-6">
                    {/* Title */}
                    <div className="text-left">
                        <h2 className="text-3xl font-bold text-blue-800">Sign up</h2>
                        <p className="text-sm text-gray-600 mt-1">Join now and start building better habits!</p>
                    </div>


                    {/* Full Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            {...register("name", { required: "Name is a required field" })}
                            type="text"
                            id="name"
                            placeholder="John Doe"
                            className={`w-full bg-transparent border-b-2 border-gray-300 ${nameError ? "focus:border-red-600 border-red-600" : "focus:border-blue-600"}  focus:outline-none py-1 text-gray-800 placeholder-gray-400`}
                        />
                        <span className="text-sm text-red-700">{nameError}</span>
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                            className={`w-full bg-transparent border-b-2 border-gray-300 ${emailError ? "focus:border-red-600 border-red-600" : "focus:border-blue-600"} focus:outline-none py-1 text-gray-800 placeholder-gray-400`}
                        />
                        <span className="text-sm text-red-700">{emailError}</span>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            {...register("password", {
                                required: "Password is a required field.",
                                minLength: {
                                    value: 6,
                                    message: "Password must be atleast 6 digits"
                                },

                            })}
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            className={`w-full bg-transparent border-b-2 border-gray-300 ${passwordError ? "focus:border-red-600 border-red-600" : "focus:border-blue-600"} focus:outline-none py-1 text-gray-800 placeholder-gray-400`}
                        />
                        <span className="text-sm text-red-700">{passwordError}</span>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            {...register("confirmPassword", {
                                required: "Confirm password is a required field.",
                                minLength: {
                                    value: 6,
                                    message: "Password must be atleast 6 digits"
                                },
                                validate: (value) => {
                                    return value == password || "Passwords do not match"
                                }
                            })}
                            type="password"
                            id="confirmPassword"
                            placeholder="••••••••"
                            className={`w-full bg-transparent border-b-2 border-gray-300 ${confirmPasswordError ? "focus:border-red-600 border-red-600" : "focus:border-blue-600"} focus:outline-none py-1 text-gray-800 placeholder-gray-400`}
                        />
                        <span className="text-sm text-red-700">{confirmPasswordError}</span>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition"
                    >
                        Sign Up
                    </button>

                    {/* Footer link */}
                    <p className="text-sm text-center text-gray-700">
                        Already have an account?
                        <a href="/login" className="text-blue-600 hover:underline ml-1 font-medium">
                            Log in
                        </a>
                    </p>
                </form>


            </div>


            {/* Right: Image Section */}
            <div
                className="hidden md:block w-1/2 bg-cover bg-center">
                <img src={loginSignImage} className="object-cover h-full" />
            </div>
        </div>
    );
};

export default SignUp;
