import React,{useContext} from 'react'
import Listings from './listings/Listings'
import Map from './map/Map'
import { ListingContext } from '../../contexts/ListingContextProvider';

export default function Showcase() {
    const {listings} = useContext(ListingContext)
    
    console.log("listings")
    console.log(listings)
    return (
        <div className="vt-showcase mx-auto relative z-10">
            {listings.length > 0 ? 
            <div className="grid grid-cols-11">
                <div className="col-span-6">
                    <Listings lgGrid="2" twoXlGrid="3" />
                </div>
                <div className="col-span-5 relative">
                    <Map/>
                </div>
            </div> :
            <div className="grid grid-cols-1 items-center justify-between h-60">
                <h2 className="font-bold text-xl text-center">No matching listing found.</h2>
            </div>
        }
            
        </div>
    )
}
