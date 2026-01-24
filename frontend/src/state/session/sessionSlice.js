import { createSlice } from "@reduxjs/toolkit";
import { 
        create, 
        all, 
        recent, 
        patch,
        remove, 
        start, 
        pause, 
        stop 
    } from "./sessionThunks"

const initialState = {
    sessions: {
        active: [],
        planned: [],
        completed: []
    },
    activeSession: null,
    recentSessions: [],
    status: 'idle',
    error: null,
}



const sessionSlice = createSlice({
    name: "Session",
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder
            // Create
                .addCase(create.pending, state => {
                    state.status = "loading"
                    state.error = null    
                })
                .addCase(create.fulfilled, (state, action) => {
                    state.status = "idle"
                    state.sessions.planned.push(action.payload)
                    state.recentSessions.push(action.payload)
                })
                .addCase(create.rejected, (state, action) => {
                    state.status = "error"
                    state.error = action.payload
                })

            //  All
                .addCase(all.pending, state => {
                    state.status = "loading"
                    state.error = null    
                })
                .addCase(all.fulfilled, (state, action) => {
                    state.status = 'idle'
                    state.sessions = action.payload
                })
                .addCase(all.rejected, (state, action) => {
                    state.status = "error"
                    state.error = action.payload
                })
            
            // recents
                .addCase(recent.pending, state => {
                    state.status = "loading"
                    state.error = null    
                })
                .addCase(recent.fulfilled, (state, action) => {
                    state.status = "idle"
                    state.recentSessions = action.payload
                })
                .addCase(recent.rejected, (state, action) => {
                    state.status = "error"
                    state.error = action.payload
                })
            
            // remove
                .addCase(remove.pending, state => {
                    state.status = "loading"
                    state.error = null    
                })
                .addCase(remove.fulfilled, (state, action) => {
                    // get the tag of deleted item
                    // const removed = action.payload.deleted
                    // const updatedCategory = state.sessions[removed.status].filter(s => s._id != removed._id)
                    
                    // state.sessions = {...state.sessions, [removed.status]: updatedCategory}
                    // state.recentSessions = state.recentSessions.filter(s => s._id != removed._id)
                    if(state.activeSession){
                        state.activeSession = null
                    }
                })
                .addCase(remove.rejected, (state, action) => {
                    state.status = "error"
                    state.error = action.payload                    
                })
            
            // patch
                .addCase(patch.pending, state => {
                    state.status = "loading"
                    state.error = null    
                })
                .addCase(patch.fulfilled, (state, action) => {
                    state.activeSession = action.payload
                })
                .addCase(patch.rejected, (state, action) => {
                    state.status = "error"
                    state.error = action.payload                    
                })

            // start
                .addCase(start.pending, state => {
                    state.status = "loading"
                    state.error = null    
                })
                .addCase(start.fulfilled, (state, action) => {
                    state.activeSession = action.payload
                })
                .addCase(start.rejected, (state, action) => {
                    state.status = "error"
                    state.error = action.payload                    
                })

            //  pause
                .addCase(pause.pending, state => {
                    state.status = "loading"
                    state.error = null    
                })
                .addCase(pause.fulfilled, (state, action) => {
                    state.activeSession = action.payload
                })
                .addCase(pause.rejected, (state, action) => {
                    state.status = "error"
                    state.error = action.payload
                })

            //  stop
                .addCase(stop.pending, state => {
                    state.status = "loading"
                    state.error = null    
                })
                .addCase(stop.fulfilled, (state, action) => {
                    state.activeSession = action.payload
                })
                .addCase(stop.rejected, (state, action) => {
                    state.status = "error"
                    state.error = action.payload
                })
    }
                
})

export default sessionSlice.reducer