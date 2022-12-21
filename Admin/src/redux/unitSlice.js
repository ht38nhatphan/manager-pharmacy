import { createSlice } from "@reduxjs/toolkit";


const unitSlice = createSlice({
  name: "order",
  initialState: {
    unit: {
      unit: [],
      isFetching: false,
      error: false,

    },
  },
  reducers: {
    //GET ALL unit
    getunitStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getunitSuccess: (state, action) => {
      state.isFetching = false;
      state.unit.unit = action.payload;
      state.error = false;
    },
    getunitFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //ADD Order
    addunitStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addunitSuccess: (state, action) => {
      state.isFetching = false;
      state.unit.unit.push(action.payload);

    },
    addunitFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },


    ////UPDATE Order quantity

  },
});

export const { getunitStart,
  getunitSuccess,
  addunitSuccess,
  addunitStart,
} = unitSlice.actions;
export default unitSlice.reducer;