import React from 'react';
import '../../assets/login/css/bootstrap.min.css';
import '../../assets/login/css/styles.css';
import { useState } from "react";
import { registerUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        const newUser = {
            email: email,
            username: username,
            password: password,
        };
        registerUser(newUser, dispatch, navigate);
    }
    return (
        <div>
            <main id="page-content" className="d-flex nm-aic nm-vh-md-100">
                <div className="overlay" />
                <div className="nm-tm-wr">
                    <div className="container">
                        <form onSubmit={handleRegister}> 
                            <div className="nm-hr nm-up-rl-3">
                                <h2>Đăng Ký</h2>
                                <ul className="social-buttons">
                                    <li className="nm-hvr">
                                        <a href="http://google.com/">
                                            <i className="fab fa-google" />
                                        </a>
                                    </li>
                                    <li className="nm-hvr">
                                        <a href="https://twitter.com/">
                                            <i className="fab fa-twitter" />
                                        </a>
                                    </li>
                                    <li className="nm-hvr">
                                        <a href="https://www.facebook.com/">
                                            <i className="fab fa-facebook-f" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="input-group nm-gp">
                                <span className="nm-gp-pp"><i className="fas fa-user" /></span>
                                <input type="text" className="form-control" id="inputUsername" onChange={(e) => setUsername(e.target.value)} tabIndex={1} placeholder="Tên Đăng Nhập" required />
                            </div>
                            <div className="input-group nm-gp">
                                <span className="nm-gp-pp"><i className="fas fa-envelope-open" /></span>
                                <input type="email" className="form-control" id="inputEmail" onChange={(e) => setEmail(e.target.value)} tabIndex={2} placeholder="Email" required />
                            </div>
                            <div className="input-group nm-gp">
                                <span className="nm-gp-pp"><i className="fas fa-lock" /></span>
                                <input type="password" className="form-control" id="inputPassword" onChange={(e) => setPassword(e.target.value)} tabIndex={3} placeholder="Mật Khẩu" required />
                            </div>
                            <div className="input-group nm-gp">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                                    <label className="form-check-label nm-check" htmlFor="rememberMe"> Tôi Đồng Ý Với <a className="nm-fs-1 nm-fw-bd" href="#"> Điều Khoản &amp; Chính Sách Sử Dụng</a></label>
                                </div>
                            </div>
                            <div className="row nm-aic nm-mb-1">
                                <div className="col-sm-6 nm-mb-1 nm-mb-sm-0">
                                    <button type="submit" className="btn btn-primary nm-hvr nm-btn-2">Đăng Ký</button>
                                </div>
                            </div>
                            <footer style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.75rem', color: '#97a4af', fontWeight: 400 }}>Bạn Đã Có Tài Khoản? <a className="nm-fs-1 nm-fw-bd" style={{ fontSize: '0.75rem' }} href="login">Đăng Nhập</a></footer>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Signup;