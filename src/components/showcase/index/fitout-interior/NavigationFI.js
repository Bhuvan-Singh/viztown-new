import React from 'react'
import {Link} from 'gatsby'

export default function NavigationFI({slug}) {
    return (
        <div className={`relative w-full bg-white absolute top-0 py-1 z-10 md:flex items-center mx-auto capitalize justify-center gap-2 whitespace-nowrap lg:whitespace-normal overflow-y-hidden overflow-x-auto`}>
            <Link 
            to={`${slug}/fitout-interior`} 
            className="tab--link rounded-3xl text-primary px-4 text-xs font-semibold py-2"
            activeClassName="bg-secondary text-primary"
            // partiallyActive={true}
            >Floor Layout
            </Link>

            <Link 
            to={`${slug}/fitout-interior/3d-renders`} 
            className="tab--link rounded-3xl text-primary px-4 text-xs font-semibold py-2"
            activeClassName="bg-secondary text-primary"
            partiallyActive={true}
            >3D Renders
            </Link>

            <Link 
            to={`${slug}/fitout-interior/3d-tour`} 
            className="tab--link rounded-3xl text-primary px-4 text-xs font-semibold py-2"
            activeClassName="bg-secondary text-primary">3D Tour
            </Link>
        </div>
    )
}
