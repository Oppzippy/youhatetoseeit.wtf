import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import NavBar from "../components/NavBar.js";
import ApplyNow from "../components/ApplyNow.js";
import AboutUs from "../components/AboutUs.js";
import Raiders from "../components/Raiders.js";
import { SnapContainer, SnapChild } from "../components/SnapContainer.js";
import FullscreenVideoBackground from "../components/FullscreenVideoBackground.js";
import favicon from "../images/favicon.ico";
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
