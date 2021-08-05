import React from 'react'
import {Link} from 'gatsby'

import OwnerImg from './OwnerImg'
import FeaturedImg from './FeaturedImg'
import Location from './Location'
import OwnerDetail from './OwnerDetail'
import Title from './Title'
import Configuration from './Configuration'

export default function Listing({property}) {
    return (
        <Link className="vt-listing rounded-md shadow-md border border-grey bg-white relative cursor-pointer" to={`/showcase/${property.slug}`}>
            <OwnerImg ownerImg={property.ownerImg}/>
            <div className="vt-listing-details p-3 border-b border-grey">
                <FeaturedImg featuredImage={property.featuredImage}/>
                <Title title={property.title}/>
                <Location location={property.location}/>
                <OwnerDetail ownerName={property.ownerName} ownerAddress={property.ownerAddress}/>
            </div>
            <Configuration configuration={property.configuration}/>
        </Link>
    )
}
