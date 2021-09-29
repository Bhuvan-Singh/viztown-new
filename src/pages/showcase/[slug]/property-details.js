import React,{useContext} from 'react'
import {Link} from 'gatsby'
import LayoutNoFooter from '../../../components/LayoutNoFooter'
import Filters from '../../../components/showcase/Filters'
import Listings from '../../../components/showcase/listings/Listings'
import OwnerDetails from '../../../components/showcase/OwnerDetails'

import * as styles from '../../../css/property-details.module.css'
import {ListingContext} from '../../../contexts/ListingContextProvider'

// Index Modules
import Navigation from '../../../components/showcase/index/Navigation'
import InfoMap from '../../../components/showcase/index/infomap/InfoMap'

export default function PropertyDetails({pageContext}) {
    const {listings} = useContext(ListingContext)
    return (
        <LayoutNoFooter pageContext={pageContext}>
            <div className="vt-showcase mx-auto relative z-10" >
                <div className="grid lg:grid-cols-8 2xl:grid-cols-12">
                    <div className="col-span-2 2xl:col-span-4 border-r border-gray-100">
                        <Listings propertyPage={true}/>
                    </div>
                    <OwnerDetails pageContext={pageContext} viewSlug={`/${pageContext.slug}`}/>
                    <div className="lg:col-span-4 2xl:col-span-5 bg-gray-100 relative">
                        <Navigation slug={`/showcase/${pageContext.slug}`} listId={pageContext.id}/>
                        <InfoMap pageContext={pageContext}/>
                    </div>
                </div>
            </div>
        </LayoutNoFooter>
    )
}
