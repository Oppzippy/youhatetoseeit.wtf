import React, { Component } from "react";
import styled from "styled-components";
import Logo from "../components/Logo.js";

class Raiders extends Component {
  render() {
    const { config } = this.props;
    return <Logo {...config.files.logo} />;
  }
}

export default Raiders;
