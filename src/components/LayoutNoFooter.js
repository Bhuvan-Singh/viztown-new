import React,{useContext} from 'react'
import Header from './Header'
import Footer from './Footer'
import Filters from '../components/showcase/Filters'
import "../css/index.css"
import { ListingContext } from '../contexts/ListingContextProvider';

export default function LayoutNoFooter({children}) {
    const {listings} = useContext(ListingContext)
    return (
        <div>
            <Header/>
            <Filters/>
            <div className="content">
                {listings.length === 0 ? 
                <div className="flex items-center justify-center pt-48 w-full">
                    <div className="text-center">
                        <h3 className="text-4xl font-semibold font-playfair mb-8"><span className="Emoji-module " role="img">😶</span> <span className="italic" >Oops!</span></h3>
                        <h5 className="text-2xl font-semibold">No matching property found.</h5>
                        <p>
                            Please refine your search parameters.<br/>
                        </p>
                    </div>
                </div>: 
                children}
                {/* {children} */}
            </div>
        </div>
    )
}
