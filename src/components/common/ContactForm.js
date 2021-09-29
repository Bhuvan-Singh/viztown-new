import React from "react";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosConfig from "../../axiosConfig";

export default function ContactForm() {
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          number: "",
          email: "",
          property_type: "",
          address: "",
          message: "",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string("Please Enter Valid Name").required(
            "your Name is required"
          ),
          number: Yup.number("Please Enter Valid Number").required(
            "number Number is Required"
          ),
          email: Yup.string()
            .email("Please enter valid email id")
            .required("Email is required"),
          property_type: Yup.string().required("Property Type is required"),
          address: Yup.string().required("Address is required"),
          message: Yup.string(),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          axiosConfig
            .post("/sendEnquiry", values)
            .then((result) => {
              setSubmitting(false);
              toast.success("Enquiry Sent Successfully!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              resetForm();
            })
            .catch((error) => {
              toast.success("Someething went wrong!", {
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
              className={`relative w-full mt-10 ${
                isSubmitting ? "opacity-20" : ""
              }`}
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                <div className="w-full flex flex-col gap-2">
                  <input
                    className={`outline-none border border-gray-200 p-4 h-11 bg-grey text-xs font-semibold ${
                      errors.name && touched.name && "error"
                    }`}
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Full Name*"
                  />
                  {errors.name && touched.name && (
                    <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                      {errors.name}
                    </div>
                  )}
                </div>
                <div className="w-full flex flex-col gap-2">
                  <input
                    className={`outline-none border border-gray-200 p-4 h-11 bg-grey text-xs font-semibold ${
                      errors.number && touched.number && "error"
                    }`}
                    type="text"
                    name="number"
                    id="number"
                    placeholder="Number*"
                    value={values.number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.number && touched.number && (
                    <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                      {errors.number}
                    </div>
                  )}
                </div>
                <div className="w-full flex flex-col gap-2">
                  <input
                    className={`outline-none border border-gray-200 p-4 h-11 bg-grey text-xs font-semibold ${
                      errors.email && touched.email && "error"
                    }`}
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email*"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="w-full flex flex-col gap-2">
                  <select
                    className={`outline-none border border-gray-200 px-2 h-11 bg-grey text-xs font-semibold ${
                      errors.property_type && touched.property_type && "error"
                    }`}
                    name="property_type"
                    id=""
                    value={values.property_type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option className="text-lightGrey" value="">
                      Property Type *
                    </option>
                    <option value="Commercial">Commercial</option>
                    <option value="Residential">Residential</option>
                  </select>
                  {errors.property_type && touched.property_type && (
                    <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                      {errors.property_type}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <div className="w-full flex flex-col gap-2 mb-6">
                  <input
                    className={`outline-none border border-gray-200 p-4 h-11 bg-grey text-xs font-semibold w-full${
                      errors.address && touched.address && "error"
                    }`}
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Your Address*"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.address && touched.address && (
                    <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                      {errors.address}
                    </div>
                  )}
                </div>

                <div className="w-full flex flex-col gap-2 mb-4">
                  <textarea
                    className={`outline-none border border-gray-200 p-4 h-32 bg-grey text-xs font-semibold w-full  ${
                      errors.email && touched.email && "error"
                    }`}
                    name="message"
                    id=""
                    placeholder="Message.."
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></textarea>

                  {errors.message && touched.message && (
                    <div className="input-feedback text-red-400 text-xs font-semibold capitalize">
                      {errors.message}
                    </div>
                  )}
                </div>
                <button className="capitalize py-3 px-10 bg-secondary text-sm text-white font-bold rounded-md hover:bg-primary hover:text-white transition duration-500 ease-in-out">
                  Submit
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
      <ToastContainer />
    </div>
  );
}
