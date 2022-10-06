import React from "react";
import { Link } from "gatsby";
import FixedRoundBox from "../common/FixedRoundBox";

export default function Proposals() {
	return (
		<FixedRoundBox>
			<div className="flex justify-between items-center text-primary">
				<h3 className="text-sm font-medium">Ongoing proposals</h3>
			</div>
			<div className="py-3 space-y-5">
				<div className="flex justify-between items-center">
					<div>
						<h3 className="text-sm font-medium text-black">
							Sukant Sharma
						</h3>
						<h4 className="text-xs">
							<span className="text-gray-400">Property: </span>
							101 Indian Road
						</h4>
					</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 text-gray-500"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<div className="flex justify-between items-center">
					<div>
						<h3 className="text-sm font-medium text-black">
							Sukant Sharma
						</h3>
						<h4 className="text-xs">
							<span className="text-gray-400">Property: </span>
							101 Indian Road
						</h4>
					</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 text-gray-500"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<div className="flex justify-between items-center">
					<div>
						<h3 className="text-sm font-medium text-black">
							Sukant Sharma
						</h3>
						<h4 className="text-xs">
							<span className="text-gray-400">Property: </span>
							101 Indian Road
						</h4>
					</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 text-gray-500"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
			</div>
			<div className="absolute bottom-0 left-0 h-10 flex items-center justify-center w-full py-7 px-5 border-t border-gray-100">
				<Link
					to="/dashboard/proposals"
					className="flex items-center space-x-2"
				>
					<h6 className="text-xs font-normal">
						View all ongoing proposals
					</h6>
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
		</FixedRoundBox>
	);
}
