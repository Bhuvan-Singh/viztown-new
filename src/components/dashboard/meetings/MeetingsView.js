import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import Toolbar from "./Toolbar";
import Meetings from "./Meetings";
import axiosConfig from "../../../axiosConfig";

export default function MeetingsView() {
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

    // useEffect(() => {
    //     setMeetings(meetingsDefault);
    // }, []);

    useEffect(() => {
        if (meetings !== null) {
            const dateToday = new Date();
            dateToday.setHours(0, 0, 0, 0);
            console.log(meetings);
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
            setActiveMeeting(meetings[0]);
        }
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
                console.log(response.data.data);
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

    // const [todaysMeetings, setTodaysMeetings] = useState(null);

    return (
        <div className="vt-dashboard-meetingOverview relative">
            {meetings !== null ? (
                <>
                    <Toolbar count={meetings.length} />
                    {todaysMeetings !== null ? (
                        <div className="py-8 border-t border--gray-100">
                            <h4 className="text-gray-600 text-sm font-semibold mb-4">
                                <span className="">
                                    {todaysMeetings.length}
                                </span>{" "}
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
                            <h4 className="text-gray-600 text-sm font-semibold mb-4">
                                <span className="">
                                    {upcomingMeetings.length}
                                </span>{" "}
                                Upcoming Meetings
                            </h4>
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
                        <div className="py-8 border-t border--gray-100">
                            <h4 className="text-gray-600 text-sm font-semibold mb-4">
                                <span className="">{pastMeetings.length}</span>{" "}
                                Past Meetings
                            </h4>
                            <Meetings
                                meetings={pastMeetings}
                                toggleActiveMeetingView={
                                    toggleActiveMeetingView
                                }
                            />
                        </div>
                    ) : (
                        ""
                    )}

                    <div
                        className={`fixed h-screen w-96 bg-white top-0 right-0 shadow-lg  border-gray-100 transition-all duration-500 ${
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
                                        <h5 className="uppercase text-xl font-bold text-primary">
                                            With {activeMeeting.clientName}{" "}
                                            <br />
                                        </h5>
                                        <h5 className="uppercase text-sm font-bold text-dashboardBlue">
                                            Today, {activeMeeting.time} AM
                                        </h5>
                                    </div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-dashboardBlue"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="flex justify-between items-center py-5 px-8 border-b border-gray-300 border-opacity-50">
                                    <div className="flex-col space-y-1">
                                        <h5 className="uppercase text-sm font-bold text-dashboardBlue mb-2 underline">
                                            Meeting Details
                                        </h5>
                                        <h5 className="capitalize text-sm font-semibold text-primary">
                                            Duration :{" "}
                                            <span className="text-primary">
                                                {activeMeeting.duration} Min
                                            </span>
                                        </h5>
                                        <h5 className="capitalize text-sm font-semibold text-primary">
                                            Organizer :{" "}
                                            <span className="text-primary">
                                                {activeMeeting.organizer}
                                            </span>
                                        </h5>
                                        <h5 className="capitalize text-sm font-semibold text-primary">
                                            Client Email Id :{" "}
                                            <span className="text-primary">
                                                {activeMeeting.clientEmailId}
                                            </span>
                                        </h5>
                                        <h5 className="capitalize text-sm font-semibold text-primary">
                                            Create Date :{" "}
                                            <span className="text-primary">
                                                {activeMeeting.createDate}
                                            </span>
                                        </h5>
                                    </div>
                                </div>

                                <div className="flex-col py-5 px-8 border-b border-gray-300 border-opacity-50">
                                    <div className="flex justify-between items-center">
                                        <h5 className="uppercase text-sm font-bold text-dashboardBlue mb-2 underline">
                                            About Property
                                        </h5>
                                        <Link
                                            to="/property"
                                            className="text-xs text-dashboardBlue font-semibold"
                                        >
                                            View Property
                                        </Link>
                                    </div>
                                    <div className="my-2">
                                        <h5 className="text-md font-bold text-gray-700">
                                            {activeMeeting.propertyName}
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
                                            <span>
                                                {activeMeeting.propertyLocation}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex-col py-5 px-8 border-b border-gray-300 border-opacity-50 ">
                                    <h5 className="uppercase text-sm font-bold text-dashboardBlue mb-2 underline">
                                        Meeting Agenda
                                    </h5>

                                    <div className="my-2">
                                        <p className="text-sm text-gray-700 font-medium">
                                            {activeMeeting.agenda}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center py-5 px-8">
                                    <div
                                        className={`bg-dashboardBlue bg-opacity-20 rounded-full text-dashboardBlue font-bold py-2 px-16 cursor-pointer text-sm`}
                                        meetingId={activeMeeting.id}
                                    >
                                        Share with client
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </>
            ) : (
                ""
            )}
        </div>
    );
}
