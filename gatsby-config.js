require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `You Hate to See It`,
    description: `World of Warcraft mythic raiding guild on Illidan (US)`,
    cmsUrl: `https://cms.youhatetoseeit.wtf`,
    guild: {
      name: `You Hate to See It`,
      realm: `Illidan`,
      region: `us`,
      locale: `en_US`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-polyfill-io`,
      options: {
        features: [`Array.prototype.flat`, `Object.fromEntries`],
      },
    },
    `gatsby-alias-imports`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {},
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-optimize-svgs`,
    {
      resolve: `@fika/gatsby-source-cockpit`,
      options: {
        token: process.env.COCKPIT_API_TOKEN,
        baseUrl: `https://cms.youhatetoseeit.wtf`,
        locales: [],
        collections: [],
        singletons: [],
      },
    },
  ],
};
