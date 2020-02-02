// Libraries
import React from "react";
import styled from "styled-components";
import AttendanceSummary from "../../lib/attendance/AttendanceSummary";

const colors = {};
colors[AttendanceSummary.IGNORE] = "#666";
colors[AttendanceSummary.ABSENT] = "#F00";
colors[AttendanceSummary.PRESENT] = "#0C0";
colors[AttendanceSummary.NOT_IN_GROUP] = "#FF0";
colors[AttendanceSummary.ARRIVED_LATE] = "#F60";
colors[AttendanceSummary.LEFT_EARLY] = "#F60";

const statusText = {};
statusText[AttendanceSummary.IGNORE] = "Didn't join yet";
statusText[AttendanceSummary.ABSENT] = "Absent";
statusText[AttendanceSummary.PRESENT] = "Present";
statusText[AttendanceSummary.NOT_IN_GROUP] = "Not in group";
statusText[AttendanceSummary.ARRIVED_LATE] = "Tardy";
statusText[AttendanceSummary.LEFT_EARLY] = "Left Early";

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

const AttendanceBox = props => {
  const { player, date } = props;
  const status = player.getAggregate();
  let title = `${date.toLocaleDateString()}\n${player.name}\n${
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
