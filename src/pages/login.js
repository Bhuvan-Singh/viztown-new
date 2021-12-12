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
                            src="http://cyberworx.co.in/viztown-2.0/admin/assets/backend/image/loader.gif"
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
                                            <input
                                                name="password"
                                                type="password"
                                                placeholder="Enter your password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`outline-none border border-gray-200 p-4 h-11 bg-grey text-xs font-semibold ${
                                                    errors.password &&
                                                    touched.password &&
                                                    "error"
                                                }`}
                                            />
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
                                                src="http://cyberworx.co.in/viztown-2.0/admin/assets/backend/image/loader.gif"
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
