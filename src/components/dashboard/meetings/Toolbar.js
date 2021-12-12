import React, { useState, useEffect } from "react";
import { Link } from "gatsby";

export default function AgreementToolbar({
    onSortChange,
    handleSearch,
    count,
}) {
    const handleChange = (e) => {
        onSortChange(e.target.value);
    };

    const handleSearchChange = (e) => {
        handleSearch(e.target.value);
    };
    return (
        <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-8">
                <div>
                    <h5 className="font-bold">Meetings</h5>
                    <Link className="text-dashboardBlue text-xs">
                        {count} Total Meetings
                    </Link>
                </div>
                <Link
                    to="/dashboard/meetings/create"
                    className="flex items-center space-x-2 bg-dashboardBlue text-white rounded-full text-xs font-semibold py-2 px-4"
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
                    Create new meeting
                </Link>
            </div>
            <div className="flex items-center space-x-8">
                <div className="bg-dashboardGrey text-sm flex items-center py-2 px-4 space-x-2 rounded-full">
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
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <input
                        className="bg-dashboardGrey outline-none"
                        placeholder="Search Meeting"
                        onKeyUp={handleSearchChange}
                    />
                </div>
            </div>
        </div>
    );
}
