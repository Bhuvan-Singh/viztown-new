import React, { createContext, useReducer, useEffect, useState } from "react";
import axiosConfig from "../axiosConfig";
export const FilterStateContext = createContext();
export const FilterDispatchContext = createContext();

let initialFilters = {
    category: null,
    location: [],
    type: [],
    budget: [0, 0],
};

const filterReducer = (state, action) => {
    switch (action.type) {
        case "CATEGORY":
            {
                return {
                    ...state,
                    category: action.payload,
                };
            }
            break;

        case "LOCATION":
            {
                return {
                    ...state,
                    location: action.payload,
                };
            }
            break;

        case "TYPE":
            {
                return {
                    ...state,
                    type: action.payload,
                };
            }
            break;

        case "BUDGET":
            {
                return {
                    ...state,
                    budget: action.payload,
                };
            }
            break;
        default:
            throw new Error("Bad Action Type");
    }
};

export default function FilterContextProvider({ children }) {
    //   const [filterSearchState, setFilterSearchState] = useState(null);
    const [filterState, filterDispatcher] = useReducer(
        filterReducer,
        initialFilters
    );
    const [currentRange, setCurrentRange] = useState([0, 0]);
    const [budgetRange, setBudgetRange] = useState(null);

    useEffect(() => {
        axiosConfig
            .get("/propertyBudgetRange")
            .then(function (response) {
                setBudgetRange([0, parseInt(response.data.data.maxValue)]);
                setCurrentRange([
                    parseInt(response.data.data.minValue),
                    parseInt(response.data.data.maxValue),
                ]);
            })
            .catch(function (error) {});
    }, []);

    const updateData = () => {
        console.log(filterState);
    };

    return (
        <FilterStateContext.Provider
            value={{
                filterState,
                updateData,
                currentRange,
                setCurrentRange,
                budgetRange,
                setBudgetRange,
            }}
        >
            <FilterDispatchContext.Provider value={filterDispatcher}>
                {children}
            </FilterDispatchContext.Provider>
        </FilterStateContext.Provider>
    );
}
