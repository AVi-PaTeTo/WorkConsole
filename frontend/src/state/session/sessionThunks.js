import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axios/api";


export const create = createAsyncThunk(
    "session/create",
    async(payload, {rejectWithValue}) => {
        try{
            const res = await api.post('sessions/', payload)
            return res.data
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to create session")
        }
    }
)

export const all = createAsyncThunk(
    "session/all",
    async (_, {rejectWithValue}) => {
        try{
            const res = await api.get('sessions/')
            return res.data
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to get sessions") 
        }
    }
)

export const recent = createAsyncThunk(
    "session/recent",
    async (_, {rejectWithValue}) => {
        try{
            const res = await api.get('sessions/recent')
            return res.data
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to get recent sessions") 
        }
    }
)

export const start = createAsyncThunk(
    "session/start",
    async( Id, { rejectWithValue }) => {
        try{
            const res = await api.post(`sessions/${Id}/start`)
            return res.data
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to start session")  
        }
    }
);

export const pause = createAsyncThunk(
    "session/pause",
    async( Id, { rejectWithValue }) => {
        try{
            const res = await api.post(`sessions/${Id}/pause`)
            return res.data
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to pause session")  
        }
    }
);

export const stop = createAsyncThunk(
    "session/stop",
    async( Id, { rejectWithValue }) => {
        try{
            const res = await api.post(`sessions/${Id}/stop`)
            return res.data
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to stop session")  
        }
    }
);

export const remove = createAsyncThunk(
    "session/remove",
    async(Id, {rejectWithValue}) => {
        try{
            const res = await api.delete(`sessions/${Id}`)
            return res.data
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to delete session")
        }
    }
)

export const patch = createAsyncThunk(
    "session/patch",
    async({Id, updateData}, {rejectWithValue}) => {
        try{
            const res = await api.patch(`sessions/${Id}`, updateData)
            return res.data
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to patch session")
        }
    }
)