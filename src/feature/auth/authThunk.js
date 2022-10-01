import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//http://localhost
//http://localhost
// http://d1n2t-adm1n.maxnetcommercial.com/
//localhost
export const checkLogin = createAsyncThunk(
    '/checkLogin',
    async (data) => {
       let resp;
       return new Promise(async (resolve, reject) => {
        await axios({
            method: "POST",
            url: "http://139.144.62.230:8080/v1/auth/login",
            data: data
           }).then(data => {
            resp = data.data;
                localStorage.setItem('email', resp.data.email)
                localStorage.setItem('admin', resp.data.isAdmin)
                localStorage.setItem('access_token', resp.access_token)
                return resolve(resp)
           }).catch(error => {
            console.log("inside login error", error)
            resp = error
            return reject(resp)
           })
       })
      
      // return resp;
    }
)

export const checkAuth = createAsyncThunk(
    '/checkAuth',
    async () => {
        let token = localStorage.getItem("access_token")
        let data;
        if(token) {
            let admin = localStorage.getItem("admin")
            let email = localStorage.getItem('email')
            data = { admin, email, token }
        }
        return data
    }
)

export const logout = createAsyncThunk(
    '/logout',
    async () => {
        localStorage.clear('email')
        localStorage.clear('access_token')
        localStorage.clear('admin')
    }
)