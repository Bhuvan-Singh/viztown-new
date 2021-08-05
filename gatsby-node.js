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
    })
}