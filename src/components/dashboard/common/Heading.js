import React from "react";

export default function Heading({ children }) {
	return (
		<div>
			<h1 className="text-base text-primary uppercase font-semibold w-full border-b border-gray-100 pb-2">
				{children}
			</h1>
		</div>
	);
}
