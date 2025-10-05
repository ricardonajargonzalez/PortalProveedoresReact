import { createSlice } from "@reduxjs/toolkit";




export const estadoDocumentos = createSlice({
    name: 'documentos',
    initialState: {
        documentos:[],
        isLoading : false
    },
    reducers: {
        reducerStartDocumentos: (state) => {
            state.isLoading = true;
        },
        reducerDocumentos: (state, action) =>{
            state.isLoading = false;
            state.documentos = action.payload.documentos
        }
    }
});


// Action creators are generated for each case reducer function
export const { reducerStartDocumentos, reducerDocumentos } = estadoDocumentos.actions;