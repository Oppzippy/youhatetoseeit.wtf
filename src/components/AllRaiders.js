import "../polyfill/object-fromEntries.js";
import React from "react";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";
import RaiderListing from "./RaiderListing.js";

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
  renderRaiders(members, { ranks, raiderRanks, memberMetadata }) {
    // Arrays to objects for O(1) lookup
    const ranksById = Object.fromEntries(
      ranks.map(rank => [rank.id, rank.name])
    );
    const memberMetadataByName = Object.fromEntries(
      memberMetadata.map(meta => [meta.name, meta])
    );

    const raiders = members
      .filter(member => {
        // TODO see about moving this to the graphql query
        return raiderRanks.includes(member.rank);
      })
      .map((member, i) => {
        const memberRank = ranksById[member.rank];
        return (
          <RaiderListing
            key={i}
            rank={memberRank}
            character={member.character}
            meta={memberMetadataByName[member.character.name]}
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
            allSite {
              nodes {
                siteMetadata {
                  guild {
                    raiderRanks
                    ranks {
                      id
                      name
                    }
                    memberMetadata {
                      name
                      links {
                        type
                        href
                      }
                    }
                  }
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
                  thumbnail
                }
                rank
              }
            }
          }
        `}
        render={data => {
          return (
            <RaiderGrid>
              {this.renderRaiders(
                data.allGuildMember.nodes,
                data.allSite.nodes[0].siteMetadata.guild
              )}
            </RaiderGrid>
          );
        }}
      />
    );
  }
}

export default AllRaiders;
