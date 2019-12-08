import React from "react";
import styled from "styled-components";

const colors = {
  1: "#c79c6e" /* Warrior */,
  2: "#f58cba" /* Paladin */,
  3: "#a9d271" /* Hunter */,
  4: "#fff569" /* Rogue */,
  5: "#ffffff" /* Priest */,
  6: "#c41f3b" /* Death Knight */,
  7: "#0070de" /* Shaman */,
  8: "#40c7eb" /* Mage */,
  9: "#8787ed" /* Warlock */,
  10: "#00ff96" /* Monk */,
  11: "#ff7d0a" /* Druid */,
  12: "#a330c9" /* Demon Hunter */,
};

const ClassColor = styled.span`
  color: ${props => colors[props.classId]};
`;

export default ClassColor;
