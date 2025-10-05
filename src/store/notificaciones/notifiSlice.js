

import { createSlice } from "@reduxjs/toolkit";





export const notifiSlice = createSlice({
    name: 'notifi',
    initialState: {
        isLoading: false,
        notificaciones : [],
        count: 0
    },
    reducers: {
        reduceStartNotifications: (state) => {
            state.isLoading = true; 
        },
        reduceCountnotificaciones: (state, {payload}) => {
            state.isLoading = false; 
            state.count = payload.count;
            state.notificaciones = payload.notificaciones;
        }
    }
});


// Action creators are generated for each case reducer function
export const { reduceStartNotifications,reduceCountnotificaciones} = notifiSlice.actions;