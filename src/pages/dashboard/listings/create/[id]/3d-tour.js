import React, { useEffect, useState } from "react";
import { Link, navigate } from "gatsby";
import {
	Formik,
	useFormikContext,
	FieldArray,
	ErrorMessage,
	Field,
} from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosConfig from "../../../../../axiosConfig";
import Loader from "../../../../../components/Loader";
import Layout from "../../../../../components/dashboard/common/Layout";
import Heading from "../../../../../components/dashboard/common/Heading";
import "react-tabs/style/react-tabs.css";

export default function ActualSiteData(props) {
	const [loading, setLoading] = useState(false);
	const [actualSiteSubMenu, setActualSiteSubMenu] = useState(null);
	const [tourData, setTourData] = useState(null);

	useEffect(() => {
		axiosConfig
			.get("/get3dTourSubMenu")
			.then(function (response) {
				setActualSiteSubMenu(response.data.data);
			})
			.catch(function (error) {
				// console.log(error);
			});

		axiosConfig
			.get("/tourDataById", {
				params: {
					id: parseInt(props.params.id),
				},
			})
			.then(function (response) {
				console.log(response.data);
				response.data.error
					? setTourData(null)
					: setTourData(response.data.data);
			})
			.catch(function (error) {
				setTourData(null);
			});
	}, [loading]);

	const handleRemoveClick = (e, values, setFieldValue, field, i) => {
		const photos = [...values.photos];
		photos.splice(i, 1);
		setFieldValue("photos", photos);
	};

	//   // handle click event of the Add button
	const handleAddClick = (e, values, setFieldValue, field) => {
		const photos = [...values.photos];
		photos.push({ title: "", image: "", sort_order: "", oldimage: "" });
		setFieldValue("photos", photos);
	};

	const deleteLayout = (e, id) => {
		axiosConfig
			.post("/deleteTourData", {
				id: id,
			})
			.then(function (response) {
				// console.log(response.data)
				if (response.data.data) {
					toast.success("Deleted Successfully", {
						position: "top-right",
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
					document.getElementById(`tour-${id}`).remove();
				} else {
					toast.errro("Something went wrong please try again", {
						position: "top-right",
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}
			})
			.catch(function (error) {});
	};
	return (
		<Layout propertyId={props.params.id} createListingPage={true}>
			<div className="py-8">
				<Heading>Add Floor Layout Data</Heading>
				<div className="mx-auto">
					<Formik
						initialValues={{
							id: props.params.id,
							type: "",
							url: "",
						}}
						onSubmit={(values, { setSubmitting, resetForm }) => {
							setLoading(true);
							let formData = new FormData();
							const params = {
								vendor_id: localStorage.getItem("vendor_id"),
								property_id: props.params.id,
								status: 1,
								...values,
							};
							for (const key in params) {
								formData.append(key, params[key]);
							}

							axiosConfig
								.post("/addProperty3dTour", formData, {
									config: {
										headers: {
											"Content-Type":
												"multipart/form-data",
										},
									},
								})
								.then(function (response) {
									setSubmitting(false);
									setLoading(false);
									resetForm();
								})
								.catch(function (error) {
									setLoading(false);
									// console.log(error);
									setSubmitting(false);
								});
						}}
						validationSchema={Yup.object().shape({
							url: Yup.string().required("Title is Required"),
							type: Yup.string().required(
								"Menu Type is required"
							),
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
									{tourData === null ? (
										""
									) : (
										<div className="grid grid-cols-2 gap-4 mt-4">
											{tourData.map((tour) => (
												<div
													id={`tour-${tour.id}`}
													className="bg-grey p-4 w-full items-center flex justify-between rounded-md items-center"
												>
													<div className="flex space-x-12 items-center">
														<span className="text-sm font-light">
															Type : <br />
															<span className="text-secondary">
																{tour.tab}
															</span>
														</span>
														<span className="text-sm font-light">
															URL : <br />
															<span className="text-secondary">
																{tour.url}
															</span>
														</span>
													</div>
													<div className="flex space-x-4">
														{/* <span
															id={tour.id}
															type={
																tour.menu_id
															}
															className="p-1 rounded-full cursor-pointer"
															title={tour.title}
															onClick={(e) => {
																setFieldValue(
																	"type",
																	e.currentTarget.getAttribute(
																		"type"
																	)
																);
																setFieldValue(
																	"layoutId",
																	e.currentTarget.getAttribute(
																		"id"
																	)
																);
																setFieldValue(
																	"title",
																	e.currentTarget.getAttribute(
																		"title"
																	)
																);
															}}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className="h-5 w-5 text-green-400"
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={
																		2
																	}
																	d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
																/>
															</svg>
														</span> */}
														<span
															id={tour.id}
															className="p-1 rounded-full cursor-pointer"
															onClick={(e) =>
																deleteLayout(
																	e,
																	tour.id
																)
															}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className="h-5 w-5 text-red-400 "
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={
																		2
																	}
																	d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
																/>
															</svg>
														</span>
													</div>
												</div>
											))}
										</div>
									)}
									<div
										className={`grid grid-cols-2 gap-6 mt-8 `}
									>
										<div className="w-full flex flex-col gap-2">
											<label
												className="text-xs font-semibold text-primary"
												htmlFor="email"
											>
												Select Type
											</label>
											<select
												name="type"
												type="text"
												placeholder="Type"
												value={values.type}
												onChange={handleChange}
												onBlur={handleBlur}
												className={`outline-none border border-gray-300 px-4 h-11 bg-white text-xs font-semibold rounded-md ${
													errors.type &&
													touched.type &&
													"error"
												}`}
											>
												<option>Select Type</option>
												{actualSiteSubMenu === null ? (
													<option>Loading...</option>
												) : (
													actualSiteSubMenu.map(
														(type) => (
															<option
																value={type.id}
															>
																{type.name}
															</option>
														)
													)
												)}
											</select>
											{errors.type && touched.type && (
												<div className="input-feedback text-red-400 text-xs font-medium capitalize">
													{errors.type}
												</div>
											)}
										</div>
										<div className="w-full flex flex-col gap-2">
											<label
												className="text-xs font-semibold text-primary"
												htmlFor="email"
											>
												URL
											</label>
											<input
												name="url"
												type="text"
												placeholder="Enter URL"
												value={values.url}
												onChange={handleChange}
												onBlur={handleBlur}
												className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
													errors.url &&
													touched.url &&
													"error"
												}`}
											/>
											{errors.url && touched.url && (
												<div className="input-feedback text-red-400 text-xs font-medium capitalize">
													{errors.url}
												</div>
											)}
										</div>
									</div>

									<div className="flex mt-4">
										<div className="max-w-2xl rounded-lg">
											<div className="my-4">
												{/* <label className="inline-block mb-2 text-primary text-sm font-light">
													Add Image
													{errors.images &&
														touched.images && (
															<div className="input-feedback text-red-400 text-xs font-medium capitalize">
																{errors.images}
															</div>
														)}
												</label> */}

												{/* <div className="flex items-center justify-center cursor-pointer w-40 bg-gray-100 rounded-lg">
													<label
														htmlFor="images"
														className="flex flex-col w-full border-opacity-40 hover:bg-gray-100 hover:border-gray-300"
													>
														<div className="flex flex-col items-center justify-center py-6 cursor-pointer">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className="w-8 h-8 text-primary group-hover:text-gray-600"
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth="2"
																	d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
																/>
															</svg>
															<p className="pt-1 text-xs tracking-wider text-primary group-hover:text-gray-600">
																Upload Files
															</p>
														</div>
														<input
															type="file"
															className="opacity-0 hidden"
															id="images"
															name="images"
															// value={values.images}
															onChange={(
																event
															) => {
																setFieldValue(
																	"images",
																	event
																		.currentTarget
																		.files[0]
																);
															}}
															onBlur={handleBlur}
														/>
													</label>
												</div> */}
											</div>
										</div>
									</div>

									<div className="mt-5 flex item-center space-x-4">
										<button
											type="submit"
											disabled={isSubmitting}
											className={`capitalize border-box h-11 text-sm px-10 bg-primary text-white font-semibold hover:opacity-80 hover:text-white transition duration-200 ease-in-out rounded-full ${
												isSubmitting ? "opacity-20" : ""
											}`}
										>
											Save
										</button>
										<Link
											to={`/dashboard/listings/create/${values.id}/3d-render`}
											className={`py-3 capitalize border-box h-11 text-sm px-10 bg-dashboardBlue text-white font-semibold hover:opacity-80 hover:text-white transition duration-200 ease-in-out rounded-full`}
										>
											Continue
										</Link>
										{/* <Link
											to={`/dashboard/listings/create/${values.id}/actual-site`}
											className={`py-3 uppercase border-box h-11 text-sm px-10 bg-blue-300 text-white font-bold hover:opacity-80 hover:text-white transition duration-200 ease-in-out rounded-md`}
										>
											Back
										</Link> */}
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
		</Layout>
	);
}
