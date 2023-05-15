import axios from 'axios';
import { toast } from 'react-toastify';
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice";
import { addProductFail, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFail, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from './productSlice';
import { deleteUsersFailed, deleteUsersStart, deleteUsersSuccess, getUsersFailed, getUsersStart, getUsersSuccess, restoreUsersFailed, restoreUsersStart, restoreUsersSuccess } from './userSlice';
import { getOrderSuccess, getOrderFail, getOrderStart, addOrderStart, addOrderSuccess, addOrderFail, updateOrderStart, updateOrderSuccess, updateOrderFailure, deleteOrderStart, deleteOrderSuccess, deleteOrderFailure } from './orderSlice'
import { getCountStart, getCountFailed, getCountSuccess } from './countDeleted';
import { getcategorySuccess, addcategorySuccess } from './categorySlice';
import { getunitSuccess, addunitSuccess } from './unitSlice';
import { getsupelierSuccess, addsupelierSuccess } from './supelierSlice';
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("https://api-mng.onrender.com/auth/loginAdmin", user);
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
        await axios.post("https://api-mng.onrender.com/auth/register", user);
        dispatch(registerSuccess());
        navigate("/login");
        toast.success("Đăng Ký Thành Công");
    } catch (error) {
        dispatch(registerFailed());
        toast.error("Đăng Ký Thất Bại");
    }
}

// [GET] ALL USER
export const getAllUsers = async (dispatch) => {
    dispatch(getUsersStart());
    dispatch(getCountStart());
    try {
        const res = await axios.get("https://api-mng.onrender.com/user")
        const count = await axios.get("https://api-mng.onrender.com/user/getCountDeleted")
        dispatch(getUsersSuccess(res.data))
        dispatch(getCountSuccess(count.data))
    } catch (error) {
        dispatch(getUsersFailed());
        dispatch(getCountFailed());
    }
}

// DELETE USER
export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(deleteUsersStart());
    dispatch(getCountStart());
    try {
        const res = await axiosJWT.delete("https://api-mng.onrender.com/user/" + id, {
            headers: { token: `Bearer ${accessToken}` },
        })
        const count = await axios.get("https://api-mng.onrender.com/user/getCountDeleted")
        dispatch(deleteUsersSuccess(res.data));
        dispatch(getCountSuccess(count.data))
        toast.success("Khoá tài khoản thành công!");
    } catch (error) {
        dispatch(deleteUsersFailed());
        dispatch(getCountFailed());
        toast.error(error.response.data);
    }
}

// [POST] ADD USER
export const addUserForAdmin = async (accessToken, user, dispatch, navigate, axiosJWT) => {
    dispatch(registerStart());
    try {
        await axiosJWT.post("https://api-mng.onrender.com/auth/addUser", user, {
            headers: { token: `Bearer ${accessToken}` },
        })
        dispatch(registerSuccess());
        console.log(user.password)
        user.password == "1" && user.name == user.username ? "" : navigate("/staff/staff-list");
        // navigate("/staff/staff-list");
        toast.success("Đăng Ký Tài Khoản Mới Thành Công!");
    } catch (error) {
        dispatch(registerFailed());
        toast.error(error.response.data);
    }
}

// [GET] ALL USER WERE DELETED
export const getAllUsersDeleted = async (dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await axios.get("https://api-mng.onrender.com/user/trash", {
        })
        dispatch(getUsersSuccess(res.data))
    } catch (error) {
        dispatch(getUsersFailed());
    }
}




