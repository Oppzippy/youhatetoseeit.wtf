import React, { useState } from "react";
import Label from "../styles/Label";
import AttendanceTable from "./AttendanceTable";
import RaidTierSelector from "./RaidTierSelector";

export default props => {
  const { attendanceTracker, raiders } = props;
  const [isRaidersOnly, setRaidersOnly] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  attendanceTracker.setStartDate(startDate);
  attendanceTracker.setEndDate(endDate);

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
      <div>
        <RaidTierSelector setStartDate={setStartDate} setEndDate={setEndDate} />
      </div>
      <AttendanceTable
        attendanceTracker={attendanceTracker}
        whitelist={isRaidersOnly ? raiders : null}
      />
    </div>
  );
};
