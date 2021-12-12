import React, { createContext, useState, useEffect } from "react";
export const RoleContext = createContext();

export default function RoleContextProvider({ children }) {
    const [role, setRole] = useState(null);

    return (
        <RoleContext.Provider value={{ role, setRole }}>
            {children}
        </RoleContext.Provider>
    );
}
