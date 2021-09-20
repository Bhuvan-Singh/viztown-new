import React from 'react'
import {Link} from 'gatsby'
import Layout from '../components/Layout'

export default function NotFoundPage() {
  return (
    <Layout>
      <div className="flex items-center justify-center py-28 w-full">
            <div className="text-center">
                <h3 className="text-4xl font-semibold font-playfair mb-12"><span className="Emoji-module " role="img">😶</span> <span className="italic" >Oops!</span></h3>
                <h5 className="text-6xl font-semibold font-playfair">404</h5>
                <p className="text-2xl font-semibold mt-2 mb-8">
                We can’t find the page you’re looking for!
                </p>
                <Link to="/" className="bg-secondary py-3 px-6 text-sm rounded-sm font-semibold text-white">Take me home</Link>
            </div>
        </div>
    </Layout>
  )
}
