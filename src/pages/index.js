import React, {Fragment} from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import HomeBanner from "../components/common/HomeBanner";
import ClientSlider from "../components/common/ClientSlider";
import WhyPartner from "../components/common/WhyPartner";
import Features from "../components/common/Features";
import InstaSlider from "../components/common/InstaSlider";
import ContactForm from "../components/common/ContactForm";

export default function index(props) {
  const data = props.data.allHomeData.nodes[0].data;
  const contactData = props.data.allContactData.nodes[0];
  return (
    <Fragment>
      <div></div>
      <Layout>
        <HomeBanner data={data.banner} />
        <Features
          firstSection={data.firstSection}
          fourthSection={data.fourthSection}
          secondSection={data.secoundSection}
          thirdSection={data.thirdSection}
        />
        <WhyPartner data={data.whyPartners} />
        <div className="bg-grey lg:pt-24">
          <ClientSlider />
        </div>
        <div className="container xl:max-w-screen-xl  flex-col-reverse flex-col lg:flex-row flex mx-auto px-4 pb-16 xl:px-0 pt-16 ">
          <div className="w-full lg:w-1/2 lg:pr-28 flex-1 mt-4 lg:mt-0">
            <ContactForm />
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="font-bold text-4xl font-playfair text-primary mb-4">
              Schedule a Visit
            </h2>
            <p className="text-lightGrey text lg:w-9/12">
              Contact us today to get 360 degree property viewing experience.
            </p>
            <div className="mt-10 text-sm space-y-6 ">
              {contactData.contactDetails.zoneNumbers.map((number) => (
                <div className="flex items-center">
                  <div className="relative">
                    <span className="block h-6 w-6 border-0 rounded-full bg-secondary"></span>
                    <img
                      className="lazy absolute h-5 w-5 -top-1 -right-1"
                      alt=""
                      src="https://admin.viztown.in/assets/images/phone-call.png"
                    />
                  </div>
                  <a href="#" className="ml-4 font-semibold">
                    {number}
                  </a>
                </div>
              ))}

              <div className="flex items-center">
                <div className="relative">
                  <span className="block h-6 w-6 border-0 rounded-full bg-secondary"></span>
                  <img
                    className="lazy absolute h-5 w-5 -top-1 -right-1"
                    alt=""
                    src="https://admin.viztown.in/assets/images/email.png"
                  />
                </div>
                <a
                  href={`mailto:${contactData.contactDetails.emailID}`}
                  className="ml-4 font-semibold"
                >
                  {contactData.contactDetails.emailID}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-10 align-center ">
              <a
                href="https://www.facebook.com/VizTown-100407728694850"
                className="block h-7 w-7 border-0 rounded-full bg-secondary text-primary text-center hover:bg-primary hover:text-secondary transition duration-700 ease-in-out"
              >
                <i className="fa fa-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com/viztown/"
                className="block h-7 w-7 border-0 rounded-full bg-secondary text-primary text-center hover:bg-primary hover:text-secondary transition duration-700 ease-in-out"
              >
                <i className="fa fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <InstaSlider images={data.galleryImages} />
      </Layout>
    </Fragment>
  );
}

export const query = graphql`
  query hoomeDataQuery {
    allHomeData {
      nodes {
        data {
          banner {
            bannerImages {
              imageFile {
                childImageSharp {
                  gatsbyImageData(
                    transformOptions: { fit: COVER, cropFocus: CENTER }
                    layout: FULL_WIDTH
                  )
                }
              }
            }
            buttons {
              text
              url
            }
            heading
            subheading
          }
          firstSection {
            heading
            description
            type
            imageFile {
              childImageSharp {
                gatsbyImageData(transformOptions: {fit: COVER, cropFocus: CENTER})
              }
            }
          }
          fourthSection {
            description
            heading
            type
            url
          }
          galleryImages {
            imageFile {
              childImageSharp {
                gatsbyImageData(
                  transformOptions: {fit: COVER, cropFocus: CENTER}
                  width: 400
                  height: 400
                  )
              }
            }
          }
          secoundSection {
            description
            heading
            type
            url
          }
          thirdSection {
            description
            heading
            type
            imageFile {
              childImageSharp {
                gatsbyImageData(transformOptions: {fit: COVER, cropFocus: CENTER})
              }
            }
          }
          whyPartners {
            allListing {
              description
              link
              title
            }
            heading
          }
        }
      }
    }

    allContactData {
      nodes {
        contactDetails {
          emailID
          zoneNumbers
        }
      }
    }
  }
`;
