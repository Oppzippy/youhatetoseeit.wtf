import React from "react";
import styled from "styled-components";
import { StreamerConsumer } from "../providers/StreamerProvider.js";
import ClassColor from "./ClassColor.js";
import wowIcon from "../images/wow-icon.svg";
import twitchIcon from "../images/twitch-logo.svg";

const RaiderBox = styled.div`
  position: relative;
  width: 100%;
  border-radius: 8px;
  padding: 8px;
  background-image: linear-gradient(
      to bottom,
      var(--bg-color-dark) -50%,
      transparent
    ),
    url(${props => props.thumbnail});
  background-size: cover;
  &::before {
    content: "";
    display: block;
    padding-top: 100%;
  }
`;

const RaiderChild = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
`;

const Name = styled.div`
  font-weight: 600;
  color: var(${props => `--class-color-${props.classId}`});
`;

const Rank = styled.div``;

const LiveIndicator = styled.div`
  position: absolute;
  bottom: 7px;
  right: 10px;
  background-color: var(--bg-color-notify-transparent);
  padding: 2px;
  border-radius: 2px;
  text-transform: uppercase;
`;

const Icons = styled.div`
  width: 100%;
  display: flex;
  & > a {
    display: block;
    width: 25%;
    padding: 2.5%;
    & > img {
      width: 100%;
    }
  }
`;

const linkIcons = {
  twitch: twitchIcon,
};

class RaiderListing extends React.Component {
  renderLinks() {
    const meta = this.props.meta;
    if (!meta) {
      return;
    }
    const links = [];
    if (meta.twitch) {
      links.push({
        type: "twitch",
        href: `https://www.twitch.tv/${meta.twitch}`,
      });
    }
    return links.map(link => {
      const icon = linkIcons[link.type];
      if (icon) {
        return (
          <a
            href={link.href}
            rel="noopener noreferrer"
            target="_blank"
            key={link.type}
          >
            <img src={icon} alt={link.type} />
          </a>
        );
      } else {
        throw new Error(`Icon type ${link.type} does not exist.`);
      }
    });
  }

  renderLiveIndicator() {
    return (
      <StreamerConsumer>
        {({ liveStreamers }) => {
          const meta = this.props.meta;
          if (
            meta &&
            meta.twitch &&
            liveStreamers.has(meta.twitch.toLowerCase())
          ) {
            return <LiveIndicator>Live</LiveIndicator>;
          }
        }}
      </StreamerConsumer>
    );
  }

  render() {
    const rank = this.props.rank;
    const memberInfo = this.props.memberInfo;
    const character = memberInfo.character;
    return (
      <div>
        <RaiderBox thumbnail={memberInfo.thumbnail.publicURL}>
          <RaiderChild>
            <Name>
              <ClassColor classId={character.class}>
                {character.name}
              </ClassColor>
            </Name>
            <Rank>{rank}</Rank>
            {this.renderLiveIndicator()}
          </RaiderChild>
        </RaiderBox>
        <Icons>
          <a
            href={`https://worldofwarcraft.com/en-us/character/us/${character.realm}/${character.name}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img src={wowIcon} alt="armory" />
          </a>
          {this.renderLinks()}
        </Icons>
      </div>
    );
  }
}

export default RaiderListing;
