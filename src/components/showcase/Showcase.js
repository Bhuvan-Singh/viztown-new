import React from 'react'
import Listings from './listings/Listings'
import Map from './map/Map'

export default function Showcase() {
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
        <div className="vt-showcase mx-auto relative z-10">
            <div className="grid grid-cols-2">
                <Listings propertyListings={propertyListings} lgGrid="2" twoXlGrid="3"/>
                <div className="relative">
                    <Map propertyListings={propertyListings}/>
                </div>
            </div>
        </div>
    )
}
