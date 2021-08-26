import React,{createContext, useState, useEffect} from 'react'
import axiosConfig from '../axiosConfig';
export const CommonContext = createContext();

export default function CommonContextProvider({children}) {
    const [menus,setMenus] = useState([]);
    const [isResidential,setIsResidential] = useState(false);
    useEffect(()=>{
        axiosConfig.get('/menus')
        .then(function (response) {
            setMenus(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    },[])
    
    return (
        <CommonContext.Provider value={{menus, isResidential, setIsResidential}}>
            {children}
        </CommonContext.Provider>
    )
}
