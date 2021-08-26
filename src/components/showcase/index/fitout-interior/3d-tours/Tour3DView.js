import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import IndexLayout from '../../IndexLayout'
import NavigationFI from '../NavigationFI'
import SliderWithNavigation from '../../SliderWithNavigation'

export default function Tour3DView({pageContext, fullView}) {
    const tours = [
        {
            tab: "Modern",
            iframe: true,
            images : [
                {
                    url: "http://viztown.in/upload/gallery/1809065459meeting_room.jpg",
                    title: "Meeting Room",
                    matterportUrl: "https://my.matterport.com/show/?m=VD3CEWEXXxm"
                },
                {
                    url: "http://viztown.in/upload/gallery/1376609084confrence_.jpg",
                    title: "Conference Room",
                    matterportUrl: "https://my.matterport.com/show/?m=VD3CEWEXXxm"
                },
                {
                    url: "http://viztown.in/upload/gallery/902850941reception.jpg",
                    title: "Site Area",
                    matterportUrl: "https://my.matterport.com/show/?m=VD3CEWEXXxm"
                },
                {
                    url: "http://viztown.in/upload/gallery/897725761manager.jpg",
                    title: "Manager Cabin",
                    matterportUrl: "https://my.matterport.com/show/?m=VD3CEWEXXxm"
                },
                {
                    url: "http://viztown.in/upload/gallery/21537289Director.jpg",
                    title: "Director Cabin",
                    matterportUrl: "https://my.matterport.com/show/?m=VD3CEWEXXxm"
                },
                {
                    url: "http://viztown.in/upload/gallery/787819957Cafe2.jpg",
                    title: "Cafe",
                    matterportUrl: "https://my.matterport.com/show/?m=VD3CEWEXXxm"
                },
                {
                    url: "http://viztown.in/upload/gallery/1735099316Cafe1.jpg",
                    title: "Cafe 2",
                    matterportUrl: "https://my.matterport.com/show/?m=VD3CEWEXXxm"
                }
            ]
        },
        {
            tab: "Semi-Conventional",
            iframe: true,
            images : [
                {
                    url: "http://viztown.in/upload/gallery/21537289Director.jpg",
                    title: "Director Cabin",
                    matterportUrl: "https://my.matterport.com/show/?m=VD3CEWEXXxm"
                },
                {
                    url: "http://viztown.in/upload/gallery/787819957Cafe2.jpg",
                    title: "Cafe",
                    matterportUrl: "https://my.matterport.com/show/?m=VD3CEWEXXxm"
                },
                {
                    url: "http://viztown.in/upload/gallery/1735099316Cafe1.jpg",
                    title: "Cafe 2",
                    matterportUrl: "https://my.matterport.com/show/?m=VD3CEWEXXxm"
                },
                {
                    url: "http://viztown.in/upload/gallery/1809065459meeting_room.jpg",
                    title: "Meeting Room",
                    matterportUrl: "https://my.matterport.com/show/?m=VD3CEWEXXxm"
                },
                {
                    url: "http://viztown.in/upload/gallery/1376609084confrence_.jpg",
                    title: "Conference Room",
                    matterportUrl: "https://my.matterport.com/show/?m=VD3CEWEXXxm"
                },
                {
                    url: "http://viztown.in/upload/gallery/902850941reception.jpg",
                    title: "Site Area",
                    matterportUrl: "https://my.matterport.com/show/?m=VD3CEWEXXxm"
                },
                {
                    url: "http://viztown.in/upload/gallery/897725761manager.jpg",
                    title: "Manager Cabin",
                    matterportUrl: "https://my.matterport.com/show/?m=VD3CEWEXXxm"
                },
                
            ]
        }
    ]
    return (
        <IndexLayout>
            <NavigationFI slug={`/showcase/${pageContext.slug}`} listId={pageContext.id}/>
            { typeof window !== 'undefined' && (
            <Tabs>
                <TabList className="tabs relative w-full bg-primary top-0 py-1 z-10 flex items-center mx-auto capitalize justify-center gap-4 text-xs font-semibold text-white" style={{height:'40px'}}>
                    {
                        tours.map((tour,index) => (
                            <Tab key={index} className="border-0 cursor-pointer rounded-3xl px-4 py-2" selectedClassName="bg-secondary text-primary">{tour.tab}</Tab>
                        ))
                    }
                </TabList>
                <div className="bg-grey" style={{height:'calc(100vh - 250px)'}}>
                    {tours.map((tour,index) => (
                        <TabPanel className="h-full hidden" selectedTabPanelClassName="block" key={index}>
                            <SliderWithNavigation images={tour.images} iframe={tour.iframe} fullView={fullView}/>
                        </TabPanel>
                    ))}
                </div>
            </Tabs>
            )
            }
        </IndexLayout>
    )
}
