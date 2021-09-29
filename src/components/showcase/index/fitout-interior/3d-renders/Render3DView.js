import React,{useEffect, useState} from 'react'
import axiosConfig from '../../../../../axiosConfig'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import IndexLayout from '../../IndexLayout'
import NavigationFI from '../NavigationFI'
import SliderWithNavigation from '../../SliderWithNavigation'
import ImageGallery from 'react-image-gallery';
import Loader from '../../../../Loader'
import Error from '../../../../Error'

export default function Render3DView({slug, fullView}) {
    const [rendersData, setRendersData] = useState(null)
    const [loading, setLoading] = useState(true)
    const renders = [
        {
            tab: "Modern",
            iframe: false,
            images : [
                {
                    original: 'http://viztown.in/upload/gallery/902850941reception.jpg',
                    thumbnail: 'http://viztown.in/upload/gallery/902850941reception.jpg',
                    thumbnailTitle: "Reception",
                    thumbnailLabel: "Reception",
                    thumbnailClass: "text-xs text-primary hover:border-secondary border-opacity-80"
        
                },
                {
                    original: 'http://viztown.in/upload/gallery/1809065459meeting_room.jpg',
                    thumbnail: 'http://viztown.in/upload/gallery/1809065459meeting_room.jpg',
                    thumbnailTitle: "Meeting Room",
                    thumbnailLabel: "Meeting Room",
                    thumbnailClass: "text-xs text-primary hover:border-secondary border-opacity-80"
                },
                {
                    original: 'http://viztown.in/upload/gallery/1376609084confrence_.jpg',
                    thumbnail: 'http://viztown.in/upload/gallery/1376609084confrence_.jpg',
                    thumbnailTitle: "Conference Room",
                    thumbnailLabel: " Conference Room",
                    thumbnailClass: "text-xs text-primary hover:border-secondary border-opacity-80"
                },
                {
                    original: 'http://viztown.in/upload/gallery/897725761manager.jpg',
                    thumbnail: 'http://viztown.in/upload/gallery/897725761manager.jpg',
                    thumbnailTitle: "Manager Cabin",
                    thumbnailLabel: "Manager Cabin",
                    thumbnailClass: "text-xs text-primary hover:border-secondary border-opacity-80"
        
                },
                {
                    original: 'http://viztown.in/upload/gallery/21537289Director.jpg',
                    thumbnail: 'http://viztown.in/upload/gallery/21537289Director.jpg',
                    thumbnailTitle: "Director Cabin",
                    thumbnailLabel: "Director Cabin",
                    thumbnailClass: "text-xs text-primary hover:border-secondary border-opacity-80"
                },
                {
                    original: 'http://viztown.in/upload/gallery/787819957Cafe2.jpg',
                    thumbnail: 'http://viztown.in/upload/gallery/787819957Cafe2.jpg',
                    thumbnailTitle: "Cafe",
                    thumbnailLabel: "Cafe",
                    thumbnailClass: "text-xs text-primary hover:border-secondary border-opacity-80"
                },
                {
                    original: 'http://viztown.in/upload/gallery/787819957Cafe2.jpg',
                    thumbnail: 'http://viztown.in/upload/gallery/787819957Cafe2.jpg',
                    thumbnailTitle: "Cafe 2",
                    thumbnailLabel: "Cafe 2",
                    thumbnailClass: "text-xs text-primary hover:border-secondary border-opacity-80"
                },
            ]
        },
        {
            tab: "Conventional",
            iframe: false,
            images : [
                {
                    original: 'http://viztown.in/upload/gallery/21537289Director.jpg',
                    thumbnail: 'http://viztown.in/upload/gallery/21537289Director.jpg',
                    thumbnailTitle: "Director Cabin",
                    thumbnailLabel: "Director Cabin",
                    thumbnailClass: "text-xs text-primary hover:border-secondary border-opacity-80"
                },
                {
                    original: 'http://viztown.in/upload/gallery/787819957Cafe2.jpg',
                    thumbnail: 'http://viztown.in/upload/gallery/787819957Cafe2.jpg',
                    thumbnailTitle: "Cafe",
                    thumbnailLabel: "Cafe",
                    thumbnailClass: "text-xs text-primary hover:border-secondary border-opacity-80"
                },
                {
                    original: 'http://viztown.in/upload/gallery/787819957Cafe2.jpg',
                    thumbnail: 'http://viztown.in/upload/gallery/787819957Cafe2.jpg',
                    thumbnailTitle: "Cafe 2",
                    thumbnailLabel: "Cafe 2",
                    thumbnailClass: "text-xs text-primary hover:border-secondary border-opacity-80"
                },
                {
                    original: 'http://viztown.in/upload/gallery/902850941reception.jpg',
                    thumbnail: 'http://viztown.in/upload/gallery/902850941reception.jpg',
                    thumbnailTitle: "Reception",
                    thumbnailLabel: "Reception",
                    thumbnailClass: "text-xs text-primary hover:border-secondary border-opacity-80"
        
                },
                {
                    original: 'http://viztown.in/upload/gallery/1809065459meeting_room.jpg',
                    thumbnail: 'http://viztown.in/upload/gallery/1809065459meeting_room.jpg',
                    thumbnailTitle: "Meeting Room",
                    thumbnailLabel: "Meeting Room",
                    thumbnailClass: "text-xs text-primary hover:border-secondary border-opacity-80"
                },
                {
                    original: 'http://viztown.in/upload/gallery/1376609084confrence_.jpg',
                    thumbnail: 'http://viztown.in/upload/gallery/1376609084confrence_.jpg',
                    thumbnailTitle: "Conference Room",
                    thumbnailLabel: " Conference Room",
                    thumbnailClass: "text-xs text-primary hover:border-secondary border-opacity-80"
                },
                {
                    original: 'http://viztown.in/upload/gallery/897725761manager.jpg',
                    thumbnail: 'http://viztown.in/upload/gallery/897725761manager.jpg',
                    thumbnailTitle: "Manager Cabin",
                    thumbnailLabel: "Manager Cabin",
                    thumbnailClass: "text-xs text-primary hover:border-secondary border-opacity-80"
        
                },
                
            ]
        }
    ]

    useEffect(()=>{
        axiosConfig.get('/property3dRender',{
            params: {
                slug: slug,
            }
        })
        .then(function (response) {  
            setLoading(false)
            response.data.error ? setRendersData(null) : setRendersData(response.data.data)
        })
        .catch(function (error) {
            setLoading(false)
            setRendersData(null);
        })
    },[])

    return (
        <IndexLayout>
            <NavigationFI slug={`/showcase/${slug}`}/>
            { typeof window !== 'undefined' && (
                loading ? 
               <Loader/> :
                rendersData !== null ?
            <Tabs>
                <TabList className="tabs text-white text-xs font-semibold relative w-screen lg:w-full bg-primary absolute top-0 py-2 z-10 flex items-center mx-auto capitalize md:justify-center  gap-2 whitespace-nowrap lg:whitespace-normal overflow-y-hidden overflow-x-auto" style={{height:'40px'}}>
                    {
                        rendersData.map((render,index) => (
                            <Tab key={index} className="border-0 cursor-pointer rounded-3xl px-4 py-2" selectedClassName="bg-secondary text-primary">{render.tab}</Tab>
                        ))
                    }
                </TabList>
                <div className="bg-grey" style={{height:'calc(100vh - 250px)'}}>
                    {rendersData.map((render,index) => (
                        <TabPanel className="h-full hidden" selectedTabPanelClassName="block" key={index}>
                            {/* <SliderWithNavigation images={render.images} iframe={render.iframe} fullView={fullView}/> */}
                            <div className="relative w-full lg:w-9/12 2xl:w-full h-full flex justify-center items-center mx-auto">
                                <ImageGallery items={render.images} slideOnThumbnailOver={true} infinite={true}/>
                            </div>
                        </TabPanel>
                    ))}
                </div>
            </Tabs>:
            <Error/>
            )
            }
        </IndexLayout>
    )
}
