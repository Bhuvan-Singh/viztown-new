import React,{useContext} from 'react'
import {Link} from 'gatsby'

import LayoutNoFooter from '../components/LayoutNoFooter'
import layout from '../components/Layout'
import Filters from '../components/showcase/Filters'
import Listings from '../components/showcase/listings/Listings'
import Map from '../components/showcase/map/Map'
import Configuration from '../components/showcase/listings/listing/Configuration' 

import * as styles from '../css/property-details.module.css'

import {ListingContext} from '../contexts/ListingContextProvider'
// Index Modules
import Navigation from '../components/showcase/index/Navigation'

export default function SpaceCalculatorFull({pageContext}) {
    const {listings} = useContext(ListingContext)

    return (
        <LayoutNoFooter>
            <Filters/>
            <div className="vt-showcase mx-auto relative z-10" >
                <Link to={`/showcase/${pageContext.slug}/space-calculator`} className="absolute left-0 bg-gray-200 pl-1 pr-2 py-1 top-1 rounded-r-xl z-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </Link>
                <div className="grid lg:grid-cols-8 2xl:grid-cols-12">
                    <div className={`vt-property-detail relative lg:col-span-2 2xl:col-span-3 text-center ${styles.vtPropertyDetail}`}>
                        <Link to="/showcase" className="absolute right-2 top-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 font-bold" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                        <div className="h-48 p-5 text-xs 2xl:text-sm">
                            <div className="flex justify-between items-center mb-3">
                                <img className="w-16 h-16 rounded-full object-cover mx-auto" src={listings[pageContext.id].ownerImg}/>
                                <div className="text-left">
                                    <h3 className="font-semibold text-lg 2xl:text-md">{listings[pageContext.id].ownerName}</h3>
                                    <h3 className="">{listings[pageContext.id].ownerAddress}</h3>
                                </div>
                            </div>
                            
                            <h3 className="font-semibold text-lg 2xl:text-md">{listings[pageContext.id].title}</h3>
                            <h3 className="text-gray-500">{listings[pageContext.id].location}</h3>
                            <div className="py-4">
                                <Configuration configuration={listings[pageContext.id].configuration}/>
                            </div>
                        </div>
                        <div className={`${styles.vtPropertyMap}`}>
                            <Map className="" listings={listings} propId={pageContext.id}/>
                        </div>
                    </div>
                    <div className="lg:col-span-6 2xl:col-span-9 bg-gray-100">
                        <Navigation slug={`/${pageContext.slug}`} listId={pageContext.id}/>
                    </div>
                </div>
            </div>
        </LayoutNoFooter>
    )
}
