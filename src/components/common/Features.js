import React from "react";
import { Markup } from "interweave";

export default function Features({firstSection, secondSection, thirdSection, fourthSection}) {
  return (
    <>
      <div className="bg-grey py-16 space-y-4">
        <div className="w-full py-16 lg:py-0 xl:py-8 relative">
          <div className="lg:w-1/2 lg:absolute z-10">
            <img
              className="lazy xl:-mb-24 lg:mt-8  z-20 left-0 lg:object-top xl:h-4/6 object-contain"
              alt=""
              src={firstSection.url}
            />
          </div>

          <div className="xl:max-w-screen-xl pt-8 xl:pt-16 mx-auto space-y-2 space-x-10 px-4 xl:px-0">
            <div className="ml-auto lg:w-1/2 lg:pb-28 lg:pl-12">
              <h2 className="text-3xl text-primary font-bold font-playfair">
                {firstSection.heading}
              </h2>
              <Markup className="text-primary text-md max-w-2xl mt-6 block" content={firstSection.description}/>
              
            </div>
          </div>
        </div>
        <div className="w-full py-16 xl:py-24 relative bg-white px-4 xl:px-0">
          <div className="xl:max-w-screen-xl pt-0 mx-auto space-y-2 space-x-10 flex items-center ">
            <div className="lg:w-5/12 xl:w-1/2 lg:py-12 xl:py-24 lg:pr-16 relative z-20">
              <h2 className="text-3xl text-primary font-bold font-playfair">
              {secondSection.heading}
              </h2>
              <Markup className="text-primary text-md max-w-2xl mt-6 text-primary block" content={secondSection.description}/>
            </div>
          </div>
          <div className="w-full lg:absolute right-0 mt-10 xl:mt-0 lg:top-28">
            <div className="lg:w-8/12 xl:w-1/2 xl:max-w-screen-lg  lg:pl-16 ml-auto mr-2 relative z-20">
              <div className="device--tab--dark border-4 border-gray-300">
                <video
                  className="lazy w-full outline-none xl:h-420"
                  controls={true}
                  autoplay={true}
                  muted=""
                  loop=""
                  id="design--video"
                >
                  <source
                    src={secondSection.url}
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full py-16 lg:py-8 relative">
          <div className="lg:w-1/2 lg:absolute z-10">
            <img
              className="lazy lg:-mb-24 z-20 left-0 lg:object-right object-contain xl:h-4/6"
              alt=""
              src={thirdSection.url}
            />
          </div>

          <div className="xl:max-w-screen-xl pt-8 xl:pt-16 mx-auto space-y-2 space-x-10 px-4 xl:px-0">
            <div className="ml-auto lg:w-1/2 xl:py-28 lg:pl-12">
              <h2 className="text-3xl text-primary font-bold font-playfair">
              {thirdSection.heading}
              </h2>
              <Markup className="text-primary text-md max-w-2xl mt-6 block" content={thirdSection.description}/>
              
            </div>
          </div>
        </div>
      </div>


      <div className="w-full relative px-4 py-16 xl:px-0 lg:py-24 bg-white">
        <div className="xl:max-w-screen-xl mx-auto space-x-10">
          <div className="lg:w-5/12 xl:w-1/2 lg:pt-4 xl:pt-28 xl:pb-24 lg:pr-16">
            <h2 className="text-3xl lg:text-4xl  text-primary font-bold font-playfair">
            {fourthSection.heading}
            </h2>
            <div className="mt-4 mb-4 text-primary text-md max-w-2xl mt-6 mb-8 text-primary">
              <Markup content={fourthSection.description}/>
            </div>
          </div>
        </div>
        <div className="w-full lg:absolute z-10 right-0 mt-12 lg:mt-0 lg:top-24">
          <div className="lg:w-8/12 xl:w-1/2 xl:max-w-screen-lg  lg:pl-16 ml-auto mr-2 ">
            <div className="device--tab lg:border-2 border-gray-300">
              <video
                className="lazy w-full outline-none bg-black object-contain xl:h-420"
                controls={true}
                autoplay={true}
                muted=""
                loop=""
                id="design--video"
              >
                <source
                  src={fourthSection.url}
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
