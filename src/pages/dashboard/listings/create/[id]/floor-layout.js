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
import 'react-tabs/style/react-tabs.css';


export default function FloorLayoutData(props) {
    const [loading, setLoading] = useState(false)
    const [floorLayoutSubMenu, setFloorLayoutSubMenu] = useState(null)
    const [layoutData, setLayoutData] = useState(null)
    useEffect(()=>{
        axiosConfig.get('/getFloorLayoutSubMenu')
        .then(function (response) {
            setFloorLayoutSubMenu(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        })

        axiosConfig.get('/floorLayoutData',{
            params: {
                id: parseInt(props.params.id),
            }
        })
        .then(function (response) { 
            console.log(layoutData)
            response.data.error ? setLayoutData(null) : setLayoutData(response.data.data)
            
        })
        .catch(function (error) {
            setLayoutData(null);
        })
    },[loading])
    return (
        <Layout propertyId={props.params.id} createListingPage={true}>
            <div className="py-8">
                <Heading>Add Floor Layout Data</Heading>
                <div className="mx-auto">
                    <Formik
                        initialValues={{id: props.params.id, type: "", title: "", layoutId:"", images:""}}

                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values)
                            setLoading(true)
                            let formData = new FormData();
                            const params = {
                                vendor_id: localStorage.getItem('vendor_id'), 
                                property_id: props.params.id,
                                status: 1,
                                ...values
                            }
                            for (const key in params) {
                                console.log(`${key}: ${params[key]}`);
                                formData.append(key, params[key]);
                            }

                            axiosConfig.post('/addPropertyFloorLayout',formData, {
                                config: { headers: {'Content-Type': 'multipart/form-data' }}
                            })
                            .then(function (response) {
                                setSubmitting(false)
                                setLoading(false)
                                console.log(response.data)
                            })
                            .catch(function (error) {
                                setLoading(false)
                                console.log(error);
                                setSubmitting(false)
                            })
                            
                        }}

                        validationSchema={Yup.object().shape({
                            title: Yup.string()
                                .required("Title is Required"),
                            type: Yup.string()
                                .required("Menu Type is required"),
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
                                {layoutData === null ? "" : 
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    {layoutData.map(layout => (
                                        <div className="bg-grey p-4 w-full items-center flex justify-between rounded-md">
                                            <div className="flex space-x-12">
                                                <span><img className="w-12 h-12" src={layout.image}/></span>
                                                <span className="text-sm font-semibold">Type : <br/><span className="text-secondary">{layout.tab}</span></span>
                                                <span className="text-sm font-semibold">Title : <br/><span className="text-secondary">{layout.title}</span></span>
                                                
                                            </div>
                                            <div className="flex space-x-4">
                                                <span id={layout.id} type={layout.menu_id} className="p-1 rounded-full cursor-pointer" title={layout.title} onClick={
                                                    (e) => {
                                                        console.log(e.currentTarget.getAttribute('type'))
                                                        setFieldValue("type", e.currentTarget.getAttribute('type'));
                                                        setFieldValue("layoutId", e.currentTarget.getAttribute('id'));
                                                        setFieldValue("title", e.currentTarget.getAttribute('title'));
                                                    }
                                                }>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </span>
                                                <span id={layout.id} className="p-1 rounded-full cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    
                                </div>
                                }
                                <div className={`grid grid-cols-2 gap-6 mt-8 `}>
                                    <div className="w-full flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-primary" htmlFor="email">Select Type</label>
                                        <select
                                                name="type"
                                                type="text"
                                                placeholder="Type"
                                                value={values.type}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`outline-none border border-gray-300 px-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.type && touched.type && "error"}`}
                                            >
                                                <option>Select Type</option>
                                                {
                                                    floorLayoutSubMenu === null ?
                                                    <option>Loading...</option>
                                                    :
                                                    floorLayoutSubMenu.map( type => <option value={type.id}>{type.name}</option>)}
                                        </select>
                                        {errors.type && touched.type && (
                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.type}</div>
                                        )}
                                    </div>
                                    <div className="w-full flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-primary" htmlFor="email">Title</label>
                                        <input
                                            name="title"
                                            type="text"
                                            placeholder="Enter Title"
                                            value={values.title}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`outline-none border border-gray-300 p-4 h-11 bg-white text-xs font-semibold rounded-md ${errors.title && touched.title && "error"}`}
                                        />
                                        {errors.title && touched.title && (
                                            <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.title}</div>
                                        )}
                                    </div>
                                </div>

                                <div class="flex mt-8">
                                    <div class="max-w-2xl rounded-lg bg-gray-50">
                                        <div class="m-4">
                                            <label class="inline-block mb-2 text-primary text-sm font-semibold">Add Image
                                            {errors.images && touched.images && (
                                                <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.images}</div>
                                            )}
                                            </label>
                                            
                                            <div class="flex items-center justify-center w-full cursor-pointer ">
                                                <label htmlFor="images"
                                                    class="flex flex-col w-48 h-24 border-4 border-secondary border-opacity-40 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                    <div class="flex flex-col items-center justify-center pt-7">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-primary group-hover:text-gray-600"
                                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                        </svg>
                                                        <p class="pt-1 text-sm tracking-wider text-primary group-hover:text-gray-600">
                                                            Attach a file</p>
                                                    </div>
                                                    <input type="file" 
                                                    class="opacity-0"
                                                    id="images"
                                                    name="images"
                                                    // value={values.images}
                                                    onChange={(event) =>{
                                                        setFieldValue("images", event.currentTarget.files[0]);
                                                    }}
                                                    onBlur={handleBlur}
                                                    />
                                                    
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                
                                <div className="mt-5 flex item-center space-x-4">
                                        <button type="submit" disabled={isSubmitting} className={ `uppercase border-box h-11 text-sm px-10 bg-secondary text-white font-bold hover:opacity-80 hover:text-white transition duration-200 ease-in-out rounded-md ${isSubmitting? 'opacity-20' : ''}`}>
                                            Update
                                        </button>
                                        <Link to={`/dashboard/listings/create/${values.id}/3d-render`} className={ `py-3 uppercase border-box h-11 text-sm px-10 bg-green-300 text-white font-bold hover:opacity-80 hover:text-white transition duration-200 ease-in-out rounded-md`}>Continue</Link>
                                        <Link to={`/dashboard/listings/create/${values.id}/actual-site`} className={ `py-3 uppercase border-box h-11 text-sm px-10 bg-blue-300 text-white font-bold hover:opacity-80 hover:text-white transition duration-200 ease-in-out rounded-md`}>Back</Link>
                                </div>
                                {
                                isSubmitting ? 
                                <div className="absolute w-full z-5 top-0 h-full flex justify-center items-center">
                                    <img src="http://cyberworx.co.in/viztown-2.0/admin/assets/backend/image/loader.gif" alt="loading" /> 
                                </div>: ''
                                }
                            </form>
                            
                        )
                        }}
                    </Formik>
                    <ToastContainer />
                </div>
            </div>
        </Layout>
    )
}
