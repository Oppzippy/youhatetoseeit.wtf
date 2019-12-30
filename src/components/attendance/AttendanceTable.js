import React from "react";
import styled from "styled-components";
import AttendanceBox from "./AttendanceBox";

const Table = styled.div`
  display: grid;
  grid-template-rows: 2em repeat(${props => props.rows}, 50px);
  grid-template-columns: 10em repeat(${props => props.columns}, 50px);
  grid-row-gap: 2px;
  background-color: #fff;
  overflow: auto;
  width: 100%;
  height: 100%;
`;

const TopHeader = styled.div`
  grid-row: 1;
  background-color: inherit;
  position: sticky;
  top: 0;
`;

const LeftHeader = styled.div`
  grid-column: 1;
  background-color: inherit;
  position: sticky;
  left: 0;
`;

const TopLeftHeader = styled.div`
  z-index: 1;
  grid-column: 1;
  grid-row: 1;
  background-color: inherit;
  position: sticky;
  left: 0;
  top: 0;
`;

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

const statusText = {
  // TODO dont hardcode
  "-1": "Didn't join yet",
  0: "Absent",
  1: "Present",
  2: "Benched",
  3: "Tardy",
  4: "Not Zoned In",
};

function createAttendanceBoxRow(playerName, playerIndex) {
  let foundOne = false;
  return (snapshot, snapshotIndex) => {
    const player = snapshot.players.find(player => player.name === playerName);
    if (player) {
      foundOne = true;
    }
    const status = foundOne ? (player ? player.status : 0) : -1;
    let title = `${snapshot.date.toLocaleDateString()}
${playerName}
${statusText[status]}`;

    if (player) {
      title += `\n${player.zone || "Unknown Zone"}`;
    }

    return (
      <AttendanceBox
        key={`${playerName}${snapshotIndex}`}
        column={snapshotIndex + 2}
        row={playerIndex + 2}
        status={status}
        title={title}
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
