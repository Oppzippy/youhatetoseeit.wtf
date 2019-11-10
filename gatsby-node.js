/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const config = require("./gatsby-config.js");
const crypto = require("crypto");
const blizzardjs = require("blizzard.js");

require("dotenv").config();

const blizzard = blizzardjs.initialize({
  key: process.env.GATSBY_BLIZZARD_CLIENT_ID,
  secret: process.env.GATSBY_BLIZZARD_CLIENT_SECRET,
  origin: config.siteMetadata.guild.region,
  locale: config.siteMetadata.guild.locale,
});

exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators;
  const token = await blizzard.getApplicationToken();
  blizzard.defaults.token = token.data.access_token;
  const guild = await blizzard.wow.guild("members", {
    name: config.siteMetadata.guild.name,
    realm: config.siteMetadata.guild.realm,
  });
  guild.data.members.map((member, i) => {
    const memberNode = {
      id: `${i}`,
      parent: "__SOURCE__",
      internal: {
        type: "GuildMember",
      },
      children: [],
      ...member,
    };
    const contentDigest = crypto
      .createHash("md5")
      .update(JSON.stringify(memberNode))
      .digest("hex");
    memberNode.internal.contentDigest = contentDigest;
    createNode(memberNode);
  });
};
