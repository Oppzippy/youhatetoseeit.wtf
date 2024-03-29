// Libraries
import React from "react";
import styled from "styled-components";
// Components
import VideoBackground from "components/VideoBackground";

const FullscreenBackground = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: -1;
`;

class FullscreenVideoBackground extends React.Component {
  render() {
    return (
      <FullscreenBackground>
        <VideoBackground {...this.props} />
      </FullscreenBackground>
    );
  }
}

export default FullscreenVideoBackground;
