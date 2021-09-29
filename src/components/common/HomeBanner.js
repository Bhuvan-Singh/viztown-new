import React from "react";
import {Link} from 'gatsby'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeBanner({ data }) {
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    loop: true,
    fade: true,
    arrows: false,
    dots: true,
  };
  return (
    <div className="relative h-90vh">
      {typeof window !== "undefined" && (
        <>
          <div className="absolute w-full h-full bg-black opacity-50 top-00 left-0 z-10"></div>
          <div className="absolute w-full h-full top-0 left-0">
            <Slider className="home--slider h-full" {...settings}>
              {data.bannerImages.map((image, i) => (
                <div className="slide" key={i}>
                  <img
                    className="lazy h-90vh w-full object-cover"
                    src={image.image}
                    alt=""
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div className="container xl:max-w-screen-xl lg:text-center mx-auto relative z-10 h-90vh">
            <div className="relative transform translate-y-1/3 md:translate-y-1/2 top-24 md:top-1/4 space-y-8 px-4 lg:px-0">
              <h1 className="text-4xl 2xl:text-5xl text-white font-bold font-playfair">{data.heading}</h1>
              <p className="text-white text-lg max-w-2xl lg:mx-auto">
                  {data.subheading}
              </p>
              <div className="flex items-center lg:justify-center space-x-4 w-full">
                <Link
                  to={`/${data.buttons[0].url}`}
                  className="flex h-10 items-center text-xs text-white py-3 px-2 lg:px-6 border uppercase rounded-sm border-white hover:bg-white hover:text-primary font-bold"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 inline font-bold mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {data.buttons[0].text}
                </Link>

                <Link
                  to={`/${data.buttons[1].url}`}
                  className="relative h-10 group flex items-center text-xs text-primary font-bold py-3 px-2 lg:px-6 border rounded-sm border-white uppercase bg-white hover:bg-secondary hover:text-white hover:border-secondary"
                >
                  <span className="flex h-3 w-3 relative mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary group-hover:bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary group-hover:bg-white"></span>
                  </span>
                  {data.buttons[1].text}
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
