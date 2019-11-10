import React from "react";
import NavBar from "../components/NavBar.js";
import ApplyNow from "../components/ApplyNow.js";
import Raiders from "../components/Raiders.js";
import "../components/Layout.css";

class Index extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <ApplyNow />
        <Raiders />
      </>
    );
  }
}

export default Index;
