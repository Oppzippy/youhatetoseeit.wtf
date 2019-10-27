import React from "react";
import styled from "styled-components";

import "./Layout.css";
import FullscreenVideoBackground from "./FullscreenVideoBackground.js";
import NavBar from "./NavBar.js";
import MainContentBox from "./MainContentBox.js";
import video from "../videos/background.mp4";

const Grid = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: auto 10fr;
  align-items: center;
  justify-items: center;
`;

class VideoBackgroundLayout extends React.Component {
  render() {
    return (
      <div>
        <FullscreenVideoBackground src={video} />
        <Grid>
          <NavBar links={this.props.nav} />
          <MainContentBox>{this.props.children}</MainContentBox>
        </Grid>
      </div>
    );
  }
}

export default VideoBackgroundLayout;
