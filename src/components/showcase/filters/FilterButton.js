import React, {useContext} from 'react'
import axiosConfig from '../../../axiosConfig';
import {ListingContext} from '../../../contexts/ListingContextProvider'
import {FilterStateContext} from '../../../contexts/FilterContextProvider'
import {navigate} from 'gatsby'


export default function FilterButton() {
    const filterState =  useContext(FilterStateContext);
    const {setListings, setListingLoading} = useContext(ListingContext)
    const updateListings = () => {
        setListingLoading(true);
        let location = [];
        filterState.location.map((loc)=>{
            location.push(loc.value)
        })
        axiosConfig.get('/filteredListings',{
            params: {
                category: filterState.category,
                budget: filterState.budget,
                type: filterState.type,
                location: location
            }
        })
        .then(function (response) {
            setListings(response.data.data);
            setListingLoading(false);
            // navigate('/showcase/')
            navigate("/showcase/" + response.data.data[0].slug)
            
        })
        .catch(function (error) {
            console.log(error);
        })
        localStorage.setItem("filter", JSON.stringify(filterState));
    }
    return (
        <div className="vt-search-button lg:pl-4 cursor-pointer" onClick={updateListings}>
            <div className="bg-secondary lg:px-8 rounded-md py-3 font-bold leading-none hover:text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <span className="vt-search-title text-sm text-white">Search</span>
            </div>
        </div>
    )
}
