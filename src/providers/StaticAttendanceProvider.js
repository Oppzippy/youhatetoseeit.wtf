// Libraries
import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import AttendanceSnapshotParser from "../lib/attendance/AttendanceSnapshotParser";
import RaidAttendance from "../lib/attendance/RaidAttendance";
import AttendanceTracker from "../lib/attendance/AttendanceTracker";
import AltTracker from "../lib/attendance/AltTracker";

const StaticAttendanceContext = React.createContext(null);

const StaticAttendanceProvider = props => {
  const data = useStaticQuery(graphql`
    query {
      allCockpitAttendance {
        nodes {
          start {
            value
          }
          afterBreak {
            value
          }
        }
      }
      allCockpitAlts {
        nodes {
          mainName {
            value
          }
          mainRealm {
            value
          }
          altName {
            value
          }
          altRealm {
            value
          }
        }
      }
    }
  `);

  const altPairs = data.allCockpitAlts.nodes.map(node => {
    return {
      main: {
        name: node.mainName.value,
        realm: node.mainRealm.value,
      },
      alt: {
        name: node.altName.value,
        realm: node.altRealm.value,
      },
    };
  });
  const attendance = data.allCockpitAttendance.nodes.map(
    node =>
      new RaidAttendance(
        new AttendanceSnapshotParser(node.start.value).parse(),
        new AttendanceSnapshotParser(node.afterBreak.value).parse()
      )
  );
  const attendanceTracker = new AttendanceTracker(attendance);
  attendanceTracker.setAltTracker(new AltTracker(altPairs));

  return (
    <StaticAttendanceContext.Provider value={attendanceTracker}>
      {props.children}
    </StaticAttendanceContext.Provider>
  );
};

export { StaticAttendanceContext, StaticAttendanceProvider };
