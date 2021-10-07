import React from "react";

export default function VirtualTour({data}) {
  return (
    <div className="w-full relative px-4 md:px-0 bg-grey pb-16 md:pb-0" id="3dtour">
      <div className="bg-grey absolute md:h-700 w-full top-0 left-0"></div>
      <div className="xl:max-w-screen-xl items-center mx-auto space-y-12 pt-16 md:pt-24 relative z-10">
        <h2 className="w-full text-4xl text-primary font-bold font-playfair text-center">
          <span className="text-secondary">3D</span> Virtual Tour
        </h2>
        <p className="text-primary text-md max-w-2xl mx-auto">
          {data.description}
        </p>
        <div className="video_tour_box lg:w-10/12 mx-auto">
          <video controls={true} loop="" autoplay={true} muted="" playsinline="">
            <source
              src={data.url}
              type="video/mp4"
            />
            Your browser does not support HTML video.
          </video>
        </div>
      </div>
    </div>
  );
}
