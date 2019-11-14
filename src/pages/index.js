import React from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar.js";
import ApplyNow from "../components/ApplyNow.js";
import Raiders from "../components/Raiders.js";
import { SnapContainer, SnapChild } from "../components/SnapContainer.js";
import FullscreenVideoBackground from "../components/FullscreenVideoBackground.js";
import video from "../videos/background.mp4";
import "../components/Layout.css";

const FullscreenContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Section = styled(SnapChild)`
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class Index extends React.Component {
  render() {
    return (
      <>
        <FullscreenVideoBackground src={video} />
        <FullscreenContainer>
          <NavBar />
          <SnapContainer>
            <Section>
              <ApplyNow ref={this.about} />
            </Section>
            <Section>
              <Raiders ref={this.raiders} />
            </Section>
          </SnapContainer>
        </FullscreenContainer>
      </>
    );
  }
}

export default Index;
