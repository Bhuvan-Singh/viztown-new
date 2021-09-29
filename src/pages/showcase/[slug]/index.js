import React, { useContext } from "react";
import { Link } from "gatsby";
import LayoutNoFooter from "../../../components/LayoutNoFooter";
import Filters from "../../../components/showcase/Filters";
import Listings from "../../../components/showcase/listings/Listings";
import OwnerDetails from "../../../components/showcase/OwnerDetails";

import * as styles from "../../../css/property-details.module.css";
import { ListingContext } from "../../../contexts/ListingContextProvider";

// Index Modules
import Navigation from "../../../components/showcase/index/Navigation";
import InfoMap from "../../../components/showcase/index/infomap/InfoMap";

export default function PropertyDetails(props) {
  const { listings } = useContext(ListingContext);
  return (
    <LayoutNoFooter slug={props.slug}>
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
            <InfoMap slug={props.slug} />
          </div>
        </div>
      </div>
    </LayoutNoFooter>
  );
}
