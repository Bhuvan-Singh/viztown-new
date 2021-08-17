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
  ],
  pathPrefix: `/viztown-2.0`,

};
