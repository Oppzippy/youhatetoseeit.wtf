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
        5, // Trial
      ],
      ranks: [
        {
          id: 0,
          name: `Guild Master`,
        },
        {
          id: 1,
          name: `Officer`,
        },
        {
          id: 2,
          name: `Officer Alt`,
        },
        {
          id: 3,
          name: `Raider`,
        },
        {
          id: 4,
          name: `Veteran`,
        },
        {
          id: 5,
          name: `Trial`,
        },
        {
          id: 6,
          name: `Alt`,
        },
        {
          id: 7,
          name: `Member`,
        },
        {
          id: 8,
          name: `Initiate`,
        },
      ],
      memberMetadata: [
        {
          name: `Oppyspark`,
          links: [
            {
              type: `twitch`,
              href: `https://www.twitch.tv/oppzippy`,
            },
          ],
        },
        {
          name: `Coüch`,
          links: [
            {
              type: `twitch`,
              href: `https://www.twitch.tv/couchhxd`,
            },
          ],
        },
        {
          name: `Theology`,
          links: [
            {
              type: `twitch`,
              href: `https://www.twitch.tv/theology`,
            },
          ],
        },
      ],
    },
    text: {
      apply: `Apply Now`,
      raidTimes: `Raid times: 9:30pm-12:30pm CST (server time) on Wednesday and Thursday`,
    },
    links: {
      apply:
        "https://docs.google.com/forms/d/e/1FAIpQLSfvQmGjAEiFuBvi_W29CLIRftVVO81zG3yrebEnXdSHYSZrPw/viewform",
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
          href:
            "https://www.wowprogress.com/guild/us/illidan/You+Hate+to+See+It",
        },
        {
          text: "Raider.IO",
          href:
            "https://raider.io/guilds/us/illidan/You%20Hate%20to%20See%20It",
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
    `gatsby-plugin-styled-components`,
  ],
};
