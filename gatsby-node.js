const path = require('path');

exports.createPages = async ({ graphql, actions }) =>  {
    const propertyListings = [
        {
            id: 1,
            slug: "101-indian-road",
        },
        {
            id: 2,
            slug: "102-indian-road",
        },
        {
            id: 3,
            slug: "103-indian-road",
        },
        {
            id: 4,
            slug: "104-indian-road",
        },
    ]

    propertyListings.map((property,index) => {
        actions.createPage({
            path: '/showcase/' + property.slug,
            component: path.resolve('./src/templates/property-details.js'),
            context: {slug: property.slug, id: index}
        })
        actions.createPage({
            path: '/' + property.slug,
            component: path.resolve('./src/templates/property-details-full.js'),
            context: {slug: property.slug, id: index}
        })
        actions.createPage({
            path: '/showcase/' + property.slug + '/actual-site',
            component: path.resolve('./src/templates/actual-site.js'),
            context: {slug: property.slug, id: index}
        })
        actions.createPage({
            path: '/showcase/' + property.slug + '/fitout-interior',
            component: path.resolve('./src/templates/fitout-interior.js'),
            context: {slug: property.slug, id: index}
        })
        actions.createPage({
            path: '/showcase/' + property.slug + '/space-calculator',
            component: path.resolve('./src/templates/space-calculator.js'),
            context: {slug: property.slug, id: index}
        })
        actions.createPage({
            path: '/' + property.slug + '/actual-site',
            component: path.resolve('./src/templates/actual-site-full.js'),
            context: {slug: property.slug, id: index}
        })
        actions.createPage({
            path: '/' + property.slug + '/fitout-interior',
            component: path.resolve('./src/templates/fitout-interior-full.js'),
            context: {slug: property.slug, id: index}
        })
        actions.createPage({
            path: '/' + property.slug + '/space-calculator',
            component: path.resolve('./src/templates/space-calculator-full.js'),
            context: {slug: property.slug, id: index}
        })
        actions.createPage({
            path: '/showcase/' + property.slug + '/fitout-interior/floor-layout',
            component: path.resolve('./src/templates/floor-layout.js'),
            context: {slug: property.slug, id: index}
        })
        actions.createPage({
            path: '/showcase/' + property.slug + '/fitout-interior/3d-renders',
            component: path.resolve('./src/templates/3d-renders.js'),
            context: {slug: property.slug, id: index}
        })
        actions.createPage({
            path: '/showcase/' + property.slug + '/fitout-interior/3d-tour',
            component: path.resolve('./src/templates/3d-tour.js'),
            context: {slug: property.slug, id: index}
        })
        actions.createPage({
            path: '/' + property.slug + '/fitout-interior/floor-layout',
            component: path.resolve('./src/templates/floor-layout-full.js'),
            context: {slug: property.slug, id: index}
        })
        actions.createPage({
            path: '/' + property.slug + '/fitout-interior/3d-renders',
            component: path.resolve('./src/templates/3d-renders-full.js'),
            context: {slug: property.slug, id: index}
        })
        actions.createPage({
            path: '/' + property.slug + '/fitout-interior/3d-tour',
            component: path.resolve('./src/templates/3d-tour-full.js'),
            context: {slug: property.slug, id: index}
        })
    })
}