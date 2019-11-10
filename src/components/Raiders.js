import React from "react";
import styled from "styled-components";
import AllRaiders from "./AllRaiders.js";

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  height: 100vh;
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  height: 100%;
  padding: 40px;
  background-color: var(--bg-color-dark-transparent);
  border-radius: 5px;
`;

const Heading = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 20px;
`;

class Raiders extends React.Component {
  render() {
    return (
      <Background>
        <Container>
          <Heading>Raiders</Heading>
          <AllRaiders />
        </Container>
      </Background>
    );
  }
}

export default Raiders;
