import React, {createContext, useReducer, useEffect} from 'react'

export const FilterStateContext = createContext();
export const FilterDispatchContext = createContext();

let initialFilters = {
    category: 'lease',
    location: [],
    type: [],
    budget: [750000,5000000]
}
if(typeof window !== 'undefined' && window.localStorage){
    if (window.localStorage.getItem('filter')) {
        initialFilters = JSON.parse(localStorage.getItem("filter"));
    }
}

const filterReducer = (state, action) => {
    switch (action.type) {
        case 'CATEGORY': {
            return {
                ...state,
                category: action.payload,
            }
        }
            break;

        case 'LOCATION' : {
            return {
                ...state,
                location: action.payload,
            }
        }
            break;
        
        case 'TYPE' : {
            return {
                ...state,
                type: action.payload,
            }
        }
            break;

        case 'BUDGET' : {
            return {
                ...state,
                budget: action.payload,
            }
        }
            break;
        default:
            throw new Error('Bad Action Type')
    }
}

export default function FilterContextProvider({children}) {
    const [filter, filterDispatcher] = useReducer(filterReducer, initialFilters);
    
    return(
        <FilterStateContext.Provider value={filter}>
            <FilterDispatchContext.Provider value={filterDispatcher}>
                {children}
            </FilterDispatchContext.Provider>
        </FilterStateContext.Provider>
    )
}