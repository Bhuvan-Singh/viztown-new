import React from "react";
import { Link } from "gatsby";
export default function Steps({ params, type = "rent" }) {
	return (
		<div className="bg-secondary py-8 h-full">
			<div className="pl-20 pr-8">
				<h3 className="font-semibold text-md">
					{type === "rent" ? "Rent" : "Sale"} Agreement
				</h3>
				<p className="text-sm mt-1">
					Get your {type === "rent" ? "Rent" : "Sale"} agreements made
					with just a click
				</p>
			</div>
			<div className="mt-12 text-sm font-medium">
				<Link
					to={`/dashboard/agreements/create/${type}/${params.id}/lessor`}
					className="capitalize pl-20 w-full block py-6"
					activeClassName="bg-white"
				>
					{type === "rent" ? "Lessor Details" : "Seller Details"}
				</Link>
				<Link
					to={`/dashboard/agreements/create/${type}/${params.id}/lessee`}
					className="capitalize pl-20 w-full block py-6"
					activeClassName="bg-white"
				>
					{type === "rent" ? "Lessee Details" : "Buyer Details"}
				</Link>
				<Link
					to={`/dashboard/agreements/create/${type}/${params.id}/property-details`}
					className="capitalize pl-20 w-full block py-6"
					activeClassName="bg-white"
				>
					property details
				</Link>
				<Link
					to={`/dashboard/agreements/create/${type}/${params.id}/kyc`}
					className="capitalize pl-20 w-full block py-6"
					activeClassName="bg-white"
				>
					KYC Documents
				</Link>
			</div>
		</div>
	);
}
