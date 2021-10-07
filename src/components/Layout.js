import React,{useState, useEffect} from 'react'
import Header from './Header'
import Footer from './Footer'
import "../css/index.css"
import axiosConfig from '../axiosConfig';

export default function Layout({children, fixedHeader=true}) {
    
    return (
        <div className="">
            <Header isFixed={fixedHeader}/>
            <div className="content">
                {children}
            </div>
            <Footer/>
        </div>
    )
}
