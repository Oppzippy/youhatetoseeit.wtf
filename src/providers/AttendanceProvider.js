// Libraries
import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
// Helpers
import Cockpit from "cockpit/Cockpit";
import AttendanceSnapshotParser from "../lib/attendance/AttendanceSnapshotParser";
import RaidAttendance from "../lib/attendance/RaidAttendance";
import AttendanceTracker from "../lib/attendance/AttendanceTracker";
import {
  StaticAttendanceProvider,
  StaticAttendanceContext,
} from "providers/StaticAttendanceProvider";
import AltTracker from "../lib/attendance/AltTracker";

const AttendanceContext = React.createContext();

const AttendanceProvider = props => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          cmsUrl
        }
      }
    }
  `);
  const { cmsUrl } = data.site.siteMetadata;
  const [attendance, setAttendance] = useState({
    error: "Fetching attendance",
  });

  const cockpit = new Cockpit(cmsUrl);

  function fetchAttendance() {
    const altsPromise = cockpit.getCollection("alts");
    const attendancePromise = cockpit.getCollection("attendance");
    Promise.all([altsPromise, attendancePromise])
      .then(([alts, attendance]) => {
        if (alts.error || attendance.error) {
          throw new Error(
            `Error fetching attendance: ${alts.error}, ${attendance.error}`
          );
        }
        const altPairs = alts.entries.map(entry => ({
          main: {
            name: entry.mainName,
            realm: entry.mainRealm,
          },
          alt: {
            name: entry.altName,
            realm: entry.altRealm,
          },
        }));
        const raids = attendance.entries.map(
          ({ start, afterBreak }) =>
            new RaidAttendance(
              new AttendanceSnapshotParser(start).parse(),
              new AttendanceSnapshotParser(afterBreak).parse()
            )
        );
        const attendanceTracker = new AttendanceTracker(raids);
        attendanceTracker.setAltTracker(new AltTracker(altPairs));
        setAttendance(attendanceTracker);
      })
      .catch(err => {
        // Retry until successful
        console.error(err);
        setAttendance({
          error: "Error fetching attendance. Trying again every 5 seconds.",
        });
        setTimeout(fetchAttendance, 5000);
      });
  }

  useEffect(fetchAttendance, []);
  // Use static data until fetch completes successfully
  return (
    <StaticAttendanceProvider>
      <StaticAttendanceContext.Consumer>
        {staticAttendance => {
          return (
            <AttendanceContext.Provider
              value={attendance.error ? staticAttendance : attendance}
            >
              {props.children}
            </AttendanceContext.Provider>
          );
        }}
      </StaticAttendanceContext.Consumer>
    </StaticAttendanceProvider>
  );
};

export { AttendanceProvider, AttendanceContext };
