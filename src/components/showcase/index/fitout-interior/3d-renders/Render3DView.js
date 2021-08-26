import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import IndexLayout from '../../IndexLayout'
import NavigationFI from '../NavigationFI'
import SliderWithNavigation from '../../SliderWithNavigation'

export default function Render3DView({pageContext, fullView}) {
    const renders = [
        {
            tab: "Modern",
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
            tab: "Conventional",
            iframe: false,
            images : [
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
                },
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
                        renders.map((render,index) => (
                            <Tab key={index} className="border-0 cursor-pointer rounded-3xl px-4 py-2" selectedClassName="bg-secondary text-primary">{render.tab}</Tab>
                        ))
                    }
                </TabList>
                <div className="bg-grey" style={{height:'calc(100vh - 270px)'}}>
                    {renders.map((render,index) => (
                        <TabPanel className="f-full hidden" selectedTabPanelClassName="block" key={index}>
                            <SliderWithNavigation images={render.images} iframe={render.iframe} fullView={fullView}/>
                        </TabPanel>
                    ))}
                </div>
            </Tabs>
            )
            }
        </IndexLayout>
    )
}
