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

export default function PropertyDetails(props) {
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
                    property_area: existingData.property_area,
                    monthly_rent_amt: existingData.monthly_rent_amt,
                    security_amt: existingData.security_amt,
                    car_parking_slot: existingData.car_parking_slot,
                    society_maintenance: existingData.society_maintenance,
                    society_maintenance_amt:
                        existingData.society_maintenance_amt,
                    floor: existingData.floor,
                    lease_term: existingData.lease_term,
                    lease_term_in: existingData.lease_term_in,
                    lease_deed_sign_dt: existingData.lease_deed_sign_dt,
                    notice_period: existingData.notice_period,
                    property_furnished: existingData.property_furnished,
                    full_address: existingData.full_address,
                    rent_due_date: existingData.rent_due_date,
                    rent_increment: existingData.rent_increment,
                });
            })
            .catch(function (error) {
                setInitialValues({
                    property_area: "",
                    monthly_rent_amt: "",
                    security_amt: "",
                    car_parking_slot: "",
                    society_maintenance: "",
                    society_maintenance_amt: "",
                    floor: "",
                    lease_term: "",
                    lease_term_in: "1",
                    lease_deed_sign_dt: "",
                    notice_period: "",
                    property_furnished: "2",
                    full_address: "",
                    rent_due_date: "",
                    rent_increment: "",
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
                        <div
                            className="col-span-9 p-8"
                            style={{ height: "100%", overflow: "auto" }}
                        >
                            <Heading>Property Details</Heading>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={(values, { setSubmitting }) => {
                                    const params = {
                                        agreement_id: props.id,
                                        status: "1",
                                        ...values,
                                    };
                                    params.society_maintenance =
                                        params.society_maintenance === "0"
                                            ? params.society_maintenance
                                            : "1";
                                    // console.log(params);
                                    axiosConfig
                                        .post("/addPropertyDetails", params)
                                        .then(function (response) {
                                            // console.log(response);
                                            setSubmitting(false);
                                            navigate(
                                                `/dashboard/agreements/create/rent/${props.id}/kyc`
                                            );
                                        })
                                        .catch(function (error) {
                                            // console.log(error);
                                            setSubmitting(false);
                                        });
                                }}
                                validationSchema={Yup.object().shape({
                                    property_area: Yup.number()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    monthly_rent_amt: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    security_amt: Yup.number()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    car_parking_slot: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    society_maintenance: Yup.boolean(),
                                    society_maintenance_amt: Yup.number(),
                                    floor: Yup.number()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    lease_term_in: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    lease_term: Yup.number()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    lease_deed_sign_dt: Yup.date()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    notice_period: Yup.number()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    property_furnished: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    full_address: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    rent_due_date: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    rent_increment: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("required field"),
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
                                                        Property Area
                                                    </label>
                                                    <input
                                                        name="property_area"
                                                        type="text"
                                                        placeholder="Enter property area in sqft"
                                                        value={
                                                            values.property_area
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                            errors.property_area &&
                                                            touched.property_area &&
                                                            "error"
                                                        }`}
                                                    />
                                                    {errors.property_area &&
                                                        touched.property_area && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.property_area
                                                                }
                                                            </div>
                                                        )}
                                                </div>
                                                <div class="grid grid-cols-2 gap-4">
                                                    <div className="w-full flex flex-col gap-2">
                                                        <label className="text-sm font-semibold text-primary">
                                                            Monthly Rent Amount
                                                        </label>
                                                        <input
                                                            name="monthly_rent_amt"
                                                            type="text"
                                                            placeholder="Enter rent amount in rupees"
                                                            value={
                                                                values.monthly_rent_amt
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                            className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                                errors.monthly_rent_amt &&
                                                                touched.monthly_rent_amt &&
                                                                "error"
                                                            }`}
                                                        />
                                                        {errors.monthly_rent_amt &&
                                                            touched.monthly_rent_amt && (
                                                                <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                    {
                                                                        errors.monthly_rent_amt
                                                                    }
                                                                </div>
                                                            )}
                                                    </div>
                                                    <div className="w-full flex flex-col gap-2">
                                                        <label className="text-sm font-semibold text-primary">
                                                            Rent Payble On Date
                                                        </label>
                                                        <input
                                                            name="rent_due_date"
                                                            type="text"
                                                            placeholder="On 5th of every month"
                                                            value={
                                                                values.rent_due_date
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                            className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                                errors.rent_due_date &&
                                                                touched.rent_due_date &&
                                                                "error"
                                                            }`}
                                                        />
                                                        {errors.rent_due_date &&
                                                            touched.rent_due_date && (
                                                                <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                    {
                                                                        errors.rent_due_date
                                                                    }
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                                <div class="grid grid-cols-2 gap-4">
                                                    <div className="w-full flex flex-col gap-2">
                                                        <label className="text-sm font-semibold text-primary">
                                                            Security Amount
                                                        </label>
                                                        <input
                                                            name="security_amt"
                                                            type="text"
                                                            placeholder="Enter security amount in rupees"
                                                            value={
                                                                values.security_amt
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                            className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                                errors.security_amt &&
                                                                touched.security_amt &&
                                                                "error"
                                                            }`}
                                                        />
                                                        {errors.security_amt &&
                                                            touched.security_amt && (
                                                                <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                    {
                                                                        errors.security_amt
                                                                    }
                                                                </div>
                                                            )}
                                                    </div>
                                                    <div className="w-full flex flex-col gap-2">
                                                        <label className="text-sm font-semibold text-primary">
                                                            Rent Increment Per
                                                            Year %
                                                        </label>
                                                        <input
                                                            name="rent_increment"
                                                            type="text"
                                                            placeholder="10%"
                                                            value={
                                                                values.rent_increment
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                            className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                                errors.rent_increment &&
                                                                touched.rent_increment &&
                                                                "error"
                                                            }`}
                                                        />
                                                        {errors.rent_increment &&
                                                            touched.rent_increment && (
                                                                <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                    {
                                                                        errors.rent_increment
                                                                    }
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>

                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Car Parking Slot
                                                    </label>
                                                    <div className="w-full flex gap-2">
                                                        <div>
                                                            <input
                                                                name="car_parking_slot"
                                                                id="rent"
                                                                type="radio"
                                                                value="1"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                className={`hidden peer`}
                                                                checked={
                                                                    values.car_parking_slot ===
                                                                    "1"
                                                                }
                                                            />
                                                            <label
                                                                className="text-xs font-semibold text-primary border block border-gray-200 rounded-xl py-2 px-2 uppercase peer-checked:border-dashboardBlue peer-checked:bg-blue-300 peer-checked:bg-opacity-10 peer-checked:text-dashboardBlue cursor-pointer"
                                                                htmlFor="rent"
                                                            >
                                                                Yes
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <input
                                                                name="car_parking_slot"
                                                                type="radio"
                                                                value="0"
                                                                id="sale"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                className={`hidden peer`}
                                                                checked={
                                                                    values.car_parking_slot ===
                                                                    "0"
                                                                }
                                                            />
                                                            <label
                                                                className="text-xs font-semibold text-primary border block border-gray-200 rounded-xl py-2 px-2 uppercase peer-checked:border-dashboardBlue peer-checked:bg-blue-300 peer-checked:bg-opacity-10 peer-checked:text-dashboardBlue cursor-pointer"
                                                                htmlFor="sale"
                                                            >
                                                                No
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {errors.car_parking_slot &&
                                                        touched.car_parking_slot && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.car_parking_slot
                                                                }
                                                            </div>
                                                        )}
                                                </div>

                                                <div className="w-full flex flex-col gap-2">
                                                    <div className="flex items-center">
                                                        <input
                                                            name="society_maintenance"
                                                            id="society_maintenance"
                                                            type="checkbox"
                                                            value="1"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                            className={`hidden peer`}
                                                            checked={
                                                                values.society_maintenance ==
                                                                "1"
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        <label
                                                            className="text-xs font-semibold text-primary border-2 block text-gray-200 border-gray-200 rounded-md p-1 uppercase peer-checked:border-dashboardBlue peer-checked:bg-blue-300 peer-checked:bg-opacity-10 peer-checked:text-dashboardBlue cursor-pointer"
                                                            htmlFor="society_maintenance"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4"
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
                                                                    d="M5 13l4 4L19 7"
                                                                />
                                                            </svg>
                                                        </label>
                                                        <h5
                                                            className="text-sm font-semibold text-primary capitalize ml-2"
                                                            htmlFor="society_maintenance"
                                                        >
                                                            society maintenance
                                                        </h5>
                                                    </div>
                                                    {errors.society_maintenance &&
                                                        touched.society_maintenance && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.society_maintenance
                                                                }
                                                            </div>
                                                        )}
                                                </div>

                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Society Maintenance
                                                        Deposit Amount
                                                    </label>
                                                    <input
                                                        name="society_maintenance_amt"
                                                        type="text"
                                                        placeholder="Enter security amount in rupees"
                                                        value={
                                                            values.society_maintenance_amt
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                            errors.society_maintenance_amt &&
                                                            touched.society_maintenance_amt &&
                                                            "error"
                                                        }`}
                                                    />
                                                    {errors.society_maintenance_amt &&
                                                        touched.society_maintenance_amt && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.society_maintenance_amt
                                                                }
                                                            </div>
                                                        )}
                                                </div>

                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Floor
                                                    </label>
                                                    <input
                                                        name="floor"
                                                        type="text"
                                                        placeholder="Enter security amount in rupees"
                                                        value={values.floor}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                            errors.floor &&
                                                            touched.floor &&
                                                            "error"
                                                        }`}
                                                    />
                                                    {errors.floor &&
                                                        touched.floor && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {errors.floor}
                                                            </div>
                                                        )}
                                                </div>

                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Lease Term
                                                    </label>
                                                    <div className="flex items-center space-x-4 w-full">
                                                        <div className="w-1/2">
                                                            <select
                                                                name="lease_term_in"
                                                                type="text"
                                                                value={
                                                                    values.lease_term_in
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                className={`outline-none border border-gray-300 px-4 h-11 bg-white text-xs font-semibold rounded-md w-full ${
                                                                    errors.lease_term_in &&
                                                                    touched.lease_term_in &&
                                                                    "error"
                                                                }`}
                                                            >
                                                                <option value="0">
                                                                    Months
                                                                </option>
                                                                <option value="1">
                                                                    Years
                                                                </option>
                                                            </select>
                                                            {errors.lease_term_in &&
                                                                touched.lease_term_in && (
                                                                    <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                        {
                                                                            errors.lease_term_in
                                                                        }
                                                                    </div>
                                                                )}
                                                        </div>
                                                        <div className="w-1/2">
                                                            <input
                                                                name="lease_term"
                                                                type="text"
                                                                placeholder="Enter duration"
                                                                value={
                                                                    values.lease_term
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md w-full ${
                                                                    errors.lease_term &&
                                                                    touched.lease_term &&
                                                                    "error"
                                                                }`}
                                                            />
                                                            {errors.lease_term &&
                                                                touched.lease_term && (
                                                                    <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                        {
                                                                            errors.lease_term
                                                                        }
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Lease Deed Signing Date
                                                    </label>
                                                    <input
                                                        name="lease_deed_sign_dt"
                                                        type="date"
                                                        placeholder="Enter security amount in rupees"
                                                        value={
                                                            values.lease_deed_sign_dt
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                            errors.lease_deed_sign_dt &&
                                                            touched.lease_deed_sign_dt &&
                                                            "error"
                                                        }`}
                                                    />
                                                    {errors.lease_deed_sign_dt &&
                                                        touched.lease_deed_sign_dt && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.lease_deed_sign_dt
                                                                }
                                                            </div>
                                                        )}
                                                </div>

                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Notice Period
                                                    </label>
                                                    <input
                                                        name="notice_period"
                                                        type="text"
                                                        placeholder="Enter notice period in months"
                                                        value={
                                                            values.notice_period
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                            errors.notice_period &&
                                                            touched.notice_period &&
                                                            "error"
                                                        }`}
                                                    />
                                                    {errors.notice_period &&
                                                        touched.notice_period && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.notice_period
                                                                }
                                                            </div>
                                                        )}
                                                </div>

                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Property Furnishing
                                                    </label>
                                                    <div className="w-full flex gap-2">
                                                        <div>
                                                            <input
                                                                name="property_furnished"
                                                                id="unfurnished"
                                                                type="radio"
                                                                value="1"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                className={`hidden peer`}
                                                                checked={
                                                                    values.property_furnished ===
                                                                    "1"
                                                                }
                                                            />
                                                            <label
                                                                className="text-xs font-semibold text-primary border block border-gray-200 rounded-xl py-2 px-3 uppercase peer-checked:border-dashboardBlue peer-checked:bg-blue-300 peer-checked:bg-opacity-10 peer-checked:text-dashboardBlue cursor-pointer"
                                                                htmlFor="unfurnished"
                                                            >
                                                                unfurnished
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <input
                                                                name="property_furnished"
                                                                type="radio"
                                                                value="2"
                                                                id="semi-furnished"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                className={`hidden peer`}
                                                                checked={
                                                                    values.property_furnished ===
                                                                    "2"
                                                                }
                                                            />
                                                            <label
                                                                className="text-xs font-semibold text-primary border block border-gray-200 rounded-xl py-2 px-3 uppercase peer-checked:border-dashboardBlue peer-checked:bg-blue-300 peer-checked:bg-opacity-10 peer-checked:text-dashboardBlue cursor-pointer"
                                                                htmlFor="semi-furnished"
                                                            >
                                                                semi-furnished
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <input
                                                                name="property_furnished"
                                                                type="radio"
                                                                value="3"
                                                                id="furnished"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                className={`hidden peer`}
                                                                checked={
                                                                    values.property_furnished ===
                                                                    "3"
                                                                }
                                                            />
                                                            <label
                                                                className="text-xs font-semibold text-primary border block border-gray-200 rounded-xl py-2 px-3 uppercase peer-checked:border-dashboardBlue peer-checked:bg-blue-300 peer-checked:bg-opacity-10 peer-checked:text-dashboardBlue cursor-pointer"
                                                                htmlFor="furnished"
                                                            >
                                                                furnished
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {errors.property_furnished &&
                                                        touched.property_furnished && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.property_furnished
                                                                }
                                                            </div>
                                                        )}
                                                </div>

                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Full Address
                                                    </label>
                                                    <input
                                                        name="full_address"
                                                        type="text"
                                                        placeholder="Enter full address"
                                                        value={
                                                            values.full_address
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                            errors.full_address &&
                                                            touched.full_address &&
                                                            "error"
                                                        }`}
                                                    />
                                                    {errors.full_address &&
                                                        touched.full_address && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.full_address
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
