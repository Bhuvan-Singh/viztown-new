import React, { useState, useEffect, useContext } from "react";
import { Link } from "gatsby";
import Layout from "../../../components/dashboard/common/Layout";
import TotalViews from "../../../components/dashboard/common/TotalViews";
import Button from "../../../components/dashboard/common/Button";
import ListingsTileView from "../../../components/showcase/listings/ListingsTileView";
import axiosConfig from "../../../axiosConfig";
import { AuthContext } from "../../../contexts/AuthContextProvider";

export default function Listings() {
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [propertyListings, setpropertyListings] = useState(null);
    const [publicListings, setPublicListings] = useState(null);
    const [privateListings, setPrivateListings] = useState(null);
    useEffect(() => {
        axiosConfig
            .get("/vendorPropertyListing", {
                params: {
                    // id: localStorage.getItem('vendor_id'),
                    id: user.vendor.id,
                },
            })
            .then(function (response) {
                let publicList = [];
                let privateList = [];
                response.data.data.map((listing) => {
                    listing.visibility === "1"
                        ? privateList.push(listing)
                        : publicList.push(listing);
                });
                setIsLoading(false);
                publicList.length > 0
                    ? setPublicListings(publicList)
                    : setPublicListings(null);
                privateList.length > 0
                    ? setPrivateListings(privateList)
                    : setPrivateListings(null);
                setpropertyListings(response.data.data);
            })
            .catch((error) => {
                setIsLoading(false);
                setpropertyListings(null);
            });
    }, []);
    return (
        <Layout>
            {isLoading ? (
                <div className="relative w-full z-5 h-full mt-32 flex justify-center items-center">
                    <img
                        src={`${process.env.GATSBY_BASE_URL}/assets/backend/image/loader.gif`}
                        alt="loading"
                    />
                </div>
            ) : (
                <>
                    <div className="vt-dashboard-overview flex items-center py-6 2xl:py-6 border-b border-gray-100">
                        <div className="flex items-center w-full justify-between">
                            <TotalViews />
                            <div className="flex items-center space-x-6">
                                {propertyListings === null ? (
                                    ""
                                ) : (
                                    <ListingsTileView
                                        propertyListings={propertyListings.slice(
                                            0,
                                            3
                                        )}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="vt-dashboard-hot-properties py-10 border-b border-gray-100">
                        <h3 className="text-lg font-semibold flex items-center space-x-1 justify-between w-full">
                            <span>Public Listings</span>
                            <Button to={`/dashboard/listings/create`}>
                                Create New Listing
                            </Button>
                        </h3>
                        {publicListings === null ? (
                            <div className="py-8 font-semibold">
                                <h4>No Public Listing Added Yet</h4>
                            </div>
                        ) : (
                            <ListingsTileView
                                propertyListings={publicListings}
                            />
                        )}
                    </div>
                    <div className="vt-dashboard-hot-properties py-10">
                        <h3 className="text-lg font-semibold flex items-center space-x-1 justify-between w-full">
                            <span>Private Listings</span>
                            <Button to={`/dashboard/listings/create`}>
                                Create New Listing
                            </Button>
                        </h3>
                        {privateListings === null ? (
                            <div className="py-8 font-semibold">
                                <h4>No Private Listing Added Yet</h4>
                            </div>
                        ) : (
                            <ListingsTileView
                                propertyListings={privateListings}
                            />
                        )}
                    </div>
                </>
            )}
        </Layout>
    );
}
