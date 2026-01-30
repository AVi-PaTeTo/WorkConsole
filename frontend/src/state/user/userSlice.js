import { createSlice } from '@reduxjs/toolkit';
import {
    login,
    register,
    logout,
    authCheck,
    updateProfile,
} from './userThunks';

const initialState = {
    isAuthenticated: false,
    profile: null,
    token: null,
    status: 'idle',
    error: null,
};

const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.profile = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
            })

            .addCase(register.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.profile = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
                state.isAuthenticated = false;
            })

            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.status = 'failed';
                state.profile = null;
            })

            .addCase(authCheck.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(authCheck.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.profile = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(authCheck.rejected, (state) => {
                state.isAuthenticated = false;
                state.profile = null;
                state.status = 'failed';
            })

            .addCase(updateProfile.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.profile = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;
