import React from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar.js";
import ApplyNow from "../components/ApplyNow.js";
import Raiders from "../components/Raiders.js";
import SnapContainer from "../components/SnapContainer.js";
import FullscreenVideoBackground from "../components/FullscreenVideoBackground.js";
import video from "../videos/background.mp4";
import "../components/Layout.css";

const FullscreenContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.about = React.createRef();
    this.raiders = React.createRef();
    this.scrollElements = [this.about, this.raiders];
  }
  render() {
    return (
      <>
        <FullscreenVideoBackground src={video} />
        <FullscreenContainer>
          <NavBar />
          <SnapContainer scrollElements={this.scrollElements}>
            <ApplyNow ref={this.about} />
            <Raiders ref={this.raiders} />
          </SnapContainer>
          <button onClick={() => this.log()}>log</button>
        </FullscreenContainer>
      </>
    );
  }
}

export default Index;
