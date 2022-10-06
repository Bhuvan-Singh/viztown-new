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

export default function Lessee(props) {
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
                    lessee_name: existingData.lessee_name,
                    lessee_email: existingData.lessee_email,
                    lessee_phone: existingData.lessee_phone,
                    lessee_co: existingData.lessee_co,
                    lessee_age: existingData.lessee_age,
                    lessee_occupation: existingData.lessee_occupation,
                    lessee_full_address: existingData.lessee_full_address,
                    lessee_pan: existingData.lessee_pan,
                });
            })
            .catch(function (error) {
                setInitialValues({
                    lessee_name: "",
                    lessee_email: "",
                    lessee_phone: "",
                    lessee_co: "",
                    lessee_age: "",
                    lessee_occupation: "",
                    lessee_full_address: "",
                    lessee_pan: "",
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
                                src={`${process.env.GATSBY_BASE_URL}/assets/backend/image/loader.gif`}
                                alt="loading"
                            />
                        </div>
                    ) : (
                        <div className="col-span-9 p-8 overflow-auto">
                            <Heading>Lessee Contact Details</Heading>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={(values, { setSubmitting }) => {
                                    const params = {
                                        agreement_id: props.id,
                                        status: "1",
                                        ...values,
                                    };
                                    // console.log(params);
                                    axiosConfig
                                        .post("/addLesseeDetails", params)
                                        .then(function (response) {
                                            setSubmitting(false);
                                            navigate(
                                                `/dashboard/agreements/create/rent/${props.id}/property-details`
                                            );
                                        })
                                        .catch(function (error) {
                                            // console.log(error);
                                            setSubmitting(false);
                                        });
                                }}
                                validationSchema={Yup.object().shape({
                                    lessee_name: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("Field is required"),
                                    lessee_email: Yup.string()
                                        .email("Please enter valid email id")
                                        .typeError("Enter valid data")
                                        .required("Email address is required"),
                                    lessee_phone: Yup.number(
                                        "Field is required"
                                    )
                                        .typeError("Enter valid data")
                                        .required("Field is required"),
                                    lessee_co: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("Field is required"),
                                    lessee_age: Yup.number()
                                        .typeError("Enter valid data")
                                        .required("Field is required"),
                                    lessee_occupation: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("Field is required"),
                                    lessee_full_address: Yup.string()
                                        .typeError("Enter valid data")
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
                                            <div className="w-3/5 flex-col space-y-6 pt-8 pb-4">
                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Lessee Name
                                                    </label>
                                                    <input
                                                        name="lessee_name"
                                                        type="text"
                                                        placeholder="Enter full name"
                                                        value={
                                                            values.lessee_name
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                            errors.lessee_name &&
                                                            touched.lessee_name &&
                                                            "error"
                                                        }`}
                                                    />
                                                    {errors.lessee_name &&
                                                        touched.lessee_name && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.lessee_name
                                                                }
                                                            </div>
                                                        )}
                                                </div>

                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Lessee C/O(Care Of)
                                                    </label>
                                                    <input
                                                        name="lessee_co"
                                                        type="text"
                                                        placeholder="Enter Care of. For example S/O Amit Kumar"
                                                        value={values.lessee_co}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                            errors.lessee_co &&
                                                            touched.lessee_co &&
                                                            "error"
                                                        }`}
                                                    />
                                                    {errors.lessee_co &&
                                                        touched.lessee_co && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.lessee_co
                                                                }
                                                            </div>
                                                        )}
                                                </div>

                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Lessee Age
                                                    </label>
                                                    <input
                                                        name="lessee_age"
                                                        type="text"
                                                        placeholder="Enter age"
                                                        value={
                                                            values.lessee_age
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                            errors.lessee_age &&
                                                            touched.lessee_age &&
                                                            "error"
                                                        }`}
                                                    />
                                                    {errors.lessee_age &&
                                                        touched.lessee_age && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.lessee_age
                                                                }
                                                            </div>
                                                        )}
                                                </div>

                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Lessee Occupation
                                                    </label>
                                                    <input
                                                        name="lessee_occupation"
                                                        type="text"
                                                        placeholder="Enter occupation"
                                                        value={
                                                            values.lessee_occupation
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                            errors.lessee_occupation &&
                                                            touched.lessee_occupation &&
                                                            "error"
                                                        }`}
                                                    />
                                                    {errors.lessee_occupation &&
                                                        touched.lessee_occupation && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.lessee_occupation
                                                                }
                                                            </div>
                                                        )}
                                                </div>

                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Lessee Pan No
                                                    </label>
                                                    <input
                                                        name="lessee_pan"
                                                        type="text"
                                                        placeholder="Enter Pan No"
                                                        value={
                                                            values.lessee_pan
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                            errors.lessee_pan &&
                                                            touched.lessee_pan &&
                                                            "error"
                                                        }`}
                                                    />
                                                    {errors.lessee_pan &&
                                                        touched.lessee_pan && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.lessee_pan
                                                                }
                                                            </div>
                                                        )}
                                                </div>

                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Lessee Email Address
                                                    </label>
                                                    <input
                                                        name="lessee_email"
                                                        type="text"
                                                        placeholder="Enter tenant email Address"
                                                        value={
                                                            values.lessee_email
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                            errors.lessee_email &&
                                                            touched.lessee_email &&
                                                            "error"
                                                        }`}
                                                    />
                                                    {errors.lessee_email &&
                                                        touched.lessee_email && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.lessee_email
                                                                }
                                                            </div>
                                                        )}
                                                </div>

                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Lessee Phone Number
                                                    </label>
                                                    <input
                                                        name="lessee_phone"
                                                        type="text"
                                                        placeholder="Enter tenant phone number"
                                                        value={
                                                            values.lessee_phone
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                            errors.lessee_phone &&
                                                            touched.lessee_phone &&
                                                            "error"
                                                        }`}
                                                    />
                                                    {errors.lessee_phone &&
                                                        touched.lessee_phone && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.lessee_phone
                                                                }
                                                            </div>
                                                        )}
                                                </div>

                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Lessee Full Address
                                                    </label>
                                                    <input
                                                        name="lessee_full_address"
                                                        type="text"
                                                        placeholder="Enter full address"
                                                        value={
                                                            values.lessee_full_address
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                            errors.lessee_full_address &&
                                                            touched.lessee_full_address &&
                                                            "error"
                                                        }`}
                                                    />
                                                    {errors.lessee_full_address &&
                                                        touched.lessee_full_address && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.lessee_full_address
                                                                }
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
                                                    Save & Continue
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
                        </div>
                    )}
                </div>
            </AuthorizedAgreement>
        </Layout>
    );
}
