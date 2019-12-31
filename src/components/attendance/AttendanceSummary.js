// Libraries
import React, { useState } from "react";
// Helpers
import { filterRaiders } from "helpers/AttendanceHelpers";
// Components
import AttendanceSummaryTable from "components/attendance/AttendanceSummaryTable";
import Label from "components/styles/Label";

export default props => {
  const [isRaidersOnly, setRaidersOnly] = useState(true);
  let { attendance, raiders } = props;
  if (isRaidersOnly) {
    attendance = filterRaiders(attendance, raiders);
  }
  return (
    <div>
      <Label htmlFor="raiders-only">Raiders Only</Label>
      <input
        type="checkbox"
        id="raiders-only"
        checked={isRaidersOnly}
        onChange={() => setRaidersOnly(!isRaidersOnly)}
      />
      <AttendanceSummaryTable attendance={attendance} />
    </div>
  );
};
