// Libraries
import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  & > a {
    display: block;
    text-decoration: none;
    color: var(--text-color-dark);
    background-image: linear-gradient(
      to bottom right,
      var(--bg-color-light),
      white 150%
    );
    padding: 0.6em 1em;
    margin: 5px 8px;
    border-radius: 5px;
    box-shadow: 4px 4px 2px var(--shadow-color);
    transition: transform 0.2s;
  }
  &:hover > a {
    transform: translateY(-2px);
  }
`;

class Button extends React.Component {
  render() {
    return (
      <ButtonContainer style={this.props.style}>
        <a href={this.props.href}>{this.props.children}</a>
      </ButtonContainer>
    );
  }
}

export default Button;
