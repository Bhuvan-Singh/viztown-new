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

export default function Lessor(props) {
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
                    lessor_name: existingData.lessor_name,
                    lessor_email: existingData.lessor_email,
                    lessor_phone: existingData.lessor_phone,
                    lessor_co: existingData.lessor_co,
                    lessor_age: existingData.lessor_age,
                    lessor_occupation: existingData.lessor_occupation,
                    lessor_full_address: existingData.lessor_full_address,
                    lessor_pan: existingData.lessor_pan,
                });
            })
            .catch(function (error) {
                setInitialValues({
                    lessor_name: "",
                    lessor_email: "",
                    lessor_phone: "",
                    lessor_co: "",
                    lessor_age: "",
                    lessor_occupation: "",
                    lessor_full_address: "",
                    lessor_pan: "",
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
                    <div className="col-span-3 ">
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
                        <div className="col-span-9 p-8 overflow-auto">
                            <Heading>Lessor Contact Details</Heading>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={(values, { setSubmitting }) => {
                                    const params = {
                                        agreement_id: props.id,
                                        status: "1",
                                        ...values,
                                    };
                                    console.log(params);
                                    axiosConfig
                                        .post("/addLessorDetails", params)
                                        .then(function (response) {
                                            setSubmitting(false);
                                            navigate(
                                                `/dashboard/agreements/create/rent/${props.id}/lessee`
                                            );
                                        })
                                        .catch(function (error) {
                                            // console.log(error);
                                            setSubmitting(false);
                                        });
                                }}
                                validationSchema={Yup.object().shape({
                                    lessor_name: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("Field is required"),
                                    lessor_email: Yup.string()
                                        .email("Please enter valid email id")
                                        .typeError("Enter valid data")
                                        .required("Email address is required"),
                                    lessor_phone: Yup.number(
                                        "Field is required"
                                    )
                                        .typeError("Enter valid data")
                                        .required("Field is required"),
                                    lessor_co: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("Field is required"),
                                    lessor_age: Yup.number()
                                        .typeError("Enter valid data")
                                        .required("Field is required"),
                                    lessor_occupation: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("Field is required"),
                                    lessor_full_address: Yup.string()
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
                                                        Lessor Name
                                                    </label>
                                                    <input
                                                        name="lessor_name"
                                                        type="text"
                                                        placeholder="Enter Full Name"
                                                        value={
                                                            values.lessor_name
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                            errors.lessor_name &&
                                                            touched.lessor_name &&
                                                            "error"
                                                        }`}
                                                    />
                                                    {errors.lessor_name &&
                                                        touched.lessor_name && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.lessor_name
                                                                }
                                                            </div>
                                                        )}
                                                </div>
                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Lessor C/O(Care Of)
                                                    </label>
                                                    <input
                                                        name="lessor_co"
                                                        type="text"
                                                        placeholder="Enter Care of. For example S/O Amit Kumar"
                                                        value={values.lessor_co}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                            errors.lessor_co &&
                                                            touched.lessor_co &&
                                                            "error"
                                                        }`}
                                                    />
                                                    {errors.lessor_co &&
                                                        touched.lessor_co && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.lessor_co
                                                                }
                                                            </div>
                                                        )}
                                                </div>

                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Lessor Age
                                                    </label>
                                                    <input
                                                        name="lessor_age"
                                                        type="text"
                                                        placeholder="Enter age"
                                                        value={
                                                            values.lessor_age
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                            errors.lessor_age &&
                                                            touched.lessor_age &&
                                                            "error"
                                                        }`}
                                                    />
                                                    {errors.lessor_age &&
                                                        touched.lessor_age && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.lessor_age
                                                                }
                                                            </div>
                                                        )}
                                                </div>

                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Lessor Occupation
                                                    </label>
                                                    <input
                                                        name="lessor_occupation"
                                                        type="text"
                                                        placeholder="Enter occupation"
                                                        value={
                                                            values.lessor_occupation
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                            errors.lessor_occupation &&
                                                            touched.lessor_occupation &&
                                                            "error"
                                                        }`}
                                                    />
                                                    {errors.lessor_occupation &&
                                                        touched.lessor_occupation && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.lessor_occupation
                                                                }
                                                            </div>
                                                        )}
                                                </div>

                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Lessor Pan No
                                                    </label>
                                                    <input
                                                        name="lessor_pan"
                                                        type="text"
                                                        placeholder="Enter Pan No"
                                                        value={
                                                            values.lessor_pan
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                            errors.lessor_pan &&
                                                            touched.lessor_pan &&
                                                            "error"
                                                        }`}
                                                    />
                                                    {errors.lessor_pan &&
                                                        touched.lessor_pan && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.lessor_pan
                                                                }
                                                            </div>
                                                        )}
                                                </div>

                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Lessor Email Address
                                                    </label>
                                                    <input
                                                        name="lessor_email"
                                                        type="text"
                                                        placeholder="Enter email address"
                                                        value={
                                                            values.lessor_email
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                            errors.lessor_email &&
                                                            touched.lessor_email &&
                                                            "error"
                                                        }`}
                                                    />
                                                    {errors.lessor_email &&
                                                        touched.lessor_email && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.lessor_email
                                                                }
                                                            </div>
                                                        )}
                                                </div>

                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Lessor Phone Number
                                                    </label>
                                                    <input
                                                        name="lessor_phone"
                                                        type="text"
                                                        placeholder="Enter phone number"
                                                        value={
                                                            values.lessor_phone
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                            errors.lessor_phone &&
                                                            touched.lessor_phone &&
                                                            "error"
                                                        }`}
                                                    />
                                                    {errors.lessor_phone &&
                                                        touched.lessor_phone && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.lessor_phone
                                                                }
                                                            </div>
                                                        )}
                                                </div>

                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Lessor Full Address
                                                    </label>
                                                    <input
                                                        name="lessor_full_address"
                                                        type="text"
                                                        placeholder="Enter full address"
                                                        value={
                                                            values.lessor_full_address
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                            errors.lessor_full_address &&
                                                            touched.lessor_full_address &&
                                                            "error"
                                                        }`}
                                                    />
                                                    {errors.lessor_full_address &&
                                                        touched.lessor_full_address && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.lessor_full_address
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
