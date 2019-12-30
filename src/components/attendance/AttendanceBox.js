import styled from "styled-components";

const colors = {
  "-1": "#666",
  0: "#F00",
  1: "#00CC00",
  2: "#FF0",
  3: "#FFA500",
  4: "#BFFF90",
};

const AttendanceBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => colors[props.status || 0]};
  grid-column: ${props => props.column};
  grid-row: ${props => props.row};
  border: 1px solid black;
`;

export default AttendanceBox;
