import React, {useState, useEffect} from 'react'
import {Link } from 'gatsby'
import axiosConfig from '../../../axiosConfig'

export default function CreateListingNavigation({propertyId}) {
    return (
        <div className="flex space-x-8 items-center pt-4 mt-4 font-semibold"> 
            <Link to={ `/dashboard/listings/create/${propertyId}`} className="opacity-30 border-b-2 border-transparent" activeClassName="text-primary opacity-100 border-b-2 border-primary">Basic Details</Link>
            <Link to={ `/dashboard/listings/create/${propertyId}/info-map`} className="opacity-30 border-b-2 border-transparent" activeClassName="text-primary opacity-100 border-b-2 border-primary">Info & Map</Link>
            <Link to={ `/dashboard/listings/create/${propertyId}/actual-site`} className="opacity-30 border-b-2 border-transparent" activeClassName="text-primary opacity-100 border-b-2 border-primary">Actual Site</Link>
            <Link to={ `/dashboard/listings/create/${propertyId}/floor-layout`} className="opacity-30 border-b-2 border-transparent" activeClassName="text-primary opacity-100 border-b-2 border-primary">Floor Layout</Link>
            <Link to={ `/dashboard/listings/create/${propertyId}/3d-render`} className="opacity-30 border-b-2 border-transparent" activeClassName="text-primary opacity-100 border-b-2 border-primary">3D Render</Link>
            <Link to={ `/dashboard/listings/create/${propertyId}/3d-tour`} className="opacity-30 border-b-2 border-transparent" activeClassName="text-primary opacity-100 border-b-2 border-primary">3D Tour</Link>
        </div>
    )
}
