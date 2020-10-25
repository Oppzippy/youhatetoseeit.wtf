/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const config = require("./gatsby-config.js");
const fs = require("fs");
const SVGO = require("svgo");
const crypto = require("crypto");
const BattleNetWrapper = require("battlenet-api-wrapper");
const { createRemoteFileNode } = require("gatsby-source-filesystem");

require("dotenv").config();

const svgo = new SVGO();

const battlenet = new BattleNetWrapper();

// {
//   clientId: process.env.BLIZZARD_CLIENT_ID,
//   clientSecret: process.env.BLIZZARD_CLIENT_SECRET,
//   region: config.siteMetadata.guild.region,
// }

exports.sourceNodes = async ({ actions, createNodeId, store, cache }) => {
  await battlenet.init(
    process.env.BLIZZARD_CLIENT_ID,
    process.env.BLIZZARD_CLIENT_SECRET
  );
  const { createNode, createNodeField } = actions;
  // Fetch all guild memberse
  const guildInfo = config.siteMetadata.guild;
  const guild = await battlenet.WowProfileData.getGuildRoster(
    guildInfo.realm.toLowerCase(),
    guildInfo.name.replace(/ /g, "-").toLowerCase()
  );
  // Fetch guild member thumbnails
  const promises = guild.members.map(async (member, i) => {
    if (member.character.level < 50) {
      return;
    }
    const id = createNodeId(
      `GuildMembers__${member.character.name}-${member.character.realm.slug}`
    );

    let thumbnailNode;
    try {
      const characterMedia = await battlenet.WowProfileData.getCharacterMedia(
        member.character.realm.slug,
        member.character.name.toLowerCase()
      );
      if (characterMedia?.assets) {
        thumbnailNode = await createRemoteFileNode({
          url: characterMedia.assets.find((asset) => asset.key === "inset")
            .value,
          store,
          cache,
          createNode,
          createNodeId,
        });
      }
    } catch (err) {
      console.error(
        `Error fetching ${member.character.name}-${member.character.realm.slug}\n${err}`
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
      realm: member.character.realm.slug,
      character: {
        ...member.character,
        class: member.character.playable_class.id,
      },
    };

    memberNodeInfo.internal.contentDigest = crypto
      .createHash("md5")
      .update(JSON.stringify(memberNodeInfo))
      .digest("hex");
    const memberNode = await createNode(memberNodeInfo);
  });
  await Promise.allSettled(promises);
};

// Put content of svgs in graphql for inlining
exports.onCreateNode = async ({ node }) => {
  if (node.internal.owner === "gatsby-source-filesystem") {
    if (node.internal.mediaType === "image/svg+xml") {
      const content = fs.readFileSync(node.absolutePath);
      const svg = await svgo.optimize(content.toString());
      node.fileContent = svg.data;
    }
  }
};
