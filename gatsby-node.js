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
const blizzard = require("blizzard.js");
const { createRemoteFileNode } = require("gatsby-source-filesystem");

require("dotenv").config();

const svgo = new SVGO();

exports.sourceNodes = async ({ actions, createNodeId, store, cache }) => {
  const wowClient = await blizzard.wow.createInstance({
    key: process.env.BLIZZARD_CLIENT_ID,
    secret: process.env.BLIZZARD_CLIENT_SECRET,
    origin: config.siteMetadata.guild.region,
    locale: config.siteMetadata.guild.locale,
  });
  const { createNode, createNodeField } = actions;
  // Fetch all guild memberse
  const guildInfo = config.siteMetadata.guild;
  const { data: guild } = await wowClient.guild({
    realm: guildInfo.realm.toLowerCase(),
    name: guildInfo.name.replace(/ /g, "-").toLowerCase(),
    resource: "roster",
  });
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
      const { data: characterMedia } = await wowClient.characterMedia({
        realm: member.character.realm.slug,
        name: member.character.name.toLowerCase(),
      });
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
