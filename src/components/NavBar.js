import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

const Bar = styled.nav`
  display: flex;
  width: 100%;
  background-color: var(--bg-color-dark);
  padding: 0 8%;
  justify-content: space-between;
  @media (max-width: 600px) {
    flex-direction: column;
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
        <a href={link.href} rel="noopener noreferrer" target="_blank">
          {link.text}
        </a>
      );
    });
    return <BarSection>{links}</BarSection>;
  }

  render() {
    return (
      <Bar className="navbar">
        {this.renderInternalLinks(this.props.links.internal)}
        {this.renderExternalLinks(this.props.links.external)}
      </Bar>
    );
  }
}

export default NavBar;
