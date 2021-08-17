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
        to={`/showcase/${property.slug}`} 
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
        </Link>
    )
}
