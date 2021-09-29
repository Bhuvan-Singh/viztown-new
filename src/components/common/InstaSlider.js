import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function InstaSlider({images}) {
    const settings = {
        slidesToShow: 5,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 0,
		speed: 8000,
		pauseOnHover: false,
		cssEase: "linear",
		loop: true,
		arrows: false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
    }
    return (
        <div class="w-full md:h-72 lg:h-auto">
            {typeof window !== "undefined" && (
            <Slider class="insta--slider" {...settings}>
                {images.map((image,i) => (
                    <div class="item" key="i">
                        <img class="lazy w-full h-56 lg:h-72" src={image.image}/>
                    </div>
                ))}
                
            </Slider>
            )}
        </div>
    )
}