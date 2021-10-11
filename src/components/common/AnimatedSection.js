import React, { useRef } from "react";
import { Link } from "gatsby";
import {GatsbyImage, getImage, Img} from 'gatsby-plugin-image'
import useIntersection from "../useIntersection";

export default function AnimatedSection({ data }) {
  console.log(data)
  const ref__module__1 = useRef();
  const ref__module__2 = useRef();
  const ref__module__3 = useRef();
  const inViewport1 = useIntersection(ref__module__1);
  const inViewport2 = useIntersection(ref__module__2);
  const inViewport3 = useIntersection(ref__module__3);
  let dataFocus = "";
  if (inViewport1) {
    dataFocus = "component--1";
  } else if (inViewport2) {
    dataFocus = "component--2";
  } else if (inViewport3) {
    dataFocus = "component--3";
  } else {
    dataFocus = "";
  }
  return (
    <section
      className="sticky--module bg-grey relative min-h-screen flex flex-col items-center lg:pt-32"
      data-focus={dataFocus}
      id="package"
    >
      <h1 className="text-4xl text-primary font-bold font-playfair lg:hidden">
        Web Brochure
      </h1>

      <div
        className="sticky--module--component sticky--module--component--1 lg:flex justify-end items-center w-full lg:mb-80 mt-0 static pt-16 pb-8 lg:pt-0 lg:pb-0 px-4 lg:px-0"
        ref={ref__module__1}
      >
        <figure className="z-40 hidden lg:block">
          <div className="sticky--module--sticky">
            <div className="sticky--module--window">
              <div className="sticky--module--figure figure--1">
                <img className="lazy" alt={data[0].heading} src={data[0].imageFile.childImageSharp.fluid.srcWebp} />
                {/* <GatsbyImage image={getImage(data[0].imageFile)} alt={data[0].heading} /> */}
              </div>
            </div>
          </div>
        </figure>
        <figure className="z-40 pb-8 lg:hidden">
          {/* <img
            className="lazy h-96 w-full"
            alt="Unlimited professional photos"
            src={data[0].url}
            // src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          /> */}
          <img className="h-96 w-full" alt={data[0].heading} src={data[0].imageFile.childImageSharp.fluid.srcWebp} />
          {/* <GatsbyImage className="lazy h-96 w-full" alt={data[0].heading} image={getImage(data[0].imageFile)} /> */}
        </figure>
        <article className="lg:pr-32 space-y-8">
          <h1 className="text-4xl text-primary font-bold font-playfair mb-16 hidden lg:block">
            Web Brochure
          </h1>
          <h2 className="text-3xl text-primary font-bold font-playfair block lg:pr-32">
            {data[0].heading}
          </h2>
          <p>{data[0].description}</p>
          <div>
            <Link
              className="font-bold text-primary hover:text-secondary"
              to={"/showcase/"}
            >
              Get Started
              <svg
                className="w-6 ml-2 inline"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </Link>
          </div>
        </article>
      </div>

      <div
        className="sticky--module--component sticky--module--component--2 lg:flex justify-end items-center w-full lg:mb-80 mt-0 static pt-16 pb-8 lg:pt-0 lg:pb-0 px-4 lg:px-0"
        ref={ref__module__2}
      >
        <figure className="z-30 hidden lg:block">
          <div className="sticky--module--sticky">
            <div className="sticky--module--window">
              <div className="sticky--module--figure figure--2">
                {/* <img className="lazy" alt={data[1].heading} src={data[1].url} /> */}
                <img className="" alt={data[1].heading} src={data[1].imageFile.childImageSharp.fluid.srcWebp} />
              </div>
            </div>
          </div>
        </figure>
        <figure className="z-30 pb-8 lg:hidden">
          {/* <img
            className="lazy h-96 w-full"
            alt={data[1].heading}
            src={data[1].url}
            // src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          /> */}
          <img className="h-96 w-full" alt={data[1].heading} src={data[1].imageFile.childImageSharp.fluid.srcWebp} />
        </figure>
        <article className="lg:pr-32 space-y-8">
          <h2 className="text-3xl text-primary font-bold font-playfair block lg:pr-32">
            {data[1].heading}
          </h2>
          <p>{data[1].description}</p>
          <div>
            <Link
              className="font-bold text-primary hover:text-secondary"
              to={"/showcase/"}
            >
              Get Started
              <svg
                className="w-6 ml-2 inline"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </Link>
          </div>
        </article>
      </div>
      <div
        className="sticky--module--component sticky--module--component--3 lg:flex justify-end items-center w-full lg:mb-80 mt-0 static pt-16 pb-8 lg:pt-0 lg:pb-0 px-4 lg:px-0"
        ref={ref__module__3}
      >
        <figure className="z-20 hidden lg:block">
          <div className="sticky--module--sticky">
            <div className="sticky--module--window">
              <div className="sticky--module--figure figure--3">
                {/* <img className="lazy" alt={data[2].heading} src={data[2].url} /> */}
                <img className="" alt={data[2].heading} src={data[2].imageFile.childImageSharp.fluid.srcWebp} />
              </div>
            </div>
          </div>
        </figure>
        <figure className="z-20 pb-8 lg:hidden">
          {/* <img
            className="lazy h-96 w-full"
            alt={data[2].heading}
            src={data[2].url}
            // src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          /> */}
          <img className="h-96 w-full" alt={data[2].heading} src={data[2].imageFile.childImageSharp.fluid.srcWebp} />
        </figure>
        <article className="lg:pr-32 space-y-8">
          <h2 className="text-3xl text-primary font-bold font-playfair block lg:pr-32">
            {data[2].heading}
          </h2>
          <p>{data[2].description}</p>
          <div>
            <Link
              className="font-bold text-primary hover:text-secondary"
              to={"/showcase/"}
            >
              Get Started
              <svg
                className="w-6 ml-2 inline"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
