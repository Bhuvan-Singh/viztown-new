import React,{useEffect, useContext} from 'react'
import {Link} from 'gatsby'
import { CommonContext } from '../contexts/CommonContextProvider';
import {auth} from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
export default function Header() {
    const {menus} = useContext(CommonContext)
    const [user, loading, error] = useAuthState(auth);
    const handleLogout = () => {
        signOut(auth);
    }
    return (
        <header className="vt-header bg-primary text-white px-10">
            <div className="flex items-center justify-between py-2">
                <Link to="/">
                    <div className="vt-logo">
                        <img src="http://cyberworx.co.in/viztown_new/assets/images/logo.png" className="w-36" alt="Viztown Logo"></img>
                    </div>
                </Link>
                <nav className="vt-navigation text-sm space-x-8 flex items-center">
                    {/* {menus.map((menu) => {
                        return <Link key={menu.slug} to={`/${menu.slug}`}>{menu.title}</Link>
                    })} */}
                    <Link to="/about" activeClassName="text-secondary">About</Link>
                    <Link to="/commercial" activeClassName="text-secondary">Commercial</Link>
                    <Link to="/partners" activeClassName="text-secondary">Partners</Link>
                    <Link to="/showcase" activeClassName="text-secondary">Showcase</Link>
                    <Link to="/contact-us" activeClassName="text-secondary">Contact Us</Link>
                    {!user ? 
                    <Link to="/login" className="bg-secondary px-5 rounded-sm py-2 font-bold leading-none hover:text-white">Login</Link> 
                    : 
                    <>
                    <Link to="/dashboard" className="bg-secondary px-5 rounded-sm py-2 font-bold leading-none hover:text-white">Dashboard</Link>
                    {/* <button style={{marginLeft:'8px'}} className="bg-secondary px-3 rounded-sm py-2 font-bold leading-none hover:text-white" onClick={handleLogout}>Logout</button> */}
                    </>
                    }
                </nav>
            </div>
        </header>

    )
}
