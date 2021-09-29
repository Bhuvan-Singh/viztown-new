import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'gatsby'
import axiosConfig from '../../../axiosConfig'
import {AuthContext} from '../../../contexts/AuthContextProvider'

export default function AuthorizedRoute({children, propertyId}) {
    const {user} = useContext(AuthContext)
    console.log("user:" + user)
    const [isAuthorizedProperty, setIsAuthorizedProperty] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        axiosConfig.get('/authorizedProperty',{
            params:{
                vendor_id: user.vendor.id,
                id : propertyId
            }
        })
        .then(function (response) {
            setIsLoading(false)
            setIsAuthorizedProperty(response.data.data);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        })
    },[])
    return isLoading ? 
        <div className="absolute w-full z-5 top-0 h-full flex justify-center items-center left-0">
            <img src="http://cyberworx.co.in/viztown-2.0/admin/assets/backend/image/loader.gif" alt="loading" /> 
        </div>
        : (!isAuthorizedProperty ?  
        <div className="Error-module w-full mt-48 flex justify-center items-center ">
            <div>
                <h1 className="text-4xl font-semibold font-playfair mb-8"><span className="Emoji-module " role="img">😶</span> <span className="italic" >Oops!</span></h1>
                <h2 className="text-xl font-semibold">You are not authorized to access this property.</h2>
                <p>
                    Please double check your URL, or go back to listings page.<br/>
                    <Link to="/dashboard/listings" className="bg-secondary text-sm px-8 rounded-md py-3 font-bold leading-none hover:text-white items-center inline-block mt-4">All Listings</Link>
                </p>
            </div>
        </div>
        :
        (
        <div>
            {children}
        </div>
    ))
}
