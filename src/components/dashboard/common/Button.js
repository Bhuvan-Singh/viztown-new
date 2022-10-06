import React from "react";
import { Link } from "gatsby";

export default function Button({ children, to }) {
	return (
		<Link
			to={to}
			className="flex items-center space-x-2 bg-gray-200 rounded-full text-xs font-medium py-2 px-4"
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
			{children}
		</Link>
	);
}
