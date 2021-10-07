import React, { useEffect, useState, useRef } from 'react'
import {Link, navigate} from 'gatsby'
import { Formik, useFormikContext, useField } from "formik"
import * as Yup from "yup"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axiosConfig from '../../../../../axiosConfig';
import Loader from '../../../../../components/Loader'
import Layout from '../../../../../components/dashboard/common/Layout'
import AuthorizedRoute from '../../../../../components/dashboard/common/AuthorizedRoute'
import { Editor } from '@tinymce/tinymce-react';
import Select from "react-select";
import Heading from '../../../../../components/dashboard/common/Heading'

function SelectInput({ label,defaultValue, ...props }) {
    const [field, meta, { setValue, setTouched }] = useField(props);
    const options = props.children.map((option) => ({
      value: option.props.value,
      label: option.props.children,
    }));
  
    const onChange = ( values ) => {
        const selectedFeatures = [] 
        values.map(value => {
            selectedFeatures.push(value.value)
        })
        setValue(selectedFeatures);
    };
  
    return (
      <div className="mb-3">
        <Select
          defaultValue={defaultValue}
          options={options}
          onChange={onChange}
          onBlur={setTouched}
          isMulti
          className="z-20"
        />
        {meta.touched && meta.error ? (
          <div className="form-text text-danger">{meta.error}</div>
        ) : null}
      </div>
    );
}

