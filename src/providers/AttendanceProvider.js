import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import {
  parseAttendance,
  parseAttendanceString,
} from "../parsers/AttendanceParser";
import { mergeAlts } from "../helpers/AttendanceHelpers";

const AttendanceContext = React.createContext();

const AttendanceProvider = props => {
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
  const attendanceStrings = data.allCockpitAttendance.nodes.map(node => ({
    start: node.start.value,
    afterBreak: node.afterBreak.value,
  }));
  const rawAttendance = attendanceStrings
    .map(parseAttendanceString)
    .map(mergeAlts(altPairs));
  const attendance = parseAttendance(rawAttendance);
  return (
    <AttendanceContext.Provider value={attendance}>
      {props.children}
    </AttendanceContext.Provider>
  );
};

export { AttendanceProvider, AttendanceContext };
