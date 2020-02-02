import React, { useState } from "react";
import Label from "../styles/Label";
import AttendanceTable from "./AttendanceTable";

export default props => {
  console.log("a");
  const [isRaidersOnly, setRaidersOnly] = useState(true);
  return (
    <div>
      <div>
        <Label htmlFor="raiders-only">Raiders Only</Label>
        <input
          type="checkbox"
          id="raiders-only"
          checked={isRaidersOnly}
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