export default function InfoMapData(props) {
    const editorRef = useRef(null);
    const [propertyFeatures, setPropertyFeatures] = useState(null)
    const [initialValues, setInitialValues] = useState(null)
    const [bannerImages, setBannerImages] = useState("")

    useEffect(()=>{
        axiosConfig.get('/propertyInfoAndMapById',{
            params: {
                id: parseInt(props.id),
            }
        })
        .then(function (response) {  
            let featureArray = [];
            
            const infoMapData = response.data.error ? null : response.data.data
            infoMapData === null ? setInitialValues({info_id:"", id: props.params.id, heading: "", subheading: "", description: "", build_year:"", build_area: "", carpet_area: "", property_type: "", booking_type: "", min_price:"",max_price: "", banner:"", feature:"", sqft_price:""}) :

            setInitialValues({info_id:infoMapData.id, id: props.params.id, heading: infoMapData.propertyName , subheading: infoMapData.propertyLocation, description: infoMapData.propertyDescription , build_year:infoMapData.buildDetails.buildYear, build_area: infoMapData.buildDetails.buildUpArea, carpet_area: infoMapData.buildDetails.carpetArea, property_type: infoMapData.buildDetails.propertyType, booking_type: infoMapData.buildDetails.bookingType, min_price:infoMapData.buildDetails.price.min_price,max_price: infoMapData.buildDetails.price.max_price,sqft_price:infoMapData.sqft_price , banner:infoMapData.bannerImages, feature:featureArray})
            response.data.data.fetaures.map(feature => {
                featureArray.push({value:feature.id, label:feature.title})
            })
            setBannerImages(infoMapData.bannerImages)
            
        })
        .catch(function (error) {
            setInitialValues({info_id:"", id: props.params.id, heading: "", subheading: "", description: "", build_year:"", build_area: "", carpet_area: "", property_type: "", booking_type: "", min_price:"",max_price: "", banner:"", features:"", sqft_price:""}) 
        })

        axiosConfig.get('/getPropertyFeature')
        .then(function (response) {
            setPropertyFeatures(response.data.data);
        })
        .catch(function (error) {
            // console.log(error);
        })
    },[])

    return (
        <Layout propertyId={props.params.id} createListingPage={true}>
            {initialValues === null ? "" :
            <div className="py-8">
                <Heading>Add Info & Map Data</Heading>
                <div className="mx-auto">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values, { setSubmitting }) => {
                            let formData = new FormData();
                            const params = {
                                property_id: props.params.id,
                                vendor_id: localStorage.getItem('vendor_id'), 
                                status: 1,
                                ...values
                            }
                            
                            for (const key in params) {
                                if(key === 'banner'){
                                    const bannerFiles = params[key]
                                    if(bannerFiles){
                                        for (let i = 0; i < bannerFiles.length; i++) {
                                            formData.append('banner[]', bannerFiles[i]);
                                        }
                                    }
                                    else{
                                        formData.append(key, params[key]);
                                    }
                                    
                                }
                                else if(key === 'feature'){
                                    const featureArray = params[key]
                                    if(featureArray){
                                        for (let i = 0; i < featureArray.length; i++) {
                                            formData.append('feature[]', featureArray[i]);
                                        } 
                                    }else{
                                        formData.append(key, params[key]);
                                    }
                                }
                                else{
                                    formData.append(key, params[key]);
                                }
                            }

                            axiosConfig.post('/addPropertyInfo',formData, {
                                config: { headers: {'Content-Type': 'multipart/form-data' }}
                            })
                            .then(function (response) {
                                setSubmitting(false)
                                console.log(response.data)
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
                                console.log(error);
                                setSubmitting(false)
                            })
                            
                        }}

                        validationSchema={Yup.object().shape({
                            heading: Yup.string()
                                .required("Property Name is required"),
                            subheading: Yup.string()
                                .required("Property ID is required"),
                            build_year: Yup.string()
                                .required("Category is required"),
                            build_area: Yup.string()
                                .required("Type is required"),
                            carpet_area: Yup.string()
                                .required("Carpert Area is required"),
                            build_area: Yup.string()
                                .required("City is required"),
                            booking_type: Yup.string()
                                .required("Booking Type is required"),
                            min_price: Yup.string()
                                .required("Min Price is required"),
                            max_price: Yup.string()
                                .required("Max Price is required"),
                            feature: Yup.array()
                                .required("Features are required")
                        })}
                    >
                        {props => {
                        const {
                            values,
                            touched,
                            errors,
                            isSubmitting,
                            setFieldValue,
                            handleChange,
                            handleBlur,
                            handleSubmit
                        } = props;
                        return (
                            <form className={`relative ${isSubmitting ? 'opacity-20' : ''}`} onSubmit={handleSubmit}>
                                <div className={`grid grid-cols-2 gap-6 gap-x-12 mt-8 `}>
                                    <div className="w-full flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-primary" htmlFor="email">Heading</label>
                                        <input
                                            name="heading"
                                            type="text"
                                            placeholder="Enter Property Heading"
                                            value={values.heading}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.heading && touched.heading && "error"}`}
                                        />
                                        {errors.heading && touched.heading && (
                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.heading}</div>
                                        )}
                                    </div>
                                    <div className="w-full flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-primary" htmlFor="email">Sub Heading</label>
                                        <input
                                            name="subheading"
                                            type="text"
                                            placeholder="Enter Property Sub Heaidng"
                                            value={values.subheading}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.subheading && touched.subheading && "error"}`}
                                        />
                                        {errors.subheading && touched.subheading && (
                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.subheading}</div>
                                        )}
                                    </div>
                                </div>
                    
                                <div className="grid grid-cols-4 mt-6 gap-6 gap-x-12">
                                    <div className="col-span-4 border-b-2 border-grey mt-4 mb-2">
                                        <h6 className="font-semibold">Build Details </h6>
                                    </div>
                                    <div className="w-full flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-primary">Build Year</label>
                                        <input
                                            name="build_year"
                                            type="text"
                                            placeholder="Build Year"
                                            value={values.build_year}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`outline-none border border-gray-300 px-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.build_year && touched.build_year && "error"}`}
                                            
                                        />
                                        {errors.build_year && touched.build_year && (
                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.build_year}</div>
                                        )}
                                    </div>
                                    
                                    <div className="w-full flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-primary">Build Up Area</label>
                                        <input
                                            name="build_area"
                                            type="text"
                                            placeholder="Build Up Area"
                                            value={values.build_area}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`outline-none border border-gray-300 px-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.build_area && touched.build_area && "error"}`}
                                        />
                                        {errors.build_area && touched.build_area && (
                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.build_area}</div>
                                        )}
                                    </div>

                                    <div className="w-full flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-primary">Carpet Area</label>
                                        <input
                                            name="carpet_area"
                                            type="text"
                                            placeholder="Carpet Area"
                                            value={values.carpet_area}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.carpet_area && touched.carpet_area && "error"}`}
                                        />
                                        {errors.carpet_area && touched.carpet_area && (
                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.carpet_area}</div>
                                        )}
                                    </div>

                                    <div className="w-full flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-primary" htmlFor="email">Property Type</label>
                                        <input
                                            name="property_type"
                                            type="text"
                                            placeholder="Enter Property Type"
                                            value={values.property_type}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.property_type && touched.property_type && "error"}`}
                                        />
                                        {errors.property_type && touched.property_type && (
                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.property_type}</div>
                                        )}
                                    </div>

                                    <div className="w-full flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-primary" htmlFor="email">Booking Type</label>
                                        <input
                                            name="booking_type"
                                            type="text"
                                            placeholder="Enter Property Booking Type"
                                            value={values.booking_type}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.booking_type && touched.booking_type && "error"}`}
                                        />
                                        {errors.booking_type && touched.booking_type && (
                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.booking_type}</div>
                                        )}
                                    </div>

                                    <div className="w-full flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-primary" htmlFor="email">Minimum Price</label>
                                        <input
                                            name="min_price"
                                            type="text"
                                            placeholder="Enter Property Min Price"
                                            value={values.min_price}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.min_price && touched.min_price && "error"}`}
                                        />
                                        {errors.min_price && touched.min_price && (
                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.min_price}</div>
                                        )}
                                    </div>

                                    <div className="w-full flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-primary" htmlFor="email">Maximum Price</label>
                                        <input
                                            name="max_price"
                                            type="text"
                                            placeholder="Enter Property Maximum Price"
                                            value={values.max_price}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.max_price && touched.max_price && "error"}`}
                                        />
                                        {errors.max_price && touched.max_price && (
                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.max_price}</div>
                                        )}
                                    </div>

                                    <div className="w-full flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-primary" htmlFor="email">Per Sq.Ft. Price</label>
                                        <input
                                            name="sqft_price"
                                            type="text"
                                            placeholder="Enter Property Per Sq.Ft. Price"
                                            value={values.sqft_price}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.sqft_price && touched.sqft_price && "error"}`}
                                        />
                                        {errors.sqft_price && touched.sqft_price && (
                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.sqft_price}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 mt-6 gap-4">
                                    <div className="w-full flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-primary">Property Features</label>
                                        {propertyFeatures === null ? "" :
                                        <SelectInput name="feature" label="Property Features" defaultValue={values.feature}>
                                            {
                                            propertyFeatures.map((feature) => (
                                            <option key={feature.id} value={feature.id}>
                                                {feature.title}
                                            </option>
                                            ))}
                                        </SelectInput>}
                                    </div>
                                </div>

                                <div className="w-full flex flex-col gap-2 mt-4">
                                    <label className="text-sm font-semibold text-primary" htmlFor="email">Description</label>
                                    <Editor
                                        onInit={(evt, editor) => editorRef.current = editor}
                                        initialValue={values.description}
                                        init={{
                                        height: 300,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar: 'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                        }}
                                        onEditorChange={(e) => {
                                            handleChange({ target: { name: 'description', value: e } })
                                        }}
                                    />
                                    {errors.description && touched.description && (
                                        <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.description}</div>
                                    )}
                                </div>
                                <div className="flex space-x-4 mt-6">
                                    {
                                    // console.log(values.banner.length)
                                    bannerImages.length > 0 ? 
                                    (bannerImages.map(image => 
                                        <div className="w-48 cursor-pointer relative" key={image.id}>
                                            <img className="rounded-md" src={image.url}/>
                                            <span id={image.id} className="bg-white absolute top-2 right-2 p-1 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </span>
                                        </div>
                                    ))
                                    : ""
                                    }
                                        
                                </div>

                                <div className="flex mt-6">
                                    <div className="max-w-2xl rounded-lg bg-grey">
                                        <div className="m-4">
                                            <label className="inline-block mb-2 text-primary text-sm font-semibold">Add banner Image
                                            {errors.banner && touched.banner && (
                                                <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.banner}</div>
                                            )}
                                            </label>
                                            
                                            <div className="flex items-center justify-center w-full cursor-pointer">
                                                <label htmlFor="banner"
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
                                                    id="banner"
                                                    name="banner[]"
                                                    // value={values.banner_image}
                                                    onChange={(event) =>{
                                                        const bannerFiles = event.currentTarget.files;
                                                        setFieldValue("banner", bannerFiles);
                                                      }}
                                                    onBlur={handleBlur}
                                                    multiple
                                                    />
                                                    
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                
                                <div className="mt-5 flex item-center space-x-4">
                                        <button type="submit" disabled={isSubmitting} className={ `uppercase border-box h-11 text-sm px-10 bg-secondary text-white font-bold hover:opacity-80 hover:text-white transition duration-200 ease-in-out rounded-full ${isSubmitting? 'opacity-20' : ''}`}>
                                            Update
                                        </button>
                                        <Link to={`/dashboard/listings/create/${values.id}/actual-site`} className={ `py-3 uppercase border-box h-11 text-sm px-10 bg-blue-400 text-white font-bold hover:opacity-80 hover:text-white transition duration-200 ease-in-out rounded-full`}>Continue</Link>
                                        <Link to={`/dashboard/listings/create/${values.id}`} className={ `py-3 uppercase border-box h-11 text-sm px-10 bg-primary text-white font-bold hover:opacity-80 hover:text-white transition duration-200 ease-in-out rounded-full`}>Back</Link>
                                </div>
                                {
                                isSubmitting ? 
                                <div className="absolute w-full z-5 top-0 h-full flex justify-center items-center z-20">
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
