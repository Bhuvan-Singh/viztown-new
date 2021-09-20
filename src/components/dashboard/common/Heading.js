import React from 'react'

export default function Heading({children}) {
    return (
        <div>
            <h1 className="text-md text-primary uppercase font-bold w-full border-b-2 border-gray-100 pb-2">{children}</h1>
        </div>
    )
}
