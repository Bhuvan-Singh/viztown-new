import React, { useEffect } from "react";
import ListingTileView from "./listing/ListingTileView";

export default function ListingsTileView({ propertyListings }) {
    console.log(propertyListings);
    return (
        <div className="py-4">
            <div className="grid grid-cols-3 gap-4 2xl:gap-8">
                {propertyListings.map((property) => (
                    <ListingTileView key={property.id} property={property} />
                ))}
            </div>
        </div>
    );
}
