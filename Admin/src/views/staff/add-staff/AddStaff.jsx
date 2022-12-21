import React, { useState } from "react";
import {
  CButton,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../../../css/styleformaddwarehouse.css'
import { createAxios } from "src/createInstance";
import { loginSuccess } from "src/redux/authSlice";
import { Select } from "antd";
import { addUserForAdmin } from "src/redux/apiRequest";
const options = [
  {
    name: 'Quản trị viên',
    value: true,
  },
  {
    name: 'Khách Hàng',
    value: false,
  },
]
const AddStaff = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [username, setusername] = useState({});
  const [password, setpassword] = useState({});
  const [email, setemail] = useState({});
  const [name, setname] = useState({});
  const [phone, setphone] = useState({});
  const [isAdmin, setisAdmin] = useState({});
  const user = useSelector((state) => state.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  let accessToken = user.accessToken
  const handleAddProduct = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    const formData = {
      username: username,
      email: email,
      password: password,
      admin: isAdmin,
      name: name,
      phone: phone,
    };
    addUserForAdmin(accessToken, formData, dispatch, navigate, axiosJWT)
  }
  return (
    <div>
      <CForm
        className="row g-3 needs-validation"
        noValidate
        validated={validated}
      >

        <CCol md={6}>
          <CFormLabel htmlFor="validationCustom01">Tên Đăng Nhập</CFormLabel>
          <CFormInput
            type="text"
            id="validationCustom01"
            placeholder="Tên Đăng Nhập..."
            name="username"
            onChange={(e) => setusername(e.target.value)}
            required
          />
          <CFormFeedback valid>Ok!</CFormFeedback>
        </CCol>
        <CCol md={6}>
          <CFormLabel htmlFor="validationCustom02"> Email: </CFormLabel>
          <CFormInput
            type="text"
            id="validationCustom01"
            placeholder="Nhập Email..."
            name="email"
            onChange={(e) => setemail(e.target.value)}
            required
          />
          <CFormFeedback valid>Ok!</CFormFeedback>
        </CCol>
        <CCol md={6}>
          <CFormLabel htmlFor="validationCustom02"> Tên Người Dùng: </CFormLabel>
          <CFormInput
            type="name"
            id="validationCustom01"
            placeholder="Nhập Tên Người Dùng..."
            name="name"
            onChange={(e) => setname(e.target.value)}
            required
          />
          <CFormFeedback valid>Ok!</CFormFeedback>
        </CCol>
        <CCol md={6}>
          <CFormLabel htmlFor="validationCustom02"> Số Điện Thoại Người Dùng: </CFormLabel>
          <CFormInput
            type="phone"
            id="validationCustom01"
            placeholder="Nhập Số Điện Thoại Người Dùng..."
            name="email"
            onChange={(e) => setphone(e.target.value)}
            required
          />
          <CFormFeedback valid>Ok!</CFormFeedback>
        </CCol>
        <CCol md={6}>
          <CFormLabel htmlFor="validationCustom03">Mật Khẩu: </CFormLabel>
          <CFormInput
            type="password"
            id="validationCustom02"
            placeholder="Nhập Mật Khẩu..."
            name="password"
            onChange={(e) => setpassword(e.target.value)}
            required
          />
          <CFormFeedback valid>Ok!</CFormFeedback>
        </CCol>

        <CCol CCol md={6}>
          <CFormLabel htmlFor="validationCustom04">Vai Trò</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            name="admin"
            onChange={(e) => setisAdmin(e.target.value)}
            required
          >
            <option >
              {" "}
              -- Vai Trò --{" "}
            </option>
            <option value={false}>
              Khách Hàng
            </option>
            <option value={true}>
              Quản trị viên
            </option>
          </CFormSelect>
          <CFormFeedback valid>Ok!</CFormFeedback>
        </CCol>
        <CButton onClick={handleAddProduct} color="primary" >
          Tạo Mới Tài Khoản
        </CButton>
      </CForm >
    </div >

  );
};

export default AddStaff;