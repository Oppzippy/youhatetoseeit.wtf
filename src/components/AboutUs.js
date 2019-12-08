import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";
import MainContentBox from "./MainContentBox.js";

const DescriptionContentBox = styled.div`
  text-align: left;
  max-width: 800px;
  p:not(:last-child) {
    margin-bottom: 1em;
  }
  h4 {
    margin-left: 0.5em;
  }
  ul {
    list-style: none;
    li {
      margin-left: 1em;
    }
  }
`;

class AboutUs extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            cockpitAboutUs {
              content {
                value {
                  internal {
                    content
                  }
                }
              }
            }
          }
        `}
        render={data => {
          return (
            <MainContentBox>
              <DescriptionContentBox>
                <ReactMarkdown
                  source={data.cockpitAboutUs.content.value.internal.content}
                />
              </DescriptionContentBox>
            </MainContentBox>
          );
        }}
      />
    );
  }
}

export default AboutUs;
