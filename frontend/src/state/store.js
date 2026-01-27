import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./user/userSlice"
import sessionReducer from "./session/sessionSlice"
import uiReducer from "./ui/uiSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        session: sessionReducer,
        ui: uiReducer,
    }
});