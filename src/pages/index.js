import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import NavBar from "../components/NavBar";
import ApplyNow from "../components/ApplyNow";
import AboutUs from "../components/AboutUs";
import Raiders from "../components/Raiders";
import { SnapContainer, SnapChild } from "../components/SnapContainer";
import FullscreenVideoBackground from "../components/FullscreenVideoBackground";
import favicon from "../images/favicon.ico";
import "../components/Layout.css";

const FullscreenContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: scroll;
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
  constructor(props) {
    super(props);
    // Don't use window as scroll parent because chrome has a bug where you can
    // queue up a big scroll while we're doing the smooth animation, and then it
    // jumps afterwards.
    this.fullscreenContainerRef = React.createRef();
    this.snapContainerRef = React.createRef();
  }

  componentDidMount() {
    this.snapContainerRef.current.setScrollParent(
      this.fullscreenContainerRef.current
    );
  }

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
        <StaticQuery
          query={graphql`
            query {
              cockpitApplyNow {
                background {
                  value {
                    publicURL
                  }
                }
              }
            }
          `}
          render={data => {
            return (
              <FullscreenVideoBackground
                src={data.cockpitApplyNow.background.value.publicURL}
              />
            );
          }}
        />
        <FullscreenContainer ref={this.fullscreenContainerRef}>
          <NavBar scrollFunctions={this.state.scrollFunctions} />
          <SnapContainer
            setScrollFunctions={funcs =>
              this.setState({ scrollFunctions: funcs })
            }
            parent={this.fullscreenContainerRef.current}
            ref={this.snapContainerRef}
          >
            <Section>
              <ApplyNow />
            </Section>
            <Section>
              <AboutUs />
            </Section>
            <Section>
              <Raiders />
            </Section>
          </SnapContainer>
        </FullscreenContainer>
      </>
    );
  }
}

export default Index;
