// Libraries
import React from "react";
import { isEqual } from "lodash";

const StreamerContext = React.createContext();

class StreamerProvider extends React.Component {
  state = {
    streamers: new Set(),
    liveStreamers: new Set(),
  };

  constructor(props) {
    super(props);
    // TODO this is static so we don't have to worry about it right now,
    // but it should be updated when props change
    this.state.streamers = this.props.streamers;

    // Disabled until we figure out what's going on with the twich api
    // this.updateStreamers = this.updateStreamers.bind(this);
    // this.updater = setInterval(this.updateStreamers, 5 * 60 * 1000); // 5 min
    // this.updateStreamers();
  }

  componentWillUnmount() {
    clearInterval(this.updater);
  }

  updateStreamers() {
    // Don't check if live in static version
    if (
      !this.props.twitchClientId ||
      this.state.streamers.length === 0 ||
      typeof window === "undefined"
    ) {
      return;
    }
    const searchParams = new URLSearchParams();
    this.state.streamers.forEach(streamer =>
      searchParams.append("user_login", streamer)
    );
    // TODO there's some limit to the number of streamers per query
    fetch(`https://api.twitch.tv/helix/streams?${searchParams.toString()}`, {
      method: "GET",
      headers: {
        "Client-ID": this.props.twitchClientId,
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
    return !isEqual(this.state, nextState);
  }

  render() {
    return (
      <StreamerContext.Provider value={this.state}>
        {this.props.children}
      </StreamerContext.Provider>
    );
  }
}

const StreamerConsumer = StreamerContext.Consumer;
export { StreamerProvider, StreamerConsumer };
