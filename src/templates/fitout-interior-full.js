import React,{useContext} from 'react'
import {Link} from 'gatsby'

import LayoutNoFooter from '../components/LayoutNoFooter'
import layout from '../components/Layout'
import Filters from '../components/showcase/Filters'
import Listings from '../components/showcase/listings/Listings'
import Map from '../components/showcase/map/Map'
import Configuration from '../components/showcase/listings/listing/Configuration' 
import OwnerDetails from '../components/showcase/OwnerDetails'
import * as styles from '../css/property-details.module.css'

import {ListingContext} from '../contexts/ListingContextProvider'
// Index Modules
import Navigation from '../components/showcase/index/Navigation'
import FitoutInteriorView from '../components/showcase/index/fitout-interior/FitoutInteriorView' 

export default function FitoutInteriorFull({pageContext}) {
    const {listings} = useContext(ListingContext)

    return (
        <LayoutNoFooter>
            <Filters/>
            <div className="vt-showcase mx-auto relative z-10" >
                <Link to={`/showcase/${pageContext.slug}/fitout-interior`} className="absolute left-0 bg-gray-200 pl-1 pr-2 py-1 top-1 rounded-r-xl z-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </Link>
                <div className="grid lg:grid-cols-8 2xl:grid-cols-12">
                    <OwnerDetails pageContext={pageContext} viewSlug={`/${pageContext.slug}/fitout-interior`}/>
                    <div className="lg:col-span-6 2xl:col-span-9 bg-gray-100 relative">
                        <Navigation slug={`/${pageContext.slug}`} listId={pageContext.id}/>
                        <FitoutInteriorView pageContext={pageContext}/>
                    </div>
                </div>
            </div>
        </LayoutNoFooter>
    )
}
