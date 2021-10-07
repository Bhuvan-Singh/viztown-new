import React from 'react'
import {Link} from 'gatsby'

import OwnerImg from './OwnerImg'
import FeaturedImg from './FeaturedImg'
import Location from './Location'
import OwnerDetail from './OwnerDetail'
import Title from './Title'
import Configuration from './Configuration'

import * as styles from '../../../../css/listing.module.css'

export default function Listing({property,}) {
    return (
        <li  className="vt-listing rounded-md shadow-md border border-grey bg-white relative cursor-pointer">
            <Link 
            className="" 
            to={`/showcase/${property.slug}`} 
            activeClassName={`${styles.active} active--listing`}
            partiallyActive={true}
            >
                {/* <OwnerImg ownerImg={property.ownerImg}/> */}
                <div className="vt-listing-details p-3 border-b border-grey relative">
                    {property.feature == 1 ? <div className=" text-xs bg-secondary text-white px-2 py-1 absolute z-10 font-semibold top-5 left-5 flex items-center rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>Featured</span></div> : "" }
                    <FeaturedImg featuredImage={property.featuredImage}/>
                    <Title title={property.title}/>
                    <Location location={property.location}/>
                    <OwnerDetail ownerName={property.ownerName} ownerAddress={property.ownerAddress}/>
                </div>
                <div className="py-4 px-3">
                    <Configuration configuration={property.configuration}/>
                </div>
            </Link>
        </li>
    )
}
