import React, {useContext, useState} from 'react'
import {Link} from 'gatsby'
import Configuration from './listings/listing/Configuration' 
import Map from '../showcase/map/Map'
import {ListingContext} from '../../contexts/ListingContextProvider'
import { CommonContext } from '../../contexts/CommonContextProvider'
import * as styles from '../../css/property-details.module.css'

export default function OwnerDetails({pageContext, viewSlug}) {
    const {listings} = useContext(ListingContext)
    const {setIsResidential} = useContext(CommonContext)
    // const [activeIndex, setActiveIndex] = useState(0)
    let activeIndex = 0;
    listings.map((listing,index) => {
        if(listing.id == pageContext.id){
            activeIndex = index
        }
        
    })
    if(listings.length > 0){
        if(listings[activeIndex].type == 4){
            setIsResidential(true)
        }else{
            setIsResidential(false)
        }
    }
    

    return (
        <div className={`vt-property-detail relative lg:col-span-2 2xl:col-span-3 text-center ${styles.vtPropertyDetail}`}>
            <div className="h-48 p-5 text-xs 2xl:text-sm relative">
                <Link to="/showcase" className="absolute right-2 top-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 font-bold" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </Link>
                <Link to={viewSlug} className="absolute left-0 bg-gray-200 pl-1 pr-2 py-1 top-1 rounded-r-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                </Link>
                <div className="flex justify-between items-center mb-3">
                    <img className="w-16 h-16 rounded-full object-contain mx-auto" src={listings[activeIndex].ownerImg}/>
                    <div className="text-left">
                        <h3 className="font-bold text-lg 2xl:text-md vt-serif-font">{listings[activeIndex].ownerName}</h3>
                        <h3 className="">{listings[activeIndex].ownerAddress}</h3>
                    </div>
                </div>
                
                <h3 className="font-bold text-lg 2xl:text-md vt-serif-font">{listings[activeIndex].title}</h3>
                <h3 className="text-gray-500">{listings[activeIndex].location}</h3>
                <div className="py-4">
                    <Configuration configuration={listings[activeIndex].configuration}/>
                </div>
            </div>
            <div className={`${styles.vtPropertyMap}`}>
                <Map className=""  propId={activeIndex}/>
            </div>
        </div>
    )
}
