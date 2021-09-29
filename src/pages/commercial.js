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
            image
            subheading
          }
          firstSection {
            description
            fileType
            heading
            url
          }
          firstSectionexperienceCenter {
            description
            fileType
            heading
            url
          }
          floorPlan {
            description
            heading
            modifiedImage
            originalImage
          }
          fourthSectionexperienceCenter {
            description
            fileType
            heading
            url
          }
          ourProcess {
            heading
            image
            processList {
              process
            }
            subheading
          }
          professionalPhotos {
            description
            heading
            images {
              images
            }
          }
          secondSectionexperienceCenter {
            description
            heading
            originalImage
            modifiedImage
          }
          secoundSection {
            description
            fileType
            heading
            url
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
            url
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
