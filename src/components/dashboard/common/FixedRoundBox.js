import React from 'react'
import Header from './Header'

export default function FixedRoundBox({children}) {
    return (
        <div>
            <div className="rounded-xl border border-gray-200 h-80 2xl:h-96 p-5 relative">
                {children}
            </div>
        </div>

    )
}
