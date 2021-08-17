import React,{useEffect} from 'react'
import ListingLimitedView from './listing/ListingLimitedView';

export default function ListingsLimitedView({propertyListings}) {
    return (
        <div className="vt-listings-wrap py-4">
            <div className="grid grid-cols-1 gap-6 2xl:gap-8">
                {propertyListings.map(property => (
                    <ListingLimitedView key={property.id} property={property}/>
                ))}
            </div>
        </div>
    )
}