// Libraries
import React, { useState } from "react";
// Components
import AttendanceSummaryTable from "components/attendance/AttendanceSummaryTable";
import Label from "components/styles/Label";

export default props => {
  const [isRaidersOnly, setRaidersOnly] = useState(true);
  let { attendanceTracker, raiders } = props;
  return (
    <div>
      <Label htmlFor="raiders-only">Raiders Only</Label>
      <input
        type="checkbox"
        id="raiders-only"
        checked={isRaidersOnly}
        onChange={() => setRaidersOnly(!isRaidersOnly)}
      />
      <AttendanceSummaryTable
        attendance={attendanceTracker}
        whitelist={isRaidersOnly ? raiders : null}
      />
    </div>
  );
};
