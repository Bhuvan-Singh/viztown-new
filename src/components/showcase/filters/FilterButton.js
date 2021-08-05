import React from 'react'

export default function FilterButton() {
    return (
        <div className="vt-search-button pl-4 cursor-pointer">
            <div className="bg-secondary px-8 rounded-md py-3 font-bold leading-none hover:text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <span className="vt-search-title text-sm text-white">Search</span>
            </div>
        </div>
    )
}
