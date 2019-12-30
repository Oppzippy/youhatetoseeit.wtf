import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { RaiderProvider, RaiderContext } from "../providers/RaiderProvider";
import AttendanceTable from "../components/attendance/AttendanceTable";
import { parseAttendance, renameAlts } from "../parsers/AttendanceParser";
import "../components/Layout.css";

const Style = styled.div`
  color: var(--bg-color-dark);
`;

function filterRaiders(snapshots, raiders) {
  return snapshots.map(snapshot => {
    return {
      ...snapshot,
      players: snapshot.players.filter(player =>
        raiders.find(
          raider =>
            raider.character.name === player.name &&
            raider.character.realm === player.realm
        )
      ),
    };
  });
}

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
  const [isRaidersOnly, setRaidersOnly] = useState(true);
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
    <Style>
      <Helmet>
        <title>&lt;You Hate to See It&gt; Attendance</title>
      </Helmet>
      <label htmlFor="raiders-only">Raiders Only</label>
      <input
        type="checkbox"
        id="raiders-only"
        checked={isRaidersOnly}
        onChange={() => setRaidersOnly(!isRaidersOnly)}
      />
      <RaiderProvider>
        <RaiderContext.Consumer>
          {raiders => {
            let snapshots = attendance;
            if (isRaidersOnly) {
              snapshots = filterRaiders(snapshots, raiders);
            }
            return <AttendanceTable snapshots={snapshots} />;
          }}
        </RaiderContext.Consumer>
      </RaiderProvider>
    </Style>
  );
};
