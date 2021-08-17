import React,{useContext} from 'react'
import {Link} from 'gatsby'
import LayoutNoFooter from '../components/LayoutNoFooter'
import layout from '../components/Layout'
import Filters from '../components/showcase/Filters'
import Listings from '../components/showcase/listings/Listings'
import Map from '../components/showcase/map/Map'
import Configuration from '../components/showcase/listings/listing/Configuration' 
// Index Modules
import Navigation from '../components/showcase/index/Navigation'

import * as styles from '../css/property-details.module.css'

import {ListingContext} from '../contexts/ListingContextProvider'

export default function SpaceCalculator({pageContext}) {
    const {listings} = useContext(ListingContext)
    console.log(listings)
    return (
        <LayoutNoFooter>
            <Filters/>
            <div className="vt-showcase mx-auto relative z-10" >
                <div className="grid lg:grid-cols-8 2xl:grid-cols-12">
                    <div className="col-span-2 2xl:col-span-4 border-r border-gray-100">
                        <Listings propertyPage={true}/>
                    </div>
                    <div className="vt-property-detail relative lg:col-span-2 2xl:col-span-3 text-center">
                        <div className="h-48 p-5 text-xs 2xl:text-sm relative">
                            <Link to="/showcase" className="absolute right-2 top-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 font-bold" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                            <Link to={`/${pageContext.slug}/space-calculator`} className="absolute left-0 bg-gray-200 pl-1 pr-2 py-1 top-1 rounded-r-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
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
                            <Map className=""  propId={pageContext.id}/>
                        </div>
                    </div>
                    <div className="lg:col-span-4 2xl:col-span-5 bg-gray-300">
                        <Navigation slug={`/showcase/${pageContext.slug}`} listId={pageContext.id}/>
                    </div>
                </div>
            </div>
        </LayoutNoFooter>
    )
}
