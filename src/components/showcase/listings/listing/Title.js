import React from "react";

export default function Title({ title }) {
	return (
		<div className="vt-listing-name mt-4 mb-2 relative">
			<h3 className="font-bold text-black text-sm">{title}</h3>
		</div>
	);
}
