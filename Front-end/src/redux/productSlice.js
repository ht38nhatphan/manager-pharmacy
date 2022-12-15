import {createSlice} from "@reduxjs/toolkit";


const productSlice = createSlice({
    name: "product",
    initialState: {
        products: {
            products: [],
            isFetching: false, 
            error: false,
        },
       msg:"",
    },
    reducers:{
        //GET ALL PRODUCT
            getProductStart:(state)=>{
                state.isFetching = true;
                state.error = false;
            },
            getProductSuccess:(state, action)=>{
                state.isFetching = false;
                state.products = action.payload;
                state.error = false;
            },
            getProductFail:(state)=>{
                state.isFetching = false;
                state.error = true;
            },
    }
   
})

export const {
    getProductStart,
    getProductSuccess,
    getProductFail
} = productSlice.actions;

export default productSlice.reducer;