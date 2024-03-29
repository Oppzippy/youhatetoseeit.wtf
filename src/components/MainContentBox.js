// Libraries
import React from "react";
import styled from "styled-components";

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
  min-height: 200px;
  background-color: var(--bg-color-dark-transparent);
  border-radius: 10px;
  padding: 3rem;
  margin: 3rem;
  @media (max-width: 800px) {
    width: 100%;
    margin: 0;
    border-radius: 0;
  }
  @media (max-width: 650px) {
    height: 100%;
  }
`;

class MainContentBox extends React.Component {
  render() {
    return <ContentBox>{this.props.children}</ContentBox>;
  }
}

export default MainContentBox;
