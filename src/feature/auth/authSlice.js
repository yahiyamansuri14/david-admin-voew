import { createSlice } from "@reduxjs/toolkit";
import { checkLogin, checkAuth, logout } from './authThunk'
const initialState = {
    loading: false,
    token: null,
    admin : false,
    email: null,
    error: false
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },
    extraReducers: {
        [checkLogin.pending] : (state) => {
            state.loading = true
        },
        [checkLogin.fulfilled] : (state, action) => {
            state.loading = false
            state.token = action.payload.access_token
            state.admin = action.payload.data.isAdmin
            state.email = action.payload.data.email
            state.error = false
            console.log("action is", action.payload)
        },
        [checkLogin.rejected] : (state) => {
            console.log("inside rejected state")
            state.loading = false
            state.error = true
        }, 
        [checkAuth.pending] : (state) => {
            state.loading = false
        },
        [checkAuth.fulfilled] : (state, action) => {
            state.loading = false
            state.email = action.payload.email
            state.token = action.payload.token
            state.admin = action.payload.admin
        },
        [checkAuth.rejected] : (state) => {
            state.loading = false
        },
        [logout.pending] : (state) => {
            state.loading = true
        },
        [logout.fulfilled] : (state, action) => {
            state.loading = false
            state.email = null
            state.token = null
            state.admin = null
        }, 
        [logout.rejected] : (state) => {
            state.loading =  false 
        }
    }
})

export const authReducer = authSlice.reducer