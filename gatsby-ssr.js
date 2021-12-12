const React = require("react");
const ListingContextProvider =
    require("./src/contexts/ListingContextProvider").default;
const FilterContextProvider =
    require("./src/contexts/FilterContextProvider").default;
const CommonContextProvider =
    require("./src/contexts/CommonContextProvider").default;
const AuthContextProvider =
    require("./src/contexts/AuthContextProvider").default;
const RoleContextProvider =
    require("./src/contexts/RoleContextProvider").default;
exports.wrapRootElement = ({ element }) => {
    return (
        <AuthContextProvider>
            <RoleContextProvider>
                <CommonContextProvider>
                    <ListingContextProvider>
                        <FilterContextProvider>{element}</FilterContextProvider>
                    </ListingContextProvider>
                </CommonContextProvider>
            </RoleContextProvider>
        </AuthContextProvider>
    );
};
