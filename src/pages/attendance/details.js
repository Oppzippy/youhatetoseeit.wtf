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
import ColumnLayout from "components/layouts/Columns";
import "components/Layout.css";
import AttendanceDetails from "../../components/attendance/AttendanceDetails";

export default props => {
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

                    return (
                      <div>
                        <AttendanceDetails
                          attendanceTracker={attendance}
                          raiders={raiders}
                        />
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
