import React, { useState } from "react";
import Label from "../styles/Label";
import AttendanceTable from "./AttendanceTable";

export default props => {
  console.log(props.attendanceTracker);
  const [isRaidersOnly, setRaidersOnly] = useState(true);
  return (
    <div>
      <div>
        <Label htmlFor="raiders-only">Raiders Only</Label>
        <input
          type="checkbox"
          id="raiders-only"
          value={isRaidersOnly}
          onChange={() => setRaidersOnly(!isRaidersOnly)}
        />
      </div>
      <AttendanceTable
        attendanceTracker={props.attendanceTracker}
        whitelist={isRaidersOnly ? props.raiders : null}
      />
    </div>
  );
};
