import { createAsyncThunk } from "@reduxjs/toolkit";
import cookie from "js-cookie"

export const getAllHabits = createAsyncThunk("habits/",
    async (data, { getState, rejectedWithValue }) => {

        try {
            // TEMP / prevent PUBLIC SUFFEX LIST  set cookie on localstorage

            // const token = cookie.get("jwt")
            // console.log(token)

            // if (!token)
            //     return rejectWithValue("jwt not found!")

            const token = localStorage.getItem("jwt")
            if (!token)
                return rejectedWithValue("jwt not found!")

            const isAuthenticated = getState().authData.isAuthenticated;
            if (!isAuthenticated) {
                return rejectedWithValue("Not Authorized to make this request.")
            }
            //fetch request
            const response = await fetch("http://localhost:3000/habits/", {
                method: "get",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authentication: `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log(data)
            // if response.status!==200
            if (!response.ok)
                return rejectedWithValue(data.message || "fetching habit error")

            return data
        } catch (error) {
            return rejectedWithValue(error.message)
        }
    }
)

export const createHabit = createAsyncThunk("habit/create",
    async (data, { getState, rejectedWithValue }) => {
        const { title, icon, frequency } = data
        try {
            // TEMP / prevent PUBLIC SUFFEX LIST  set cookie on localstorage

            // const token = cookie.get("jwt")
            // console.log(token)

            // if (!token)
            //     return rejectWithValue("jwt not found!")

            const token = localStorage.getItem("jwt")
            if (!token)
                return rejectedWithValue("jwt not found!")

            const isAuthenticated = getState().authData.isAuthenticated;
            if (!isAuthenticated) {
                return rejectedWithValue("Not Authorized to make this request.")
            }

            const response = await fetch("http://localhost:3000/habits/", {
                method: "post",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authentication: `Bearer ${token}`
                },
                body: JSON.stringify({ title, icon, frequency })
            })
            const data = await response.json()
            console.log(data)

            // if response.status!==200
            if (!response.ok)
                return rejectedWithValue(data.message || "fetching habit error")

            return data
        } catch (error) {
            return rejectedWithValue(error.message)
        }
    }
)


export const updateHabit = createAsyncThunk("habit/update",
    async (data, { getState, rejectedWithValue }) => {
        const { title, icon, habitId } = data;
        console.log(data)
        try {
            // TEMP / prevent PUBLIC SUFFEX LIST  set cookie on localstorage

            // const token = cookie.get("jwt")
            // console.log(token)

            // if (!token)
            //     return rejectWithValue("jwt not found!")

            const token = localStorage.getItem("jwt")
            if (!token)
                return rejectedWithValue("jwt not found!")

            const isAuthenticated = getState().authData.isAuthenticated;
            if (!isAuthenticated) {
                return rejectedWithValue("Not Authorized to make this request.")
            }

            const response = await fetch(`http://localhost:3000/habits/${habitId}`, {
                method: "put",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authentication: `Bearer ${token}`
                },
                body: JSON.stringify({ title, icon })
            })
            const data = await response.json()
            console.log(data)

            // if response.status!==200
            if (!response.ok)
                return rejectedWithValue(data.message || "fetching habit error")

            return data
        } catch (error) {
            return rejectedWithValue(error.message)
        }
    }
)

//delete habit
export const deleteHabit = createAsyncThunk("habit/delete",
    async (data, { getState, rejectedWithValue }) => {
        const habitId = data;
        console.log(data)
        try {
            // TEMP / prevent PUBLIC SUFFEX LIST  set cookie on localstorage

            // const token = cookie.get("jwt")
            // console.log(token)

            // if (!token)
            //     return rejectWithValue("jwt not found!")

            const token = localStorage.getItem("jwt")
            if (!token)
                return rejectedWithValue("jwt not found!")

            const isAuthenticated = getState().authData.isAuthenticated;
            if (!isAuthenticated) {
                return rejectedWithValue("Not Authorized to make this request.")
            }
            const response = await fetch(`http://localhost:3000/habits/${habitId}`, {
                method: "delete",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authentication: `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log(data)

            // if response.status!==200
            if (!response.ok)
                return rejectedWithValue(data.message || "fetching habit error")

            return data
        } catch (error) {
            return rejectedWithValue(error.message)
        }
    }
)