import React, { useState, useEffect, useContext } from "react";
import { Link } from "gatsby";
import Layout from "../../../components/dashboard/common/Layout";
import TotalViews from "../../../components/dashboard/common/TotalViews";
import Button from "../../../components/dashboard/common/Button";
import ListingsTileViewHorizontal from "../../../components/showcase/listings/ListingsTileViewHorizontal";
import axiosConfig from "../../../axiosConfig";
import { AuthContext } from "../../../contexts/AuthContextProvider";
import {
	GoogleMap,
	LoadScript,
	Marker,
	useJsApiLoader,
} from "@react-google-maps/api";
import RoleAuthorize from "../../../components/dashboard/RoleAuthorize";

export default function Listings() {
	const { user } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(true);
	const [listings, setlistings] = useState(null);
	const [listingsDefault, setListingsDefault] = useState(null);
	const [type, setType] = useState(0);
	const [propType, setPropType] = useState(null);
	const [propLocation, setPropLocation] = useState(null);
	const [area, setArea] = useState(null);
	const [pt, setPt] = useState("all");
	const [pl, setPl] = useState("all");
	const [a, setA] = useState("all");
	const mapContainerStyle = {
		width: "100%",
		height: "calc(100vh - 175px)",
		borderRadius: "10px",
		marginLeft: "-5rem",
	};

	useEffect(() => {
		axiosConfig
			.get("/vendorPropertyListing", {
				params: {
					id: localStorage.getItem("vendor_id"),
					// id: user.vendor.id,
				},
			})
			.then(function (response) {
				setIsLoading(false);
				setlistings(response.data.data);
				setListingsDefault(response.data.data);
				setType(1);
			})
			.catch((error) => {
				setIsLoading(false);
				setlistings(null);
				setListingsDefault(null);
			});
	}, []);
	const handleLocationChange = (e) => {
		let filteredListings = [...listingsDefault];
		console.log(type);
		if (e.target.value === "all") {
			filteredListings = filteredListings.filter(
				(listing) => listing.visibility == type
			);
		} else {
			filteredListings = filteredListings.filter(
				(listing) => listing.state == e.target.value
			);
		}
		setlistings(filteredListings);
	};
	const handleTypeChange = (e) => {
		let filteredListings = [...listingsDefault];
		if (e.target.value === "all") {
			filteredListings = filteredListings.filter(
				(listing) => listing.visibility == type
			);
		} else {
			filteredListings = filteredListings.filter(
				(listing) => listing.category_title == e.target.value
			);
		}
		setlistings(filteredListings);
	};
	const handleAreaChange = (e) => {
		let filteredListings = [...listingsDefault];
		if (e.target.value === "all") {
			filteredListings = filteredListings.filter(
				(listing) => listing.visibility == type
			);
		} else {
			filteredListings = filteredListings.filter(
				(listing) =>
					(listing.area == e.target.value) &
					(listing.visibility == type)
			);
		}
		setlistings(filteredListings);
	};
	const onTypeChange = (e) => {
		console.log(e.target.value);
		setType(parseInt(e.target.value));
	};

	useEffect(() => {
		if (listingsDefault != null) {
			let filteredListings = [...listingsDefault];
			if (type == 0) {
				filteredListings = filteredListings.filter(
					(listing) => listing.visibility == 1
				);
			} else if (type == 1) {
				filteredListings = filteredListings.filter(
					(listing) => listing.visibility == 0
				);
			} else {
				filteredListings = filteredListings.filter((listing) => {
					return listing;
				});
			}
			setlistings(filteredListings);
		}
	}, [type]);

	useEffect(() => {
		if (listingsDefault != null) {
			const typeList = new Set();
			const locationList = new Set();
			const areaRange = new Set();
			listingsDefault.map((listing) => {
				typeList.add(listing.category_title);
				locationList.add(listing.state);
				areaRange.add(listing.area);
			});
			setPropType([...typeList]);
			setPropLocation([...locationList]);
			setArea([...areaRange]);
		}
	}, [listingsDefault]);

	// useEffect(()=>{
	// 	if (e.target.value === "all") {
	// 		filteredListings = filteredListings.filter((listing) => listing);
	// 	} else {
	// 		filteredListings = filteredListings.filter(
	// 			(listing) => listing.category_title == e.target.value
	// 		);
	// 	}
	// },[pc, pt, a, type])
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "AIzaSyA3DVWS2TNZJCxXKbz3OmTQnVpy1JR1WgA",
	});

	return (
		<Layout>
			<RoleAuthorize page="listings">
				{listings === null ? (
					<div className="relative w-full z-5 h-full mt-32 flex justify-center items-center">
						<img
							src={`${process.env.GATSBY_BASE_URL}/assets/backend/image/loader.gif`}
							alt="loading"
						/>
					</div>
				) : (
					<>
						<div className="vt-dashboard-overview flex items-center py-6 2xl:py-6 border-b border-gray-100">
							<div className="flex items-center w-full justify-between">
								<div className="flex space-x-3 py-3 text-sm">
									<div>
										<input
											id="public"
											type="radio"
											value="1"
											className="hidden peer"
											name="type"
											onChange={onTypeChange}
											checked={type === 1}
										/>
										<label
											className="py-2 px-6 border-2 border-gray-300 text-gray-400 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white rounded-full block cursor-pointer"
											htmlFor="public"
										>
											Public
										</label>
									</div>
									<div>
										<input
											id="private"
											type="radio"
											value="0"
											className="hidden peer"
											name="type"
											onChange={onTypeChange}
										/>
										<label
											className="py-2 px-6 border-2 border-gray-300 text-gray-400 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white rounded-full block cursor-pointer"
											htmlFor="private"
										>
											Private
										</label>
									</div>
									<div>
										<input
											id="trends"
											type="radio"
											value="2"
											className="hidden peer"
											name="type"
											onChange={onTypeChange}
										/>
										<label
											className="py-2 px-6 border-2 border-gray-300 text-gray-400 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white rounded-full block cursor-pointer"
											htmlFor="trends"
										>
											Trends
										</label>
									</div>
								</div>
								<div className="flex space-x-4">
									<select
										name
										className="bg-dashboardGrey text-xs font-medium py-2 px-8 rounded-full outline-none"
										onChange={handleLocationChange}
									>
										<option value="all">
											All Location
										</option>
										{propLocation != null
											? propLocation.map((t) => (
													<option value={t}>
														{t}
													</option>
											  ))
											: ""}
									</select>

									<select
										name
										className="bg-dashboardGrey text-xs font-medium py-2 px-8 rounded-full outline-none"
										onChange={handleTypeChange}
									>
										<option value="all">All Type</option>

										{propType != null
											? propType.map((t) => (
													<option value={t}>
														{t}
													</option>
											  ))
											: ""}
									</select>

									{/* <select
										name
										className="bg-dashboardGrey text-sm font-medium py-2 px-4 rounded-full outline-none"
										onChange={handleChange}
									>
										<option value="0">Budget</option>
										<option value="1">Older</option>
									</select> */}

									<select
										name
										className="bg-dashboardGrey text-xs font-medium py-2 px-8 h-11 rounded-full outline-none"
										onChange={handleAreaChange}
									>
										<option value="all">All Area</option>
										{area != null
											? area.map((t) => (
													<option value={t}>
														{t}
													</option>
											  ))
											: ""}
									</select>
								</div>
							</div>
						</div>
						{listings.length > 0 ? (
							<div
								className="vt-dashboard-hot-properties py-0 border-b border-gray-100 grid grid-cols-2 gap-4"
								style={{
									height: "calc(100vh - 175px)",
									position: "fixed",
									paddingRight: "75px",
								}}
							>
								<div className="">
									{isLoaded ? (
										<GoogleMap
											id="vt-map"
											mapContainerStyle={
												mapContainerStyle
											}
											zoom={12}
											center={listings[0].coordinates}
											className="rounded-md"
										>
											{listings.map((listing, index) => {
												const icon =
													"https://img.icons8.com/offices/40/000000/marker.png";
												return (
													<Marker
														key={index}
														icon={icon}
														position={
															listing.coordinates
														}
														label={listing.title}
														url={`/showcase/${listing.slug}/`}
													/>
												);
											})}
										</GoogleMap>
									) : (
										<></>
									)}
								</div>
								{/* <div></div> */}
								<div className="py-10">
									<h3 className="text-lg font-semibold flex items-center space-x-1 justify-between w-full">
										<span className="text-sm">
											{listings.length} listing found
										</span>
										<Link
											className="flex items-center space-x-1 bg-dashboardBlue rounded-full text-xs font-semibold py-2 px-4 text-white"
											to={`/dashboard/listings/create`}
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
											<span>Create New Listing</span>
										</Link>
									</h3>

									<div className="overflow-auto">
										<ListingsTileViewHorizontal
											propertyListings={listings}
										/>
									</div>
								</div>
							</div>
						) : (
							<h3 className="py-4 font-semibold text-sm flex gap-5 items-center">
								No {type == 1 ? "Public" : "Private"} Listings
								Found
								<Link
									className="flex items-center space-x-1 bg-dashboardBlue rounded-full text-xs font-semibold py-2 px-4 text-white"
									to={`/dashboard/listings/create`}
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
									<span>Create New Listing</span>
								</Link>
							</h3>
						)}
					</>
				)}
			</RoleAuthorize>
		</Layout>
	);
}
