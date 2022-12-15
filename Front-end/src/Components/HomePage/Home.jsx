
import React from 'react';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/animate.min.css';
import '../../assets/css/magnific-popup.css';
import '../../assets/css/fontawesome-all.min.css';
// import '../../assets/css/owl.carousel.min.css';
import '../../assets/css/nice-select.css';
import '../../assets/css/jquery-ui.css';
import '../../assets/css/odometer.css';
import '../../assets/css/aos.css';
import '../../assets/css/default.css';
import '../../assets/css/style.css';
import '../../assets/css/responsive.css';

import Slider from './Slider';
import Discount from './Discount';
import Shop from './Shop';
import { useLocation } from "react-router-dom"

function Home() {
    return ( 
        <div>
            {/* Preloader-end */}
            {/* Scroll-top */}
            <button className="scroll-top scroll-to-target" data-target="html">
                <i className="fas fa-angle-up" />
            </button>
            {/* Scroll-top-end*/}
            <main>
                {/* slider-area */}
                <Slider />
                {/* slider-area-end*/}
                {/* Features-area */}
                <Shop  />
                {/* shop-area-end */}
                {/* testimonial-area */}

                {/* categories-area-end */}
                {/* discount-area */}
                <Discount />
                {/* discount-area-end */}
                {/* deal-week-area */}

            </main>
        </div>
    );
}

export default Home;