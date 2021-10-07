import React,{useEffect, useState} from 'react'
import axiosConfig from '../../../../axiosConfig'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import IndexLayout from '../IndexLayout'
import NavigationFI from './NavigationFI'
import PinchZoom from '../PinchZoom'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Loader from '../../../Loader'
import Error from '../../../Error'

export default function FitoutInteriorView({slug, fullView}) {
    const [floorLayoutsData, setFloorLayoutsData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        axiosConfig.get('/floorLayoutData',{
            params: {
                slug: slug,
            }
        })
        .then(function (response) {  
            setLoading(false)
            response.data.error ? setFloorLayoutsData(null) : setFloorLayoutsData(response.data.data)
        })
        .catch(function (error) {
            setLoading(false)
            setFloorLayoutsData(null);
        })
    },[])
    const handle = useFullScreenHandle();
    return (
        <IndexLayout>
            <NavigationFI slug={`/showcase/${slug}`} floorLayoutsData={floorLayoutsData}/>
            { typeof window !== 'undefined' && (
                loading ? 
                <Loader/> :
                floorLayoutsData !== null ?
                <FullScreen className="relative" handle={handle}>
            <Tabs>
                <TabList className="text-white text-xs font-semibold relative w-screen lg:w-full bg-primary absolute top-0 py-2 z-10 flex items-center mx-auto capitalize md:justify-center  gap-2 whitespace-nowrap lg:whitespace-normal overflow-y-hidden overflow-x-auto" style={{height:'40px'}}>
                    {
                        floorLayoutsData.map((layout,index) => (
                            <Tab key={index} className="border-0 cursor-pointer rounded-3xl px-4 py-2" selectedClassName="bg-secondary text-primary">{layout.tab}</Tab>
                        ))
                    }
                </TabList>
                <div className="" style={{height:'calc(100vh - 270px)'}}>
                    {floorLayoutsData.map((layout,index) => (
                        <TabPanel className=" hidden" selectedTabPanelClassName="block" key={index}>
                            
                                <PinchZoom image={layout.image}/>
                                <button onClick={handle.enter} className="absolute top-12 right-4 enter-full-screen">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                    </svg>
                                </button>

                                <button onClick={handle.exit} className="absolute top-12 right-4 exit-full-screen" title="Exit Full Screen">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                </button>
                            
                        </TabPanel>
                    ))}
                </div>
            </Tabs>
            </FullScreen>:
            <Error/>
            )
            }
        </IndexLayout>
    )
}
