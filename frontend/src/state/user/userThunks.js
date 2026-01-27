import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axios/api";


export const login = createAsyncThunk(
    "user/login",
    async(credentials, {rejectWithValue}) => {
        try{
            await api.post("auth/login", credentials)
            const getUserData = await api.get("auth/me")

            return getUserData.data;

         } catch (err) {
            return rejectWithValue( err.response?.data || {message: "Login Failed"})
         }
    }
)

export const authCheck = createAsyncThunk(
    "user/authCheck",
    async( _, {rejectWithValue} ) => {
        try{
            const res = await api.get("auth/me")
            return res.data
        } catch (err) {
            return rejectWithValue( err.response?.data || 'User not logged in')
        }
    }
)

export const register = createAsyncThunk(
    'user/register',
    async(payload, { rejectWithValue }) => {
        try{
            const res = await api.post('auth/register', payload);
            return res.data
        } catch (err) {
            return rejectWithValue( err.response?.data || 'Register failed')
        }
    }
)

export const logout = createAsyncThunk(
    "user/logout", 
    async (_, { rejectWithValue }) => {
        try {
            await api.post("auth/logout/"); 
            return true;
        } catch (err) {
            return rejectWithValue( err.response?.data || "Logout failed");
        }
});