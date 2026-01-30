import { createSlice } from '@reduxjs/toolkit';
import { updateProfile } from '../user/userThunks';
// import CreateSession from "../../components/CreateSession";

const initialState = {
    themeName: 'defaultNeo',
    theme: {
        background: '#99d4eb',
        backgroundSticker: '#56a1be',
        primary: '#fda5d5',
        primarySticker: '#c43779',
        accent: '#fcc800',
        accentHover: '#dc9200',
    },
    modalOpen: false,
    createForm: true,
    updatingSession: false,
    profileModal: false,
};

const uiSlice = createSlice({
    name: 'UI',
    initialState,
    reducers: {
        update: (state, action) => {
            state.themeName = action.payload.name;
            state.theme = action.payload.theme;
        },
        ThemeModalSwitch: (state) => {
            state.modalOpen = !state.modalOpen;
        },
        closeCreate: (state) => {
            state.createForm = false;
        },

        openCreate: (state) => {
            state.createForm = true;
        },

        initiateUpdate: (state) => {
            state.updatingSession = true;
        },

        endUpdate: (state) => {
            state.updatingSession = false;
        },

        openProfileModal: (state) => {
            state.profileModal = true;
        },

        closeProfileModal: (state) => {
            state.profileModal = false;
        },
    },
});

export const {
    update,
    ThemeModalSwitch,
    closeCreate,
    openCreate,
    initiateUpdate,
    endUpdate,
    openProfileModal,
    closeProfileModal,
} = uiSlice.actions;
export default uiSlice.reducer;
