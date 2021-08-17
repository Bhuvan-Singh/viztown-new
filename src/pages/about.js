import React from 'react'
import Layout from '../components/Layout'

export default function About() {
  return (
    <Layout>
      <div className="relative" style={{backgroundImage: "url(http://viztown.in/upload/banner/2722b00358caaff433d2b46463a8ca24.jpg)",backgroundRepeat: "no-repeat",backgroundSize: "cover"}}>
          <div className="absolute w-full h-full bg-black opacity-70 top-0 left-0 z-0"></div>
          <div className="container xl:max-w-screen-xl py-48 text-center mx-auto relative z-10">
            <h1 className="text-4xl md:text-5xl  text-white font-bold font-playfair">About Us</h1>
          </div>
      </div>
    </Layout>
  )
}
