import React,  {useState, useEffect} from 'react'
import Layout from '../../components/dashboard/common/Layout'
import TotalViews from '../../components/dashboard/common/TotalViews'
import MeetingsView from '../../components/dashboard/meetings/MeetingsView'
import Properties from '../../components/dashboard/index/Properties'
import Meetings from '../../components/dashboard/index/Meetings'
import Proposals from '../../components/dashboard/index/Proposals'
import Button from '../../components/dashboard/common/Button'
import ListingsTileView from '../../components/showcase/listings/ListingsTileView'
import axiosConfig from '../../axiosConfig'

export default function Index() {
    // const propertyListings = [
    //     {
    //         id: 1,
    //         slug: "101-indian-road",
    //         ownerImg: "http://cyberworx.co.in/viztown_new//upload/about/bb2438f4d39cc948408c50e32d3ff39e.jpg",
    //         ownerName: "Ankita Gokhale",
    //         featuredImage: "http://cyberworx.co.in/viztown_new//upload/about/aa9a85202f59982afde7b85d018cbb26.jpg",
    //         title: "101 Indian Road",
    //         location: "Lake bluff, illinios 600044",
    //         ownerAddress: "Early Bird Homes at eXp Realty, LLC",
    //         configuration: [
    //             {
    //                 name: "Bed",
    //                 value: "3"
    //             },
    //             {
    //                 name: "Bath",
    //                 value: "2+1"
    //             },
    //             {
    //                 name: "SF",
    //                 value: "1076 + 76"
    //             }
    //         ],
    //         coordinates: {
    //             lat: 28.726580,
    //             lng: 77.083054
    //         },
    //         viewsThisWeek : 124
    //     },
    //     {
    //         id: 2,
    //         slug: "102-indian-road",
    //         ownerImg: "http://cyberworx.co.in/viztown_new//upload/about/3316316cf1e651b385563f64a0e68d1d.jpg",
    //         ownerName: "Amit Triwedi",
    //         featuredImage: "http://cyberworx.co.in/viztown_new//upload/about/5b1a1cc899639389854aa59872113a51.jpg",
    //         title: "102 Indian Road",
    //         location: "Lake bluff, illinios 600044",
    //         ownerAddress: "Early Bird Homes at eXp Realty, LLC",
    //         configuration: [
    //             {
    //                 name: "Bed",
    //                 value: "2"
    //             },
    //             {
    //                 name: "Bath",
    //                 value: "2+1"
    //             },
    //             {
    //                 name: "SF",
    //                 value: "976 + 86"
    //             }
    //         ],
    //         coordinates: {
    //             lat: 28.716181,
    //             lng: 77.122673
    //         },
    //         viewsThisWeek : 156
    //     },
    //     {
    //         id: 3,
    //         slug: "103-indian-road",
    //         ownerImg: "http://cyberworx.co.in/viztown_new//upload/about/68606f72eaf34d9264dc8b8d5cc5ba93.jpg",
    //         ownerName: "Sneha Singh",
    //         featuredImage: "http://cyberworx.co.in/viztown_new//upload/about/aa9a85202f59982afde7b85d018cbb26.jpg",
    //         title: "103 Indian Road",
    //         location: "Lake bluff, illinios 600044",
    //         ownerAddress: "Early Bird Homes at eXp Realty, LLC",
    //         configuration: [
    //             {
    //                 name: "Bed",
    //                 value: "4"
    //             },
    //             {
    //                 name: "Bath",
    //                 value: "2+1"
    //             },
    //             {
    //                 name: "SF",
    //                 value: "1676 + 65"
    //             }
    //         ],
    //         coordinates: {
    //             lat: 28.73258595,
    //             lng: 77.10770205726195
    //         },
    //         viewsThisWeek : 168
    //     }
    // ]
    const [isLoading, setIsLoading] =useState(true);
    const [propertyListings, setpropertyListings] = useState(null);
    useEffect(()=>{ 
        axiosConfig.get('/vendorPropertyListing',{
            params: {
                id: localStorage.getItem('vendor_id'),
            }
        })
        .then(function(response){
            console.log(response)
            setIsLoading(false)
            setpropertyListings(response.data.data)
        })
        .catch(error => {
            console.log(error)
            setIsLoading(false)
            setpropertyListings(null)
        })
    },[])
    return (
        <Layout>
            { isLoading ?  
            <div className="relative w-full z-5 h-full mt-32 flex justify-center items-center">
                <img src="http://cyberworx.co.in/viztown-2.0/admin/assets/backend/image/loader.gif" alt="loading" /> 
            </div>
            :
            <>
            <div className="vt-dashboard-overview flex items-center py-6 2xl:py-6 border-b border-gray-100">
                <MeetingsView/>
                <div className="flex items-center ml-16 pl-16 border-l-2 border-gray-200">
                    <TotalViews/>
                    <div className="flex items-center space-x-6 ml-24">
                        <Button to={`/dashboard/listings/create`}>Create New Listing</Button>
                        <Button>Create New Proposal</Button>
                        <Button>Create New Agreement</Button>
                    </div>
                </div>
            </div>
            <div className="vt-dashboard-overview grid grid-cols-3 gap-4 py-8">
                {propertyListings === null ? "" : <Properties propertyListings={propertyListings}/>}
                <Meetings/>
                <Proposals/>
            </div>
            <div className="vt-dashboard-hot-properties">
                <h3 className="text-lg font-semibold flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                    </svg>
                    <span>Hot properties this week</span>
                </h3>
                {propertyListings === null ? "" : <ListingsTileView propertyListings={propertyListings}/>}
            </div>
            </>
            }
        </Layout>
    )
}
