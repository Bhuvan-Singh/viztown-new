import React,{useEffect, useContext} from 'react'
import {Link} from 'gatsby'
import { CommonContext } from '../contexts/CommonContextProvider';

export default function Header() {
    const {menus} = useContext(CommonContext)
    return (
        <header className="vt-header bg-primary text-white px-10">
            <div className="flex items-center justify-between py-2">
                <Link to="/">
                    <div className="vt-logo">
                        <img src="http://cyberworx.co.in/viztown_new/assets/images/logo.png" className="w-36" alt="Viztown Logo"></img>
                    </div>
                </Link>
                <nav className="vt-navigation text-sm space-x-8 flex items-center">
                    {menus.map((menu) => {
                        return <Link key={menu.slug} to={`/${menu.slug}`}>{menu.title}</Link>
                    })}
                    {/* <Link to="/about">About</Link>
                    <Link to="/product">Product</Link>
                    <Link to="/partners">Partners</Link>
                    <Link to="/showcase">Showcase</Link>
                    <Link to="/contact-us">Contact Us</Link> */}
                    <Link to="/login" className="bg-secondary px-5 rounded-sm py-2 font-bold leading-none hover:text-white">Sign In</Link>
                </nav>
            </div>
        </header>

    )
}
