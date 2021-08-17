import React from 'react'
import ListingContextProvider from './src/contexts/ListingContextProvider'
import FilterContextProvider from './src/contexts/FilterContextProvider'
import CommonContextProvider from './src/contexts/CommonContextProvider'

export const wrapRootElement = ({element}) => {
    return (
        <CommonContextProvider>
            <ListingContextProvider>
                <FilterContextProvider>
                    {element}
                </FilterContextProvider>
            </ListingContextProvider>
        </CommonContextProvider>
    )
}