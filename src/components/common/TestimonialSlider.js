import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
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
        {" "}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        ></path>
      </svg>{" "}
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
        {" "}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 16l-4-4m0 0l4-4m-4 4h18"
        />
      </svg>{" "}
    </button>
  );
}

export default function TestimonialSlider() {
  const queryData = useStaticQuery(graphql`
    query testimonialQuery {
      allTestimonialData {
        nodes {
          image
          logo
          name
          review
          designation
        }
      }
    }
  `);
  const testimonials = queryData.allTestimonialData.nodes;

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  let slider1 = [];
  let slider2 = [];

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);

  var settingsForImageSlider = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 8000,
    pauseOnHover: true,
    loop: true,
    fade: true,
    asNavFor: nav2,
    arrows: false,
  };
  var settingsForSlider = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 8000,
    pauseOnHover: true,
    loop: true,
    fade: true,
    asNavFor: nav1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    // prevArrow:
    //   '<button className="slick-prev"> <svg xmlns="http://www.w3.org/2000/svg" className="w-10 inline text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg> </button>',
    // nextArrow:
    //   '<button className="slick-next"><svg className="w-10 inline text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg> </button>',
  };

  return (
    <div className="lg:flex mt-24">
      {typeof window !== "undefined" && (
        <>
          <div className="lg:w-5/12 xl:w-1/2">
            <Slider
              className="testimonial--for--image--slider"
              {...settingsForImageSlider}
              ref={(slider) => (slider1 = slider)}
            >
              {testimonials.map((testimonial) => (
                <img
                  className="lazy h-96 object-cover md:h-600 w-full"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
              ))}
            </Slider>
          </div>
          <div className="lg:w-7/12 xl:w-1/2 bg-primary pt-16 pb-24 md:pb-28 lg:pb-24 lg:py-24 px-4 lg:pl-12 lg:pr-32">
            <h1 className="text-3xl  text-white font-bold font-playfair mb-8 xl:mb-12">
              Testimonials
            </h1>
            <Slider
              className="testimonial--for--slider"
              {...settingsForSlider}
              ref={(slider) => (slider2 = slider)}
            >
              {testimonials.map((testimonial) => (
                <div className="item text-white">
                  <div className="flex w-full my-5 relative">
                    <div className="absolute right-0">
                      <i
                        className="fa fa-quote-right text-4xl md:text-5xl  opacity-30"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <div className="md:w-7/12 flex items-center">
                      <img
                        className="lazy h-16 w-16 rounded-full bg-white object-contain object-center p-2"
                        src={testimonial.logo}
                        alt="Client Logo"
                      />
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold">
                          {testimonial.name}
                        </h4>
                        <span className="text-xs font-semibold text-lightGrey">
                          {testimonial.designation}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full space-y-4">
                    <p className="text-sm">{testimonial.review}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </>
      )}
    </div>
  );
}
