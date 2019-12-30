import React from "react";
import AttendanceBox from "./AttendanceBox";
import {
  Table,
  TopHeader,
  LeftHeader,
  TopLeftHeader,
} from "./AttendanceTableLayout";
import { getPlayersFromSnapshots } from "../../parsers/AttendanceParser";

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

function createAttendanceBoxRow(playerName, playerIndex) {
  let foundOne = false;
  return (snapshot, snapshotIndex) => {
    const player = snapshot.players.find(
      player => player.name === playerName.name
    );
    if (player) {
      foundOne = true;
    }
    const status = foundOne ? (player ? player.status : 0) : -1;

    return (
      <AttendanceBox
        player={player || { name: playerName.name }}
        snapshot={snapshot}
        status={status}
        key={`${playerName.name}${snapshotIndex}`}
        column={snapshotIndex + 2}
        row={playerIndex + 2}
      />
    );
  };
}

function createAttendanceBoxes(snapshots, players) {
  const boxes = players.map((player, i) =>
    snapshots.map(createAttendanceBoxRow(player, i))
  );
  return boxes;
}

export default props => {
  const players = getPlayersFromSnapshots(props.snapshots).sort((a, b) =>
    a.name.localeCompare(b.name)
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
