import React from "react";
import { Link } from "gatsby";

import FixedRoundBox from "../common/FixedRoundBox";
import ListingLimitedView from "../../showcase/listings/ListingsLimitedView";

export default function Properties({ propertyListings }) {
	return (
		<FixedRoundBox>
			<div className="flex justify-between items-center text-primary overflow-hidden">
				<h3 className="text-sm font-medium">Recent property listing</h3>
				<Link
					to="/dashboard/listings"
					className="flex items-center space-x-2"
				>
					<h4 className="text-xs">View all listings</h4>
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
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/>
					</svg>
				</Link>
			</div>
			<div className="py-2">
				<ListingLimitedView propertyListings={propertyListings} />
			</div>
		</FixedRoundBox>
	);
}
