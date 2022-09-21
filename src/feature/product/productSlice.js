const { createSlice } = require("@reduxjs/toolkit");
const { addSubscriber, getAllUser, updateUser, 
    searchUser, shippingMail, addProduct, getAllProduct, 
    deleteProduct, deleteUser, updateProduct, uploadImage,
     updateStock, sendProductEmail 
} = require("./productThunk");


const initialState = {
    products: [],
    users: [],
    files: [],
    success: false,
    loading: false,
    product: {}
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        emptyFiles : (state) => {
            state.files = []
        }
    },
    extraReducers: {
        [addSubscriber.pending]: (state) => {
            state.loading =  true
        },
        [addSubscriber.fulfilled] : (state, action) => {
            state.loading = false
            state.success = true
            state.users.push(action.payload.data)
        },
        [addSubscriber.rejected] : (state) => {
            state.loading = false
        },
        [uploadImage.pending] : (state) => {
            state.loading = true
        },
        [uploadImage.fulfilled] : (state, action) => {
            state.loading = false
            state.success = true
            if(state.files.length <= 3)
                state.files.push(action.payload)
        },
        [uploadImage.rejected] : (state) => {
            state.loading = false
            state.success = false
        },
        [getAllUser.pending] : (state) => {
            state.loading = true
        }, 
        [getAllUser.fulfilled] : (state, action) => {
            state.loading = false
            state.success = true
            state.users = action.payload.data
        },
        [getAllUser.rejected] : (state) => {
            state.loading = true
            state.success = false
        },
        [updateUser.pending] : (state) => {
            state.loading = true
        },
        [updateUser.fulfilled] : (state, action) => {
            state.loading = false
            state.success = true
        },
        [updateUser.rejected] : (state) => {
            state.loading = true
        },
        [searchUser.pending] : (state) => {
            state.loading = true
        },
        [searchUser.fulfilled] : (state, action) => {
            state.loading = false
            state.users = action.payload 
        },
        [searchUser.rejected] : (state) => {
            state.loading = true
            state.success = false
        },
        [shippingMail.pending] : (state) => {
            state.loading = true
        },
        [shippingMail.fulfilled] : (state, action) => {
            state.success = true
        },
        [shippingMail.rejected] : (state) => {
            state.loading = false
            state.success = false
        },
        [addProduct.pending] : (state) => {
            state.loading = true
        },
        [addProduct.fulfilled] : (state, action) => {
            state.loading = false
            state.success = true
            state.files = []
            // state.files = action.payload
            // state.files = 
        },
        [addProduct.rejected] : (state) => {
            state.loading = true
            state.success = false
        },
        [getAllProduct.pending] : (state) => {
            state.loading = true
        },
        [getAllProduct.fulfilled] : (state, action) => {
            state.products = action.payload.data
        },
        [getAllProduct.rejected] : (state) => {
            state.loading = false
            state.success = false
        },
        [deleteProduct.pending] : (state) => {
            state.loading = true
        },
        [deleteProduct.fulfilled] :(state, action) => {
            state.loading = false
            state.success = true
        },
        [deleteProduct.rejected] :(state) => {
            state.loading = false
            state.success = false
        },
        [deleteUser.pending] : (state) => {
            state.loading = true
        },
        [deleteUser.fulfilled] : (state, action) => {
            state.loading = false
            state.success = true
        },
        [deleteUser.rejected] : (state) => {
            state.loading = false
            state.success = false
        },
        [updateProduct.pending] : (state) => {
            state.loading = true
        },
        [updateProduct.fulfilled] : (state, action) => {
            state.loading = false
            state.success = true
            state.files = []
        },
        [updateProduct.rejected] : (state) => {
            state.loading = false
            state.success = false
        },
        [updateStock.pending] : (state) => {
            state.loading = true
        },
        [updateStock.fulfilled] : (state, action) => {
            state.loading = false
            state.success = true
        },
        [updateStock.rejected] : (state) =>{
            state.loading = false
            state.success = false
        },
        [sendProductEmail.pending] : (state) => {
            state.loading = true
        },
        [sendProductEmail.fulfilled] : (state, action) => {
            state.loading = false
            state.success = true
        },
        [sendProductEmail.rejected] : (state) => {
            state.loading = false
            state.success = false
        }
    }  
})


export const { emptyFiles } = productSlice.actions
export const productReducer = productSlice.reducer