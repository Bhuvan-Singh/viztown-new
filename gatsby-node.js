const path = require("path");
const axios = require("axios");
// const crypto = require("crypto");

const instance = axios.create({
  baseURL: process.env.API_URL,
});
// Where you would set stuff like your 'Authorization' header, etc ...
instance.defaults.headers.common["Authorization"] =
  process.env.AUTHORIZATION_KEY;
instance.defaults.headers.common["Content-Type"] = "application/json";
instance.defaults.headers.common["Accept"] = "application/json";

// exports.createPages = async ({ graphql, actions, reporter }) =>  {
//     const propertyListings = await instance.get('/allListings')
//     .then((response)=>{
//         console.log(response.data)
//         return response.data.data
//     })
//     .catch((error) => {
//         console.log(error)
//     })

//     if (propertyListings.errors) {
//         reporter.panic("Error loading characters!", reporter.errors)
//     }

//     propertyListings.map((property,index) => {
//         actions.createPage({
//             path: '/showcase/' + property.slug,
//             component: path.resolve('./src/templates/property-details.js'),
//             context: {slug: property.slug, id: property.id}
//         })
//         actions.createPage({
//             path: '/' + property.slug,
//             component: path.resolve('./src/templates/property-details-full.js'),
//             context: {slug: property.slug, id: property.id}
//         })
//         actions.createPage({
//             path: '/showcase/' + property.slug + '/actual-site',
//             component: path.resolve('./src/templates/actual-site.js'),
//             context: {slug: property.slug, id: property.id}
//         })
//         actions.createPage({
//             path: '/showcase/' + property.slug + '/fitout-interior',
//             component: path.resolve('./src/templates/fitout-interior.js'),
//             context: {slug: property.slug, id: property.id}
//         })
//         actions.createPage({
//             path: '/showcase/' + property.slug + '/space-calculator',
//             component: path.resolve('./src/templates/space-calculator.js'),
//             context: {slug: property.slug, id: property.id}
//         })
//         actions.createPage({
//             path: '/' + property.slug + '/actual-site',
//             component: path.resolve('./src/templates/actual-site-full.js'),
//             context: {slug: property.slug, id: property.id}
//         })
//         actions.createPage({
//             path: '/' + property.slug + '/fitout-interior',
//             component: path.resolve('./src/templates/fitout-interior-full.js'),
//             context: {slug: property.slug, id: property.id}
//         })
//         actions.createPage({
//             path: '/' + property.slug + '/space-calculator',
//             component: path.resolve('./src/templates/space-calculator-full.js'),
//             context: {slug: property.slug, id: property.id}
//         })
//         actions.createPage({
//             path: '/showcase/' + property.slug + '/fitout-interior/floor-layout',
//             component: path.resolve('./src/templates/floor-layout.js'),
//             context: {slug: property.slug, id: property.id}
//         })
//         actions.createPage({
//             path: '/showcase/' + property.slug + '/fitout-interior/3d-renders',
//             component: path.resolve('./src/templates/3d-renders.js'),
//             context: {slug: property.slug, id: property.id}
//         })
//         actions.createPage({
//             path: '/showcase/' + property.slug + '/fitout-interior/3d-tour',
//             component: path.resolve('./src/templates/3d-tour.js'),
//             context: {slug: property.slug, id: property.id}
//         })
//         actions.createPage({
//             path: '/' + property.slug + '/fitout-interior/floor-layout',
//             component: path.resolve('./src/templates/floor-layout-full.js'),
//             context: {slug: property.slug, id: property.id}
//         })
//         actions.createPage({
//             path: '/' + property.slug + '/fitout-interior/3d-renders',
//             component: path.resolve('./src/templates/3d-renders-full.js'),
//             context: {slug: property.slug, id: property.id}
//         })
//         actions.createPage({
//             path: '/' + property.slug + '/fitout-interior/3d-tour',
//             component: path.resolve('./src/templates/3d-tour-full.js'),
//             context: {slug: property.slug, id: property.id}
//         })
//     })
// }

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;
  //Create contact data node
  const fetchContactData = () =>
    instance
      .get(`/contactDetails`)
      .then((result) => {
        console.log(result.data.data);
        return result.data.data;
      })
      .catch((error) => error);

  const contactData = await fetchContactData();
  const contactNode = {
    id: createNodeId(`contact-data`),
    parent: `__SOURCE__`,
    internal: {
      type: `ContactData`,
    },
    children: [],
    banner: {
      heading: contactData.banner.heading,
      image: contactData.banner.image,
    },
    contactDetails: {
      number: contactData.contactDetails.number,
      emailID: contactData.contactDetails.emailID,
      address: contactData.contactDetails.address,
      zoneNumbers: contactData.contactDetails.zoneNumbers,
      googleMapLink: contactData.contactDetails.googleMapLink,
      footerDescription: contactData.contactDetails.footerDescription,
    },
  };
  contactNode.internal.contentDigest = createContentDigest(contactNode);
  createNode(contactNode);

  // Create client list node
  const fetchClientData = () =>
    instance
      .get(`/clients`)
      .then((result) => {
        return result.data.data;
      })
      .catch((error) => error);
  const clientData = await fetchClientData();
  const clientsList = [];
  clientData.allClientList.map((client) => {
    clientsList.push(client);
  });
  const clientNode = {
    id: createNodeId(`client-data`),
    parent: `__SOURCE__`,
    internal: {
      type: `ClientData`,
    },
    children: [],
    heading: clientData.heading,
    image: clientData.image,
    clientsList: clientsList,
  };
  clientNode.internal.contentDigest = createContentDigest(clientNode);
  createNode(clientNode);

  // Create Testimonials list node
  const fetchTestimonialData = () =>
    instance
      .get(`/testimonials`)
      .then((result) => {
        return result.data.data;
      })
      .catch((error) => error);
  const testimonialData = await fetchTestimonialData();
  testimonialData.map((testimonial, i) => {
    const testimonialNode = {
      id: createNodeId(`testimonial-data-${i}`),
      parent: `__SOURCE__`,
      internal: {
        type: `TestimonialData`,
      },
      children: [],
      logo: testimonial.logo,
      name: testimonial.name,
      designation: testimonial.designation,
      review: testimonial.review,
      image: testimonial.image,
    };

    testimonialNode.internal.contentDigest =
      createContentDigest(testimonialNode);
    createNode(testimonialNode);
  });

  // Create About Data node
  const fetchAboutData = () =>
    instance
      .get(`/about`)
      .then((result) => {
        return result.data.data;
      })
      .catch((error) => error);
  const aboutData = await fetchAboutData();

  const aboutNode = {
    id: createNodeId(`about-data`),
    parent: `__SOURCE__`,
    internal: {
      type: `AboutData`,
    },
    children: [],
    data: aboutData,
  };
  aboutNode.internal.contentDigest = createContentDigest(aboutNode);
  createNode(aboutNode);

  // Create Home Data node
  const fetchHomeData = () =>
    instance
      .get(`/home`)
      .then((result) => {
        return result.data.data;
      })
      .catch((error) => error);
  const homeData = await fetchHomeData();

  const homeNode = {
    id: createNodeId(`home-data`),
    parent: `__SOURCE__`,
    internal: {
      type: `HomeData`,
    },
    children: [],
    data: homeData,
  };
  homeNode.internal.contentDigest = createContentDigest(homeNode);
  createNode(homeNode);

  // Create Commercial Data node
  const fetchCommercialData = () =>
    instance
      .get(`/commercial`)
      .then((result) => {
        return result.data.data;
      })
      .catch((error) => error);
  const commercialData = await fetchCommercialData();

  const commercialNode = {
    id: createNodeId(`commercial-data`),
    parent: `__SOURCE__`,
    internal: {
      type: `CommercialData`,
    },
    children: [],
    data: commercialData,
  };
  commercialNode.internal.contentDigest = createContentDigest(commercialNode);
  createNode(commercialNode);

  // Create Site Setting Data node
  const fetchSiteSettingsData = () =>
    instance
      .get(`/siteSettings`)
      .then((result) => {
        return result.data.data;
      })
      .catch((error) => error);
  const siteSettingsData = await fetchSiteSettingsData();

  const siteSettingsNode = {
    id: createNodeId(`siteSettings-data`),
    parent: `__SOURCE__`,
    internal: {
      type: `SiteSettingsData`,
    },
    children: [],
    data: siteSettingsData,
  };
  siteSettingsNode.internal.contentDigest = createContentDigest(siteSettingsNode);
  createNode(siteSettingsNode);

  // Create Partner Data node
  const fetchPartnerData = () =>
    instance
      .get(`/partner`)
      .then((result) => {
        return result.data.data;
      })
      .catch((error) => error);
  const partnerData = await fetchPartnerData();

  const partnerNode = {
    id: createNodeId(`parnter-data`),
    parent: `__SOURCE__`,
    internal: {
      type: `PartnerData`,
    },
    children: [],
    data: partnerData,
  };
  partnerNode.internal.contentDigest = createContentDigest(partnerNode);
  createNode(partnerNode);


  return;
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /firebase/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
