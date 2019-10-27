import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import VideoBackgroundLayout from "../components/VideoBackgroundLayout.js";
import Logo from "../components/Logo.js";
import Button from "../components/Button.js";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section = styled.section`
  text-align: center;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

class Index extends React.Component {
  render() {
    const meta = this.props.data.site.siteMetadata;
    return (
      <VideoBackgroundLayout nav={meta.nav}>
        <FlexContainer>
          <Section>
            <Logo />
          </Section>
          <Section>
            <h2>{meta.description}</h2>
            <p>{meta.text.raidTimes}</p>
          </Section>
          <Section>
            <Button href={meta.links.apply}>{meta.text.apply}</Button>
          </Section>
        </FlexContainer>
      </VideoBackgroundLayout>
    );
  }
}

export default Index;

export const query = graphql`
  query {
    site {
      siteMetadata {
        description
        text {
          raidTimes
          apply
        }
        links {
          apply
        }
        nav {
          external {
            href
            text
          }
          internal {
            text
            to
          }
        }
      }
    }
  }
`;
