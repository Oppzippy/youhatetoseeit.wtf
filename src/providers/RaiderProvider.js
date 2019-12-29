import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const RaiderContext = React.createContext();

const RaiderProvider = props => {
  const data = useStaticQuery(graphql`
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
      allGuildMember(sort: { fields: [rank, character___name], order: ASC }) {
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
  `);
  const members = data.allGuildMember.nodes;

  const raiderRanks = data.allCockpitRaiders.nodes.map(node => {
    return {
      id: node.rank.value.rank_id.value,
      name: node.rank.value.name.value,
    };
  });

  const ranksById = Object.fromEntries(
    raiderRanks.map(rank => [rank.id, rank.name])
  );

  const raiders = members
    .filter(member => ranksById[member.rank]) // raiders only
    .map(member => {
      const rank = ranksById[member.rank];
      return {
        ...member,
        rankName: rank,
      };
    });
  return (
    <RaiderContext.Provider value={raiders}>
      {props.children}
    </RaiderContext.Provider>
  );
};

export { RaiderContext, RaiderProvider };
