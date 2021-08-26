import React from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

export default function PinchZoom({image}) {
    return (
        <>
        { typeof window !== 'undefined' && (
        <TransformWrapper
            initialScale={1}
        >
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <div className="lg:w-9/12 2xl:w-11/12 mx-auto overflow-hidden mt-4 border-2 border-gray-100 p-2 flex-col items-center justify-center">
                    <div className="border-2 border-grey border-opacity-50 p-2 bg-white">
                        <TransformComponent>
                            <img src={image} alt="test" />
                        </TransformComponent>
                    </div>
                    
                    <div className="space-x-4 flex justify-center pt-2">
                        <button onClick={() => zoomIn()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                            </svg>
                        </button>
                        <button onClick={() => zoomOut()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"></path>
                            </svg>
                        </button>
                        <button onClick={() => resetTransform()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </TransformWrapper>
        )
        }
        </>
    )
}
