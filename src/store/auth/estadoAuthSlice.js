

import { createSlice } from "@reduxjs/toolkit";





export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', //not-authenticated, authenticated, checking
        uid: null,
        email: null,
        proveedor: null,
        proveedorId : null,
        isadmin: null,
        errorMessage: null,
        isLoading: false,
        rfc: null,
        token: null,
        isLoadingRegister: false,
        errorChangePassword: null,
        isLoadingCambioPassword: false,
        successChangePassword: null,
        cambiarPassword: 0
    },
    reducers: {
        login: (state, action) => {
            console.log(action.payload);
            localStorage.setItem("token", action.payload.token);
            state.status = 'authenticated'; //not-authenticated, authenticated, checking
            state.uid = action.payload.id;
            state.email = action.payload.email;
            state.proveedor = action.payload.proveedor;
            state.proveedorId = action.payload.proveedorId;
            state.errorMessage= null;
            state.isLoading = false;
            state.rfc = action.payload.rfc;
            state.token = action.payload.token;
            state.isadmin = action.payload.isadmin;
            state.cambiarPassword = action.payload.cambiarPassword;
        
        },
        logout: (state, { payload }) =>{
            localStorage.removeItem('token');
            state.status = 'not-authenticated'; //not-authenticated, authenticated, checking
            state.uid = null;
            state.email = null;
            state.proveedor = null;
            state.errorMessage= payload.errorMessage;
            state.isLoading = false;
            state.rfc = null;
            state.token = null;
            state.isadmin = null;
            state.proveedorId = null;
            // console.log("mensaje " + state.errorMessage);
            
        },
        checkingCredentials: (state) =>{
            state.status = 'cheking';
            state.isLoading = true;
        },
        isLoadingregisterUser: (state, { payload }) =>{
           state.isLoadingRegister = true;
        },
        registerUser: (state, { payload }) =>{
            state.isLoadingRegister = false;
            state.errorMessage= payload.errorMessage;
        },
        isLoadingChangepassword: (state) =>{
            state.isLoadingCambioPassword = true;
            state.errorChangePassword= null;
            state.successChangePassword = null;
        },
        cambioPasswordError: (state, { payload }) =>{
            state.isLoadingCambioPassword = false;
            state.errorChangePassword= payload.errorMessage;
        },
        cambioPassword: (state, { payload }) =>{
            state.isLoadingCambioPassword = false;
            state.successChangePassword= payload.Message;
        },
        ressetMessageChangePassword: (state) =>{
            state.isLoadingCambioPassword = false;
            state.errorChangePassword= null;
            state.successChangePassword = null;
        },
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials, registerUser, isLoadingregisterUser, isLoadingChangepassword, cambioPassword, cambioPasswordError, ressetMessageChangePassword } = authSlice.actions;