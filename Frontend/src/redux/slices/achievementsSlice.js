import { createSlice } from "@reduxjs/toolkit";
import Achievements from "../../pages/authTruePages/Achievement";
import { getAllAchievements } from "../thunks/achievementsThunks";

const achievementsSlice = createSlice({
    name: "achievementsSlice",
    initialState: {
        AchievementsData: null,
        loading: false,
        error: false
    },
    extraReducers: (builder) => {
        builder.addCase(getAllAchievements.fulfilled, (state, action) => {
            state.AchievementsData = action.payload.achievements
        }),

            builder.addCase(getAllAchievements.pending, (state, action) => { state.loading = true; state.error = false }),

            builder.addCase(getAllAchievements.rejected, (state, action) => { state.isAuthenticated = false; state.user = null; state.loading = false; state.error = action.payload })

    }
})

export default achievementsSlice.reducer