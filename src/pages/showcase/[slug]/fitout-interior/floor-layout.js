import React, { useContext } from "react";
import { Link } from "gatsby";
import LayoutNoFooter from "../../../../components/LayoutNoFooter";
import layout from "../../../../components/Layout";
import Filters from "../../../../components/showcase/Filters";
import Listings from "../../../../components/showcase/listings/Listings";
import Map from "../../../../components/showcase/map/Map";
import Configuration from "../../../../components/showcase/listings/listing/Configuration";
// Index Modules
import Navigation from "../../../../components/showcase/index/Navigation";
import FitoutInteriorView from "../../../../components/showcase/index/fitout-interior/FitoutInteriorView";
import OwnerDetails from "../../../../components/showcase/OwnerDetails";

import { ListingContext } from "../../../../contexts/ListingContextProvider";

export default function FloorLayout({ pageContext }) {
  const { listings } = useContext(ListingContext);
  return (
    <>
      <Navigation
        slug={`/showcase/${pageContext.slug}`}
        listId={pageContext.id}
      />
      <FitoutInteriorView pageContext={pageContext} />
    </>
  );
}
