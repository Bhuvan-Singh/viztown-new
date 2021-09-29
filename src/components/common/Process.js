import React from "react";

export default function Process({ data }) {
  return (
    <div class="w-full relative bg-grey pb-16 lg:pb-0 md:mb-16 xl:mb-56">
      <div class="absolute w-150p h-full bg-grey left-20 hidden xl:block">
        <div class="w-150p transform rotate-3 absolute h-80 bg-grey bottom-0 -mb-28 left-0 -ml-28 hidden lg:block"></div>
      </div>
      <div class="xl:max-w-screen-xl items-center mx-auto px-4 xl:px-0 pt-16 xl:pt-24 relative z-10">
        <div class="flex flex-col-reverse lg:flex lg:flex-row items-center ">
          <div class="lg:w-3/12 lg:pr-8">
            <img
              class="lazy md:object-center lg:object-left w-full xl:-mb-28 md:h-96 object-contain lg:h-auto"
              alt=""
              src={data.image}
            />
          </div>
          <div class="lg:w-9/12 lg:pl-24 pb-16 lg:pb-0 xl:pt-16 relative">
            <h2 class="w-full text-4xl text-primary font-bold font-playfair text-lwft mb-8">
              {data.heading}
            </h2>

            <div class="flex relative z-10 mt-12">
              <div class="bg-white w-6 h-6 rounded-full p-1 shadow-md">
                <span class="block bg-secondary w-4 h-4 rounded-full z-10"></span>
              </div>
              <h4 class="text-primary text-md uppercase font-semibold ml-2">
                {data.subheading}
              </h4>
            </div>

            <div class="lg:flex bg-processbg p-2 mt-8 space-y-4 lg:space-y-0 lg:space-x-3 z-10 relative">
              {data.processList.map((process,i) => (
                <div class="lg:w-1/4 space-y-2 relative" key={i}>
                  <div class="bg-secondary text-center px-2 py-4">
                    <h4 class="font-semibold text-sm uppercase text-primary">
                      {process.process}
                    </h4>
                  </div>
                  <span class="arrow-right"></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
