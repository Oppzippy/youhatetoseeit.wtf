import React from "react";
import AttendanceBox from "./AttendanceBox";

function getPlayersFromSnapshot(snapshot) {
  return snapshot.players.map(player => player.name);
}

function getPlayersFromSnapshots(snapshots) {
  return [...new Set(snapshots.map(getPlayersFromSnapshot).flat())];
}

function createDateHeader(snapshots) {
  return snapshots.map((snapshot, i) => <th key={i}>{snapshot.date}</th>);
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

function createAttendanceBoxRow(playerName) {
  let foundOne = false;
  let key = 0;
  return snapshot => {
    const player = snapshot.players.find(player => player.name === playerName);
    if (player) {
      foundOne = true;
    }
    const status = foundOne ? (player ? player.status : 0) : -1;
    let title = `${snapshot.date}
${playerName}
${statusText[status]}`;

    if (player) {
      title += `\n${player.zone || "Unknown Zone"}`;
    }
    return <AttendanceBox key={key++} status={status} title={title} />;
  };
}

function createAttendanceBoxes(snapshots, playerName) {
  const boxes = snapshots.map(createAttendanceBoxRow(playerName));
  return (
    <tr key={playerName}>
      <td>{playerName}</td>
      {boxes}
    </tr>
  );
}

export default props => {
  const players = getPlayersFromSnapshots(props.snapshots).sort((a, b) =>
    a.localeCompare(b)
  );
  const rows = players.map(playerName =>
    createAttendanceBoxes(props.snapshots, playerName)
  );
  return (
    <table style={props.style}>
      <thead>
        <tr>
          <th>Player</th>
          {createDateHeader(props.snapshots)}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
