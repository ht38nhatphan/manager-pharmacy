import { useEffect } from "react";
import '../../assets/css/slick.css';
import '../../assets/css/responsive.css';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';




function HeadSlider() {
    const sliderList = [
        { img: 'https://images.fpt.shop/unsafe/fit-in/1600x400/filters:quality(80):fill(white)/nhathuoclongchau.com/upload/slide/1666680396-zioH-me-va-be.png', description: '1' },
        { img: 'https://images.fpt.shop/unsafe/fit-in/1600x400/filters:quality(80):fill(white)/nhathuoclongchau.com/upload/slide/1665731727-hHR9-tui-chuom-giu.jpg', description: '2' },
        { img: 'https://images.fpt.shop/unsafe/640x250/filters:quality(100):fill(white)/nhathuoclongchau.com/upload/slide/1670988143-xzN5-dac-quyen-mua-hang-1k.jpg', description: '3' }

    ];

    useEffect(() => {
    }, []);

    return (


        <Slider autoplay={1000}>
            {sliderList?.map((slider) =>
                <div className="single-slider slider-bg d-flex align-items-center" key={slider} style={{ backgroundImage: `url('${slider.img}')` }} >
                    <div className="container container-inner">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="slider-content">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </Slider>
    );
}


export default HeadSlider;