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

function parseAttendance(importString) {
  const entries = importString.split(";");
  const [date, ...rawAttendance] = entries;
  return {
    date,
    players: rawAttendance.map(parseEntry),
  };
}

function renameAlts(snapshot, pairs) {
  const newPlayers = snapshot.players.map(player => {
    const pair = pairs.find(
      pair =>
        pair.alt.name === player.name &&
        (!pair.alt.realm || pair.alt.realm === player.realm)
    );
    if (pair) {
      return {
        ...player,
        ...pair.main,
      };
    }
    return player;
  });
  return {
    ...snapshot,
    players: newPlayers,
  };
}

export default parseAttendance;
export { parseAttendance, renameAlts };
