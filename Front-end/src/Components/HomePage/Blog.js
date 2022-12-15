// import img1 from './assets/img/blog/blog_post_thumb01.jpg';
import '../../assets/css/responsive.css';

function Blog() {
    return (
        <section className="blog-area pt-85 pb-60">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-8">
                        <div className="section-title text-center mb-45">
                            <h3 className="title">Latest News &amp; Blog</h3>
                            <p>Want everyone to see it and find myself sharing</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6 col-sm-9">
                        <div className="blog-post-item mb-30">
                            <div className="blog-post-thumb">
                                <a href="blog-details.html"><img src='' alt="" /></a>
                            </div>
                            <div className="blog-post-content">
                                <h4 className="title"><a href="blog-details.html">Consectetur adipiscing Nullfrea felis commo facilisis.</a></h4>
                                <p>Fusce quis neque id lectus tempor sodales a nunc. vulputate lorem egestas Sed.</p>
                                <div className="blog-post-meta">
                                    <ul>
                                        <li><i className="far fa-sticky-note" /> In <a href="blog.html">News</a></li>
                                        <li><i className="far fa-calendar" /> Mar 10 2021</li>
                                        <li className="read-more"><a href="blog-details.html">Read more</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-9">
                        <div className="blog-post-item mb-30">
                            <div className="blog-post-thumb">
                                <a href="blog-details.html"><img src="./assets/img/blog/blog_post_thumb02.jpg" alt="" /></a>
                            </div>
                            <div className="blog-post-content">
                                <h4 className="title"><a href="blog-details.html">Baby's congestion is with saline spray or nose drops</a></h4>
                                <p>Fusce quis neque id lectus tempor sodales a nunc. vulputate lorem egestas Sed.</p>
                                <div className="blog-post-meta">
                                    <ul>
                                        <li><i className="far fa-sticky-note" /> In <a href="blog.html">News</a></li>
                                        <li><i className="far fa-calendar" /> Mar 14 2021</li>
                                        <li className="read-more"><a href="blog-details.html">Read more</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-9">
                        <div className="blog-post-item mb-30">
                            <div className="blog-post-thumb">
                                <a href="blog-details.html"><img src="./assets/img/blog/blog_post_thumb03.jpg" alt="" /></a>
                            </div>
                            <div className="blog-post-content">
                                <h4 className="title"><a href="blog-details.html">Two drops in each nostril loosen the mucus inside</a></h4>
                                <p>Fusce quis neque id lectus tempor sodales a nunc. vulputate lorem egestas Sed.</p>
                                <div className="blog-post-meta">
                                    <ul>
                                        <li><i className="far fa-sticky-note" /> In <a href="blog.html">News</a></li>
                                        <li><i className="far fa-calendar" /> Mar 19 2021</li>
                                        <li className="read-more"><a href="blog-details.html">Read more</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Blog;