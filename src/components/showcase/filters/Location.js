import React, {useContext, useState, useEffect} from 'react'
import axiosConfig from '../../../axiosConfig';
import Select from 'react-select'

import {FilterStateContext, FilterDispatchContext} from '../../../contexts/FilterContextProvider'

export default function Location({updateLocations,location}) {
    const options = [
        { value: 'dwarka', label: 'Dwarka' },
        { value: 'sewakpark', label: 'Sewak Park' },
        { value: 'dwarkamor', label: 'Dwarka Mor' },
        { value: 'rohini', label: 'Rohini' },
        { value: 'southex', label: 'South Ex' },
        { value: 'punjabibagh', label: 'Punjabi Bagh' },
        { value: 'greaterkailash', label: 'Greater Kailash' },
        { value: 'janakpuri', label: 'Janakpuri' },
    ]
    const [locationList, setLocationList] = useState(options)
    const filterState =  useContext(FilterStateContext);
    const dispatch = useContext(FilterDispatchContext)
    useEffect(()=>{
        axiosConfig.get('/propertyLocationList')
        .then(function (response) {
            setLocationList(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    },[])

    const handleChange = (selectedLocations, actionMeta ) => {
        dispatch({ type: 'LOCATION', payload: selectedLocations });
    }
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: '0px',
            height: '40px',
            overflow: 'scroll',
            display: 'flex',
            outline: 'none',
            cursor: 'pointer'
        }),
        input: (provided, state) => ({
            ...provided,
            border: '0px !important',
            outline: 'none',
        }),
        clearIndicator: () => ({
          display: 'none'
        }),
        dropdownIndicator: () => ({
            display: 'none'
        }),
        indicatorSeparator: () => ({
            display: 'none'
        }),
        container: (provided, state) => ({
            ...provided,
            border: '0px',
            outline: 'none',
            fontFamily: 'poppins',
            fontSize: '0.75rem',
            fontWeight: '500',
            cursor: 'pointer',
        }),
        multiValue: (provided, state) => ({
            ...provided,
            backgroundColor: "#ffe079",
            borderRadius: '50px',
            padding: '0px 3px',
            color: '#333',
            cursor: 'pointer',
            
        }),
        multiValueRemove: (provided, state) => ({
            ...provided,
            backgroundColor: 'transparent !important'
        }),
        multiValueLabel: (provided, state) => ({
            ...provided,
            color: '#333',
            fontWeight: '600'
        }),
        menu: (provided, state) => ({
            ...provided,
            position: 'absolute',
            width: '100%',
            left: '-1rem',
            backgroundColor: '#F5F5F5 !important',
            borderRadius: '0  0 .375rem  .375rem ',
            color: '#222222',
            fontSize: "0.75rem",
            cursor: 'pointer',
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%)"
        }),
    }

    return (
        <div className="lg:w-1/3 vt-search-loctation flex items-center justify-between lg:px-4 lg:border-r border-grey cursor-pointer border-b-2 lg:border-b-0 z-30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            { typeof window !== 'undefined' && (
            <Select 
            className="w-full border-none" 
            defaultValue={filterState.location}
            styles={customStyles}
            options={locationList} 
            placeholder="Location"
            isMulti
            theme={theme => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: '#fff',
                  primary: '#fff',
                },
            })}
            onChange={handleChange}
            />
            )}
        </div>
    )
}
