/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const config = require("./gatsby-config.js");
const crypto = require("crypto");
const blizzardjs = require("blizzard.js");
const { createRemoteFileNode } = require("gatsby-source-filesystem");

require("dotenv").config();

const blizzard = blizzardjs.initialize({
  key: process.env.BLIZZARD_CLIENT_ID,
  secret: process.env.BLIZZARD_CLIENT_SECRET,
  origin: config.siteMetadata.guild.region,
  locale: config.siteMetadata.guild.locale,
});

const rendererUrl = `https://render-${config.siteMetadata.guild.region}.worldofwarcraft.com/character`;

exports.sourceNodes = async ({ actions, createNodeId, store, cache }) => {
  const { createNode, createNodeField } = actions;
  const token = await blizzard.getApplicationToken();
  blizzard.defaults.token = token.data.access_token;
  const guild = await blizzard.wow.guild("members", {
    name: config.siteMetadata.guild.name,
    realm: config.siteMetadata.guild.realm,
  });
  const promises = guild.data.members.map(async (member, i) => {
    const id = createNodeId(
      `GuildMembers__${member.character.name}-${member.character.realm}`
    );

    let thumbnailNode;
    try {
      thumbnailNode = await createRemoteFileNode({
        url: `${rendererUrl}/${member.character.thumbnail}`,
        store,
        cache,
        createNode,
        createNodeId,
      });
    } catch (err) {
      console.error(
        `Error fetching ${member.character.name}-${member.character.realm}\n${err}`
      );
    }
    const memberNodeInfo = {
      id: id,
      parent: null,
      internal: {
        type: "GuildMember",
      },
      children: [],
      thumbnail___NODE: thumbnailNode ? thumbnailNode.id : null,
      ...member,
    };

    memberNodeInfo.internal.contentDigest = crypto
      .createHash("md5")
      .update(JSON.stringify(memberNodeInfo))
      .digest("hex");
    const memberNode = await createNode(memberNodeInfo);
  });
  await Promise.allSettled(promises);
};
