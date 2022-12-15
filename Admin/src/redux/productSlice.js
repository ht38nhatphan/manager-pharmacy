import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name: "product",
    initialState: {
        products: {
            products: [],
            isFetching: false,
            error: false,
            success: false
        },
        msg: "",
    },
    reducers: {
        //GET ALL PRODUCT
        getProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products = action.payload;
            state.error = false;
        },
        getProductFail: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //ADD PRODUCT
        addProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products.push(action.payload);

        },
        addProductFail: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //UPDATE PRODUCT
        updateProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products[
                state.products.findIndex((item) => item._id === action.payload.id)
            ] = action.payload.product;
        },
        updateProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //DELETE
        deleteProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products.splice(
                state.products.findIndex((item) => item._id === action.payload),
                1
            );
        },
        deleteProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //FIND BY ID
        getProductIdStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getProductIdSuccess: (state, action) => {
            state.isFetching = false;
            state.products = action.payload;
            state.error = false;
        },
        getProductIdFail: (state) => {
            state.isFetching = false;
            state.error = true;
        },

    }


})

export const {
    getProductStart,
    getProductSuccess,
    getProductFail,
    addProductStart,
    addProductSuccess,
    addProductFail,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
} = productSlice.actions;

export default productSlice.reducer;