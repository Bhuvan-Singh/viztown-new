import React, { useEffect, useState } from "react";
import { Link, navigate } from "gatsby";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosConfig from "../../../axiosConfig";
import Loader from "../../../components/Loader";
import Layout from "../../../components/dashboard/common/Layout";
import RoleAuthorize from "../../../components/dashboard/RoleAuthorize";
export default function NewMeeting() {
	const [featuredImagePreview, setFeaturedImagePreview] = useState({
		path: "",
	});
	const [relatedVendorList, setRelatedVendorList] = useState(null);
	const [relatedPropertyList, setRelatedPropertyList] = useState(null);
	const [locationList, setLocationList] = useState(null);
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		axiosConfig
			.get("/getRelatedVendorList", {
				params: {
					uid: user.user.uid,
				},
			})
			.then(function (response) {
				setRelatedVendorList(response.data.data);
			})
			.catch(function (error) {
				// console.log(error);
			});

		axiosConfig
			.get("/vendorPropertyListing", {
				params: {
					id: localStorage.getItem("vendor_id"),
				},
			})
			.then(function (response) {
				setRelatedPropertyList(response.data.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<Layout>
			<RoleAuthorize>
				<div className="px-8 py-8">
					<h1 className="text-base font-bold capitalize w-full border-b border-gray-200 pb-4">
						Create a new meeting
					</h1>

					<div className="mx-auto">
						<Formik
							initialValues={{
								organizerId: "",
								clientEmailId: "",
								clientName: "",
								date: "",
								time: "",
								duration: "",
								propertyId: "",
								agenda: "",
							}}
							onSubmit={(
								values,
								{ setSubmitting, resetForm }
							) => {
								let formData = new FormData();
								const params = {
									vendorId: localStorage.getItem("vendor_id"),
									...values,
								};
								for (const key in params) {
									formData.append(key, params[key]);
								}

								axiosConfig
									.post("/createMeeting", formData, {
										config: {
											headers: {
												"Content-Type":
													"multipart/form-data",
											},
										},
									})
									.then(function (response) {
										setSubmitting(false);
										toast.success(
											"meeting created successfully!",
											{
												position: "top-right",
												autoClose: 2000,
												hideProgressBar: false,
												closeOnClick: true,
												pauseOnHover: true,
												draggable: true,
												progress: undefined,
											}
										);
										// navigate(`/dashboard/meetings`);
										resetForm();
									})
									.catch(function (error) {
										setSubmitting(false);
										toast.error(
											"An error occured. Please try again",
											{
												position: "top-right",
												autoClose: 2000,
												hideProgressBar: false,
												closeOnClick: true,
												pauseOnHover: true,
												draggable: true,
												progress: undefined,
											}
										);
									});
							}}
							validationSchema={Yup.object().shape({
								organizerId:
									Yup.string().required("Field is required"),
								clientEmailId: Yup.string()
									.email("Please enter valid email id.")
									.required("Field is required"),
								clientName:
									Yup.string().required("Field is required"),
								date: Yup.string("Strin").required(
									"Field is required"
								),
								time: Yup.string().required(
									"Field is required"
								),
								duration:
									Yup.string().required("Field is required"),
								propertyId:
									Yup.string().required("Field is required"),
								agenda: Yup.string(),
							})}
						>
							{(props) => {
								const {
									values,
									touched,
									errors,
									isSubmitting,
									setFieldValue,
									handleChange,
									handleBlur,
									handleSubmit,
								} = props;
								return (
									<form
										className={`relative ${
											isSubmitting ? "opacity-20" : ""
										}`}
										onSubmit={handleSubmit}
									>
										<div
											className={`grid grid-cols-2 gap-6 gap-x-12 mt-8 `}
										>
											<div className="w-full flex flex-col gap-2">
												<label
													className="text-sm font-medium text-primary"
													htmlFor="email"
												>
													Client Name
												</label>
												<input
													name="clientName"
													type="text"
													placeholder="Enter Client Name"
													value={values.clientName}
													onChange={handleChange}
													onBlur={handleBlur}
													className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-medium rounded-md ${
														errors.clientName &&
														touched.clientName &&
														"error"
													}`}
												/>
												{errors.clientName &&
													touched.clientName && (
														<div className="input-feedback text-red-400 text-xs font-medium capitalize">
															{errors.clientName}
														</div>
													)}
											</div>
											<div className="w-full flex flex-col gap-2">
												<label
													className="text-sm font-medium text-primary"
													htmlFor="email"
												>
													Client's Email Id
												</label>
												<input
													name="clientEmailId"
													type="email"
													placeholder="Enter Client's Email ID"
													value={values.clientEmailId}
													onChange={handleChange}
													onBlur={handleBlur}
													className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-medium rounded-md ${
														errors.clientEmailId &&
														touched.clientEmailId &&
														"error"
													}`}
												/>
												{errors.clientEmailId &&
													touched.clientEmailId && (
														<div className="input-feedback text-red-400 text-xs font-medium capitalize">
															{
																errors.clientEmailId
															}
														</div>
													)}
											</div>

											<div className="w-full flex flex-col gap-2">
												<label
													className="text-sm font-medium text-primary"
													htmlFor="email"
												>
													Meeting Representative
												</label>
												<select
													name="organizerId"
													value={values.organizerId}
													onChange={handleChange}
													onBlur={handleBlur}
													className={`outline-none border border-gray-300 px-4 h-11 bg-white text-xs font-medium rounded-md ${
														errors.organizerId &&
														touched.organizerId &&
														"error"
													}`}
												>
													<option>
														Select Representative
													</option>
													{relatedVendorList ===
													null ? (
														<option>
															Loading...
														</option>
													) : (
														relatedVendorList.map(
															(vendor) => (
																<option
																	value={
																		vendor.id
																	}
																>
																	{
																		vendor.fname
																	}{" "}
																	{
																		vendor.lname
																	}
																</option>
															)
														)
													)}
												</select>
												{errors.organizerId &&
													touched.organizerId && (
														<div className="input-feedback text-red-400 text-xs font-medium capitalize">
															{errors.organizerId}
														</div>
													)}
											</div>

											<div className="w-full flex flex-col gap-2">
												<label
													className="text-sm font-medium text-primary"
													htmlFor="email"
												>
													Select Property
												</label>
												<select
													name="propertyId"
													value={values.propertyId}
													onChange={handleChange}
													onBlur={handleBlur}
													className={`outline-none border border-gray-300 px-4 h-11 bg-white text-xs font-medium rounded-md ${
														errors.propertyId &&
														touched.propertyId &&
														"error"
													}`}
												>
													<option>
														Select Property
													</option>
													{relatedPropertyList ===
													null ? (
														<option>
															Loading...
														</option>
													) : (
														relatedPropertyList.map(
															(property) => (
																<option
																	value={
																		property.id
																	}
																>
																	{
																		property.title
																	}
																</option>
															)
														)
													)}
												</select>
												{errors.propertyId &&
													touched.propertyId && (
														<div className="input-feedback text-red-400 text-xs font-medium capitalize">
															{errors.propertyId}
														</div>
													)}
											</div>
										</div>
										<div className="grid grid-cols-3 mt-6 gap-6 gap-x-12">
											<div className="w-full flex flex-col gap-2">
												<label
													className="text-sm font-medium text-primary"
													htmlFor="email"
												>
													Meeting Date
												</label>
												<input
													name="date"
													type="date"
													placeholder="Select Meeting Date"
													value={values.date}
													onChange={handleChange}
													onBlur={handleBlur}
													className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-medium rounded-md ${
														errors.date &&
														touched.date &&
														"error"
													}`}
												/>
												{errors.date &&
													touched.date && (
														<div className="input-feedback text-red-400 text-xs font-medium capitalize">
															{errors.date}
														</div>
													)}
											</div>
											<div className="w-full flex flex-col gap-2">
												<label
													className="text-sm font-medium text-primary"
													htmlFor="time"
												>
													Meeting Time
												</label>
												<input
													name="time"
													type="time"
													placeholder="Select Meeting Date"
													value={values.time}
													onChange={handleChange}
													onBlur={handleBlur}
													className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-medium rounded-md ${
														errors.time &&
														touched.time &&
														"error"
													}`}
												/>
												{errors.time &&
													touched.time && (
														<div className="input-feedback text-red-400 text-xs font-medium capitalize">
															{errors.time}
														</div>
													)}
											</div>

											<div className="w-full flex flex-col gap-2">
												<label
													className="text-sm font-medium text-primary"
													htmlFor="email"
												>
													Meeting Duration
												</label>
												<select
													name="duration"
													value={values.duration}
													onChange={handleChange}
													onBlur={handleBlur}
													className={`outline-none border border-gray-300 px-4 h-11 bg-white text-xs font-medium rounded-md ${
														errors.duration &&
														touched.duration &&
														"error"
													}`}
												>
													<option>
														Select Duration
													</option>
													<option value="15">
														15 Mins
													</option>
													<option value="30">
														30 Mins
													</option>
													<option value="45">
														45 Mins
													</option>
													<option value="60">
														60 Mins
													</option>
													<option value="75">
														75 Mins
													</option>
													<option value="90">
														90 Mins
													</option>
												</select>
												{errors.duration &&
													touched.duration && (
														<div className="input-feedback text-red-400 text-xs font-medium capitalize">
															{errors.duration}
														</div>
													)}
											</div>
										</div>

										<div className="grid grid-cols-1 mt-6 gap-6 gap-x-12">
											<div className="w-full flex flex-col gap-2">
												<label
													className="text-sm font-medium text-primary"
													htmlFor="email"
												>
													Meeting Agenda
												</label>
												<textarea
													name="agenda"
													placeholder="Meeting Agenda"
													value={values.agenda}
													onChange={handleChange}
													onBlur={handleBlur}
													className={`outline-none border border-gray-300 p-4 h-24 bg-white text-xs font-medium rounded-md ${
														errors.agenda &&
														touched.agenda &&
														"error"
													}`}
												></textarea>
												{errors.agenda &&
													touched.agenda && (
														<div className="input-feedback text-red-400 text-xs font-medium capitalize">
															{errors.agenda}
														</div>
													)}
											</div>
										</div>

										<div className="mt-5">
											<button
												type="submit"
												disabled={isSubmitting}
												className={`capitalize border-box h-11 text-sm px-10 bg-dashboardBlue text-white font-semibold hover:opacity-80 hover:text-white transition duration-200 ease-in-out rounded-full ${
													isSubmitting
														? "opacity-20"
														: ""
												}`}
											>
												Create Meeting
											</button>
										</div>
										{isSubmitting ? (
											<div className="absolute w-full z-5 top-0 h-full flex justify-center items-center">
												<img
													src={`${process.env.GATSBY_BASE_URL}/assets/backend/image/loader.gif`}
													alt="loading"
												/>
											</div>
										) : (
											""
										)}
									</form>
								);
							}}
						</Formik>
						<ToastContainer />
					</div>
				</div>
			</RoleAuthorize>
		</Layout>
	);
}
