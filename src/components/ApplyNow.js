import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import Logo from "./Logo.js";
import Button from "./Button.js";
import MainContentBox from "./MainContentBox.js";

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
          return (
            <MainContentBox>
              <Section>
                <h1>
                  <Logo />
                </h1>
              </Section>
              <Section>
                <Subtitle>{meta.description}</Subtitle>
                <p>{meta.text.raidTimes}</p>
              </Section>
              <Section>
                <Button href={meta.links.apply}>{meta.text.apply}</Button>
              </Section>
            </MainContentBox>
          );
        }}
      />
    );
  }
}

export default ApplyNow;
