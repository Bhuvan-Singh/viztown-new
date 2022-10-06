import React from "react";
import { Link } from "gatsby";

import OwnerImg from "./OwnerImg";
import FeaturedImg from "./FeaturedImg";
import Location from "./Location";
import OwnerDetail from "./OwnerDetail";
import Title from "./Title";
import Configuration from "./Configuration";

import * as styles from "../../../../css/listing.module.css";

export default function ListingTileView({ property }) {
	// console.log(property);
	return (
		<a
			href={`/showcase/${property.propertyDetails.slug}`}
			target="_blank"
			className="vt-listing border border-gray-200 bg-white grid grid-cols-12 items-center rounded-xl relative"
		>
			<div className="rounded-xl col-span-4 overflow-hidden">
				<FeaturedImg
					featuredImage={property.propertyDetails.feature_image}
					height="40"
					fullHeight={false}
				/>
			</div>
			<div className="vt-listing-details pl-6 pr-2 2xl:px-6 col-span-8">
				<Title title={property.propertyDetails.property_name} />
				<Location location={property.propertyDetails.address} />
				{/* <div className="py-3">
                    <Configuration configuration={property.configuration} />
                </div> */}
				<h5 className="text-lg font-semibold text-blue-500 mt-3 flex items-center gap-2">
					<span>{property.view}</span>
					<span className="text-xs font-light text-lightGrey">
						Views this week
					</span>
				</h5>
			</div>

			{/* <div className="absolute right-2 top-2 flex space-x-2">
                <Link to={`/dashboard/listings/create/${property.id}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-500"
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
                </Link>
            </div> */}
		</a>
	);
}
