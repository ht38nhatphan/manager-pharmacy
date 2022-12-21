import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        users: {
            allUsers: null,
            isFetching: false,
            error: false,
            deletedCount: 0,
        },
        msg: "",
    },
    reducers: {
        getUsersStart: (state) => {
            state.users.isFetching = true;
        },
        getUsersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
            state.users.deletedCount = 0;
        },
        getUsersFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
        deleteUsersStart: (state) => {
            state.users.isFetching = true;
        },
        deleteUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.users.allUsers.splice(
                state.users.allUsers.findIndex((item) => item._id === action.payload),
                1
            );
        },
        deleteUsersFailed: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
        },

        restoreUsersStart: (state) => {
            state.users.isFetching = true;
        },
        restoreUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.users.allUsers.splice(
                state.users.allUsers.findIndex((item) => item._id === action.payload),
                1
            );
        },
        restoreUsersFailed: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
        },


    }

})

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailed,
    deleteUsersStart,
    deleteUsersSuccess,
    deleteUsersFailed,
    restoreUsersStart,
    restoreUsersSuccess,
    restoreUsersFailed
} = userSlice.actions;

export default userSlice.reducer;