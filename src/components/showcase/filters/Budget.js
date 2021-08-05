import React from 'react'

export default function Budget() {
    const budgetRange = [
        {
            type: 'minimum',
            value: 100000,
            text: '1 Lac'
        },
        {
            type: 'maximum',
            value: 5000000,
            text: '5 Lac'
        }
    ]
    return (
        <div className="w-48 vt-search-budget flex items-center justify-between px-4 py-4 cursor-pointer relative">
            <span className="vt-search-title text-sm text-primary">Budget</span>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </span>

            <div className="vt-search-relative vt-search-relative-budget absolute w-80 bg-grey top-full left-0 shadow-md rounded-b-md hidden">
                <div className="vt-search-dropdown text-sm text-primary p-3">
                    <div className="px-4 py-3 font-semibold flex items-center justify-between">
                        <input className="w-full vt-search-slider" type="range" min={budgetRange[0].value} max={budgetRange[1].value}  />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <span>₹{budgetRange[0].text}</span>
                        <span>₹{budgetRange[1].text}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
