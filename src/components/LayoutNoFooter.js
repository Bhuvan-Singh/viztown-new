import React from 'react'
import Header from './Header'
import Footer from './Footer'
import "../css/index.css"

export default function LayoutNoFooter({children}) {
    return (
        <div>
            <Header/>
            <div className="content">
                {children}
            </div>
        </div>
    )
}
