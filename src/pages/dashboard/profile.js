import React, { useEffect, useState } from "react";
import { Link, navigate } from "gatsby";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosConfig from "../../axiosConfig";
import Loader from "../../components/Loader";
import Layout from "../../components/dashboard/common/Layout";
import Heading from "../../components/dashboard/common/Heading";

export default function Profile(props) {
	const [initialValues, setInitialValues] = useState(null);
	const [changePassword, setChangePassword] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const handleChangePassword = () => {
		changePassword ? setChangePassword(false) : setChangePassword(true);
	};
	const handleShowPasswordChange = () => {
		showPassword ? setShowPassword(false) : setShowPassword(true);
	};
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		axiosConfig
			.get("/getVendorProfile", {
				params: {
					uid: user.user.uid,
				},
			})
			.then(function (response) {
				console.log(response);
				const existingData = response.data.error
					? null
					: response.data.data;
				console.log(existingData);
				existingData === null
					? setInitialValues(
							setInitialValues({
								uid: user.user.uid,
								fname: "",
								lname: "",
								email: "0",
								profile: "",
								gender: "",
								number: "",
								city: "",
								password: "",
							})
					  )
					: setInitialValues({
							uid: user.user.uid,
							fname: existingData.fname,
							lname: existingData.lname,
							email: existingData.email,
							password: "",
							profile: "",
							gender: existingData.gender,
							number: existingData.number,
							city: existingData.city,
							parent_id: existingData.parent_id,
							role: existingData.role,
							status: existingData.status,
							agency_name: existingData.agency_name,
							profileUrl: existingData.profile,
					  });
			})
			.catch(function (error) {
				setInitialValues({
					uid: user.user.uid,
					fname: "",
					lname: "",
					email: "0",
					password: "",
					profile: "",
					gender: "",
					number: "",
					city: "",
				});
			});
	}, []);
	return (
		<Layout>
			{initialValues === null ? (
				<div className="relative w-full z-5 h-full mt-32 flex justify-center items-center">
					<img
						src={`${process.env.GATSBY_BASE_URL}/assets/backend/image/loader.gif`}
						alt="loading"
					/>
				</div>
			) : (
				<div className="py-8">
					<Heading>Edit Profile</Heading>
					<div className="mx-auto">
						<Formik
							initialValues={initialValues}
							onSubmit={(values, { setSubmitting }) => {
								console.log(values);
								let formData = new FormData();
								const params = {
									...values,
								};
								for (const key in params) {
									formData.append(key, params[key]);
								}

								console.log(formData);

								axiosConfig
									.post("/updateVendorProfile", formData, {
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
											"Profile Updated Successfully",
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
									})
									.catch(function (error) {
										// console.log(error);
										setSubmitting(false);
									});
							}}
							validationSchema={Yup.object().shape({
								fname: Yup.string().required(""),
								lname: Yup.string(),
								email: Yup.string().email(
									"Please enter calid email id"
								),
								profile: Yup.string(),
								gender: Yup.string().required(),
								number: Yup.string(),
								city: Yup.string(),
								password: Yup.string().min(
									10,
									"Password must be alpha numberic and atleast 10 character long!"
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
										className={`relative max-w-screen-lg ${
											isSubmitting ? "opacity-20" : ""
										}`}
										onSubmit={handleSubmit}
									>
										<div className="mt-8 flex gap-4 items-center">
											<img
												className="w-24 h-24 rounded-full border border-gray-100 p-2"
												src={values.profileUrl}
											/>
											<div className="max-w-2xl flex space-x-8">
												<div className="">
													<label
														className="inline-block text-primary text-sm font-medium cursor-pointer"
														htmlFor="profile"
													>
														Change profile picture
														{errors.profile &&
															touched.profile && (
																<div className="input-feedback text-red-400 text-xs font-medium capitalize">
																	{
																		errors.profile
																	}
																</div>
															)}
													</label>

													<div className="flex items-center justify-center w-full cursor-pointer hidden">
														<input
															type="file"
															className="opacity-0"
															id="profile"
															name="profile"
															// value={values.feature_image}
															onChange={(
																event
															) => {
																setFieldValue(
																	"profile",
																	event
																		.currentTarget
																		.files[0]
																);
															}}
															onBlur={handleBlur}
														/>
													</div>
												</div>
											</div>
										</div>
										<div
											className={`grid grid-cols-3 gap-6 gap-x-12 mt-8 `}
										>
											<div className="w-full flex flex-col gap-2">
												<label className="text-sm font-medium text-primary">
													First Name
												</label>
												<input
													name="fname"
													type="text"
													placeholder="First Name"
													value={values.fname}
													onChange={handleChange}
													onBlur={handleBlur}
													className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-medium rounded-md ${
														errors.fname &&
														touched.fname &&
														"error"
													}`}
												/>
												{errors.fname &&
													touched.fname && (
														<div className="input-feedback text-red-400 text-xs font-medium capitalize">
															{errors.fname}
														</div>
													)}
											</div>

											<div className="w-full flex flex-col gap-2">
												<label className="text-sm font-medium text-primary">
													Last Name
												</label>
												<input
													name="lname"
													type="text"
													placeholder="Last Name"
													value={values.lname}
													onChange={handleChange}
													onBlur={handleBlur}
													className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-medium rounded-md ${
														errors.lname &&
														touched.lname &&
														"error"
													}`}
												/>
												{errors.lname &&
													touched.lname && (
														<div className="input-feedback text-red-400 text-xs font-medium capitalize">
															{errors.lname}
														</div>
													)}
											</div>

											<div className="w-full flex flex-col gap-2">
												<label className="text-sm font-medium text-primary">
													Gender
												</label>
												<select
													name="gender"
													type="text"
													placeholder="Gender"
													value={values.gender}
													onChange={handleChange}
													onBlur={handleBlur}
													className={`outline-none border border-gray-300 px-4 h-11 bg-white text-xs font-medium rounded-md ${
														errors.gender &&
														touched.gender &&
														"error"
													}`}
												>
													<option value="0">
														Male
													</option>
													<option value="1">
														Female
													</option>
												</select>
												{errors.gender &&
													touched.gender && (
														<div className="input-feedback text-red-400 text-xs font-medium capitalize">
															{errors.gender}
														</div>
													)}
											</div>

											<div className="w-full flex flex-col gap-2">
												<label className="text-sm font-medium text-primary">
													Email Id
												</label>
												<input
													name="email"
													type="email"
													placeholder="Email Id"
													value={values.email}
													onChange={handleChange}
													onBlur={handleBlur}
													className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-medium rounded-md ${
														errors.email &&
														touched.email &&
														"error"
													}`}
												/>
												{errors.email &&
													touched.email && (
														<div className="input-feedback text-red-400 text-xs font-medium capitalize">
															{errors.email}
														</div>
													)}
											</div>

											<div className="w-full flex flex-col gap-2">
												<label className="text-sm font-medium text-primary">
													Number
												</label>
												<input
													name="number"
													type="text"
													placeholder="Last Name"
													value={values.number}
													onChange={handleChange}
													onBlur={handleBlur}
													className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-medium rounded-md ${
														errors.number &&
														touched.number &&
														"error"
													}`}
												/>
												{errors.number &&
													touched.number && (
														<div className="input-feedback text-red-400 text-xs font-medium capitalize">
															{errors.number}
														</div>
													)}
											</div>

											<div className="w-full flex flex-col gap-2">
												<label className="text-sm font-medium text-primary">
													City
												</label>
												<input
													name="city"
													type="text"
													placeholder="City"
													value={values.city}
													onChange={handleChange}
													onBlur={handleBlur}
													className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-medium rounded-md ${
														errors.city &&
														touched.city &&
														"error"
													}`}
												/>
												{errors.city &&
													touched.city && (
														<div className="input-feedback text-red-400 text-xs font-medium capitalize">
															{errors.city}
														</div>
													)}
											</div>

											<div className="w-full flex flex-col gap-2">
												<label
													className="text-xs font-medium text-blue-500 cursor-pointer"
													onClick={
														handleChangePassword
													}
												>
													Change your current
													password.
												</label>
												{changePassword ? (
													<>
														<div className="flex items-center gap-4">
															<span className="relative flex items-center">
																<input
																	name="password"
																	type={
																		showPassword
																			? "text"
																			: "password"
																	}
																	placeholder="password"
																	value={
																		values.password
																	}
																	onChange={
																		handleChange
																	}
																	onBlur={
																		handleBlur
																	}
																	className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-medium rounded-md ${
																		errors.password &&
																		touched.password &&
																		"error"
																	}`}
																/>
																<span
																	className="absolute right-2"
																	onClick={
																		handleShowPasswordChange
																	}
																>
																	{showPassword ? (
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			className="h-4 w-4 text-primary"
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
																				d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
																			/>
																		</svg>
																	) : (
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			className="h-4 w-4 text-primary"
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
																				d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
																			/>
																			<path
																				strokeLinecap="round"
																				strokeLinejoin="round"
																				strokeWidth={
																					2
																				}
																				d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
																			/>
																		</svg>
																	)}
																</span>
															</span>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className="h-5 w-5 text-red-500 cursor-pointer"
																viewBox="0 0 20 20"
																fill="currentColor"
																onClick={
																	handleChangePassword
																}
															>
																<path
																	fillRule="evenodd"
																	d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
																	clipRule="evenodd"
																/>
															</svg>
														</div>
														{errors.password &&
															touched.password && (
																<div className="input-feedback text-red-400 text-xs font-medium capitalize">
																	{
																		errors.password
																	}
																</div>
															)}
													</>
												) : (
													""
												)}
											</div>
										</div>

										<div className="mt-5 flex items-center space-x-4">
											<button
												type="submit"
												disabled={isSubmitting}
												className={`py-3 uppercase border-box h-11 text-sm px-10 bg-blue-500 text-white font-bold hover:opacity-80 hover:text-white transition duration-200 ease-in-out rounded-full ${
													isSubmitting
														? "opacity-20"
														: ""
												}`}
											>
												Save
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
			)}
		</Layout>
	);
}
