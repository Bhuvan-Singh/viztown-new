import React from "react";
import FixedRoundBox from "../common/FixedRoundBox";
import { Link } from "gatsby";
import { Calendar, momentLocalizer, ToolBar } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../../css/dashboard/calendar.css";

const CustomToolbar = (toolbar) => {
	const goToMonthView = () => {
		toolbar.onView("month");

		// setTimeout(() => {
		// 	this.setOffRangeDateStyle();
		// }, 100);
	};
	const goToBack = () => {
		toolbar.date.setMonth(toolbar.date.getMonth() - 1);
		toolbar.onNavigate("prev");
	};

	const goToNext = () => {
		toolbar.date.setMonth(toolbar.date.getMonth() + 1);
		toolbar.onNavigate("next");
	};

	const goToCurrent = () => {
		const now = new Date();
		toolbar.date.setMonth(now.getMonth());
		toolbar.date.setYear(now.getFullYear());
		toolbar.onNavigate("current");
	};

	const label = () => {
		const date = moment(toolbar.date);
		return (
			<span>
				{date.format("MMMM")}
				<span> {date.format("YYYY")}</span>
			</span>
		);
	};

	return (
		<div className="toolbar-container flex absolute top-5 right-8 text-sm">
			<div className="back-next-buttons flex">
				{/* <button className={"btn-current"} onClick={goToCurrent}>
                    Today
                </button> */}
				<div className="flex items-center space-x-1">
					<button className={"btn-back "} onClick={goToBack}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4 text-gray-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					</button>

					<label className="label-date text-xs font-normal text-gray-500 uppercase">
						{label()}
					</label>
					<button className={"btn-next"} onClick={goToNext}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4 text-gray-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>
					<div
						onClick={goToMonthView}
						className="cursor-pointer font-bold"
					>
						M
					</div>
				</div>
			</div>
		</div>
	);
};

export default function Meetings({ todaysMeetings, meetings }) {
	const localizer = momentLocalizer(moment);
	let meetinsList = [];
	meetings.map((meeting, index) => {
		const endTime = moment
			.utc(meeting.time, "H:mm")
			.add(meeting.duration, "minutes")
			.format("H:mm");
		const dateArray = meeting.date.split("-");
		const startTimeArray = meeting.time.split(":");
		const endTimeArray = endTime.split(":");

		meetinsList.push({
			id: index,
			title: `${meeting.clientName}`,
			start: new Date(
				dateArray[0],
				dateArray[1] - 1,
				dateArray[2],
				startTimeArray[0],
				startTimeArray[1],
				0
			),
			end: new Date(
				dateArray[0],
				dateArray[1] - 1,
				dateArray[2],
				endTimeArray[0],
				endTimeArray[1],
				0
			),
		});
	});

	return (
		<FixedRoundBox>
			<div className="flex-col justify-between items-center text-primary">
				<h3 className="text-sm font-medium mb-4">Upcoming meetings</h3>
				<Calendar
					localizer={localizer}
					events={meetinsList}
					defaultDate={new Date()}
					defaultView="month"
					startAccessor="start"
					endAccessor="end"
					style={{ height: "300px" }}
					views={["month", "day"]}
					// views={["month"]}
					popup={true}
					components={{
						toolbar: CustomToolbar,
					}}
				/>
			</div>
			<div className="absolute bottom-0 left-0 h-10 flex items-center justify-between w-full py-7 px-5 border-t border-gray-100">
				<h6 className="text-xs text-red-500 font-semibold">
					{todaysMeetings.length} Meetings for today
				</h6>
				<Link
					to="/dashboard/meetings"
					className="flex items-center space-x-2"
				>
					<h4 className="text-xs">View</h4>
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
