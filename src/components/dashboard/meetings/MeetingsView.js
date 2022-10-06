import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import Toolbar from "./Toolbar";
import Meetings from "./Meetings";
import axiosConfig from "../../../axiosConfig";
import { date } from "yup";
import * as dayjs from "dayjs";
import * as isoWeek from "dayjs/plugin/isoWeek";

export default function MeetingsView() {
	dayjs.extend(isoWeek);
	// const meetingsDefault = [
	//     {
	//         id: 1,
	//         organizer: "Bhuvan Singh",
	//         clientName: "Rupin Wadhwa",
	//         clientEmailId: "rupin@cyberworx.in",
	//         date: "2021-11-28",
	//         time: "13:00",
	//         duration: "60",
	//         propertyId: 2,
	//         propertySlug: "signature-project",
	//         vendorId: 2,
	//         propertyName: "Signature Project",
	//         propertyLocation: "101 Indian Road",
	//         agenda: "Aenean aliquet nisi sit amet vestibulum varius. Cras tempor tempus dui et pharetra. Morbi odio urna, consectetur vel dignissim ac, dapibus at eros. Pellentesque interdum elit vitae nisl interdum luctus a et enim. In in nisi dolor. In rutrum euismod metus non suscipit. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
	//         createDate: "2021-11-24",
	//     },
	//     {
	//         id: 2,
	//         organizer: "Bhuvan Singh",
	//         clientName: "Akhshay Nanoti",
	//         clientEmailId: "akshay@gmail.in",
	//         date: "2021-11-25",
	//         time: "10:00",
	//         duration: "30",
	//         propertyId: 2,
	//         propertySlug: "signature-project",
	//         vendorId: 2,
	//         propertyName: "New Rise Apartment",
	//         propertyLocation: "105 Indian Road",
	//         agenda: "Aenean aliquet nisi sit amet vestibulum varius. Cras tempor tempus dui et pharetra. Morbi odio urna, consectetur vel dignissim ac, dapibus at eros. Pellentesque interdum elit vitae nisl interdum luctus a et enim. In in nisi dolor. In rutrum euismod metus non suscipit. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
	//         createDate: "2021-11-24",
	//     },
	//     {
	//         id: 3,
	//         organizer: "Bhuvan Singh",
	//         clientName: "Naveen Singh",
	//         clientEmailId: "naveen@gmail.in",
	//         date: "2021-11-26",
	//         time: "18:30",
	//         duration: "45",
	//         propertyId: 2,
	//         propertySlug: "signature-project",
	//         vendorId: 2,
	//         propertyName: "Shiv Shakti Heights",
	//         propertyLocation: "103 Indian Road",
	//         agenda: "Aenean aliquet nisi sit amet vestibulum varius. Cras tempor tempus dui et pharetra. Morbi odio urna, consectetur vel dignissim ac, dapibus at eros. Pellentesque interdum elit vitae nisl interdum luctus a et enim. In in nisi dolor. In rutrum euismod metus non suscipit. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
	//         createDate: "2021-11-24",
	//     },
	//     {
	//         id: 4,
	//         organizer: "Bhuvan Singh",
	//         clientName: "Jatin Shekhar",
	//         clientEmailId: "jatin@gmail.in",
	//         date: "2021-11-27",
	//         time: "11:15",
	//         duration: "45",
	//         propertyId: 2,
	//         propertySlug: "signature-project",
	//         vendorId: 2,
	//         propertyName: "Signature Project Again",
	//         propertyLocation: "Lake bluff, illinios 6000877",
	//         agenda: "Aenean aliquet nisi sit amet vestibulum varius. Cras tempor tempus dui et pharetra. Morbi odio urna, consectetur vel dignissim ac, dapibus at eros. Pellentesque interdum elit vitae nisl interdum luctus a et enim. In in nisi dolor. In rutrum euismod metus non suscipit. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
	//         createDate: "2021-11-24",
	//     },
	// ];

	const [meetings, setMeetings] = useState(null);
	const [todaysMeetings, setTodaysMeetings] = useState(null);
	const [upcomingMeetings, setUpcomingMeetings] = useState(null);
	const [pastMeetings, setPastMeetings] = useState(null);
	const [activeMeeting, setActiveMeeting] = useState(null);
	const [activeMeetingView, setActiveMeetingView] = useState(false);
	const [view, setView] = useState(1);

	// useEffect(() => {
	//     setMeetings(meetingsDefault);
	// }, []);

	useEffect(() => {
		if (meetings !== null) {
			const dateToday = new Date();
			dateToday.setHours(0, 0, 0, 0);
			const todaysMeetingsList = meetings.filter((meeting) => {
				const dateArray = meeting.date.split("-");
				const date = new Date(
					dateArray[0],
					parseInt(dateArray[1]) - 1,
					dateArray[2]
				);
				if (dateToday.getDate() == date.getDate()) {
					return meeting;
				}
			});
			const upcomingMeetingsList = meetings.filter((meeting) => {
				const dateArray = meeting.date.split("-");
				const date = new Date(
					dateArray[0],
					parseInt(dateArray[1]) - 1,
					dateArray[2]
				);
				if (dateToday < date) {
					return meeting;
				}
			});
			const pastMeetingsList = meetings.filter((meeting) => {
				const dateArray = meeting.date.split("-");
				const date = new Date(
					dateArray[0],
					parseInt(dateArray[1]) - 1,
					dateArray[2]
				);
				if (dateToday > date) {
					return meeting;
				}
			});

			setTodaysMeetings(todaysMeetingsList);
			setUpcomingMeetings(upcomingMeetingsList);
			setPastMeetings(pastMeetingsList);
			// setActiveMeeting(meetings[0]);
		}
		console.log(activeMeeting);
	}, [meetings]);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		axiosConfig
			.get("/getMeetingsList", {
				params: {
					uid: user.user.uid,
				},
			})
			.then(function (response) {
				setMeetings(response.data.data);
				// console.log(response.data.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const toggleActiveMeetingView = (id) => {
		const currentMeet = meetings.filter((meeting) => {
			return meeting.id === id;
		});
		setActiveMeetingView(true);
		setActiveMeeting(currentMeet[0]);
	};
	const closeActiveMeetingView = () => {
		setActiveMeetingView(false);
	};

	const handleChange = (e) => {
		setView(e.target.value);
	};

	useEffect(() => {
		if (upcomingMeetings != null) {
			const viewFilteredArray = meetings.filter((meeting) => {
				const currentMonth = dayjs().month();
				const meetingMonth = dayjs(meeting.date).month();
				const currentWeek = dayjs().isoWeek();
				const meetingWeek = dayjs(meeting.date).isoWeek();
				if (dayjs(meeting.date).isAfter(dayjs())) {
					if (view == 1) {
						if (currentWeek === meetingWeek) {
							return meeting;
						}
					} else if (view == 2) {
						if (currentMonth === meetingMonth) {
							return meeting;
						}
					} else if (view == 3) {
						if (currentMonth < meetingMonth) {
							return meeting;
						}
					} else {
						return meeting;
					}
				}
			});
			// console.log(dayjs().isoWeek());
			// console;
			setUpcomingMeetings(viewFilteredArray);
		}
	}, [view]);
	// const [todaysMeetings, setTodaysMeetings] = useState(null);

	return (
		<div className="vt-dashboard-meetingOverview relative">
			{meetings !== null && pastMeetings !== null ? (
				<>
					<Toolbar
						count={meetings.length + 1 - pastMeetings.length}
					/>
					{todaysMeetings !== null ? (
						<div className="py-8 border-t border--gray-100">
							<h4 className="text-black text-sm font-normal mb-4">
								{/* <span className="">
									{todaysMeetings.length}
								</span>{" "} */}
								Meetings Scheduled Today
							</h4>
							<Meetings
								meetings={todaysMeetings}
								meetingToday={true}
								toggleActiveMeetingView={
									toggleActiveMeetingView
								}
							/>
						</div>
					) : (
						""
					)}
					{upcomingMeetings !== null ? (
						<div className="py-8 border-t border--gray-100">
							<div className="flex gap-3 items-center mb-4">
								<h4 className="text-black text-sm font-normal">
									{/* <span className="">
									{upcomingMeetings.length}
								</span>{" "} */}
									Upcoming Meetings
								</h4>
								<div className="">
									<span className="text-xs font-semibold mr-3"></span>
									<select
										name
										className="outline-none py-3 px-8 text-xs font-medium rounded-full bg-dashboardGrey"
										onChange={handleChange}
									>
										<option value="0">Show All</option>
										<option value="1">This Week</option>
										<option value="2">This Month</option>
										<option value="3">Next Month</option>
									</select>
								</div>
							</div>
							<Meetings
								meetings={upcomingMeetings}
								toggleActiveMeetingView={
									toggleActiveMeetingView
								}
							/>
						</div>
					) : (
						""
					)}

					{pastMeetings !== null ? (
						// <div className="py-8 border-t border--gray-100">
						// 	<h4 className="text-black text-sm font-medium mb-4">
						// 		<span className="">{pastMeetings.length}</span>{" "}
						// 		Past Meetings
						// 	</h4>
						// 	<Meetings
						// 		meetings={pastMeetings}
						// 		toggleActiveMeetingView={
						// 			toggleActiveMeetingView
						// 		}
						// 	/>
						// </div>
						<></>
					) : (
						""
					)}
					<div
						className={`${
							activeMeetingView
								? "bg-black bg-opacity-30 fixed h-screen w-screen left-0 top-0"
								: ""
						}`}
					>
						<div
							className={`fixed h-168 w-96 bg-white top-8 border border-gray-100 right-0 shadow-lg  border-gray-100 transition-all duration-500 rounded-l-xl z-10 ${
								!activeMeetingView ? "-mr-96 " : ""
							}`}
						>
							{activeMeeting !== null ? (
								<div className={`pt-2`}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 absolute right-2 text-red-400 cursor-pointer"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										onClick={closeActiveMeetingView}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<div className="flex justify-between items-center py-5 px-8 border-b border-gray-300 border-opacity-50">
										<div className="flex-col space-y-1">
											<h5 className="text-base font-medium text-primary">
												With {activeMeeting.clientName}
												<br />
											</h5>
											<h5 className="uppercase text-xs font-bold text-dashboardBlue flex gap-2 items-center">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5 text-dashboardBlue cursor-pointer"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
													/>
												</svg>
												<span className="text-sm mt-1">
													{dayjs().isSame(
														dayjs(
															activeMeeting.date
														),
														"day"
													)
														? "Today,"
														: ""}

													{dayjs(
														"1/1/1 " +
															activeMeeting.time
													).format("hh:mm a")}
												</span>
											</h5>
										</div>
									</div>
									<div className="flex justify-between items-center py-5 px-8 border-b border-gray-300 border-opacity-50">
										<div className="flex-col space-y-3">
											<h5 className="uppercase text-xs font-semibold text-gray-400 mb-3">
												About Meeting
											</h5>

											<h5 className="capitalize text-xs font-medium text-primary flex items-center gap-2">
												<div className="h-9 w-9 rounded-md bg-gray-200 flex items-center justify-center">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-6 w-6 text-gray-400"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path
															fillRule="evenodd"
															d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
															clipRule="evenodd"
														/>
													</svg>
												</div>
												<div>
													<div className="text-xs font-light">
														Date
													</div>
													<span className="text-primary text-sm font-medium space-x-1">
														<span>
															{dayjs(
																activeMeeting.date
															).format(
																"MMMM D, YYYY"
															)}
														</span>
													</span>
												</div>
											</h5>

											<h5 className="capitalize text-xs font-medium text-primary flex items-center gap-2">
												<div className="h-9 w-9 rounded-md bg-gray-200 flex items-center justify-center">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-6 w-6 text-gray-400"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path
															fillRule="evenodd"
															d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
															clipRule="evenodd"
														/>
													</svg>
												</div>
												<div>
													<div className="text-xs font-light">
														Duration
													</div>
													<span className="text-primary text-sm font-medium space-x-1">
														<span>
															{
																activeMeeting.duration
															}
														</span>
														<span>Minutes</span>
													</span>
												</div>
											</h5>

											<h5 className="capitalize text-xs font-medium text-primary flex items-center gap-2">
												<div className="h-9 w-9 rounded-md bg-gray-200 flex items-center justify-center">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-6 w-6 text-gray-400"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path
															fillRule="evenodd"
															d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
															clipRule="evenodd"
														/>
													</svg>
												</div>
												<div>
													<div className="text-xs font-light">
														Organizer
													</div>
													<span className="text-primary text-sm font-medium space-x-1">
														<span>
															{
																activeMeeting.organizer
															}
														</span>
													</span>
												</div>
											</h5>

											<h5 className="capitalize text-xs font-medium text-primary flex items-center gap-2">
												<div className="h-9 w-9 rounded-md bg-gray-200 flex items-center justify-center">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-6 w-6 text-gray-400"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path
															fillRule="evenodd"
															d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
															clipRule="evenodd"
														/>
													</svg>
												</div>
												<div>
													<div className="text-xs font-light">
														Client
													</div>
													<span className="text-primary text-sm font-medium space-x-1">
														<span>
															{
																activeMeeting.clientEmailId
															}
														</span>
													</span>
												</div>
											</h5>

											{/* <h5 className="capitalize text-xs font-medium text-primary">
												Create Date :{" "}
												<span className="text-primary">
													{activeMeeting.createDate}
												</span>
											</h5> */}
										</div>
									</div>

									<div className="flex-col py-5 px-8 border-b border-gray-300 border-opacity-50">
										<div className="flex justify-between items-center">
											<h5 className="uppercase text-xs font-semibold text-gray-400">
												About Property
											</h5>
											<Link
												to="/property"
												className="text-xs text-dashboardBlue font-medium"
											>
												View Property
											</Link>
										</div>
										<div className="my-2">
											<h5 className="text-sm font-medium text-black">
												{activeMeeting.propertyName}
											</h5>
											<p className="flex gap-1 text-sm items-center">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-4 w-4 text-gray-500"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														fillRule="evenodd"
														d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
														clipRule="evenodd"
													/>
												</svg>
												<span className="capitalize text-xs font-light text-gray-500 mt-1">
													{
														activeMeeting.propertyLocation
													}
												</span>
											</p>
										</div>
									</div>

									<div className="flex-col py-5 px-8 border-b-0 border-gray-300 border-opacity-50 ">
										<h5 className="uppercase text-xs font-semibold text-gray-400">
											Meeting Agenda
										</h5>

										<div className="my-2">
											<p className="text-xs text-black font-normal h-24 overflow-scroll">
												{activeMeeting.agenda}
											</p>
										</div>
									</div>
									{/* <div className="flex justify-center items-center py-5 px-8">
									<div
										className={`bg-dashboardBlue bg-opacity-20 rounded-full text-dashboardBlue font-bold py-2 px-16 cursor-pointer text-sm`}
										meetingId={activeMeeting.id}
									>
										Share with client
									</div>
								</div> */}
								</div>
							) : (
								""
							)}
						</div>
					</div>
				</>
			) : (
				""
			)}
		</div>
	);
}
