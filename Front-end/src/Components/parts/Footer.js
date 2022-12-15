import React from 'react';
function Footer() {
    return (
        <footer>
            <div className="footer-top-wrap">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6">
                            <div className="footer-widget">
                                <h4 className="fw-title"> Về chúng tôi </h4>
                                <div className="fw-link">
                                    <ul>
                                        <li><a href="about-us.html"> Giới thiệu </a></li>
                                        <li><a href="contact.html"> Hệ thống cửa hàng</a></li>
                                        <li><a href="contact.html">Giấy phép kinh doanh</a></li>
                                        <li><a href="contact.html">Quy chế hoạt động</a></li>
                                        <li><a href="contact.html">Chính sách giao hàng</a></li>
                                        <li><a href="contact.html">Chính sách bảo mật</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                            <div className="footer-widget">
                                <h4 className="fw-title">DANH MỤC</h4>
                                <div className="fw-link">
                                    <ul>
                                        <li><a href="about-us.html">Thực phẩm chức năng</a></li>
                                        <li><a href="contact.html">Dược mỹ phẩm</a></li>
                                        <li><a href="contact.html">Chăm sóc cá nhân</a></li>
                                        <li><a href="contact.html">Thuốc</a></li>
                                        <li><a href="contact.html">Trang thiết bị y tế</a></li>
                                        <li><a href="contact.html">Góc sức khoẻ</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4">
                            <div className="footer-widget">
                                <h4 className="fw-title">THỰC PHẨM CHỨC NĂNG</h4>
                                <div className="fw-link">
                                    <ul>
                                        <li><a href="shop-details.html">Sức khỏe tim mạch</a></li>
                                        <li><a href="contact.html">Hỗ trợ điều trị</a></li>
                                        <li><a href="contact.html">Thần kinh não</a></li>
                                        <li><a href="contact.html">Hỗ trợ tiêu hóa</a></li>
                                        <li><a href="contact.html">Cải thiện tăng cường chức năng</a></li>
                                        <li><a href="contact.html">Hỗ trợ làm đẹp</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                            <div className="footer-widget">
                                <h4 className="fw-title"> Đăng Ký Để Theo Dõi Sức Khỏe</h4>
                                <div className="f-newsletter">
                                    <p> Đăng Ký Miễn Phí Ngay </p>
                                    <form action="#" className="newsletter-form">
                                        <input type="text" placeholder="Nhập Email Của Bạn..." />
                                        <button><i className="fas fa-rocket" /></button>
                                    </form>
                                </div>
                                <div className="fw-download-btn">
                                    <a href="#"><img src="img/icon/download_btn01.png" alt="" /></a>
                                    <a href="#"><img src="img/icon/download_btn02.png" alt="" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="footer-counter-wrap">
                    <div className="row">
                        <div className="col-12">
                            <div className="fcw-title text-center mb-45">
                                <h4 className="title"> Trung Tâm Dược Phẩm Lớn Nhất Việt Nam </h4>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-3 col-md-3 col-sm-4">
                            <div className="counter-item mb-30">
                                <h2 className="count"><span className="odometer" data-count={160} />200K+</h2>
                                <p> Khách Hàng </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4">
                            <div className="counter-item mb-30">
                                <h2 className="count"><span className="odometer" data-count={27} />10M+</h2>
                                <p> Đơn Hàng</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4">
                            <div className="counter-item mb-30">
                                <h2 className="count"><span className="odometer" data-count={190} />10+</h2>
                                <p> Thành Phố</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="copyright-text">
                                <p>Copyright © 2022 NV Store. All Rights Reserved</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="payment-method-img text-center text-md-right">
                                <img src="img/images/card.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;