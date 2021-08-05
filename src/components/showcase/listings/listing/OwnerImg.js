import React from 'react'

export default function OwnerImg({ownerImg}) {
    return (
        <div className="vt-listing-owner absolute w-full left-0">
            <img src={ownerImg} className="h-20 w-20 rounded-full bg-white p-1 mx-auto -mt-10 object-cover" alt="Owner Image"/>
        </div>
    )
}
