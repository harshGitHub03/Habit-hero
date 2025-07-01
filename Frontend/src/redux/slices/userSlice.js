import { createSlice, isAction } from "@reduxjs/toolkit"
import { verfyToken, registerThunk, loginThunk, fetchUserData, updateUserData } from "../thunks/authThunks"

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: false
    },
    reducers: {
        clearUserData: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading= false;
            state.error= false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(verfyToken.fulfilled, (state, action) => {
            console.log("veri", action.payload.user)
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.loading = false;
            state.error = false;
        }),

            builder.addCase(registerThunk.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthenticated = true
                state.loading = false;
                state.error = false;
            }),
            builder.addCase(loginThunk.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthenticated = true
                state.loading = false;
                state.error = false;
            }),
                builder.addCase(fetchUserData.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthenticated = true
                state.loading = false;
                state.error = false;
            }),
                builder.addCase(updateUserData.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthenticated = true
                state.loading = false;
                state.error = false;
            }),

            builder.addCase(verfyToken.pending, (state, action) => { state.loading = true; state.error = false })
        builder.addCase(registerThunk.pending, (state, action) => { state.loading = true; state.error = false })
        builder.addCase(loginThunk.pending, (state, action) => { state.loading = true; state.error = false })
        builder.addCase(fetchUserData.pending, (state, action) => { state.loading = true; state.error = false })
        builder.addCase(updateUserData.pending, (state, action) => { state.loading = true; state.error = false })

        builder.addCase(verfyToken.rejected, (state, action) => { state.isAuthenticated = false; state.user = null; state.loading = false; state.error = action.payload })
        builder.addCase(registerThunk.rejected, (state, action) => { state.isAuthenticated = false; state.user = null; state.loading = false; state.error = action.payload })
        builder.addCase(loginThunk.rejected, (state, action) => { state.isAuthenticated = false; state.user = null; state.loading = false; state.error = action.payload})
        builder.addCase(fetchUserData.rejected, (state, action) => { state.isAuthenticated = false; state.user = null; state.loading = false; state.error = action.payload })
        builder.addCase(updateUserData.rejected, (state, action) => { state.isAuthenticated = false; state.user = null; state.loading = false; state.error = action.payload })

    }
})

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer
