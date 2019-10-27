import React from "react";
import styled from "styled-components";

const VideoBackgroundContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--bg-color-dark);
  z-index: -1;
`;

const VideoBackgroundChild = styled.div`
  filter: blur(20px);
  width: 100%;
  height: 100%;
`;

class VideoBackground extends React.Component {
  render() {
    return (
      <VideoBackgroundContainer>
        <VideoBackgroundChild>
          <video autoPlay muted loop>
            <source src={this.props.src} type="video/mp4" />
          </video>
        </VideoBackgroundChild>
      </VideoBackgroundContainer>
    );
  }
}

export default VideoBackground;
