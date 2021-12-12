import React, { useEffect, useState } from "react";
import { Link, navigate } from "gatsby";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosConfig from "../../../../../../axiosConfig";
import Loader from "../../../../../../components/Loader";
import Layout from "../../../../../../components/dashboard/common/Layout";
import Steps from "../../../../../../components/dashboard/agreements/Steps";
import Heading from "../../../../../../components/dashboard/common/Heading";
import AuthorizedAgreement from "../../../../../../components/dashboard/common/AuthorizedAgreement";

export default function KYC(props) {
    const [initialValues, setInitialValues] = useState(null);
    useEffect(() => {
        axiosConfig
            .get("/getAgreementDataById", {
                params: {
                    agreement_id: parseInt(props.id),
                },
            })
            .then(function (response) {
                const existingData = response.data.error
                    ? null
                    : response.data.data;
                setInitialValues({
                    kyc_type: existingData.kyc_type,
                    kyc: existingData.kyc,
                    kycPath: existingData.kycPath,
                    kyc_number: existingData.kyc_number,
                });
            })
            .catch(function (error) {
                setInitialValues({
                    kyc_type: "",
                    kyc: "",
                    kycPath: "",
                    kyc_number: "",
                });
            });
    }, []);
    return (
        <Layout fullView={true}>
            <AuthorizedAgreement id={props.id}>
                <div
                    className="grid grid-cols-12"
                    style={{ height: "calc(100vh - 60px)", position: "fixed" }}
                >
                    <div className="col-span-3">
                        <Steps params={props.params} />
                    </div>
                    {initialValues === null ? (
                        <div className="absolute w-full z-5 top-0 h-full flex justify-center items-center">
                            <img
                                src="http://cyberworx.co.in/viztown-2.0/admin/assets/backend/image/loader.gif"
                                alt="loading"
                            />
                        </div>
                    ) : (
                        <div className="col-span-9 p-8">
                            <Heading>KYC Documents</Heading>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={(values, { setSubmitting }) => {
                                    let formData = new FormData();
                                    const params = {
                                        agreement_id: props.id,
                                        status: "1",
                                        ...values,
                                    };
                                    for (const key in params) {
                                        formData.append(key, params[key]);
                                    }
                                    console.log(formData);
                                    axiosConfig
                                        .post("/addKycDetails", formData, {
                                            config: {
                                                headers: {
                                                    "Content-Type":
                                                        "multipart/form-data",
                                                },
                                            },
                                        })
                                        .then(function (response) {
                                            console.log(response);
                                            setSubmitting(false);
                                            navigate(
                                                `/dashboard/agreements/create/rent/${props.id}/download`
                                            );
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                            setSubmitting(false);
                                        });
                                }}
                                validationSchema={Yup.object().shape({
                                    kyc_type: Yup.string("Please select")
                                        .typeError("Please Select")
                                        .required("Field is required"),
                                    kyc: Yup.string("Please select")
                                        .typeError("Please Select Valid File")
                                        .required("Field is required"),
                                    kyc_number: Yup.string()
                                        .typeError("Enter Valid Data")
                                        .required("Field is required"),
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
                                            <div className="w-4/5 flex-col space-y-6 pt-8 pb-4">
                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Choose a document type
                                                    </label>
                                                    <div className="grid grid-cols-3 gap-4 items-start space-x-4 w-full ">
                                                        <div className="">
                                                            <select
                                                                name="kyc_type"
                                                                type="text"
                                                                value={
                                                                    values.kyc_type
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                className={`outline-none border border-gray-300 px-4 h-11 bg-white text-xs font-semibold rounded-md w-full ${
                                                                    errors.kyc_type &&
                                                                    touched.kyc_type &&
                                                                    "error"
                                                                }`}
                                                            >
                                                                <option>
                                                                    Please
                                                                    Select
                                                                </option>
                                                                <option value="1">
                                                                    Aadhaar Card
                                                                </option>
                                                                <option value="2">
                                                                    Pan Card
                                                                </option>
                                                            </select>
                                                            {errors.kyc_type &&
                                                                touched.kyc_type && (
                                                                    <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                        {
                                                                            errors.kyc_type
                                                                        }
                                                                    </div>
                                                                )}
                                                        </div>

                                                        <div className="">
                                                            <input
                                                                name="kyc_number"
                                                                type="text"
                                                                placeholder="Enter Document Number"
                                                                value={
                                                                    values.kyc_number
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                className={`outline-none border border-gray-300 p-4 w-full h-11 bg-white text-xs font-semibold rounded-md ${
                                                                    errors.kyc_number &&
                                                                    touched.kyc_number &&
                                                                    "error"
                                                                }`}
                                                            />
                                                            {errors.kyc_number &&
                                                                touched.kyc_number && (
                                                                    <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                        {
                                                                            errors.kyc_number
                                                                        }
                                                                    </div>
                                                                )}
                                                        </div>

                                                        <div className="">
                                                            <input
                                                                name="kyc"
                                                                type="file"
                                                                id="kyc"
                                                                // value={values.kyc}
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    setFieldValue(
                                                                        "kyc",
                                                                        event
                                                                            .currentTarget
                                                                            .files[0]
                                                                    );
                                                                }}
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md w-full peer hidden ${
                                                                    errors.kyc &&
                                                                    touched.kyc &&
                                                                    "error"
                                                                }`}
                                                            />
                                                            <label
                                                                className="text-xs font-semibold text-primary border border-gray-200 rounded-md py-3 px-4 h-11 uppercase bg-dashboardGrey cursor-pointer flex items-center space-x-2"
                                                                htmlFor="kyc"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-5 w-5"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                                                                    <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                                                                </svg>
                                                                <span>
                                                                    Upload
                                                                    Document
                                                                </span>
                                                            </label>
                                                            {errors.kyc &&
                                                                touched.kyc && (
                                                                    <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                        {
                                                                            errors.kyc
                                                                        }
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {values.kycPath !==
                                                        "" ? (
                                                            <img
                                                                className="w-48 rounded-md h-40 mb-4"
                                                                src={
                                                                    values.kycPath
                                                                }
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
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
                                                    Save & Continue
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
                        </div>
                    )}
                </div>
            </AuthorizedAgreement>
        </Layout>
    );
}
