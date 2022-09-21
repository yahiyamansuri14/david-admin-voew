import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import  {authReducer}  from "../feature/auth/authSlice";
import { productReducer } from "../feature/product/productSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer
    },
    // middleware : (getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}))

})