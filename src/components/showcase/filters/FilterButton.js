import React, {useContext} from 'react'
import {ListingContext} from '../../../contexts/ListingContextProvider'
import {FilterStateContext} from '../../../contexts/FilterContextProvider'
import {navigate} from 'gatsby'

const searchedListings = [
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
    }
]

export default function FilterButton() {
    const filterState =  useContext(FilterStateContext);
    const {setListings} = useContext(ListingContext)
    const updateListings = () => {
        setListings(searchedListings)
        localStorage.setItem("filter", JSON.stringify(filterState));
    }
    return (
        <div className="vt-search-button pl-4 cursor-pointer" onClick={updateListings}>
            <div className="bg-secondary px-8 rounded-md py-3 font-bold leading-none hover:text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <span className="vt-search-title text-sm text-white">Search</span>
            </div>
        </div>
    )
}
