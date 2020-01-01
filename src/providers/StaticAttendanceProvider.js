// Libraries
import React from "react";
import { graphql, useStaticQuery } from "gatsby";
// Helpers
import {
  parseAttendance,
  parseAttendanceString,
} from "parsers/AttendanceParser";
import { mergeAlts } from "helpers/AttendanceHelpers";

const StaticAttendanceContext = React.createContext();

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
  const attendanceStrings = data.allCockpitAttendance.nodes.map(node => ({
    start: node.start.value,
    afterBreak: node.afterBreak.value,
  }));
  const rawAttendance = attendanceStrings
    .map(parseAttendanceString)
    .map(mergeAlts(altPairs));
  const attendance = parseAttendance(rawAttendance);
  return (
    <StaticAttendanceContext.Provider value={attendance}>
      {props.children}
    </StaticAttendanceContext.Provider>
  );
};

export { StaticAttendanceContext, StaticAttendanceProvider };
