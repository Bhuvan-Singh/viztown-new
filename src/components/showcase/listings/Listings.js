import React,{useContext, useEffect} from 'react'
import Listing from './listing/Listing';
import {useScrollRestoration} from 'gatsby'
import { ListingContext } from '../../../contexts/ListingContextProvider';

export default function Listings({propertyPage}) {
    useEffect(() =>{
        if(document.querySelector('.active--listing') !== null)
            console.log()
            setTimeout(() =>{document.querySelector('.active--listing').scrollIntoView()},1000)
    },[])

    const {listings, listingLoading} = useContext(ListingContext)
    const ulScrollRestoration = useScrollRestoration(`page-component-ul-list`)
    const classes = propertyPage ? 'vt-listings grid lg:grid-cols-1 2xl:grid-cols-2 gap-x-6 2xl:gap-x-6 gap-y-6' : 'vt-listings grid md:grid-cols-2 2xl:grid-cols-3 gap-x-6 2xl:gap-x-6 gap-y-6';
    return (
        <div className={`vt-listings-wrap py-8 lg:py-10 px-4 lg:px-10 ${listingLoading ? 'loading' : ''}`}>
            <ul className={classes} {...ulScrollRestoration}>
                {listings.map((property,i) => (
                    <Listing key={i} property={property}/>
                ))}
            </ul>
        </div>
    )
}
