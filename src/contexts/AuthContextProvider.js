import React,{createContext, useState, useEffect} from 'react'
export const AuthContext = createContext();

export default function AuthContextProvider({children}) {
    const [user,setUser] = useState(null);
    useEffect(()=>{
        const vendor_id = localStorage.getItem('vendor_id');
        vendor_id ===null ? setUser(null) : setUser(vendor_id);
    }, [])
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}