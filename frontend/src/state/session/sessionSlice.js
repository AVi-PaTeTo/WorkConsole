import { createSlice } from "@reduxjs/toolkit";
import { 
        create, 
        all, 
        recent, 
        getById,
        patch,
        remove, 
        start, 
        pause, 
        stop 
    } from "./sessionThunks"

const initialState = {
    sessions: null,
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
                    const newSession = action.payload
                    state.sessions["planned"].unshift(newSession)
                    state.activeSession = newSession;
                    
                    if(state.recentSessions.length === 10){
                        state.recentSessions.pop()
                    }
                    state.recentSessions.unshift(newSession)
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
            
            // fetch session by Id
                .addCase(getById.pending, state => {
                    state.status = "loading";
                    state.error = null
                })
                .addCase(getById.fulfilled, (state, action) => {
                    state.status = 'idle';
                    state.activeSession = action.payload
                })
                .addCase(getById.rejected, (state, action) => {
                    state.status = "error";
                    state.error = action.payload
                })
                
            // remove
                .addCase(remove.pending, state => {
                    state.status = "loading"
                    state.error = null    
                })
                .addCase(remove.fulfilled, (state, action) => {
                    // get the tag of deleted item
                    const removed = action.payload.deleted
                    let status = null;
                    if(removed.status === "paused"){
                        status = "active"
                        } else { 
                            status = removed.status 
                        }
                    const updatedCategory = state.sessions[status].filter(s => s._id != removed._id)
                    state.sessions = {...state.sessions, [status]: updatedCategory}
                    state.recentSessions = state.recentSessions.filter(s => s._id != removed._id)
                    state.activeSession = null;
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
                    let status = null;
                    if(action.payload.status === "paused"){
                        status = "active"
                        } else { 
                            status = action.payload.status 
                        }
                    
                    state.sessions[status] = state.sessions[status].filter( s => s._id != action.payload._id)
                    state.sessions[status].unshift(action.payload)
                    
                    state.recentSessions = state.recentSessions.filter( s => s._id != action.payload._id)
                    if(state.recentSessions.length === 10){
                        state.recentSessions.pop()
                    }
                    state.recentSessions.unshift(action.payload)

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