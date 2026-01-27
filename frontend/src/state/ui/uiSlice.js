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
    createForm : true,
    updatingSession: false 
}

const uiSlice = createSlice({
    name: "UI",
    initialState,
    reducers: {
        update: (state, action) => {
            state.themeName = action.payload.name
            state.theme = action.payload.theme
        },
        ThemeModalSwitch: state => {
            state.modalOpen = !state.modalOpen
        },
        closeCreate: (state) => {
            state.createForm = false;
        },

        openCreate: (state) => {
            state.createForm = true;
        },

        initiateUpdate: (state) => {
            state.updatingSession = true
        },

        endUpdate: (state) => {
            state.updatingSession = false
        }
    }
})

export const { update, ThemeModalSwitch, closeCreate, openCreate, initiateUpdate, endUpdate } = uiSlice.actions;
export default uiSlice.reducer;