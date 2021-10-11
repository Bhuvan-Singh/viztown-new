import React,{useState,useEffect} from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Hero from "../components/common/Hero";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialSlider from "../components/common/TestimonialSlider";
export default function Partners(props) {
  const data = props.data.allClientData.nodes[0];
  const partnerData = props.data.allPartnerData.nodes[0].data;
  var settings = {
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
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  //Testimonial slider setting
  return (
    <Layout>
      <Hero heading={partnerData.banner.heading} imageUrl={partnerData.banner.imageFile}/>
      <div className="bg-grey pt-24">
        <div className="container xl:max-w-screen-xl mx-auto mb-8">
          <div className="text-center">
            <h1 className="text-4xl text-primary font-bold font-playfair">
              {data.heading}
            </h1>
          </div>
        </div>
        <div className="bg-white py-16 border-t border-b border-secondary">
          <div className="clients--full--slider">
            {typeof window !== "undefined" && (
              <Slider {...settings}>
                {data.clientsList.map((client) => (
                  <div className="item">
                    <img
                      className="lazy h-16 w-full object-contain object-center"
                      src={client.img}
                      alt={client.title}
                      category={client.category}
                    />
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
        <TestimonialSlider/>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query clientData {
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

    allPartnerData {
      nodes {
        data {
          banner {
            heading
            imageFile {
              childImageSharp {
                fluid(quality: 90, maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;
