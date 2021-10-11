require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
module.exports = {
  siteMetadata: {
    siteUrl: "https://www.viztown.in",
    title: "Viztown",
    description: ""
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-image",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-responsive-iframe`],
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          quality: 100,
          formats: ["auto", "webp", "avif"],
          placeholder: "blurred",
        },
      },
    },
    // VIZTOWN STAGING CONFIG
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: "viztown.in",
        protocol: "https",
        hostname: "d26v9rwrlzb8dk.cloudfront.net",
      },
    },
    // VIZTOWN LIVE CONFIG
    // {
    //   resolve: `gatsby-plugin-s3`,
    //   options: {
    //     bucketName: "viztown-new",
    //     protocol: "http",
    //     hostname: "d9atkksuig18l.cloudfront.net",
    //   },
    // },
    "gatsby-plugin-layout",
    "gatsby-transformer-sharp",
  ],
  pathPrefix: `/stagingsetup`,
};
