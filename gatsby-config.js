require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});
module.exports = {
    siteMetadata: {
        siteUrl: "https://www.viztown.in",
        title: "Viztown | India’s leading PropTech solution",
        description: "India’s leading PropTech solution",
        author: "Viztown.in",
        keywords: [""],
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
        "gatsby-plugin-layout",
        "gatsby-transformer-sharp",
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: "Viztown",
                short_name: "Viztown",
                start_url: "/",
                background_color: "#222222",
                theme_color: "#FFCA18",
                // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
                // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
                display: "standalone",
                icon: "src/images/icon.png", // This path is relative to the root of the site.
                // An optional attribute which provides support for CORS check.
                // If you do not provide a crossOrigin option, it will skip CORS for manifest.
                // Any invalid keyword or empty string defaults to `anonymous`
            },
        },
        // VIZTOWN STAGING CONFIG
        // {
        //     resolve: `gatsby-plugin-s3`,
        //     options: {
        //         bucketName: "viztown.in",
        //         protocol: "https",
        //         hostname: "d26v9rwrlzb8dk.cloudfront.net",
        //     },
        // },
        // VIZTOWN LIVE CONFIG
        {
            resolve: `gatsby-plugin-s3`,
            options: {
                bucketName: "viztown-new",
                protocol: "http",
                hostname: "d9atkksuig18l.cloudfront.net",
            },
        },
    ],
    pathPrefix: `/viztown-2.0`,
};
