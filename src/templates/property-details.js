import React from 'react'
import {Link} from 'gatsby'

import LayoutNoFooter from '../components/LayoutNoFooter'
import layout from '../components/Layout'
import Filters from '../components/showcase/Filters'
import Listings from '../components/showcase/listings/Listings'
import Map from '../components/showcase/map/Map'
import Configuration from '../components/showcase/listings/listing/Configuration' 

import * as styles from '../css/property-details.module.css'

export default function PropertyDetails({pageContext}) {
    const propertyListings = [
        {
            id: 1,
            slug: "101-indian-road",
            ownerImg: "http://cyberworx.co.in/viztown_new//upload/about/bb2438f4d39cc948408c50e32d3ff39e.jpg",
            ownerName: "Ankita Gokhale",
            featuredImage: "http://cyberworx.co.in/viztown_new//upload/about/aa9a85202f59982afde7b85d018cbb26.jpg",
            title: "101 Indian Road",
            location: "Lake bluff, illinios 600044",
            ownerAddress: "Early Bird Homes at eXp Realty, LLC",
            configuration: [
                {
                    name: "Bed",
                    value: "3"
                },
                {
                    name: "Bath",
                    value: "2+1"
                },
                {
                    name: "SF",
                    value: "1076 + 76"
                }
            ],
            coordinates: {
                lat: 28.726580,
                lng: 77.083054
            },
        },
        {
            id: 2,
            slug: "102-indian-road",
            ownerImg: "http://cyberworx.co.in/viztown_new//upload/about/3316316cf1e651b385563f64a0e68d1d.jpg",
            ownerName: "Amit Triwedi",
            featuredImage: "http://cyberworx.co.in/viztown_new//upload/about/5b1a1cc899639389854aa59872113a51.jpg",
            title: "102 Indian Road",
            location: "Lake bluff, illinios 600044",
            ownerAddress: "Early Bird Homes at eXp Realty, LLC",
            configuration: [
                {
                    name: "Bed",
                    value: "2"
                },
                {
                    name: "Bath",
                    value: "2+1"
                },
                {
                    name: "SF",
                    value: "976 + 86"
                }
            ],
            coordinates: {
                lat: 28.716181,
                lng: 77.122673
            },
        },
        {
            id: 3,
            slug: "103-indian-road",
            ownerImg: "http://cyberworx.co.in/viztown_new//upload/about/68606f72eaf34d9264dc8b8d5cc5ba93.jpg",
            ownerName: "Sneha Singh",
            featuredImage: "http://cyberworx.co.in/viztown_new//upload/about/aa9a85202f59982afde7b85d018cbb26.jpg",
            title: "103 Indian Road",
            location: "Lake bluff, illinios 600044",
            ownerAddress: "Early Bird Homes at eXp Realty, LLC",
            configuration: [
                {
                    name: "Bed",
                    value: "4"
                },
                {
                    name: "Bath",
                    value: "2+1"
                },
                {
                    name: "SF",
                    value: "1676 + 65"
                }
            ],
            coordinates: {
                lat: 28.73258595,
                lng: 77.10770205726195
            },
        },
        {
            id: 4,
            slug: "104-indian-road",
            ownerImg: "http://cyberworx.co.in/viztown_new//upload/about/f3399432d0c4fcb5f059dd6c4dce513a.jpg",
            ownerName: "Erik Taniguchi",
            featuredImage: "http://cyberworx.co.in/viztown_new//upload/about/5b1a1cc899639389854aa59872113a51.jpg",
            title: "104 Indian Road",
            location: "Lake bluff, illinios 600044",
            ownerAddress: "Early Bird Homes at eXp Realty, LLC",
            configuration: [
                {
                    name: "Bed",
                    value: "2"
                },
                {
                    name: "Bath",
                    value: "2+1"
                },
                {
                    name: "SF",
                    value: "976 + 98"
                }
            ],
            coordinates: {
                lat: 28.7118409,
                lng: 77.1140943
            },
        },
    ]
    return (
        <LayoutNoFooter>
            <Filters/>
            <div className="vt-showcase mx-auto relative z-10" >
                <div className="grid lg:grid-cols-8 2xl:grid-cols-12">
                    <div className="col-span-2 2xl:col-span-4 border-r border-gray-100">
                        <Listings propertyListings={propertyListings} propertyPage={true}/>
                    </div>
                    <div className="vt-property-detail relative lg:col-span-2 2xl:col-span-3 text-center">
                        <Link to="/showcase" className="absolute right-2 top-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 font-bold" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                        <div className="h-48 p-5 text-xs 2xl:text-sm">
                            <div className="flex justify-between items-center mb-3">
                                <img className="w-16 h-16 rounded-full object-cover mx-auto" src={propertyListings[pageContext.id].ownerImg}/>
                                <div className="text-left">
                                    <h3 className="font-semibold text-lg 2xl:text-md">{propertyListings[pageContext.id].ownerName}</h3>
                                    <h3 className="">{propertyListings[pageContext.id].ownerAddress}</h3>
                                </div>
                            </div>
                            
                            <h3 className="font-semibold text-lg 2xl:text-md">{propertyListings[pageContext.id].title}</h3>
                            <h3 className="text-gray-500">{propertyListings[pageContext.id].location}</h3>
                            <Configuration configuration={propertyListings[pageContext.id].configuration}/>
                        </div>
                        <div class={`${styles.vtPropertyMap}`}>
                            <Map className="" propertyListings={propertyListings} propId={pageContext.id}/>
                        </div>
                    </div>
                    <div className="lg:col-span-4 2xl:col-span-5 bg-gray-100"></div>
                </div>
            </div>
        </LayoutNoFooter>
    )
}
