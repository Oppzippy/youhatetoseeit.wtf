import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";
import AttendanceTable from "../components/attendance/AttendanceTable";
import { parseAttendance, renameAlts } from "../parsers/AttendanceParser";
import "../components/Layout.css";

const style = {
  color: "var(--bg-color-dark)",
};

export default props => {
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
          main_name {
            value
          }
          main_realm {
            value
          }
          alt_name {
            value
          }
          alt_realm {
            value
          }
        }
      }
    }
  `);
  const [isRaidersOnly, setRaidersOnly] = useState(true);
  const altPairs = data.allCockpitAlts.nodes.map(node => {
    return {
      main: {
        name: node.main_name.value,
        realm: node.main_realm.value,
      },
      alt: {
        name: node.alt_name.value,
        realm: node.alt_realm.value,
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
    <>
      <Helmet>
        <title>&lt;You Hate to See It&gt; Attendance</title>
      </Helmet>
      <input type="checkbox" onInput={console.log} />
      <AttendanceTable style={style} snapshots={attendance} />
    </>
  );
};
