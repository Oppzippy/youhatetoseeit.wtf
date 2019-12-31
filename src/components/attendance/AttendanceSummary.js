import React, { useState } from "react";
import styled from "styled-components";
import { filterRaiders } from "../../helpers/AttendanceHelpers";
import AttendanceSummaryTable from "./AttendanceSummaryTable";
import Label from "../styles/Label";

export default props => {
  const [isRaidersOnly, setRaidersOnly] = useState(true);
  let { attendance, raiders } = props;
  if (isRaidersOnly) {
    attendance = filterRaiders(attendance, raiders);
  }
  return (
    <>
      <Label htmlFor="raiders-only">Raiders Only</Label>
      <input
        type="checkbox"
        id="raiders-only"
        checked={isRaidersOnly}
        onChange={() => setRaidersOnly(!isRaidersOnly)}
      />
      <AttendanceSummaryTable attendance={attendance} />
    </>
  );
};
