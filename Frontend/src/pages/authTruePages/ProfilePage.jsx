import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, updateUserData } from "../../redux/thunks/authThunks";
import { Link } from "react-router-dom";
import LogoutModal from "./LogoutPage";
import { useForm } from "react-hook-form";

const ProfilePage = () => {
  const userData = useSelector((store) => store.authData.user);
  const dispatch = useDispatch()
  const { register, handleSubmit, formState } = useForm()

  //logout toogle
  const [Toggle, setToggle] = useState(false)

  useEffect(() => {
    if (!userData)
      dispatch(fetchUserData())
  }, [dispatch, userData])

  //set userData to profile 
  const profile = {
    name: userData?.name,
    email: userData?.email,
    xp: userData?.xp,
    level: userData?.level,
    createdAt: userData?.createdAt,
  };

  // toggle form fields able/disable
  const [isEditing, setIsEditing] = useState(false);

  //form fields errors
  const nameError = formState.errors.name?.message
  const emailError = formState.errors.email?.message

  //form submit
  const handleSave = (data) => {
    let toUpdate = {};
    if (data.name !== profile.name)
      toUpdate = { ...toUpdate, name: data.name };

    if (data.email !== profile.email)
      toUpdate = { ...toUpdate, email: data.email };

    //only when fields updates it should dispatch
    if (Object.keys(toUpdate).length != 0) {
      dispatch(updateUserData(toUpdate))
      // setTimeout(() => dispatch(fetchUserData()), 100) //fetch updated data
    }
    setIsEditing(false);
  };


  return (
    <div className="min-h-screen mt-6 bg-gradient-to-br from-rose-100 to-emerald-100 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg grid md:grid-cols-2 overflow-hidden">
        {/* Left – Avatar & Stats */}
        <div className="bg-gradient-to-br from-teal-100 to-pink-100 text-gray-900 p-10 flex flex-col justify-center items-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-white/30 text-4xl font-bold flex items-center justify-center shadow-inner text-gray-800">
            {profile.name?.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-semibold">{profile?.name}</h2>
          <p className="text-sm">{profile?.email}</p>
          <p className="text-xs text-gray-700">
            Joined on {new Date(profile?.createdAt).toLocaleDateString("en-IN")}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6 w-full">
            <div className="bg-white/60 rounded-xl p-4 text-center shadow">
              <p className="text-2xl font-bold">{profile?.level}</p>
              <p className="text-sm">Level</p>
            </div>
            <div className="bg-white/60 rounded-xl p-4 text-center shadow">
              <p className="text-2xl font-bold">{profile?.xp}</p>
              <p className="text-sm">XP</p>
            </div>
          </div>
        </div>

        {/* Right – Edit Form */}
        <form onSubmit={handleSubmit(handleSave)} className="p-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
            )}
            {isEditing && (
              <button
                type="submit"
                className="text-green-600 hover:underline"
              >
                Save
              </button>
            )}
          </div>

          {/* edit profile form */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                {...register("name", {
                  required: "Name is a required field",
                  minLength: {
                    value: 3,
                    message: "Name must be 3 characters long."
                  }
                })}
                type="text"
                name="name"
                defaultValue={profile?.name}
                disabled={!isEditing}
                className={`w-full p-2 rounded-md border ${isEditing ? "bg-white" : "bg-gray-100"} focus:outline-none`}
              />
              <span className="text-[0.8rem] text-red-700">{nameError && nameError}</span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                {...register("email", {
                  required: "Email is a required field.",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid email"
                  }
                })}
                // type="email"
                name="email"
                defaultValue={profile?.email}
                disabled={!isEditing}
                className={`w-full p-2 rounded-md border ${isEditing ? "bg-white" : "bg-gray-100"} focus:outline-none`}
              />
              <span className="text-[0.8rem] text-red-700">{emailError && emailError}</span>
            </div>

            {isEditing && (
              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            )}

            <div className="pt-4 border-t mt-8">
              <button
                onClick={() => setToggle(true)}
                type="button"
                className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </form>
      </div>
      {Toggle ? <LogoutModal onClose={() => setToggle(false)} /> : null}
    </div>
  );
};

export default ProfilePage;
