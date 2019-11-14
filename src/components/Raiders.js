import React from "react";
import styled from "styled-components";
import AllRaiders from "./AllRaiders.js";
import MainContentBox from "./MainContentBox.js";

const Heading = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 40px;
`;

class Raiders extends React.Component {
  render() {
    return (
      <MainContentBox>
        <Heading>Raiders</Heading>
        <AllRaiders />
      </MainContentBox>
    );
  }
}

export default Raiders;
