import React from "react";
import styled from "styled-components";
import { filterRaiders } from "../../parsers/AttendanceParser";
import AttendanceSummaryTable from "./AttendanceSummaryTable";

export default props => {
  let { attendance } = props;
  if (false) {
    attendance = filterRaiders(attendance, props.raiders);
  }
  return <AttendanceSummaryTable attendance={attendance} />;
};
