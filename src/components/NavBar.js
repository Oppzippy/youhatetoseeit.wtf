import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";

const Bar = styled.nav`
  position: fixed;
  display: flex;
  width: 100%;
  background-color: var(--bg-color-dark);
  padding: 0 8%;
  justify-content: space-between;
  @media (max-width: 600px) {
    /* TODO improve UX on small screens */
    flex-direction: column;
    position: static;
  }
`;

const BarSection = styled.section`
  display: flex;
  & > a,
  & > span {
    display: block;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    padding: 0.8rem;
    &:hover {
      background-color: var(--bg-color-dark-2);
    }
  }
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

class NavBar extends React.Component {
  renderInternalLinks(linkData) {
    let links = linkData.map((link, i) => {
      return (
        <span onClick={this.props.scrollFunctions[i]} key={link.text}>
          {link.text}
        </span>
      );
    });
    return <BarSection>{links}</BarSection>;
  }

  renderExternalLinks(linkData) {
    let links = linkData.map(link => {
      return (
        <a
          href={link.href}
          rel="noopener noreferrer"
          target="_blank"
          key={link.text}
        >
          {link.text}
        </a>
      );
    });
    return <BarSection>{links}</BarSection>;
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            site {
              siteMetadata {
                nav {
                  external {
                    text
                    href
                  }
                  internal {
                    text
                  }
                }
              }
            }
          }
        `}
        render={data => {
          const nav = data.site.siteMetadata.nav;
          return (
            <Bar>
              {this.renderInternalLinks(nav.internal)}
              {this.renderExternalLinks(nav.external)}
            </Bar>
          );
        }}
      />
    );
  }
}

export default NavBar;
