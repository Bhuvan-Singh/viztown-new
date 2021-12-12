import React, { useState, useEffect, useContext } from "react";
import axiosConfig from "../../../axiosConfig";
import { Range, getTrackBackground } from "react-range";
import {
    FilterStateContext,
    FilterDispatchContext,
} from "../../../contexts/FilterContextProvider";

export default function Budget() {
    const STEP = 5000;
    const { currentRange, setCurrentRange, budgetRange } =
        useContext(FilterStateContext);
    const dispatch = useContext(FilterDispatchContext);
    const handleChange = (values) => {
        setCurrentRange(values);
    };
    const handleFinalChange = (values) => {
        dispatch({ type: "BUDGET", payload: values });
    };
    const toggleBudgetDropdown = () => {
        const b = document
            .getElementById("vt-search-relative-budget")
            .classList.toggle("hidden");
    };
    const values = currentRange;
    const numDifferentiation = (value) => {
        var val = Math.abs(value);
        if (val >= 10000000) {
            value = (value / 10000000).toFixed(2) + " Cr";
        } else if (val >= 100000) {
            value = (value / 100000).toFixed(2) + " Lac";
        } else if (val >= 1000) value = parseFloat(value).toLocaleString("en");

        return value;
    };
    const defaultValue = [];

    return (
        <div className={`lg:w-48 relative`}>
            <div
                className="vt-search-budget flex items-center justify-between lg:px-4 py-4 cursor-pointer relative"
                onClick={toggleBudgetDropdown}
            >
                <span
                    className="vt-search-title text-xs text-secondary absolute top-0 font-semibold"
                    style={{ fontSize: "10px" }}
                >
                    ₹ Budget
                </span>
                <output
                    className="flex justify-between items-center space-x-2 text-xs text-primary no-wrap"
                    style={{ marginTop: "0px", fontWeight: "400" }}
                    id="output"
                >
                    <div className="font-semibold">
                        {numDifferentiation(currentRange[0])}
                    </div>
                    <div className="font-semibold">To</div>
                    <div className="font-semibold">
                        {numDifferentiation(currentRange[1])}
                    </div>
                </output>

                <span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-primary"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
            </div>

            <div
                id="vt-search-relative-budget"
                className="vt-search-relative absolute w-80 bg-grey top-full left-0 shadow-md rounded-b-md hidden"
            >
                <div
                    onClick={toggleBudgetDropdown}
                    className="absolute right-1 top-1 cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 font-bold"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </div>
                <div className="vt-search-dropdown text-sm text-primary p-3">
                    {typeof window !== "undefined" && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                flexWrap: "wrap",
                            }}
                        >
                            {budgetRange === null ? (
                                ""
                            ) : (
                                <>
                                    <Range
                                        values={currentRange}
                                        step={STEP}
                                        min={budgetRange[0]}
                                        max={budgetRange[1]}
                                        onChange={(values) => {
                                            handleChange(values);
                                        }}
                                        onFinalChange={(values) => {
                                            handleFinalChange(values);
                                        }}
                                        renderTrack={({ props, children }) => (
                                            <div
                                                onMouseDown={props.onMouseDown}
                                                onTouchStart={
                                                    props.onTouchStart
                                                }
                                                style={{
                                                    ...props.style,
                                                    height: "36px",
                                                    display: "flex",
                                                    width: "100%",
                                                }}
                                            >
                                                <div
                                                    ref={props.ref}
                                                    style={{
                                                        height: "5px",
                                                        width: "100%",
                                                        borderRadius: "4px",
                                                        background:
                                                            getTrackBackground({
                                                                values,
                                                                colors: [
                                                                    "#ccc",
                                                                    "#ffca18",
                                                                    "#ccc",
                                                                ],
                                                                min: budgetRange[0],
                                                                max: budgetRange[1],
                                                            }),
                                                        alignSelf: "center",
                                                    }}
                                                >
                                                    {children}
                                                </div>
                                            </div>
                                        )}
                                        renderThumb={({ props, isDragged }) => (
                                            <div
                                                {...props}
                                                style={{
                                                    ...props.style,
                                                    height: "15px",
                                                    width: "15px",
                                                    borderRadius: "50%",
                                                    backgroundColor: "#ffca18",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    outline: "none",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        height: "2px",
                                                        width: "2px",
                                                        backgroundColor:
                                                            isDragged
                                                                ? "#ffca18"
                                                                : "#ffca18",
                                                    }}
                                                />
                                            </div>
                                        )}
                                    />
                                    <output
                                        className="flex justify-between items-center w-full"
                                        style={{
                                            marginTop: "10px",
                                            fontSize: "12px",
                                            fontWeight: "600",
                                        }}
                                        id="output"
                                    >
                                        <div>
                                            Min :{" "}
                                            {numDifferentiation(
                                                currentRange[0]
                                            )}
                                        </div>{" "}
                                        <div>
                                            {" "}
                                            Max :{" "}
                                            {numDifferentiation(
                                                currentRange[1]
                                            )}
                                        </div>
                                    </output>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
