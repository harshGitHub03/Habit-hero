import { createSlice } from "@reduxjs/toolkit";
import { createHabit, deleteHabit, getAllHabits } from "../thunks/habitThunks";

const habitsSlice = createSlice({
    name: "habitsData",
    initialState: {
        habitsData: null,
        loading: false,
        error: false
    },
    extraReducers: (builder) => {
        builder.addCase(getAllHabits.fulfilled, (state, action) => {
            state.habitsData = action.payload.habitData;
            state.loading = false;
            state.error = false;
        }),
        builder.addCase(createHabit.fulfilled, (state, action) => {
            // state.habitsData = action.payload.habitData;
            state.loading = false;
            state.error = false;
        }),
        builder.addCase(deleteHabit.fulfilled, (state, action) => {
            // state.habitsData = action.payload.habitData;
            state.loading = false;
            state.error = false;
        }),

        builder.addCase(getAllHabits.pending, (state, action) => { state.loading = true; state.error = false }),
        builder.addCase(createHabit.pending, (state, action) => { state.loading = true; state.error = false }),
        builder.addCase(deleteHabit.pending, (state, action) => { state.loading = true; state.error = false }),

        builder.addCase(getAllHabits.rejected, (state, action) => { state.isAuthenticated = false; state.user = null; state.loading = false; state.error = action.payload })
        builder.addCase(createHabit.rejected, (state, action) => { state.isAuthenticated = false; state.user = null; state.loading = false; state.error = action.payload })
        builder.addCase(deleteHabit.rejected, (state, action) => { state.isAuthenticated = false; state.user = null; state.loading = false; state.error = action.payload })
    }
})

export default habitsSlice.reducer;