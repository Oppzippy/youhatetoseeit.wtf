import React from "react";
import { differenceBy } from "lodash";
import { getPlayersFromSnapshots } from "../../parsers/AttendanceParser";
import ParseColor from "../ParseColor";
import playerSerializer from "../../helpers/PlayerSerializer";

function getStats(attendance, condition) {
  const scores = new Map();
  const stepSizes = new Map();
  attendance.snapshots.forEach((snapshot, i) =>
    snapshot.players.forEach(player => {
      if (player.ignore) return;
      const key = playerSerializer(player);
      let step = stepSizes.get(key);
      if (!step) {
        step = 1 / (attendance.snapshots.length - i);
        stepSizes.set(key, step);
      }
      let newScore = scores.get(key) ?? 0;
      if (condition(player)) {
        newScore += step;
      }
      scores.set(key, newScore);
    })
  );
  return scores;
}

export default props => {
  const showedUp = getStats(props.attendance, player => player.online);
  const present = getStats(
    props.attendance,
    player => player.online && !player.tardy
  );
  const tardy = getStats(
    props.attendance,
    player => player.online && player.tardy
  );
  const benched = getStats(
    props.attendance,
    player => player.online && player.benched
  );
  const stats = [];
  return (
    <table>
      <thead>
        <tr>
          <th>Player</th>
          <th>Showed Up</th>
          <th>Present</th>
          <th>Tardy</th>
          <th>Benched</th>
        </tr>
      </thead>
      <tbody>
        {props.attendance.players.map((player, i) => (
          <tr key={i}>
            <td>{player.name}</td>
            <td>
              <ParseColor parse={showedUp.get(playerSerializer(player))}>
                {Math.round(showedUp.get(playerSerializer(player)) * 100)}%
              </ParseColor>
            </td>
            <td>
              <ParseColor parse={present.get(playerSerializer(player))}>
                {Math.round(present.get(playerSerializer(player)) * 100)}%
              </ParseColor>
            </td>
            <td>
              <ParseColor parse={1 - tardy.get(playerSerializer(player))}>
                {Math.round(tardy.get(playerSerializer(player)) * 100)}%
              </ParseColor>
            </td>
            <td>{Math.round(benched.get(playerSerializer(player)) * 100)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
