import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CustomNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button className="slick-next custom slick-arrow" onClick={onClick}>
      <svg
        className="w-6 inline text-lightGrey"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {" "}
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
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
        className="w-6 inline text-lightGrey"
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

export default function ClientSlider() {
  const queryData = useStaticQuery(graphql`
    query clientDataQuery {
      allTestimonialData {
        nodes {
          image
          logo
          name
          review
          designation
        }
      }

      allClientData {
        nodes {
          heading
          image
          clientsList {
            category
            img
            title
          }
        }
      }
    }
  `);

  const clientData = queryData.allClientData.nodes[0];
  const testimonialData = queryData.allTestimonialData.nodes;

  const settingsClient = {
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    loop: true,
    prevArrow: <CustomPrevArrow/>,
    nextArrow: <CustomNextArrow/>,
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
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const settingsTestimonial = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 8000,
    pauseOnHover: true,
    loop: true,
    fade: true,
    prevArrow: <CustomPrevArrow/>,
    nextArrow: <CustomNextArrow/>,
  };

  return (
    <div className="bg-grey py-16 pb-24 lg:py-24 xl:mb-0 px-4 xl:px-0">
      {typeof window !== "undefined" && (
        <>
          <div className="xl:max-w-screen-xl md:flex mx-auto items-center">
            <div className="md:w-1/2">
              <img
                className="lazy md:w-10/12 mx-auto ml-0"
                src={clientData.image}
                alt=""
              />
            </div>
            <div className="md:w-1/2 mt-16 md:mt-0">
              <h2 className="font-bold text-4xl  font-playfair text-primary mb-4 mt-8">
                {clientData.heading}
              </h2>
              <Slider
                className="clients--slider mt-12"
                {...settingsClient}
              >
                {clientData.clientsList.map((client, i) => (
                  <div className="item" key={i}>
                    <img
                      className="lazy h-16 w-full object-contain object-center"
                      src={client.img}
                      alt={client.title}
                    />
                  </div>
                ))}
              </Slider>

              <Slider
                className="mt-20 testimonial--slider"
                {...settingsTestimonial}
              >
                {testimonialData.map((review, i) => (
                  <div className="item" key={i}>
                    <div className="flex w-full my-5 relative">
                      <div className="absolute right-0">
                        <i
                          className="fa fa-quote-right text-lightGrey text-4xl opacity-40"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div className="w-7/12 flex items-center">
                        <img
                          className="lazy h-16 w-16 rounded-full bg-white object-contain object-center p-2"
                          src={review.logo}
                          alt="Client Image"
                        />
                        <div className="ml-4">
                          <h4 className="text-xl font-bold">{review.name}</h4>
                          <div className="text-sm font-semibold text-lightGrey">{review.designation}</div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full space-y-4">
                      <p className="text-lightGrey">{review.review}</p>
                      <div className="">
                        <Link
                          className="text-sm font-bold text-primary hover:text-secondary"
                          to={'/partners'}
                        >
                          View More
                          <svg
                            className="w-5 ml-2 inline"
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
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
