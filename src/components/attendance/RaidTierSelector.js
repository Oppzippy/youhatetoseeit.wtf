import React, { useState, useEffect } from "react";
import Label from "../styles/Label";

const raidTiers = [
  {
    name: "Castle Nathria",
    startDate: new Date("2020-11-25"),
    // endDate: new Date(),
  },
  {
    name: "Ny'alotha, The Waking City",
    startDate: new Date("2020-01-21"),
    endDate: new Date("2020-11-24"),
  },
  {
    name: "The Eternal Palace",
    startDate: new Date("2019-07-09"),
    endDate: new Date("2020-01-20"),
  },
];

export default (props) => {
  const [isInitialized, setInitialized] = useState(false);
  const { setStartDate, setEndDate } = props;
  useEffect(() => {
    if (!isInitialized) {
      setInitialized(true);
      const { startDate, endDate } = raidTiers[0];
      setStartDate(startDate);
      setEndDate(endDate);
    }
  }, [isInitialized, setInitialized, setStartDate, setEndDate]);
  return (
    <div>
      <Label htmlFor="raid-tier-select">Raid Tier</Label>
      <select
        id="raid-tier-select"
        onChange={(event) => {
          const { startDate, endDate } = raidTiers[event.target.value];
          setStartDate(startDate);
          setEndDate(endDate);
        }}
      >
        {raidTiers.map((raidTier, i) => (
          <option key={i} value={i}>
            {raidTier.name}
          </option>
        ))}
      </select>
    </div>
  );
};
