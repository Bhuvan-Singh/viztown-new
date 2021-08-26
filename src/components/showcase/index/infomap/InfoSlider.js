import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function InfoSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 4000,
        autoplay: true,
        fade: true,
        adaptiveHeight: true
    };
    return (
        <div className="relative w-full" style={{height: 'calc(100vh - 170px)'}}>
            <div className="absolute w-full h-full bg-black opacity-50 top-0 left-0 z-10"></div>
            <div className="absolute h-full w-full top-0 left-0">
                <div className="property--slider h-full overflow-hidden slick-initialized slick-slider">
                { typeof window !== 'undefined' && (
                    <Slider {...settings}>
                        <div>
                            <img className="h-full w-full object-cover" src="http://cyberworx.co.in/viztown_new/upload/gallery/1383277452001_001.jpg" alt="" style={{height: 'calc(100vh - 170px)'}}/>
                        </div>
                        <div>
                            <img className="h-full w-full object-cover" src="http://cyberworx.co.in/viztown_new/upload/gallery/1512039038003.jpg" alt="" style={{height: 'calc(100vh - 170px)'}}/>
                        </div>
                        
                    </Slider>
                )}
                </div>
            </div>
            <div className="lg:text-center mx-auto relative z-10 h-full max-w-lg 2xl:max-w-2xl flex items-center justify-center">
                <div className="relative space-y-8 px-4 lg:px-0">
                    <h1 className="text-4xl xl:text-4xl text-white font-bold font-playfair">3-4 BHK Ready Apartment at Noroda, Ahmedabad</h1>
                    <p className="text-white text-lg lg:text-lg lg:mx-auto">
                    Swati Satkar Premium, ITI Rd, Kuber Nagar, Ahmedabad, Gujarat 382340                                    
                    </p>
                </div>
            </div>
        </div>
        
    )
}
