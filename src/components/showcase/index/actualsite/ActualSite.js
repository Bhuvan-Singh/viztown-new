import React,{useEffect, useState} from 'react'
import axiosConfig from '../../../../axiosConfig';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import IndexLayout from '../IndexLayout'
import ImageGallery from 'react-image-gallery';
import Loader from '../../../Loader'
import Error from '../../../Error'

import SliderWithNavigation from '../SliderWithNavigation'

export default function ActualSiteView({fullView, pageContext}) {
    const [actualSiteData, setActualSiteData] = useState(null)
    const [loading, setLoading] = useState(true)
    const images = [
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
    ];

    useEffect(()=>{
        axiosConfig.get('/propertyActualSiteData',{
            params: {
                id: parseInt(pageContext.id),
            }
        })
        .then(function (response) {  
            setLoading(false)
            response.data.error ? setActualSiteData(null) : setActualSiteData(response.data.data)
            
        })
        .catch(function (error) {
            setLoading(false)
            setActualSiteData(null);
        })
    },[])

    const actualSite = [
        {
            tab: "Site Photo",
            iframe: false,
            images : [
                {
                    url: "http://viztown.in/upload/gallery/902850941reception.jpg",
                    title: "Reception"
                },
                {
                    url: "http://viztown.in/upload/gallery/1809065459meeting_room.jpg",
                    title: "Meeting Room"
                },
                {
                    url: "http://viztown.in/upload/gallery/1376609084confrence_.jpg",
                    title: "Conference Room"
                },
                {
                    url: "http://viztown.in/upload/gallery/897725761manager.jpg",
                    title: "Manager Cabin"
                },
                {
                    url: "http://viztown.in/upload/gallery/21537289Director.jpg",
                    title: "Director Cabin"
                },
                {
                    url: "http://viztown.in/upload/gallery/787819957Cafe2.jpg",
                    title: "Cafe"
                },
                {
                    url: "http://viztown.in/upload/gallery/1735099316Cafe1.jpg",
                    title: "Cafe 2"
                }
            ]
        },
        {
            tab: "Actual Site Tour",
            iframe: true,
            images : [
                {
                    url: "http://viztown.in/upload/gallery/1809065459meeting_room.jpg",
                    title: "Meeting Room",
                    matterportUrl: "https://my.matterport.com/show/?m=VD3CEWEXXxm"
                }
            ]
        }
    ]
    return loading ? 
        <Loader/> :(
        actualSiteData !== null ?
        <IndexLayout>
            { typeof window !== 'undefined' && (
            <Tabs>
                <TabList className="tabs relative w-full bg-white top-0 py-1 z-10 flex items-center mx-auto capitalize justify-center gap-4 text-xs font-semibold" style={{height:'40px'}}>
                    {
                        actualSiteData.map((site,index) => (
                            <Tab key={index} className="border-0 cursor-pointer rounded-3xl px-4 py-2" selectedClassName="bg-secondary text-primary">{site.tab}</Tab>
                        ))
                    }
                </TabList>
                <div className="bg-grey relative" style={{height:'calc(100vh - 210px)'}}>
                    {actualSiteData.map((site,index) => (
                        <TabPanel className="h-full hidden" selectedTabPanelClassName="block" key={index}>
                            {index === 1 ? 
                            <div className="relative w-10/12 2xl:w-full h-full flex justify-center items-center mx-auto">    
                                <ImageGallery items={site.images} slideOnThumbnailOver={true} infinite={true}/>
                            </div>:
                            
                            <iframe class="w-full h-full" allowfullscreen="" height="100%" width="100%" src={site.iframe}></iframe>
                            }
                        </TabPanel>
                    ))}
                </div>
            </Tabs>
            )
            }
        </IndexLayout>:
        <Error/>
    )
}
