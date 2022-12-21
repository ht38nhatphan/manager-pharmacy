import axios from 'axios';
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice";
import { getProductFail, getProductStart, getProductSuccess } from './productSlice';
import { deleteUsersFailed, deleteUsersStart, deleteUsersSuccess, getUsersFailed, getUsersStart, getUsersSuccess } from './userSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
        navigate("/")
    } catch (error) {
        dispatch(loginFailed());
    }
}

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post("/auth/register", user);
        dispatch(registerSuccess());
        navigate("/login");
    } catch (error) {
        dispatch(registerFailed());
    }
}

// [GET] ALL USER
export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUsersStart());
    try {
        const res = await axiosJWT.get("/user", {
            headers: { token: `Bearer ${accessToken}` },
        })
        dispatch(getUsersSuccess(res.data))
    } catch (error) {
        dispatch(getUsersFailed());
    }
}

// DELETE USER
export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(deleteUsersStart());
    try {
        const res = await axiosJWT.delete("/user/" + id, {
            headers: { token: `Bearer ${accessToken}` },
        })
        dispatch(deleteUsersSuccess(res.data));

    } catch (error) {
        dispatch(deleteUsersFailed(error.response.data));
    }
}

// LOGOUT
export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post("/auth/logout", id, {
            headers: { token: `Bearer ${accessToken}` }
        })
        dispatch(logoutSuccess());
        navigate("/login");
    } catch (error) {
        dispatch(logoutFailed());
    }
}

// [GET] ALL PRODUCTS
export const getAllThuocs = async (dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await axios.get("/thuocs/getAll")
        dispatch(getProductSuccess(res.data))
    } catch (error) {
        dispatch(getProductFail());
    }
}
// Delete order

