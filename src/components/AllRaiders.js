// Libraries
import React from "react";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";
// Helpers
import "../polyfill/object-fromEntries";
// Components
import RaiderListing from "components/RaiderListing";
import { RaiderProvider, RaiderContext } from "providers/RaiderProvider";

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
  renderRaiders(raiderMetadata) {
    // Arrays to objects for O(1) lookup
    // keys are ${name}${realm} all lowercase
    const raiderMetadataByName = Object.fromEntries(
      raiderMetadata.map(meta => [
        meta.name.toLowerCase() + meta.realm.toLowerCase(),
        meta,
      ])
    );

    return (
      <RaiderContext.Consumer>
        {raiders => {
          return raiders.map((raider, i) => {
            const nameIndex =
              raider.character.name.toLowerCase() +
              raider.character.realm.toLowerCase();
            return (
              <RaiderListing
                key={i}
                rank={raider.rankName}
                memberInfo={raider}
                meta={raiderMetadataByName[nameIndex]}
              />
            );
          });
        }}
      </RaiderContext.Consumer>
    );
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
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
          }
        `}
        render={data => {
          const raiderMeta = data.allCockpitRaiderMeta.nodes.map(node => {
            return {
              name: node.name.value,
              realm: node.realm.value,
              twitch: node.twitch.value,
            };
          });

          return (
            <RaiderProvider>
              <RaiderGrid>{this.renderRaiders(raiderMeta)}</RaiderGrid>
            </RaiderProvider>
          );
        }}
      />
    );
  }
}

export default AllRaiders;
