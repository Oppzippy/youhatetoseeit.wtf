module.exports = {
  siteMetadata: {
    title: `You Hate to See It`,
    description: `World of Warcraft mythic raiding guild on Illidan (US)`,
    guild: {
      name: `You Hate to See It`,
      realm: `illidan`,
      region: `us`,
      locale: `en_US`,
      raiderRanks: [
        0, // Guild Master
        1, // Officer
        3, // Raider
      ],
    },
    text: {
      apply: `Apply Now`,
      raidTimes: `Raid times: 9:30pm-12:30pm CST (server time) on Wednesday and Thursday`,
    },
    links: {
      apply: "https://docs.google.com/forms/d/e/1FAIpQLSfvQmGjAEiFuBvi_W29CLIRftVVO81zG3yrebEnXdSHYSZrPw/viewform"
    },
    nav: {
      internal: [
        {
          text: "Home",
          to: "/",
        },
        {
          text: "Our Raiders",
          to: "/raiders",
        },
      ],
      external: [
        {
          text: "Discord",
          href: "https://discordapp.com/invite/6VaqFJw",
        },
        {
          text: "WoWProgress",
          href: "https://www.wowprogress.com/guild/us/illidan/You+Hate+to+See+It",
        },
        {
          text: "Raider.IO",
          href: "https://raider.io/guilds/us/illidan/You%20Hate%20to%20See%20It",
        },
      ],
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-styled-components`,
  ],
};
