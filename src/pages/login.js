import React, { useEffect, useState, useContext } from "react";
import { Link, navigate } from "gatsby";
import { Formik } from "formik";
import * as Yup from "yup";
import axiosConfig from "../axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "../contexts/AuthContextProvider";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default function Login() {
	// const [user, loading, error] = useAuthState(auth);
	const [loading, setLoading] = useState(true);
	const { user, setUser } = useContext(AuthContext);
	const [showPassword, setShowPassword] = useState(false);
	const toggleShowPassword = () => {
		showPassword ? setShowPassword(false) : setShowPassword(true);
	};
	useEffect(() => {
		if (user) {
			navigate("/dashboard");
			// return
		} else {
			setLoading(false);
		}
	}, [user]);

	return (
		<Layout fixedHeader={false}>
			<SEO title="Viztown - Vendor Login" />
			{user || loading ? (
				<div
					className="flex justify-center items-center w-full h-screen bg-grey"
					style={{ minHeight: "480px" }}
				>
					<span className="font-semibold">
						<img
							src={`${process.env.GATSBY_BASE_URL}/assets/backend/image/loader.gif`}
							alt="loading"
						/>
					</span>
				</div>
			) : (
				<div
					className="w-4/5 lg:w-1/4 2xl:w-1/5 mx-auto "
					style={{ minHeight: "450px" }}
				>
					<Formik
						initialValues={{ email: "", password: "" }}
						onSubmit={(values, { setSubmitting }) => {
							// setUser("userDetails")
							signInWithEmailAndPassword(
								auth,
								values.email,
								values.password
							)
								.then((userCredential) => {
									const user = userCredential.user;

									axiosConfig
										.get("/getVendorId", {
											params: {
												uid: userCredential.user.uid,
											},
										})
										.then((response) => {
											setSubmitting(false);
											toast.success(
												"Logged in successfully!",
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
											const userDetails = {
												vendor: response.data.data,
												user: user,
											};
											// localStorage.setItem('vendor', JSON.stringify(response.data.data))
											localStorage.setItem(
												"vendor_id",
												parseInt(response.data.data.id)
											);
											localStorage.setItem(
												"user",
												JSON.stringify(userDetails)
											);
											setUser(userDetails);
											setTimeout(() => {
												if (
													response.data.data.role ==
													"1"
												) {
													navigate("/dashboard");
												} else if (
													response.data.data.role ==
													"2"
												) {
													navigate(
														"/dashboard/listings"
													);
												} else {
													navigate(
														"/dashboard/meetings"
													);
												}
											}, 100);
										})
										.catch((error) => {
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
											signOut(auth);
										});
								})
								.catch((error) => {
									setSubmitting(false);
									const errorCode = error.code;
									const errorMessage = error.message;
									toast.error("Wrong Username or Password!", {
										position: "top-right",
										autoClose: 2000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
									});
								});
						}}
						validationSchema={Yup.object().shape({
							email: Yup.string()
								.email()
								.required("Email Id required"),
							password: Yup.string().required(
								"Please enter password"
							),
						})}
					>
						{(props) => {
							const {
								values,
								touched,
								errors,
								isSubmitting,
								handleChange,
								handleBlur,
								handleSubmit,
								setUser,
							} = props;
							return (
								<form
									className="relative"
									onSubmit={handleSubmit}
								>
									<div
										className={`flex flex-col gap-4 py-16 mt-8 ${
											isSubmitting ? "opacity-20" : ""
										}`}
									>
										<div className="w-full text-center mb-4">
											<h4 className="text-3xl font-bold font-playfair text-primary">
												Sign In
											</h4>
										</div>
										<div className="w-full flex flex-col gap-2">
											<label
												className="text-sm font-semibold text-primary"
												htmlFor="email"
											>
												Email
											</label>
											<input
												name="email"
												type="text"
												placeholder="Enter your email"
												value={values.email}
												onChange={handleChange}
												onBlur={handleBlur}
												className={`outline-none border border-gray-200 p-4 h-11 bg-grey text-xs font-semibold ${
													errors.email &&
													touched.email &&
													"error"
												}`}
											/>
											{errors.email && touched.email && (
												<div className="input-feedback text-red-400 text-xs font-semibold capitalize">
													{errors.email}
												</div>
											)}
										</div>
										<div className="w-full flex flex-col gap-2">
											<label
												className="text-sm font-semibold text-primary"
												htmlFor="email"
											>
												Password
											</label>
											<div className="relative w-full">
												<input
													name="password"
													type={
														showPassword
															? "text"
															: "password"
													}
													placeholder="Enter your password"
													value={values.password}
													onChange={handleChange}
													onBlur={handleBlur}
													className={`outline-none border border-gray-200 p-4 h-11 bg-grey text-xs font-semibold w-full ${
														errors.password &&
														touched.password &&
														"error"
													}`}
												/>
												{!showPassword ? (
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5 absolute top-3 right-2"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
														strokeWidth={2}
														onClick={
															toggleShowPassword
														}
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
														/>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
														/>
													</svg>
												) : (
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5 absolute top-3 right-2"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
														strokeWidth={2}
														onClick={
															toggleShowPassword
														}
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
														/>
													</svg>
												)}
											</div>
											{errors.password &&
												touched.password && (
													<div className="input-feedback text-red-400 text-xs font-semibold capitalize">
														{errors.password}
													</div>
												)}
										</div>
										<div className="w-full text-center mt-3">
											<button
												type="submit"
												disabled={isSubmitting}
												className={`uppercase w-full border-box h-11 text-sm px-10 bg-secondary text-white font-bold hover:opacity-80 hover:text-white transition duration-200 ease-in-out ${
													isSubmitting
														? "opacity-20"
														: ""
												}`}
											>
												Login
											</button>
										</div>

										<div
											id="forgot--password--link"
											className="w-full text-right"
										>
											<Link
												to="/forgot-password"
												className="text-xs font-semibold text-primary"
											>
												Forgot password?
											</Link>
										</div>
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
			)}
		</Layout>
	);
}
