import React from "react";
import { differenceBy } from "lodash";
import { getPlayersFromSnapshots } from "../../parsers/AttendanceParser";
import ParseColor from "../ParseColor";
import playerSerializer from "../../helpers/PlayerSerializer";

function groupSnapshotsByDate(snapshots) {
  const newSnapshots = [[]];
  snapshots.forEach(snapshot => {
    const current = newSnapshots[newSnapshots.length - 1];
    if (
      current.length === 0 ||
      current[current.length - 1].date.getTime() === snapshot.date.getTime()
    ) {
      current.push(snapshot);
    } else {
      newSnapshots.push([snapshot]);
    }
  });
  return newSnapshots;
}

function countPresent(snapshots) {
  const scores = new Map();
  const playerSet = new Set();
  const snapshotsByDate = groupSnapshotsByDate(snapshots);
  const step = 1 / snapshotsByDate.length;
  snapshotsByDate.forEach((group, i) => {
    const [snapshot] = group;
    snapshot.players.forEach(player => {
      const key = playerSerializer(player);
      if (playerSet.has(key)) {
        scores[key] = scores[key] + step;
      } else {
        playerSet.add(key);
        scores[key] = (i + 1) * step;
      }
    });
  });
  return scores;
}

function countTardy(snapshots) {
  const scores = new Map();
  const snapshotsByDate = groupSnapshotsByDate(snapshots);
  const step = 1 / snapshotsByDate.length;
  snapshotsByDate.map(group => {
    const players = getPlayersFromSnapshots(group);
    players.forEach(player => {
      const key = playerSerializer(player);
      scores[key] = (scores[key] ?? 0) + step;
    });
  });
  return scores;
}

function getPlayerStats(snapshots) {
  const players = getPlayersFromSnapshots(snapshots);
  const present = countPresent(snapshots);
  const tardy = countTardy(snapshots);
  return players.map(player => ({
    ...player,
    present: present[playerSerializer(player)],
    tardy: tardy[playerSerializer(player)],
  }));
}

export default props => {
  const stats = getPlayerStats(props.snapshots).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return (
    <table>
      <thead>
        <tr>
          <th>Player</th>
          <th>Present</th>
          <th>Tardy</th>
          <th>Grouped</th>
          <th>Zoned</th>
        </tr>
      </thead>
      <tbody>
        {stats.map(player => (
          <tr>
            <td>{player.name}</td>
            <td>
              <ParseColor parse={player.present}>
                {Math.round(player.present * 100)}%
              </ParseColor>
            </td>
            <td>
              <ParseColor parse={player.tardy}>
                {Math.round(player.tardy * 100)}%
              </ParseColor>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
