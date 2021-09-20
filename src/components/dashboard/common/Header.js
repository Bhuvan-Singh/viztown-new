import React, {useEffect} from 'react'
import {Link, navigate} from 'gatsby'
import {auth} from "../../../services/firebase";
import { signOut } from "firebase/auth";
import * as styles from '../../../css/dashboard/header.module.css'

export default function Header() {
    const userDetails = JSON.parse(localStorage.getItem('vendor'))
    const handleLogout = () => {
        signOut(auth);
        localStorage.removeItem('vendor')
        localStorage.removeItem('vendor_id')
    }
    
    return (
        <div className=" bg-dashboardGrey border-b-2 border-gray-200">
            <header className="flex items-center justify-between max-w-screen-xl mx-auto">
                <div className="vt-dashboard-logo">
                    <img src="http://cyberworx.co.in/viztown_new/assets/images/logo-dark.png" className="w-32" alt="Viztown Logo"/>
                </div>
                <nav className="flex items-center space-x-7 text-sm ">
                    <Link to="/dashboard" className="py-5 relative" activeClassName={styles.active}>Dashboard</Link>
                    <Link to="/dashboard/meetings" className="py-5 relative" activeClassName={styles.active} partiallyActive={true}>Meetings</Link>
                    <Link to="/dashboard/listings" className="py-5 relative" activeClassName={styles.active} partiallyActive={true}>Listings</Link>
                    <Link to="/dashboard/proposals" className="py-5 relative" activeClassName={styles.active} partiallyActive={true}>Proposals</Link>
                    <Link to="/dashboard/agreements" className="py-5 relative" activeClassName={styles.active} partiallyActive={true}>Agreements</Link>
                </nav>
                <div className="vt-dashboard-user-options flex items-center space-x-5">
                    <Link to="/dashboard/notifications" className="vt-dashboard-notifications relative w-9 h-9 rounded-full bg-white flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                        <span className="absolute w-5 h-5 bg-secondary rounded-full flex items-center justify-center -top-1 -right-2 text-xs text-white font-regular">5</span>
                    </Link>
                    <Link to="/dashboard/profile" className="vt-dashboard-profile relative ">
                        <img src={userDetails.profile} className="w-9 h-9 rounded-full bg-white object-contain"/>
                    </Link>
                    <button className="bg-secondary px-3 rounded-sm py-2 font-bold leading-none text-white hover:text-white text-xs" onClick={handleLogout}>Logout</button>
                </div>
            </header>
        </div>
    )
}
