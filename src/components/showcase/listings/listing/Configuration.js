import React from 'react'

export default function Configuration({configuration}) {
    return (
        <div className="vt-listing-configuration">
            <div className="flex items-center text-xs font-semibold justify-between">
                <span className="flex items-center">
                    <img src="http://cyberworx.co.in/viztown_new/assets/images/double-bed.png" className="h-3 w-3 mr-1" alt=""/>
                    {configuration[0].value} Bed
                </span>
                <span className="flex items-center">
                    <img src="http://cyberworx.co.in/viztown_new/assets/images/bathroom.png" className="h-3 w-3 mr-1" alt=""/>
                    {configuration[1].value} Bath
                </span>
                <span className="flex items-center">
                    <img src="http://cyberworx.co.in/viztown_new/assets/images/floor-plan.png" className="h-3 w-3 mr-1" alt=""/>
                    {configuration[2].value} SF
                </span>
            </div>
        </div>
    )
}
