import { useEffect } from 'react';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createAxios } from "../../createInstance";
import { logOut } from "../../redux/apiRequest";
import { logoutSuccess } from "../../redux/authSlice";
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Header = () => {
    const quantity = useSelector(state => state.cart.quantity)
    console.log(quantity)
    const CategoryList = ['Sức Khỏe Tim Mạch', 'Chăm Sóc Da Mặt', 'Hỗ trợ tiêu hóa']
    useEffect(() => {

        const navbar = document.getElementById("sticky-header");
        const sticky = navbar.offsetTop;

        function scrollStickyHeader() {
            if (window.pageYOffset > sticky) {
                navbar.classList.add("sticky-menu")
            } else {
                navbar.classList.remove("sticky-menu");
            }
        }
        window.onscroll = function () { scrollStickyHeader() };
    })

    const user = useSelector((state) => state.auth.login.currentUser);
    const accessToken = user?.accessToken;
    const id = user?._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, logoutSuccess);

    const handleLogout = () => {
        logOut(dispatch, id, navigate, accessToken, axiosJWT);
    }
    return (
        <header>
            <div id="sticky-header" className="menu-area">
                <div className="container">
                    <div className="mobile-nav-toggler"><i className="fas fa-bars" /></div>
                    <div className="menu-wrap">
                        <nav className="menu-nav">
                            <div className="row align-items-center">
                                <div className="col-lg-5 d-none d-lg-block">
                                    <div className="navbar-wrap main-menu d-none d-lg-flex">
                                        <ul className="navigation">
                                            <li className="active"><a href="/">Trang chủ</a></li>
                                            <li className="menu-item-has-children"><a href="#">Về Chúng Tôi</a>
                                                <ul className="sub-menu">
                                                    <li><Link to="/blog" > Giới thiệu </Link></li>

                                                    <li><a href="blog-details.html">Hệ thống cửa hàng</a></li>
                                                    <li><a href="contact.html"> Liên Hệ Với Chúng Tôi</a></li>
                                                </ul>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3">
                                    <div className="logo">
                                        <a href="index-2.html"><img src="img/logo/logo.png" alt="" /></a>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-9">
                                    <div className="header-action">
                                        <ul>
                                            <li className="header-search">
                                                <form action="#">
                                                    <button><i className="fas fa-search" /></button>
                                                    <input type="text" placeholder="Search fre Medicines" />
                                                </form>
                                            </li>
                                            <li className="header-user ">

                                                {user ? (
                                                    <>
                                                        <li className="header-shop-cart d-none d-md-flex">
                                                            <span className="cart-price"> {user.username}  </span>
                                                            <ul className="minicart">
                                                                <li className="d-flex align-items-start">
                                                                    <Link to="/lichsugiohang" > Lịch sử Giỏ Hàng </Link>
                                                                </li>
                                                                <li className="d-flex align-items-start">
                                                                    <Link to="/" className="navbar-logout" onClick={handleLogout}> Đăng xuất </Link>
                                                                </li>

                                                            </ul>
                                                        </li>

                                                    </>
                                                ) : (
                                                    <>
                                                        <Link to="/login" className="navbar-login"> Đăng Nhập </Link>
                                                    </>
                                                )}

                                            </li>
                                            <li className="header-shop-cart d-none d-md-flex">

                                                <Link to="/cart" id="shop-cart--link">
                                                    <div className="icon-cart-parent">
                                                        <span className="cart-count" > {quantity} </span>
                                                        <AiOutlineShoppingCart size={30} />
                                                    </div>
                                                    <span className="cart-price"> </span>
                                                    <ul className="minicart">
                                                        <li className="d-flex align-items-start">
                                                            <div className="cart-img">
                                                                <a href="#"><img src="img/products/cart_p01.jpg" alt="" /></a>
                                                            </div>
                                                            <div className="cart-content">
                                                                <h4><a href="#">Exclusive Winter Jackets</a></h4>
                                                                <div className="cart-price">
                                                                    <span className="new">$229.9</span>
                                                                    <span><del>$229.9</del></span>
                                                                </div>
                                                            </div>
                                                            <div className="del-icon">
                                                                <a href="#"><i className="far fa-trash-alt" /></a>
                                                            </div>
                                                        </li>
                                                        <li className="d-flex align-items-start">
                                                            <div className="cart-img">
                                                                <a href="#"><img src="img/products/cart_p02.jpg" alt="" /></a>
                                                            </div>
                                                            <div className="cart-content">
                                                                <h4><a href="#">Winter Jackets For Women</a></h4>
                                                                <div className="cart-price">
                                                                    <span className="new">$229.9</span>
                                                                    <span><del>$229.9</del></span>
                                                                </div>
                                                            </div>
                                                            <div className="del-icon">
                                                                <a href="#"><i className="far fa-trash-alt" /></a>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="total-price">
                                                                <span className="f-left">Total:</span>
                                                                <span className="f-right">$239.9</span>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="checkout-link">
                                                                <a href="#">Shopping Cart</a>
                                                                <a className="black-color" href="#">Checkout</a>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </Link>

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>

                    <div className="mobile-menu">
                        <nav className="menu-box">
                            <div className="close-btn"><i className="fas fa-times" /></div>
                            <div className="nav-logo"><a href="index-2.html"><img src="img/logo/logo.png" alt="" /></a>
                            </div>
                            <div className="menu-outer">

                            </div>
                            <div className="social-links">
                                <ul className="clearfix">
                                    <li><a href="#"><span className="fab fa-twitter" /></a></li>
                                    <li><a href="#"><span className="fab fa-facebook-square" /></a></li>
                                    <li><a href="#"><span className="fab fa-pinterest-p" /></a></li>
                                    <li><a href="#"><span className="fab fa-instagram" /></a></li>
                                    <li><a href="#"><span className="fab fa-youtube" /></a></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div className="menu-backdrop" />
                    {/* End Mobile Menu */}
                </div>
            </div>
            <div className="header-category d-none d-lg-block">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="header-category-wrap">
                                <div className="header-cat-list">
                                    <ul>
                                        <>
                                            {
                                                CategoryList.map((category) => {
                                                    return (
                                                        <li> <Link className="category--link" to={`/shoppingcategory/${category}`}> {category}  </Link>  </li>
                                                    )
                                                })
                                            }
                                        </>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );

}

export default Header;