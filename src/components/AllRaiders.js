import React from "react";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";
import RaiderListing from "./RaiderListing.js";

const RaiderGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  column-gap: 6px;
  row-gap: 6px;
`;

class AllRaiders extends React.Component {
  renderRaiders(members, { ranks, raiderRanks }) {
    const rankNames = Object.fromEntries(
      ranks.map(rank => [rank.id, rank.name])
    );
    const raiders = [];
    members
      .filter(member => {
        return raiderRanks.includes(member.rank);
      })
      .sort((a, b) => {
        // Order rank from gm to initiate. Sort by name for same rank.
        return a.rank !== b.rank
          ? a.rank > b.rank
          : a.character.name > b.character.name;
      })
      .forEach(member => {
        const memberRank = rankNames[member.rank];
        raiders.push(
          <RaiderListing
            key={`${member.character.thumbnail}`} // will be unique so this works
            rank={memberRank}
            character={member.character}
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
                  }
                }
              }
            }
            allGuildMember {
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
