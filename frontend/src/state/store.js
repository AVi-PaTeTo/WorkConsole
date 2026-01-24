import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./user/userSlice"
import sessionReducer from "./session/sessionSlice"
import themeReducer from "./theme/themeSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        session: sessionReducer,
        theme: themeReducer
    }
});