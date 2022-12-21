import { createSlice } from "@reduxjs/toolkit";


const categorySlice = createSlice({
  name: "order",
  initialState: {
    category: {
      category: [],
      isFetching: false,
      error: false,

    },
  },
  reducers: {
    //GET ALL category
    getcategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getcategorySuccess: (state, action) => {
      state.isFetching = false;
      state.category.category = action.payload;
      state.error = false;
    },
    getcategoryFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //ADD Order
    addcategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addcategorySuccess: (state, action) => {
      state.isFetching = false;
      state.category.category.push(action.payload);

    },
    addcategoryFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },


    ////UPDATE Order quantity

  },
});

export const { getcategoryStart,
  getcategorySuccess,
  addcategorySuccess,
  addcategoryStart,
} = categorySlice.actions;
export default categorySlice.reducer;