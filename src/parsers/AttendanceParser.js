import playerSerializer from "../helpers/PlayerSerializer";

// private helper
function parseEntry(entry) {
  const [fullName, status, zone] = entry.split("`");
  const [name, realm] = fullName.split("-");

  return {
    name,
    realm,
    status,
    zone,
  };
}

// private helper
function parseAttendanceStringPartial(importString) {
  const entries = importString.split(";");
  const [date, ...rawAttendance] = entries;
  return {
    date,
    players: rawAttendance.map(parseEntry),
  };
}

// public, use to pass data to parseAttendance
// Shapes data but does not perform any lossy operations
function parseAttendanceString(importString) {
  const start = parseAttendanceStringPartial(importString.start);
  const afterBreak = parseAttendanceStringPartial(importString.afterBreak);
  return { start, afterBreak };
}

// private helper
function transformPlayerInfo(players, { start, afterBreak }) {
  const newPlayers = players.map(({ name, realm }) => {
    const playerFromStart = start.players.find(
      p => p.name === name && p.realm === realm
    );
    const playerAfterBreak = afterBreak.players.find(
      p => p.name === name && p.realm === realm
    );
    return {
      name: name,
      realm: realm,
      online: !!playerFromStart || !!playerAfterBreak,
      tardy: !playerFromStart,
      benched:
        (playerFromStart && playerFromStart.status === "2") ||
        (playerAfterBreak && playerAfterBreak.status === "2"),
    };
  });

  return { date: new Date(start.date), players: newPlayers };
}

// public, parses attendance
// TODO instead of returning an array of players, return a map
function parseAttendance(snapshots) {
  let players = getPlayersFromSnapshots(snapshots);
  players = players.sort((a, b) => a.name.localeCompare(b.name));
  const seenPlayers = new Set();
  const attendance = snapshots.map(snapshot => {
    const newSnapshot = transformPlayerInfo(players, snapshot);
    newSnapshot.players = newSnapshot.players.map(player => {
      if (!player.online && !seenPlayers.has(playerSerializer(player))) {
        return {
          ...player,
          ignore: true,
        };
      }
      return player;
    });
    newSnapshot.players.forEach(player => {
      if (player.online) {
        seenPlayers.add(playerSerializer(player));
      }
    });
    return newSnapshot;
  });
  return {
    players,
    snapshots: attendance,
  };
}

function getPlayersFromSnapshots(snapshots) {
  // Add players to a map to efficiently keep track of already spotted players
  const players = new Map();
  const addPlayer = player => players.set(playerSerializer(player), player);
  snapshots.forEach(snapshot => {
    const { start, afterBreak } = snapshot;
    start.players.forEach(addPlayer);
    afterBreak.players.forEach(addPlayer);
  });
  // Whitelist name and realm fields
  return [...players.values()].map(player => ({
    name: player.name,
    realm: player.realm,
  }));
}

export default parseAttendance;
export { parseAttendanceString, parseAttendance, getPlayersFromSnapshots };
