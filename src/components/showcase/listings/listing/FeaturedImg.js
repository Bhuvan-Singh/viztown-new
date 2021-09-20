import React from 'react'

export default function FeaturedImg({featuredImage}) {
    return (
        <div className="vt-listing-image relative">
            <img src={featuredImage} className="h-48 w-full object-cover" alt=""/>
        </div>
    )
}
