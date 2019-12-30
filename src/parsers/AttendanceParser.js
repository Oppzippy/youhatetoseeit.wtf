import raidZones from "./RaidZones";

function parseEntry(entry) {
  let [fullName, status, zone] = entry.split("`");
  const [name, realm] = fullName.split("-");

  if (status === "1" && !raidZones.has(zone)) {
    status = 4;
  }

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

function indexPairs(pairs) {
  const map = new Map();
  pairs.forEach(pair => {
    let key = pair.alt.name.toLowerCase();
    if (pair.alt.realm) {
      key += `-${pair.alt.realm.toLowerCase()}`;
    }
    map[key] = pair.main;
  });
  return map;
}

function renameAlts(snapshot, pairs) {
  pairs = indexPairs(pairs);
  const newPlayers = snapshot.players.map(player => {
    const { name, realm } = player;
    const main =
      pairs[`${name.toLowerCase()}-${realm.toLowerCase()}`] ?? pairs[name];
    if (main) {
      return {
        ...player,
        ...main,
      };
    }
    return player;
  });
  return {
    ...snapshot,
    players: newPlayers,
  };
}

function indexRaiders(raiders) {
  const names = raiders.map(
    raider =>
      `${raider.character.name.toLowerCase()}-${raider.character.realm.toLowerCase()}`
  );
  return new Set(names);
}

function filterRaiders(snapshots, raiders) {
  raiders = indexRaiders(raiders);
  return snapshots.map(snapshot => {
    return {
      ...snapshot,
      players: snapshot.players.filter(player =>
        raiders.has(
          `${player.name.toLowerCase()}-${player.realm.toLowerCase()}`
        )
      ),
    };
  });
}

function getPlayersFromSnapshot(snapshot) {
  return snapshot.players.map(player =>
    JSON.stringify({ name: player.name, realm: player.realm })
  );
}

function getPlayersFromSnapshots(snapshots) {
  return [
    ...new Set(snapshots.map(getPlayersFromSnapshot).flat()),
  ].map(player => JSON.parse(player));
}

export default parseAttendance;
export { parseAttendance, renameAlts, filterRaiders, getPlayersFromSnapshots };
