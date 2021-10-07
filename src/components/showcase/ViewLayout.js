import React from "react";
import LayoutNoFooter from "../LayoutNoFooter"
import Listings from "./listings/Listings"
import OwnerDetails from "./OwnerDetails"

export default function ViewLayout({children, slug}) {
  return (
    <LayoutNoFooter slug={slug}>
      <div className="vt-showcase mx-auto relative z-10">
        <div className="grid lg:grid-cols-9 xl:grid-cols-8 2xl:grid-cols-12">
          <div className="hidden xl:block col-span-2 2xl:col-span-4 border-r border-gray-100">
            <Listings propertyPage={true} />
          </div>
          <div className="lg:col-span-3 xl:col-span-2 2xl:col-span-3 hidden lg:block">
            <OwnerDetails slug={slug} />
          </div>
          <div className="lg:col-span-6 xl:col-span-4 2xl:col-span-5 bg-gray-100 relative">
            {children}
          </div>
        </div>
      </div>
    </LayoutNoFooter>
  );
}
