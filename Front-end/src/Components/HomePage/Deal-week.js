
function Dealweek() {
    return (
        <section className="deal-week-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="section-title text-center mb-30">
                            <h3 className="title">Deal Of This Week</h3>
                            <p>Want everyone to see it and find myself sharing the link anywhere</p>
                        </div>
                        <div className="deal-week-countdown mb-50">
                            <div className="coming-time" data-countdown="2022/1/29" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-3 col-lg-4 col-sm-6 order-2 order-lg-0">
                        <div className="deal-week-item">
                            <div className="deal-week-inner">
                                <div className="deal-week-thumb">
                                    <img src="" alt="" />
                                </div>
                                <div className="deal-week-content">
                                    <span>medical</span>
                                    <h4 className="title"><a href="shop.html">Temperature <span>UP TO 25%</span></a></h4>
                                    <a href="shop.html" className="btn">shop now</a>
                                </div>
                            </div>
                        </div>
                        <div className="deal-week-item">
                            <div className="deal-week-inner">
                                <div className="deal-week-thumb">
                                    <img src="" alt="" />
                                </div>
                                <div className="deal-week-content">
                                    <span>medical</span>
                                    <h4 className="title"><a href="shop.html">sanitizer Max <span>UP TO 25%</span></a></h4>
                                    <a href="shop.html" className="btn">shop now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-4">
                        <div className="deal-week-item dw-big-item">
                            <div className="deal-week-inner">
                                <div className="deal-week-content">
                                    <span>medical pack</span>
                                    <h4 className="title"><a href="shop.html">Lab Face Mask <span>UP TO 25%</span></a></h4>
                                    <a href="shop.html" className="btn">shop now</a>
                                </div>
                                <div className="deal-week-thumb">
                                    <img src="img/products/deal_week_img03.jpg" className="main-img" alt="" />
                                    <img src="img/products/dw_item_des.png" className="discount-img" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                        <div className="deal-week-item">
                            <div className="deal-week-inner">
                                <div className="deal-week-thumb">
                                    <img src="img/products/deal_week_img04.jpg" alt="" />
                                </div>
                                <div className="deal-week-content">
                                    <span>covid-19</span>
                                    <h4 className="title"><a href="shop.html">co vaccine <span>UP TO 25%</span></a></h4>
                                    <a href="shop.html" className="btn">shop now</a>
                                </div>
                            </div>
                        </div>
                        <div className="deal-week-item">
                            <div className="deal-week-inner">
                                <div className="deal-week-thumb">
                                    <img src="img/products/deal_week_img05.jpg" alt="" />
                                </div>
                                <div className="deal-week-content">
                                    <span>medical pack</span>
                                    <h4 className="title"><a href="shop.html">hand gloves <span>UP TO 25%</span></a></h4>
                                    <a href="shop.html" className="btn">shop now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Dealweek;