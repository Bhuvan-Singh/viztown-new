import React from 'react'

export default function Location() {
    return (
        <div className="w-1/3 vt-search-loctation flex items-center justify-between px-4 py-4 border-r border-grey cursor-pointer">
            <input type="text" className="vt-search-input text-sm text-primary w-full" placeholder="Enter Location" />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
        </div>
    )
}
