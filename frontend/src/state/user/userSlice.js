import { createSlice } from "@reduxjs/toolkit";
import { login, register, logout } from "./userThunks";

const initialState = {
    isAuthentiacted: false,
    profile: null,
    token: null,
    status: "idle",
    error: null
}

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
                .addCase(login.pending, state => {
                    state.status = "loading";
                    state.error = null;
                })
                .addCase(login.fulfilled, (state, action) => {
                    state.status = "idle";
                    state.isAuthentiacted = true;
                    state.profile = action.payload
                })
                .addCase(login.rejected, (state, action) => {
                    state.status = "error",
                    state.error = action.payload
                })

                .addCase(register.pending, state => {
                    state.status = "loading",
                    state.error = null;
                })
                .addCase(register.fulfilled, (state, action) => {
                    state.status = "idle",
                    state.isAuthentiacted = true
                    state.profile = action.payload
                })
                .addCase(register.rejected, (state, action) => {
                    state.status = "error",
                    state.error = action.payload
                })

                .addCase(logout.fulfilled, () => {
                    return initialState
                })
    }
})

export default userSlice.reducer