import React from "react";
import ListingContextProvider from "./src/contexts/ListingContextProvider";
import FilterContextProvider from "./src/contexts/FilterContextProvider";
import CommonContextProvider from "./src/contexts/CommonContextProvider";
import AuthContextProvider from "./src/contexts/AuthContextProvider";
import RoleContextProvider from "./src/contexts/RoleContextProvider";
export const wrapRootElement = ({ element }) => {
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
