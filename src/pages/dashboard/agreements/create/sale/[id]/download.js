import React, { useState, useEffect } from "react";
import { Link, navigate } from "gatsby";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../../../../../components/dashboard/common/Layout";
import Steps from "../../../../../../components/dashboard/agreements/Steps";
import Heading from "../../../../../../components/dashboard/common/Heading";
import AuthorizedAgreement from "../../../../../../components/dashboard/common/AuthorizedAgreement";

export default function KYC(props) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setUser(JSON.parse(localStorage.getItem("user")));
        }
    }, []);
    return (
        <Layout fullView={true}>
            <AuthorizedAgreement id={props.id}>
                <div
                    className="grid grid-cols-12"
                    style={{ height: "calc(100vh - 60px)", position: "fixed" }}
                >
                    <div className="col-span-3">
                        <Steps params={props.params} />
                    </div>

                    <div className="col-span-9 p-8">
                        <Heading>
                            Congratulations, your rent agreement is ready now.
                        </Heading>
                        {user !== null ? (
                            <a
                                href={`http://cyberworx.co.in/viztown-2.0/admin/api/generateAgreement?agreement_id=${props.id}&agreement_type=2&uid=${user.user.uid}`}
                                download
                                target="_blank"
                                className="w-52 text-xs font-semibold text-primary rounded-full py-3 px-4 h-11 uppercase bg-dashboardBlue cursor-pointer flex items-center space-x-2 mt-4 inline"
                                htmlFor="kyc_document"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-white"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-white">
                                    Download Agreement
                                </span>
                            </a>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </AuthorizedAgreement>
        </Layout>
    );
}
