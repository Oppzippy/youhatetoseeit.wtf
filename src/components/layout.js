import React from "react";
import styled from "styled-components";

import "./Layout.css";
import FullscreenVideoBackground from "./FullscreenVideoBackground.js";
import NavBar from "./NavBar.js";
import MainContentBox from "./MainContentBox.js";

const Grid = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: auto 10fr;
  align-items: center;
  justify-items: center;
`;

class DefaultTemplate extends React.Component {
  render() {
    const { config } = this.props;
    return (
      <div>
        <FullscreenVideoBackground src={config.files.backgroundVideo.src} />
        <Grid>
          <NavBar links={config.nav} />
          <MainContentBox>{this.props.children}</MainContentBox>
        </Grid>
      </div>
    );
  }
}

export default DefaultTemplate;
