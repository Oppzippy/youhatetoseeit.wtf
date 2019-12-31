// Libraries
import React from "react";
import styled from "styled-components";

const colors = {
  "-1": "#666",
  0: "#F00",
  1: "#00CC00",
  2: "#FF0",
  3: "#F60",
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

const AttendanceElement = styled.div.attrs(props => ({
  style: {
    gridRow: props.row,
    gridColumn: props.column,
  },
}))`
  width: 100%;
  height: 100%;
  background-color: ${props => colors[props.status || 0]};
  border: 1px solid black;
`;

function getStatusId(player) {
  const { online, tardy, benched, ignore } = player;
  if (ignore) {
    return -1;
  }
  if (online) {
    if (benched) {
      return 2;
    }
    if (tardy) {
      return 3;
    }
    return 1;
  }
  return 0;
}

const AttendanceBox = props => {
  const { player, snapshot } = props;
  const status = getStatusId(player);

  let title = `${snapshot.date.toLocaleDateString()}\n${player.name}\n${
    statusText[status]
  }`;

  if (player.zone) {
    title += `\n${player.zone}`;
  }
  return (
    <AttendanceElement
      status={status}
      title={title}
      {...props}
    ></AttendanceElement>
  );
};

export default AttendanceBox;
