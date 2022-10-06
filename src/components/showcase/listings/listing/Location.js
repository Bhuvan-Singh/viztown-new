import React from "react";

export default function Location({ location }) {
	return (
		<div className="vt-listing-location grid grid-cols-12 items-start relative">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-4 w-4 text-gray-400 col-span-1"
				viewBox="0 0 20 20 "
				fill="currentColor"
			>
				<path
					fillRule="evenodd"
					d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
					clipRule="evenodd"
				/>
			</svg>
			<h3 className="text-gray-primary font-light text-xs col-span-10">
				{" "}
				{location}
			</h3>
		</div>
	);
}
