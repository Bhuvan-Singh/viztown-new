import React from 'react'

export default function Error() {
    return (
        <div className="Error-module w-full py-60 lg:py-0 px-8 lg:px-0 lg:mt-48 flex justify-center items-center ">
            <div className="my-2 lg:my-0">
                <h1 className="text-4xl font-semibold font-playfair mb-8"><span className="Emoji-module " role="img">😶</span> <span className="italic" >Oops!</span></h1>
                <h2 className="text-xl font-semibold">Data could not be loaded.</h2>
                <p>
                    Please double check your URL, or try after some time.<br/>
                </p>
            </div>
        </div>
    )
}
