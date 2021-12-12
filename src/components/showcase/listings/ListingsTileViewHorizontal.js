import React, { useEffect } from "react";
import ListingTileViewHorizontal from "./listing/ListingTileViewHorizontal";

export default function ListingsLimitedViewHorizontal({ propertyListings }) {
    return (
        <div className="vt-listings-wrap py-4">
            <div className="grid grid-cols-2 gap-6 2xl:gap-8">
                {propertyListings.map((property) => (
                    <ListingTileViewHorizontal
                        key={property.id}
                        property={property}
                    />
                ))}
            </div>
        </div>
    );
}
