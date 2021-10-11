import React from "react";
import {GatsbyImage, getImage} from 'gatsby-plugin-image'
import TwentyTwenty from "react-twentytwenty";

export default function Floorplan({data}) {
  return (
    <div className="w-full relative">
      <div className="xl:max-w-screen-xl lg:flex items-center mx-auto lg:space-y-2 lg:space-x-10 py-16 xl:py-24 px-4 xl:px-0">
        <div className="lg:w-1/2 lg:pr-16">
          <h2 className="text-4xl text-primary font-bold font-playfair">
            {data.heading}
          </h2>
          <h4 className="capitalize text-md mt-6 font-semibold text-primary lg:max-w-md">
            {data.description}
          </h4>
          <div className="lg:w-3/5 mt-6 mb-4 border-t-2 border-secondary opacity-30"></div>
        </div>
        <div className="lg:w-1/2 z-20 lg:space-x-8 mt-8 lg:mt-0">
          <TwentyTwenty
            left={
              <GatsbyImage image={getImage(data.originalImageFile)} />
            }
            right={
              <GatsbyImage image={getImage(data.modifiedImageFile)} />
            }
            slider={<div className="twentytwenty-handle" ><span className="twentytwenty-left-arrow"></span><span className="twentytwenty-right-arrow"></span></div>}
          />
        </div>
      </div>
    </div>
  );
}
