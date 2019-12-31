import React, { useState } from "react";
import styled from "styled-components";
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

function getSortedPlayers(stats, stat, reversed) {
  const reversedMultiplier = reversed ? -1 : 1;
  stat = stats[stat];
  if (stat) {
    // sort by stat
    return [...stat.entries()]
      .sort((a, b) => (a[1] - b[1]) * reversedMultiplier)
      .map(entry => entry[0]);
  }
  // sort by player name if stat isn't found
  const [value] = Object.values(stats);
  return [...value.keys()].sort(
    (a, b) => a.localeCompare(b) * reversedMultiplier
  );
}

const Table = styled.table`
  td,
  th {
    padding: 5px;
    border-bottom: 2px solid var(--shadow-color);
  }
  th {
    cursor: pointer;
    user-select: none;
    &:hover {
      background-color: var(--bg-color-light);
    }
  }
`;

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

  const [sortingBy, setSortingBy] = useState("showedUp");
  const [isSortingReversed, setSortingReversed] = useState(true);

  const setSorting = type => {
    setSortingBy(type);
    setSortingReversed(sortingBy === type ? !isSortingReversed : true);
  };

  const drawSortingArrow = type => {
    if (sortingBy === type) {
      return isSortingReversed ? <span>&darr;</span> : <span>&uarr;</span>;
    }
  };

  return (
    <Table cellSpacing="0">
      <thead>
        <tr>
          <th onClick={() => setSorting("player")}>
            Player {drawSortingArrow("player")}
          </th>
          <th onClick={() => setSorting("showedUp")}>
            Showed Up {drawSortingArrow("showedUp")}
          </th>
          <th onClick={() => setSorting("present")}>
            Present {drawSortingArrow("present")}
          </th>
          <th onClick={() => setSorting("tardy")}>
            Tardy {drawSortingArrow("tardy")}
          </th>
          <th onClick={() => setSorting("benched")}>
            Benched {drawSortingArrow("benched")}
          </th>
        </tr>
      </thead>
      <tbody>
        {getSortedPlayers(
          { showedUp, present, tardy, benched },
          sortingBy,
          isSortingReversed
        ).map((player, i) => (
          <tr key={i}>
            <td>
              {
                props.attendance.players.find(
                  p => playerSerializer(p) === player
                ).name
              }
            </td>
            <td>
              <ParseColor parse={showedUp.get(player)}>
                {Math.round(showedUp.get(player) * 100)}%
              </ParseColor>
            </td>
            <td>
              <ParseColor parse={present.get(player)}>
                {Math.round(present.get(player) * 100)}%
              </ParseColor>
            </td>
            <td>
              <ParseColor parse={1 - tardy.get(player)}>
                {Math.round(tardy.get(player) * 100)}%
              </ParseColor>
            </td>
            <td>{Math.round(benched.get(player) * 100)}%</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
