// Libraries
import React, { useState } from "react";
import { Helmet } from "react-helmet";
// Helpers
import { RaiderProvider, RaiderContext } from "providers/RaiderProvider";
import {
  AttendanceProvider,
  AttendanceContext,
} from "providers/AttendanceProvider";
import { filterRaiders } from "helpers/AttendanceHelpers";
// Components
import AttendanceTable from "components/attendance/AttendanceTable";
import ColumnLayout from "components/layouts/Columns";
import Label from "components/styles/Label";
import "components/Layout.css";

export default props => {
  const [isRaidersOnly, setRaidersOnly] = useState(true);
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
