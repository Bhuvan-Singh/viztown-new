import React,{useContext} from 'react'
import Listing from './listing/Listing';
import {useScrollRestoration} from 'gatsby'
import { ListingContext } from '../../../contexts/ListingContextProvider';

export default function Listings({propertyPage}) {
    const {listings, listingLoading} = useContext(ListingContext)
    const ulScrollRestoration = useScrollRestoration(`page-component-ul-list`)
    const classes = propertyPage ? 'vt-listings grid lg:grid-cols-1 2xl:grid-cols-2 gap-x-6 2xl:gap-x-6 gap-y-6' : 'vt-listings grid lg:grid-cols-2 2xl:grid-cols-3 gap-x-6 2xl:gap-x-6 gap-y-6';
    return (
        <div className={`vt-listings-wrap py-10 px-10 ${listingLoading ? 'loading' : ''}`}>
            <ul className={classes} {...ulScrollRestoration}>
                {listings.map(property => (
                    <Listing key={property.id} property={property}/>
                ))}
            </ul>
        </div>
        
    )
}
