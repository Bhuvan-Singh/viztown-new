import React from "react";
import { Link } from "gatsby";

export default function Meeting({
    meeting,
    meetingToday = false,
    toggleActiveMeetingView,
}) {
    const handleClick = (id) => {
        toggleActiveMeetingView(id);
    };
    return (
        <div
            className={`${
                meetingToday
                    ? "bg-dashboardBlue bg-opacity-20"
                    : "border-2 border-gray-100"
            } rounded-lg`}
        >
            <div className="flex justify-between items-center p-5 border-b border-gray-300 border-opacity-50">
                <div className="flex-col space-y-1">
                    <h5 className="uppercase text-sm font-semibold text-gray-500">
                        With {meeting.clientName} <br />
                    </h5>
                    <h5 className="uppercase text-sm font-bold text-dashboardBlue">
                        {meetingToday
                            ? `Today, ${meeting.time}`
                            : `${meeting.date}, ${meeting.time}`}
                    </h5>
                    {/* <h5 className="uppercase text-xs font-semibold text-dashboardBlue">
                        Duration: {meeting.duration} Min
                    </h5> */}
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-dashboardBlue cursor-pointer"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    onClick={() => {
                        handleClick(meeting.id);
                    }}
                >
                    <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>

            <div className="flex-col p-5 border-b border-gray-300 border-opacity-50">
                <div className="flex justify-between items-center">
                    <h5 className="uppercase text-sm font-semibold text-gray-500">
                        About Property
                    </h5>
                    <a
                        href={`/showcase/${meeting.propertySlug}`}
                        className="text-xs text-dashboardBlue font-semibold"
                        target="_blank"
                    >
                        View Property
                    </a>
                </div>
                <div className="my-2">
                    <h5 className="text-md font-bold text-gray-700">
                        {meeting.propertyName}
                    </h5>
                    <p className="flex space-x-1 text-sm items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-700"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>{meeting.propertyLocation}</span>
                    </p>
                </div>
            </div>

            <div className="flex justify-center items-center p-5">
                <div
                    className={`${
                        meetingToday
                            ? "bg-white"
                            : "bg-dashboardBlue bg-opacity-20"
                    } rounded-full text-dashboardBlue font-bold py-2 px-16 cursor-pointer text-sm`}
                    meetingId={meeting.id}
                >
                    Share with client
                </div>
            </div>
        </div>
    );
}
