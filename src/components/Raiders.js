import React from "react";
import { graphql, StaticQuery } from "gatsby";
import styled from "styled-components";
import AllRaiders from "./AllRaiders";
import { StreamerProvider } from "../providers/StreamerProvider";
import MainContentBox from "./MainContentBox";

const Heading = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 40px;
`;

class Raiders extends React.Component {
  render() {
    return (
      <MainContentBox>
        <Heading>Raiders</Heading>
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
              <StreamerProvider streamers={streamers} twitchClientId={clientId}>
                <AllRaiders />
              </StreamerProvider>
            );
          }}
        />
      </MainContentBox>
    );
  }
}

export default Raiders;
