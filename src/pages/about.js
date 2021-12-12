import React, { useState, useEffect } from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import { Markup } from "interweave";
import Layout from "../components/Layout";
import Hero from "../components/common/Hero";
import TeamSlider from "../components/common/TeamSlider";
import ClientSlider from "../components/common/ClientSlider";
import SEO from "../components/SEO";
export default function About(props) {
    const data = props.data.allAboutData.nodes[0].data;
    return (
        <Layout>
            <SEO title="Viztown - About Us" />
            <Hero
                heading={data.banner.heading}
                imageUrl={data.banner.imageFile}
            />
            <div className="relative my-16 lg:my-0 xl:my-16 lg:py-24 z-10  lg:mb-0">
                <div className="xl:max-w-screen-xl md:flex mx-auto px-4 xl:px-0 items-center">
                    <Markup
                        className="md:w-1/2 space-y-5 md:pr-4 lg:pr-14 text-md"
                        content={data.aboutDetails.description}
                    />

                    <div className="md:w-1/2 md:flex mt-8 md:mt-0">
                        <div className="md:w-1/2 space-y-4">
                            <GatsbyImage
                                className="h-56 mx-auto shadow-md w-full md:w-11/12 object-cover"
                                alt=""
                                image={getImage(data.aboutDetails.imageFile1)}
                            />
                            <GatsbyImage
                                className="lazy h-56 mx-auto shadow-xl w-full md:w-11/12 object-cove"
                                alt=""
                                image={getImage(data.aboutDetails.imageFile2)}
                            />
                        </div>
                        <div className="md:w-1/2">
                            <GatsbyImage
                                className="lazy object-left w-full md:w-auto mt-4 md:mt-0 shadow-lg "
                                alt=""
                                image={getImage(data.aboutDetails.imageFile3)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full overflow-x-hidden">
                <div className="bg-grey pt-12 relative w-full overflow-x-hidden">
                    {/* <div className="bg-grey pt-12 pb-60 relative w-full overflow-x-hidden"> */}
                    {/* <div className="absolute w-200 h-52 lg:h-96 bg-grey transform -rotate-45 tilted z-20"></div> */}
                    <div className="absolute w-200 h-96 bg-grey transform -rotate-45 tilted z-20 -ml-5/4 left-0"></div>
                    <div className="xl:max-w-screen-xl md:flex mx-auto space-y-8 md:space-y-0 md:space-x-24 lg:space-x-60 relative z-20 px-4 xl:px-0 md:-mt-16 lg:mt-0 md:pt-24 lg:pt-0">
                        <div className="md:w-1/2">
                            <h4 className="text-2xl font-bold bg-secondary py-3 px-6 text-primary font-playfair mb-8">
                                {data.spaceOwner.heading}
                            </h4>
                            <div className="flex flex-col space-y-4">
                                {data.spaceOwner.feature.map((item, i) => (
                                    <div
                                        className="flex items-center border-b-2 border-secondary border-opacity-30 pb-4"
                                        key={i}
                                    >
                                        <img
                                            className="lazy w-2 h-2 mr-2"
                                            alt=""
                                            src="https://admin.viztown.in/assets/images/Group 47.svg"
                                        />
                                        <h6 className="text font-semibold text-primary">
                                            {item.heading}
                                        </h6>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="md:w-1/2">
                            <h4 className="text-2xl font-bold bg-secondary py-3 px-6 text-primary font-playfair mb-8">
                                {data.clients.heading}
                            </h4>
                            <div className="flex flex-col space-y-4">
                                {data.clients.feature.map((item, i) => (
                                    <div className="flex items-center border-b-2 border-secondary border-opacity-30 pb-4">
                                        <img
                                            className="lazy w-2 h-2 mr-2"
                                            alt=""
                                            src="https://admin.viztown.in/assets/images/Group 47.svg"
                                        />
                                        <h6 className="text font-semibold text-primary">
                                            {item.heading}
                                        </h6>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* <StaticImage
                        className="lazy absolute w-96 bottom-16 md:bottom-0 md:-mb-0 -ml-16"
                        alt=""
                        src="https://admin.viztown.in/assets/images/Image%203@2x.png"
                        style={{ position: "absolute" }}
                    /> */}
                </div>

                {/* <div className="bg-primary pb-24 xl:py-24 px-4 xl:px-0 relative">
                    <StaticImage
                        className="lazy absolute hidden md:block md:w-4/12 top-0 right-0 -mt-40 md:-mt-80 -mr-8 z-30"
                        src="https://admin.viztown.in/assets/images/Image%204@2x.png"
                        alt=""
                        style={{ position: "absolute" }}
                    />
                    <div className="absolute w-200 h-96 bg-primary transform -rotate-45 tilted z-20 -ml-5/4 left-0"></div>
                    <div className="xl:max-w-screen-xl mx-auto relative z-10">
                        <div className="space-y-4 text-center">
                            <h1 className="text-4xl text-white font-bold font-playfair">
                                Our Team
                            </h1>
                        </div>
                        <TeamSlider team={data.ourTeam.teamlist} />
                    </div>
                </div> */}
                <ClientSlider />
            </div>
        </Layout>
    );
}

export const query = graphql`
    query AboutDataQuery {
        allAboutData {
            nodes {
                data {
                    aboutDetails {
                        description
                        imageFile1 {
                            childImageSharp {
                                gatsbyImageData(
                                    transformOptions: {
                                        fit: COVER
                                        cropFocus: CENTER
                                    }
                                    layout: FULL_WIDTH
                                )
                            }
                        }
                        imageFile2 {
                            childImageSharp {
                                gatsbyImageData(
                                    transformOptions: {
                                        fit: COVER
                                        cropFocus: CENTER
                                    }
                                    layout: FULL_WIDTH
                                )
                            }
                        }
                        imageFile3 {
                            childImageSharp {
                                gatsbyImageData(
                                    transformOptions: {
                                        fit: COVER
                                        cropFocus: CENTER
                                    }
                                    layout: FULL_WIDTH
                                )
                            }
                        }
                    }
                    banner {
                        heading
                        imageFile {
                            childImageSharp {
                                fluid(quality: 90, maxWidth: 1920) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                    clients {
                        feature {
                            heading
                        }
                        heading
                    }

                    spaceOwner {
                        feature {
                            heading
                        }
                        heading
                    }
                }
            }
        }
    }
`;

// ourTeam {
//   heading
//   teamlist {
//       designation
//       location
//       name
//       imageFile {
//           childImageSharp {
//               gatsbyImageData(
//                   transformOptions: {
//                       fit: CONTAIN
//                       cropFocus: CENTER
//                   }
//               )
//           }
//       }
//   }
// }
