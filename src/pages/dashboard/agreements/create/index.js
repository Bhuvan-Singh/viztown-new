import React, { useState, useEffect } from "react";
import { Link, navigate } from "gatsby";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosConfig from "../../../../axiosConfig";
import Loader from "../../../../components/Loader";
import Layout from "../../../../components/dashboard/common/Layout";
import Steps from "../../../../components/dashboard/agreements/Steps";
import Heading from "../../../../components/dashboard/common/Heading";

export default function NewAgreement(props) {
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState(null);

    return (
        <Layout>
            <div className="py-8">
                <Heading>Create a New Agreement</Heading>
                <div className="mx-auto">
                    <Formik
                        initialValues={{
                            title: "",
                            agreement_type: "",
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            const path =
                                values.agreement_type == "1" ? "rent" : "sale";
                            const params = {
                                vendor_id: localStorage.getItem("vendor_id"),
                                status: "1",
                                ...values,
                            };
                            console.log(params);
                            axiosConfig
                                .post("/addAgreementType", params)
                                .then(function (response) {
                                    setSubmitting(false);
                                    navigate(
                                        `/dashboard/agreements/create/${path}/${response.data.data.agreement_id}/lessor`
                                    );
                                })
                                .catch(function (error) {
                                    // console.log(error);
                                    setSubmitting(false);
                                });
                        }}
                        validationSchema={Yup.object().shape({
                            title: Yup.string().required("Title is required"),
                            agreement_type: Yup.string().required(
                                "Agreement Type required"
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
                            } = props;
                            return (
                                <form
                                    className={`relative ${
                                        isSubmitting ? "opacity-20" : ""
                                    }`}
                                    onSubmit={handleSubmit}
                                >
                                    <div className="w-2/5 flex-col space-y-6 pt-8 pb-4">
                                        <div className="w-full flex flex-col gap-2">
                                            <label className="text-sm font-semibold text-primary">
                                                Give a title for new agreement.
                                            </label>
                                            <input
                                                name="title"
                                                type="text"
                                                placeholder="Enter Name"
                                                value={values.title}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                    errors.title &&
                                                    touched.title &&
                                                    "error"
                                                }`}
                                            />
                                            {errors.title && touched.title && (
                                                <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                    {errors.title}
                                                </div>
                                            )}
                                        </div>

                                        <div className="w-full flex flex-col gap-2">
                                            <label className="text-sm font-semibold text-primary">
                                                Select agreement type.
                                            </label>
                                            <div className="w-full flex gap-4">
                                                <div>
                                                    <input
                                                        name="agreement_type"
                                                        id="rent"
                                                        type="radio"
                                                        value="1"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`hidden peer`}
                                                    />
                                                    <label
                                                        className="text-sm font-semibold text-primary border-2 block border-gray-200 rounded-xl py-12 px-12 uppercase peer-checked:border-dashboardBlue peer-checked:bg-blue-300 peer-checked:bg-opacity-10 peer-checked:text-dashboardBlue cursor-pointer"
                                                        htmlFor="rent"
                                                    >
                                                        Rent
                                                    </label>
                                                </div>
                                                <div>
                                                    <input
                                                        name="agreement_type"
                                                        type="radio"
                                                        value="2"
                                                        id="sale"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`hidden peer`}
                                                    />
                                                    <label
                                                        className="text-sm font-semibold text-primary border-2 block border-gray-200 rounded-xl py-12 px-12 uppercase peer-checked:border-dashboardBlue peer-checked:bg-blue-300 peer-checked:bg-opacity-10 peer-checked:text-dashboardBlue cursor-pointer"
                                                        htmlFor="sale"
                                                    >
                                                        Sale
                                                    </label>
                                                </div>
                                            </div>
                                            {errors.agreement_type &&
                                                touched.agreement_type && (
                                                    <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                        {errors.agreement_type}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`capitalize border-box h-11 text-sm px-10 bg-dashboardBlue text-white font-semibold hover:opacity-80 hover:text-white transition duration-200 ease-in-out rounded-full ${
                                                isSubmitting ? "opacity-20" : ""
                                            }`}
                                        >
                                            Create Agreement
                                        </button>
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
            </div>
        </Layout>
    );
}
