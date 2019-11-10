import React from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar.js";
import ApplyNow from "../components/ApplyNow.js";
import Raiders from "../components/Raiders.js";
import FullscreenVideoBackground from "../components/FullscreenVideoBackground.js";
import video from "../videos/background.mp4";
import "../components/Layout.css";

const FullscreenContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const SnapContainer = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  & > * {
    scroll-snap-align: start;
    position: relative;
  }
`;

class Index extends React.Component {
  render() {
    return (
      <>
        <FullscreenVideoBackground src={video} />
        <FullscreenContainer>
          <NavBar />
          <SnapContainer>
            <ApplyNow />
            <Raiders />
          </SnapContainer>
        </FullscreenContainer>
      </>
    );
  }
}

export default Index;
