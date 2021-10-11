import React, { useContext, useEffect } from "react";
// import LayoutNoFooter from "../components/LayoutNoFooter";
// import Listings from "../components/showcase/listings/Listings";
// import OwnerDetails from "../components/showcase/OwnerDetails";
import { CommonContext } from "../contexts/CommonContextProvider";
import axiosConfig from "../axiosConfig";

const Layout = ({ pageContext, children }) => {
  const { activeSlug, setFitoutMenuStatus , fullWidth} = useContext(CommonContext);
  const getParamFromPathname = (pathname) => {
    return pathname.split("/")[1];
  };

  useEffect(() => {
    if(document.querySelector('[aria-current="page"]') !== null)
      document.querySelector('[aria-current="page"]').scrollIntoView()
    if(activeSlug !== null) 
      axiosConfig
        .get("/propertyFitoutMenuStatus", {
          params: {
            slug: activeSlug,
          },
        })
        .then(function (response) {
          console.log(activeSlug)
          console.log("response.data.data")
          console.log(response.data.data)
          setFitoutMenuStatus(response.data.data);
        })
        .catch(function (error) {
          setFitoutMenuStatus(null);
        });

  }, [activeSlug]);

  useEffect(()=>{
    if(document.querySelector('[aria-current="page"]') !== null)
      document.querySelector('[aria-current="page"]').scrollIntoView()
  },[])

  if (!pageContext.matchPath) return <>{children}</>;
  return getParamFromPathname(pageContext.matchPath) === "showcase" ? (
    <div>
      {/* <LayoutNoFooter>
        <div className="vt-showcase mx-auto relative z-10">
          <div className="grid lg:grid-cols-9 xl:grid-cols-8 2xl:grid-cols-12">
            <div className={`hidden ${fullWidth ? "" : "xl:block col-span-2 2xl:col-span-4"}  border-r border-gray-100`}>
              <Listings propertyPage={true} />
            </div>
            <div className="lg:col-span-3 xl:col-span-2 2xl:col-span-3 hidden lg:block">
              {activeSlug === null ? "" : <OwnerDetails slug={activeSlug} />}
            </div>
            <div className={`lg:col-span-6 ${fullWidth ? "xl:col-span-6 2xl:col-span-9" : "xl:col-span-4 2xl:col-span-5"} bg-gray-100 relative`}>
              {children}
            </div>
          </div>
        </div>
      </LayoutNoFooter> */}
    </div>
  ) : (
    <>{children}</>
  );
};

export default Layout;
