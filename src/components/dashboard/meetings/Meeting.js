import React from "react";
import { Link } from "gatsby";
import axiosConfig from "../../../axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as dayjs from "dayjs";
export default function Meeting({
	meeting,
	meetingToday = false,
	toggleActiveMeetingView,
}) {
	const handleClick = (id) => {
		toggleActiveMeetingView(id);
	};
	const deleteMeeting = (e, id) => {
		if (!window.confirm("Do you want to delete agreement?")) {
			return;
		}
		axiosConfig
			.post("/deleteMeeting", {
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
					document.getElementById(`meeting-${id}`).remove();
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
			className={`${
				meetingToday
					? "bg-dashboardBlue bg-opacity-10"
					: "border-2 border-gray-100"
			} rounded-xl`}
			id={`meeting-${meeting.id}`}
		>
			<div className="flex justify-between items-center p-6 border-b border-gray-300 border-opacity-50 relative">
				<div className="flex-col space-y-1">
					<h5 className="uppercase text-xs font-semibold text-gray-400">
						With {meeting.clientName} <br />
					</h5>
					<h5 className=" text-base font-semibold text-dashboardBlue">
						{meetingToday
							? `Today, ${dayjs("1/1/1 " + meeting.time).format(
									"hh:mm a"
							  )}`
							: `${dayjs(meeting.date).format(
									"MMMM D, YYYY"
							  )}, ${dayjs("1/1/1 " + meeting.time).format(
									"hh:mm a"
							  )}`}
					</h5>
					{/* <h5 className="uppercase text-xs font-regular text-dashboardBlue">
                        Duration: {meeting.duration} Min
                    </h5> */}
				</div>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5 text-dashboardBlue cursor-pointer"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					onClick={() => {
						handleClick(meeting.id);
					}}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
			</div>

			<div className="flex-col py-8 px-6 border-opacity-50 relative">
				<div className="flex justify-between items-center mb-4">
					<h5 className="uppercase text-xs font-semibold text-gray-400">
						About Property
					</h5>
					<a
						href={`/showcase/${meeting.propertySlug}`}
						className="text-xs text-dashboardBlue font-regular"
						target="_blank"
					>
						View Property
					</a>
				</div>
				<div className="my-2 space-y-1">
					<h5 className="text-sm font-medium text-black">
						{meeting.propertyName}
					</h5>
					<p className="grid grid-cols-12 space-x-1 text-xs items-start">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4 text-gray-500 col-span-1"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="text-gray-500 col-span-11">
							{meeting.propertyLocation}
						</span>
					</p>
				</div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-4 w-4 text-red-400 absolute right-3 bottom-3 cursor-pointer"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					onClick={(e) => deleteMeeting(e, meeting.id)}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
					/>
				</svg>
			</div>

			{/* <div className="flex justify-center items-center p-5">
				<div
					className={`${
						meetingToday
							? "bg-white"
							: "bg-dashboardBlue bg-opacity-20"
					} rounded-full text-dashboardBlue font-semibold py-2 px-16 cursor-pointer text-sm`}
					meetingId={meeting.id}
				>
					Share with client
				</div>
			</div> */}
			<ToastContainer />
		</div>
	);
}
