import React from "react";
import styled from "styled-components";
import logo from "../images/logo.svg";

class Logo extends React.Component {
  render() {
    return (
      <img
        src={logo}
        alt="You Hate to See It"
        className={this.props.className}
      />
    );
  }
}

Logo = styled(Logo)`
  width: 500px;
  max-width: 100%;
`;

export default Logo;
