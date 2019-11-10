import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import Logo from "../components/Logo.js";
import Button from "../components/Button.js";
import MainContentBox from "../components/MainContentBox.js";

const FullscreenContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

const Subtitle = styled.h3`
  font-size: 1.37rem;
`;

class ApplyNow extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
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
              }
            }
          }
        `}
        render={data => {
          const meta = data.site.siteMetadata;
          return <FullscreenContainer>
            <MainContentBox>
              <FlexContainer>
                <Section>
                  <Logo />
                </Section>
                <Section>
                  <Subtitle>{meta.description}</Subtitle>
                  <p>{meta.text.raidTimes}</p>
                </Section>
                <Section>
                  <Button href={meta.links.apply}>{meta.text.apply}</Button>
                </Section>
              </FlexContainer>
            </MainContentBox>
          </FullscreenContainer>;
        }}
      />
    );
  }
}

export default ApplyNow;
