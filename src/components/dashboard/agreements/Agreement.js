import React from "react";
import { Link } from "gatsby";
export default function Agreement({ data }) {
    return (
        <div className="border-2 border-gray-100 rounded-xl py-6">
            <div className="px-4 pb-4">
                <h3 className="font-semibold text-sm capitalize">
                    {data.title}
                </h3>
            </div>
            <div className="flex items-center justify-between px-4 pb-4 border-b border-gray-100">
                <div className="text-sm">
                    <div className="text-xs text-gray-400 uppercase">
                        {data.date}
                    </div>
                    <div className="font-semibold">
                        {data.type === "1"
                            ? "Rent Agreement"
                            : "Sale Agreement"}
                    </div>
                </div>
                <a
                    href={`http://cyberworx.co.in/viztown-2.0/admin/api/generateAgreement?agreement_id=${data.id}`}
                    target="_blank"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 ${
                            data.type === 0
                                ? "text-red-500"
                                : "text-dashboardBlue"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                </a>
            </div>
            <div className="flex justify-between px-4 py-4 border-b border-gray-100">
                <div className="text-sm font-semibold">
                    <div className="text-xs text-gray-400 uppercase mb-2">
                        Buyer
                    </div>
                    <div className="capitalize">{data.lessor}</div>
                </div>
                <div className="font-semibold text-sm">
                    <div className="text-xs text-gray-400 uppercase mb-2">
                        Seller
                    </div>
                    <div className="capitalize">{data.lessee}</div>
                </div>
            </div>

            <div className="px-4 pt-4 ">
                <div className="text-sm flex justify-between mb-2">
                    <div className="text-xs text-gray-400 uppercase font-semibold">
                        Property Details
                    </div>
                    <Link
                        to={`/dashboard/agreements/create/${
                            data.type === "1" ? "rent" : "sale"
                        }/${data.id}/lessor`}
                        className="capitalize text-xs text-dashboardBlue"
                    >
                        Edit Agreement
                    </Link>
                </div>
                <div>
                    {/* <h3 class="font-semibold text-sm mb-1">Prius Global</h3> */}
                    <div className="font-semibold text-sm flex items-center space-x-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <h3 class="text-gray-500  uppercase text-xs">
                            {data.address}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
