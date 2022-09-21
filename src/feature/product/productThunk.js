import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const getToken = async () => {
    const token = localStorage.getItem('access_token')
    return token
}

export const addSubscriber = createAsyncThunk(
    '/addSubscriber',
    async (data) => {
        let token = await getToken()
        let resp;
        await axios({
            method: "POST",
            url:"http://d1n2t-adm1n.maxnetcommercial.com:8080/v1/auth/signup",
            headers: {
                Authorization: `Bearer ${token}`                                                                 
            },
            data: data
        }).then(data => {
            resp = data.data
        }).catch(error => {
            resp = error
        })
        return resp
    }
)

export const getAllUser = createAsyncThunk(
    '/getAllUser',
    async (data) => {
        let limit = data == undefined ? 10 : limit
        let page = data == undefined ? 1 : page
        let resp;
        let token = await getToken();
        await axios({
            method: "GET",
            url: `http://d1n2t-adm1n.maxnetcommercial.com:8080/v1/user/find-all?limit=${limit}&page=${page}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then(data => {
            resp = data.data   
        }).catch(error => {
            console.log(error)
            resp = error
        })
        return resp
    }

)

export const updateUser = createAsyncThunk(
    '/updateUser',
    async (data) => {

        let resp
        let token = await getToken()
        await axios({
            method: "PUT",
            url:"http://d1n2t-adm1n.maxnetcommercial.com:8080/v1/user/update",
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: data
        }).then(data => {
            if(data.status === 200) {
                resp = true
            }
        }).catch(error => {
            console.log("error is", error)
            resp = error
        })
        return resp
    }
)

export const searchUser = createAsyncThunk(
    '/searchUser',
    async (email) => {
        let resp;
        let token = await getToken()
        await axios({
            method: "GET",
            url: `http://d1n2t-adm1n.maxnetcommercial.com:8080/v1/user/search?email=${email}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: email
        }).then(data => {
            resp = data.data
        }).catch(error => {
            console.log(error)
            resp = error
        })
        return resp;
    }
)

export const shippingMail = createAsyncThunk(
    '/shippingMail',
    async (data) => {
        let resp;
        let token = await getToken()
        await axios({
            method: "POST",
            url: 'http://d1n2t-adm1n.maxnetcommercial.com:8080/v1/user/mail/shipping',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: data
        }).then(data => {
            resp = data.data
        }).catch(error => {
            console.log(error)
            resp = error
        })
        return resp
    }
)

export const addProduct = createAsyncThunk(
    '/addProduct',
    async (data) => {
        let resp;
        let token = await getToken()

        await axios({
            method: "POST",
            url: "http://d1n2t-adm1n.maxnetcommercial.com:8080/v1/user/product/save",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data
        }).then(data => {
            resp = data.data
        }).catch(error => {
            console.log("error is", error)
            resp = error
        })
        return resp;
    }
)

export const getAllProduct = createAsyncThunk(
    '/getAllProduct',
    async () => {
        let resp;
        let token = await getToken()
        await axios({
            method: "GET",
            url: "http://d1n2t-adm1n.maxnetcommercial.com:8080/v1/user/product/all",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(data => {
            resp = data.data
        }).catch(error => {
            console.log("error is", error)
            resp = error
        })
        return resp;
    }
)

export const deleteProduct = createAsyncThunk(
    '/deleteProduct',
    async (data) => {
        let resp;
        let token = await getToken()
        await axios({
            method: "GET",
            url: `http://d1n2t-adm1n.maxnetcommercial.com:8080/v1/user/product/delete/${data}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(data => {
            resp = data.data
        }).catch(error => {
            console.log("error is", error)
            resp = error
        })
        return resp;
    }
)

export const deleteUser = createAsyncThunk(
    '/deleteUser',
    async (data) => {

        let resp;
        let token = await getToken()
        await axios({
            method: "GET",
            url: `http://d1n2t-adm1n.maxnetcommercial.com:8080/v1/user/delete/${data}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(data => {
            resp = data.data
        }).catch(error => {
            console.log("error is", error)
            resp = error
        })
        return resp;
    }
)

export const updateProduct = createAsyncThunk(
    '/updateProduct',
    
        async (data) => {
            let resp;
            let token = await getToken()

            await axios({
                method: "PUT",
                url: "http://d1n2t-adm1n.maxnetcommercial.com:8080/v1/user/product/update",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: data
            }).then(data => {
                // resp = data.data
                resp = true
            }).catch(error => {
                console.log("error is", error)
                resp = error
            })
            return resp;
        }
    
)

export const uploadImage = createAsyncThunk(
    '/uploadImage',
    async (data) => {
        let formData = new FormData()
        formData.append('file', data)
        let resp;
        let token = await getToken()

        await axios({
            method: "POST",
            url: "http://d1n2t-adm1n.maxnetcommercial.com:8080/v1/user/upload/file",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: formData
        }).then(data => {
            resp = data.data
            console.log(resp)
            // resp = true
        }).catch(error => {
            console.log("error is", error)
            resp = error
        })
        return resp;
    }
)

export const updateStock = createAsyncThunk(
    '/updateStock',
    async (data) => {
        let resp;
        let token = await getToken()
        await axios({
            method: "POST",
            url: "http://d1n2t-adm1n.maxnetcommercial.com:8080/v1/user/product/update/instock",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data
        }).then(data => {
            resp = data.data
            // resp = true
        }).catch(error => {
            console.log("error is", error)
            resp = error
        })
        return resp;
    }
)

export const sendProductEmail = createAsyncThunk(
    '/sendProductEmail',
    async (data) => {
        let resp;
        let token = await getToken()
        await axios({
            method: "POST",
            url: "http://d1n2t-adm1n.maxnetcommercial.com:8080/v1/user/mail/product",
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: data
        }).then(data => {
            resp = data.data
        }).catch(error => {
            console.log("error is", error)
            resp = error
        })
        return resp;
    }
)