import { createSlice } from "@reduxjs/toolkit";

const navBarSlice = createSlice({
    name: "navBarSlice",
    initialState: {
        sidebarShow: true,
    },
    reducers: {
        changeState: (state = sidebarShow, { type, ...rest }) => {
            switch (type) {
                case 'set':
                    return { ...state, ...rest }
                default:
                    return state
            }
        }
    },

})

export const {
    changeState,
} = navBarSlice.actions;

export default navBarSlice.reducer;