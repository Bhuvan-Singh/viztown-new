import React,{useContext} from 'react'
import Select from 'react-select'
import {FilterStateContext, FilterDispatchContext} from '../../../contexts/FilterContextProvider'

export default function Category() {
    const options = [
        { value: 'lease', label: 'Lease' },
        { value: 'buy', label: 'Buy' },
    ]

    const filterState =  useContext(FilterStateContext);
    const dispatch = useContext(FilterDispatchContext)

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: '0px',
            height: '40px',
            overflow: 'scroll',
            display: 'flex',
            outline: 'none',
            cursor: 'pointer',
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
            fontWeight: '600',
            cursor: 'pointer',
        }),
        singleValue: (provided, state) => ({
            ...provided,
            fontWeight: '600',
        }),
        singleValueRemove: (provided, state) => ({
            ...provided,
            backgroundColor: 'transparent !important'
        }),
        singleValueLabel: (provided, state) => ({
            ...provided,
            color: '#222222',
            fontWeight: '600'
        }),
        menu: (provided, state) => ({
            ...provided,
            position: 'absolute',
            width: '9rem',
            left: '-1rem',
            backgroundColor: '#F5F5F5',
            borderRadius: '0  0 .375rem  .375rem ',
            color: '#222222',
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%)"
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: '#F5F5F5 !important',
            color: state.isSelected ? '#222222' : '#333',
            fontWeight: state.isSelected ? '600' : '500',
            opacity: state.isSelected ? '1' : '0.6',
            cursor: 'pointer',
            fontSize: '0.75rem',
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            backgroundColor: 'transparent'
        })
    }

    const handleChange = (selectedCategory, actionMeta ) => {
        dispatch({ type: 'CATEGORY', payload: selectedCategory.value });
    }
    const defaultValueIndex = options.findIndex(x => x.value === filterState.category);
    
    return (
        <div className="w-36 vt-search-category flex items-center justify-between px-4 border-r border-grey cursor-pointer relative" >
            {/* <span className="vt-search-title text-sm text-primary">Lease</span>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </span>

            <div className="vt-search-relative vt-search-relative-category absolute w-full bg-grey top-full left-0 shadow-md rounded-b-md hidden">
                <div className="vt-search-dropdown text-sm text-primary">
                    <div className="px-4 py-3 border-b border-gray-200 font-semibold flex items-center justify-between">Lease
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="px-4 py-3 opacity-40 font-semibold">Buy</div>
                </div>
            </div> */}
            <Select
            className="w-full" 
            defaultValue = {options[defaultValueIndex]}
            styles={customStyles}
            options={options}
            onChange={handleChange}
            theme={theme => ({
                ...theme,
                borderRadius: 0,
                colors: {
                    ...theme.colors,
                    primary25: '#fff',
                    primary: '#fff',
                },
            })}
            />
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </span>
        </div>
    )
}
