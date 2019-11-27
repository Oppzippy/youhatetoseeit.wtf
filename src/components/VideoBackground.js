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

const videos = ["mp4"];

const images = ["jpg", "jpeg", "png", "webp", "gif"];

class VideoBackground extends React.Component {
  getFileExtension(file) {
    const parts = file.split(".");
    return parts[parts.length - 1].toLowerCase();
  }

  renderBackground() {
    const extension = this.getFileExtension(this.props.src);
    if (videos.includes(extension)) {
      return (
        <video autoPlay muted loop>
          <source src={this.props.src} type="video/mp4" />
        </video>
      );
    }
    if (images.includes(extension)) {
      return <img src={this.props.src} alt="" />;
    }
  }

  render() {
    return (
      <VideoBackgroundContainer>
        <VideoBackgroundChild>{this.renderBackground()}</VideoBackgroundChild>
      </VideoBackgroundContainer>
    );
  }
}

export default VideoBackground;
