import React from 'react'
import Header from './Header'
import Footer from './Footer'
import "../css/index.css"

export default function Layout({children}) {
    return (
        <div>
            <Header/>
            <div className="content h-96">
                {children}
            </div>
            <Footer/>
        </div>
    )
}
