import React from "react";
import styled from "styled-components";

class Logo extends React.Component {
  render() {
    return (
      <img src={this.props.src} alt="logo" className={this.props.className} />
    );
  }
}

Logo = styled(Logo)`
  width: 500px;
  max-width: 100%;
`;

export default Logo;
