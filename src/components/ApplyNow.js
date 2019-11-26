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
            cockpitMain {
              logo {
                type
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
            }
          }
        `}
        render={data => {
          const content = data.cockpitMain;
          return (
            <MainContentBox>
              <Section>
                <h1>
                  <Logo />
                </h1>
              </Section>
              <Section>
                <Subtitle>{content.heading.value}</Subtitle>
                <p>{content.description.value}</p>
              </Section>
              <Section>
                <Button href={content.apply_link.value}>Apply Now</Button>
              </Section>
            </MainContentBox>
          );
        }}
      />
    );
  }
}

export default ApplyNow;
