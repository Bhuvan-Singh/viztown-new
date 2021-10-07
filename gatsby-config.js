require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "Viztown",
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-gatsby-cloud",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-responsive-iframe`],
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: "viztown-new",
        // protocol: "http",
        // hostname: "d9j6gbeskclhl.cloudfront.net",
      },
    },
    "gatsby-plugin-layout"
  ],
  pathPrefix: `/stagingsetup`,

};


