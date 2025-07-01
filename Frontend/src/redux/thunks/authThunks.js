import { createAsyncThunk } from "@reduxjs/toolkit";
import cookie from "js-cookie"
import { clearUserData } from "../slices/userSlice";

export const verfyToken = createAsyncThunk("auth/checkJWT",
    async (data, { getState, rejectWithValue }) => {
        try {
            // TEMP / prevent PUBLIC SUFFEX LIST  set cookie on localstorage

            // const token = cookie.get("jwt")
            // console.log(token)

            // if (!token)
            //     return rejectWithValue("jwt not found!")

            const token = localStorage?.getItem("jwt")
            console.log("token", token)
            if (!token)
                return rejectWithValue("Session expired")

            const response = await fetch(`${process.env.VITE_BACKEND_URL}/auth/profile`, {
                method: "get",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authentication: `Bearer ${token}`
                }
            })
            const data = await response.json();
            console.log(data)


            //if response.status!=2** eg 400,401,404, etc
            if (!response.ok)
                return rejectWithValue(data.message || "auth error")

            //return data if 200
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const registerThunk = createAsyncThunk("auth/register",
    async (data, { getState, rejectWithValue }) => {
        const { name, email, password, confirmPassword } = data;
        try {
            const response = await fetch(`${process.env.VITE_BACKEND_URL}/auth/register`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password, confirmPassword })
            })

            const data = await response.json();

            console.log(data)

            // TEMP / prevent PUBLIC SUFFEX LIST  set cookie on localstorage
            if (data.cookie?.jwt) localStorage.setItem("jwt", data.cookie.jwt)

            // execute when (res.status != 2**)   eg,400,401,404
            if (!response.ok) {
                return rejectWithValue(data.message || "Registration failed")
            }

            // return data when res.ok
            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    })


export const loginThunk = createAsyncThunk("auth/login",
    async (data, { getState, rejectWithValue }) => {
        const { email, password } = data;
        try {
            const response = await fetch(`${process.env.VITE_BACKEND_URL}/auth/login`, {
                method: "post",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json();

            console.log(data)

            // TEMP / prevent PUBLIC SUFFEX LIST  set cookie on localstorage
            if (data.cookie?.jwt) localStorage.setItem("jwt", data.cookie.jwt)

            // execute when (res.status != 2**)   eg,400,401,404
            if (!response.ok) {
                return rejectWithValue(data.message || "Login failed")
            }

            // return data when res.ok
            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    })


export const logoutThunk = createAsyncThunk("auth/logout",
    (data, { getState, rejectWithValue, dispatch }) => {
        try {
            // TEMP / prevent PUBLIC SUFFEX LIST  set cookie on localstorage
            // // remove token
            // cookie.remove("jwt")

            localStorage.removeItem("jwt")

            //clear data
            dispatch(clearUserData())

            return true
        } catch (error) {
            console.log(error.message)
        }
    }
)

export const fetchUserData = createAsyncThunk("auth/profile",
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

            const response = await fetch(`${process.env.VITE_BACKEND_URL}/auth/profile`, {
                method: "get",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authentication: `Bearer ${token}`
                },
            })
            const data = await response.json();

            console.log(data)

            // execute when (res.status != 2**)   eg,400,401,404
            if (!response.ok) {
                return rejectWithValue(data.message || "Registration failed")
            }

            // return data when res.ok
            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    })

export const updateUserData = createAsyncThunk("auth/profile/update",
    async (data, { getState, rejectWithValue }) => {
        const toUpdateFields = data
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

            const response = await fetch(`${process.env.VITE_BACKEND_URL}/auth/profile`, {
                method: "put",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authentication: `Bearer ${token}`
                },
                body: JSON.stringify(toUpdateFields)
            })
            const data = await response.json();
            console.log("r2")

            console.log(data)

            // execute when (res.status != 2**)   eg,400,401,404
            if (!response.ok) {
                return rejectWithValue(data.message || "Registration failed")
            }

            // return data when res.ok
            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    })
