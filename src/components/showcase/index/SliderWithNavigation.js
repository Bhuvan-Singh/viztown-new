import React,{useState, useRef, useEffect} from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import * as styles from '../../../css/index/slider-with-navigation.module.css'

const CustomNextArrow = (props) => {
    return (
        <button className="slick-next">
            <svg className="w-10 inline text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">      
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg> 
        </button>
    );
}

const CustomPrevArrow = (props) => {
    return (
        <button className="slick-prev"> 
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 inline text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg> 
        </button>
    );
}

export default function SliderWithNavigation({images, iframe, fullView = false}) {
    // const imagesCount = images.length;
    const infinite = images.length < 5 ? false : true
    const asNavForSettingsSlidesToShow = fullView ? 6 : 5
    const forSliderImageWidthClass = fullView ? "lg:w-1/2 2xl:w-7/12" : "lg:w-9/12 2xl:w-11/12" 
    const [nav1, setNav1] = useState(null)
    const [nav2, setNav2] = useState(null)

    let slider1 = []
    let slider2 = []

    React.useEffect(() => {
        setNav1(slider1)
        setNav2(slider2)
    }, [slider1, slider2])

    var settings = {
        dots: false,
        infinite: infinite,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        asNavFor: nav2,
        arrows: true,
        // prevArrow: <CustomPrevArrow/>,
		// nextArrow: <CustomNextArrow/>
    };
    var asNavForSettings = {
        slidesToShow: asNavForSettingsSlidesToShow,
        slidesToScroll: 1,
        infinite: infinite,
        arrows: false,
        dots: false,
        centerMode: false,
        focusOnSelect: true,
        asNavFor: nav1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        
        <div className="flex-grow h-full flex flex-col justify-center items-center w-full relative">
            { typeof window !== 'undefined' && (
            <>
            <Slider className="for-slider w-full h-full top-0 absolute left-0 flex items-center" {...settings} ref={slider => (slider1 = slider)} >
                {images.map((image,index) => (
                    <div className="item h-full flex items-center" key={index}>
                        {iframe ? <iframe className="w-full h-full" allowFullScreen={true} height="100%" width="100%" src={image.matterportUrl}></iframe> : 
                        <div className={`${forSliderImageWidthClass} mx-auto my-auto flex justify-center`}>
                            <img className="object-contain cursor-pointer h-full " src={image.url}/>
                        </div>
                        }
                    </div>
                ))}
            </Slider>

            <Slider className="w-full absolute pt-2 bottom-1 nav-slider" {...asNavForSettings} ref={slider => (slider2 = slider)}>
                {images.map((image,index) => (
                <div className={`item relative flex justify-center ${styles.slideItem} px-1`} key={index}>
                    <img className="w-full h-16 md:h-24 cursor-pointer" src={image.url} alt={image.title}/>
                    <span className="absolute bottom-1 bg-secondary  bg-opacity-100 text-xs font-semibold px-3 py-1 rounded-full text-center">{image.title}</span>
                </div>
                ))}
            </Slider>
            
            </>)
            }
        </div>
        
    )
}
