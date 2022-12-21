import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const check = state.products.findIndex((data, index) => { return data._id == action.payload._id })
      console.log(check);
      if (check != -1) {
        state.total += action.payload.priceOut * action.payload.quantity;
        state.products[check].quantity += action.payload.quantity;
      }
      else {
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.priceOut * action.payload.quantity;
        state.products[0].quantity = action.payload.quantity;
      }

    },
    deleteProduct: (state, action) => {
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload), 1
      );
      state.quantity = state.quantity - 1
      state.total = 0
      // navigate('/cart')
      // state.products.splice(state.quantity() = 0, state.total() = 0, 1)
      // console.log(...state);
      // state.products = (action.payload.filter((data) => data._id !== id));
    }
  },
});

export const { addProduct, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;