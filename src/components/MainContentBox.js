import React from "react";
import styled from "styled-components";

const ContentBox = styled.main`
  min-width: 200px;
  min-height: 200px;
  background-color: var(--bg-color-dark-transparent);
  border-radius: 10px;
  padding: 3rem;
  & > :not(:last-child) {
    margin-bottom: 5px;
  }
  @media (max-width: 800px) {
    width: 100%;
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
