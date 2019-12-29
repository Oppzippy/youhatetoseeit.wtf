import "../polyfill/object-fromEntries";
import React from "react";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";
import RaiderListing from "./RaiderListing";

const RaiderGrid = styled.div`
  width: 75vw;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  column-gap: 1vw;
  row-gap: 6px;
  @media (max-width: 1400px) {
    grid-template-columns: repeat(8, 1fr);
  }
  @media (max-width: 1200px) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

class AllRaiders extends React.Component {
  renderRaiders(members, raiderRanks, raiderMetadata) {
    // Arrays to objects for O(1) lookup
    const ranksById = Object.fromEntries(
      raiderRanks.map(rank => [rank.id, rank.name])
    );
    // keys are ${name}${realm} all lowercase
    const raiderMetadataByName = Object.fromEntries(
      raiderMetadata.map(meta => [
        meta.name.toLowerCase() + meta.realm.toLowerCase(),
        meta,
      ])
    );

    const raiders = members
      .filter(member => {
        // TODO see about moving this to the graphql query if possible
        return ranksById[member.rank];
      })
      .map((member, i) => {
        const memberRank = ranksById[member.rank];
        const nameIndex =
          member.character.name.toLowerCase() +
          member.character.realm.toLowerCase();
        return (
          <RaiderListing
            key={i}
            rank={memberRank}
            memberInfo={member}
            meta={raiderMetadataByName[nameIndex]}
          />
        );
      });
    return raiders;
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            allCockpitRaiders {
              nodes {
                rank {
                  value {
                    rank_id {
                      value
                    }
                    name {
                      value
                    }
                  }
                }
              }
            }
            allCockpitRaiderMeta {
              nodes {
                twitch {
                  value
                }
                realm {
                  value
                }
                name {
                  value
                }
              }
            }
            allGuildMember(
              sort: { fields: [rank, character___name], order: ASC }
            ) {
              nodes {
                character {
                  name
                  realm
                  class
                }
                rank
                thumbnail {
                  publicURL
                }
              }
            }
          }
        `}
        render={data => {
          const raiderRanks = data.allCockpitRaiders.nodes.map(node => {
            return {
              id: node.rank.value.rank_id.value,
              name: node.rank.value.name.value,
            };
          });

          const raiderMeta = data.allCockpitRaiderMeta.nodes.map(node => {
            return {
              name: node.name.value,
              realm: node.realm.value,
              twitch: node.twitch.value,
            };
          });

          return (
            <RaiderGrid>
              {this.renderRaiders(
                data.allGuildMember.nodes,
                raiderRanks,
                raiderMeta
              )}
            </RaiderGrid>
          );
        }}
      />
    );
  }
}

export default AllRaiders;
