import React,{useEffect, useContext, useState} from 'react'
import {Link, navigate} from 'gatsby'
import { Formik } from "formik"
import * as Yup from "yup"
import { ToastContainer, toast } from 'react-toastify'
import {auth} from "../services/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../components/Loader'
import Layout from '../components/Layout'
import {AuthContext} from "../contexts/AuthContextProvider"

export default function ForgotPassword() {
    // const [user, loading, error] = useAuthState(auth);
    const [loading, setLoading] = useState(true)
    const {user} = useContext(AuthContext)
    useEffect(() => {
        // if (loading) {
        //   return;
        // }
        if (user !== null) navigate('/dashboard')
    }, [user, loading]);
    return (
        <Layout fixedHeader={false}>
            <div className="w-4/5 lg:w-1/4 2xl:w-1/5 mx-auto">
                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={(values, { setSubmitting }) => {
                        sendPasswordResetEmail(auth, values.email)
                        .then((result) => {
                            console.log(result)
                            setSubmitting(false);
                            toast.success('Password reset email sent.', {
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        })
                        .catch((error) => {
                            console.log(error)
                            setSubmitting(false);
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            toast.error('Wrong email address', {
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

                    validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email()
                        .required("Email Id Required"),
                    })}
                >
                    {props => {
                    const {
                        values,
                        touched,
                        errors,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    } = props;
                    return (
                        <form className="relative" onSubmit={handleSubmit}>
                            <div className={`flex flex-col gap-4 py-16 mt-8 ${isSubmitting ? 'opacity-20' : ''}`}>
                                <div className="w-full text-center mb-4">
                                    <h4 className="text-3xl font-bold font-playfair text-primary">Forgot Password</h4>
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-primary" htmlFor="email">Email</label>
                                    <input
                                        name="email"
                                        type="text"
                                        placeholder="Enter your email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`outline-none border border-gray-200 p-4 h-11 bg-grey text-xs font-semibold ${errors.email && touched.email && "error"}`}
                                    />
                                    {errors.email && touched.email && (
                                        <div className="input-feedback text-red-400 text-xs font-semibold capitalize">{errors.email}</div>
                                    )}
                                </div>
                                <div className="w-full text-center mt-3">
                                    <button type="submit" disabled={isSubmitting} className={ `uppercase w-full border-box h-11 text-sm px-10 bg-secondary text-white font-bold hover:bg-primary hover:text-white transition duration-200 ease-in-out ${isSubmitting? 'opacity-20' : ''}`}>
                                        Request New Password
                                    </button>
                                </div>
                                
                                <div id="forgot--password--link" className="w-full text-right">
                                    <Link to="/login" className="text-xs font-semibold text-primary">Login?</Link>
                                </div>
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
        </Layout>
    )
}
