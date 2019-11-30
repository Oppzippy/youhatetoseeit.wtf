import React from "react";
import { graphql, StaticQuery } from "gatsby";
import RaidersDataChild from "./RaidersDataChild.js";

class Raiders extends React.Component {
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
              }
            }
            cockpitApiKeys {
              twitch_client_id {
                value
              }
            }
          }
        `}
        render={data => {
          const streamers = new Set(
            data.allCockpitRaiderMeta.nodes.map(node => node.twitch.value)
          );
          const clientId = data.cockpitApiKeys.twitch_client_id.value;
          return (
            <RaidersDataChild streamers={streamers} twitchClientId={clientId} />
          );
        }}
      />
    );
  }
}

export default Raiders;
