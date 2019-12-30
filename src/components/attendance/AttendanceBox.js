import React from "react";
import styled from "styled-components";

const colors = {
  "-1": "#666",
  0: "#F00",
  1: "#00CC00",
  2: "#FF0",
  3: "#FFA500",
  4: "#BFFF90",
};

const statusText = {
  // TODO dont hardcode
  "-1": "Didn't join yet",
  0: "Absent",
  1: "Present",
  2: "Benched",
  3: "Tardy",
  4: "Not Zoned In",
};

let AttendanceBox = props => {
  const { player, snapshot } = props;
  const status = props.status ?? player.status;
  let title = `${snapshot.date.toLocaleDateString()}
${player.name}
${statusText[status]}`;

  if (player && player.zone) {
    title += `\n${player.zone}`;
  }
  return <div title={title} {...props}></div>;
};

AttendanceBox = styled(AttendanceBox)`
  width: 100%;
  height: 100%;
  background-color: ${props => colors[props.status || 0]};
  grid-column: ${props => props.column};
  grid-row: ${props => props.row};
  border: 1px solid black;
`;

export default AttendanceBox;
