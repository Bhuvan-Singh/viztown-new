import React, { createContext, useReducer, useEffect, useState } from "react"; 

export const FilterStateContext = createContext();
export const FilterDispatchContext = createContext();

let initialFilters = {
  category: null,
  location: [],
  type: [],
  budget: [0, 0],
};
// if (typeof window !== "undefined" && window.localStorage) {
//   if (window.localStorage.getItem("filter")) {
//     initialFilters = JSON.parse(localStorage.getItem("filter"));
//   }
// }

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
 
//   if (typeof window !== "undefined" && window.localStorage) {
//     window.localStorage.setItem("filter");
//   }
};

export default function FilterContextProvider({ children }) {
//   const [filterSearchState, setFilterSearchState] = useState(null);
  const [filterState, filterDispatcher] = useReducer(filterReducer, initialFilters);

  const updateData = () => {
      console.log(filterState)
  }
  // useEffect(()=>{
  //     axiosConfig.get('/propertyBudgetRange')
  //     .then(function (response) {
  //         // setListings(response.data.data);
  //         const budgetRange = [parseInt(response.data.data.minValue),parseInt(response.data.data.maxValue)]
  //         filterDispatcher({ type: 'BUDGET', payload: budgetRange })
  //     })
  //     .catch(function (error) {
  //         console.log(error);
  //     })
  // },[])
  return (
    <FilterStateContext.Provider value={{filterState,updateData}}>
      <FilterDispatchContext.Provider value={filterDispatcher}>
        {children}
      </FilterDispatchContext.Provider>
    </FilterStateContext.Provider>
  );
}
