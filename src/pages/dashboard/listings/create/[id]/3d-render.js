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

export default function RenderData(props) {
	const [loading, setLoading] = useState(false);
	const [renderTypeSubMenu, setRenderTypeSubMenu] = useState(null);
	const [renderData, setRenderData] = useState(null);
	const [asType, setAsType] = useState(null);
	const [sitePhotoArray, setSitePhotoArray] = useState(1);
	const [initialValues, setInitialValues] = useState(null);

	useEffect(() => {
		axiosConfig
			.get("/renderType")
			.then(function (response) {
				setRenderTypeSubMenu(response.data.data);
				setAsType(response.data.data[0].id);
			})
			.catch(function (error) {
				// console.log(error);
			});

		axiosConfig
			.get("/property3dRenderClient", {
				params: {
					id: parseInt(props.params.id),
				},
			})
			.then(function (response) {
				let exisitingImageArray = [];
				if (response.data.data[1].images.length > 0) {
					response.data.data[1].images.map((image) => {
						exisitingImageArray.push({
							title: image.title,
							image: image.image,
							sort_order: image.sort_order,
							oldimage: image.oldimage,
						});
					});
				}
				setInitialValues({
					id: props.params.id,
					type: "",
					iframe_url: response.data.data[0].iframe,
					photos: exisitingImageArray,
				});
				response.data.error
					? setRenderData(null)
					: setRenderData(response.data.data);
			})
			.catch(function (error) {
				setRenderData(null);
				setInitialValues({
					id: props.params.id,
					type: "",
					iframe_url: "",
					photos: [],
				});
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
		photos.push({ title: "", image: "", oldimage: "" });
		setFieldValue("photos", photos);
	};

	function handleTypeChange(e, setFieldValue) {
		const typeId = e.currentTarget.value;
		setFieldValue("type", e.currentTarget.value);
		setAsType(e.currentTarget.value);
		axiosConfig
			.get("/property3dRenderClient", {
				params: {
					id: parseInt(props.params.id),
				},
			})
			.then(function (response) {
				const dataSet = response.data.data;
				let exisitingImageArray = [];
				if (dataSet.length > 0) {
					dataSet.map((data) => {
						if (data.menu_id === typeId) {
							if (data.images.length > 0) {
								data.images.map((image) => {
									exisitingImageArray.push({
										title: image.title,
										image: image.image,
										sort_order: image.sort_order,
										oldimage: image.oldimage,
									});
								});
							}
						}
					});
				}
				setInitialValues({
					id: props.params.id,
					type: typeId,
					photos: exisitingImageArray,
				});
				response.data.error
					? setRenderData(null)
					: setRenderData(response.data.data);
			})
			.catch(function (error) {
				setRenderData(null);
				setInitialValues({ id: props.params.id, type: "", photos: [] });
			});
	}

	const handleImageUpload = (url, i) => {
		document.getElementById(`photos-${i}-image`).setAttribute("src", url);
		document.getElementById(`photos-${i}-image-show`).style.visibility =
			"hidden";
	};

	return (
		<Layout propertyId={props.params.id} createListingPage={true}>
			<div className="py-8">
				<Heading>Add 3D Render Data</Heading>
				<div className="mx-auto">
					{initialValues === null ? (
						""
					) : (
						<Formik
							enableReinitialize
							initialValues={initialValues}
							onSubmit={(values, { setSubmitting }) => {
								setLoading(true);
								let formData = new FormData();
								const params = {
									vendor_id:
										localStorage.getItem("vendor_id"),
									property_id: props.params.id,
									status: 1,
									...values,
								};
								for (const key in params) {
									formData.append(key, params[key]);
									if (key === "photos") {
										const files = params[key];
										files.map((file, i) => {
											formData.append(
												`title[${i}]`,
												file.title
											);
											formData.append(
												`oldimage[${i}]`,
												file.oldimage
											);
											formData.append(
												`photos[${i}]`,
												file.image
											);
										});
									}
								}

								axiosConfig
									.post("/add3dRender", formData, {
										config: {
											headers: {
												"Content-Type":
													"multipart/form-data",
											},
										},
									})
									.then(function (response) {
										setSubmitting(false);
										toast.success("Updated Successfully", {
											position: "top-right",
											autoClose: 2000,
											hideProgressBar: false,
											closeOnClick: true,
											pauseOnHover: true,
											draggable: true,
											progress: undefined,
										});
									})
									.catch(function (error) {
										// console.log(error);
										setSubmitting(false);
									});
							}}
							validationSchema={Yup.object().shape({
								iframe_url: Yup.string(),
								type: Yup.string().required(
									"Menu Type is required"
								),
								photos: Yup.array().of(
									Yup.object().shape({
										title: Yup.string().required(
											"Title is required"
										),
										image: Yup.mixed(),
										// .required('Image is required'),
									})
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
									setValues,
									field,
								} = props;
								return (
									<form
										className={`relative ${
											isSubmitting ? "opacity-20" : ""
										}`}
										onSubmit={handleSubmit}
									>
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
													onChange={(e) =>
														handleTypeChange(
															e,
															setFieldValue
														)
													}
													onBlur={handleBlur}
													className={`outline-none border border-gray-300 px-4 h-11 bg-white text-xs font-medium rounded-md ${
														errors.type &&
														touched.type &&
														"error"
													}`}
												>
													<option>Select Type</option>
													{renderTypeSubMenu ===
													null ? (
														<option>
															Loading...
														</option>
													) : (
														renderTypeSubMenu.map(
															(type) => (
																<option
																	value={
																		type.id
																	}
																>
																	{type.name}
																</option>
															)
														)
													)}
												</select>
												{errors.type &&
													touched.type && (
														<div className="input-feedback text-red-400 text-xs font-medium capitalize">
															{errors.type}
														</div>
													)}
											</div>
										</div>
										{asType == 2 ? (
											<div
												className={`grid grid-cols-2 gap-6 mt-8 `}
											>
												<div className="w-full flex flex-col gap-2">
													<label
														className="text-xs font-semibold text-primary"
														htmlFor="email"
													>
														Iframe URL
													</label>
													<input
														name="iframe_url"
														type="text"
														placeholder="Enter Title"
														value={
															values.iframe_url
														}
														onChange={handleChange}
														onBlur={handleBlur}
														className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-medium rounded-md ${
															errors.iframe_url &&
															touched.iframe_url &&
															"error"
														}`}
													/>
													{errors.title &&
														touched.iframe_url && (
															<div className="input-feedback text-red-400 text-xs font-medium capitalize">
																{
																	errors.iframe_url
																}
															</div>
														)}
												</div>
											</div>
										) : (
											<div>
												<div
													className={`mt-4 py-3 capitalize border-box h-11 text-sm text-primary font-bold hover:opacity-80 rounded-full flex items-center gap-1 cursor-pointer`}
													onClick={(e) =>
														handleAddClick(
															e,
															values,
															setFieldValue,
															field
														)
													}
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
													<span>Add Photo</span>
												</div>
												<div className="grid grid-cols-4 gap-8 mt-4">
													<FieldArray name="photos">
														{() =>
															values.photos.map(
																(photo, i) => {
																	const photoErrors =
																		(errors
																			.photos
																			?.length &&
																			errors
																				.photos[
																				i
																			]) ||
																		{};
																	const photoTouched =
																		(touched
																			.photos
																			?.length &&
																			touched
																				.photos[
																				i
																			]) ||
																		{};
																	return (
																		<div
																			key={
																				i
																			}
																			className="space-x-8 bg-grey rounded-md"
																		>
																			{/* <h5 className="font-semibold">{i + 1}.</h5> */}
																			<div className="flex-col space-y-2 items-start p-4">
																				<div>
																					<img
																						id={`photos-${i}-image-show`}
																						className="rounded-md"
																						src={
																							values
																								.photos[
																								i
																							]
																								.image
																						}
																					/>

																					<img
																						className="rounded-md"
																						id={`photos-${i}-image`}
																						src=""
																					/>
																				</div>
																				<div className="flex flex-col space-y-2">
																					<label className="font-semibold text-primary text-xs">
																						Title
																					</label>
																					<Field
																						name={`photos.${i}.title`}
																						type="text"
																						value={
																							values
																								.photos[
																								i
																							]
																								.title
																						}
																						className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-medium rounded-md ${
																							photoErrors.title &&
																							photoTouched.title &&
																							"error"
																						}`}
																					/>
																					{photoErrors.title &&
																						photoErrors.title && (
																							<div className="input-feedback text-red-400 text-xs font-medium capitalize">
																								{
																									photoErrors.title
																								}
																							</div>
																						)}
																				</div>
																				<div className="flex flex-col space-y-2">
																					<label className="font-semibold text-primary text-xs">
																						Image
																					</label>
																					<input
																						name={`photos.${i}.image`}
																						type="file"
																						// value=""

																						className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-medium rounded-md ${
																							photoErrors.image &&
																							photoTouched.image &&
																							"error"
																						}`}
																						onChange={(
																							event
																						) => {
																							const imageFile =
																								event
																									.currentTarget
																									.files[0];
																							setFieldValue(
																								`photos.${i}.image`,
																								imageFile
																							);

																							const imageFileSrc =
																								URL.createObjectURL(
																									event
																										.currentTarget
																										.files[0]
																								);
																							handleImageUpload(
																								imageFileSrc,
																								i
																							);
																						}}
																					/>
																					{photoErrors.image &&
																						photoErrors.image && (
																							<div className="input-feedback text-red-400 text-xs font-medium capitalize">
																								{
																									photoErrors.image
																								}
																							</div>
																						)}
																				</div>
																				<div className="flex flex-col space-y-2 hidden">
																					<Field
																						name={`photos.${i}.oldimage`}
																						type="text"
																						value={
																							values
																								.photos[
																								i
																							]
																								.oldimage
																						}
																						className=""
																					/>
																				</div>
																				{/* <div className="flex flex-col space-y-2">
                                                                <label className="font-semibold text-primary text-xs">Sort Order</label>
                                                                <Field
                                                                name={`photos.${i}.sort_order`}
                                                                type="text"
                                                                value={values.photos[i].sort_order}
                                                                className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-medium rounded-md ${photoErrors.sort_order && photoTouched.sort_order && "error"}`}
                                                                />
                                                                {photoErrors.sort_order && photoErrors.sort_order && (
                                                                    <div className="input-feedback text-red-400 text-xs font-medium capitalize">{photoErrors.sort_order}</div>
                                                                )}
                                                            </div> */}
																				<div
																					key={
																						i
																					}
																					className={`mt-4 py-2 uppercase border-box  text-sm px-2 bg-red-500 text-white font-bold hover:opacity-80 hover:text-white transition duration-200 ease-in-out rounded-md inline-block cursor-pointer`}
																					onClick={(
																						e
																					) =>
																						handleRemoveClick(
																							e,
																							values,
																							setFieldValue,
																							field,
																							i
																						)
																					}
																				>
																					<svg
																						xmlns="http://www.w3.org/2000/svg"
																						className="h-4 w-4 text-white "
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
																				</div>
																			</div>
																		</div>
																	);
																}
															)
														}
													</FieldArray>
												</div>
											</div>
										)}

										<div className="mt-8 flex item-center space-x-4">
											<button
												type="submit"
												disabled={isSubmitting}
												className={`capitalize border-box h-11 text-sm px-10 bg-primary text-white font-bold hover:opacity-80 hover:text-white transition duration-200 ease-in-out rounded-full ${
													isSubmitting
														? "opacity-20"
														: ""
												}`}
											>
												Save
											</button>
											<Link
												to={`/dashboard/listings/create/${values.id}/3d-tour`}
												className={`py-3 capitalize border-box h-11 text-sm px-10 bg-dashboardBlue text-white font-bold hover:opacity-80 hover:text-white transition duration-200 ease-in-out  rounded-full`}
											>
												Continue
											</Link>
											{/* <Link
												to={`/dashboard/listings/create/${values.id}/floor-layout`}
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
					)}
					<ToastContainer />
				</div>
			</div>
		</Layout>
	);
}
