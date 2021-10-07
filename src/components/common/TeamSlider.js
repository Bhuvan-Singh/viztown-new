import React from "react";
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

export default function TeamSlider({ team }) {
  var settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    loop: true,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
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
  };
  return (
    <>
      {typeof window !== "undefined" && (
        <Slider
          className="w-full team--slider mt-12"
          {...settings}
        >
          {team.map((member) => (
            <div className="relative">
              <img
                className="lazy w-full h-80 object-top object-contain"
                src={member.img}
                alt={member.name}
              />
              <div className="bg-secondary w-9/12 mx-auto text-center py-4 -mt-11 z-10 relative">
                <h4 className="font-semibold text-md">{member.name}</h4>
                <p>
                  {member.designation} - <b>{member.location}</b>
                </p>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </>
  );
}
