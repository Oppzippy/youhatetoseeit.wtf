import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import NavBar from "../components/NavBar.js";
import ApplyNow from "../components/ApplyNow.js";
import Raiders from "../components/Raiders.js";
import { SnapContainer, SnapChild } from "../components/SnapContainer.js";
import FullscreenVideoBackground from "../components/FullscreenVideoBackground.js";
import favicon from "../images/favicon.ico";
import video from "../videos/background.mp4";
import "../components/Layout.css";

const FullscreenContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Section = styled(SnapChild)`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class Index extends React.Component {
  state = {
    scrollFunctions: [],
  };
  render() {
    return (
      <>
        <Helmet>
          <title>You Hate to See It</title>
          <meta
            name="description"
            content="World of Warcraft mythic raiding guild on Illidan-US"
          />
          <link rel="icon" href={favicon} />
        </Helmet>
        <FullscreenVideoBackground src={video} />
        <FullscreenContainer>
          <NavBar scrollFunctions={this.state.scrollFunctions} />
          <SnapContainer
            setScrollFunctions={funcs =>
              this.setState({ scrollFunctions: funcs })
            }
            parent={
              typeof document !== "undefined" ? document.documentElement : null
            }
          >
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
