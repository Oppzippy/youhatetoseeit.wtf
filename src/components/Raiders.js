import React from "react";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";
import blizzardjs from "blizzard.js";
import Raider from "./Raider.js";

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-image: linear-gradient(
    to bottom,
    var(--bg-color-dark),
    darkblue 500px
  );
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  height: 400px;
  padding: 20px;
  background-color: grey;
`;

const RaiderGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 6px;
  row-gap: 6px;
`;

class Raiders extends React.Component {
  renderRaiders(members, ranks) {
    const raiders = [];
    members
      .filter(member => {
        return ranks.includes(member.rank);
      })
      .forEach(member => {
        raiders.push(
          <Raider rank={member.rank} character={member.character} />
        );
      });
    return raiders;
  }

  render() {
    return (
      <Background>
        <Container>
          <h2>Raiders</h2>
          <StaticQuery
            query={graphql`
              query {
                allSite {
                  nodes {
                    siteMetadata {
                      guild {
                        raiderRanks
                      }
                    }
                  }
                }
                allGuildMember {
                  nodes {
                    character {
                      name
                      realm
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
                    data.allSite.nodes[0].siteMetadata.guild.raiderRanks,
                  )}
                </RaiderGrid>
              );
            }}
          />
        </Container>
      </Background>
    );
  }
}

export default Raiders;
