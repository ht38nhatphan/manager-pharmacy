import { createSlice } from "@reduxjs/toolkit";


const supelierSlice = createSlice({
  name: "order",
  initialState: {
    supelier: {
      supelier: [],
      isFetching: false,
      error: false,

    },
  },
  reducers: {
    //GET ALL supelier
    getsupelierStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getsupelierSuccess: (state, action) => {
      state.isFetching = false;
      state.supelier.supelier = action.payload;
      state.error = false;
    },
    getsupelierFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //ADD Order
    addsupelierStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addsupelierSuccess: (state, action) => {
      state.isFetching = false;
      state.supelier.supelier.push(action.payload);

    },
    addsupelierFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },


    ////UPDATE Order quantity

  },
});

export const { getsupelierStart,
  getsupelierSuccess,
  addsupelierSuccess,
  addsupelierStart,
} = supelierSlice.actions;
export default supelierSlice.reducer;