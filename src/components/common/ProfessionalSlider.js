import React, { useState, useEffect } from "react";
import {GatsbyImage, getImage} from 'gatsby-plugin-image'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CustomNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button className="slick-next custom slick-arrow" onClick={onClick}>
      <svg
        className="w-10 inline text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        ></path>
      </svg>
    </button>
  );
}

function CustomPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button className="slick-prev custom slick-arrow" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 inline text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 16l-4-4m0 0l4-4m-4 4h18"
        />
      </svg>
    </button>
  );
}
export default function ProfessionalSlider({ data }) {
  
  const breakpoint = 768;
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    centerMode: true,
    variableWidth: true,
    infinite: true,
    autoplay: true,
    focusOnSelect: true,
    cssEase: "linear",
    touchMove: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const settingsMobile = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    infinite: true,
    autoplay: true,
    focusOnSelect: true,
    touchMove: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  return (
    <section className="bg-primary">
      <div className="container xl:max-w-full mx-auto py-16 md:py-24">
        <div className="xl:max-w-screen-xl mx-auto space-y-3 text-center mb-16">
          <h1 className="text-4xl text-white font-bold font-playfair">
            {data.heading}
          </h1>
          <p className="text-white text-md max-w-2xl mx-auto">
            {data.description}
          </p>
        </div>
            { typeof window !== 'undefined' && window.innerWidth > 768 &&(
              <Slider
              className="professional--slider mt-12 hidden lg:block"
              {...settings}
            >
              {data.images.map((image, i) => (
                <div className="item " key={i}>
                  {/* <img
                    className="lazy w-full h-550 md:h-550 object-cover"
                    src={image.images}
                  /> */}
                  <GatsbyImage className="w-full h-550 md:h-550 object-cover" image={getImage(image.imageFile)}/>
                </div>
              ))}
            </Slider>
            )}
            { typeof window !== 'undefined' && window.innerWidth <= 768 &&(
              <Slider
              className="mt-12 block lg:hidden"
              {...settingsMobile}
            >
              {data.images.map((image, i) => (
                <div className="item " key={i}>
                  {/* <img
                    className="lazy w-full h-550 md:h-550 object-cover"
                    src={image.images}
                  /> */}
                  <GatsbyImage className="w-full h-550 md:h-550 object-cover" image={getImage(image.imageFile)}/>
                </div>
              ))}
            </Slider>
            )}
            
            
        
      </div>
    </section>
  );
}
