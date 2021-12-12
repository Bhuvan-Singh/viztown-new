import React, { useEffect, useState, useContext } from "react";
import axiosConfig from "../../../../axiosConfig";
import { Markup } from "interweave";
import InfoSlider from "./InfoSlider";
import IndexLayout from "../IndexLayout";
import Loader from "../../../Loader";
import Error from "../../../Error";
import { CommonContext } from "../../../../contexts/CommonContextProvider";

export default function InfoMap({ slug }) {
  const [infoMapData, setInfoMapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setFitoutMenuStatus, setActiveSlug } = useContext(CommonContext);
  const numDifferentiation = (value) => {
    var val = Math.abs(value);
    if (val >= 10000000) {
      value = (value / 10000000).toFixed(2) + " Cr";
    } else if (val >= 100000) {
      value = (value / 100000).toFixed(2) + " Lac";
    }
    else if(val >= 1000) value = parseFloat(value).toLocaleString('en');
    
    return value;
  };

  useEffect(() => {
    setActiveSlug(slug);
    setLoading(true);

    axiosConfig
      .get("/propertyFitoutMenuStatus", {
        params: {
          slug: slug,
        },
      })
      .then(function (response) {
        setFitoutMenuStatus(response.data.data);
      })
      .catch(function (error) {
        setFitoutMenuStatus(null);
      });

    axiosConfig
      .get("/propertyInfoAndMap", {
        params: {
          slug: slug,
        },
      })
      .then(function (response) {
        setLoading(false);
        response.data.error
          ? setInfoMapData(null)
          : setInfoMapData(response.data.data);
      })
      .catch(function (error) {
        setLoading(false);
        setInfoMapData(null);
      });
  }, [slug]);
  return loading ? (
    <Loader />
  ) : infoMapData !== null ? (
    <IndexLayout>
      <InfoSlider
        propertyName={infoMapData.propertyName}
        propertyLocation={infoMapData.propertyLocation}
        bannerImages={infoMapData.bannerImages}
      />
      <div className="px-4 lg:px-8 bg-white pb-8">
        <div className="2xl:max-w-screen-xl mx-auto grid grid-cols-1 gap-4 pt-8 pb-8 px-4 xl:px-0 text-xs">
          <div className="">
            {/* <div className="py-3 border-b border-gray-200 border-opacity-80">
                            <h6>Property ID : <strong>{infoMapData.propertyId}</strong></h6>
                        </div> */}
            <div className="py-8">
              <h2 className="capitalize text-2xl text-primary mb-3 font-bold vt-serif-font">
                description
              </h2>
              <div className="text-light text-primary 2xl:text-sm">
                <Markup
                  id="info-map"
                  className="grid gap-4 info-map-description"
                  content={infoMapData.propertyDescription}
                />
                {/* {infoMapData.propertyDescription} */}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 border-opacity-80 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
              <div className="flex items-center gap-4 text-primary">
                <div>
                  <img
                    className="w-8 h-8"
                    src={`${process.env.GATSBY_BASE_URL}assets/images/calendar.svg`}
                    alt=""
                  />
                </div>
                <div>
                  <h6>Year of Build</h6>
                  <h5 className="font-bold">
                    {infoMapData.buildDetails.buildYear}
                  </h5>
                </div>
              </div>
              <div className="flex items-center gap-4 text-primary ">
                <div>
                  <img
                    className="w-8 h-8"
                    src={`${process.env.GATSBY_BASE_URL}assets/images/area.svg`}
                    alt=""
                  />
                </div>
                <div>
                  <h6>Build Up Area</h6>
                  <h5 className="font-bold">
                    {infoMapData.buildDetails.buildUpArea} Sq.Ft.
                  </h5>
                </div>
              </div>
              <div className="flex items-center gap-4 text-primary">
                <div>
                  <img
                    className="w-8 h-8"
                    src={`${process.env.GATSBY_BASE_URL}assets/images/selection.svg`}
                    alt=""
                  />
                </div>
                <div>
                  <h6>Carpet Area</h6>
                  <h5 className="font-bold">
                    {infoMapData.buildDetails.carpetArea} Sq.Ft.
                  </h5>
                </div>
              </div>
              <div className="flex items-center gap-4 text-primary ">
                <div>
                  <img
                    className="w-8 h-8"
                    src={`${process.env.GATSBY_BASE_URL}assets/images/building.svg`}
                    alt=""
                  />
                </div>
                <div>
                  <h6>Property Type</h6>
                  <h5 className="font-bold">
                    {infoMapData.buildDetails.propertyType}
                  </h5>
                </div>
              </div>
              <div className="flex items-center gap-4 text-primary ">
                <div>
                  <img
                    className="w-8 h-8"
                    src={`${process.env.GATSBY_BASE_URL}assets/images/story.svg`}
                    alt=""
                  />
                </div>
                <div>
                  <h6>Booking Type</h6>
                  <h5 className="font-bold">
                    {infoMapData.buildDetails.bookingType}
                  </h5>
                </div>
              </div>
              <div className="flex items-center gap-4 text-primary bg-secondary py-3 px-4">
                <div>
                  <h6>For Sale</h6>
                  <h5 className="font-bold text-xs">
                    ₹ {numDifferentiation(infoMapData.buildDetails.price.min_price)} to ₹{" "}
                    {numDifferentiation(infoMapData.buildDetails.price.max_price)}
                  </h5>
                  <h5 className="font-bold text-xs mt-2">
                    ({infoMapData.sqft_price})
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="2xl:max-w-screen-xl mx-auto py-0 px-4 xl:px-0 border-t border-gray-200 border-opacity-80 pt-8">
          <h2 className="capitalize text-2xl text-primary mb-3 font-bold vt-serif-font">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5 py-4">
            {infoMapData.fetaures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-primary">
                <div className="bg-primary p-2 ">
                  <img className="w-6 h-6" src={feature.icon} alt="" />
                </div>
                <div>
                  <h6 className="text-xs font-semibold">{feature.title}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </IndexLayout>
  ) : (
    <Error />
  );
}
