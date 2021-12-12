import React from "react";
import FixedRoundBox from "../common/FixedRoundBox";
import { Link } from "gatsby";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../../css/dashboard/calendar.css";

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
                <h3 className="text-md font-semibold mb-2">Meetings</h3>
                <Calendar
                    localizer={localizer}
                    events={meetinsList}
                    defaultDate={new Date()}
                    defaultView="month"
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: "300px" }}
                    views={["month", "day"]}
                    popup={false}
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
                    <h4 className="text-xs">View all</h4>
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
