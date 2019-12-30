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
    date: new Date(date),
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

function filterRaiders(snapshots, raiders) {
  return snapshots.map(snapshot => {
    return {
      ...snapshot,
      players: snapshot.players.filter(player =>
        raiders.find(
          raider =>
            raider.character.name === player.name &&
            raider.character.realm === player.realm
        )
      ),
    };
  });
}

export default parseAttendance;
export { parseAttendance, renameAlts, filterRaiders };
