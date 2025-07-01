import { createAsyncThunk } from "@reduxjs/toolkit";
import cookie from "js-cookie"

export const checkInHabit = createAsyncThunk("/habit-logs/:id/check-in",
    async (data, { getState, rejectWithValue }) => {
        const habitId = data;
        try {
            // TEMP / prevent PUBLIC SUFFEX LIST  set cookie on localstorage

            // const token = cookie.get("jwt")
            // console.log(token)

            // if (!token)
            //     return rejectWithValue("jwt not found!")

            const token = localStorage.getItem("jwt")
            if (!token)
                return rejectWithValue("jwt not found!")

            const isAuthenticated = getState().authData.isAuthenticated;
            if (!isAuthenticated) {
                return rejectWithValue("Not Authorized to make this request.")
            }

            //if habit id not passed to thunk
            if (!habitId) return rejectWithValue("Habit id not found")

            //fetch request
            const response = await fetch(`http://localhost:3000/habit-logs/${habitId}/check-in`, {
                method: "post",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authentication: `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log(data)
            console.log("reach")
            // if response.status!==200
            if (!response.ok)
                return rejectWithValue(data.message || "check in error")

            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)



export const getAllHabitLogsOfUser=createAsyncThunk("habit-logs/AllHabitslogs",
    async (data, { getState, rejectWithValue }) => {
        try {
            // TEMP / prevent PUBLIC SUFFEX LIST  set cookie on localstorage

            // const token = cookie.get("jwt")
            // console.log(token)

            // if (!token)
            //     return rejectWithValue("jwt not found!")

            const token = localStorage.getItem("jwt")
            if (!token)
                return rejectWithValue("jwt not found!")

            const isAuthenticated = getState().authData.isAuthenticated;
            if (!isAuthenticated) {
                return rejectWithValue("Not Authorized to make this request.")
            }
            //fetch request
            const response = await fetch(`http://localhost:3000/habit-logs/all-logs`, {
                method: "get",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authentication: `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log("data",data)
            console.log("reach")
            // if response.status!==200
            if (!response.ok)
                return rejectWithValue(data.message || "check in error")

            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)



export const getTodayLogs=createAsyncThunk("habit-logs/today",
    async (data, { getState, rejectWithValue }) => {
        try {
            // TEMP / prevent PUBLIC SUFFEX LIST  set cookie on localstorage

            // const token = cookie.get("jwt")
            // console.log(token)

            // if (!token)
            //     return rejectWithValue("jwt not found!")

            const token = localStorage.getItem("jwt")
            if (!token)
                return rejectWithValue("jwt not found!")

            const isAuthenticated = getState().authData.isAuthenticated;
            if (!isAuthenticated) {
                return rejectWithValue("Not Authorized to make this request.")
            }
            //fetch request
            const response = await fetch(`http://localhost:3000/habit-logs/today`, {
                method: "get",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authentication: `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log(data)
            console.log("reach")
            // if response.status!==200
            if (!response.ok)
                return rejectWithValue(data.message || "check in error")

            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
