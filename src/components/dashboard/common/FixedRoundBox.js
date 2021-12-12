import React from "react";
import Header from "./Header";

export default function FixedRoundBox({ children }) {
    return (
        <div>
            <div
                className="rounded-xl border border-gray-200 h-96 2xl:h-96 p-5 relative"
                style={{ height: "25.8rem" }}
            >
                {children}
            </div>
        </div>
    );
}
