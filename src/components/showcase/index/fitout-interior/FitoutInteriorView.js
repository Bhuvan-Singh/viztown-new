import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import IndexLayout from '../IndexLayout'
import NavigationFI from './NavigationFI'
import PinchZoom from '../PinchZoom'
export default function FitoutInteriorView({pageContext, fullView}) {

    const floorLayouts = [
        {
            tab: "Modern",
            image : "http://cyberworx.co.in/viztown_new/upload/showcase/9e6c81733e4d24e56b24050a6cbeade7.png",
        },
        {
            tab: "Conventional",
            image : "http://cyberworx.co.in/viztown_new/upload/showcase/9e6c81733e4d24e56b24050a6cbeade7.png",
        },
        {
            tab: "Semi-Conventional",
            image : "http://cyberworx.co.in/viztown_new/upload/showcase/9e6c81733e4d24e56b24050a6cbeade7.png",
        },
    ]
    return (
        <IndexLayout>
            <NavigationFI slug={`/showcase/${pageContext.slug}`} listId={pageContext.id}/>
            { typeof window !== 'undefined' && (
            <Tabs>
                <TabList className="tabs relative w-full bg-primary top-0 py-1 z-10 flex items-center mx-auto capitalize justify-center gap-4 text-xs font-semibold text-white" style={{height:'40px'}}>
                    {
                        floorLayouts.map((layout,index) => (
                            <Tab key={index} className="border-0 cursor-pointer rounded-3xl px-4 py-2" selectedClassName="bg-secondary text-primary">{layout.tab}</Tab>
                        ))
                    }
                </TabList>
                <div className="bg-grey" style={{height:'calc(100vh - 270px)'}}>
                    {floorLayouts.map((layout,index) => (
                        <TabPanel className=" hidden" selectedTabPanelClassName="block" key={index}>
                            <PinchZoom image={layout.image}/>
                        </TabPanel>
                    ))}
                </div>
            </Tabs>
            )
            }
        </IndexLayout>
    )
}
