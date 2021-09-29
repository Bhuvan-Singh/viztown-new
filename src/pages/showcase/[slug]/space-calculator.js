import React, { useContext } from "react";
import LayoutNoFooter from "../../../components/LayoutNoFooter";
import Listings from "../../../components/showcase/listings/Listings";
import OwnerDetails from "../../../components/showcase/OwnerDetails";
// Index Modules
import Navigation from "../../../components/showcase/index/Navigation";
import { ListingContext } from "../../../contexts/ListingContextProvider";
import Calculator from "../../../components/space-calculator/Calculator/Calculator";

export default function SpaceCalculator(props) {
  const { listings } = useContext(ListingContext);
  return (
    <LayoutNoFooter>
      {/* <Filters/> */}
      <div className="vt-showcase mx-auto relative z-10">
        <div className="grid lg:grid-cols-9 xl:grid-cols-8 2xl:grid-cols-12">
          <div className="hidden xl:block col-span-2 2xl:col-span-4 border-r border-gray-100">
            <Listings propertyPage={true} />
          </div>
          <div className="lg:col-span-3 xl:col-span-2 2xl:col-span-3 hidden lg:block">
            <OwnerDetails slug={props.slug} />
          </div>
          <div className="lg:col-span-6 xl:col-span-4 2xl:col-span-5 bg-gray-100 relative">
            <Navigation slug={`/showcase/${props.slug}`} />
            <Calculator />
          </div>
        </div>
      </div>
    </LayoutNoFooter>
  );
}
