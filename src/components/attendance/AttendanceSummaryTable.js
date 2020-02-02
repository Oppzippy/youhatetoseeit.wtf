// Libraries
import React, { useState } from "react";
import styled from "styled-components";
import AttendanceAggregator from "../../lib/attendance/AttendanceAggregator";
// Components
import ParseColor from "components/ParseColor";

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

function sortStats(stats, field, isReversed) {
  const sorted = stats.sort((a, b) => {
    let aField = a[field];
    let bField = b[field];
    if (field === "player") {
      aField = aField.name;
      bField = bField.name;
    }
    if (aField < bField) {
      return -1;
    }
    if (bField < aField) {
      return 1;
    }
    return 0;
  });
  if (isReversed) {
    return sorted.reverse();
  }
  return sorted;
}

export default props => {
  const { attendanceTracker, whitelist } = props;
  const players = whitelist ?? attendanceTracker.getPlayers();
  const stats = players.map(player => {
    const aggregator = new AttendanceAggregator(
      attendanceTracker.getAttendanceForPlayer(player)
    );
    return {
      player,
      showedUp: aggregator.getShowedUp(),
      present: aggregator.getPresent(),
      tardy: aggregator.getTardy(),
      leftEarly: aggregator.getLeftEarly(),
      notInGroup: aggregator.getNotInGroup(),
    };
  });

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
          <th onClick={() => setSorting("leftEarly")}>
            Left Early {drawSortingArrow("leftEarly")}
          </th>
          <th onClick={() => setSorting("notInGroup")}>
            Benched {drawSortingArrow("notInGroup")}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortStats(stats, sortingBy, isSortingReversed).map(
          ({ player, showedUp, present, tardy, leftEarly, notInGroup }, i) => (
            <tr key={i}>
              <td>{player.name}</td>
              <td>
                <ParseColor parse={showedUp}>
                  {Math.round(showedUp * 100)}%
                </ParseColor>
              </td>
              <td>
                <ParseColor parse={present}>
                  {Math.round(present * 100)}%
                </ParseColor>
              </td>
              <td>
                <ParseColor parse={1 - tardy}>
                  {Math.round(tardy * 100)}%
                </ParseColor>
              </td>
              <td>
                <ParseColor parse={1 - tardy}>
                  {Math.round(leftEarly * 100)}%
                </ParseColor>
              </td>
              <td>{Math.round(notInGroup * 100)}%</td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
};
