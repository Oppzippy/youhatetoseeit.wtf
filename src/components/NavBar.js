import React from "react";
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
  renderInternalLinks() {
    let links = this.props.links.internal.map(link => {
      //return <Link to={link.to}>{link.text}</Link>
    });
    return <BarSection>{links}</BarSection>;
  }

  renderExternalLinks() {
    let links = this.props.links.external.map(link => {
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
        {this.renderInternalLinks()}
        {this.renderExternalLinks()}
      </Bar>
    );
  }
}

export default NavBar;
