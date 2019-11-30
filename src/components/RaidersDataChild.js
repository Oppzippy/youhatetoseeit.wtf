import React from "react";
import styled from "styled-components";
import { isEqual } from "lodash";
import AllRaiders from "./AllRaiders.js";
import MainContentBox from "./MainContentBox.js";

const Heading = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 40px;
`;

class RaidersDataChild extends React.Component {
  state = {
    streamers: new Set(),
    liveStreamers: new Set(),
  };

  constructor(props) {
    super(props);
    // TODO this is static so we don't have to worry about it right now,
    // but these should be updated when props change
    this.state.streamers = this.props.streamers;
    this.twitchClientId = this.props.twitchClientId;

    this.updateStreamers = this.updateStreamers.bind(this);
    this.updater = setInterval(this.updateStreamers, 5 * 60 * 1000); // 5 min
    this.updateStreamers();
  }

  componentWillUnmount() {
    clearInterval(this.updater);
  }

  updateStreamers() {
    // Don't show live indicator in static version
    if (
      !this.twitchClientId ||
      this.state.streamers.length === 0 ||
      typeof window === "undefined"
    ) {
      return;
    }
    const searchParams = new URLSearchParams();
    this.state.streamers.forEach(streamer =>
      searchParams.append("user_login", streamer)
    );
    fetch(`https://api.twitch.tv/helix/streams?${searchParams.toString()}`, {
      method: "GET",
      headers: {
        "Client-ID": this.twitchClientId,
      },
    })
      .then(resp => resp.json())
      .then(resp => {
        this.setState({
          liveStreamers: new Set(
            resp.data.map(stream => stream.user_name.toLowerCase())
          ),
        });
      })
      .catch(err => console.error(err));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.state, nextState); // || this.props !== nextProps;
  }

  render() {
    return (
      <MainContentBox>
        <Heading>Raiders</Heading>
        <AllRaiders liveStreamers={this.state.liveStreamers} />
      </MainContentBox>
    );
  }
}

export default RaidersDataChild;
