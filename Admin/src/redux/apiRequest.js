import axios from 'axios';
import { toast } from 'react-toastify';
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice";
import { addProductFail, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFail, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from './productSlice';
import { deleteUsersFailed, deleteUsersStart, deleteUsersSuccess, getUsersFailed, getUsersStart, getUsersSuccess } from './userSlice';
import { getOrderSuccess, getOrderFail, getOrderStart, addOrderStart, addOrderSuccess, addOrderFail, updateOrderStart, updateOrderSuccess, updateOrderFailure, deleteOrderStart, deleteOrderSuccess, deleteOrderFailure } from './orderSlice'

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:8000/auth/loginAdmin", user);
        dispatch(loginSuccess(res.data));
        navigate("/dashboard")
        toast.success("Đăng Nhập Thành Công");
    } catch (error) {
        dispatch(loginFailed());
        toast.error("Tài Khoản hoặc Mật Khẩu không chính xác!");
    }
}

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post("/auth/register", user);
        dispatch(registerSuccess());
        navigate("/login");
        toast.success("Đăng Ký Thành Công");
    } catch (error) {
        dispatch(registerFailed());
        toast.error("Đăng Ký Thất Bại");
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
        navigate("/");
    } catch (error) {
        dispatch(logoutFailed());
    }
}
// [GET] ALL ORDER
export const getAllOrder = async (dispatch) => {
    dispatch(getOrderStart());
    try {
        const res = await axios.get("/Order/getAllOder")
        dispatch(getOrderSuccess(res.data))
    } catch (error) {
        dispatch(getOrderFail());
    }


}
// [POST] ADD ORDER
export const addOrder = async (order, accessToken, dispatch, navigate, axiosJWT) => {
    dispatch(addOrderStart());
    try {
        const res = await axiosJWT.post("/Order/addorder", order
            , {
                headers: { "Content-Type": "multipart/form-data", token: `Bearer ${accessToken}` },
            })
        console.log(res);
        dispatch(addOrderSuccess(res.data))
        navigate("/transaction/list-invoice")
        toast.success('Thêm Đơn Hàng Thành Công!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

    } catch (error) {
        toast.error('Thêm Đơn Hàng Thất Bại!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        dispatch(addOrderFail());

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
// [POST] ADD PRODUCTS
export const addThuocs = async (product, accessToken, dispatch, navigate, axiosJWT) => {
    dispatch(addProductStart());
    try {
        // const res1 = await axios.get("/thuocs/getAll")


        // const idbrand = res1.data.map(x => x.idbrand)
        // console.log(product);
        // if (idbrand.findIndex(el => el == res.data.idbrand)) {
        //     toast.error('Mã Thuốc này đã tồn tại!', {
        //         position: "bottom-right",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "dark",
        //     });
        // }
        // else {
        const res = await axiosJWT.post("/thuocs/store", product
            , {
                headers: { "Content-Type": "multipart/form-data", token: `Bearer ${accessToken}` },
            })
        dispatch(addProductSuccess(res.data))
        navigate("/warehouse/list-warehouse")
        toast.success('Thêm Sản Phẩm Thành Công!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        // }
    } catch (error) {
        toast.error('Thêm Sản Phẩm Thất Bại!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        dispatch(addProductFail());

    }
}
// [DELETE]DELETE PRODUCTS
export const deleteProduct = async (accessToken, dispatch, navigate, id, axiosJWT) => {
    dispatch(deleteProductStart());
    try {
        const res = await axiosJWT.delete(`/thuocs/${id}`, {
            headers: { token: `Bearer ${accessToken}` }
        });
        dispatch(deleteProductSuccess(id));
        navigate("/pharmacy/list-pharmacy");
        toast.success('Xóa Sản Phẩm Thành Công!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    } catch (err) {
        dispatch(deleteProductFailure());
        toast.error('Xóa Sản Phẩm Thất Bại!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
};
// [DELETE]DELETE FORCE PRODUCTS
export const deleteForceProduct = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(deleteProductStart());
    try {
        const res = await axiosJWT.delete(`/thuocs/${id}/force`);
        dispatch(deleteProductSuccess(id));
    } catch (err) {
        dispatch(deleteProductFailure());
    }
};
// [PUT] UPDATE PRODUCTS
export const updateProduct = async (accessToken, product, dispatch, navigate, id, axiosJWT) => {
    dispatch(updateProductStart());
    try {

        // const res2 = await axios.get(`/thuocs/${id}`)
        // const res1 = await axios.get("/thuocs/getAll")
        // console.log(res2);
        const res = await axiosJWT.put(`/thuocs/${id}`, product, {
            headers: { token: `Bearer ${accessToken}` }
        });
        // const idbrand = res1.data.map(x => x.idbrand)
        dispatch(updateProductSuccess(id, product));
        navigate("/pharmacy/list-pharmacy")
        toast.success('Cập Nhật Thành Công!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

    } catch (err) {
        dispatch(updateProductFailure());
        toast.error('Cập Nhật Thất Bại!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
};