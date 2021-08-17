const React = require('react');
const ListingContextProvider = require('./src/contexts/ListingContextProvider')
const FilterContextProvider = require('./src/contexts/FilterContextProvider')
const CommonContextProvider = require('./src/contexts/CommonContextProvider')

exports.wrapRootElement = ({element}) => {
    return(
        <CommonContextProvider>
            <ListingContextProvider>
                <FilterContextProvider>
                    {element}
                </FilterContextProvider>
            </ListingContextProvider>
        </CommonContextProvider>
    )
}