import React, { useState, useEffect, useContext } from "react";
import axiosConfig from "../../../axiosConfig";
import Select from "react-select";
import {
	FilterStateContext,
	FilterDispatchContext,
} from "../../../contexts/FilterContextProvider";

export default function Category({ updateListings }) {
	const options = [
		// { value: 1, label: 'Category' },
	];
	const [categoryList, setCategoryList] = useState(options);
	const [defaultCategoryIndex, setDefaultCategoryIndex] = useState(1);

	useEffect(() => {
		axiosConfig
			.get("/propertyCategoryList")
			.then(function (response) {
				setCategoryList(response.data.data);
			})
			.catch(function (error) {});
	}, []);

	const { filterState } = useContext(FilterStateContext);
	const dispatch = useContext(FilterDispatchContext);
	const customStyles = {
		control: (provided, state) => ({
			...provided,
			border: "0px",
			height: "40px",
			overflow: "scroll",
			display: "flex",
			outline: "none",
			cursor: "pointer",
		}),
		input: (provided, state) => ({
			...provided,
			border: "0px !important",
			outline: "none",
		}),
		clearIndicator: () => ({
			display: "none",
		}),
		dropdownIndicator: () => ({
			display: "none",
		}),
		indicatorSeparator: () => ({
			display: "none",
		}),
		container: (provided, state) => ({
			...provided,
			border: "0px",
			outline: "none",
			fontFamily: "poppins",
			fontSize: "0.75rem",
			fontWeight: "600",
			cursor: "pointer",
		}),
		singleValue: (provided, state) => ({
			...provided,
			fontWeight: "600",
		}),
		singleValueRemove: (provided, state) => ({
			...provided,
			backgroundColor: "transparent !important",
		}),
		singleValueLabel: (provided, state) => ({
			...provided,
			color: "#222222",
			fontWeight: "600",
		}),
		menu: (provided, state) => ({
			...provided,
			position: "absolute",
			width: "9rem",
			left: "-1rem",
			backgroundColor: "#F5F5F5",
			borderRadius: "0  0 .375rem  .375rem ",
			color: "#222222",
			boxShadow:
				"0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%)",
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: "#F5F5F5 !important",
			color: state.isSelected ? "#222222" : "#333",
			fontWeight: state.isSelected ? "600" : "500",
			opacity: state.isSelected ? "1" : "0.6",
			cursor: "pointer",
			fontSize: "0.75rem",
		}),
		valueContainer: (provided, state) => ({
			...provided,
			backgroundColor: "transparent",
		}),
	};

	const handleChange = (e) => {
		dispatch({ type: "CATEGORY", payload: e.target.value });
	};

	useEffect(() => {
		setDefaultCategoryIndex("1");
	}, [categoryList]);
	const defaultValueIndex = options.findIndex(
		(x) => x.value === filterState.category
	);

	return (
		<div className="lg:w-36 vt-search-category flex items-center justify-between lg:px-4 border-b-2 lg:border-b-0 lg:border-r border-grey cursor-pointer relative z-40">
			{typeof window !== "undefined" && (
				<select
					className="w-full z-50 relative text-xs font-semibold cursor-pointer outline-none"
					value={filterState.category}
					name="type"
					placeholder="Category"
					onChange={handleChange}
				>
					{filterState.category === null ? (
						<option>Category</option>
					) : (
						" "
					)}
					{categoryList.map((category) => {
						return (
							<option value={category.value}>
								{category.label}
							</option>
						);
					})}
				</select>
			)}
			{/* <span>
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
			</span> */}
		</div>
	);
}
