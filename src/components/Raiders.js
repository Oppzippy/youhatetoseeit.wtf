import React from "react";
import styled from "styled-components";
import AllRaiders from "./AllRaiders.js";
import FullscreenContainer from "./FullscreenContainer.js";
import MainContentBox from "./MainContentBox.js";

const Heading = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 40px;
`;

class Raiders extends React.Component {
  render() {
    return (
      <FullscreenContainer>
        <MainContentBox>
          <Heading>Raiders</Heading>
          <AllRaiders />
        </MainContentBox>
      </FullscreenContainer>
    );
  }
}

export default Raiders;
