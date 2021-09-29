import React from "react";

export default function CommercialBanner({ data }) {
  return (
    <div
      className="module--header relative flex justify-end overflow-hidden items-center min-h-screen"
      style={{
        backgroundImage: `url(${data.image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <div className="w-150p transform -rotate-3 absolute h-80 bg-grey bottom-0 -mb-52 left-0 -ml-28 z-10 "></div>
      <div className="absolute w-full h-full bg-black opacity-70 top-0 left-0 z-0"></div>
      <div className="container xl:max-w-screen-xl px-4 xl:px-0 pt-32 lg:pt-64 pb-48 text-left mx-auto relative z-40 flex">
        <div className="lg:w-1/2 space-y-8 md:pr-32">
          <h1 className="text-4xl text-white font-bold font-playfair">
            {data.heading}
          </h1>
          <p className="text-white text-lg max-w-2xl lg:mx-auto">
            {data.subheading}
          </p>
        </div>
      </div>
    </div>
  );
}
