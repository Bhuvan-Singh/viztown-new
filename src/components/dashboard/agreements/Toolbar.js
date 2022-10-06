import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import Select from "react-select";
export default function AgreementToolbar({
	onSortChange,
	handleSearch,
	archive = false,
}) {
	const handleChange = (e) => {
		onSortChange(e.target.value);
	};

	const handleSearchChange = (e) => {
		handleSearch(e.target.value);
	};
	return (
		<div className="flex items-center justify-between py-6">
			<div className="flex items-center space-x-8">
				<div>
					{!archive ? (
						<>
							<h5 className="font-bold">Ongoing Agreements</h5>
							<Link
								to="/dashboard/agreements/archive"
								className="text-dashboardBlue text-xs"
							>
								View archived agreements
							</Link>
						</>
					) : (
						<>
							<h5 className="font-bold">Archived Agreements</h5>
							<Link
								to="/dashboard/agreements"
								className="text-dashboardBlue text-xs"
							>
								View active agreements
							</Link>
						</>
					)}
				</div>
				<Link
					to="/dashboard/agreements/create"
					className="flex items-center space-x-2 bg-dashboardBlue text-white rounded-full text-xs font-semibold py-2 px-4"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
							clipRule="evenodd"
						/>
					</svg>
					Create new agreement
				</Link>
			</div>
			<div className="flex items-center space-x-8">
				<div className="bg-dashboardGrey text-xs flex items-center h-11 py-2 px-4 space-x-2 rounded-full">
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
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
					<input
						className="bg-dashboardGrey outline-none"
						placeholder="Search Agreement"
						onKeyUp={handleSearchChange}
					/>
				</div>
				<div className="">
					<span className="text-xs font-semibold mr-3">Sort By</span>
					<select
						name
						className="outline-none pl-5 pr-12 h-11 text-xs font-medium rounded-full bg-dashboardGrey"
						onChange={handleChange}
					>
						<option value="0">Latest</option>
						<option value="1">Older</option>
					</select>
				</div>
			</div>
		</div>
	);
}
