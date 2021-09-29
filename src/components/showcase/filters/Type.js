import React, {useContext, useState, useEffect} from 'react'
import axiosConfig from '../../../axiosConfig';
import {FilterStateContext, FilterDispatchContext} from '../../../contexts/FilterContextProvider'

export default function Type() {
    const options = [
        {
            id: 1,
            type: "Loading Data",
        },
    ]
    const [propertyTypes, setPropertyTypes] = useState(options)
    useEffect(()=>{
        axiosConfig.get('/propertyTypeList')
        .then(function (response) {
            setPropertyTypes(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    },[])
    const filterState =  useContext(FilterStateContext);
    const dispatch = useContext(FilterDispatchContext)
    const toggleTypeDropdown = () => {
        const t = document.getElementById('vt-search-relative-type').classList.toggle('hidden');
    }
    const selectedTypes = [];
    const handleChange = (e) => {
        document.querySelectorAll('.vt-type-checkbox:checked').forEach((input)=>{
            selectedTypes.push(input.getAttribute('typeid'))
        });
        dispatch({type: 'TYPE', payload: selectedTypes}) 
    }
    
    return (
        <div className="w-full lg:w-48 relative z-20 ">
            <div className="vt-search-type flex items-center justify-between lg:px-4 py-4 lg:border-r border-grey cursor-pointer border-b-2 lg:border-b-0" onClick={toggleTypeDropdown}>
                {
                    filterState.type.length == 0 ? 
                    <span className="vt-search-title text-xs text-primary font-semibold">Property Type</span> :
                    <>
                    <span className="vt-search-title text-xs text-secondary absolute top-0 font-semibold" style={{fontSize:'10px'}}>Type</span>
                    <span className="vt-search-title text-xs text-primary font-semibold">{propertyTypes[filterState.type[0] - 1].type} {
                        filterState.type.length > 1 ? "+ " + (filterState.type.length - 1) : ""
                        }
                    </span>
                    </>
                }
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </span>
            </div>

            <div id="vt-search-relative-type" className="hidden vt-search-relative absolute lg:w-96 bg-grey top-full left-0 shadow-md rounded-b-md">
                <div onClick={toggleTypeDropdown} className="absolute right-2 top-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 font-bold" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd">
                        </path>
                    </svg>
                </div>
                <div className="vt-search-dropdown text-xs text-primary flex flex-wrap p-3">
                    {
                        propertyTypes.map(propertyType => {
                            const propId = propertyType.id.toString();
                            const isChecked = filterState.type.indexOf(propId) != -1 ? true : false;
                            return(
                            <div className="font-semibold mr-2 mb-2" key={propertyType.id} >
                                <input type="checkbox" id={`vt-search-type-${propertyType.id}`} className="hidden vt-type-checkbox" typeid={propertyType.id} onChange={handleChange} checked={isChecked}/>
                                <label className="vt-type-checkbox-label rounded-md border border-gray-300 p-2 block cursor-pointer" htmlFor={`vt-search-type-${propertyType.id}`}>{propertyType.type}</label>
                            </div>
                        )})
                    }
                </div>
            </div>
        </div>
    )
}
