import React, { useEffect, useState } from "react";
import { graphql } from 'gatsby'
import Layout from "../components/Layout";
import Hero from "../components/common/Hero";
import ContactForm from "../components/common/ContactForm";

export default function Contact(props) {
  const data = props.data.allContactData.nodes[0];
  return (
    <Layout>
      <Hero
        heading={data.banner.heading}
        imageUrl={data.banner.imageFile}
      />

      <div className="container xl:max-w-screen-xl px-4 xl:px-0 pt-16 xl:pt-24 pb-16 md:pb-20 lg:pb-16 md:flex mx-auto text-sm">
        <div className="md:w-5/12 lg:w-2/5 lg:pr-10 ">
          <div className="contact__details space-y-6 ">
            {data.contactDetails.zoneNumbers.map((number,i) => 
              <div className="flex items-center" key={i}>
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
            )}
            

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
                href={`mailto:${data.contactDetails.emailID}`}
                className="ml-4 font-semibold"
              >
                {data.contactDetails.emailID}
              </a>
            </div>
          </div>
          <iframe
            className="lazy w-full h-80 mt-8"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            src={data.contactDetails.googleMapLink}
          ></iframe>
        </div>
        <div className="md:w-7/12 lg:w-3/5 mt-8 md:mt-0 md:pl-12 lg:pl-12">
          <h1 className="text-3xl text-primary font-bold font-playfair">
            Send us your message
          </h1>
          <ContactForm/>
          
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query ContactDataQuery {
    allContactData {
      nodes {
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
        contactDetails {
          address
          emailID
          footerDescription
          googleMapLink
          number
          zoneNumbers
        }
      }
    }
  }
`;
