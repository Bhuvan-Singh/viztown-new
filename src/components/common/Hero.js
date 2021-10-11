import React from "react";
import BackgroundImage from "gatsby-background-image";

export default function Hero({ heading, imageUrl }) {
  return (
    <BackgroundImage
      Tag="section"
      className="relative"
      fluid={imageUrl.childImageSharp.fluid}
      backgroundColor={`#040e18`}
    >
      {/* <div
        className="relative"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      > */}
      <div className="absolute w-full h-full bg-black opacity-70 top-0 left-0 z-0"></div>
      <div className="container xl:max-w-screen-xl py-48 text-center mx-auto relative z-10">
        <h1 className="text-4xl md:text-4xl 2x:text-5xl text-white font-bold font-playfair">
          {heading}
        </h1>
      </div>
      {/* </div> */}
    </BackgroundImage>
  );
}
