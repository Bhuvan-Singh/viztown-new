import React from 'react'

export default function type() {
    const propertyTypes = [
        {
          id: 1,
          type: "Office Space",
        },
        {
            id: 2,
            type: "Shop/Showrooom",
        },
        {
            id: 3,
            type: "Residential",
        },
        {
            id: 4,
            type: "Commercial Land",
        },
        {
            id: 5,
            type: "Co-Working space",
        },
        {
            id: 6,
            type: "Warehouse/Godwon",
        },
        {
            id: 7,
            type: "Industrial Building",
        },
    ]
    return (
        <div className="w-48 vt-search-type flex items-center justify-between px-4 py-4 border-r border-grey cursor-pointer relative">
            <span className="vt-search-title text-sm text-primary">Property Type</span>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </span>

            <div className="vt-search-relative vt-search-relative-type absolute w-96 bg-grey top-full left-0 shadow-md rounded-b-md hidden">
                <div className="vt-search-dropdown text-xs text-primary flex flex-wrap p-3">
                    {
                        propertyTypes.map(property => (
                            <div className="font-semibold rounded-md border border-gray-300 p-2 mr-2 mb-2 cursor-pointer" key={property.id}>
                                <input type="text" id={`vt-search-type-${property.id}`} className="hidden" />
                                <label htmlFor={`vt-search-type-${property.id}`}>{property.type}</label>
                            </div>
                        ))
                    }
                    
                </div>
            </div>
        </div>
    )
}
