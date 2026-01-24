import { createSlice } from "@reduxjs/toolkit";
// import CreateSession from "../../components/CreateSession";

const initialState = {
    themeName: "defaultNeo",
    theme : {
        background: "#99d4eb",
        backgroundSticker: "#56a1be", 
        primary: "#fda5d5", 
        primarySticker: "#c43779", 
        accent: "#fcc800", 
        accentHover: "#dc9200"
    },
    modalOpen: false,
}

const themeSlice = createSlice({
    name: "Theme",
    initialState,
    reducers: {
        update: (state, action) => {
            state.themeName = action.payload.name
            state.theme = action.payload.theme
        },
        open: state => {
            state.modalOpen = !state.modalOpen
        }
    }
})

export const { update, open } = themeSlice.actions;
export default themeSlice.reducer;