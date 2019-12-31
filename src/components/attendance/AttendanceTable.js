// Libraries
import React from "react";
// Components
import {
  Table,
  TopHeader,
  LeftHeader,
  TopLeftHeader,
} from "./AttendanceTableLayout";
import AttendanceBox from "components/attendance/AttendanceBox";

function createDateHeader(snapshots) {
  const dateOptions = {
    month: "2-digit",
    day: "numeric",
  };
  return snapshots.map((snapshot, i) => (
    <TopHeader key={i}>
      {snapshot.date.toLocaleDateString(undefined, dateOptions)}
    </TopHeader>
  ));
}

function createPlayerHeader(players) {
  return players.map((player, i) => (
    <LeftHeader key={i}>{player.name}</LeftHeader>
  ));
}

function createAttendanceBoxes(snapshots, players) {
  const boxes = players.map((player, playerIndex) =>
    snapshots.map((snapshot, snapshotIndex) => {
      const playerAttendance = snapshot.players.find(
        p => p.name === player.name && p.realm === player.realm
      );

      return (
        <AttendanceBox
          key={`${playerAttendance.name}-${snapshotIndex}-${playerIndex}`}
          player={playerAttendance}
          snapshot={snapshot}
          column={snapshotIndex + 2}
          row={playerIndex + 2}
        />
      );
    })
  );
  return boxes;
}

export default props => {
  const { players, snapshots } = props.attendance;
  const rows = createAttendanceBoxes(snapshots, players);
  return (
    <>
      <Table columns={snapshots.length} rows={rows.length}>
        <TopLeftHeader>Player</TopLeftHeader>
        {createDateHeader(snapshots)}
        {createPlayerHeader(players)}
        {rows.flat()}
      </Table>
    </>
  );
};
