import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
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

const Logo = styled.img`
  width: 500px;
  max-width: 100%;
`;

class ApplyNow extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            cockpitMain {
              logo {
                value {
                  publicURL
                }
              }
              title {
                value
              }
              heading {
                value
              }
              description {
                value
              }
              apply_link {
                value
              }
              apply_text {
                value
              }
            }
          }
        `}
        render={data => {
          const content = data.cockpitMain;
          return (
            <MainContentBox>
              <Section>
                <h1>
                  <Logo
                    src={content.logo.value.publicURL}
                    alt={content.title.value}
                  />
                </h1>
              </Section>
              <Section>
                <Subtitle>{content.heading.value}</Subtitle>
                <p>{content.description.value}</p>
              </Section>
              <Section>
                <Button href={content.apply_link.value}>
                  {content.apply_text.value}
                </Button>
              </Section>
            </MainContentBox>
          );
        }}
      />
    );
  }
}

export default ApplyNow;
