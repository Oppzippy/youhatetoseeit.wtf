import React from "react";
import AttendanceBox from "./AttendanceBox";
import {
  Table,
  TopHeader,
  LeftHeader,
  TopLeftHeader,
} from "./AttendanceTableLayout";

function getPlayersFromSnapshot(snapshot) {
  return snapshot.players.map(player => player.name);
}

function getPlayersFromSnapshots(snapshots) {
  return [...new Set(snapshots.map(getPlayersFromSnapshot).flat())];
}

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
  return players.map((player, i) => <LeftHeader key={i}>{player}</LeftHeader>);
}

function createAttendanceBoxRow(playerName, playerIndex) {
  let foundOne = false;
  return (snapshot, snapshotIndex) => {
    const player = snapshot.players.find(player => player.name === playerName);
    if (player) {
      foundOne = true;
    }
    const status = foundOne ? (player ? player.status : 0) : -1;

    return (
      <AttendanceBox
        player={player || { name: playerName }}
        snapshot={snapshot}
        status={status}
        key={`${playerName}${snapshotIndex}`}
        column={snapshotIndex + 2}
        row={playerIndex + 2}
      />
    );
  };
}

function createAttendanceBoxes(snapshots, players) {
  const boxes = players.map((playerName, i) =>
    snapshots.map(createAttendanceBoxRow(playerName, i))
  );
  return boxes;
}

export default props => {
  const players = getPlayersFromSnapshots(props.snapshots).sort((a, b) =>
    a.localeCompare(b)
  );
  const rows = createAttendanceBoxes(props.snapshots, players);
  return (
    <Table columns={props.snapshots.length} rows={rows.length}>
      <TopLeftHeader>Player</TopLeftHeader>
      {createDateHeader(props.snapshots)}
      {createPlayerHeader(players)}
      {rows.flat()}
    </Table>
  );
};
