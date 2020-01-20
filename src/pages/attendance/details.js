// Libraries
import React, { useState } from "react";
import { Helmet } from "react-helmet";
// Helpers
import { RaiderProvider, RaiderContext } from "providers/RaiderProvider";
import {
  AttendanceProvider,
  AttendanceContext,
} from "providers/AttendanceProvider";
import { filterRaiders, filterDate } from "helpers/AttendanceHelpers";
// Components
import AttendanceTable from "components/attendance/AttendanceTable";
import ColumnLayout from "components/layouts/Columns";
import Label from "components/styles/Label";
import "components/Layout.css";

export default props => {
  const [isRaidersOnly, setRaidersOnly] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const nav = [
    {
      text: "Summary",
      href: "/attendance",
    },
    {
      text: "Details",
      href: "/attendance/details",
      selected: true,
    },
  ];
  return (
    <>
      <Helmet>
        <title>&lt;You Hate to See It&gt; Attendance</title>
      </Helmet>

      <ColumnLayout columns="1" nav={nav}>
        <RaiderProvider>
          <AttendanceProvider>
            <RaiderContext.Consumer>
              {raiders => (
                <AttendanceContext.Consumer>
                  {attendance => {
                    if (attendance.error) {
                      return <h3>{attendance.error}</h3>;
                    }

                    let filteredAttendance = attendance;
                    if (isRaidersOnly) {
                      filteredAttendance = filterRaiders(
                        filteredAttendance,
                        raiders
                      );
                    }
                    filteredAttendance = filterDate(
                      filteredAttendance,
                      startDate ? new Date(startDate) : null,
                      endDate ? new Date(endDate) : null
                    );
                    return (
                      <div>
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
                          <div>
                            <Label htmlFor="start-date">Start Date</Label>
                            <input
                              type="date"
                              id="start-date"
                              value={startDate ?? ""}
                              onChange={e => setStartDate(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="end-date">End Date</Label>
                            <input
                              type="date"
                              id="end-date"
                              value={endDate ?? ""}
                              onChange={e => setEndDate(e.target.value)}
                            />
                          </div>
                        </div>
                        <AttendanceTable attendance={filteredAttendance} />
                      </div>
                    );
                  }}
                </AttendanceContext.Consumer>
              )}
            </RaiderContext.Consumer>
          </AttendanceProvider>
        </RaiderProvider>
      </ColumnLayout>
    </>
  );
};
