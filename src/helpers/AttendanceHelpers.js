import playerSerializer from "helpers/PlayerSerializer";

function indexPlayers(players) {
  const names = players.map(player => playerSerializer(player));
  return new Set(names);
}

function indexPairs(pairs) {
  const map = new Map();
  pairs.forEach(pair => {
    map.set(playerSerializer(pair.alt), pair.main);
  });
  return map;
}

function mergeAlts(pairs) {
  pairs = indexPairs(pairs);
  const transformPlayer = player => {
    const main = pairs.get(playerSerializer(player));
    if (main) {
      return {
        ...player,
        ...main,
      };
    }
    return player;
  };
  return snapshot => {
    const { start, afterBreak } = snapshot;
    return {
      start: {
        ...start,
        players: start.players.map(transformPlayer),
      },
      afterBreak: {
        ...afterBreak,
        players: afterBreak.players.map(transformPlayer),
      },
    };
  };
}

function filterRaiders(attendance, raiders) {
  raiders = indexPlayers(raiders.map(raider => raider.character));
  const newSnapshots = attendance.snapshots.map(snapshot => {
    return {
      ...snapshot,
      players: snapshot.players.filter(player =>
        raiders.has(playerSerializer(player))
      ),
    };
  });
  const newPlayers = attendance.players.filter(p =>
    raiders.has(playerSerializer(p))
  );
  return {
    ...attendance,
    players: newPlayers,
    snapshots: newSnapshots,
  };
}

export { indexPlayers, mergeAlts, filterRaiders };
