import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";

const Bar = styled.nav`
  display: flex;
  width: 100%;
  background-color: var(--bg-color-dark);
  padding: 0 8%;
  justify-content: space-between;
  @media (max-width: 600px) {
    flex-direction: column;
    position: static;
  }
`;

const BarSection = styled.section`
  display: flex;
  & > a {
    display: block;
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
    let links = linkData.map(link => {
      //return <Link to={link.to}>{link.text}</Link>
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
        `}
        render={data => {
          const nav = data.site.siteMetadata.nav;
          return (
            <Bar className="navbar">
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
