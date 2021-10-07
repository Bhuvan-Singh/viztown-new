import React, { useEffect, useState } from 'react'
import {Link, navigate} from 'gatsby'
import { Formik, useFormikContext } from "formik"
import * as Yup from "yup"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axiosConfig from '../../../../../axiosConfig';
import Loader from '../../../../../components/Loader'
import Layout from '../../../../../components/dashboard/common/Layout'
import Heading from '../../../../../components/dashboard/common/Heading'

export default function EditListing(props) {
    const [featuredImagePreview, setFeaturedImagePreview] = useState({
        path: ""
    });
    const [categoryList, setCategoryList] = useState(null)
    const [propertyTypes, setPropertyTypes] = useState(null)
    const [initialValues, setInitialValues] = useState(null)

    useEffect(()=>{
        axiosConfig.get('/getPropertyData',{
            params: {
                id: parseInt(props.id),
            }
        })
            .then(function (response) {  
                const existingData = response.data.error ? null : response.data.data

                existingData === null ? setInitialValues({id: props.id ,property_name: "", property_id: "", visibility: "0", property_category:"", property_type: "", address: "", sublocality: "", state: "", latitude:"",longitude: "", beds:"", bath:"", area:"", feature_image: ""}) :

                setInitialValues({id: props.id ,property_name: existingData.name, property_id: existingData.propertyId, visibility: existingData.visibility, property_category:existingData.category, property_type: existingData.type, address: existingData.location, sublocality: existingData.sublocality, state: existingData.state, latitude:existingData.latitude, longitude:existingData.longitude , beds:existingData.beds, bath:existingData.baths, area:existingData.carpetArea, feature_image: existingData.featuredImage})
                
            })
            .catch(function (error) {
                setInitialValues({id: props.id ,property_name: "", property_id: "", visibility: "0", property_category:"", property_type: "", address: "", sublocality: "", state: "", latitude:"",longitude: "", beds:"", bath:"", area:"", feature_image: ""}) 
            })
        
        axiosConfig.get('/propertyCategoryList')
            .then(function (response) {
                setCategoryList(response.data.data);
            })
            .catch(function (error) {
                // console.log(error);
            })

        axiosConfig.get('/propertyTypeList')
            .then(function (response) {
                setPropertyTypes(response.data.data);
            })
            .catch(function (error) {
                // console.log(error);
            })
    },[])
    return (
        <Layout propertyId={props.params.id} createListingPage={true}>
            {initialValues=== null ? "" : 
                <div className="py-8">
                    <Heading>Edit Listing Details</Heading>
                    <div className="mx-auto">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values, { setSubmitting }) => {
                                let formData = new FormData();
                                const params = {
                                    vendor_id: localStorage.getItem('vendor_id'), 
                                    property_update_id: props.params.id,
                                    ...values
                                }
                                for (const key in params) {
 
                                    formData.append(key, params[key]);
                                }

                                axiosConfig.post('/addProperty',formData, {
                                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                                })
                                .then(function (response) {
                                    setSubmitting(false)
                                    toast.success('Updated Successfully', {
                                        position: "top-right",
                                        autoClose: 2000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });
                                })
                                .catch(function (error) {
                                    // console.log(error);
                                    setSubmitting(false)
                                })
                                
                            }}

                            validationSchema={Yup.object().shape({
                                property_name: Yup.string()
                                    .required("Property Name is required"),
                                property_id: Yup.string()
                                    .required("Property ID is required"),
                                property_category: Yup.string()
                                    .required("Category is required"),
                                property_type: Yup.string()
                                    .required("Type is required"),
                                address: Yup.string()
                                    .required("Address is required"),
                                sublocality: Yup.string()
                                    .required("City is required"),
                                state: Yup.string()
                                    .required("State is required"),
                                latitude: Yup.string()
                                    .required("Latitude is required"),
                                longitude: Yup.string()
                                    .required("Logitude is required"),
                                beds: Yup.string(),
                                bath: Yup.string(),
                                area: Yup.string()
                                    .required("Carpet Area is required"),
                                feature_image: Yup.string()
                                    .required("Featured Image is required")
                            })}
                        >
                            {
                                
                            props => {
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
                                <form className={`relative ${isSubmitting ? 'opacity-20' : ''}`} onSubmit={handleSubmit}>
                                    <div className={`grid grid-cols-2 gap-6 gap-x-12 mt-8 `}>
                                        <div className="w-full flex flex-col gap-2">
                                            <label className="text-sm font-semibold text-primary" htmlFor="email">Property Name</label>
                                            <input
                                                name="property_name"
                                                type="text"
                                                placeholder="Enter Property Name"
                                                value={values.property_name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.property_name && touched.property_name && "error"}`}
                                            />
                                            {errors.property_name && touched.property_name && (
                                                <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.property_name}</div>
                                            )}
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <label className="text-sm font-semibold text-primary" htmlFor="email">Property ID</label>
                                            <input
                                                name="property_id"
                                                type="text"
                                                placeholder="Enter Property ID"
                                                value={values.property_id}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.property_id && touched.property_id && "error"}`}
                                            />
                                            {errors.property_id && touched.property_id && (
                                                <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.property_id}</div>
                                            )}
                                        </div>

                                        <div className="w-full flex flex-col gap-2">
                                            <label className="text-sm font-semibold text-primary" htmlFor="email">Visibility</label>
                                            <select
                                                name="visibility"
                                                type="text"
                                                placeholder="Enter Property ID"
                                                value={values.visibility}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`outline-none border border-gray-300 px-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.visibility && touched.visibility && "error"}`}
                                            >
                                                <option value="0">Public</option>
                                                <option value="1">Private</option>
                                            </select>
                                            {errors.visibility && touched.visibility && (
                                                <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.visibility}</div>
                                            )}
                                        </div>

                                        <div className="w-full flex flex-col gap-2">
                                            <label className="text-sm font-semibold text-primary" htmlFor="email">Category</label>
                                            <select
                                                name="property_category"
                                                type="text"
                                                placeholder="Category"
                                                value={values.property_category}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`outline-none border border-gray-300 px-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.property_category && touched.property_category && "error"}`}
                                                
                                            >
                                                <option>Select Category</option>
                                                {
                                                    categoryList === null ?
                                                    <option>Loading...</option>
                                                    :
                                                
                                                categoryList.map( category => <option value={category.value}>{category.label}</option>)}
                                            </select>
                                            {errors.property_category && touched.property_category && (
                                                <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.property_category}</div>
                                            )}
                                        </div>
                                        
                                        <div className="w-full flex flex-col gap-2">
                                            <label className="text-sm font-semibold text-primary" htmlFor="email">Type</label>
                                            <select
                                                name="property_type"
                                                type="text"
                                                placeholder="Type"
                                                value={values.property_type}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`outline-none border border-gray-300 px-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.property_type && touched.property_type && "error"}`}
                                            >
                                                <option>Select Type</option>
                                                {
                                                    propertyTypes === null ?
                                                    <option>Loading...</option>
                                                    :
                                                    propertyTypes.map( type => <option value={type.id}>{type.type}</option>)}
                                            </select>
                                            {errors.property_type && touched.property_type && (
                                                <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.property_type}</div>
                                            )}
                                        </div>

                                        <div className="w-full flex flex-col gap-2">
                                            <label className="text-sm font-semibold text-primary" htmlFor="email">Location/Address</label>
                                            <input
                                                name="address"
                                                type="text"
                                                placeholder="Enter Property Address"
                                                value={values.address}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.address && touched.address && "error"}`}
                                            />
                                            {errors.address && touched.address && (
                                                <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.address}</div>
                                            )}
                                        </div>
                                        
                                    </div>
                                    <div className="grid grid-cols-4 mt-6 gap-6 gap-x-12">
                                        <div className="w-full flex flex-col gap-2">
                                            <label className="text-sm font-semibold text-primary" htmlFor="email">City/Sub Locailty</label>
                                            <input
                                                name="sublocality"
                                                type="text"
                                                placeholder="Enter Property City"
                                                value={values.sublocality}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.sublocality && touched.sublocality && "error"}`}
                                            />
                                            {errors.sublocality && touched.sublocality && (
                                                <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.sublocality}</div>
                                            )}
                                        </div>

                                        <div className="w-full flex flex-col gap-2">
                                            <label className="text-sm font-semibold text-primary" htmlFor="email">State</label>
                                            <input
                                                name="state"
                                                type="text"
                                                placeholder="Enter Property State"
                                                value={values.state}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.state && touched.state && "error"}`}
                                            />
                                            {errors.state && touched.state && (
                                                <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.state}</div>
                                            )}
                                        </div>

                                        <div className="w-full flex flex-col gap-2">
                                            <label className="text-sm font-semibold text-primary" htmlFor="email">Latitude</label>
                                            <input
                                                name="latitude"
                                                type="text"
                                                placeholder="Enter Property Latitude"
                                                value={values.latitude}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.latitude && touched.latitude && "error"}`}
                                            />
                                            {errors.latitude && touched.latitude && (
                                                <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.latitude}</div>
                                            )}
                                        </div>

                                        <div className="w-full flex flex-col gap-2">
                                            <label className="text-sm font-semibold text-primary" htmlFor="email">Logitude</label>
                                            <input
                                                name="longitude"
                                                type="text"
                                                placeholder="Enter Property Address"
                                                value={values.longitude}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.longitude && touched.longitude && "error"}`}
                                            />
                                            {errors.longitude && touched.longitude && (
                                                <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.longitude}</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 mt-6 gap-6 gap-x-12">
                                        <div className="w-full flex flex-col gap-2">
                                            <label className="text-sm font-semibold text-primary" htmlFor="email">Beds</label>
                                            <input
                                                name="beds"
                                                type="text"
                                                placeholder="Enter Property Bedroom Number"
                                                value={values.beds}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.beds && touched.beds && "error"}`}
                                            />
                                            {errors.beds && touched.beds && (
                                                <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.beds}</div>
                                            )}
                                        </div>

                                        <div className="w-full flex flex-col gap-2">
                                            <label className="text-sm font-semibold text-primary" htmlFor="email">Baths</label>
                                            <input
                                                name="bath"
                                                type="text"
                                                placeholder="Enter Property Bathrrom Number"
                                                value={values.bath}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.bath && touched.bath && "error"}`}
                                            />
                                            {errors.bath && touched.bath && (
                                                <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.bath}</div>
                                            )}
                                        </div>

                                        <div className="w-full flex flex-col gap-2">
                                            <label className="text-sm font-semibold text-primary" htmlFor="email">Carpet Area</label>
                                            <input
                                                name="area"
                                                type="text"
                                                placeholder="Enter Property Carpet Area"
                                                value={values.area}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.area && touched.area && "error"}`}
                                            />
                                            {errors.area && touched.area && (
                                                <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.area}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <img className="w-48 rounded-md h-40 mb-4" src={values.feature_image}/>
                                        <div className="max-w-2xl flex space-x-8">
                                            <div className="rounded-lg bg-gray-50 p-4">
                                                <label className="inline-block mb-2 text-primary text-sm font-semibold">Add Featured Image
                                                {errors.feature_image && touched.feature_image && (
                                                    <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.feature_image}</div>
                                                )}
                                                </label>
                                                
                                                <div className="flex items-center justify-center w-full cursor-pointer">
                                                    <label htmlFor="feature_image"
                                                        className="flex flex-col w-full h-32 border-4 border-secondary border-opacity-40 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                        <div className="flex flex-col items-center justify-center pt-7">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary group-hover:text-gray-600"
                                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                            </svg>
                                                            <p className="pt-1 text-sm tracking-wider text-primary group-hover:text-gray-600">
                                                                Attach a file</p>
                                                        </div>
                                                        <input type="file" 
                                                        className="opacity-0"
                                                        id="feature_image"
                                                        name="feature_image"
                                                        // value={values.feature_image}
                                                        onChange={(event) =>{
                                                            setFieldValue("feature_image", event.currentTarget.files[0]);
                                                        }}
                                                        onBlur={handleBlur}
                                                        />
                                                        
                                                    </label>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        
                                    </div> 
                                    
                                    <div className="mt-5 flex items-center space-x-4">
                                        <button type="submit" disabled={isSubmitting} className={ `uppercase border-box h-11 text-sm px-10 bg-secondary text-white font-bold hover:opacity-80 hover:text-white transition duration-200 ease-in-out rounded-full ${isSubmitting? 'opacity-20' : ''}`}>
                                            Update
                                        </button>
                                        <Link to={`/dashboard/listings/create/${values.id}/info-map`} className={ `py-3 uppercase border-box h-11 text-sm px-10 bg-blue-400 text-white font-bold hover:opacity-80 hover:text-white transition duration-200 ease-in-out rounded-full`}>Continue </Link>
                                        
                                    </div>
                                    {
                                    isSubmitting ? 
                                    <div className="absolute w-full z-5 top-0 h-full flex justify-center items-center">
                                        <img src="http://cyberworx.co.in/viztown-2.0/admin/assets/backend/image/loader.gif" alt="loading" /> 
                                    </div>: ''
                                    }
                                </form>
                                
                            );
                            }}
                        </Formik>
                        <ToastContainer />
                    </div>
                </div>
            }
        </Layout>
        
    )
}
