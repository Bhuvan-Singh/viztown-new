import React from 'react'

export default function Title({title}) {
    return (
        <div className="vt-listing-name my-2 relative">
            <h3 className="font-bold text-black vt-serif-font text-lg">{title}</h3>
        </div>
    )
}
