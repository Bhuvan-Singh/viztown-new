import React from 'react'
import {Markup} from 'interweave'
import InfoSlider from './InfoSlider'
import IndexLayout from '../IndexLayout'

export default function InfoMap() {
    const infoMapData = {
        id: 1,
        propertyId : "H-4960-property",
        propertyName: "3-4 BHK Ready Apartment at Noroda, Ahmedabad",
        propertyLocation: "Swati Satkar Premium, ITI Rd, Kuber Nagar, Ahmedabad, Gujarat 382340",
        bannerImages: [
            "http://cyberworx.co.in/viztown_new/upload/gallery/1383277452001_001.jpg",
            "http://cyberworx.co.in/viztown_new/upload/gallery/1512039038003.jpg"
        ],
        propertyDescription: "<p>Satkar Premium is a premium commercial cum residential development of Swati Associates . With commercial shops on the ground floor and apartments above, Satkar Premium offers something unique for every customer. The project is well equipped with all the basic amenities to facilitate the needs of the residents. The property has 3 BHK &amp; 4 BHK apartments that are ready to move in.</p><p>Satkar Premium is a premium commercial cum residential development of Swati Associates . With commercial shops on the ground floor and apartments above, Satkar Premium offers something unique for every customer. The project is well equipped with all the basic amenities to facilitate the needs of the residents. The property has 3 BHK &amp; 4 BHK apartments that are ready to move in.</p>",
        buildDetails: {
            buildYear: "2020",
            buildUpArea: "2070",
            carpetArea: "2070",
            propertyType: "Ready To Move In",
            bookingType: "New",
            price: 6000000
        },
        fetaures:[
            {
                icon: "http://cyberworx.co.in/viztown_new/upload/img/d5f820846c179bb3f393a946de25fcb5.svg",
                title: "Lift"
            },
            {
                icon: "http://cyberworx.co.in/viztown_new/upload/img/d5f820846c179bb3f393a946de25fcb5.svg",
                title: "GYM"
            },
            {
                icon: "http://cyberworx.co.in/viztown_new/upload/img/d5f820846c179bb3f393a946de25fcb5.svg",
                title: "Security"
            },
            {
                icon: "http://cyberworx.co.in/viztown_new/upload/img/d5f820846c179bb3f393a946de25fcb5.svg",
                title: "Swimming Pool"
            },
            {
                icon: "http://cyberworx.co.in/viztown_new/upload/img/d5f820846c179bb3f393a946de25fcb5.svg",
                title: "CCTV"
            },
        ]
    }
    return (
        <IndexLayout>
            <InfoSlider propertyName={infoMapData.propertyName} propertyLocation={infoMapData.propertyLocation} bannerImages={infoMapData.bannerImages}/>
            <div className="px-4 lg:px-8 bg-white pb-8">
                <div className="2xl:max-w-screen-xl mx-auto grid grid-cols-1 gap-4 pt-8 pb-8 px-4 xl:px-0 text-xs">
                    <div className="">
                        <div className="py-3 border-b border-gray-200 border-opacity-80">
                            <h6>Property ID : <strong>{infoMapData.propertyId}</strong></h6>
                        </div>
                        <div className="py-8">
                            <h2 className="capitalize text-2xl text-primary mb-3 font-bold vt-serif-font">description</h2>
                            <div className="text-light text-primary 2xl:text-sm">
                                <Markup className="grid gap-4" content={infoMapData.propertyDescription}/>
                                {/* {infoMapData.propertyDescription} */}
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 border-opacity-80 pt-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                        <div className="flex items-center gap-4 text-primary">
                            <div>
                                <img className="w-8 h-8" src="http://cyberworx.co.in/viztown_new/assets/images/calendar.svg" alt=""/>
                            </div>
                            <div>
                                <h6>Year of Build</h6>
                                <h5 className="font-bold">{infoMapData.buildDetails.buildYear}</h5>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-primary ">
                            <div>
                                <img className="w-8 h-8" src="http://cyberworx.co.in/viztown_new/assets/images/area.svg" alt=""/>
                            </div>
                            <div>
                                <h6>Build Up Area</h6>
                                <h5 className="font-bold">{infoMapData.buildDetails.buildUpArea} Sq.Ft.</h5>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-primary">
                            <div>
                                <img className="w-8 h-8" src="http://cyberworx.co.in/viztown_new/assets/images/selection.svg" alt=""/>
                            </div>
                            <div>
                                <h6>Carpet Area</h6>
                                <h5 className="font-bold">{infoMapData.buildDetails.carpetArea} Sq.Ft.</h5>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-primary ">
                            <div>
                                <img className="w-8 h-8" src="http://cyberworx.co.in/viztown_new/assets/images/building.svg" alt=""/>
                            </div>
                            <div>
                                <h6>Property Type</h6>
                                <h5 className="font-bold">{infoMapData.buildDetails.propertyType}</h5>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-primary ">
                            <div>
                                <img className="w-8 h-8" src="http://cyberworx.co.in/viztown_new/assets/images/story.svg" alt=""/>
                            </div>
                            <div>
                                <h6>Booking Type</h6>
                                <h5 className="font-bold">{infoMapData.buildDetails.bookingType}</h5>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-primary bg-secondary py-3">
                            <div className="w-8">
                            </div>
                            <div>
                                <h6>For Sale</h6>
                                <h5 className="font-bold text-2xl">₹ {infoMapData.buildDetails.price}</h5>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="2xl:max-w-screen-xl mx-auto py-0 px-4 xl:px-0 border-t border-gray-200 border-opacity-80 pt-8">
                    <h2 className="capitalize text-2xl text-primary mb-3 font-bold vt-serif-font">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5 py-4">
                        {infoMapData.fetaures.map((feature) => (
                            <div className="flex items-center gap-2 text-primary">
                                <div className="bg-primary p-2 ">
                                    <img className="w-6 h-6" src={feature.icon} alt=""/>
                                </div>
                                <div>
                                    <h6 className="text-xs font-semibold">{feature.title}</h6>
                                </div>
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div>
        </IndexLayout>
    )
}
