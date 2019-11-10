import React from "react";
import styled from "styled-components";

import FullscreenVideoBackground from "./FullscreenVideoBackground.js";
import MainContentBox from "./MainContentBox.js";
import video from "../videos/background.mp4";

const FullscreenContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class VideoBackgroundLayout extends React.Component {
  render() {
    return (
      <div>
        <FullscreenVideoBackground src={video} />
        <FullscreenContainer>
          <MainContentBox>{this.props.children}</MainContentBox>
        </FullscreenContainer>
      </div>
    );
  }
}

export default VideoBackgroundLayout;
