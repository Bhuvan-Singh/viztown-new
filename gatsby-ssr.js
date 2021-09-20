const React = require('react');
const ListingContextProvider = require('./src/contexts/ListingContextProvider').default
const FilterContextProvider = require('./src/contexts/FilterContextProvider').default
const CommonContextProvider = require('./src/contexts/CommonContextProvider').default
const AuthContextProvider = require('./src/contexts/AuthContextProvider').default

exports.wrapRootElement = ({element}) => {
    return(
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