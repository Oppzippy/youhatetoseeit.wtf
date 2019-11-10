import React from "react";
import styled from "styled-components";

const RaiderBox = styled.div`
  width: 100%;
  border-radius: 5px;
  background-color: darkblue;
  padding: 8px;
`;

class Raider extends React.Component {
  render() {
    const rank = this.props.rank;
    const {name, realm} = this.props.character;
    return <RaiderBox>
      {name}
    </RaiderBox>
  }
}

export default Raider;
