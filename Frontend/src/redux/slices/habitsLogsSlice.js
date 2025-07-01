import { createSlice } from "@reduxjs/toolkit";
import {
  checkInHabit,
  getAllHabitLogsOfUser,
  getTodayLogs,
} from "../thunks/habitLogsThunks";

const habitLogsSlice = createSlice({
  name: "habitsLogs",
  initialState: {
    allHabitLogs: null,
    todayLogs: null,
    loading: false,
    error: false,
  },
  extraReducers: (builder) => {
    // ✅ fulfilled cases
    builder.addCase(checkInHabit.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    }),

    builder.addCase(getAllHabitLogsOfUser.fulfilled, (state, action) => {
      state.allHabitLogs = action.payload.habitLogs;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(getTodayLogs.fulfilled, (state, action) => {
      state.todayLogs = action.payload.tadayHabitLogs;
      state.loading = false;
      state.error = false;
    }),

    // ✅ pending cases
    builder.addCase(checkInHabit.pending, (state) => {
      state.loading = true;
      state.error = false;
    }),

    builder.addCase(getAllHabitLogsOfUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    }),

    builder.addCase(getTodayLogs.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    // // ✅ rejected cases
    builder.addCase(checkInHabit.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }),

    builder.addCase(getAllHabitLogsOfUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }),

    builder.addCase(getTodayLogs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default habitLogsSlice.reducer;
