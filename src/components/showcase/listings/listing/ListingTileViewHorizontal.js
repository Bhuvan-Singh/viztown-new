import React from "react";
import { Link } from "gatsby";

import OwnerImg from "./OwnerImg";
import FeaturedImg from "./FeaturedImg";
import Location from "./Location";
import OwnerDetail from "./OwnerDetail";
import Title from "./Title";
import Configuration from "./Configuration";

import * as styles from "../../../../css/listing.module.css";

export default function ListingTileViewHorizontal({ property }) {
    return (
        <div className="vt-listing rounded-md border border-gray-200 bg-white relative flex-col items-center rounded-xl relative">
            <div className="rounded-xl w-full 2xl:w-60 overflow-hidden p-2">
                <FeaturedImg
                    featuredImage={property.featuredImage}
                    height="40"
                />
            </div>
            <div className="vt-listing-details px-6 2xl:px-10 flex-grow">
                <Title title={property.title} />
                <Location location={property.location} />
                <div className="py-3">
                    <Configuration configuration={property.configuration} />
                </div>
                {/* <h5 className="text-lg font-semibold text-blue-500 mt-3">
                    {property.viewsThisWeek}{" "}
                    <span className="text-xs font-regular text-lightGrey">
                        Views this week
                    </span>
                </h5> */}
            </div>

            <div className="absolute right-2 top-2 flex space-x-2">
                <a href={`/showcase/${property.slug}`} target="_blank">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                    </svg>
                </a>
                {/* <Link to={`/dashboard/listings/create/${property.id}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                    </svg>
                </Link> */}
            </div>
        </div>
    );
}
