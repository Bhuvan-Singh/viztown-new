import React,{useState, useEffect} from 'react'
import Header from './Header'
import Footer from './Footer'
import Transition from './Transition'
import "../css/index.css"
import axiosConfig from '../axiosConfig';

export default function Layout({children}) {
    
    return (
        <div>
            <Header/>
            <div className="content">
                {children}
            </div>
            <Footer/>
        </div>
    )
}
