import React from "react";

export default function Loader() {
    return (
        <div className="flex justify-center items-center w-full h-screen lg:h-auto lg:pt-60">
            <span className="font-semibold">
                <img
                    src={`${process.env.GATSBY_BASE_URL}/assets/backend/image/loader.gif`}
                    alt="loading"
                />
            </span>
        </div>
    );
}
