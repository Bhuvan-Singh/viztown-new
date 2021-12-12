import React,{useContext}  from 'react'
import axiosConfig from '../../../axiosConfig';
import {ListingContext} from '../../../contexts/ListingContextProvider'
import {FilterStateContext} from '../../../contexts/FilterContextProvider'
import {navigate} from 'gatsby'

const FilterHandler = () => {
    const filterState =  useContext(FilterStateContext);
    const {setListings, setListingLoading} = useContext(ListingContext)
    const updateListings = () => {
        setListings([{},{},{},{},{}])
        setListingLoading(true);
        let location = [];
        filterState.location.map((loc)=>{
            location.push(loc.value)
        })
        
        const budget = filterState.budget[1] === 0 ? null : filterState.budget
        axiosConfig.get('/filteredListings',{
            params: {
                category: filterState.category,
                budget: budget,
                type: filterState.type,
                location: location
            }
        })
        .then(function (response) {
            setListings(response.data.data);
            setListingLoading(false);
            navigate('/showcase/')
            // navigate("/showcase/" + response.data.data[0].slug)
            
        })
        .catch(function (error) {

        })
        localStorage.setItem("filter", JSON.stringify(filterState));
    }
    return (
        <div>
            
        </div>
    )
}


export default FilterHandler;
