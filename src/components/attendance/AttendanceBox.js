import styled from "styled-components";

const colors = {
  "-1": "#666",
  0: "#F00",
  1: "#00CC00",
  2: "#FF0",
  3: "#FFA500",
  4: "#BFFF90",
};

const AttendanceBox = styled.td`
  width: 50px;
  height: 50px;
  background-color: ${props => colors[props.status || 0]};
`;

export default AttendanceBox;