export const restoreUser = async (dispatch, id) => {
    dispatch(restoreUsersStart());
    dispatch(getCountStart());
    try {
        const res = await axios.patch(`https://api-mng.onrender.com/user/${id}/restore`, id)
        const count = await axios.get("https://api-mng.onrender.com/user/getCountDeleted")
        dispatch(restoreUsersSuccess(res.data));
        dispatch(getCountSuccess(count.data))
        toast.success("Khôi Phục Tài Khoản Thành Công!");
    } catch (error) {
        // dispatch(deleteUsersFailed(error.response.data));
        dispatch(restoreUsersFailed());
        dispatch(getCountFailed());
    }
}
// LOGOUT
export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post("https://api-mng.onrender.com/auth/logout", id, {
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
        const res = await axios.get("https://api-mng.onrender.com/order/getAllOrder")
        dispatch(getOrderSuccess(res.data))
    } catch (error) {
        dispatch(getOrderFail());
    }


}
// [POST] ADD ORDER
export const addOrder = async (order, dispatch, navigate) => {
    dispatch(addOrderStart());
    try {
        const res = await axios.post("https://api-mng.onrender.com/order/addorder", order)
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
        const res = await axios.get("https://api-mng.onrender.com/thuocs/getAll")
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

        const res = await axiosJWT.post("https://api-mng.onrender.com/thuocs/store", product
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
        toast.error(error.response.data);
        dispatch(addProductFail());

    }
}
// [DELETE]DELETE PRODUCTS
export const deleteProduct = async (accessToken, dispatch, navigate, id, axiosJWT) => {
    dispatch(deleteProductStart());
    try {
        const res = await axiosJWT.delete(`https://api-mng.onrender.com/thuocs/${id}`, {
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
        const res = await axiosJWT.delete(`https://api-mng.onrender.com/thuocs/${id}/force`);
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
        const res = await axiosJWT.put(`https://api-mng.onrender.com/thuocs/${id}`, product, {
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


// update order quantity
// [PUT] UPDATE PRODUCTS
export const updateProductQuantity = async (accessToken, product, dispatch, navigate, id, axiosJWT) => {
    dispatch(updateProductStart());
    try {

        // const res2 = await axios.get(`/thuocs/${id}`)
        // const res1 = await axios.get("/thuocs/getAll")
        // console.log(res2);
        const res = await axiosJWT.put(`https://api-mng.onrender.com/thuocs/${id}`, product, {
            headers: { token: `Bearer ${accessToken}` }
        });
        // const idbrand = res1.data.map(x => x.idbrand)
        dispatch(updateProductSuccess(id, product));
        navigate("/transaction/list-invoice")

    } catch (err) {
        dispatch(updateProductFailure());
        // dispatch(updateProductFailure());
        // toast.error('Cập Nhật Thất Bại!', {
        //     position: "bottom-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "dark",
        // });
    }

};



// [GET] ALL categrory
export const getAllCategory = async (dispatch) => {
    // dispatch(getProductStart());
    try {
        const res = await axios.get("https://api-mng.onrender.com/categories/getAllCategory")
        dispatch(getcategorySuccess(res.data))
    } catch (error) {
    }


}
// [POST] ADD category
export const addCategory = async (product, dispatch) => {
    // dispatch(addProductStart());
    try {
        // const res1 = await axios.get("/thuocs/getAll")
        const res = await axios.post("https://api-mng.onrender.com/categories/addCategory", product
        )
        dispatch(addcategorySuccess(res.data))

    } catch (error) {

    }
}
// [GET] ALL unit
export const getAllUnit = async (dispatch) => {
    // dispatch(getProductStart());
    try {
        const res = await axios.get("https://api-mng.onrender.com/unit/getAllUnit")
        dispatch(getunitSuccess(res.data))
    } catch (error) {
    }


}
// [POST] ADD unit
export const addUnit = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
        // const res1 = await axios.get("/thuocs/getAll")
        const res = await axios.post("https://api-mng.onrender.com/unit/addUnit", product
        )
        dispatch(addunitSuccess(res.data))

    } catch (error) {

    }
}
// [GET] ALL supelier
export const getAllSupelier = async (dispatch) => {
    // dispatch(getProductStart());
    try {
        const res = await axios.get("https://api-mng.onrender.com/supelier/getAllSupelier")
        dispatch(getsupelierSuccess(res.data))
    } catch (error) {
    }


}
// [POST] ADD supelier
export const addSupelier = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
        // const res1 = await axios.get("/thuocs/getAll")
        const res = await axios.post("https://api-mng.onrender.com/supelier/addSupelier", product
        )
        dispatch(addsupelierSuccess(res.data))

    } catch (error) {

    }
}