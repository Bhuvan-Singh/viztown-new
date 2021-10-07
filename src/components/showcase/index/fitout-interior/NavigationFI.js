import React,{useContext, useEffect} from 'react'
import {Link, navigate} from 'gatsby'
import {CommonContext} from '../../../../contexts/CommonContextProvider'

export default function NavigationFI({slug}) {
    const {fitoutMenuStatus, activeSlug} = useContext(CommonContext)
    useEffect(()=>{
        if(fitoutMenuStatus !== null){
            if(fitoutMenuStatus.layout === 0 && fitoutMenuStatus.render === 0 && fitoutMenuStatus.tour === 0){
                return
            }
            else if(fitoutMenuStatus.layout === 0 && fitoutMenuStatus.render === 0){
                navigate(`${slug}/fitout-interior/3d-tour`)
            }

            else if(fitoutMenuStatus.layout === 0 && fitoutMenuStatus.tour === 0){
                navigate(`${slug}/fitout-interior/3d-renders`)
            }
        }
    },[fitoutMenuStatus])

    return fitoutMenuStatus === null ? "" : (
        <div className={`relative w-full bg-white absolute top-0 py-1 lg:py-1 z-10 flex items-center mx-auto capitalize justify-center gap-2 whitespace-nowrap lg:whitespace-normal overflow-y-hidden overflow-x-auto`}>
            <Link 
            to={`${slug}/fitout-interior`} 
            className={`tab--link rounded-3xl text-primary px-4 text-xs font-semibold py-2 ${fitoutMenuStatus.layout === 0 ? "hidden" : ""}`}
            activeClassName="bg-secondary text-primary"
            // partiallyActive={true}
            >Floor Layout
            </Link>

            <Link 
            to={`${slug}/fitout-interior/3d-renders`} 
            className={`tab--link rounded-3xl text-primary px-4 text-xs font-semibold py-2 ${fitoutMenuStatus.render === 0 ? "hidden" : ""}`}
            activeClassName="bg-secondary text-primary"
            partiallyActive={true}
            >3D Renders
            </Link>

            <Link 
            to={`${slug}/fitout-interior/3d-tour`} 
            className={`tab--link rounded-3xl text-primary px-4 text-xs font-semibold py-2 ${fitoutMenuStatus.tour === 0 ? "hidden" : ""}`}
            activeClassName="bg-secondary text-primary">3D Tour
            </Link>
        </div>
    )
}