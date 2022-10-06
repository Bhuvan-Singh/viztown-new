import React from "react";

export default function FeaturedImg({ featuredImage, fullHeight = true }) {
	return (
		<div className="vt-listing-image relative">
			{fullHeight ? (
				<img
					src={featuredImage}
					className="h-52 w-full object-cover"
					alt=""
				/>
			) : (
				<img
					src={featuredImage}
					className="h-36 w-full object-cover"
					alt=""
				/>
			)}
		</div>
	);
}
