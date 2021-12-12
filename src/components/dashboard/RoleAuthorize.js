import React, { useContext, useEffect, useState } from "react";
import { navigate } from "gatsby";
import { RoleContext } from "../../contexts/RoleContextProvider";

export default function RoleAuthorize({ page, children }) {
    const { role } = useContext(RoleContext);
    const [isAuthorizedRole, setIsAuthorizedRole] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        console.log(role);
        if (role !== null) {
            if (role.role == "3" && page !== "meetings") {
                setIsAuthorizedRole(false);
                navigate("/dashboard/meetings");
            } else if (
                role.role == "2" &&
                page !== "listings" &&
                page !== "proposals" &&
                page !== "agreements"
            ) {
                navigate("/dashboard/listings");
                setIsAuthorizedRole(false);
            } else {
                setIsAuthorizedRole(true);
            }
            setIsLoading(false);
        }
    }, [role]);
    return isLoading ? (
        <div className="absolute w-full z-5 top-0 h-full flex justify-center items-center left-0">
            <img
                src="http://cyberworx.co.in/viztown-2.0/admin/assets/backend/image/loader.gif"
                alt="loading"
            />
        </div>
    ) : !isAuthorizedRole ? (
        <div className="Error-module w-full mt-48 flex justify-center items-center ">
            <div>
                <h1 className="text-4xl font-semibold font-playfair mb-8">
                    <span className="Emoji-module " role="img">
                        😶
                    </span>{" "}
                    <span className="italic">Oops!</span>
                </h1>
                <h2 className="text-xl font-semibold">
                    You are not authorized to access this page.
                </h2>
                <p>
                    Please double check your URL, or go back to listings page.
                    <br />
                    {/* <Link
                        to="/dashboard/listings"
                        className="bg-secondary text-sm px-8 rounded-md py-3 font-bold leading-none hover:text-white items-center inline-block mt-4"
                    >
                        All Listings
                    </Link> */}
                </p>
            </div>
        </div>
    ) : (
        <div>{children}</div>
    );
}
