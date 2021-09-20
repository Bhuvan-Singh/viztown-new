import React from 'react'
import ListingContextProvider from './src/contexts/ListingContextProvider'
import FilterContextProvider from './src/contexts/FilterContextProvider'
import CommonContextProvider from './src/contexts/CommonContextProvider'
import AuthContextProvider from './src/contexts/AuthContextProvider'

export const wrapRootElement = ({element}) => {
    return (
        <AuthContextProvider>
            <CommonContextProvider>
                <ListingContextProvider>
                    <FilterContextProvider>
                        {element}
                    </FilterContextProvider>
                </ListingContextProvider>
            </CommonContextProvider>
        </AuthContextProvider>
    )
}