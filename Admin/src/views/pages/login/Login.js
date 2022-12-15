
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginFailed } from "../../../redux/authSlice";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { message } from 'antd';
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useDispatch } from 'react-redux'
import { loginUser } from 'src/redux/apiRequest'
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Đăng Nhập Thành Công',
    });
  };
  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Tài Khoản Hoặc Mật Khẩu Không Chí Xác',
    });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        {contextHolder}
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                    onSubmit={handleLogin}
                  >
                    <h1>Đăng Nhập</h1>
                    <p className="text-medium-emphasis">Đăng Nhập Tài Khoản</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Tên Đăng Nhập" autoComplete="username"
                        onChange={(e) => setUsername(e.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Mật Khẩu"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" type="submit" className="px-4">
                          Đăng Nhập
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Quản Lý Hiệu Thuốc</h2>
                    <p>
                      Chương Trình Quản Lý Hiệu Thuốc
                    </p>
                    <Link to="/home">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Trang Chủ
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
