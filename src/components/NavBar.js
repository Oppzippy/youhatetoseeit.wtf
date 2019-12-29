import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import hamburger from "../images/icons/menu-24px.svg";
import doubleArrow from "../images/icons/double_arrow-24px.svg";

const hamburgerBreakpoint = "999px";

// Jank, but it lets us use sticky like fixed
// Fixed will cover up the scroll bar since it's a div and not <body>
const BarZeroSizeParent = styled.div`
  position: sticky;
  z-index: 10;
  top: 0;
  width: 100%;
  height: 0;
  @media (max-width: ${hamburgerBreakpoint}) {
    position: fixed;
    width: 200%;
    padding-right: 133%;
    height: 100%;
    left: ${props => (props.visible ? "0%" : "-67%")};
    visibility: ${props => (props.visible ? "visible" : "hidden")};
    transition: left 0.4s, visibility 0.4s;
  }
`;

const Bar = styled.nav`
  z-index: 10;
  display: flex;
  width: 100%;
  background-color: var(--bg-color-dark);
  padding: 0 8%;
  justify-content: space-between;
  @media (max-width: ${hamburgerBreakpoint}) {
    flex-direction: column;
    height: 100%;
  }
`;

const BarSection = styled.section`
  display: flex;
  & > * {
    display: block;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    padding: 0.8rem;
    background-color: transparent;
    border: none;
    font-size: inherit;
    font-weight: inherit;
    &:hover,
    &:focus {
      background-color: var(--bg-color-dark-2);
    }
  }
  @media (max-width: ${hamburgerBreakpoint}) {
    flex-direction: column;
  }
`;

const HamburgerMenu = styled.div`
  position: fixed;
  top: 5px;
  left: 5px;
  cursor: pointer;
  background-color: rgba(222, 222, 222, 0.75);
  border-radius: 25%;
  padding: 10px;
  transition: background-color 0.1s;
  z-index: 5;
  &:hover {
    background-color: #fff;
  }
  img {
    width: 40px;
  }
  visibility: hidden;
  @media (max-width: ${hamburgerBreakpoint}) {
    visibility: visible;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 50%;
  right: 66.6667%;
  cursor: pointer;
  transform: scaleX(-1.4) scaleY(2);
  z-index: 5;
  img {
    width: 40px;
  }
  visibility: hidden;
  @media (max-width: ${hamburgerBreakpoint}) {
    visibility: visible;
  }
`;

class NavBar extends React.Component {
  state = {
    visible: false,
  };

  renderInternalLinks(linkData) {
    let links = linkData.map((link, i) => {
      return (
        <button
          onClick={() => {
            this.props.scrollFunctions[i]();
            this.setState({ visible: false }); // hide sidebar on mobile
          }}
          role="link"
          key={link.text}
        >
          {link.text}
        </button>
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
            allCockpitExternalLinks {
              nodes {
                href {
                  value
                }
                text {
                  value
                }
              }
            }
            allCockpitInternalLinks {
              nodes {
                text {
                  value
                }
              }
            }
          }
        `}
        render={data => {
          const externalLinks = data.allCockpitExternalLinks.nodes.map(node => {
            return {
              text: node.text.value,
              href: node.href.value,
            };
          });
          const internalLinks = data.allCockpitInternalLinks.nodes.map(node => {
            return {
              text: node.text.value,
            };
          });
          return (
            <>
              <HamburgerMenu
                onClick={() => {
                  this.setState({ visible: true });
                }}
              >
                <img src={hamburger} alt="Open navigation sidebar" />
              </HamburgerMenu>
              <BarZeroSizeParent visible={this.state.visible}>
                <Bar>
                  {this.renderInternalLinks(internalLinks)}
                  {this.renderExternalLinks(externalLinks)}
                </Bar>
                <CloseButton
                  onClick={() => {
                    this.setState({ visible: false });
                  }}
                >
                  <img src={doubleArrow} alt="Close navigation sidebar" />
                </CloseButton>
              </BarZeroSizeParent>
            </>
          );
        }}
      />
    );
  }
}

export default NavBar;
