import React from 'react'

export default function FeaturedImg({featuredImage}) {
    return (
        <div className="vt-listing-image ">
            <img src={featuredImage} className="h-48 w-full object-cover" alt=""/>
        </div>
    )
}
