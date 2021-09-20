import React from 'react'

export default function Configuration({configuration}) {
    return (
        <div className="vt-listing-configuration relative">
            <div className="flex items-center text-xs font-semibold justify-between">
                {/* <span className="flex items-center">
                    <img src="http://cyberworx.co.in/viztown_new/assets/images/double-bed.png" className="h-3 w-3 mr-1" alt=""/>
                    {configuration.bed} Bed
                </span>
                <span className="flex items-center">
                    <img src="http://cyberworx.co.in/viztown_new/assets/images/bathroom.png" className="h-3 w-3 mr-1" alt=""/>
                    {configuration.bath} Bath
                </span> */}
                <span className="flex items-center">
                    <img src="http://cyberworx.co.in/viztown_new/assets/images/floor-plan.png" className="h-3 w-3 mr-1" alt=""/>
                    {configuration.area} SF
                </span>
            </div>
        </div>
    )
}
