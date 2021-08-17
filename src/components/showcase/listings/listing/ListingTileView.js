import React from 'react'
import {Link} from 'gatsby'

import OwnerImg from './OwnerImg'
import FeaturedImg from './FeaturedImg'
import Location from './Location'
import OwnerDetail from './OwnerDetail'
import Title from './Title'
import Configuration from './Configuration'

import * as styles from '../../../../css/listing.module.css'

export default function ListingTileView({property}) {
    return (
        <Link 
        className="vt-listing rounded-md border border-gray-200 bg-white relative cursor-pointer flex items-center rounded-xl" 
        to={`/showcase/${property.slug}`} 
        activeClassName={styles.active}
        target="_blank"
        >
            <div className="rounded-xl w-36 2xl:w-60 overflow-hidden">
                <FeaturedImg featuredImage={property.featuredImage} height="40"/></div>
            <div className="vt-listing-details px-6 2xl:px-10 flex-grow">
                <Title title={property.title}/>
                <Location location={property.location}/>
                <div className="py-3">
                    <Configuration configuration={property.configuration}/>
                </div>
                <h5 className="text-lg font-semibold text-blue-500 mt-3">{property.viewsThisWeek} <span className="text-xs font-regular text-lightGrey">Views this week</span></h5>
            </div>
            
        </Link>
    )
}
