import React from 'react'
import Listing from './listing/Listing';

export default function Listings({propertyListings, propertyPage}) {
    const classes = propertyPage ? 'vt-listings grid lg:grid-cols-1 2xl:grid-cols-2 gap-x-4 gap-y-16' : 'vt-listings grid lg:grid-cols-2 2xl:grid-cols-3 gap-x-4 gap-y-16';
    return (
        <div className="vt-listings-wrap py-20 px-10">
            <div className={classes}>
                {propertyListings.map(property => (
                    <Listing key={property.id} property={property}/>
                ))}
            </div>
        </div>
        
    )
}
