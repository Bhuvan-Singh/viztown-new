const path = require('path');
const axios = require('axios')

const instance = axios.create({
    baseURL: process.env.API_URL
});
// Where you would set stuff like your 'Authorization' header, etc ...
instance.defaults.headers.common['Authorization'] = process.env.AUTHORIZATION_KEY;
instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Accept'] = 'application/json';



exports.createPages = async ({ graphql, actions, reporter }) =>  {
    const propertyListings = await instance.get('/allListings')
    .then((response)=>{
        console.log(response.data)
        return response.data.data
    })
    .catch((error) => {
        console.log(error)
    })

    if (propertyListings.errors) {
        reporter.panic("Error loading characters!", reporter.errors)
    }

    propertyListings.map((property,index) => {
        actions.createPage({
            path: '/showcase/' + property.slug,
            component: path.resolve('./src/templates/property-details.js'),
            context: {slug: property.slug, id: property.id}
        })
        actions.createPage({
            path: '/' + property.slug,
            component: path.resolve('./src/templates/property-details-full.js'),
            context: {slug: property.slug, id: property.id}
        })
        actions.createPage({
            path: '/showcase/' + property.slug + '/actual-site',
            component: path.resolve('./src/templates/actual-site.js'),
            context: {slug: property.slug, id: property.id}
        })
        actions.createPage({
            path: '/showcase/' + property.slug + '/fitout-interior',
            component: path.resolve('./src/templates/fitout-interior.js'),
            context: {slug: property.slug, id: property.id}
        })
        actions.createPage({
            path: '/showcase/' + property.slug + '/space-calculator',
            component: path.resolve('./src/templates/space-calculator.js'),
            context: {slug: property.slug, id: property.id}
        })
        actions.createPage({
            path: '/' + property.slug + '/actual-site',
            component: path.resolve('./src/templates/actual-site-full.js'),
            context: {slug: property.slug, id: property.id}
        })
        actions.createPage({
            path: '/' + property.slug + '/fitout-interior',
            component: path.resolve('./src/templates/fitout-interior-full.js'),
            context: {slug: property.slug, id: property.id}
        })
        actions.createPage({
            path: '/' + property.slug + '/space-calculator',
            component: path.resolve('./src/templates/space-calculator-full.js'),
            context: {slug: property.slug, id: property.id}
        })
        actions.createPage({
            path: '/showcase/' + property.slug + '/fitout-interior/floor-layout',
            component: path.resolve('./src/templates/floor-layout.js'),
            context: {slug: property.slug, id: property.id}
        })
        actions.createPage({
            path: '/showcase/' + property.slug + '/fitout-interior/3d-renders',
            component: path.resolve('./src/templates/3d-renders.js'),
            context: {slug: property.slug, id: property.id}
        })
        actions.createPage({
            path: '/showcase/' + property.slug + '/fitout-interior/3d-tour',
            component: path.resolve('./src/templates/3d-tour.js'),
            context: {slug: property.slug, id: property.id}
        })
        actions.createPage({
            path: '/' + property.slug + '/fitout-interior/floor-layout',
            component: path.resolve('./src/templates/floor-layout-full.js'),
            context: {slug: property.slug, id: property.id}
        })
        actions.createPage({
            path: '/' + property.slug + '/fitout-interior/3d-renders',
            component: path.resolve('./src/templates/3d-renders-full.js'),
            context: {slug: property.slug, id: property.id}
        })
        actions.createPage({
            path: '/' + property.slug + '/fitout-interior/3d-tour',
            component: path.resolve('./src/templates/3d-tour-full.js'),
            context: {slug: property.slug, id: property.id}
        })
    })
}

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
      })
    }
  }