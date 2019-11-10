import React from "react";
import styled from "styled-components";
import wowIcon from "../images/wow-icon.svg";

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
    & > img {
      width: 100%;
    }
  }
`;

class RaiderListing extends React.Component {
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
          >
            <img src={wowIcon} alt="armory" />
          </a>
        </Icons>
      </div>
    );
  }
}

export default RaiderListing;
