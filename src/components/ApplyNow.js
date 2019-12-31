// Libraries
import React from "react";
import ReactMarkdown from "react-markdown";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
// Components
import Button from "components/Button";
import MainContentBox from "components/MainContentBox";

const Section = styled.section`
  text-align: center;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
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
            cockpitApplyNow {
              logo {
                value {
                  publicURL
                  fileContent
                }
              }
              title {
                value
              }
              content {
                value {
                  internal {
                    content
                  }
                }
              }
              applyLink {
                value
              }
              applyText {
                value
              }
            }
          }
        `}
        render={data => {
          const content = data.cockpitApplyNow;
          const logo = content.logo.value;
          return (
            <MainContentBox>
              <Section>
                <h1>
                  <Logo
                    src={
                      logo.fileContent
                        ? `data:image/svg+xml;base64,${Buffer.from(
                            logo.fileContent
                          ).toString("base64")}`
                        : logo.publicURL
                    }
                    alt={content.title.value}
                  />
                </h1>
              </Section>
              <Section>
                <ReactMarkdown
                  source={content.content.value.internal.content}
                />
              </Section>
              <Section>
                <Button href={content.applyLink.value}>
                  {content.applyText.value}
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
