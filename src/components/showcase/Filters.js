import React, {
    useState,
    useEffect,
    useContext,
    useRef,
    useLayoutEffect,
} from "react";
import axiosConfig from "../../axiosConfig";
import { ListingContext } from "../../contexts/ListingContextProvider";
import { FilterStateContext } from "../../contexts/FilterContextProvider";
import { navigate } from "gatsby";

import Category from "./filters/Category";
import Budget from "./filters/Budget";
import Location from "./filters/Location";
import Type from "./filters/Type";
import FilterButton from "./filters/FilterButton";

const useWindowWidth = () => {
    const isBrowser = typeof window !== "undefined";
    const [width, setWidth] = useState(isBrowser ? window.innerWidth : 0);

    useEffect(() => {
        if (!isBrowser) return false;

        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    return width;
};

export default function Filters() {
    const firstUpdate = useRef(true);

    const { filterState } = useContext(FilterStateContext);
    const { setListings, setListingLoading } = useContext(ListingContext);

    const width = useWindowWidth();
    const [location, setLocation] = useState([]);
    const [category, setCategory] = useState("lease");
    const [type, setType] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [budget, setBudget] = useState({
        min: 0,
        max: 0,
    });
    const updateLocations = (locations) => {
        setLocation(locations);
    };
    const hideVtFilterDropdowns = (e) => {
        const eleDropDown = e.target.closest(".vt-search-relative");
        if (eleDropDown === null) {
            // document.querySelector('.vt-search-relative').classList.add('hidden')
        }
    };
    useEffect(() => {
        if (width > 768) {
            document.getElementById("mobile--type").remove();
        } else {
            document.getElementById("medium--type").remove();
        }
    }, [width]);
    const handleClick = () => {
        filterOpen ? setFilterOpen(false) : setFilterOpen(true);
    };

    // useEffect(()=>{
    //   updateListings();
    // },[filterState])

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        updateListings();
    }, [filterState]);

    const updateListings = () => {
        setListings([{}, {}, {}, {}, {}]);
        setListingLoading(true);
        let location = [];
        filterState.location.map((loc) => {
            location.push(loc.value);
        });

        const budget = filterState.budget[1] === 0 ? null : filterState.budget;
        console.log(filterState);
        axiosConfig
            .get("/filteredListings", {
                params: {
                    category: filterState.category,
                    budget: budget,
                    type: filterState.type,
                    location: location,
                },
            })
            .then(function (response) {
                setListings(response.data.data);
                setListingLoading(false);
                if (width < 768) {
                    navigate("/showcase/");
                } else {
                    navigate("/showcase/" + response.data.data[0].slug);
                }
            })
            .catch(function (error) {});
        localStorage.setItem("filter", JSON.stringify(filterState));
    };

    return (
        <div className="vt-filter bg-primary px-4 xl:px-0">
            <div className="container mx-auto relative z-20">
                {/* {(width !== 0 && width > breakpoint) ? ( */}
                <div
                    id="medium--type"
                    className="xl:max-w-screen-lg mx-auto items-center rounded-md bg-white vt-search-wrap shadow-md px-2 py-1 justify-between hidden lg:flex"
                >
                    <Category updateListings={updateListings} />
                    <Location
                        updateLocations={updateLocations}
                        location={location}
                        updateListings={updateListings}
                    />
                    <Type updateListings={updateListings} />
                    <Budget updateListings={updateListings} />
                    <FilterButton updateListings={updateListings} />
                </div>
                <div id="mobile--type" className="block lg:hidden">
                    <div className="lg:pl-4 cursor-pointer">
                        <div className="px-4 pt-2">
                            <button
                                className="bg-secondary lg:px-8 rounded-md py-2 font-medium leading-none hover:text-white flex items-center justify-center uppercase w-full"
                                onClick={handleClick}
                            >
                                <span className="vt-search-title text-sm text-white">
                                    Filters
                                </span>
                                {!filterOpen ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-white"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-white"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <div
                        className={`grid grid-cols-1 gap-y-4 items-center bg-white vt-search-wrap shadow-md px-4 py-4 justify-between absolute w-full top-0 ${
                            filterOpen
                                ? "mt-16 opacity-100"
                                : "-mt-96 opacity-0"
                        } transition-opacity duration-400 ease-out`}
                    >
                        <Category />
                        <Location
                            updateLocations={updateLocations}
                            location={location}
                        />
                        <Type />
                        <Budget />
                        <FilterButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
