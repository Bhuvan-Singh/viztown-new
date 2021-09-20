import React,  {useState, useEffect} from 'react'
import {Link} from 'gatsby'
import Layout from '../../../components/dashboard/common/Layout'
import TotalViews from '../../../components/dashboard/common/TotalViews'
import MeetingsView from '../../../components/dashboard/meetings/MeetingsView'
import Properties from '../../../components/dashboard/index/Properties'
import Meetings from '../../../components/dashboard/index/Meetings'
import Proposals from '../../../components/dashboard/index/Proposals'
import Button from '../../../components/dashboard/common/Button'
import ListingsTileView from '../../../components/showcase/listings/ListingsTileView'
import axiosConfig from '../../../axiosConfig'

export default function Listings() {
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
    const [publicListings, setPublicListings] = useState(null);
    const [privateListings, setPrivateListings] = useState(null);
    useEffect(()=>{ 
        axiosConfig.get('/vendorPropertyListing',{
            params: {
                id: localStorage.getItem('vendor_id'),
            }
        })
        .then(function(response){
            let publicList = [];
            let privateList = []
            response.data.data.map(listing => {
                listing.visibility === "1" ? privateList.push(listing) : publicList.push(listing)
            })
            setIsLoading(false)
            publicList.length > 0 ? setPublicListings(publicList) : setPublicListings(null)
            privateList.length > 0 ? setPrivateListings(privateList) : setPrivateListings(null)
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
                <div className="flex items-center w-full justify-between">
                    <TotalViews/>
                    <div className="flex items-center space-x-6">
                    {propertyListings === null ? "" : <ListingsTileView propertyListings={propertyListings.slice(0, 3)}/>}
                    </div>
                </div>
            </div>
            <div className="vt-dashboard-hot-properties py-10 border-b border-gray-100">
                <h3 className="text-lg font-semibold flex items-center space-x-1 justify-between w-full">
                    <span>Public Listings</span>
                    <Button to={`/dashboard/listings/create`}>Create New Listing</Button>
                </h3>
                {publicListings === null ? <div className="py-8 font-semibold"><h4>No Public Listing Added Yet</h4></div> : <ListingsTileView propertyListings={publicListings}/>}
            </div>
            <div className="vt-dashboard-hot-properties py-10">
                <h3 className="text-lg font-semibold flex items-center space-x-1 justify-between w-full">
                    <span>Private Listings</span>
                    <Button to={`/dashboard/listings/create`}>Create New Listing</Button>
                </h3>
                {privateListings === null ? <div className="py-8 font-semibold"><h4>No Private Listing Added Yet</h4></div> : <ListingsTileView propertyListings={privateListings}/>}
            </div>
            </> 
        }
        </Layout>
    )
}

