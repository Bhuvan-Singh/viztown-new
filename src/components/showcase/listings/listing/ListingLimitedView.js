import React from 'react'
import {Link} from 'gatsby'

import FeaturedImg from './FeaturedImg'
import Location from './Location'
import Title from './Title'

import * as styles from '../../../../css/listing.module.css'

export default function ListingLimitedView({property}) {
    return (
        <Link 
        className="vt-listing rounded-md bg-white relative cursor-pointer flex items-center justify-between" 
        to={`/dashboard/listings/create/${property.id}`} 
        >
            <div className="vt-listing-details flex items-center space-x-4">
                <div className="vt-listing-image ">
                    <img src={property.featuredImage} className="h-10 w-10 rounded-full object-cover" alt=""/>
                </div>
                <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-black">{property.title}</h3>
                    <Location location={property.location}/>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
        </Link>
    )
}
