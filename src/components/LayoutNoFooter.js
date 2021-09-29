import React, { useContext } from "react";
import { Link } from "gatsby";
import Header from "./Header";
import Footer from "./Footer";
import Filters from "../components/showcase/Filters";
import "../css/index.css";
import { ListingContext } from "../contexts/ListingContextProvider";

export default function LayoutNoFooter({ children, showcase = false }) {
  const { listings } = useContext(ListingContext);
  return (
    <div>
      <Header isFixed={false} />
      <Filters />
      {showcase ? (
        ""
      ) : (
        <Link
          to="/showcase"
          className="absolute left-0 bg-gray-200 pl-1 pr-2 py-1 bottom-12 rounded-r-xl z-40 lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 font-bold"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      )}
      <div className="content">
        {listings.length === 0 ? (
          <div className="flex items-center justify-center pt-48 w-full">
            <div className="text-center">
              <h3 className="text-4xl font-semibold font-playfair mb-8">
                <span className="Emoji-module " role="img">
                  😶
                </span>{" "}
                <span className="italic">Oops!</span>
              </h3>
              <h5 className="text-2xl font-semibold">
                No matching property found.
              </h5>
              <p>
                Please refine your search parameters.
                <br />
              </p>
            </div>
          </div>
        ) : (
          <div className="">{children}</div>
        )}
        {/* {children} */}
      </div>
    </div>
  );
}
