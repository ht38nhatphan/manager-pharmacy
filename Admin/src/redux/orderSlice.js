import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {
      order: [],
      isFetching: false,
      error: false,
      success: false
    },
  },
  reducers: {
    //GET ALL Order
    getOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.order = action.payload;
      state.error = false;
    },
    getOrderFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //ADD Order
    addOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.order.push(action.payload);

    },
    addOrderFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //UPDATE Order
    updateOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.order[
        state.order.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.order;
    },
    updateOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.order.splice(
        state.order.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { getOrderStart,
  getOrderSuccess,
  getOrderFail,
  addOrderStart,
  addOrderSuccess,
  addOrderFail,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailure, } = orderSlice.actions;
export default orderSlice.reducer;