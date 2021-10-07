import React from "react";

export default function WhyPartner({ data }) {
  return (
    <div className="bg-primary px-4 py-16 xl:px-0 lg:py-0">
      <div className="container xl:max-w-screen-xl lg:py-16 text-center mx-auto">
        <div className="space-y-8">
          <h2 className="text-3xl lg:text-4xl  text-white font-bold font-playfair">
            {data.heading}
          </h2>
        </div>
        <div className="lg:-mb-36 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 yellow_anchor">
            {data.allListing.map((listing, i) => (
              <div
                className="bg-white  shadow-xl py-12 px-5 lg:px-4 xl:px-5 text-left text-primary relative rounded-sm"
                key={i}
              >
                <div className="space-y-4 relative z-10">
                  <h3 className="text text-sm xl:text-lg capitalize font-semibold">
                    {i + 1}. {listing.title}
                  </h3>
                  <p className="text text-sm text-left lg:h-36">
                    {listing.description}
                  </p>
                  <div className="border-t-4 border-grey border-opacity-70 pt-3">
                    <a
                      className="text-sm font-bold text-primary hover:text-secondary"
                      href={listing.link}
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
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
