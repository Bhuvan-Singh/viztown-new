import React, { useEffect } from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import CommercialBanner from "../components/common/CommercialBanner";
import AnimatedSection from "../components/common/AnimatedSection";
import ProfessionalSlider from "../components/common/ProfessionalSlider";
import Floorplan from "../components/common/Floorplan";
import VirtualTour from "../components/common/VirtualTour";
import ExperienceCenter from "../components/common/ExperienceCenter";
import Process from "../components/common/Process";
export default function Commercial(props) {
  const data = props.data.allCommercialData.nodes[0].data;
  return (
    <Layout>
      <CommercialBanner data={data.banner} />
      <AnimatedSection
        data={[data.firstSection, data.secoundSection, data.thirdSection]}
      />
      <div className="w-full overflow-x-hidden">
        <ProfessionalSlider data={data.professionalPhotos} />
        <Floorplan data={data.floorPlan} />
        <VirtualTour data={data.virtualTour} />
        <ExperienceCenter
          data={{
            first: data.firstSectionexperienceCenter,
            second: data.secondSectionexperienceCenter,
            third: data.thirdSectionexperienceCenter,
            fourth: data.fourthSectionexperienceCenter,
          }}
        />
        <Process data={data.ourProcess} />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query commercialDataQuery {
    allCommercialData {
      nodes {
        data {
          banner {
            heading
            imageFile {
              childImageSharp {
                fluid(quality: 90, maxWidth: 1920, cropFocus: SOUTH) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            subheading
          }
          firstSection {
            description
            fileType
            heading
            imageFile {
              childImageSharp {
                fluid {
                  srcWebp
                }
              }
            }
          }
          firstSectionexperienceCenter {
            description
            fileType
            heading
            imageFile {
              childImageSharp {
                gatsbyImageData(
                  transformOptions: { fit: COVER, cropFocus: CENTER }
                  layout: FULL_WIDTH
                )
              }
            }
          }
          floorPlan {
            description
            heading
            modifiedImageFile {
              childImageSharp {
                gatsbyImageData(
                  transformOptions: { fit: COVER, cropFocus: CENTER }
                  layout: FULL_WIDTH
                )
              }
            }
            originalImageFile {
              childImageSharp {
                gatsbyImageData(
                  transformOptions: { fit: COVER, cropFocus: CENTER }
                  layout: FULL_WIDTH
                )
              }
            }
          }
          fourthSectionexperienceCenter {
            description
            fileType
            heading
            imageFile {
              childImageSharp {
                gatsbyImageData(
                  transformOptions: { fit: COVER, cropFocus: CENTER }
                  layout: FULL_WIDTH
                )
              }
            }
          }
          ourProcess {
            heading
            imageFile {
              childImageSharp {
                gatsbyImageData(
                  transformOptions: { fit: COVER, cropFocus: CENTER }
                  layout: FULL_WIDTH
                )
              }
            }
            processList {
              process
            }
            subheading
          }
          professionalPhotos {
            description
            heading
            images {
              imageFile {
                childImageSharp {
                  gatsbyImageData(
                    transformOptions: { fit: COVER, cropFocus: CENTER }
                    layout: FULL_WIDTH
                  )
                }
              }
            }
          }
          secondSectionexperienceCenter {
            description
            heading
            modifiedImageFile {
              childImageSharp {
                gatsbyImageData(
                  transformOptions: { fit: COVER, cropFocus: CENTER }
                  layout: FULL_WIDTH
                )
              }
            }
            originalImageFile {
              childImageSharp {
                gatsbyImageData(
                  transformOptions: { fit: COVER, cropFocus: CENTER }
                  layout: FULL_WIDTH
                )
              }
            }
          }
          secoundSection {
            description
            fileType
            heading
            imageFile {
              childImageSharp {
                fluid {
                  srcWebp
                }
              }
            }
          }
          thirdSectionexperienceCenter {
            description
            fileType
            heading
            url
          }
          thirdSection {
            description
            fileType
            heading
            imageFile {
              childImageSharp {
                fluid {
                  srcWebp
                }
              }
            }
          }
          virtualTour {
            description
            fileType
            heading
            url
          }
        }
      }
    }
  }
`;
