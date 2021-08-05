import React from 'react'

export default function Category() {
    return (
        <div className="w-36 vt-search-category flex items-center justify-between px-4 py-4 border-r border-grey cursor-pointer relative" >
            <span className="vt-search-title text-sm text-primary">Lease</span>
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
            </div>
        </div>
    )
}
