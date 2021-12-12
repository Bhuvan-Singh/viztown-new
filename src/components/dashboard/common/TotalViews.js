import React from "react";
import * as styles from "../../../css/dashboard/total-views.module.css";

export default function TotalViews({ totalviews }) {
    return (
        <div className="vt-dashboard-totalViews">
            <h3 className="text-xl font-semibold">{totalviews}</h3>
            <div className="flex items-center space-x-4">
                <h4 className="text-lightGrey text-sm">Total Views</h4>
                <div
                    className={`text-sm flex items-center space-x-1 text-green-200 px-3 py-1 rounded-md ${styles.bgColor}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 ${styles.iconColor}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                    </svg>
                    <span className={`text-green-700 ${styles.textColor}`}>
                        ~
                    </span>
                </div>
            </div>
        </div>
    );
}
