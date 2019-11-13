import React from "react";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";
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

const Icons = styled.div`
  width: 100%;
  display: flex;
  & > a {
    display: block;
    width: 20%;
    padding: 2%;
    & > img {
      width: 100%;
    }
  }
`;

const linkIcons = {
  twitch: twitchIcon,
};

class RaiderListing extends React.Component {
  renderLinks(links) {
    if (!links) {
      return;
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

  render() {
    const rank = this.props.rank;
    const { name, realm, thumbnail } = this.props.character;
    return (
      <div>
        <RaiderBox
          thumbnail={`https://render-us.worldofwarcraft.com/character/${thumbnail}`}
        >
          <RaiderChild>
            <Name classId={this.props.character.class}>{name}</Name>
            <Rank>{rank}</Rank>
          </RaiderChild>
        </RaiderBox>
        <Icons>
          <a
            href={`https://worldofwarcraft.com/en-us/character/us/${realm}/${name}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img src={wowIcon} alt="armory" />
          </a>
          {this.renderLinks(this.props.meta ? this.props.meta.links : null)}
        </Icons>
      </div>
    );
  }
}

export default RaiderListing;
