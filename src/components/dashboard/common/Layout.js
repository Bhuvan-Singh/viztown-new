import React from 'react'
import Header from './Header'
import {navigate} from 'gatsby'
import {auth} from "../../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import CreateListingNavigation from '../common/CreateListingNavigation'
import AuthorizedRoute from './AuthorizedRoute';

export default function Layout({children, createListingPage = false, propertyId}) {
    const [user, loading, error] = useAuthState(auth);
    if(loading) return (
        <div className="flex justify-center items-center w-full h-full bg-grey">
            <span className="font-semibold"><img src="http://cyberworx.co.in/viztown-2.0/admin/assets/backend/image/loader.gif" alt="loading" /></span>
        </div>
    )
    if (!user) navigate('/login')
    
    
    return !user ? 
        <div className="flex justify-center items-center w-full h-full bg-grey">
            <span className="font-semibold"><img src="http://cyberworx.co.in/viztown-2.0/admin/assets/backend/image/loader.gif" alt="loading" /></span>
        </div> 
        : (
        <div>
            <Header/>
            
            <div className="content max-w-screen-xl mx-auto">
                {createListingPage ? <> <AuthorizedRoute propertyId={propertyId}><CreateListingNavigation propertyId={propertyId}/> {children}</AuthorizedRoute></> : children }
            </div>
        </div>
    )
}
