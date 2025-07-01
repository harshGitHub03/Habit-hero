import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createHabit, getAllHabits } from "../../redux/thunks/habitThunks";
// import axios from "axios";

const CreateHabitPage = () => {
  const { register, handleSubmit, formState } = useForm();
  const dispatch = useDispatch()

  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [frequency, setFrequency] = useState("daily");

  //errors on fields
  const titleError = formState.errors?.title?.message;
  const iconError = formState.errors?.icon?.message;
  const frequencyError = formState.errors?.frequency?.message;

  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(createHabit(data))
    navigate("/habits")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 to-teal-100 pt-28 pb-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10">
          🌱 Start a New Habit
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Title */}
          <div>
            <input
              {...register("title", {
                required: "Title is a required field",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters long"
                },
                maxLength: {
                  value: 50,
                  message: "Title must be within 50 characters"
                }
              })}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Read a book"
              className={`w-full bg-transparent border-b ${titleError ? "border-red-600  focus:border-red-600" : "focus:border-teal-600  border-gray-400"} focus:outline-none  text-lg px-2 py-3 placeholder-gray-500`}
            />
            <span className="text-red-600 text-sm">{titleError && titleError}</span>
            <p className="text-sm text-gray-500 mt-1">Enter a short, meaningful title.</p>
          </div>

          {/* Icon */}
          <div>
            <input
              {...register("icon", {
                maxLength: {
                  value: 2,
                  message: "Icon must be within 2 characters"
                }
              })}
              type="text"
              // value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="Emoji (e.g. 📚)"
              maxLength={2}
              className={`w-full bg-transparent border-b ${iconError ? "border-red-600  focus:border-red-600" : "focus:border-teal-600  border-gray-400"} focus:outline-none  text-lg px-2 py-3 placeholder-gray-500`} />
            <span className="text-red-600 text-sm">{iconError && iconError}</span>
            <p className="text-sm text-gray-500 mt-1">Optional – adds a little flair.</p>
          </div>

          {/* Frequency */}
          <div>
            <select
              {...register("frequency", { required: "frequency is a required field" })}
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className={`w-full bg-transparent border-b ${frequencyError ? "border-red-400 focus:border-red-600" : "border-gray-400 focus:border-teal-600"} focus:outline-none  text-lg px-2 py-3`}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
            <span className="text-red-600 text-sm">{frequencyError && frequencyError}</span>
            <p className="text-sm text-gray-500 mt-1">How often you want to track it.</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-full font-semibold hover:bg-teal-700 transition-all"
          >
            Create Habit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHabitPage;
