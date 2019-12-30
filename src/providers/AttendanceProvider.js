import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { parseAttendance, renameAlts } from "../parsers/AttendanceParser";

const AttendanceContext = React.createContext();

const AttendanceProvider = props => {
  const data = useStaticQuery(graphql`
    query {
      allCockpitAttendance {
        nodes {
          data {
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
  const attendanceStrings = data.allCockpitAttendance.nodes.map(
    node => node.data.value
  );
  const attendance = attendanceStrings
    .map(parseAttendance)
    .map(snapshot => renameAlts(snapshot, altPairs));

  return (
    <AttendanceContext.Provider value={attendance}>
      {props.children}
    </AttendanceContext.Provider>
  );
};

export { AttendanceProvider, AttendanceContext };
