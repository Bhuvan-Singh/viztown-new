import React from "react";
import Meeting from "./Meeting";
export default function Meetings({
    meetings,
    meetingToday,
    toggleActiveMeetingView,
}) {
    return (
        <div className="grid grid-cols-4 gap-4">
            {meetings.map((meeting, key) => {
                return (
                    <Meeting
                        key={key}
                        meetingToday={meetingToday}
                        meeting={meeting}
                        toggleActiveMeetingView={toggleActiveMeetingView}
                    />
                );
            })}
        </div>
    );
}
