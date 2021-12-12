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
                    sale_price: existingData.sale_price,
                    car_parking_slot: existingData.car_parking_slot,
                    society_maintenance: existingData.society_maintenance,
                    society_maintenance_amt:
                        existingData.society_maintenance_amt,
                    floor: existingData.floor,
                    property_furnished: existingData.property_furnished,
                    full_address: existingData.full_address,
                    payment_status: existingData.payment_status,
                    payment_method: existingData.payment_method,
                    payment_ref_no: existingData.payment_ref_no,
                    payment_amount: existingData.payment_amount,
                    payment_date: existingData.payment_date,
                    bank_details: existingData.bank_details,
                    property_north: existingData.property_north,
                    property_south: existingData.property_south,
                    property_east: existingData.property_east,
                    property_west: existingData.property_west,
                    agreement_date: existingData.agreement_date,
                    agreement_location: existingData.agreement_location,
                    previous_owner_name: existingData.previous_owner_name,
                    previous_owner_co: existingData.previous_owner_co,
                });
            })
            .catch(function (error) {
                setInitialValues({
                    property_area: "",
                    sale_price: "",
                    car_parking_slot: "",
                    society_maintenance: "",
                    society_maintenance_amt: "",
                    floor: "",
                    property_furnished: "2",
                    full_address: "",
                    payment_status: "",
                    payment_method: "",
                    payment_ref_no: "",
                    payment_amount: "",
                    payment_date: "",
                    bank_details: "",
                    property_north: "",
                    property_south: "",
                    property_east: "",
                    property_west: "",
                    agreement_date: "",
                    agreement_location: "",
                    previous_owner_name: "",
                    previous_owner_co: "",
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
                        <Steps params={props.params} type="sale" />
                    </div>
                    {initialValues === null ? (
                        <div className="absolute w-full z-5 top-0 h-full flex justify-center items-center">
                            <img
                                src="http://cyberworx.co.in/viztown-2.0/admin/assets/backend/image/loader.gif"
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
                                        security_amt: " ",
                                        lease_term: " ",
                                        lease_term_in: "1",
                                        lease_deed_sign_dt: " ",
                                        notice_period: " ",
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
                                                `/dashboard/agreements/create/sale/${props.id}/kyc`
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
                                    sale_price: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    car_parking_slot: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    society_maintenance:
                                        Yup.boolean().typeError(
                                            "Enter valid data"
                                        ),
                                    society_maintenance_amt:
                                        Yup.number().typeError(
                                            "Enter valid data"
                                        ),
                                    floor: Yup.number()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    property_furnished: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    full_address: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("required field"),

                                    payment_status: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    payment_method: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    payment_ref_no: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    payment_amount: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    payment_date: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    bank_details: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    property_north: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    property_south: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    property_east: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    property_west: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    agreement_date: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    agreement_location: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    previous_owner_name: Yup.string()
                                        .typeError("Enter valid data")
                                        .required("required field"),
                                    previous_owner_co: Yup.string()
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
                                                        Property Area in SQFT
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
                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-semibold text-primary">
                                                        Sale Price (sqft)
                                                    </label>
                                                    <input
                                                        name="sale_price"
                                                        type="text"
                                                        placeholder="Enter amount in rupees"
                                                        value={
                                                            values.sale_price
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                            errors.sale_price &&
                                                            touched.sale_price &&
                                                            "error"
                                                        }`}
                                                    />
                                                    {errors.sale_price &&
                                                        touched.sale_price && (
                                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                {
                                                                    errors.sale_price
                                                                }
                                                            </div>
                                                        )}
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
                                                    <label className="text-sm font-bold text-primary uppercase mt-4">
                                                        Payment Detials
                                                    </label>
                                                    <div className="grid grid-cols-4 gap-4">
                                                        <div className="w-full flex flex-col gap-2">
                                                            <label className="text-sm font-semibold text-primary">
                                                                Payment made?
                                                            </label>
                                                            <input
                                                                name="payment_status"
                                                                type="text"
                                                                placeholder="Payment Status"
                                                                value={
                                                                    values.payment_status
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                                    errors.payment_status &&
                                                                    touched.payment_status &&
                                                                    "error"
                                                                }`}
                                                            />
                                                            {errors.payment_status &&
                                                                touched.payment_status && (
                                                                    <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                        {
                                                                            errors.payment_status
                                                                        }
                                                                    </div>
                                                                )}
                                                        </div>
                                                        <div className="w-full flex flex-col gap-2">
                                                            <label className="text-sm font-semibold text-primary">
                                                                Payment Method
                                                            </label>
                                                            <input
                                                                name="payment_method"
                                                                type="text"
                                                                placeholder="Payment Method"
                                                                value={
                                                                    values.payment_method
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                                    errors.payment_method &&
                                                                    touched.payment_method &&
                                                                    "error"
                                                                }`}
                                                            />
                                                            {errors.payment_method &&
                                                                touched.payment_method && (
                                                                    <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                        {
                                                                            errors.payment_method
                                                                        }
                                                                    </div>
                                                                )}
                                                        </div>
                                                        <div className="w-full flex flex-col gap-2">
                                                            <label className="text-sm font-semibold text-primary">
                                                                REF NO
                                                            </label>
                                                            <input
                                                                name="payment_ref_no"
                                                                type="text"
                                                                placeholder="Enter Ref No"
                                                                value={
                                                                    values.payment_ref_no
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                                    errors.payment_ref_no &&
                                                                    touched.payment_ref_no &&
                                                                    "error"
                                                                }`}
                                                            />
                                                            {errors.payment_ref_no &&
                                                                touched.payment_ref_no && (
                                                                    <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                        {
                                                                            errors.payment_ref_no
                                                                        }
                                                                    </div>
                                                                )}
                                                        </div>
                                                        <div className="w-full flex flex-col gap-2">
                                                            <label className="text-sm font-semibold text-primary">
                                                                Payment Amount
                                                            </label>
                                                            <input
                                                                name="payment_amount"
                                                                type="text"
                                                                placeholder="Paymount Amount"
                                                                value={
                                                                    values.payment_amount
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                                    errors.payment_amount &&
                                                                    touched.payment_amount &&
                                                                    "error"
                                                                }`}
                                                            />
                                                            {errors.payment_amount &&
                                                                touched.payment_amount && (
                                                                    <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                        {
                                                                            errors.payment_amount
                                                                        }
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-4 gap-4">
                                                        <div className="w-full flex flex-col gap-2 col-span-1">
                                                            <label className="text-sm font-semibold text-primary">
                                                                Payment Date
                                                            </label>
                                                            <input
                                                                name="payment_date"
                                                                type="date"
                                                                placeholder="Paymount Date"
                                                                value={
                                                                    values.payment_date
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                                    errors.payment_date &&
                                                                    touched.payment_date &&
                                                                    "error"
                                                                }`}
                                                            />
                                                            {errors.payment_date &&
                                                                touched.payment_date && (
                                                                    <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                        {
                                                                            errors.payment_date
                                                                        }
                                                                    </div>
                                                                )}
                                                        </div>
                                                        <div className="w-full flex flex-col gap-2 col-span-3">
                                                            <label className="text-sm font-semibold text-primary">
                                                                Bank Name With
                                                                Branch Address
                                                            </label>
                                                            <input
                                                                name="bank_details"
                                                                type="text"
                                                                placeholder="Bank Details"
                                                                value={
                                                                    values.bank_details
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                                    errors.bank_details &&
                                                                    touched.bank_details &&
                                                                    "error"
                                                                }`}
                                                            />
                                                            {errors.bank_details &&
                                                                touched.bank_details && (
                                                                    <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                        {
                                                                            errors.bank_details
                                                                        }
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-bold text-primary uppercase mt-4">
                                                        Property Bounded By
                                                    </label>
                                                    <div className="grid grid-cols-4 gap-4">
                                                        <div className="w-full flex flex-col gap-2">
                                                            <label className="text-sm font-semibold text-primary">
                                                                North
                                                            </label>
                                                            <input
                                                                name="property_north"
                                                                type="text"
                                                                placeholder="North"
                                                                value={
                                                                    values.property_north
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                                    errors.property_north &&
                                                                    touched.property_north &&
                                                                    "error"
                                                                }`}
                                                            />
                                                            {errors.property_north &&
                                                                touched.property_north && (
                                                                    <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                        {
                                                                            errors.property_north
                                                                        }
                                                                    </div>
                                                                )}
                                                        </div>
                                                        <div className="w-full flex flex-col gap-2">
                                                            <label className="text-sm font-semibold text-primary">
                                                                South
                                                            </label>
                                                            <input
                                                                name="property_south"
                                                                type="text"
                                                                placeholder="South"
                                                                value={
                                                                    values.property_south
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                                    errors.property_south &&
                                                                    touched.property_south &&
                                                                    "error"
                                                                }`}
                                                            />
                                                            {errors.property_south &&
                                                                touched.property_south && (
                                                                    <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                        {
                                                                            errors.property_south
                                                                        }
                                                                    </div>
                                                                )}
                                                        </div>
                                                        <div className="w-full flex flex-col gap-2">
                                                            <label className="text-sm font-semibold text-primary">
                                                                East
                                                            </label>
                                                            <input
                                                                name="property_east"
                                                                type="text"
                                                                placeholder="East"
                                                                value={
                                                                    values.property_east
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                                    errors.property_east &&
                                                                    touched.property_east &&
                                                                    "error"
                                                                }`}
                                                            />
                                                            {errors.property_east &&
                                                                touched.property_east && (
                                                                    <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                        {
                                                                            errors.property_east
                                                                        }
                                                                    </div>
                                                                )}
                                                        </div>
                                                        <div className="w-full flex flex-col gap-2">
                                                            <label className="text-sm font-semibold text-primary">
                                                                West
                                                            </label>
                                                            <input
                                                                name="property_west"
                                                                type="text"
                                                                placeholder="West"
                                                                value={
                                                                    values.property_west
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                                    errors.property_west &&
                                                                    touched.property_west &&
                                                                    "error"
                                                                }`}
                                                            />
                                                            {errors.property_west &&
                                                                touched.property_west && (
                                                                    <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                        {
                                                                            errors.property_west
                                                                        }
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full flex flex-col gap-2">
                                                    <label className="text-sm font-bold text-primary uppercase mt-4">
                                                        Agreement Details
                                                    </label>
                                                    <div className="w-full flex flex-col gap-2">
                                                        <label className="text-sm font-semibold text-primary">
                                                            Agreement Date
                                                        </label>
                                                        <input
                                                            name="agreement_date"
                                                            type="date"
                                                            placeholder="date"
                                                            value={
                                                                values.agreement_date
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                            className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                                errors.agreement_date &&
                                                                touched.agreement_date &&
                                                                "error"
                                                            }`}
                                                        />
                                                        {errors.agreement_date &&
                                                            touched.agreement_date && (
                                                                <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                    {
                                                                        errors.agreement_date
                                                                    }
                                                                </div>
                                                            )}
                                                    </div>

                                                    <div className="w-full flex flex-col gap-2">
                                                        <label className="text-sm font-semibold text-primary">
                                                            Agreement Location
                                                        </label>
                                                        <input
                                                            name="agreement_location"
                                                            type="text"
                                                            placeholder="Agreement Location"
                                                            value={
                                                                values.agreement_location
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                            className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                                errors.agreement_location &&
                                                                touched.agreement_location &&
                                                                "error"
                                                            }`}
                                                        />
                                                        {errors.agreement_location &&
                                                            touched.agreement_location && (
                                                                <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                    {
                                                                        errors.agreement_location
                                                                    }
                                                                </div>
                                                            )}
                                                    </div>

                                                    <div className="w-full flex flex-col gap-2">
                                                        <label className="text-sm font-semibold text-primary">
                                                            Previous Owner Name
                                                        </label>
                                                        <input
                                                            name="previous_owner_name"
                                                            type="text"
                                                            placeholder="Previous Owner Name"
                                                            value={
                                                                values.previous_owner_name
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                            className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                                errors.previous_owner_name &&
                                                                touched.previous_owner_name &&
                                                                "error"
                                                            }`}
                                                        />
                                                        {errors.previous_owner_name &&
                                                            touched.previous_owner_name && (
                                                                <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                    {
                                                                        errors.previous_owner_name
                                                                    }
                                                                </div>
                                                            )}
                                                    </div>

                                                    <div className="w-full flex flex-col gap-2">
                                                        <label className="text-sm font-semibold text-primary">
                                                            Previous Owner C/O
                                                        </label>
                                                        <input
                                                            name="previous_owner_co"
                                                            type="text"
                                                            placeholder="S/O or D/O or W/O"
                                                            value={
                                                                values.previous_owner_co
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                            className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${
                                                                errors.previous_owner_co &&
                                                                touched.previous_owner_co &&
                                                                "error"
                                                            }`}
                                                        />
                                                        {errors.previous_owner_co &&
                                                            touched.previous_owner_co && (
                                                                <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                                                                    {
                                                                        errors.previous_owner_co
                                                                    }
                                                                </div>
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
