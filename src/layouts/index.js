import React, { useContext, useEffect, useState } from "react";
import LayoutNoFooter from "../components/LayoutNoFooter";
import Listings from "../components/showcase/listings/Listings";
import OwnerDetails from "../components/showcase/OwnerDetails";
import { CommonContext } from "../contexts/CommonContextProvider";
import axiosConfig from "../axiosConfig";

const Layout = ({ pageContext, children }) => {
    const [viewRegistered, setViewRegistered] = useState(false);
    const { activeSlug, setFitoutMenuStatus, fullWidth, setFullWidth, userIP } =
        useContext(CommonContext);
    const getParamFromPathname = (pathname) => {
        return pathname.split("/")[1];
    };

    useEffect(() => {
        console.log(userIP);
        if (document.querySelector('[aria-current="page"]') !== null)
            document.querySelector('[aria-current="page"]').scrollIntoView();
        if (activeSlug !== null) {
            axiosConfig
                .get("/propertyFitoutMenuStatus", {
                    params: {
                        slug: activeSlug,
                    },
                })
                .then(function (response) {
                    setFitoutMenuStatus(response.data.data);
                })
                .catch(function (error) {
                    setFitoutMenuStatus(null);
                });
            axiosConfig
                .post("/addCounter", {
                    property_slug: activeSlug,
                    ip_address: userIP,
                })
                .then(function (response) {})
                .catch(function (error) {});
        }
    }, [activeSlug]);

    useEffect(() => {
        if (document.querySelector('[aria-current="page"]') !== null)
            document.querySelector('[aria-current="page"]').scrollIntoView();
    }, []);
    const handleClick = () => {
        setFullWidth(fullWidth ? false : true);
    };
    if (!pageContext.matchPath) return <>{children}</>;
    return getParamFromPathname(pageContext.matchPath) === "showcase" ? (
        <div>
            <LayoutNoFooter>
                <div className="vt-showcase mx-auto relative z-10">
                    <div className="grid lg:grid-cols-9 xl:grid-cols-8 2xl:grid-cols-12">
                        <div
                            className={`hidden xl:block col-span-2 2xl:col-span-4 border-r border-gray-100 relative`}
                        >
                            {!fullWidth ? (
                                ""
                            ) : (
                                <div
                                    className="right-0 bg-white pl-1 pr-2 py-1 -mr-8 z-40 top-1 rounded-r-xl border border-gray-200 cursor-pointer absolute"
                                    onClick={handleClick}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 5l7 7-7 7M5 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            )}
                            <Listings propertyPage={true} />
                        </div>
                        <div
                            className={`hidden ${
                                fullWidth
                                    ? ""
                                    : "lg:block lg:col-span-3 xl:col-span-2 2xl:col-span-3"
                            } `}
                        >
                            {activeSlug === null ? (
                                ""
                            ) : (
                                <OwnerDetails slug={activeSlug} />
                            )}
                        </div>
                        <div
                            className={`lg:col-span-6 ${
                                fullWidth
                                    ? "xl:col-span-6 2xl:col-span-8"
                                    : "xl:col-span-4 2xl:col-span-5"
                            } bg-gray-100 relative`}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            </LayoutNoFooter>
        </div>
    ) : (
        <>{children}</>
    );
};

export default Layout;
