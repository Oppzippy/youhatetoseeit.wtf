// Libraries
import React, { useState } from "react";
// Components
import AttendanceSummaryTable from "./AttendanceSummaryTable";
import RaidTierSelector from "./RaidTierSelector";
import Label from "../styles/Label";

export default props => {
  const [isRaidersOnly, setRaidersOnly] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { attendanceTracker, raiders } = props;
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
      <AttendanceSummaryTable
        attendanceTracker={attendanceTracker}
        whitelist={
          isRaidersOnly ? raiders.map(raider => raider.character) : null
        }
      />
    </div>
  );
};
