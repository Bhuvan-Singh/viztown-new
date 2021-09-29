import React,{createContext, useState, useEffect} from 'react'
import axiosConfig from '../axiosConfig';
export const ListingContext = createContext();

const initialListings = [
    {},{},{},{},{}
]

export default function ListingContextProvider({children}) {
    const [listings, setListings] = useState(initialListings)
    const [listingLoading, setListingLoading] = useState(true)

    useEffect(()=>{
        axiosConfig.get('/allListings')
        .then(function (response) {
            setListings(response.data.data);
            setListingLoading(false)
        })
        .catch(function (error) {
            console.log(error);
        })
    },[])
    return (
        <ListingContext.Provider value={{listings, setListings, listingLoading, setListingLoading}}>
            {children}
        </ListingContext.Provider>
    )
}
