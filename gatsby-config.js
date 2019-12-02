require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `You Hate to See It`,
    description: `World of Warcraft mythic raiding guild on Illidan (US)`,
    guild: {
      name: `You Hate to See It`,
      realm: `Illidan`,
      region: `us`,
      locale: `en_US`,
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
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
