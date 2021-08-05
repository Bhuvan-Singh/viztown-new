import React from 'react'

export default function Footer() {
    return (
        <footer className="w-full bg-primary pb-16 mt-4 lg:mt-24 relative z-10 text-sm font-light">
            <div className="container xl:max-w-screen-lg mx-auto md:pt-20">
                <div className="flex-none md:flex items-center justify-between bg-secondary py-8 px-4 md:px-16 rounded-sm md:-mt-32">
                    <h3 className="text-2xl 2xl:text-3xl text-white font-bold font-playfair">Get In Touch Today</h3>
                    <div className="flex items-center">
                        <a href="tel:+919654232156" className="text-white lg:text-xl 2xl:text-2xl mt-4 md:mt-0 md:ml-3 font-semibold hover:text-white">
                        <i className="fa fa-envelope text-white text-xl" aria-hidden="true"></i> truepartners@flipspaces.com</a>
                    </div>
                </div>
            </div>
            <div className="container xl:max-w-screen-xl mx-auto pt-12">
                <div className="flex-none p-4 xl:p-0 flex-wrap lg:flex-nowrap md:flex space-y-8 lg:space-y-0">
                    <div className="md:w-1/2 lg:w-4/12 xl:w-4/12 pr-8">
                        <img className="w-56" src="http://localhost/viztown/assets/images/logo.png" alt="Wiztown Logo"/>
                        <address className="mt-6 space-y-2 text-white">
                            <div><i className="fa fa-map-marker" aria-hidden="true"></i> Flipspaces, Eureka Tower, Mind Space, Malad(West), Mumbai-400064.</div>
                            <div><a href="tel:+91 9999114371" className="pb-3"><i className="fa fa-phone" aria-hidden="true"></i> +91 9999114371</a></div>
                            <div><i className="fa fa-envelope" aria-hidden="true"></i> truepartners@flipspaces.com</div>
                        </address>
                        <div className="mt-5 text-white">
                            Follow Us:
                            <div className="flex space-x-3 mt-2">
                            <a href="https://www.facebook.com/VizTown-100407728694850" className="block h-7 w-7 border-0 rounded-full bg-secondary text-primary text-center hover:bg-white hover:text-secondary transition duration-700 ease-in-out"><i className="fa fa-facebook"></i></a>
                            <a href="https://www.instagram.com/viztown/" className="block h-7 w-7 border-0 rounded-full bg-secondary text-primary text-center hover:bg-white hover:text-secondary transition duration-700 ease-in-out"><i className="fa fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 lg:w-2/12 xl:w-2/12">
                        <h4 className="text-white font-semibold text-sm 2xl:text-lg mb-6">Quick Links</h4>
                        <ul className="text-white space-y-2">
                            <li><a href="http://localhost/viztown/">Home</a></li>
                            <li><a href="http://localhost/viztown/about">About</a></li>
                            <li><a href="http://localhost/viztown/partners">Partners</a></li>
                            <li><a href="http://localhost/viztown/contact-us">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="md:w-1/2 lg:w-2/12">
                        <h4 className="text-white font-semibold text-sm 2xl:text-lg mb-6">Our Products</h4>
                        <ul className="text-white space-y-2">
                            <li><a href="http://localhost/viztown/residential">Residential</a></li>
                            <li><a href="http://localhost/viztown/commercial">Commercial</a></li>
                            <li><a href="http://localhost/viztown/showcase">Showcase</a></li>
                        </ul>
                    </div>
                    <div className="md:w-1/2 lg:w-4/12 lg:pr-12">
                        <h4 className="text-white font-semibold text-sm 2xl:text-lg mb-6">About Viztown</h4>
                        <div className="space-y-4 text-white">
                            <p> VizTown is a business arm of Flipspaces, poised to be India’s leading PropTech solution to simplify space planning, property visualization and design process powered by proprietary virtual technology.                        </p>
                            <p>© 2020. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
