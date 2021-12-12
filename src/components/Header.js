import React, { useState, useEffect, useContext } from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { CommonContext } from "../contexts/CommonContextProvider";
import { AuthContext } from "../contexts/AuthContextProvider";
import { auth } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
export default function Header({ isFixed = true }) {
    const [isSticky, setIsSticky] = useState(false);
    const { menus } = useContext(CommonContext);
    const { user, setUser } = useContext(AuthContext);
    // const [user, loading, error] = useAuthState(auth);
    const handleLogout = () => {
        signOut(auth);
    };
    useEffect(() => {
        if (typeof window !== `undefined`)
            window.onscroll = function () {
                scrollHeader();
            };

        function scrollHeader() {
            var sticky = document.getElementById("header");
            let scroll = window.pageYOffset;
            if (scroll >= 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        }

        document
            .getElementById("open--mobile--menu")
            .addEventListener("click", function () {
                document
                    .getElementById("mobile--menu")
                    .setAttribute("style", "display:block");
            });
        document
            .getElementById("close--mobile--menu")
            .addEventListener("click", function () {
                document
                    .getElementById("mobile--menu")
                    .setAttribute("style", "display:none");
            });
    }, []);
    return (
        <>
            <header
                className={`vt-header text-white lg:px-10 ${
                    isFixed ? "fixed z-50 w-full bg-transparent" : "bg-primary"
                } ${isSticky ? "bg-black bg-opacity-80" : ""}`}
                id="header"
            >
                <div className="items-center justify-between py-2 hidden lg:flex">
                    <Link to="/">
                        <div className="vt-logo">
                            <StaticImage
                                src="https://admin.viztown.in/assets/images/logo.png"
                                className="w-36"
                                alt="Viztown Logo"
                            />
                        </div>
                    </Link>
                    <nav className="vt-navigation text-sm space-x-8 flex items-center font-medium">
                        {/* {menus.map((menu) => {
                        return <Link key={menu.slug} to={`/${menu.slug}`}>{menu.title}</Link>
                    })} */}
                        <Link to="/about" activeClassName="text-secondary">
                            About
                        </Link>
                        <Link to="/commercial" activeClassName="text-secondary">
                            Commercial
                        </Link>
                        <Link to="/partners" activeClassName="text-secondary">
                            Partners
                        </Link>
                        <Link
                            to="/showcase"
                            activeClassName="text-secondary"
                            partiallyActive={true}
                        >
                            Showcase
                        </Link>
                        <Link to="/contact-us" activeClassName="text-secondary">
                            Contact Us
                        </Link>
                        {!user ? (
                            <Link
                                to="/login"
                                className="bg-secondary px-5 rounded-sm py-2 font-bold leading-none hover:text-white"
                            >
                                Login
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="bg-secondary px-5 rounded-sm py-2 font-bold leading-none hover:text-white"
                                >
                                    Dashboard
                                </Link>
                                {/* <button style={{marginLeft:'8px'}} className="bg-secondary px-3 rounded-sm py-2 font-bold leading-none hover:text-white" onClick={handleLogout}>Logout</button> */}
                            </>
                        )}
                    </nav>
                </div>
                <div className="w-full top-0 inset-x-0 transition transform origin-top-right lg:hidden py-3">
                    <div className="flex items-center justify-between w-full lg:w-auto  px-4">
                        <Link to="/">
                            <StaticImage
                                src="https://admin.viztown.in/assets/images/logo.png"
                                className="w-28"
                                alt="Wiztown Logo"
                            />
                        </Link>

                        <div className="flex items-center lg:hidden">
                            <button
                                type="button"
                                className="bg-white rounded-sm p-2 inline-flex items-center justify-center text-primary hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                id="open--mobile--menu"
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="h-6 w-6"
                                    x-description="Heroicon name: outline/menu"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    ariaidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <div
                id="mobile--menu"
                className="shadow-md bg-primary ring-1 ring-black ring-opacity-5 overflow-hidden w-screen h-screen hidden fixed z-50 top-0"
                style={{ display: "none" }}
            >
                <div className="px-4 pt-4 flex items-center justify-between">
                    <div>
                        <Link to="/">
                            <StaticImage
                                src="https://admin.viztown.in/assets/images/logo.png"
                                className="w-28"
                                alt="Wizwalk Logo"
                            />
                        </Link>
                    </div>
                    <div className="-mr-2">
                        <button
                            type="button"
                            className="bg-white rounded-sm p-2 inline-flex items-center justify-center text-primary hover:text-secondary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            id="close--mobile--menu"
                        >
                            <span className="sr-only">Close main menu</span>

                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="px-7 pt-12 pb-3 space-y-1 flex flex-col space-y-6 font-medium text-white">
                    <Link to="/about" activeClassName="text-secondary">
                        About
                    </Link>
                    <Link to="/commercial" activeClassName="text-secondary">
                        Commercial
                    </Link>
                    <Link to="/partners" activeClassName="text-secondary">
                        Partners
                    </Link>
                    <Link to="/showcase" activeClassName="text-secondary">
                        Showcase
                    </Link>
                    <Link to="/contact-us" activeClassName="text-secondary">
                        Contact Us
                    </Link>
                    {!user ? (
                        <Link
                            to="/login"
                            className="bg-secondary px-5 rounded-sm py-2 font-bold leading-none hover:text-white inline-block"
                        >
                            Login
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/dashboard"
                                className="bg-secondary px-5 rounded-sm py-2 font-bold leading-none hover:text-white"
                            >
                                Dashboard
                            </Link>
                            {/* <button style={{marginLeft:'8px'}} className="bg-secondary px-3 rounded-sm py-2 font-bold leading-none hover:text-white" onClick={handleLogout}>Logout</button> */}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
