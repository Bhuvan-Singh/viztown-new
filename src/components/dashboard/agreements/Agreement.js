import React from "react";
import { Link } from "gatsby";
import axiosConfig from "../../../axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Agreement({ data, user }) {
	const deleteAgreement = (e, id) => {
		if (!window.confirm("Do you want to delete agreement?")) {
			return;
		}
		axiosConfig
			.post("/deleteAgreement", {
				id: id,
			})
			.then(function (response) {
				// console.log(response.data)
				if (response.data.data) {
					toast.success("Deleted Successfully", {
						position: "top-right",
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
					document.getElementById(`agreement-${id}`).remove();
				} else {
					toast.errro("Something went wrong please try again", {
						position: "top-right",
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}
			})
			.catch(function (error) {});
	};
	return (
		<div
			className="border-2 border-gray-100 rounded-xl py-6 relative"
			id={`agreement-${data.id}`}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-4 w-4 text-red-400 absolute right-3 top-3 cursor-pointer"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				onClick={(e) => deleteAgreement(e, data.id)}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
				/>
			</svg>
			<div className="px-4 pb-4">
				<h3 className="font-semibold text-sm uppercase">
					{data.title}
				</h3>
			</div>
			<div className="flex items-center justify-between px-4 pb-4 border-b border-gray-100">
				<div className="text-sm">
					<div className="text-xs text-gray-400 uppercase">
						{data.date}
					</div>
					<div className="font-medium text-xs">
						{data.type === "1"
							? "Rent Agreement"
							: "Sale Agreement"}
					</div>
				</div>
				<a
					href={`${process.env.GATSBY_BASE_URL}/api/generateAgreement?agreement_id=${data.id}}&agreement_type=${data.type}&uid=${user.user.uid}`}
					target="_blank"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className={`h-5 w-5 ${
							data.type === "1"
								? "text-red-500"
								: "text-dashboardBlue"
						}`}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
						/>
					</svg>
				</a>
			</div>
			<div className="flex justify-between px-4 py-4 border-b border-gray-100">
				<div className="text-sm font-medium">
					<div className="text-xs text-gray-400 uppercase mb-1">
						{data.type === "1" ? "Lessor" : "Buyer"}
					</div>
					<div className="capitalize">{data.lessor}</div>
				</div>
				<div className="font-medium text-sm">
					<div className="text-xs text-gray-400 uppercase mb-1">
						{data.type === "1" ? "Lessee" : "Seller"}
					</div>
					<div className="capitalize">{data.lessee}</div>
				</div>
			</div>

			<div className="px-4 pt-4 ">
				<div className="text-sm flex justify-between mb-2">
					<div className="text-xs text-gray-400 uppercase font-semibold">
						Property Details
					</div>
					<Link
						to={`/dashboard/agreements/create/${
							data.type === "1" ? "rent" : "sale"
						}/${data.id}/lessor`}
						className="capitalize text-xs text-dashboardBlue"
					>
						Edit Agreement
					</Link>
				</div>
				<div>
					{/* <h3 class="font-semibold text-sm mb-1">Prius Global</h3> */}
					<div className="font-semibold text-sm flex items-center space-x-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4 text-gray-400"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
								clipRule="evenodd"
							/>
						</svg>
						<h3 class="text-gray-600 uppercase text-xs">
							{data.address}
						</h3>
					</div>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}
