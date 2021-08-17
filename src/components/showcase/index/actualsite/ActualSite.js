import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import IndexLayout from '../IndexLayout'

import SliderWithNavigation from '../SliderWithNavigation'

export default function ActualSiteView({fullView}) {
    const actualSite = [
        {
            tab: "Site Photo",
            iFrame: false,
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
        }
    ]
    return (
        <IndexLayout>
            <Tabs>
                <TabList className="tabs relative w-full bg-white top-0 py-1 z-10 flex items-center mx-auto capitalize justify-center gap-4 text-xs font-semibold" style={{height:'40px'}}>
                    {
                        actualSite.map((site,index) => (
                            <Tab key={index} className="border-0 cursor-pointer rounded-3xl px-4 py-2" selectedClassName="bg-secondary text-primary">{site.tab}</Tab>
                        ))
                    }
                </TabList>
                <div className="bg-grey" style={{height:'calc(100vh - 210px)'}}>
                    {actualSite.map((site,index) => (
                        <TabPanel className="h-full hidden" selectedTabPanelClassName="block" key={index}>
                            <SliderWithNavigation images={site.images} iframe={site.iframe} fullView={fullView}/>
                        </TabPanel>
                    ))}
                </div>
            </Tabs>
        </IndexLayout>
    )
}
