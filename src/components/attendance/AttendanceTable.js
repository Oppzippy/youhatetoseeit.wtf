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

function createDateHeader(dates) {
  const dateOptions = {
    month: "2-digit",
    day: "numeric",
  };
  return dates.map((date, i) => (
    <TopHeader key={i}>
      {date.toLocaleDateString(undefined, dateOptions)}
    </TopHeader>
  ));
}

function createPlayerHeader(players) {
  return players.map((player, i) => (
    <LeftHeader key={i}>{player.name}</LeftHeader>
  ));
}

function createAttendanceBoxes(attendanceTracker, players) {
  const boxes = players.map((player, playerIndex) => {
    const attendance = attendanceTracker.getAttendanceForPlayer(player);
    return attendance.map((playerAttendance, raidIndex) => {
      return (
        <AttendanceBox
          key={`${player.name}-${player.realm}-${playerIndex}-${raidIndex}`}
          player={playerAttendance}
          column={raidIndex + 2}
          row={playerIndex + 2}
        />
      );
    });
  });
  return boxes;
}

export default props => {
  const { attendanceTracker, whitelist } = props;
  const players = whitelist ?? attendanceTracker.getPlayers();
  const rows = createAttendanceBoxes(attendanceTracker, players);
  const raids = attendanceTracker.getRaids();
  return (
    <>
      <Table columns={raids.length} rows={players.length}>
        <TopLeftHeader>Player</TopLeftHeader>
        {createDateHeader(raids.map(raid => raid.getDate()))}
        {createPlayerHeader(players)}
        {rows.flat()}
      </Table>
    </>
  );
};
