import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./slices/userSlice"
import habitsSlice from "./slices/habitsSlice"
import achievementsSlice from "./slices/achievementsSlice"
import habitLogsSlice from "./slices/habitsLogsSlice"

const reduxStore = configureStore({
    reducer: {
        authData:userSlice,
        habitsData:habitsSlice,
        habitLogsData:habitLogsSlice,
        achievementsData:achievementsSlice
    }
})

export default reduxStore;