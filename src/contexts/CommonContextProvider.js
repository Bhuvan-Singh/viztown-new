import React, { createContext, useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import axios from "axios";
export const CommonContext = createContext();

export default function CommonContextProvider({ children }) {
    const [menus, setMenus] = useState([]);
    const [isResidential, setIsResidential] = useState(false);
    const [ownerDetails, setOwnerDetails] = useState(false);
    const [fitoutMenuStatus, setFitoutMenuStatus] = useState(null);
    const [activeSlug, setActiveSlug] = useState(null);
    const [fullWidth, setFullWidth] = useState(false);
    const [userIP, setUserIP] = useState(null);
    const getUserIp = async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        setUserIP(res.data.IPv4);
    };

    useEffect(() => {
        getUserIp();
        axiosConfig
            .get("/menus")
            .then(function (response) {
                setMenus(response.data.data);
            })
            .catch(function (error) {
                // console.log(error);
            });
    }, []);

    return (
        <CommonContext.Provider
            value={{
                menus,
                isResidential,
                setIsResidential,
                ownerDetails,
                setOwnerDetails,
                fitoutMenuStatus,
                setFitoutMenuStatus,
                activeSlug,
                setActiveSlug,
                fullWidth,
                setFullWidth,
                userIP,
                setUserIP,
            }}
        >
            {children}
        </CommonContext.Provider>
    );
}
