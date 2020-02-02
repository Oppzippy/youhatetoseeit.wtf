// Libraries
import React from "react";
import { Helmet } from "react-helmet";
// Helpers
import { RaiderProvider, RaiderContext } from "providers/RaiderProvider";
import {
  AttendanceProvider,
  AttendanceContext,
} from "providers/AttendanceProvider";
// Components
import AttendanceSummary from "components/attendance/AttendanceSummary";
import ColumnLayout from "../../components/layouts/Columns";
import "components/Layout.css";

export default () => {
  const nav = [
    {
      text: "Summary",
      href: "/attendance",
      selected: true,
    },
    {
      text: "Details",
      href: "/attendance/details",
    },
  ];
  return (
    <>
      <Helmet>
        <title>&lt;You Hate to See It&gt; Attendance</title>
      </Helmet>
      <ColumnLayout nav={nav}>
        <AttendanceProvider>
          <RaiderProvider>
            <AttendanceContext.Consumer>
              {attendanceTracker => (
                <RaiderContext.Consumer>
                  {raiders => {
                    if (attendanceTracker.error) {
                      return <h3>{attendanceTracker.error}</h3>;
                    }
                    return (
                      <AttendanceSummary
                        attendanceTracker={attendanceTracker}
                        raiders={raiders}
                      />
                    );
                  }}
                </RaiderContext.Consumer>
              )}
            </AttendanceContext.Consumer>
          </RaiderProvider>
        </AttendanceProvider>
        <div>
          <h2>TODO overall attendance percents</h2>
        </div>
      </ColumnLayout>
    </>
  );
};
