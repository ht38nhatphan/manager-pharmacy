import { createSlice } from "@reduxjs/toolkit";


const countSlice = createSlice({
  name: "count",
  initialState: {
    count: {
      isFetching: false,
      error: false,
      deletedCount: 0,
    },
  },
  reducers: {
    getCountStart: (state) => {
      state.count.isFetching = true;
    },
    getCountSuccess: (state, action) => {
      state.count.isFetching = false;
      state.count.deletedCount = action.payload;
    },
    getCountFailed: (state) => {
      state.count.isFetching = false;
      state.count.error = true;
    },

  }

})

export const {
  getCountStart,
  getCountSuccess,
  getCountFailed,
} = countSlice.actions;

export default countSlice.reducer;