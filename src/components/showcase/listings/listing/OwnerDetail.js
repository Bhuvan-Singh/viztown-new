import React from 'react'

export default function OwnerDetail({ownerName, ownerAddress}) {
    return (
        <div className="vt-listing-address mt-5 mb-2 relative">
            <h4 className="font-bold text-primary text-sm mb-2 vt-serif-font">{ownerName}</h4>
            <p className="text-xs text-primary">{ownerAddress}</p>
        </div>
    )
}
