import React, { useState, useEffect } from "react";
import Layout from "../../../components/dashboard/common/Layout";
import AgreementToolbar from "../../../components/dashboard/agreements/Toolbar";
import Agreement from "../../../components/dashboard/agreements/Agreement";
import axiosConfig from "../../../axiosConfig";
import RoleAuthorize from "../../../components/dashboard/RoleAuthorize";

export default function Agreements() {
	const [defaultAgreements, setDefaultAgreements] = useState(null);
	const [agreements, setAgreement] = useState(null);
	const [sort, setSort] = useState(0);
	const [type, setType] = useState(0);
	const [user, setUser] = useState(null);
	useEffect(() => {
		if (typeof window !== "undefined") {
			setUser(JSON.parse(localStorage.getItem("user")));
		}
	}, []);
	// const [keyword, setKeyword] = useState("");
	useEffect(() => {
		axiosConfig
			.get("/getAgreementListing", {
				params: {
					id: localStorage.getItem("vendor_id"),
					archive: 1,
				},
			})
			.then(function (response) {
				// console.log(response);
				setDefaultAgreements(response.data.data);
				setAgreement(response.data.data);
			})
			.catch(function (error) {
				// console.log(error);
			});
	}, []);
	const onTypeChange = (e) => {
		let filteredAgreements = [...defaultAgreements];
		setType(parseInt(e.target.value));
		if (e.target.value != 0) {
			filteredAgreements = filteredAgreements.filter(
				(agreement) => agreement.type == e.target.value
			);
		}
		if (sort === 0) {
			filteredAgreements.sort(function (a, b) {
				return a.timestamp - b.timestamp;
			});
		}
		if (sort === 1) {
			filteredAgreements.sort(function (a, b) {
				return b.timestamp - a.timestamp;
			});
		}
		setAgreement(filteredAgreements);
	};
	useEffect(() => {
		if (defaultAgreements !== null) {
			if (sort === 0) {
				agreements.sort(function (a, b) {
					return a.timestamp - b.timestamp;
				});
			}
			if (sort === 1) {
				agreements.sort(function (a, b) {
					return b.timestamp - a.timestamp;
				});
			}
			// console.log(sort);
		}
	}, [sort, agreements]);

	const onSortChange = (value) => {
		setSort(parseInt(value));
	};

	const handleSearch = (keyword) => {
		if (keyword != "") {
			const filteredAgreements = defaultAgreements.filter((agreement) =>
				agreement.title.startsWith(keyword)
			);
			// console.log(filteredAgreements);
			setAgreement(filteredAgreements);
		} else {
			setAgreement(defaultAgreements);
		}
	};

	return (
		<Layout>
			<RoleAuthorize page="agreements">
				<AgreementToolbar
					onSortChange={onSortChange}
					handleSearch={handleSearch}
					archive={true}
				/>
				{agreements === null ? (
					""
				) : (
					<>
						<div className="pt-8 pb-4 border-t border--gray-100 text-sm">
							<h3 className="font-semibold">
								{agreements.length} agreements found
							</h3>
							<div className="flex space-x-3 py-3">
								<div>
									<input
										id="all"
										type="radio"
										value="0"
										className="hidden peer"
										name="agreementType"
										onChange={onTypeChange}
										checked={type === 0}
									/>
									<label
										className="py-2 px-6 border-2 border-gray-300 text-gray-400 peer-checked:border-dashboardBlue peer-checked:bg-dashboardBlue peer-checked:text-white rounded-full block cursor-pointer"
										htmlFor="all"
									>
										All
									</label>
								</div>
								<div>
									<input
										id="rent"
										type="radio"
										value="1"
										className="hidden peer"
										name="agreementType"
										onChange={onTypeChange}
									/>
									<label
										className="py-2 px-6 border-2 border-gray-300 text-gray-400 peer-checked:border-dashboardBlue peer-checked:bg-dashboardBlue peer-checked:text-white rounded-full block cursor-pointer"
										htmlFor="rent"
									>
										Rent Agreement
									</label>
								</div>
								<div>
									<input
										id="sale"
										type="radio"
										value="2"
										className="hidden peer"
										name="agreementType"
										onChange={onTypeChange}
									/>
									<label
										className="py-2 px-6 border-2 border-gray-300 text-gray-400 peer-checked:border-dashboardBlue peer-checked:bg-dashboardBlue peer-checked:text-white rounded-full block cursor-pointer"
										htmlFor="sale"
									>
										Sale Agreement
									</label>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-4 2xl:grid-cols-6 gap-6  mb-8">
							{agreements.map((agreement, index) => {
								return (
									<Agreement
										key={index}
										data={agreement}
										user={user}
									/>
								);
							})}
						</div>
					</>
				)}
			</RoleAuthorize>
		</Layout>
	);
}
