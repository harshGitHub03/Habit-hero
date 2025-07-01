import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import cookie from "js-cookie";

export const getAllAchievements = createAsyncThunk("/achivements",
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
            const response = await fetch("http://localhost:3000/achievements", {
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
