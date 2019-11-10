import React from "react";
import NavBar from "../components/NavBar.js";
import ApplyNow from "../components/ApplyNow.js";
import Raiders from "../components/Raiders.js";
import FullscreenVideoBackground from "../components/FullscreenVideoBackground.js";
import video from "../videos/background.mp4";
import "../components/Layout.css";

class Index extends React.Component {
  render() {
    return (
      <>
        <FullscreenVideoBackground src={video} />
        <NavBar />
        <ApplyNow />
        <Raiders />
      </>
    );
  }
}

export default Index;
